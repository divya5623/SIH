import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  MapPin, 
  Building, 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  Share2, 
  Download, 
  Check, 
  X,
  ExternalLink,
  Navigation,
  Play,
  Sparkles,
  Phone
} from 'lucide-react';
import Timeline from '../components/Timeline';
import StatusBadge from '../components/StatusBadge';
import { useComplaints } from '../context/ComplaintContext';

export default function ComplaintDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getComplaintById, advanceStage, showToast } = useComplaints();

  const complaint = getComplaintById(id);
  const [showSimulateAction, setShowSimulateAction] = useState(false);

  const handleAdvance = () => {
    advanceStage(complaint.id);
  };

  return (
    <div style={{ backgroundColor: '#F7FAF8', minHeight: 'calc(100vh - 80px)', paddingBottom: '4rem' }}>
      <div className="page-wrapper">
        {/* Top Back Navigation */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '0.5rem' }}>
          <Link
            to="/complaints"
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
            Back to My Complaints
          </Link>

          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
            <button
              type="button"
              onClick={handleAdvance}
              className="btn btn-outline btn-sm"
              style={{ fontSize: '0.78rem', borderColor: '#2366B1', color: '#2366B1' }}
              title="Simulates field engineer resolving the ticket"
            >
              <Play size={13} />
              Simulate Department Fix
            </button>

            <Link
              to={`/complaints/${complaint.id}/verify`}
              className="btn btn-outline-green btn-sm"
            >
              <CheckCircle size={14} />
              Verify Resolution
            </Link>
          </div>
        </div>

        {/* COMPLAINT DETAILS HEADER CARD */}
        <div style={{
          backgroundColor: '#FFFFFF',
          border: '1px solid #DDE7E2',
          borderRadius: '16px',
          padding: '1.75rem 2rem',
          boxShadow: '0 2px 8px rgba(16, 35, 51, 0.04)',
          marginBottom: '2rem'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            flexWrap: 'wrap',
            gap: '1rem',
            borderBottom: '1px solid #EEF3F0',
            paddingBottom: '1.25rem',
            marginBottom: '1.25rem'
          }}>
            <div>
              <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#8A9CA8', textTransform: 'uppercase' }}>
                Complaint Details
              </div>
              <h1 style={{ fontSize: '1.85rem', fontWeight: 800, color: '#087A55', marginTop: '2px' }}>
                {complaint.id}
              </h1>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <StatusBadge status={complaint.status} />
              <StatusBadge priority={complaint.priority} />
            </div>
          </div>

          {/* Structured Details Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '1.25rem'
          }}>
            <div>
              <div style={{ fontSize: '0.8rem', fontWeight: 600, color: '#8A9CA8' }}>Issue</div>
              <div style={{ fontSize: '1.05rem', fontWeight: 700, color: '#102333', marginTop: '2px' }}>
                {complaint.issue}
              </div>
            </div>

            <div>
              <div style={{ fontSize: '0.8rem', fontWeight: 600, color: '#8A9CA8' }}>Category</div>
              <div style={{ fontSize: '1rem', fontWeight: 600, color: '#087A55', marginTop: '2px' }}>
                {complaint.category}
              </div>
            </div>

            <div>
              <div style={{ fontSize: '0.8rem', fontWeight: 600, color: '#8A9CA8' }}>Assigned Authority</div>
              <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#102333', marginTop: '2px' }}>
                {complaint.authority}
              </div>
            </div>

            <div>
              <div style={{ fontSize: '0.8rem', fontWeight: 600, color: '#8A9CA8' }}>Location & GPS</div>
              <div style={{ fontSize: '0.92rem', fontWeight: 600, color: '#102333', marginTop: '2px' }}>
                {complaint.location}
              </div>
              <div style={{ fontSize: '0.78rem', color: '#2366B1', fontFamily: 'monospace' }}>
                {complaint.gps}
              </div>
            </div>
          </div>
        </div>

        {/* THREE-COLUMN / STRUCTURED LAYOUT */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '2rem',
          marginBottom: '2.5rem'
        }}>
          {/* Column 1: Timeline */}
          <div style={{
            backgroundColor: '#FFFFFF',
            border: '1px solid #DDE7E2',
            borderRadius: '16px',
            padding: '1.75rem',
            boxShadow: '0 2px 8px rgba(16, 35, 51, 0.04)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#102333' }}>
                TIMELINE
              </h3>
              <span style={{ fontSize: '0.75rem', color: '#087A55', fontWeight: 700, backgroundColor: '#E8F6EF', padding: '2px 8px', borderRadius: '4px' }}>
                Live Blockchain Log
              </span>
            </div>
            <Timeline steps={complaint.timeline} />
          </div>

          {/* Column 2: Images / Evidence & Map Placeholder */}
          <div style={{
            backgroundColor: '#FFFFFF',
            border: '1px solid #DDE7E2',
            borderRadius: '16px',
            padding: '1.75rem',
            boxShadow: '0 2px 8px rgba(16, 35, 51, 0.04)',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.25rem'
          }}>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#102333' }}>
              IMAGES / EVIDENCE
            </h3>

            {/* Evidence Image */}
            <div style={{
              width: '100%',
              height: '160px',
              borderRadius: '12px',
              overflow: 'hidden',
              border: '1px solid #DDE7E2',
              position: 'relative'
            }}>
              <img
                src={complaint.image || "https://images.unsplash.com/photo-1584467735815-f778f274e296?auto=format&fit=crop&w=600&q=80"}
                alt="Grievance evidence"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <div style={{
                position: 'absolute',
                bottom: '8px',
                left: '8px',
                backgroundColor: 'rgba(16, 35, 51, 0.85)',
                color: '#FFFFFF',
                fontSize: '0.75rem',
                padding: '3px 8px',
                borderRadius: '4px'
              }}>
                Uploaded photo evidence
              </div>
            </div>

            {/* Location on Map Placeholder */}
            <div>
              <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#5A6D7C', marginBottom: '0.4rem' }}>
                Location on Map
              </div>
              <div style={{
                width: '100%',
                height: '130px',
                borderRadius: '12px',
                backgroundColor: '#EBF4F0',
                border: '1px solid #C8E3D6',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                overflow: 'hidden'
              }}>
                <svg width="100%" height="100%" style={{ position: 'absolute', top: 0, left: 0, opacity: 0.25 }}>
                  <pattern id="gridMap" width="20" height="20" patternUnits="userSpaceOnUse">
                    <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#087A55" strokeWidth="0.8" />
                  </pattern>
                  <rect width="100%" height="100%" fill="url(#gridMap)" />
                </svg>
                <div style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '50%',
                  backgroundColor: '#087A55',
                  color: '#FFFFFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 4px 10px rgba(8, 122, 85, 0.3)',
                  zIndex: 2,
                  animation: 'pulseWave 2s infinite'
                }}>
                  <MapPin size={20} />
                </div>
                <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#07563F', marginTop: '6px', zIndex: 2 }}>
                  {complaint.gps}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM RESOLUTION VERIFICATION PROMPT */}
        <div style={{
          backgroundColor: '#FFFFFF',
          border: '1px solid #DDE7E2',
          borderRadius: '16px',
          padding: '1.75rem 2rem',
          boxShadow: '0 4px 14px rgba(16, 35, 51, 0.05)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1.5rem'
        }}>
          <div>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#102333', marginBottom: '0.25rem' }}>
              Was your issue resolved?
            </h3>
            <p style={{ fontSize: '0.88rem', color: '#5A6D7C' }}>
              Your feedback verifies the Gram Panchayat action report and closes the accountability loop.
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <button
              type="button"
              onClick={() => {
                showToast("⚠️ Not Resolved Logged", "Escalation ticket generated for Block Development Officer (BDO).");
              }}
              className="btn btn-outline"
              style={{
                borderColor: '#DDE7E2',
                fontWeight: 700,
                fontSize: '0.88rem',
                color: '#5A6D7C'
              }}
            >
              NOT YET
            </button>

            <Link
              to={`/complaints/${complaint.id}/verify`}
              className="btn btn-primary"
              style={{
                fontWeight: 800,
                fontSize: '0.9rem',
                boxShadow: '0 4px 12px rgba(8, 122, 85, 0.25)'
              }}
            >
              <CheckCircle size={16} />
              YES, RESOLVED
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
