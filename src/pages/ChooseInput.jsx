import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mic, Camera, Edit3, MapPin, ArrowRight, Check, Image as ImageIcon, Volume2, Square } from 'lucide-react';
import InputMethodCard from '../components/InputMethodCard';
import LocationCard from '../components/LocationCard';
import AudioWaveform from '../components/AudioWaveform';
import { useComplaints } from '../context/ComplaintContext';

export default function ChooseInput() {
  const navigate = useNavigate();
  const { currentDraft, setCurrentDraft } = useComplaints();

  const [selectedMethod, setSelectedMethod] = useState(currentDraft.inputType || 'voice');
  const [isRecording, setIsRecording] = useState(false);
  const [recordingSeconds, setRecordingSeconds] = useState(6);
  const [useLocation, setUseLocation] = useState(currentDraft.useGps ?? true);
  const [customText, setCustomText] = useState(currentDraft.description || "Street light not working near Government School.");
  const [uploadedImage, setUploadedImage] = useState(currentDraft.image || "https://images.unsplash.com/photo-1584467735815-f778f274e296?auto=format&fit=crop&w=600&q=80");

  const toggleRecording = () => {
    if (!isRecording) {
      setIsRecording(true);
      setSelectedMethod('voice');
    } else {
      setIsRecording(false);
    }
  };

  const handleContinue = () => {
    let issue = "Water Leakage";
    let category = "Water Supply";
    let authority = "Gram Panchayat (Water Department)";
    let priority = "High";
    let confidence = 94;

    if (selectedMethod === 'type') {
      if (customText.toLowerCase().includes('light')) {
        issue = "Street Light Not Working";
        category = "Street Light";
        authority = "Gram Panchayat (Electrical Dept)";
        confidence = 92;
      } else if (customText.toLowerCase().includes('garbage') || customText.toLowerCase().includes('waste')) {
        issue = "Garbage Not Collected";
        category = "Garbage";
        authority = "Gram Panchayat (Sanitation Dept)";
        confidence = 96;
      } else if (customText.toLowerCase().includes('road')) {
        issue = "Broken Road / Pothole";
        category = "Roads";
        authority = "Gram Panchayat (PWD)";
        confidence = 90;
      }
    }

    setCurrentDraft({
      ...currentDraft,
      inputType: selectedMethod,
      audioDuration: isRecording ? `00:${recordingSeconds < 10 ? '0' + recordingSeconds : recordingSeconds}` : '00:06',
      recorded: selectedMethod === 'voice',
      description: selectedMethod === 'type' ? customText : (selectedMethod === 'camera' ? "Water leakage from municipal connection" : "Major pipeline burst near the government school entrance causing water wastage."),
      image: uploadedImage,
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
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
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
            Choose any one option to begin
          </p>
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
            buttonText={isRecording ? "Stop Recording" : "Start Recording"}
            onButtonClick={toggleRecording}
          >
            <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <AudioWaveform isRecording={isRecording} duration={isRecording ? "00:08" : "00:06"} />
              <div style={{ fontSize: '0.75rem', color: '#087A55', fontWeight: 600 }}>
                {isRecording ? "Listening... Speak now in Hindi, Marathi, or English" : "Tap button to record audio grievance"}
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
            buttonText="Open Camera"
            onButtonClick={() => setSelectedMethod('camera')}
          >
            <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
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
                  alt="Water leakage sample"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div style={{
                  position: 'absolute',
                  bottom: '6px',
                  right: '6px',
                  backgroundColor: 'rgba(16, 35, 51, 0.75)',
                  color: '#FFFFFF',
                  fontSize: '0.7rem',
                  padding: '2px 8px',
                  borderRadius: '4px',
                  fontWeight: 600
                }}>
                  Water Leakage
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
                placeholder="Type your issue here..."
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
          onToggle={setUseLocation}
          locationText="12.8797° N, 74.8509° E • Ward 5, Near Govt School"
        />

        {/* BOTTOM CENTERED CONTINUE BUTTON */}
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2rem' }}>
          <button
            type="button"
            onClick={handleContinue}
            className="btn btn-primary btn-lg"
            style={{
              minWidth: '220px',
              padding: '0.9rem 2.5rem',
              fontSize: '1rem',
              fontWeight: 800,
              letterSpacing: '0.5px',
              boxShadow: '0 6px 18px rgba(8, 122, 85, 0.3)'
            }}
          >
            CONTINUE
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
