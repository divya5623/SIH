import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Sparkles, ChevronUp, ChevronDown, Mic, Camera, Edit3, Shield, User, RefreshCw, Smartphone, Play } from 'lucide-react';
import { useComplaints } from '../context/ComplaintContext';

export default function JudgeDemoBanner() {
  const navigate = useNavigate();
  const location = useLocation();
  const { loadScenario, resetAllData, activeToast, currentUser, setCurrentUser, complaints, advanceStage } = useComplaints();
  const [isExpanded, setIsExpanded] = useState(false);

  const handleScenario = (key, route = '/report/preview') => {
    loadScenario(key);
    navigate(route);
  };

  const toggleRole = () => {
    if (currentUser.role === 'admin') {
      setCurrentUser({
        name: "Ramesh Kumar",
        phone: "+91 98765 43210",
        citizenId: "CIT-IND-000124",
        ward: "Ward 5",
        village: "Kalyanpur Gram Panchayat",
        role: "citizen"
      });
      navigate('/complaints');
    } else {
      setCurrentUser({
        name: "Panchayat Admin",
        phone: "+91 98765 00001",
        citizenId: "ADM-PAN-001",
        ward: "All Wards",
        village: "Kalyanpur Gram Panchayat",
        role: "admin"
      });
      navigate('/admin');
    }
  };

  return (
    <>
      {/* Active Toast Notification (e.g. SMS alert to citizen) */}
      {activeToast && (
        <div style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          zIndex: 9999,
          backgroundColor: '#102333',
          color: '#FFFFFF',
          borderRadius: '12px',
          padding: '1rem 1.25rem',
          boxShadow: '0 10px 30px rgba(0,0,0,0.25)',
          display: 'flex',
          alignItems: 'center',
          gap: '0.85rem',
          maxWidth: '420px',
          borderLeft: '5px solid #087A55',
          animation: 'pulseWave 0.3s ease-out'
        }}>
          <div>
            <div style={{ fontSize: '0.9rem', fontWeight: 800, color: '#1DB37B', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Sparkles size={16} />
              {activeToast.title}
            </div>
            <div style={{ fontSize: '0.82rem', color: '#D2DDE6', marginTop: '2px', lineHeight: 1.35 }}>
              {activeToast.message}
            </div>
          </div>
        </div>
      )}

      {/* Floating Demo Control Bar for Judges */}
      <div style={{
        position: 'fixed',
        bottom: '16px',
        right: '16px',
        zIndex: 999,
        backgroundColor: '#FFFFFF',
        border: '2px solid #087A55',
        borderRadius: '14px',
        boxShadow: '0 8px 30px rgba(8, 122, 85, 0.2)',
        overflow: 'hidden',
        maxWidth: '440px',
        width: isExpanded ? 'calc(100vw - 32px)' : 'auto'
      }}>
        {/* Toggle Bar */}
        <div
          onClick={() => setIsExpanded(!isExpanded)}
          style={{
            backgroundColor: '#087A55',
            color: '#FFFFFF',
            padding: '0.55rem 1rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1rem',
            cursor: 'pointer',
            userSelect: 'none'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.82rem', fontWeight: 800, letterSpacing: '0.3px' }}>
            <Sparkles size={16} color="#FFD700" />
            <span>JUDGES QUICK DEMO BAR</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.75rem', opacity: 0.9 }}>
            <span>{isExpanded ? 'Click to minimize' : 'Click to test flows'}</span>
            {isExpanded ? <ChevronDown size={16} /> : <ChevronUp size={16} />}
          </div>
        </div>

        {/* Expanded Controls */}
        {isExpanded && (
          <div style={{ padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.85rem', backgroundColor: '#F8FAF9' }}>
            <div>
              <div style={{ fontSize: '0.72rem', fontWeight: 800, color: '#8A9CA8', textTransform: 'uppercase', marginBottom: '0.4rem' }}>
                1-Click Preset Scenarios (Test AI Detection):
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.4rem' }}>
                <button
                  type="button"
                  onClick={() => handleScenario('water')}
                  className="btn btn-outline btn-sm"
                  style={{ fontSize: '0.75rem', padding: '0.4rem', backgroundColor: '#FFFFFF', borderColor: '#087A55', color: '#087A55' }}
                >
                  <Mic size={13} />
                  Water Pipe (Voice)
                </button>

                <button
                  type="button"
                  onClick={() => handleScenario('light')}
                  className="btn btn-outline btn-sm"
                  style={{ fontSize: '0.75rem', padding: '0.4rem', backgroundColor: '#FFFFFF', borderColor: '#2366B1', color: '#2366B1' }}
                >
                  <Camera size={13} />
                  Dark Street (Photo)
                </button>

                <button
                  type="button"
                  onClick={() => handleScenario('drain')}
                  className="btn btn-outline btn-sm"
                  style={{ fontSize: '0.75rem', padding: '0.4rem', backgroundColor: '#FFFFFF', borderColor: '#7150A8', color: '#7150A8' }}
                >
                  <Edit3 size={13} />
                  Choked Drain
                </button>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '0.5rem', borderTop: '1px solid #E2EBE6', paddingTop: '0.65rem' }}>
              <button
                type="button"
                onClick={toggleRole}
                className="btn btn-dark btn-sm"
                style={{ flex: 1, fontSize: '0.75rem', padding: '0.45rem' }}
              >
                <User size={13} />
                Switch: {currentUser.role === 'admin' ? 'Citizen Portal' : 'Admin Portal'}
              </button>

              {complaints[0] && (
                <button
                  type="button"
                  onClick={() => advanceStage(complaints[0].id)}
                  className="btn btn-primary btn-sm"
                  style={{ flex: 1, fontSize: '0.75rem', padding: '0.45rem' }}
                  title="Simulates authority field repair and advances grievance timeline"
                >
                  <Play size={13} />
                  Advance Latest Ticket
                </button>
              )}

              <button
                type="button"
                onClick={resetAllData}
                className="btn btn-outline btn-sm"
                style={{ padding: '0.45rem 0.6rem', color: '#E94B4B', borderColor: '#E94B4B' }}
                title="Reset to fresh mock state"
              >
                <RefreshCw size={13} />
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
