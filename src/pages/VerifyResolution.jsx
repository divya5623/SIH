import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  CheckCircle2, 
  AlertCircle, 
  XCircle, 
  Send, 
  Sparkles, 
  Check, 
  Star,
  Award,
  FileCheck2,
  ShieldCheck
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useComplaints } from '../context/ComplaintContext';

export default function VerifyResolution() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getComplaintById, updateResolution } = useComplaints();

  const complaint = getComplaintById(id);
  const [selectedStatus, setSelectedStatus] = useState('resolved'); // 'resolved', 'partially', 'not_resolved'
  const [rating, setRating] = useState(5);
  const [feedback, setFeedback] = useState('Pipeline has been replaced with high pressure fitting. Water supply restored cleanly. Thank you Sarpanch ji!');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateResolution(complaint.id, selectedStatus, feedback, rating);
    setSubmitted(true);

    if (selectedStatus === 'resolved') {
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (err) {}
    }

    setTimeout(() => {
      navigate(`/complaints/${complaint.id}`);
    }, 2200);
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
          <div style={{
            width: '54px',
            height: '54px',
            borderRadius: '14px',
            backgroundColor: '#E8F6EF',
            color: '#087A55',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 0.75rem auto'
          }}>
            <ShieldCheck size={28} strokeWidth={2.4} />
          </div>
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
            Please confirm the current status of your complaint on the ground.
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
          {submitted ? (
            /* SUCCESS CONFIRMATION STATE */
            <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
              <div style={{
                width: '68px',
                height: '68px',
                borderRadius: '50%',
                backgroundColor: '#E8F6EF',
                color: '#087A55',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.25rem auto'
              }}>
                <FileCheck2 size={36} strokeWidth={2.5} />
              </div>
              <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#102333', marginBottom: '0.35rem' }}>
                Resolution Verified & Sealed!
              </h2>
              <p style={{ fontSize: '0.95rem', color: '#5A6D7C', maxWidth: '420px', margin: '0 auto 1.5rem auto' }}>
                Your citizen sign-off has been immutably recorded in Kalyanpur Gram Panchayat records.
              </p>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                backgroundColor: '#F3FAF6',
                border: '1px solid #087A55',
                padding: '0.5rem 1.25rem',
                borderRadius: '9999px',
                color: '#087A55',
                fontWeight: 700,
                fontSize: '0.85rem'
              }}>
                <Sparkles size={16} /> Certificate ID: CERT-PAN-2026-0891
              </div>
            </div>
          ) : (
            <>
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
                    border: '1px solid #DDE7E2',
                    position: 'relative'
                  }}>
                    <img
                      src={complaint.image || "https://images.unsplash.com/photo-1584467735815-f778f274e296?auto=format&fit=crop&w=600&q=80"}
                      alt="Complaint evidence"
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                    <div style={{
                      position: 'absolute',
                      bottom: '6px',
                      left: '6px',
                      backgroundColor: 'rgba(16, 35, 51, 0.8)',
                      color: '#FFFFFF',
                      fontSize: '0.7rem',
                      padding: '2px 6px',
                      borderRadius: '4px'
                    }}>
                      Original Ground Evidence
                    </div>
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

                  {/* Citizen Star Rating */}
                  <div style={{ marginTop: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#102333' }}>Rate Resolution:</span>
                    <div style={{ display: 'flex', gap: '4px' }}>
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          size={20}
                          onClick={() => setRating(star)}
                          style={{
                            cursor: 'pointer',
                            fill: star <= rating ? '#F4A62A' : 'none',
                            color: star <= rating ? '#F4A62A' : '#CBD5E1'
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* ADD FEEDBACK (OPTIONAL) */}
              <div style={{ borderTop: '1px solid #EEF3F0', paddingTop: '1.5rem', marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 700, color: '#102333', marginBottom: '0.5rem' }}>
                  Add Feedback & Citizen Comments
                </label>
                <textarea
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  placeholder="Write your feedback regarding the resolution..."
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
                  SUBMIT CONFIRMATION
                  <CheckCircle2 size={18} />
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
