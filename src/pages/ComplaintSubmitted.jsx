import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { CheckCircle, Copy, MessageSquare, Mail, ArrowRight, Share2, Check } from 'lucide-react';
import Timeline from '../components/Timeline';
import { useComplaints } from '../context/ComplaintContext';

export default function ComplaintSubmitted() {
  const location = useLocation();
  const navigate = useNavigate();
  const { complaints } = useComplaints();
  const [copied, setCopied] = useState(false);
  const [sharedVia, setSharedVia] = useState(null);

  const grievanceId = location.state?.grievanceId || "GRV-2026-00125";
  const complaint = complaints.find(c => c.id === grievanceId) || complaints[0];

  const handleCopy = () => {
    navigator.clipboard.writeText(grievanceId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShareSms = () => {
    setSharedVia('SMS');
    setTimeout(() => setSharedVia(null), 3000);
  };

  const handleShareEmail = () => {
    setSharedVia('Email');
    setTimeout(() => setSharedVia(null), 3000);
  };

  return (
    <div style={{ backgroundColor: '#F7FAF8', minHeight: 'calc(100vh - 80px)', paddingBottom: '4rem' }}>
      <div className="page-wrapper-sm">
        {/* Success Header */}
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div style={{
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            backgroundColor: '#E8F6EF',
            color: '#087A55',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1.25rem auto',
            boxShadow: '0 4px 14px rgba(8, 122, 85, 0.2)'
          }}>
            <CheckCircle size={36} strokeWidth={2.5} />
          </div>

          <h1 style={{
            fontSize: '2rem',
            fontWeight: 800,
            color: '#102333',
            marginBottom: '0.4rem',
            letterSpacing: '-0.3px'
          }}>
            Your complaint has been registered!
          </h1>
          <p style={{ fontSize: '1rem', color: '#5A6D7C', fontWeight: 500 }}>
            Track the status of your complaint below.
          </p>
        </div>

        {/* COMPLAINT SUMMARY CARD */}
        <div style={{
          backgroundColor: '#FFFFFF',
          border: '1px solid #DDE7E2',
          borderRadius: '16px',
          padding: '1.5rem 1.75rem',
          boxShadow: '0 2px 8px rgba(16, 35, 51, 0.04)',
          marginBottom: '1.75rem'
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '1.5rem',
            alignItems: 'center'
          }}>
            <div>
              <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#8A9CA8', textTransform: 'uppercase' }}>
                Grievance ID
              </div>
              <div style={{ fontSize: '1.35rem', fontWeight: 800, color: '#087A55', marginTop: '2px', letterSpacing: '0.5px' }}>
                {grievanceId}
              </div>
            </div>

            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#8A9CA8', textTransform: 'uppercase' }}>
                Date & Time
              </div>
              <div style={{ fontSize: '0.98rem', fontWeight: 700, color: '#102333', marginTop: '2px' }}>
                {complaint.date || "24 May 2026"}, {complaint.time || "10:45 AM"}
              </div>
            </div>
          </div>
        </div>

        {/* TWO-COLUMN CONTENT: TIMELINE & SHARE CARD */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1.5rem',
          marginBottom: '2.5rem'
        }}>
          {/* Vertical Timeline Card */}
          <div style={{
            backgroundColor: '#FFFFFF',
            border: '1px solid #DDE7E2',
            borderRadius: '16px',
            padding: '1.75rem',
            boxShadow: '0 2px 8px rgba(16, 35, 51, 0.04)'
          }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#102333', marginBottom: '1.25rem' }}>
              Complaint Status
            </h3>
            <Timeline steps={complaint.timeline} />
          </div>

          {/* Right Side Card: Share your grievance */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1.25rem'
          }}>
            <div style={{
              backgroundColor: '#FFFFFF',
              border: '1px solid #DDE7E2',
              borderRadius: '16px',
              padding: '1.75rem',
              boxShadow: '0 2px 8px rgba(16, 35, 51, 0.04)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#087A55', marginBottom: '0.5rem' }}>
                <Share2 size={20} />
                <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#102333' }}>
                  Share your grievance
                </h3>
              </div>
              <p style={{ fontSize: '0.88rem', color: '#5A6D7C', marginBottom: '1.25rem' }}>
                Share <strong style={{ color: '#102333' }}>{grievanceId}</strong> with village representatives or family to track progress together.
              </p>

              {sharedVia && (
                <div style={{
                  backgroundColor: '#E8F6EF',
                  color: '#087A55',
                  padding: '0.5rem 0.75rem',
                  borderRadius: '6px',
                  fontSize: '0.82rem',
                  fontWeight: 600,
                  marginBottom: '1rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem'
                }}>
                  <Check size={14} /> Shared grievance link via {sharedVia}
                </div>
              )}

              {/* Share Buttons */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <button
                  type="button"
                  onClick={handleCopy}
                  className="btn btn-outline btn-full"
                  style={{
                    backgroundColor: '#F7FAF8',
                    borderColor: '#DDE7E2',
                    color: '#102333',
                    fontSize: '0.85rem'
                  }}
                >
                  {copied ? <Check size={16} color="#087A55" /> : <Copy size={16} />}
                  {copied ? "COPIED TO CLIPBOARD" : "COPY ID"}
                </button>

                <button
                  type="button"
                  onClick={handleShareSms}
                  className="btn btn-outline btn-full"
                  style={{
                    backgroundColor: '#F7FAF8',
                    borderColor: '#DDE7E2',
                    color: '#102333',
                    fontSize: '0.85rem'
                  }}
                >
                  <MessageSquare size={16} />
                  SMS
                </button>

                <button
                  type="button"
                  onClick={handleShareEmail}
                  className="btn btn-outline btn-full"
                  style={{
                    backgroundColor: '#F7FAF8',
                    borderColor: '#DDE7E2',
                    color: '#102333',
                    fontSize: '0.85rem'
                  }}
                >
                  <Mail size={16} />
                  Email
                </button>
              </div>
            </div>

            {/* Quick action card to detail */}
            <div style={{
              backgroundColor: '#EFF6F2',
              border: '1px solid #C5E5D5',
              borderRadius: '14px',
              padding: '1.25rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <div>
                <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#07563F' }}>
                  Need to check full updates?
                </div>
                <div style={{ fontSize: '0.78rem', color: '#5A6D7C' }}>
                  View authority response notes
                </div>
              </div>
              <Link to={`/complaints/${grievanceId}`} className="btn btn-primary btn-sm">
                View Detail
              </Link>
            </div>
          </div>
        </div>

        {/* BOTTOM: VIEW MY COMPLAINTS */}
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Link
            to="/complaints"
            className="btn btn-primary btn-lg"
            style={{
              minWidth: '240px',
              padding: '0.9rem 2rem',
              fontWeight: 800,
              letterSpacing: '0.5px',
              boxShadow: '0 6px 18px rgba(8, 122, 85, 0.25)'
            }}
          >
            VIEW MY COMPLAINTS
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </div>
  );
}
