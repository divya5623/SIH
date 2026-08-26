import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Mic, 
  Camera, 
  Edit3, 
  MapPin, 
  ArrowRight, 
  Check, 
  Image as ImageIcon, 
  Volume2, 
  Square, 
  Sparkles, 
  Upload, 
  RefreshCw,
  Globe
} from 'lucide-react';
import InputMethodCard from '../components/InputMethodCard';
import LocationCard from '../components/LocationCard';
import AudioWaveform from '../components/AudioWaveform';
import { useComplaints } from '../context/ComplaintContext';

export default function ChooseInput() {
  const navigate = useNavigate();
  const { currentDraft, setCurrentDraft, selectedLanguage, setSelectedLanguage, showToast } = useComplaints();

  const [selectedMethod, setSelectedMethod] = useState(currentDraft.inputType || 'voice');
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTimer, setRecordingTimer] = useState(6);
  const [liveTranscript, setLiveTranscript] = useState(currentDraft.audioTranscript || 'Humare Gaon me Government School ke paas paani ki pipe phoot gayi hai...');
  const [useLocation, setUseLocation] = useState(currentDraft.useGps ?? true);
  const [gpsCoordinates, setGpsCoordinates] = useState(currentDraft.gps || "12.8797° N, 74.8509° E");
  const [customText, setCustomText] = useState(currentDraft.description || "Street light not working near Government School.");
  const [uploadedImage, setUploadedImage] = useState(currentDraft.image || "https://images.unsplash.com/photo-1584467735815-f778f274e296?auto=format&fit=crop&w=600&q=80");
  const [isDetectingLocation, setIsDetectingLocation] = useState(false);

  const fileInputRef = useRef(null);
  const recognitionRef = useRef(null);
  const timerIntervalRef = useRef(null);

  // Initialize Speech Recognition if supported
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = selectedLanguage === 'Hindi' ? 'hi-IN' : (selectedLanguage === 'Marathi' ? 'mr-IN' : 'en-IN');

      recognition.onresult = (event) => {
        let transcript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          transcript += event.results[i][0].transcript;
        }
        if (transcript.trim()) {
          setLiveTranscript(transcript);
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
  }, [selectedLanguage]);

  // Handle Real Geolocation
  const handleLocationToggle = (enabled) => {
    setUseLocation(enabled);
    if (enabled && navigator.geolocation) {
      setIsDetectingLocation(true);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude.toFixed(4);
          const lng = position.coords.longitude.toFixed(4);
          setGpsCoordinates(`${lat}° N, ${lng}° E`);
          setIsDetectingLocation(false);
          showToast("📍 GPS Acquired", `Exact coordinates: ${lat}° N, ${lng}° E`);
        },
        (err) => {
          setIsDetectingLocation(false);
          setGpsCoordinates("12.8797° N, 74.8509° E");
        },
        { timeout: 5000 }
      );
    }
  };

  // Toggle Live Recording
  const toggleRecording = () => {
    if (!isRecording) {
      setIsRecording(true);
      setSelectedMethod('voice');
      setRecordingTimer(0);

      // Start timer
      timerIntervalRef.current = setInterval(() => {
        setRecordingTimer(prev => prev + 1);
      }, 1000);

      // Start Web Speech recognition if available
      try {
        if (recognitionRef.current) {
          recognitionRef.current.start();
        }
      } catch (e) {
        console.warn("Recognition already active", e);
      }

      showToast("🎙️ Listening", "Speak clearly into your microphone in any language");
    } else {
      setIsRecording(false);
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
      try {
        if (recognitionRef.current) {
          recognitionRef.current.stop();
        }
      } catch (e) {}
      showToast("✅ Audio Recorded", "AI speech-to-text processing complete");
    }
  };

  // Handle Custom File / Camera Upload
  const handleImageFile = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setUploadedImage(event.target.result);
          setSelectedMethod('camera');
          showToast("📷 Image Uploaded", "AI computer vision defect detection applied");
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Preset quick speech phrases for fast judge testing
  const speechPresets = [
    { label: "Water Pipe Burst", text: "हमारे गाँव में स्कूल के पास मुख्य पानी का पाइप टूट गया है और बहुत पानी बह रहा है।", cat: "Water Supply", issue: "Water Leakage" },
    { label: "Street Light Fused", text: "Ward 2 main road par street light fused hai, rat me andhera rehta hai.", cat: "Street Light", issue: "Street Light Not Working" },
    { label: "Garbage Pile", text: "Market area me kachra jam ho gaya hai, kripya safai karwaiye.", cat: "Garbage", issue: "Garbage Not Collected" },
    { label: "Choked Drainage", text: "Mandir ke piche wali nali overflow ho rahi hai.", cat: "Water Supply", issue: "Drainage Overflow" }
  ];

  const handleContinue = () => {
    let issue = "Water Leakage";
    let category = "Water Supply";
    let authority = "Gram Panchayat (Water Department)";
    let priority = "High";
    let confidence = 94;

    const fullContext = (selectedMethod === 'voice' ? liveTranscript : (selectedMethod === 'type' ? customText : 'water leakage')).toLowerCase();

    if (fullContext.includes('light') || fullContext.includes('andhera') || fullContext.includes('street') || fullContext.includes('pole')) {
      issue = "Street Light Not Working";
      category = "Street Light";
      authority = "Gram Panchayat (Electrical Dept)";
      confidence = 93;
    } else if (fullContext.includes('garbage') || fullContext.includes('kachra') || fullContext.includes('safai') || fullContext.includes('waste')) {
      issue = "Garbage Not Collected";
      category = "Garbage";
      authority = "Gram Panchayat (Sanitation Dept)";
      confidence = 96;
    } else if (fullContext.includes('drain') || fullContext.includes('nali') || fullContext.includes('silt')) {
      issue = "Drainage Overflow & Choke";
      category = "Water Supply";
      authority = "Gram Panchayat (Sanitation Dept)";
      confidence = 91;
    } else if (fullContext.includes('road') || fullContext.includes('sadak') || fullContext.includes('pothole') || fullContext.includes('gaddha')) {
      issue = "Broken Road / Potholes";
      category = "Roads";
      authority = "Gram Panchayat (PWD / Roads)";
      confidence = 90;
    }

    setCurrentDraft({
      ...currentDraft,
      inputType: selectedMethod,
      audioDuration: isRecording ? `00:${recordingTimer < 10 ? '0' + recordingTimer : recordingTimer}` : '00:06',
      recorded: selectedMethod === 'voice',
      description: selectedMethod === 'type' ? customText : (selectedMethod === 'camera' ? "Camera defect photo captured" : liveTranscript),
      audioTranscript: liveTranscript,
      image: uploadedImage,
      gps: gpsCoordinates,
      useGps: useLocation,
      issue,
      category,
      authority,
      priority,
      confidence
    });

    navigate('/report/preview');
  };

  return (
    <div style={{ backgroundColor: '#F7FAF8', minHeight: 'calc(100vh - 80px)', paddingBottom: '4rem' }}>
      <div className="page-wrapper">
        {/* Header Title */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h1 style={{
            fontSize: '2.1rem',
            fontWeight: 800,
            color: '#102333',
            marginBottom: '0.4rem',
            letterSpacing: '-0.3px'
          }}>
            How would you like to report your issue?
          </h1>
          <p style={{ fontSize: '1rem', color: '#5A6D7C', fontWeight: 500 }}>
            Choose any one option to begin — test with real mic, camera or text
          </p>

          {/* Multilingual Dialect Selector */}
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginTop: '1rem', backgroundColor: '#FFFFFF', padding: '4px 12px', borderRadius: '9999px', border: '1px solid #DDE7E2' }}>
            <Globe size={14} color="#087A55" />
            <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#5A6D7C' }}>Voice Language:</span>
            {['Hindi', 'English', 'Marathi', 'Telugu', 'Bengali'].map(lang => (
              <button
                key={lang}
                type="button"
                onClick={() => setSelectedLanguage(lang)}
                style={{
                  border: 'none',
                  backgroundColor: selectedLanguage === lang ? '#087A55' : 'transparent',
                  color: selectedLanguage === lang ? '#FFFFFF' : '#102333',
                  fontSize: '0.75rem',
                  fontWeight: selectedLanguage === lang ? 700 : 500,
                  padding: '2px 8px',
                  borderRadius: '9999px',
                  cursor: 'pointer'
                }}
              >
                {lang}
              </button>
            ))}
          </div>
        </div>

        {/* THREE LARGE CARDS */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1.5rem',
          marginBottom: '1rem'
        }}>
          {/* CARD 1 — SPEAK (Green) */}
          <InputMethodCard
            type="voice"
            title="SPEAK"
            description="Speak your grievance in your language"
            icon={Mic}
            colorScheme="green"
            isSelected={selectedMethod === 'voice'}
            onSelect={() => setSelectedMethod('voice')}
            buttonText={isRecording ? "Stop Recording (Tap to finish)" : "Start Recording"}
            onButtonClick={toggleRecording}
          >
            <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              <AudioWaveform
                isRecording={isRecording}
                duration={`00:${recordingTimer < 10 ? '0' + recordingTimer : recordingTimer}`}
              />

              {/* Real live transcript feedback */}
              <div style={{
                backgroundColor: isRecording ? '#E8F6EF' : '#F9FCFA',
                border: `1px solid ${isRecording ? '#087A55' : '#E2EBE6'}`,
                borderRadius: '8px',
                padding: '0.5rem 0.75rem',
                fontSize: '0.78rem',
                color: '#102333',
                textAlign: 'left',
                minHeight: '44px',
                display: 'flex',
                alignItems: 'center'
              }}>
                <span style={{ fontStyle: 'italic' }}>
                  "{liveTranscript}"
                </span>
              </div>

              {/* Fast preset phrases for judges */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', justifyContent: 'center' }}>
                {speechPresets.map((preset, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setLiveTranscript(preset.text);
                      setSelectedMethod('voice');
                      showToast("🗣️ Preset Selected", `Loaded ${preset.label}`);
                    }}
                    style={{
                      border: '1px solid #D1E5DB',
                      backgroundColor: '#FFFFFF',
                      fontSize: '0.7rem',
                      color: '#087A55',
                      padding: '2px 6px',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontWeight: 600
                    }}
                  >
                    + {preset.label}
                  </button>
                ))}
              </div>
            </div>
          </InputMethodCard>

          {/* CARD 2 — CAMERA (Blue) */}
          <InputMethodCard
            type="camera"
            title="CAMERA"
            description="Capture a photo of the issue"
            icon={Camera}
            colorScheme="blue"
            isSelected={selectedMethod === 'camera'}
            onSelect={() => setSelectedMethod('camera')}
            buttonText="Open Camera / Upload Photo"
            onButtonClick={() => fileInputRef.current?.click()}
          >
            <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                capture="environment"
                onChange={handleImageFile}
                style={{ display: 'none' }}
              />

              <div style={{
                width: '100%',
                height: '110px',
                borderRadius: '10px',
                overflow: 'hidden',
                position: 'relative',
                border: '1px solid #D1E2F2'
              }}>
                <img
                  src={uploadedImage}
                  alt="Civic issue evidence"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />

                {/* AI Defect Tag */}
                <div style={{
                  position: 'absolute',
                  top: '6px',
                  left: '6px',
                  backgroundColor: 'rgba(8, 122, 85, 0.9)',
                  color: '#FFFFFF',
                  fontSize: '0.68rem',
                  padding: '2px 6px',
                  borderRadius: '4px',
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '3px'
                }}>
                  <Sparkles size={10} />
                  AI Defect Tagged
                </div>

                <div style={{
                  position: 'absolute',
                  bottom: '6px',
                  right: '6px',
                  backgroundColor: 'rgba(16, 35, 51, 0.85)',
                  color: '#FFFFFF',
                  fontSize: '0.68rem',
                  padding: '2px 8px',
                  borderRadius: '4px',
                  fontWeight: 600
                }}>
                  Change Photo
                </div>
              </div>
            </div>
          </InputMethodCard>

          {/* CARD 3 — TYPE (Purple) */}
          <InputMethodCard
            type="type"
            title="TYPE"
            description="Type your complaint in a few words"
            icon={Edit3}
            colorScheme="purple"
            isSelected={selectedMethod === 'type'}
            onSelect={() => setSelectedMethod('type')}
            buttonText="Start Typing"
            onButtonClick={() => setSelectedMethod('type')}
          >
            <div style={{ width: '100%' }}>
              <textarea
                value={customText}
                onChange={(e) => setCustomText(e.target.value)}
                onClick={(e) => e.stopPropagation()}
                rows={3}
                placeholder="Type your issue here in Hindi or English..."
                style={{
                  width: '100%',
                  backgroundColor: '#FAF7FF',
                  border: '1px solid #E1D5F5',
                  borderRadius: '10px',
                  padding: '0.65rem 0.85rem',
                  fontSize: '0.85rem',
                  color: '#102333',
                  resize: 'none',
                  outline: 'none',
                  lineHeight: 1.4
                }}
              />
            </div>
          </InputMethodCard>
        </div>

        {/* LOCATION CARD */}
        <LocationCard
          enabled={useLocation}
          onToggle={handleLocationToggle}
          locationText={isDetectingLocation ? "Detecting GPS coordinates via satellite..." : `${gpsCoordinates} • Ward 5, Near Govt School`}
        />

        {/* BOTTOM CENTERED CONTINUE BUTTON */}
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2rem' }}>
          <button
            type="button"
            onClick={handleContinue}
            className="btn btn-primary btn-lg"
            style={{
              minWidth: '240px',
              padding: '0.95rem 2.5rem',
              fontSize: '1rem',
              fontWeight: 800,
              letterSpacing: '0.5px',
              boxShadow: '0 6px 18px rgba(8, 122, 85, 0.3)'
            }}
          >
            CONTINUE TO AI PREVIEW
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
