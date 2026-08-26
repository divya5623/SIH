import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Check } from 'lucide-react';
import { useComplaints } from '../context/ComplaintContext';

export default function ComplaintSubmitted() {
  const location = useLocation();
  const navigate = useNavigate();
  const { complaints, showToast } = useComplaints();
  const [copied, setCopied] = useState(false);

  const grievanceId = location.state?.grievanceId || (complaints[0]?.id || "GRV-2026-00125");
  const complaint = complaints.find(c => c.id === grievanceId) || complaints[0];

  const handleCopy = () => {
    navigator.clipboard.writeText(grievanceId);
    setCopied(true);
    showToast("📋 ID Copied", `Copied ${grievanceId} to clipboard.`);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSms = () => {
    showToast("📱 SMS Sent", `SMS tracking link for ${grievanceId} dispatched to +91 98765 43210.`);
  };

  const handleEmail = () => {
    showToast("✉️ Email Sent", `Grievance confirmation receipt sent.`);
  };

  const steps = [
    { num: 1, label: "Received", completed: true },
    { num: 2, label: "Verified", completed: false },
    { num: 3, label: "Assigned", completed: false },
    { num: 4, label: "In Progress", completed: false },
    { num: 5, label: "Site Visit", completed: false },
    { num: 6, label: "Resolved", completed: false }
  ];

  return (
    <div style={{ backgroundColor: '#F7FAF8', minHeight: 'calc(100vh - 80px)', padding: '2.5rem 1.5rem 4rem 1.5rem' }}>
      <div style={{ maxWidth: '680px', margin: '0 auto' }}>
        {/* Main Card */}
        <div style={{
          backgroundColor: '#FFFFFF',
          border: '1px solid #E2EBE6',
          borderRadius: '16px',
          padding: '2.5rem 2rem',
          boxShadow: '0 2px 10px rgba(0,0,0,0.02)',
          textAlign: 'center'
        }}>
          {/* REGISTERED Badge */}
          <div style={{ display: 'inline-block' }}>
            <span style={{
              backgroundColor: '#35654B',
              color: '#FFFFFF',
              fontSize: '0.72rem',
              fontWeight: 800,
              letterSpacing: '0.5px',
              padding: '4px 14px',
              borderRadius: '9999px',
              textTransform: 'uppercase'
            }}>
              REGISTERED
            </span>
          </div>

          {/* Grievance ID */}
          <h1 style={{
            fontSize: '1.75rem',
            fontWeight: 800,
            color: '#102333',
            marginTop: '1rem',
            marginBottom: '0.35rem',
            letterSpacing: '0.5px'
          }}>
            {grievanceId}
          </h1>

          {/* Subtitle */}
          <div style={{
            fontSize: '0.85rem',
            color: '#5A6D7C',
            marginBottom: '2.25rem'
          }}>
            Submitted on 27 Aug 2026, 11:42 AM
          </div>

          {/* Vertical 6-Step Timeline */}
          <div style={{
            maxWidth: '220px',
            margin: '0 auto 2rem auto',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            textAlign: 'left'
          }}>
            {steps.map((step, idx) => {
              const isLast = idx === steps.length - 1;
              return (
                <div key={step.num} style={{ display: 'flex', alignItems: 'center', gap: '1rem', position: 'relative' }}>
                  {/* Track Line */}
                  {!isLast && (
                    <div style={{
                      position: 'absolute',
                      left: '12px',
                      top: '24px',
                      bottom: '-16px',
                      width: '2px',
                      backgroundColor: '#E2EBE6',
                      zIndex: 0
                    }} />
                  )}

                  {/* Icon Circle */}
                  <div style={{
                    width: '26px',
                    height: '26px',
                    borderRadius: '50%',
                    backgroundColor: step.completed ? '#35654B' : '#F0F4F2',
                    color: step.completed ? '#FFFFFF' : '#8A9CA8',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    zIndex: 1,
                    flexShrink: 0
                  }}>
                    {step.completed ? <Check size={14} strokeWidth={3} /> : step.num}
                  </div>

                  {/* Label */}
                  <div style={{
                    fontSize: '0.9rem',
                    fontWeight: step.completed ? 700 : 500,
                    color: step.completed ? '#102333' : '#8A9CA8'
                  }}>
                    {step.label}
                  </div>
                </div>
              );
            })}
          </div>

          {/* SHARE GRIEVANCE BOX */}
          <div style={{
            backgroundColor: '#F8FAF9',
            border: '1px solid #EEF3F0',
            borderRadius: '12px',
            padding: '1.25rem',
            marginBottom: '1.5rem'
          }}>
            <div style={{
              fontSize: '0.8rem',
              color: '#5A6D7C',
              fontWeight: 600,
              textAlign: 'center',
              marginBottom: '0.85rem'
            }}>
              Share Grievance
            </div>

            <div style={{
              display: 'flex',
              gap: '0.75rem',
              justifyContent: 'center'
            }}>
              <button
                type="button"
                onClick={handleCopy}
                style={{
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #DDE7E2',
                  borderRadius: '8px',
                  padding: '0.5rem 1.25rem',
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  color: '#102333',
                  cursor: 'pointer'
                }}
              >
                {copied ? "COPIED" : "COPY ID"}
              </button>

              <button
                type="button"
                onClick={handleSms}
                style={{
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #DDE7E2',
                  borderRadius: '8px',
                  padding: '0.5rem 1.25rem',
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  color: '#102333',
                  cursor: 'pointer'
                }}
              >
                SMS
              </button>

              <button
                type="button"
                onClick={handleEmail}
                style={{
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #DDE7E2',
                  borderRadius: '8px',
                  padding: '0.5rem 1.25rem',
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  color: '#102333',
                  cursor: 'pointer'
                }}
              >
                Email
              </button>
            </div>
          </div>

          {/* VIEW MY COMPLAINTS BUTTON */}
          <button
            type="button"
            onClick={() => navigate('/complaints')}
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
            VIEW MY COMPLAINTS
          </button>
        </div>
      </div>
    </div>
  );
}
