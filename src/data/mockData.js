export const initialComplaints = [
  {
    id: "GRV-2026-00125",
    issue: "Water Leakage",
    category: "Water Supply",
    location: "Near Government School, Ward 5",
    gps: "12.8797° N, 74.8509° E",
    authority: "Gram Panchayat (Water Department)",
    priority: "High",
    confidence: 94,
    status: "In Progress",
    date: "24 May 2026",
    time: "10:45 AM",
    description: "Major pipeline burst near the government school entrance causing water wastage and flooding the walking pathway.",
    audioDuration: "00:06",
    inputType: "voice",
    image: "https://images.unsplash.com/photo-1584467735815-f778f274e296?auto=format&fit=crop&w=600&q=80",
    timeline: [
      { step: "Complaint Registered", date: "24 May 2026, 10:45 AM", completed: true },
      { step: "AI Classification Completed", date: "24 May 2026, 10:47 AM", completed: true },
      { step: "Authority Assigned", date: "24 May 2026, 11:00 AM", completed: true },
      { step: "Work in Progress", date: "24 May 2026, 11:15 AM", completed: true },
      { step: "Resolution Pending", date: "Pending Resolution", completed: false },
      { step: "Citizen Verification", date: "Pending Verification", completed: false }
    ],
    resolutionStatus: null,
    feedback: null
  },
  {
    id: "GRV-2026-00124",
    issue: "Street Light Not Working",
    category: "Street Light",
    location: "Near Main Road, Ward 2",
    gps: "12.8810° N, 74.8520° E",
    authority: "Gram Panchayat (Electrical Dept)",
    priority: "High",
    confidence: 92,
    status: "Resolved",
    date: "20 May 2026",
    time: "07:30 PM",
    description: "Two consecutive pole lights are completely fused for the past 4 nights creating safety issues for women and elders.",
    audioDuration: "00:09",
    inputType: "voice",
    image: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=600&q=80",
    timeline: [
      { step: "Complaint Registered", date: "20 May 2026, 07:30 PM", completed: true },
      { step: "AI Classification Completed", date: "20 May 2026, 07:32 PM", completed: true },
      { step: "Authority Assigned", date: "20 May 2026, 08:00 PM", completed: true },
      { step: "Work in Progress", date: "21 May 2026, 10:00 AM", completed: true },
      { step: "Resolved", date: "21 May 2026, 04:30 PM", completed: true },
      { step: "Verified by Citizen", date: "22 May 2026, 09:00 AM", completed: true }
    ],
    resolutionStatus: "resolved",
    feedback: "New LED bulbs installed promptly. Thank you Sarpanch ji!"
  },
  {
    id: "GRV-2026-00123",
    issue: "Garbage Not Collected",
    category: "Garbage",
    location: "Market Area, Ward 3",
    gps: "12.8765° N, 74.8480° E",
    authority: "Gram Panchayat (Sanitation Dept)",
    priority: "Medium",
    confidence: 96,
    status: "Resolved",
    date: "18 May 2026",
    time: "08:15 AM",
    description: "Commercial vegetable waste piling up in the market corner since Monday without sanitation truck clearance.",
    audioDuration: null,
    inputType: "camera",
    image: "https://images.unsplash.com/photo-1605600659908-0ef719419d41?auto=format&fit=crop&w=600&q=80",
    timeline: [
      { step: "Complaint Registered", date: "18 May 2026, 08:15 AM", completed: true },
      { step: "AI Classification Completed", date: "18 May 2026, 08:17 AM", completed: true },
      { step: "Authority Assigned", date: "18 May 2026, 09:00 AM", completed: true },
      { step: "Work in Progress", date: "18 May 2026, 11:30 AM", completed: true },
      { step: "Resolved", date: "18 May 2026, 03:00 PM", completed: true },
      { step: "Verified by Citizen", date: "19 May 2026, 10:00 AM", completed: true }
    ],
    resolutionStatus: "resolved",
    feedback: "Waste cleared and bleaching powder sprayed."
  },
  {
    id: "GRV-2026-00122",
    issue: "Broken Road",
    category: "Roads",
    location: "Near Panchayat Office, Ward 1",
    gps: "12.8740° N, 74.8465° E",
    authority: "Gram Panchayat (PWD / Roads)",
    priority: "Medium",
    confidence: 89,
    status: "Closed",
    date: "15 May 2026",
    time: "02:00 PM",
    description: "Deep pothole developed after heavy rain near the entrance arch causing two-wheeler skids.",
    audioDuration: null,
    inputType: "type",
    image: "https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&w=600&q=80",
    timeline: [
      { step: "Complaint Registered", date: "15 May 2026, 02:00 PM", completed: true },
      { step: "AI Classification Completed", date: "15 May 2026, 02:05 PM", completed: true },
      { step: "Authority Assigned", date: "15 May 2026, 03:30 PM", completed: true },
      { step: "Work in Progress", date: "16 May 2026, 09:00 AM", completed: true },
      { step: "Resolved", date: "17 May 2026, 05:00 PM", completed: true },
      { step: "Closed", date: "18 May 2026, 11:00 AM", completed: true }
    ],
    resolutionStatus: "resolved",
    feedback: "Patchwork asphalt completed cleanly."
  },
  {
    id: "GRV-2026-00121",
    issue: "Drainage Overflow",
    category: "Water Supply",
    location: "Behind Temple, Ward 4",
    gps: "12.8801° N, 74.8540° E",
    authority: "Gram Panchayat (Sanitation Dept)",
    priority: "High",
    confidence: 91,
    status: "In Progress",
    date: "10 May 2026",
    time: "11:20 AM",
    description: "Open drain is choked with silt and overflowing onto the main lane during morning temple visits.",
    audioDuration: "00:12",
    inputType: "voice",
    image: "https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?auto=format&fit=crop&w=600&q=80",
    timeline: [
      { step: "Complaint Registered", date: "10 May 2026, 11:20 AM", completed: true },
      { step: "AI Classification Completed", date: "10 May 2026, 11:23 AM", completed: true },
      { step: "Authority Assigned", date: "10 May 2026, 01:00 PM", completed: true },
      { step: "Work in Progress", date: "11 May 2026, 08:30 AM", completed: true },
      { step: "Resolution Pending", date: "Pending Resolution", completed: false },
      { step: "Citizen Verification", date: "Pending Verification", completed: false }
    ],
    resolutionStatus: null,
    feedback: null
  },
  {
    id: "GRV-2026-00120",
    issue: "Hand Pump Handle Broken",
    category: "Water Supply",
    location: "Community Center, Ward 1",
    gps: "12.8712° N, 74.8492° E",
    authority: "Gram Panchayat (Water Dept)",
    priority: "Medium",
    confidence: 95,
    status: "Resolved",
    date: "08 May 2026",
    time: "09:40 AM",
    description: "Primary drinking water hand pump lever snapped. Villagers have to travel 1km for potable water.",
    audioDuration: "00:08",
    inputType: "voice",
    image: "https://images.unsplash.com/photo-1584467735815-f778f274e296?auto=format&fit=crop&w=600&q=80",
    timeline: [
      { step: "Complaint Registered", date: "08 May 2026, 09:40 AM", completed: true },
      { step: "AI Classification Completed", date: "08 May 2026, 09:42 AM", completed: true },
      { step: "Authority Assigned", date: "08 May 2026, 10:15 AM", completed: true },
      { step: "Work in Progress", date: "08 May 2026, 02:00 PM", completed: true },
      { step: "Resolved", date: "09 May 2026, 11:00 AM", completed: true },
      { step: "Verified by Citizen", date: "09 May 2026, 04:00 PM", completed: true }
    ],
    resolutionStatus: "resolved",
    feedback: "Hand pump repaired on the same day."
  },
  {
    id: "GRV-2026-00119",
    issue: "Dead Animal Removal",
    category: "Garbage",
    location: "Near Bus Stop, Ward 2",
    gps: "12.8789° N, 74.8511° E",
    authority: "Gram Panchayat (Sanitation Dept)",
    priority: "High",
    confidence: 97,
    status: "Escalated",
    date: "05 May 2026",
    time: "06:10 AM",
    description: "Urgent sanitation required near village bus stop for public health.",
    audioDuration: null,
    inputType: "type",
    image: "https://images.unsplash.com/photo-1605600659908-0ef719419d41?auto=format&fit=crop&w=600&q=80",
    timeline: [
      { step: "Complaint Registered", date: "05 May 2026, 06:10 AM", completed: true },
      { step: "AI Classification Completed", date: "05 May 2026, 06:12 AM", completed: true },
      { step: "Authority Assigned", date: "05 May 2026, 07:00 AM", completed: true },
      { step: "Escalated to Block Officer", date: "05 May 2026, 01:00 PM", completed: true },
      { step: "Resolution Pending", date: "Pending Action", completed: false },
      { step: "Citizen Verification", date: "Pending Verification", completed: false }
    ],
    resolutionStatus: null,
    feedback: null
  }
];

export const landingStats = [
  { value: "12,458+", label: "Complaints Received" },
  { value: "8,745+", label: "Resolved" },
  { value: "96.2%", label: "Satisfaction Rate" },
  { value: "245+", label: "Active Authorities" }
];

export const featureItems = [
  {
    title: "Speak or Type",
    desc: "Share your issue",
    step: "01"
  },
  {
    title: "AI Understands",
    desc: "Smart issue detection",
    step: "02"
  },
  {
    title: "Authority Identified",
    desc: "Right department",
    step: "03"
  },
  {
    title: "Track & Actions",
    desc: "Real-time updates",
    step: "04"
  },
  {
    title: "Resolution Verified",
    desc: "Citizen confirmation",
    step: "05"
  }
];

export const adminStats = {
  total: 128,
  inProgress: 24,
  resolved: 86,
  escalated: 7
};

export const categoryBreakdown = [
  { name: "Water Supply", count: 48, percentage: 38, color: "#087A55" },
  { name: "Street Light", count: 31, percentage: 24, color: "#2366B1" },
  { name: "Roads", count: 23, percentage: 18, color: "#F4A62A" },
  { name: "Garbage", count: 18, percentage: 14, color: "#7150A8" },
  { name: "Others", count: 8, percentage: 6, color: "#8A9CA8" }
];

export const recurringClusters = [
  {
    id: "RC-01",
    issue: "Water Leakage",
    location: "Ward 5",
    complaints: 18,
    trend: "up",
    severity: "High",
    department: "Water Department",
    lastReported: "10 mins ago"
  },
  {
    id: "RC-02",
    issue: "Street Light Not Working",
    location: "Ward 2",
    complaints: 12,
    trend: "up",
    severity: "High",
    department: "Electrical Dept",
    lastReported: "25 mins ago"
  },
  {
    id: "RC-03",
    issue: "Garbage Not Collected",
    location: "Ward 3",
    complaints: 9,
    trend: "up",
    severity: "Medium",
    department: "Sanitation Dept",
    lastReported: "45 mins ago"
  },
  {
    id: "RC-04",
    issue: "Low Water Pressure",
    location: "Ward 1",
    complaints: 7,
    trend: "steady",
    severity: "Medium",
    department: "Water Department",
    lastReported: "2 hrs ago"
  }
];
