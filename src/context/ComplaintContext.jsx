import React, { createContext, useContext, useState, useEffect } from 'react';
import { initialComplaints, adminStats as defaultAdminStats, recurringClusters as defaultClusters } from '../data/mockData';

const ComplaintContext = createContext();

export function ComplaintProvider({ children }) {
  const [complaints, setComplaints] = useState(() => {
    const saved = localStorage.getItem('awaaz_complaints');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Failed to parse stored complaints", e);
      }
    }
    return initialComplaints;
  });

  const [currentUser, setCurrentUser] = useState(() => {
    const savedUser = localStorage.getItem('awaaz_user');
    if (savedUser) {
      try {
        return JSON.parse(savedUser);
      } catch (e) {
        console.error("Failed to parse user", e);
      }
    }
    return {
      name: "Ramesh Kumar",
      phone: "+91 98765 43210",
      citizenId: "CIT-IND-000124",
      ward: "Ward 5",
      village: "Kalyanpur Gram Panchayat",
      role: "citizen" // 'citizen' or 'admin'
    };
  });

  // Current draft in progress
  const [currentDraft, setCurrentDraft] = useState({
    inputType: 'voice', // 'voice', 'camera', 'type'
    audioDuration: '00:06',
    recorded: true,
    issue: 'Water Leakage',
    category: 'Water Supply',
    location: 'Near Government School, Ward 5',
    gps: '12.8797° N, 74.8509° E',
    useGps: true,
    authority: 'Gram Panchayat (Water Department)',
    priority: 'High',
    confidence: 94,
    description: 'Major water leakage pipeline burst near the government school entrance.',
    image: 'https://images.unsplash.com/photo-1584467735815-f778f274e296?auto=format&fit=crop&w=600&q=80',
    audioTranscript: 'Humare Gaon me Government School ke paas paani ki pipe phoot gayi hai aur bacha log ko aane jane me problem ho rahi hai.'
  });

  // Persist complaints
  useEffect(() => {
    localStorage.setItem('awaaz_complaints', JSON.stringify(complaints));
  }, [complaints]);

  // Persist user
  useEffect(() => {
    localStorage.setItem('awaaz_user', JSON.stringify(currentUser));
  }, [currentUser]);

  const addComplaint = (newComplaint) => {
    const complaintWithId = {
      ...newComplaint,
      id: newComplaint.id || `GRV-2026-00${126 + complaints.length}`,
      date: "24 May 2026",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: "In Progress",
      timeline: [
        { step: "Complaint Registered", date: `24 May 2026, ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`, completed: true },
        { step: "AI Classification Completed", date: `24 May 2026, ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`, completed: true },
        { step: "Authority Assigned", date: `24 May 2026, 11:00 AM`, completed: true },
        { step: "Work in Progress", date: `24 May 2026, 11:15 AM`, completed: true },
        { step: "Resolution Pending", date: "Pending Resolution", completed: false },
        { step: "Citizen Verification", date: "Pending Verification", completed: false }
      ]
    };
    setComplaints([complaintWithId, ...complaints]);
    return complaintWithId;
  };

  const getComplaintById = (id) => {
    return complaints.find(c => c.id === id) || complaints[0];
  };

  const updateResolution = (id, status, feedback) => {
    setComplaints(prev => prev.map(c => {
      if (c.id === id) {
        const isResolved = status === 'resolved';
        return {
          ...c,
          status: isResolved ? 'Resolved' : c.status,
          resolutionStatus: status,
          feedback: feedback || c.feedback,
          timeline: c.timeline.map((t, idx) => {
            if (idx === 4) return { ...t, date: isResolved ? "24 May 2026, 02:30 PM" : t.date, completed: isResolved };
            if (idx === 5) return { ...t, date: isResolved ? "24 May 2026, 03:00 PM" : t.date, completed: isResolved, step: isResolved ? "Verified by Citizen" : t.step };
            return t;
          })
        };
      }
      return c;
    }));
  };

  const resetAllData = () => {
    setComplaints(initialComplaints);
    localStorage.removeItem('awaaz_complaints');
  };

  return (
    <ComplaintContext.Provider value={{
      complaints,
      setComplaints,
      currentUser,
      setCurrentUser,
      currentDraft,
      setCurrentDraft,
      addComplaint,
      getComplaintById,
      updateResolution,
      resetAllData
    }}>
      {children}
    </ComplaintContext.Provider>
  );
}

export function useComplaints() {
  const context = useContext(ComplaintContext);
  if (!context) {
    throw new Error("useComplaints must be used within a ComplaintProvider");
  }
  return context;
}
