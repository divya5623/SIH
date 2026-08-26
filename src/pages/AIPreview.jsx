import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mic, Image as ImageIcon, X } from 'lucide-react';
import { useComplaints } from '../context/ComplaintContext';
import { classifyGrievance } from '../utils/aiClassifier';

export default function AIPreview() {
  const navigate = useNavigate();
  const { currentDraft, setCurrentDraft, addComplaint, showToast } = useComplaints();
  const [isEditing, setIsEditing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Dynamic analysis from current draft description
  const analysis = classifyGrievance(
    currentDraft.description || currentDraft.audioTranscript || currentDraft.issue || "",
    currentDraft.inputType === 'camera',
    currentDraft.gps
  );

  // Editable fields initialized from AI analysis
  const [issueVal, setIssueVal] = useState(currentDraft.issue || analysis.issue);
  const [categoryVal, setCategoryVal] = useState(currentDraft.category || analysis.category);
  const [wardVal, setWardVal] = useState(currentDraft.ward || analysis.ward);
  const [gpsVal, setGpsVal] = useState(currentDraft.gps || analysis.gps);
  const [deptVal, setDeptVal] = useState(currentDraft.authority || analysis.assignedDepartment);
  const [priorityVal, setPriorityVal] = useState(currentDraft.priority || analysis.priority);
  const [confidenceVal, setConfidenceVal] = useState(currentDraft.confidence || analysis.confidence);

  useEffect(() => {
    if (currentDraft.description || currentDraft.issue) {
      const live = classifyGrievance(
        currentDraft.description || currentDraft.audioTranscript || currentDraft.issue,
        currentDraft.inputType === 'camera',
        currentDraft.gps
      );
      setIssueVal(currentDraft.issue || live.issue);
      setCategoryVal(currentDraft.category || live.category);
      setWardVal(currentDraft.ward || live.ward);
      setGpsVal(currentDraft.gps || live.gps);
      setDeptVal(currentDraft.authority || live.assignedDepartment);
      setPriorityVal(currentDraft.priority || live.priority);
      setConfidenceVal(currentDraft.confidence || live.confidence);
    }
  }, [currentDraft]);

  const handleSaveEdit = (e) => {
    e.preventDefault();
    setCurrentDraft({
      ...currentDraft,
      issue: issueVal,
      category: categoryVal,
      ward: wardVal,
      gps: gpsVal,
      authority: deptVal,
      priority: priorityVal,
      confidence: confidenceVal
    });
    setIsEditing(false);
    showToast("✏️ Details Updated", "Grievance details updated.");
  };

  const handleConfirmSubmit = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      const newGrievance = addComplaint({
        issue: issueVal,
        category: categoryVal,
        ward: wardVal,
        location: `${wardVal}, Kalyanpur Gram Panchayat`,
        gps: gpsVal,
        authority: deptVal,
        priority: priorityVal.includes('High') ? 'High' : (priorityVal.includes('Medium') ? 'Medium' : 'Low'),
        confidence: confidenceVal,
        description: currentDraft.description || issueVal,
        audioDuration: currentDraft.audioDuration || "00:06",
        inputType: currentDraft.inputType || "voice",
        image: currentDraft.image || "https://images.unsplash.com/photo-1584467735815-f778f274e296?auto=format&fit=crop&w=600&q=80"
      });

      navigate('/complaint/submitted', { state: { grievanceId: newGrievance.id } });
    }, 400);
  };

  return (
    <div style={{ backgroundColor: '#F7FAF8', minHeight: 'calc(100vh - 80px)', padding: '2.5rem 1.5rem 4rem 1.5rem' }}>
      <div style={{ maxWidth: '820px', margin: '0 auto' }}>
        {/* Title */}
        <h1 style={{
          fontSize: '1.65rem',
          fontWeight: 800,
          color: '#102333',
          marginBottom: '1.75rem',
          letterSpacing: '-0.2px'
        }}>
          AI Understanding Preview
        </h1>

        {/* TOP CARD: Audio & Evidence */}
        <div style={{
          backgroundColor: '#FFFFFF',
          border: '1px solid #E2EBE6',
          borderRadius: '12px',
          padding: '1.25rem 1.5rem',
          marginBottom: '1.25rem',
          boxShadow: '0 2px 6px rgba(0,0,0,0.02)',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem'
        }}>
          {/* Row 1: Recorded Audio */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', color: '#5A6D7C', fontSize: '0.9rem', fontWeight: 600 }}>
              <Mic size={18} color="#5A6D7C" />
              <span>Recorded Audio</span>
            </div>
            <span style={{ fontWeight: 800, color: '#102333', fontSize: '0.92rem' }}>
              {currentDraft.audioDuration || "00:06"}
            </span>
          </div>

          {/* Row 2: Evidence Image */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', color: '#5A6D7C', fontSize: '0.9rem', fontWeight: 600 }}>
              <ImageIcon size={18} color="#5A6D7C" />
              <span>Evidence Image</span>
            </div>
            <span style={{ fontWeight: 800, color: '#102333', fontSize: '0.92rem' }}>
              1 attached
            </span>
          </div>
        </div>

        {/* STRUCTURED TABLE CARD */}
        <div style={{
          backgroundColor: '#FFFFFF',
          border: '1px solid #E2EBE6',
          borderRadius: '12px',
          padding: '1.5rem 1.75rem',
          marginBottom: '2rem',
          boxShadow: '0 2px 6px rgba(0,0,0,0.02)',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.15rem'
        }}>
          {/* Row: Issue */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.9rem', color: '#5A6D7C', fontWeight: 500 }}>Issue</span>
            <span style={{ fontSize: '0.95rem', fontWeight: 800, color: '#102333', textAlign: 'right' }}>
              {issueVal}
            </span>
          </div>

          {/* Row: Category */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.9rem', color: '#5A6D7C', fontWeight: 500 }}>Category</span>
            <span style={{ fontSize: '0.95rem', fontWeight: 800, color: '#102333' }}>
              {categoryVal}
            </span>
          </div>

          {/* Row: Ward */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.9rem', color: '#5A6D7C', fontWeight: 500 }}>Ward</span>
            <span style={{ fontSize: '0.95rem', fontWeight: 800, color: '#102333' }}>
              {wardVal}
            </span>
          </div>

          {/* Row: GPS */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.9rem', color: '#5A6D7C', fontWeight: 500 }}>GPS</span>
            <span style={{ fontSize: '0.95rem', fontWeight: 800, color: '#102333' }}>
              {gpsVal}
            </span>
          </div>

          {/* Row: Assigned Department */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.9rem', color: '#5A6D7C', fontWeight: 500 }}>Assigned Department</span>
            <span style={{ fontSize: '0.95rem', fontWeight: 800, color: '#102333' }}>
              {deptVal}
            </span>
          </div>

          {/* Row: Priority */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.9rem', color: '#5A6D7C', fontWeight: 500 }}>Priority</span>
            <span style={{
              backgroundColor: '#DE4C4C',
              color: '#FFFFFF',
              borderRadius: '9999px',
              padding: '3px 12px',
              fontWeight: 700,
              fontSize: '0.78rem',
              letterSpacing: '0.2px'
            }}>
              {priorityVal}
            </span>
          </div>

          {/* Row: Confidence Score & Progress Bar */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
              <span style={{ fontSize: '0.9rem', color: '#5A6D7C', fontWeight: 500 }}>Confidence</span>
              <span style={{ fontSize: '0.95rem', fontWeight: 800, color: '#102333' }}>
                {confidenceVal}%
              </span>
            </div>

            {/* Green Progress Bar */}
            <div style={{
              width: '100%',
              height: '8px',
              backgroundColor: '#EAEFEA',
              borderRadius: '9999px',
              overflow: 'hidden'
            }}>
              <div style={{
                width: `${confidenceVal}%`,
                height: '100%',
                backgroundColor: '#35654B',
                borderRadius: '9999px'
              }} />
            </div>
          </div>
        </div>

        {/* INLINE EDIT MODAL (if Edit Details clicked) */}
        {isEditing && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(16, 35, 51, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '1.5rem'
          }}>
            <div style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '14px',
              padding: '2rem',
              maxWidth: '480px',
              width: '100%',
              boxShadow: '0 10px 40px rgba(0,0,0,0.2)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#102333' }}>Edit Grievance Details</h3>
                <button type="button" onClick={() => setIsEditing(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><X size={20} /></button>
              </div>

              <form onSubmit={handleSaveEdit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div>
                  <label style={{ fontSize: '0.82rem', fontWeight: 700, color: '#102333' }}>Issue</label>
                  <input
                    type="text"
                    value={issueVal}
                    onChange={(e) => setIssueVal(e.target.value)}
                    style={{ width: '100%', padding: '0.55rem 0.75rem', borderRadius: '8px', border: '1px solid #DDE7E2', outline: 'none' }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: '0.82rem', fontWeight: 700, color: '#102333' }}>Category</label>
                  <select
                    value={categoryVal}
                    onChange={(e) => setCategoryVal(e.target.value)}
                    style={{ width: '100%', padding: '0.55rem 0.75rem', borderRadius: '8px', border: '1px solid #DDE7E2', outline: 'none' }}
                  >
                    <option value="Roads / Infrastructure">Roads / Infrastructure</option>
                    <option value="Water Supply">Water Supply</option>
                    <option value="Street Light">Street Light</option>
                    <option value="Garbage / Sanitation">Garbage / Sanitation</option>
                    <option value="Drainage & Sewerage">Drainage & Sewerage</option>
                  </select>
                </div>

                <div>
                  <label style={{ fontSize: '0.82rem', fontWeight: 700, color: '#102333' }}>Ward</label>
                  <input
                    type="text"
                    value={wardVal}
                    onChange={(e) => setWardVal(e.target.value)}
                    style={{ width: '100%', padding: '0.55rem 0.75rem', borderRadius: '8px', border: '1px solid #DDE7E2', outline: 'none' }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: '0.82rem', fontWeight: 700, color: '#102333' }}>Assigned Department</label>
                  <input
                    type="text"
                    value={deptVal}
                    onChange={(e) => setDeptVal(e.target.value)}
                    style={{ width: '100%', padding: '0.55rem 0.75rem', borderRadius: '8px', border: '1px solid #DDE7E2', outline: 'none' }}
                  />
                </div>

                <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.5rem' }}>
                  <button type="button" onClick={() => setIsEditing(false)} className="btn btn-outline btn-full">Cancel</button>
                  <button type="submit" className="btn btn-primary btn-full" style={{ backgroundColor: '#35654B' }}>Save Changes</button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* BOTTOM ACTION BUTTONS (EDIT DETAILS & CONFIRM & SUBMIT) */}
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button
            type="button"
            onClick={() => setIsEditing(true)}
            style={{
              flex: 1,
              backgroundColor: '#FFFFFF',
              color: '#102333',
              border: '1px solid #DDE7E2',
              borderRadius: '8px',
              padding: '0.85rem',
              fontSize: '0.92rem',
              fontWeight: 800,
              cursor: 'pointer',
              letterSpacing: '0.5px'
            }}
          >
            EDIT DETAILS
          </button>

          <button
            type="button"
            onClick={handleConfirmSubmit}
            disabled={isSubmitting}
            style={{
              flex: 1,
              backgroundColor: '#35654B',
              color: '#FFFFFF',
              border: 'none',
              borderRadius: '8px',
              padding: '0.85rem',
              fontSize: '0.92rem',
              fontWeight: 800,
              cursor: 'pointer',
              letterSpacing: '0.5px',
              boxShadow: '0 2px 8px rgba(53, 101, 75, 0.25)'
            }}
          >
            {isSubmitting ? "SUBMITTING..." : "CONFIRM & SUBMIT"}
          </button>
        </div>
      </div>
    </div>
  );
}
