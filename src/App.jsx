import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Landing from './pages/Landing';
import ChooseInput from './pages/ChooseInput';
import AIPreview from './pages/AIPreview';
import ComplaintSubmitted from './pages/ComplaintSubmitted';
import MyComplaints from './pages/MyComplaints';
import ComplaintDetail from './pages/ComplaintDetail';
import VerifyResolution from './pages/VerifyResolution';
import AdminDashboard from './pages/AdminDashboard';
import AdminComplaints from './pages/AdminComplaints';
import RecurringIssues from './pages/RecurringIssues';
import AdminAnalytics from './pages/AdminAnalytics';
import AdminAuthority from './pages/AdminAuthority';
import AdminReports from './pages/AdminReports';
import AdminUsers from './pages/AdminUsers';
import AdminSettings from './pages/AdminSettings';
import Login from './pages/Login';
import IdentityVerification from './pages/IdentityVerification';
import HowItWorks from './pages/HowItWorks';
import Features from './pages/Features';
import AboutUs from './pages/AboutUs';
import Contact from './pages/Contact';

export default function App() {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');

  return (
    <div className="app-container">
      {!isAdmin && <Header />}
      
      <main className="main-content">
        <Routes>
          {/* Public / Landing Routes */}
          <Route path="/" element={<Landing />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/features" element={<Features />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<Contact />} />

          {/* Grievance Submission Flow */}
          <Route path="/report" element={<ChooseInput />} />
          <Route path="/report/preview" element={<AIPreview />} />
          <Route path="/complaint/submitted" element={<ComplaintSubmitted />} />

          {/* Citizen Tracking & Details */}
          <Route path="/complaints" element={<MyComplaints />} />
          <Route path="/complaints/:id" element={<ComplaintDetail />} />
          <Route path="/complaints/:id/verify" element={<VerifyResolution />} />

          {/* Auth Flow */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<IdentityVerification />} />

          {/* Admin / Authority Portal */}
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/complaints" element={<AdminComplaints />} />
          <Route path="/admin/recurring" element={<RecurringIssues />} />
          <Route path="/admin/analytics" element={<AdminAnalytics />} />
          <Route path="/admin/authority" element={<AdminAuthority />} />
          <Route path="/admin/reports" element={<AdminReports />} />
          <Route path="/admin/users" element={<AdminUsers />} />
          <Route path="/admin/settings" element={<AdminSettings />} />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  );
}
