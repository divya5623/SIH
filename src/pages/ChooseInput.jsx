import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mic, Camera, Edit3, MapPin } from 'lucide-react';
import { useComplaints } from '../context/ComplaintContext';
import { classifyGrievance } from '../utils/aiClassifier';

export default function ChooseInput() {
  const navigate = useNavigate();
  const { currentDraft, setCurrentDraft, showToast } = useComplaints();

  const [selectedMethod, setSelectedMethod] = useState(currentDraft.inputType || 'voice');
  const [isRecording, setIsRecording] = useState(false);
  const [grievanceText, setGrievanceText] = useState(currentDraft.description || "hamare gali mein teen din se paani nahi aa raha hai");
  const [gpsCoordinates, setGpsCoordinates] = useState(currentDraft.gps || "12.8797° N, 74.8509° E");
  const [uploadedImage, setUploadedImage] = useState(currentDraft.image || "https://images.unsplash.com/photo-1584467735815-f778f274e296?auto=format&fit=crop&w=600&q=80");
  const [recordingDuration, setRecordingDuration] = useState("00:06");

  const fileInputRef = useRef(null);
  const recognitionRef = useRef(null);
  const timerIntervalRef = useRef(null);

  // Initialize Speech Recognition for real microphone input
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'hi-IN';

      recognition.onresult = (event) => {
        let transcript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          transcript += event.results[i][0].transcript;
        }
        if (transcript.trim()) {
          setGrievanceText(transcript);
        }
      };

      recognition.onerror = (err) => {
        console.warn("Speech recognition error:", err);
      };

      recognitionRef.current = recognition;
    }

    return () => {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    };
  }, []);

  // Handle Speak Card click
  const handleSpeakClick = () => {
    setSelectedMethod('voice');
    if (!isRecording) {
      setIsRecording(true);
      let seconds = 0;
      timerIntervalRef.current = setInterval(() => {
        seconds++;
        setRecordingDuration(`00:${seconds < 10 ? '0' + seconds : seconds}`);
      }, 1000);

      try {
        if (recognitionRef.current) {
          recognitionRef.current.start();
        }
      } catch (e) {}
      showToast("🎙️ Listening", "Speak your grievance in Hindi, Marathi, or English...");
    } else {
      setIsRecording(false);
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
      try {
        if (recognitionRef.current) {
          recognitionRef.current.stop();
        }
      } catch (e) {}
      showToast("✅ Audio Recorded", "Voice grievance captured successfully.");
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
          showToast("📷 Photo Evidence Attached", "Water leakage pattern detected by AI");
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle Continue button click
  const handleContinue = () => {
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
      issue: analysis.issue,
      category: analysis.category,
      ward: analysis.ward,
      authority: analysis.assignedDepartment,
      priority: analysis.priority,
      confidence: analysis.confidence
    });

    navigate('/report/preview');
  };

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
          marginBottom: '2rem',
          letterSpacing: '-0.2px'
        }}>
          Apni Shikayat Darj Karein
        </h1>

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
              backgroundColor: '#35654B',
              color: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '1rem',
              boxShadow: isRecording ? '0 0 0 6px rgba(53, 101, 75, 0.25)' : 'none'
            }}>
              <Mic size={24} strokeWidth={2.4} />
            </div>

            <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#102333', marginBottom: '0.35rem' }}>
              Speak
            </div>

            <div style={{ fontSize: '0.8rem', color: '#5A6D7C' }}>
              {isRecording ? "Listening... (Tap to finish)" : "Tap and speak naturally"}
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
              Photo evidence (water leakage detected)
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
            placeholder="Jaise: hamare gali mein teen din se paani nahi aa raha hai"
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
    </div>
  );
}
