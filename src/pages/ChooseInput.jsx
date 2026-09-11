import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mic, Camera, Edit3, MapPin, Globe, Loader } from 'lucide-react';
import { useComplaints } from '../context/ComplaintContext';
import { transcribeAudio, classifyText } from '../utils/api';

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
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [isClassifying, setIsClassifying] = useState(false);
  const [grievanceText, setGrievanceText] = useState(currentDraft.description || '');
  const [gpsCoordinates, setGpsCoordinates] = useState(currentDraft.gps || '12.8797° N, 74.8509° E');
  const [uploadedImage, setUploadedImage] = useState(currentDraft.image || null);
  const [recordingDuration, setRecordingDuration] = useState('00:00');
  const [selectedLang, setSelectedLang] = useState('kn-IN');

  const fileInputRef = useRef(null);
  const recognitionRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const timerRef = useRef(null);
  const secondsRef = useRef(0);
  const browserTranscriptRef = useRef('');

  // Setup Speech Recognition for live interim text display
  const setupRecognition = (langCode) => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) return;

    if (recognitionRef.current) {
      try { recognitionRef.current.abort(); } catch (e) {}
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = langCode;

    recognition.onresult = (event) => {
      let final = '';
      let interim = '';
      for (let i = 0; i < event.results.length; i++) {
        if (event.results[i].isFinal) final += event.results[i][0].transcript;
        else interim += event.results[i][0].transcript;
      }
      const combined = (final + interim).trim();
      if (combined) {
        setGrievanceText(combined);
        browserTranscriptRef.current = combined;
      }
    };

    recognition.onerror = (err) => {
      if (err.error !== 'no-speech') console.warn('Speech error:', err.error);
    };

    recognition.onend = () => {
      if (isRecording) {
        try { recognition.start(); } catch (e) {}
      }
    };

    recognitionRef.current = recognition;
  };

  useEffect(() => {
    setupRecognition(selectedLang);
  }, [selectedLang]);

  // Fetch GPS
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        setGpsCoordinates(`${pos.coords.latitude.toFixed(4)}° N, ${pos.coords.longitude.toFixed(4)}° E`);
      }, () => {});
    }
  }, []);

  const handleLangChange = (code) => {
    if (isRecording) stopRecording();
    setSelectedLang(code);
    const name = LANGUAGES.find(l => l.code === code)?.name || code;
    showToast(`🌐 ${name} selected`, `Tap Speak to record in ${name}`);
  };

  const startRecording = async () => {
    browserTranscriptRef.current = '';
    audioChunksRef.current = [];
    setGrievanceText('');

    // Start MediaRecorder for actual audio blob
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream, { mimeType: 'audio/webm' });
      recorder.ondataavailable = (e) => { if (e.data.size > 0) audioChunksRef.current.push(e.data); };
      recorder.start(250);
      mediaRecorderRef.current = recorder;
    } catch (err) {
      console.warn('MediaRecorder not available:', err.message);
    }

    // Start browser speech recognition for live text display
    try {
      if (recognitionRef.current) {
        recognitionRef.current.lang = selectedLang;
        recognitionRef.current.start();
      }
    } catch (e) {}

    // Start timer
    secondsRef.current = 0;
    setRecordingDuration('00:00');
    timerRef.current = setInterval(() => {
      secondsRef.current++;
      const s = secondsRef.current;
      setRecordingDuration(`00:${s < 10 ? '0' + s : s}`);
    }, 1000);

    setIsRecording(true);
    const langName = LANGUAGES.find(l => l.code === selectedLang)?.name || 'your language';
    showToast(`🎙️ Recording in ${langName}`, 'Speak your grievance clearly...');
  };

  const stopRecording = async () => {
    setIsRecording(false);
    clearInterval(timerRef.current);

    // Stop browser recognition
    try { recognitionRef.current?.stop(); } catch (e) {}

    // Stop MediaRecorder and get audio blob
    let audioBlob = null;
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      await new Promise((resolve) => {
        mediaRecorderRef.current.onstop = resolve;
        mediaRecorderRef.current.stop();
        // Stop all tracks
        mediaRecorderRef.current.stream?.getTracks().forEach(t => t.stop());
      });
      if (audioChunksRef.current.length > 0) {
        audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
      }
    }

    // Send to backend for Bhashini transcription
    setIsTranscribing(true);
    showToast('🔄 Transcribing...', 'Sending to Bhashini AI...');

    const result = await transcribeAudio(
      audioBlob || new Blob([], { type: 'audio/webm' }),
      selectedLang,
      browserTranscriptRef.current
    );

    if (result.text) {
      setGrievanceText(result.text);
    }

    setIsTranscribing(false);

    const source = result.source === 'bhashini' ? '✅ Bhashini AI' : '✅ Browser STT';
    showToast(`${source}`, `Transcribed: "${(result.text || '').slice(0, 40)}..."`);
  };

  const handleSpeakClick = () => {
    setSelectedMethod('voice');
    if (!isRecording) {
      startRecording();
    } else {
      stopRecording();
    }
  };

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
          showToast('📷 Photo Attached', 'AI will analyze the image for defects.');
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleContinue = async () => {
    if (!grievanceText.trim()) {
      showToast('⚠️ Empty Complaint', 'Please speak, type, or upload a photo.');
      return;
    }

    // Classify using Gemini AI via backend
    setIsClassifying(true);
    showToast('🧠 AI Analysing...', 'Classifying your complaint with Gemini AI...');

    const classification = await classifyText(grievanceText, selectedLang);

    setIsClassifying(false);

    setCurrentDraft({
      ...currentDraft,
      inputType: selectedMethod,
      audioDuration: recordingDuration || '00:06',
      recorded: selectedMethod === 'voice',
      description: grievanceText,
      audioTranscript: grievanceText,
      image: uploadedImage,
      gps: gpsCoordinates,
      language: selectedLang,
      issue: grievanceText,
      category: classification.category,
      ward: currentDraft.ward || 'Ward 5',
      authority: classification.department,
      priority: classification.priority,
      confidence: classification.confidence,
      classificationSource: classification.source,
    });

    navigate('/report/preview');
  };

  const currentLangObj = LANGUAGES.find(l => l.code === selectedLang);
  const isProcessing = isTranscribing || isClassifying;

  return (
    <div style={{ backgroundColor: '#F7FAF8', minHeight: 'calc(100vh - 80px)', padding: '2.5rem 1.5rem 4rem' }}>
      <div style={{ maxWidth: '820px', margin: '0 auto' }}>
        <input ref={fileInputRef} type="file" accept="image/*" capture="environment" onChange={handleImageUpload} style={{ display: 'none' }} />

        <h1 style={{ fontSize: '1.65rem', fontWeight: 800, color: '#102333', marginBottom: '1rem' }}>
          Apni Shikayat Darj Karein
        </h1>

        {/* Language Selector Pills */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.75rem', flexWrap: 'wrap' }}>
          <Globe size={16} color="#5A6D7C" />
          {LANGUAGES.map((lang) => (
            <button key={lang.code} type="button" onClick={() => handleLangChange(lang.code)}
              style={{
                padding: '0.35rem 0.85rem', borderRadius: '9999px',
                border: selectedLang === lang.code ? '2px solid #35654B' : '1px solid #DDE7E2',
                backgroundColor: selectedLang === lang.code ? '#EAF5EF' : '#FFFFFF',
                color: selectedLang === lang.code ? '#35654B' : '#5A6D7C',
                fontWeight: selectedLang === lang.code ? 800 : 500,
                fontSize: '0.82rem', cursor: 'pointer',
              }}>
              {lang.label}
            </button>
          ))}
        </div>

        {/* Three Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem', marginBottom: '1.5rem' }}>
          {/* Speak Card */}
          <div onClick={handleSpeakClick}
            style={{
              backgroundColor: '#FFFFFF',
              border: selectedMethod === 'voice' ? '2px solid #35654B' : '1px solid #E2EBE6',
              borderRadius: '14px', padding: '1.75rem 1rem',
              display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center',
              cursor: isProcessing ? 'default' : 'pointer',
              opacity: isProcessing && !isRecording ? 0.6 : 1,
            }}>
            <div style={{
              width: '52px', height: '52px', borderRadius: '50%',
              backgroundColor: isRecording ? '#DE4C4C' : isTranscribing ? '#F59E0B' : '#35654B',
              color: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem',
              animation: isRecording ? 'pulse 1.5s infinite' : 'none',
            }}>
              {isTranscribing ? <Loader size={22} style={{ animation: 'spin 1s linear infinite' }} /> : <Mic size={24} strokeWidth={2.4} />}
            </div>
            <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#102333', marginBottom: '0.35rem' }}>
              {isTranscribing ? 'Transcribing...' : 'Speak'}
            </div>
            <div style={{ fontSize: '0.8rem', color: isRecording ? '#DE4C4C' : '#5A6D7C', fontWeight: isRecording ? 700 : 400 }}>
              {isTranscribing
                ? '🔄 Bhashini AI processing...'
                : isRecording
                  ? `🔴 Listening in ${currentLangObj?.name}... (${recordingDuration}) — Tap to stop`
                  : `Tap to speak in ${currentLangObj?.name}`}
            </div>
          </div>

          {/* Camera Card */}
          <div onClick={handleCameraClick}
            style={{
              backgroundColor: '#FFFFFF',
              border: selectedMethod === 'camera' ? '2px solid #3267A8' : '1px solid #E2EBE6',
              borderRadius: '14px', padding: '1.75rem 1rem',
              display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', cursor: 'pointer',
            }}>
            <div style={{ width: '52px', height: '52px', borderRadius: '50%', backgroundColor: '#3267A8', color: '#FFF', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
              <Camera size={24} strokeWidth={2.4} />
            </div>
            <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#102333', marginBottom: '0.35rem' }}>Camera</div>
            <div style={{ fontSize: '0.8rem', color: '#5A6D7C' }}>{uploadedImage ? '✅ Photo attached' : 'Photo evidence'}</div>
          </div>

          {/* Type Card */}
          <div onClick={() => setSelectedMethod('type')}
            style={{
              backgroundColor: '#FFFFFF',
              border: selectedMethod === 'type' ? '2px solid #7150A8' : '1px solid #E2EBE6',
              borderRadius: '14px', padding: '1.75rem 1rem',
              display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', cursor: 'pointer',
            }}>
            <div style={{ width: '52px', height: '52px', borderRadius: '50%', backgroundColor: '#7150A8', color: '#FFF', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
              <Edit3 size={24} strokeWidth={2.4} />
            </div>
            <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#102333', marginBottom: '0.35rem' }}>Type</div>
            <div style={{ fontSize: '0.8rem', color: '#5A6D7C' }}>Write your grievance</div>
          </div>
        </div>

        {/* Text Area */}
        <div style={{ backgroundColor: '#FFF', border: '1px solid #E2EBE6', borderRadius: '12px', padding: '1.25rem 1.5rem', marginBottom: '1.25rem' }}>
          <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#5A6D7C', marginBottom: '0.65rem' }}>
            Ya seedha likhein
          </label>
          <textarea rows={3} value={grievanceText}
            onChange={(e) => { setGrievanceText(e.target.value); setSelectedMethod('type'); }}
            placeholder={
              selectedLang === 'kn-IN' ? 'ಉದಾ: ನಮ್ಮ ಊರಿನಲ್ಲಿ ರೋಡು ಕೆಟ್ಟುಹೋಗಿದೆ ಗುಂಡಿ ಬಿದ್ದಿದೆ' :
              selectedLang === 'hi-IN' ? 'जैसे: हमारे गांव में सड़क खराब है गड्ढे पड़ गए हैं' :
              selectedLang === 'te-IN' ? 'ఉదా: మా వీధిలో రోడ్డు పాడైంది' :
              selectedLang === 'ta-IN' ? 'எ.கா: எங்கள் தெருவில் சாலை சேதமடைந்துள்ளது' :
              selectedLang === 'mr-IN' ? 'उदा: आमच्या गावात रस्ता खराब झाला आहे' :
              'E.g.: The road in our village has potholes and is badly damaged'
            }
            style={{ width: '100%', border: '1px solid #DDE7E2', borderRadius: '8px', padding: '0.85rem', fontSize: '0.92rem', color: '#102333', outline: 'none', backgroundColor: '#FFF', lineHeight: 1.5, resize: 'none' }}
          />
        </div>

        {/* Location Card */}
        <div style={{ backgroundColor: '#FFF', border: '1px solid #E2EBE6', borderRadius: '12px', padding: '1.25rem 1.5rem', marginBottom: '2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', fontWeight: 700, color: '#102333' }}>
              <MapPin size={16} color="#DE4C4C" /> Location
            </div>
            <div style={{ fontSize: '0.85rem', fontWeight: 800, color: '#102333' }}>Auto-GPS: ON</div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.88rem' }}>
            <span style={{ color: '#5A6D7C' }}>Coordinates</span>
            <span style={{ fontWeight: 800, color: '#102333' }}>{gpsCoordinates} • Ward 5</span>
          </div>
        </div>

        {/* Continue Button */}
        <button type="button" onClick={handleContinue} disabled={isProcessing}
          style={{
            width: '100%', backgroundColor: isProcessing ? '#8BAD99' : '#35654B',
            color: '#FFF', border: 'none', borderRadius: '8px',
            padding: '0.9rem', fontSize: '0.95rem', fontWeight: 800,
            letterSpacing: '0.5px', cursor: isProcessing ? 'wait' : 'pointer',
          }}>
          {isClassifying ? '🧠 AI CLASSIFYING...' : isTranscribing ? '🔄 TRANSCRIBING...' : 'CONTINUE'}
        </button>
      </div>

      <style>{`
        @keyframes pulse {
          0% { box-shadow: 0 0 0 0 rgba(222,76,76,0.4); }
          70% { box-shadow: 0 0 0 10px rgba(222,76,76,0); }
          100% { box-shadow: 0 0 0 0 rgba(222,76,76,0); }
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
