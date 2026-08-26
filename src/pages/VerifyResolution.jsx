import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, AlertCircle, XCircle, Send, Sparkles, Check } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useComplaints } from '../context/ComplaintContext';

export default function VerifyResolution() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getComplaintById, updateResolution } = useComplaints();

  const complaint = getComplaintById(id);
  const [selectedStatus, setSelectedStatus] = useState('resolved'); // 'resolved', 'partially', 'not_resolved'
  const [feedback, setFeedback] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateResolution(complaint.id, selectedStatus, feedback);
    setSubmitted(true);

    if (selectedStatus === 'resolved') {
      try {
        confetti({
          particleCount: 80,
          spread: 60,
          origin: { y: 0.6 }
        });
      } catch (err) {
        // confetti fallback
      }
    }

    setTimeout(() => {
      navigate(`/complaints/${complaint.id}`);
    }, 1800);
  };

  return (
    <div style={{ backgroundColor: '#F7FAF8', minHeight: 'calc(100vh - 80px)', paddingBottom: '4rem' }}>
      <div className="page-wrapper-sm">
        {/* Top Back Navigation */}
        <div style={{ marginBottom: '1.5rem' }}>
          <Link
            to={`/complaints/${complaint.id}`}
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
            Back to Complaint Details
          </Link>
        </div>

        {/* Heading */}
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <h1 style={{
            fontSize: '2rem',
            fontWeight: 800,
            color: '#102333',
            marginBottom: '0.35rem',
            letterSpacing: '-0.3px'
          }}>
            Verify Resolution
          </h1>
          <p style={{ fontSize: '0.95rem', color: '#5A6D7C', fontWeight: 500 }}>
            Please confirm the current status of your complaint.
          </p>
        </div>

        {/* MAIN VERIFICATION CARD */}
        <div style={{
          backgroundColor: '#FFFFFF',
          border: '1px solid #DDE7E2',
          borderRadius: '16px',
          padding: '2rem',
          boxShadow: '0 4px 16px rgba(16, 35, 51, 0.05)',
          marginBottom: '2rem'
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '2rem',
            marginBottom: '2rem'
          }}>
            {/* Left Side: Complaint Summary Card & Image */}
            <div>
              <div style={{
                backgroundColor: '#F8FAF9',
                border: '1px solid #E2EBE6',
                borderRadius: '12px',
                padding: '1.25rem',
                marginBottom: '1rem'
              }}>
                <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#8A9CA8', textTransform: 'uppercase' }}>
                  Complaint ID
                </div>
                <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#087A55', marginTop: '2px' }}>
                  {complaint.id}
                </div>

                <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#8A9CA8', textTransform: 'uppercase', marginTop: '0.85rem' }}>
                  Issue
                </div>
                <div style={{ fontSize: '1rem', fontWeight: 700, color: '#102333', marginTop: '2px' }}>
                  {complaint.issue}
                </div>

                <div style={{ fontSize: '0.82rem', color: '#5A6D7C', marginTop: '0.4rem' }}>
                  {complaint.location}
                </div>
              </div>

              {/* Complaint Image */}
              <div style={{
                width: '100%',
                height: '140px',
                borderRadius: '10px',
                overflow: 'hidden',
                border: '1px solid #DDE7E2'
              }}>
                <img
                  src={complaint.image || "https://images.unsplash.com/photo-1584467735815-f778f274e296?auto=format&fit=crop&w=600&q=80"}
                  alt="Complaint evidence"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
            </div>

            {/* Right Side: Question & 3 Large Selectable Options */}
            <div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#102333', marginBottom: '1rem' }}>
                Is your issue resolved now?
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                {/* Option 1: Green - YES, RESOLVED */}
                <div
                  onClick={() => setSelectedStatus('resolved')}
                  style={{
                    backgroundColor: selectedStatus === 'resolved' ? '#F0FAF4' : '#FFFFFF',
                    border: `2px solid ${selectedStatus === 'resolved' ? '#087A55' : '#DDE7E2'}`,
                    borderRadius: '12px',
                    padding: '1rem 1.25rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '0.85rem',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <div style={{
                    width: '24px',
                    height: '24px',
                    borderRadius: '50%',
                    backgroundColor: selectedStatus === 'resolved' ? '#087A55' : '#EAF2EE',
                    color: selectedStatus === 'resolved' ? '#FFFFFF' : '#8A9CA8',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop: '2px',
                    flexShrink: 0
                  }}>
                    {selectedStatus === 'resolved' ? <Check size={14} strokeWidth={3} /> : <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#8A9CA8' }} />}
                  </div>
                  <div>
                    <div style={{ fontSize: '0.95rem', fontWeight: 800, color: selectedStatus === 'resolved' ? '#087A55' : '#102333' }}>
                      YES, RESOLVED
                    </div>
                    <div style={{ fontSize: '0.82rem', color: '#5A6D7C', marginTop: '2px' }}>
                      The issue has been completely resolved.
                    </div>
                  </div>
                </div>

                {/* Option 2: Red/Light Red - NOT COMPLETELY RESOLVED */}
                <div
                  onClick={() => setSelectedStatus('partially')}
                  style={{
                    backgroundColor: selectedStatus === 'partially' ? '#FEF4F4' : '#FFFFFF',
                    border: `2px solid ${selectedStatus === 'partially' ? '#E94B4B' : '#DDE7E2'}`,
                    borderRadius: '12px',
                    padding: '1rem 1.25rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '0.85rem',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <div style={{
                    width: '24px',
                    height: '24px',
                    borderRadius: '50%',
                    backgroundColor: selectedStatus === 'partially' ? '#E94B4B' : '#FDE8E8',
                    color: selectedStatus === 'partially' ? '#FFFFFF' : '#D92D20',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop: '2px',
                    flexShrink: 0
                  }}>
                    {selectedStatus === 'partially' ? <Check size={14} strokeWidth={3} /> : <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#D92D20' }} />}
                  </div>
                  <div>
                    <div style={{ fontSize: '0.95rem', fontWeight: 800, color: selectedStatus === 'partially' ? '#E94B4B' : '#102333' }}>
                      NOT COMPLETELY RESOLVED
                    </div>
                    <div style={{ fontSize: '0.82rem', color: '#5A6D7C', marginTop: '2px' }}>
                      The issue is partly resolved.
                    </div>
                  </div>
                </div>

                {/* Option 3: Blue/Light Blue - NOT RESOLVED */}
                <div
                  onClick={() => setSelectedStatus('not_resolved')}
                  style={{
                    backgroundColor: selectedStatus === 'not_resolved' ? '#EFF5FB' : '#FFFFFF',
                    border: `2px solid ${selectedStatus === 'not_resolved' ? '#2366B1' : '#DDE7E2'}`,
                    borderRadius: '12px',
                    padding: '1rem 1.25rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '0.85rem',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <div style={{
                    width: '24px',
                    height: '24px',
                    borderRadius: '50%',
                    backgroundColor: selectedStatus === 'not_resolved' ? '#2366B1' : '#DBE9F8',
                    color: selectedStatus === 'not_resolved' ? '#FFFFFF' : '#2366B1',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop: '2px',
                    flexShrink: 0
                  }}>
                    {selectedStatus === 'not_resolved' ? <Check size={14} strokeWidth={3} /> : <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#2366B1' }} />}
                  </div>
                  <div>
                    <div style={{ fontSize: '0.95rem', fontWeight: 800, color: selectedStatus === 'not_resolved' ? '#2366B1' : '#102333' }}>
                      NOT RESOLVED
                    </div>
                    <div style={{ fontSize: '0.82rem', color: '#5A6D7C', marginTop: '2px' }}>
                      The issue is still not resolved.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ADD FEEDBACK (OPTIONAL) */}
          <div style={{ borderTop: '1px solid #EEF3F0', paddingTop: '1.5rem', marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 700, color: '#102333', marginBottom: '0.5rem' }}>
              Add Feedback (Optional)
            </label>
            <textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="Write your feedback..."
              rows={3}
              style={{
                width: '100%',
                padding: '0.75rem 1rem',
                borderRadius: '10px',
                border: '1px solid #DDE7E2',
                fontSize: '0.9rem',
                outline: 'none',
                backgroundColor: '#FAFCFA',
                lineHeight: 1.5,
                resize: 'none'
              }}
            />
          </div>

          {/* SUBMIT CONFIRMATION BUTTON */}
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <button
              type="button"
              onClick={handleSubmit}
              disabled={submitted}
              className="btn btn-primary btn-lg"
              style={{
                padding: '0.85rem 2.25rem',
                fontWeight: 800,
                fontSize: '0.95rem',
                boxShadow: '0 4px 14px rgba(8, 122, 85, 0.28)'
              }}
            >
              {submitted ? "VERIFIED!" : "SUBMIT CONFIRMATION"}
              <CheckCircle2 size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
