import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle, Sparkles, MapPin, Building, AlertCircle, Edit2, ShieldAlert } from 'lucide-react';
import AudioWaveform from '../components/AudioWaveform';
import StatusBadge from '../components/StatusBadge';
import { useComplaints } from '../context/ComplaintContext';

export default function AIPreview() {
  const navigate = useNavigate();
  const { currentDraft, addComplaint } = useComplaints();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleConfirmSubmit = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      const newGrievance = addComplaint({
        issue: currentDraft.issue || "Water Leakage",
        category: currentDraft.category || "Water Supply",
        location: currentDraft.location || "Near Government School, Ward 5",
        gps: currentDraft.gps || "12.8797° N, 74.8509° E",
        authority: currentDraft.authority || "Gram Panchayat (Water Department)",
        priority: currentDraft.priority || "High",
        confidence: currentDraft.confidence || 94,
        description: currentDraft.description || "Water leakage near government school.",
        audioDuration: currentDraft.audioDuration || "00:06",
        inputType: currentDraft.inputType || "voice",
        image: currentDraft.image || "https://images.unsplash.com/photo-1584467735815-f778f274e296?auto=format&fit=crop&w=600&q=80"
      });

      navigate('/complaint/submitted', { state: { grievanceId: newGrievance.id } });
    }, 600);
  };

  return (
    <div style={{ backgroundColor: '#F7FAF8', minHeight: 'calc(100vh - 80px)', paddingBottom: '4rem' }}>
      <div className="page-wrapper-sm">
        {/* Top Back Navigation */}
        <div style={{ marginBottom: '1.5rem' }}>
          <Link
            to="/report"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              color: '#5A6D7C',
              fontSize: '0.9rem',
              fontWeight: 600
            }}
          >
            <ArrowLeft size={16} />
            Back to Input Options
          </Link>
        </div>

        {/* Heading */}
        <div style={{ textAlign: 'center', marginBottom: '2.25rem' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            backgroundColor: '#E2F5EC',
            color: '#087A55',
            padding: '0.3rem 0.8rem',
            borderRadius: '9999px',
            fontSize: '0.78rem',
            fontWeight: 700,
            marginBottom: '0.5rem'
          }}>
            <Sparkles size={14} />
            AI Parsing Complete
          </div>
          <h1 style={{
            fontSize: '2rem',
            fontWeight: 800,
            color: '#102333',
            marginBottom: '0.35rem'
          }}>
            AI Understanding Preview
          </h1>
          <p style={{ fontSize: '0.95rem', color: '#5A6D7C', fontWeight: 500 }}>
            Review AI extracted details before submitting
          </p>
        </div>

        {/* TWO TOP CARDS */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '1.25rem',
          marginBottom: '1.75rem'
        }}>
          {/* Card Left: Input Provided */}
          <div style={{
            backgroundColor: '#FFFFFF',
            border: '1px solid #DDE7E2',
            borderRadius: '14px',
            padding: '1.25rem',
            boxShadow: '0 2px 6px rgba(16, 35, 51, 0.03)'
          }}>
            <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#8A9CA8', textTransform: 'uppercase', marginBottom: '0.6rem' }}>
              Input Provided
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.85rem' }}>
              <span style={{ fontSize: '1rem', fontWeight: 800, color: '#087A55', textTransform: 'capitalize' }}>
                {currentDraft.inputType || 'Voice'}
              </span>
              <span style={{ fontSize: '0.8rem', color: '#5A6D7C', backgroundColor: '#F0F5F2', padding: '2px 8px', borderRadius: '4px' }}>
                Recorded Audio
              </span>
            </div>
            <AudioWaveform duration={currentDraft.audioDuration || "00:06"} />
            {currentDraft.audioTranscript && (
              <div style={{
                marginTop: '0.75rem',
                fontSize: '0.8rem',
                color: '#5A6D7C',
                backgroundColor: '#F9FCFA',
                padding: '0.5rem 0.75rem',
                borderRadius: '6px',
                borderLeft: '3px solid #087A55',
                fontStyle: 'italic'
              }}>
                "{currentDraft.audioTranscript}"
              </div>
            )}
          </div>

          {/* Card Right: Image (Optional) */}
          <div style={{
            backgroundColor: '#FFFFFF',
            border: '1px solid #DDE7E2',
            borderRadius: '14px',
            padding: '1.25rem',
            boxShadow: '0 2px 6px rgba(16, 35, 51, 0.03)'
          }}>
            <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#8A9CA8', textTransform: 'uppercase', marginBottom: '0.6rem' }}>
              Image (Optional)
            </div>
            <div style={{
              width: '100%',
              height: '110px',
              borderRadius: '10px',
              overflow: 'hidden',
              position: 'relative',
              border: '1px solid #E2EBF0'
            }}>
              <img
                src={currentDraft.image || "https://images.unsplash.com/photo-1584467735815-f778f274e296?auto=format&fit=crop&w=600&q=80"}
                alt="Complaint evidence"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <div style={{
                position: 'absolute',
                top: '8px',
                right: '8px',
                backgroundColor: 'rgba(8, 122, 85, 0.9)',
                color: '#FFFFFF',
                fontSize: '0.72rem',
                padding: '2px 8px',
                borderRadius: '4px',
                fontWeight: 600
              }}>
                Evidence Attached
              </div>
            </div>
          </div>
        </div>

        {/* AI EXTRACTED INFORMATION STRUCTURED CARD */}
        <div style={{
          backgroundColor: '#FFFFFF',
          border: '1px solid #DDE7E2',
          borderRadius: '16px',
          padding: '1.75rem',
          boxShadow: '0 4px 14px rgba(16, 35, 51, 0.04)',
          marginBottom: '2rem'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottom: '1px solid #EEF3F0',
            paddingBottom: '1rem',
            marginBottom: '1.25rem'
          }}>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#102333' }}>
              AI Extracted Information
            </h3>
            <span style={{ fontSize: '0.78rem', color: '#087A55', fontWeight: 700, backgroundColor: '#E8F6EF', padding: '3px 10px', borderRadius: '9999px' }}>
              Auto-Classified
            </span>
          </div>

          {/* Structured Fields Grid / Table */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {/* Field: Issue */}
            <div style={{ display: 'grid', gridTemplateColumns: '180px 1fr', alignItems: 'center' }}>
              <span style={{ fontSize: '0.88rem', fontWeight: 600, color: '#5A6D7C' }}>Issue</span>
              <span style={{ fontSize: '0.95rem', fontWeight: 700, color: '#102333' }}>
                {currentDraft.issue || "Water Leakage"}
              </span>
            </div>

            {/* Field: Category */}
            <div style={{ display: 'grid', gridTemplateColumns: '180px 1fr', alignItems: 'center' }}>
              <span style={{ fontSize: '0.88rem', fontWeight: 600, color: '#5A6D7C' }}>Category</span>
              <span style={{ fontSize: '0.95rem', fontWeight: 600, color: '#087A55' }}>
                {currentDraft.category || "Water Supply"}
              </span>
            </div>

            {/* Field: Location */}
            <div style={{ display: 'grid', gridTemplateColumns: '180px 1fr', alignItems: 'center' }}>
              <span style={{ fontSize: '0.88rem', fontWeight: 600, color: '#5A6D7C' }}>Location</span>
              <span style={{ fontSize: '0.95rem', fontWeight: 600, color: '#102333' }}>
                {currentDraft.location || "Near Government School, Ward 5"}
              </span>
            </div>

            {/* Field: GPS Coordinates */}
            <div style={{ display: 'grid', gridTemplateColumns: '180px 1fr', alignItems: 'center' }}>
              <span style={{ fontSize: '0.88rem', fontWeight: 600, color: '#5A6D7C' }}>GPS Coordinates</span>
              <span style={{ fontSize: '0.88rem', fontFamily: 'monospace', color: '#2366B1', fontWeight: 600 }}>
                {currentDraft.gps || "12.8797° N, 74.8509° E"}
              </span>
            </div>

            {/* Field: Supported Authority */}
            <div style={{ display: 'grid', gridTemplateColumns: '180px 1fr', alignItems: 'center' }}>
              <span style={{ fontSize: '0.88rem', fontWeight: 600, color: '#5A6D7C' }}>Supported Authority</span>
              <span style={{ fontSize: '0.95rem', fontWeight: 700, color: '#102333' }}>
                {currentDraft.authority || "Gram Panchayat (Water Department)"}
              </span>
            </div>

            {/* Field: Priority */}
            <div style={{ display: 'grid', gridTemplateColumns: '180px 1fr', alignItems: 'center' }}>
              <span style={{ fontSize: '0.88rem', fontWeight: 600, color: '#5A6D7C' }}>Priority</span>
              <div>
                <StatusBadge priority={currentDraft.priority || "High"} />
              </div>
            </div>

            {/* Field: Confidence Score with Green Progress Bar */}
            <div style={{ display: 'grid', gridTemplateColumns: '180px 1fr', alignItems: 'center', paddingTop: '0.5rem' }}>
              <span style={{ fontSize: '0.88rem', fontWeight: 600, color: '#5A6D7C' }}>Confidence Score</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{
                  flex: 1,
                  height: '10px',
                  backgroundColor: '#E7F2EC',
                  borderRadius: '9999px',
                  overflow: 'hidden',
                  position: 'relative'
                }}>
                  <div style={{
                    width: `${currentDraft.confidence || 94}%`,
                    height: '100%',
                    backgroundColor: '#087A55',
                    borderRadius: '9999px'
                  }} />
                </div>
                <span style={{ fontSize: '0.95rem', fontWeight: 800, color: '#087A55' }}>
                  {currentDraft.confidence || 94}%
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM BUTTONS */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '1rem',
          flexWrap: 'wrap'
        }}>
          <Link
            to="/report"
            className="btn btn-outline"
            style={{
              padding: '0.85rem 1.75rem',
              fontWeight: 700,
              fontSize: '0.9rem',
              borderColor: '#DDE7E2',
              backgroundColor: '#FFFFFF'
            }}
          >
            <Edit2 size={16} />
            EDIT DETAILS
          </Link>

          <button
            type="button"
            onClick={handleConfirmSubmit}
            disabled={isSubmitting}
            className="btn btn-primary"
            style={{
              padding: '0.85rem 2.25rem',
              fontWeight: 800,
              fontSize: '0.95rem',
              boxShadow: '0 4px 14px rgba(8, 122, 85, 0.3)'
            }}
          >
            {isSubmitting ? "SUBMITTING..." : "CONFIRM & SUBMIT"}
            <CheckCircle size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
