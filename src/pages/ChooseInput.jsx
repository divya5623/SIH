import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mic, Camera, Edit3, MapPin, Globe } from 'lucide-react';
import { useComplaints } from '../context/ComplaintContext';
import { classifyGrievance } from '../utils/aiClassifier';

const LANGUAGES = [
  { code: 'kn-IN', label: 'ಕನ್ನಡ', name: 'Kannada' },
  { code: 'hi-IN', label: 'हिंदी', name: 'Hindi' },
  { code: 'en-IN', label: 'English', name: 'English' },
  { code: 'te-IN', label: 'తెలుగు', name: 'Telugu' },
  { code: 'ta-IN', label: 'தமிழ்', name: 'Tamil' },
  { code: 'mr-IN', label: 'मराठी', name: 'Marathi' },
];

export default function ChooseInput() {
  const navigate = useNavigate();
  const { currentDraft, setCurrentDraft, showToast } = useComplaints();

  const [selectedMethod, setSelectedMethod] = useState(currentDraft.inputType || 'voice');
  const [isRecording, setIsRecording] = useState(false);
  const [grievanceText, setGrievanceText] = useState(currentDraft.description || "");
  const [gpsCoordinates, setGpsCoordinates] = useState(currentDraft.gps || "12.8797° N, 74.8509° E");
  const [uploadedImage, setUploadedImage] = useState(currentDraft.image || null);
  const [recordingDuration, setRecordingDuration] = useState("00:00");
  const [selectedLang, setSelectedLang] = useState('kn-IN'); // Default Kannada for Karnataka demo

  const fileInputRef = useRef(null);
  const recognitionRef = useRef(null);
  const timerIntervalRef = useRef(null);
  const secondsRef = useRef(0);

  // Create / recreate Speech Recognition when language changes
  useEffect(() => {
    // Cleanup previous
    if (recognitionRef.current) {
      try { recognitionRef.current.abort(); } catch(e) {}
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = selectedLang; // Dynamic language!

      recognition.onresult = (event) => {
        let finalTranscript = '';
        let interimTranscript = '';
        for (let i = 0; i < event.results.length; i++) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript;
          } else {
            interimTranscript += event.results[i][0].transcript;
          }
        }
        const combined = (finalTranscript + interimTranscript).trim();
        if (combined) {
          setGrievanceText(combined);
        }
      };

      recognition.onerror = (err) => {
        console.warn("Speech recognition error:", err.error);
        if (err.error === 'not-allowed') {
          showToast("🎙️ Microphone Blocked", "Please allow microphone access in your browser settings.");
        }
      };

      recognition.onend = () => {
        // If still recording, restart (browser auto-stops after silence)
        if (isRecording) {
          try { recognition.start(); } catch(e) {}
        }
      };

      recognitionRef.current = recognition;
    }

    return () => {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    };
  }, [selectedLang]);

  // Fetch real GPS
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const lat = pos.coords.latitude.toFixed(4);
          const lon = pos.coords.longitude.toFixed(4);
          setGpsCoordinates(`${lat}° N, ${lon}° E`);
        },
        () => {} // Silently fail, keep default
      );
    }
  }, []);

  // Handle language change while recording
  const handleLangChange = (langCode) => {
    const wasRecording = isRecording;
    
    // Stop current recording if active
    if (wasRecording) {
      try { recognitionRef.current?.stop(); } catch(e) {}
      setIsRecording(false);
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    }

    setSelectedLang(langCode);
    const langName = LANGUAGES.find(l => l.code === langCode)?.name || langCode;
    showToast(`🌐 Language: ${langName}`, `Speech recognition switched to ${langName}. Tap Speak to start.`);
  };

  // Handle Speak Card click
  const handleSpeakClick = () => {
    setSelectedMethod('voice');
    if (!isRecording) {
      setIsRecording(true);
      secondsRef.current = 0;
      setRecordingDuration("00:00");
      timerIntervalRef.current = setInterval(() => {
        secondsRef.current++;
        const s = secondsRef.current;
        setRecordingDuration(`00:${s < 10 ? '0' + s : s}`);
      }, 1000);

      try {
        if (recognitionRef.current) {
          recognitionRef.current.lang = selectedLang;
          recognitionRef.current.start();
        }
      } catch (e) {
        console.warn("Could not start recognition:", e);
      }

      const langName = LANGUAGES.find(l => l.code === selectedLang)?.name || 'your language';
      showToast(`🎙️ Listening in ${langName}`, `Speak your grievance in ${langName}...`);
    } else {
      setIsRecording(false);
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
      try {
        recognitionRef.current?.stop();
      } catch (e) {}
      showToast("✅ Audio Recorded", `Voice grievance captured (${recordingDuration}).`);
    }
  };

  // Handle Camera Card click
  const handleCameraClick = () => {
    setSelectedMethod('camera');
    fileInputRef.current?.click();
  };

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setUploadedImage(event.target.result);
          setSelectedMethod('camera');
          showToast("📷 Photo Evidence Attached", "AI will analyze the image for defect detection.");
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle Continue button click
  const handleContinue = () => {
    if (!grievanceText.trim()) {
      showToast("⚠️ Empty Complaint", "Please speak, type, or upload a photo to describe your grievance.");
      return;
    }

    // Run real multi-lingual AI analysis
    const analysis = classifyGrievance(grievanceText, selectedMethod === 'camera', gpsCoordinates);

    setCurrentDraft({
      ...currentDraft,
      inputType: selectedMethod,
      audioDuration: recordingDuration || "00:06",
      recorded: selectedMethod === 'voice',
      description: grievanceText,
      audioTranscript: grievanceText,
      image: uploadedImage,
      gps: gpsCoordinates,
      language: selectedLang,
      issue: analysis.issue,
      category: analysis.category,
      ward: analysis.ward,
      authority: analysis.assignedDepartment,
      priority: analysis.priority,
      confidence: analysis.confidence
    });

    navigate('/report/preview');
  };

  const currentLangObj = LANGUAGES.find(l => l.code === selectedLang);

  return (
    <div style={{ backgroundColor: '#F7FAF8', minHeight: 'calc(100vh - 80px)', padding: '2.5rem 1.5rem 4rem 1.5rem' }}>
      <div style={{ maxWidth: '820px', margin: '0 auto' }}>
        {/* Hidden Camera File Input */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          capture="environment"
          onChange={handleImageUpload}
          style={{ display: 'none' }}
        />

        {/* Heading */}
        <h1 style={{
          fontSize: '1.65rem',
          fontWeight: 800,
          color: '#102333',
          marginBottom: '1rem',
          letterSpacing: '-0.2px'
        }}>
          Apni Shikayat Darj Karein
        </h1>

        {/* LANGUAGE SELECTOR PILLS */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          marginBottom: '1.75rem',
          flexWrap: 'wrap'
        }}>
          <Globe size={16} color="#5A6D7C" style={{ marginRight: '0.25rem' }} />
          {LANGUAGES.map((lang) => (
            <button
              key={lang.code}
              type="button"
              onClick={() => handleLangChange(lang.code)}
              style={{
                padding: '0.35rem 0.85rem',
                borderRadius: '9999px',
                border: selectedLang === lang.code ? '2px solid #35654B' : '1px solid #DDE7E2',
                backgroundColor: selectedLang === lang.code ? '#EAF5EF' : '#FFFFFF',
                color: selectedLang === lang.code ? '#35654B' : '#5A6D7C',
                fontWeight: selectedLang === lang.code ? 800 : 500,
                fontSize: '0.82rem',
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
            >
              {lang.label}
            </button>
          ))}
        </div>

        {/* THREE CARDS ROW */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))',
          gap: '1.25rem',
          marginBottom: '1.5rem'
        }}>
          {/* Card 1: Speak */}
          <div
            onClick={handleSpeakClick}
            style={{
              backgroundColor: '#FFFFFF',
              border: selectedMethod === 'voice' ? '2px solid #35654B' : '1px solid #E2EBE6',
              borderRadius: '14px',
              padding: '1.75rem 1rem',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              cursor: 'pointer',
              boxShadow: selectedMethod === 'voice' ? '0 4px 14px rgba(53, 101, 75, 0.12)' : '0 2px 6px rgba(0,0,0,0.02)',
              transition: 'all 0.2s ease'
            }}
          >
            <div style={{
              width: '52px',
              height: '52px',
              borderRadius: '50%',
              backgroundColor: isRecording ? '#DE4C4C' : '#35654B',
              color: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '1rem',
              boxShadow: isRecording ? '0 0 0 6px rgba(222, 76, 76, 0.25)' : 'none',
              animation: isRecording ? 'pulse 1.5s infinite' : 'none'
            }}>
              <Mic size={24} strokeWidth={2.4} />
            </div>

            <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#102333', marginBottom: '0.35rem' }}>
              Speak
            </div>

            <div style={{ fontSize: '0.8rem', color: isRecording ? '#DE4C4C' : '#5A6D7C', fontWeight: isRecording ? 700 : 400 }}>
              {isRecording
                ? `🔴 Listening in ${currentLangObj?.name}... (${recordingDuration})`
                : `Tap and speak in ${currentLangObj?.name}`
              }
            </div>
          </div>

          {/* Card 2: Camera */}
          <div
            onClick={handleCameraClick}
            style={{
              backgroundColor: '#FFFFFF',
              border: selectedMethod === 'camera' ? '2px solid #3267A8' : '1px solid #E2EBE6',
              borderRadius: '14px',
              padding: '1.75rem 1rem',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              cursor: 'pointer',
              boxShadow: selectedMethod === 'camera' ? '0 4px 14px rgba(50, 103, 168, 0.12)' : '0 2px 6px rgba(0,0,0,0.02)',
              transition: 'all 0.2s ease'
            }}
          >
            <div style={{
              width: '52px',
              height: '52px',
              borderRadius: '50%',
              backgroundColor: '#3267A8',
              color: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '1rem'
            }}>
              <Camera size={24} strokeWidth={2.4} />
            </div>

            <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#102333', marginBottom: '0.35rem' }}>
              Camera
            </div>

            <div style={{ fontSize: '0.8rem', color: '#5A6D7C' }}>
              {uploadedImage ? '✅ Photo attached' : 'Photo evidence'}
            </div>
          </div>

          {/* Card 3: Type */}
          <div
            onClick={() => setSelectedMethod('type')}
            style={{
              backgroundColor: '#FFFFFF',
              border: selectedMethod === 'type' ? '2px solid #7150A8' : '1px solid #E2EBE6',
              borderRadius: '14px',
              padding: '1.75rem 1rem',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              cursor: 'pointer',
              boxShadow: selectedMethod === 'type' ? '0 4px 14px rgba(113, 80, 168, 0.12)' : '0 2px 6px rgba(0,0,0,0.02)',
              transition: 'all 0.2s ease'
            }}
          >
            <div style={{
              width: '52px',
              height: '52px',
              borderRadius: '50%',
              backgroundColor: '#7150A8',
              color: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '1rem'
            }}>
              <Edit3 size={24} strokeWidth={2.4} />
            </div>

            <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#102333', marginBottom: '0.35rem' }}>
              Type
            </div>

            <div style={{ fontSize: '0.8rem', color: '#5A6D7C' }}>
              Write your grievance
            </div>
          </div>
        </div>

        {/* YA SEEDHA LIKHEIN CARD */}
        <div style={{
          backgroundColor: '#FFFFFF',
          border: '1px solid #E2EBE6',
          borderRadius: '12px',
          padding: '1.25rem 1.5rem',
          marginBottom: '1.25rem',
          boxShadow: '0 2px 6px rgba(0,0,0,0.02)'
        }}>
          <label style={{
            display: 'block',
            fontSize: '0.82rem',
            fontWeight: 700,
            color: '#5A6D7C',
            marginBottom: '0.65rem'
          }}>
            Ya seedha likhein
          </label>
          <textarea
            rows={3}
            value={grievanceText}
            onChange={(e) => {
              setGrievanceText(e.target.value);
              setSelectedMethod('type');
            }}
            placeholder={
              selectedLang === 'kn-IN' ? 'ಉದಾ: ನಮ್ಮ ಬೀದಿಯ ರಸ್ತೆ ಹಾಳಾಗಿದೆ ಗುಂಡಿ ಬಿದ್ದಿದೆ' :
              selectedLang === 'hi-IN' ? 'जैसे: हमारे गली में तीन दिन से पानी नहीं आ रहा है' :
              selectedLang === 'te-IN' ? 'ఉదా: మా వీధిలో రోడ్డు పాడైంది' :
              selectedLang === 'ta-IN' ? 'எ.கா: எங்கள் தெருவில் சாலை சேதமடைந்துள்ளது' :
              selectedLang === 'mr-IN' ? 'उदा: आमच्या गल्लीत रस्ता खराब झाला आहे' :
              'E.g.: The road in our street has potholes and is damaged'
            }
            style={{
              width: '100%',
              border: '1px solid #DDE7E2',
              borderRadius: '8px',
              padding: '0.85rem',
              fontSize: '0.92rem',
              color: '#102333',
              outline: 'none',
              backgroundColor: '#FFFFFF',
              lineHeight: 1.5,
              resize: 'none'
            }}
          />
        </div>

        {/* LOCATION CARD */}
        <div style={{
          backgroundColor: '#FFFFFF',
          border: '1px solid #E2EBE6',
          borderRadius: '12px',
          padding: '1.25rem 1.5rem',
          marginBottom: '2rem',
          boxShadow: '0 2px 6px rgba(0,0,0,0.02)'
        }}>
          {/* Top Row: Location | Auto-GPS: ON */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', fontWeight: 700, color: '#102333' }}>
              <MapPin size={16} color="#DE4C4C" />
              <span>Location</span>
            </div>
            <div style={{ fontSize: '0.85rem', fontWeight: 800, color: '#102333' }}>
              Auto-GPS: ON
            </div>
          </div>

          {/* Bottom Row: Coordinates | GPS • Ward 5 */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.88rem' }}>
            <span style={{ color: '#5A6D7C', fontWeight: 500 }}>Coordinates</span>
            <span style={{ fontWeight: 800, color: '#102333' }}>
              {gpsCoordinates} • Ward 5
            </span>
          </div>
        </div>

        {/* BOTTOM CONTINUE BUTTON */}
        <button
          type="button"
          onClick={handleContinue}
          style={{
            width: '100%',
            backgroundColor: '#35654B',
            color: '#FFFFFF',
            border: 'none',
            borderRadius: '8px',
            padding: '0.9rem',
            fontSize: '0.95rem',
            fontWeight: 800,
            letterSpacing: '0.5px',
            cursor: 'pointer',
            boxShadow: '0 2px 8px rgba(53, 101, 75, 0.25)'
          }}
        >
          CONTINUE
        </button>
      </div>

      {/* Pulse animation for recording */}
      <style>{`
        @keyframes pulse {
          0% { box-shadow: 0 0 0 0 rgba(222, 76, 76, 0.4); }
          70% { box-shadow: 0 0 0 10px rgba(222, 76, 76, 0); }
          100% { box-shadow: 0 0 0 0 rgba(222, 76, 76, 0); }
        }
      `}</style>
    </div>
  );
}
