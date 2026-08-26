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

  // Selected spoken dialect / language
  const [selectedLanguage, setSelectedLanguage] = useState('Hindi'); // 'Hindi', 'English', 'Marathi', 'Bengali', 'Telugu'

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
    description: 'Major water leakage pipeline burst near the government school entrance causing water wastage.',
    image: 'https://images.unsplash.com/photo-1584467735815-f778f274e296?auto=format&fit=crop&w=600&q=80',
    audioTranscript: 'Humare gaon me Government School ke paas paani ki pipe phoot gayi hai aur bacha log ko aane jane me dikkat ho rahi hai.',
    detectedKeywords: ['paani pipe', 'school entrance', 'flooding pathway', 'urgent repair'],
    defectBoundingBox: { x: 30, y: 40, width: 45, height: 40, label: 'Pipeline Fracture Detected' }
  });

  // Live Toast Notifications for Judge Demo
  const [activeToast, setActiveToast] = useState(null);

  const showToast = (title, message, type = 'success') => {
    setActiveToast({ title, message, type, id: Date.now() });
    setTimeout(() => {
      setActiveToast(null);
    }, 4500);
  };

  // Persist complaints
  useEffect(() => {
    localStorage.setItem('awaaz_complaints', JSON.stringify(complaints));
  }, [complaints]);

  // Persist user
  useEffect(() => {
    localStorage.setItem('awaaz_user', JSON.stringify(currentUser));
  }, [currentUser]);

  // Compute live admin statistics dynamically
  const liveAdminStats = {
    total: complaints.length + 123, // mock base offset
    inProgress: complaints.filter(c => c.status.toLowerCase() === 'in progress').length + 22,
    resolved: complaints.filter(c => c.status.toLowerCase() === 'resolved').length + 84,
    escalated: complaints.filter(c => c.status.toLowerCase() === 'escalated').length + 6
  };

  // Add new complaint
  const addComplaint = (newComplaint) => {
    const nextNum = 126 + complaints.length;
    const grievanceId = newComplaint.id || `GRV-2026-00${nextNum}`;
    const now = new Date();
    const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const dateString = "24 May 2026";

    const complaintWithId = {
      ...newComplaint,
      id: grievanceId,
      date: dateString,
      time: timeString,
      status: "In Progress",
      timeline: [
        { step: "Complaint Registered", date: `${dateString}, ${timeString}`, completed: true },
        { step: "AI Classification Completed", date: `${dateString}, ${timeString}`, completed: true },
        { step: `Authority Assigned (${newComplaint.authority || 'Gram Panchayat'})`, date: `${dateString}, 11:00 AM`, completed: true },
        { step: "Work in Progress", date: `${dateString}, 11:15 AM`, completed: true },
        { step: "Resolution Pending", date: "Pending Resolution", completed: false },
        { step: "Citizen Verification", date: "Pending Verification", completed: false }
      ]
    };

    setComplaints([complaintWithId, ...complaints]);
    
    // Trigger mock SMS alert
    showToast(
      "📱 SMS Alert Sent to Citizen",
      `Grievance ${grievanceId} registered! Assigned to ${complaintWithId.authority}.`,
      "sms"
    );

    return complaintWithId;
  };

  const getComplaintById = (id) => {
    return complaints.find(c => c.id === id) || complaints[0];
  };

  // Advance lifecycle stage for judge testing
  const advanceStage = (id) => {
    setComplaints(prev => prev.map(c => {
      if (c.id === id) {
        const nextTimeline = [...c.timeline];
        let newStatus = c.status;

        if (!nextTimeline[4].completed) {
          nextTimeline[4] = { step: "Resolved by Authority", date: "24 May 2026, 03:30 PM", completed: true };
          newStatus = "Resolved";
          showToast("🔧 Department Update", `Authority marked ${id} as work finished. Awaiting citizen verification.`);
        } else if (!nextTimeline[5].completed) {
          nextTimeline[5] = { step: "Verified by Citizen", date: "24 May 2026, 04:00 PM", completed: true };
          newStatus = "Resolved";
          showToast("✅ Citizen Sign-off", `Citizen Ramesh Kumar confirmed resolution for ${id}. Case closed with 5-star rating.`);
        }

        return {
          ...c,
          status: newStatus,
          timeline: nextTimeline
        };
      }
      return c;
    }));
  };

  const updateResolution = (id, status, feedback, rating = 5) => {
    setComplaints(prev => prev.map(c => {
      if (c.id === id) {
        const isResolved = status === 'resolved';
        return {
          ...c,
          status: isResolved ? 'Resolved' : (status === 'partially' ? 'In Progress' : 'Escalated'),
          resolutionStatus: status,
          rating: rating,
          feedback: feedback || c.feedback,
          timeline: c.timeline.map((t, idx) => {
            if (idx === 4) return { ...t, step: isResolved ? "Resolved by Authority" : "Escalated for Re-inspection", date: "24 May 2026, 02:30 PM", completed: true };
            if (idx === 5) return { ...t, date: "24 May 2026, 03:00 PM", completed: isResolved, step: isResolved ? "Verified by Citizen (Approved)" : "Citizen Feedback Logged" };
            return t;
          })
        };
      }
      return c;
    }));

    showToast("🎉 Resolution Verified", `Feedback submitted for ${id}. Gram Panchayat transparency log updated!`);
  };

  // Judge Quick Scenario loader
  const loadScenario = (scenarioKey) => {
    if (scenarioKey === 'water') {
      setCurrentDraft({
        inputType: 'voice',
        audioDuration: '00:08',
        recorded: true,
        issue: 'Water Leakage',
        category: 'Water Supply',
        location: 'Near Government School, Ward 5',
        gps: '12.8797° N, 74.8509° E',
        useGps: true,
        authority: 'Gram Panchayat (Water Department)',
        priority: 'High',
        confidence: 96,
        description: 'Main underground pipeline burst near Government Primary School creating large puddle.',
        image: 'https://images.unsplash.com/photo-1584467735815-f778f274e296?auto=format&fit=crop&w=600&q=80',
        audioTranscript: 'स्कूल के मुख्य द्वार के सामने पीने के पानी का मुख्य पाइप टूट गया है, तुरंत ठीक किया जाए।',
        detectedKeywords: ['school main gate', 'water pipe burst', 'drinking water leakage']
      });
      showToast("⚡ Scenario Loaded", "Broken Water Pipe near Primary School (Hindi voice grievance)");
    } else if (scenarioKey === 'light') {
      setCurrentDraft({
        inputType: 'camera',
        audioDuration: null,
        recorded: false,
        issue: 'Street Light Not Working',
        category: 'Street Light',
        location: 'Near Main Temple Arch, Ward 2',
        gps: '12.8810° N, 74.8520° E',
        useGps: true,
        authority: 'Gram Panchayat (Electrical Dept)',
        priority: 'High',
        confidence: 94,
        description: 'Two solar street light poles are non-functional for the past 4 nights.',
        image: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=600&q=80',
        audioTranscript: 'Street light pole #24 and #25 are completely dead after rain.',
        detectedKeywords: ['solar pole dead', 'ward 2 darkness', 'safety concern']
      });
      showToast("⚡ Scenario Loaded", "Fused Street Light with photo evidence");
    } else if (scenarioKey === 'drain') {
      setCurrentDraft({
        inputType: 'type',
        audioDuration: null,
        recorded: false,
        issue: 'Drainage Overflow & Silt Choke',
        category: 'Water Supply',
        location: 'Market Road, Ward 3',
        gps: '12.8765° N, 74.8480° E',
        useGps: true,
        authority: 'Gram Panchayat (Sanitation Dept)',
        priority: 'High',
        confidence: 93,
        description: 'Market drain overflowing into vegetable shops due to plastic blockage.',
        image: 'https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?auto=format&fit=crop&w=600&q=80',
        audioTranscript: null,
        detectedKeywords: ['market drain choke', 'sanitation team required', 'high public health risk']
      });
      showToast("⚡ Scenario Loaded", "Market Drainage Overflow");
    }
  };

  const resetAllData = () => {
    setComplaints(initialComplaints);
    localStorage.removeItem('awaaz_complaints');
    showToast("🔄 Reset Complete", "Restored initial Panchayat mock state.");
  };

  return (
    <ComplaintContext.Provider value={{
      complaints,
      setComplaints,
      currentUser,
      setCurrentUser,
      currentDraft,
      setCurrentDraft,
      selectedLanguage,
      setSelectedLanguage,
      liveAdminStats,
      activeToast,
      showToast,
      addComplaint,
      getComplaintById,
      advanceStage,
      updateResolution,
      loadScenario,
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
