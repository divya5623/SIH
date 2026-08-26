import React from 'react';
import { Link } from 'react-router-dom';
import { 
  FileText, 
  Clock, 
  CheckCircle2, 
  AlertTriangle, 
  ArrowRight, 
  User, 
  TrendingUp, 
  ChevronRight, 
  Sparkles,
  MapPin
} from 'lucide-react';
import AdminSidebar from '../components/AdminSidebar';
import StatCard from '../components/StatCard';
import { adminStats, categoryBreakdown } from '../data/mockData';

export default function AdminDashboard() {
  const recentComplaints = [
    { title: "Water leakage near school", ward: "Ward 5", time: "10 min ago", category: "Water Supply", status: "In Progress" },
    { title: "Street light not working", ward: "Ward 2", time: "25 min ago", category: "Street Light", status: "In Progress" },
    { title: "Garbage not collected", ward: "Ward 3", time: "45 min ago", category: "Garbage", status: "Resolved" },
    { title: "Broken road", ward: "Ward 1", time: "1 hr ago", category: "Roads", status: "Closed" }
  ];

  return (
    <div className="admin-layout">
      {/* Dark Navy Sidebar */}
      <AdminSidebar />

      {/* Admin Main Body */}
      <div className="admin-main">
        {/* Admin Topbar */}
        <header className="admin-topbar">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{
              width: '34px',
              height: '34px',
              borderRadius: '50%',
              backgroundColor: '#E8F5EF',
              color: '#087A55',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 700,
              fontSize: '0.85rem'
            }}>
              PA
            </div>
            <div>
              <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#102333' }}>
                Panchayat Admin
              </div>
              <div style={{ fontSize: '0.72rem', color: '#5A6D7C' }}>
                Kalyanpur Gram Panchayat
              </div>
            </div>
          </div>
        </header>

        {/* Admin Content Area */}
        <main className="admin-content">
          {/* Dashboard Heading */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
            <div>
              <h1 style={{ fontSize: '1.9rem', fontWeight: 800, color: '#102333', letterSpacing: '-0.3px' }}>
                Dashboard
              </h1>
              <p style={{ fontSize: '0.9rem', color: '#5A6D7C' }}>
                Real-time grievance analytics and department monitoring
              </p>
            </div>

            <Link to="/admin/complaints" className="btn btn-primary btn-sm">
              <FileText size={15} />
              View All Grievances
            </Link>
          </div>

          {/* FOUR STATISTICS CARDS */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1.25rem',
            marginBottom: '2rem'
          }}>
            <StatCard
              value={adminStats.total}
              label="Total Complaints"
              icon={FileText}
              color="#087A55"
              trend="+12%"
              subtext="vs last month"
            />
            <StatCard
              value={adminStats.inProgress}
              label="In Progress"
              icon={Clock}
              color="#F4A62A"
              subtext="Average resolution: 2.1 days"
            />
            <StatCard
              value={adminStats.resolved}
              label="Resolved"
              icon={CheckCircle2}
              color="#1D9B61"
              trend="+94.8%"
              subtext="Citizen confirmation rate"
            />
            <StatCard
              value={adminStats.escalated}
              label="Escalated"
              icon={AlertTriangle}
              color="#E94B4B"
              subtext="Requires BDO review"
            />
          </div>

          {/* TWO MAJOR CARDS: DONUT CHART & RECENT COMPLAINTS */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
            gap: '1.5rem',
            marginBottom: '2rem'
          }}>
            {/* Left Card: Complaints by Category */}
            <div style={{
              backgroundColor: '#FFFFFF',
              border: '1px solid #DDE7E2',
              borderRadius: '16px',
              padding: '1.75rem',
              boxShadow: '0 2px 8px rgba(16, 35, 51, 0.04)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#102333' }}>
                  Complaints by Category
                </h3>
                <span style={{ fontSize: '0.78rem', color: '#5A6D7C', fontWeight: 600 }}>This Month</span>
              </div>

              {/* Donut Chart Visual + Legend */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                gap: '1.5rem',
                alignItems: 'center'
              }}>
                {/* SVG Donut Chart */}
                <div style={{ display: 'flex', justifyContent: 'center', position: 'relative' }}>
                  <svg width="180" height="180" viewBox="0 0 180 180">
                    {/* Circle slices */}
                    <circle cx="90" cy="90" r="65" fill="none" stroke="#087A55" strokeWidth="26" strokeDasharray="155 408" strokeDashoffset="0" />
                    <circle cx="90" cy="90" r="65" fill="none" stroke="#2366B1" strokeWidth="26" strokeDasharray="98 408" strokeDashoffset="-155" />
                    <circle cx="90" cy="90" r="65" fill="none" stroke="#F4A62A" strokeWidth="26" strokeDasharray="73 408" strokeDashoffset="-253" />
                    <circle cx="90" cy="90" r="65" fill="none" stroke="#7150A8" strokeWidth="26" strokeDasharray="57 408" strokeDashoffset="-326" />
                    <circle cx="90" cy="90" r="65" fill="none" stroke="#8A9CA8" strokeWidth="26" strokeDasharray="25 408" strokeDashoffset="-383" />
                    
                    {/* Center text */}
                    <text x="90" y="85" textAnchor="middle" fontSize="22" fontWeight="800" fill="#102333">128</text>
                    <text x="90" y="103" textAnchor="middle" fontSize="11" fontWeight="600" fill="#8A9CA8">TOTAL</text>
                  </svg>
                </div>

                {/* Legend list */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                  {categoryBreakdown.map((item) => (
                    <div key={item.name} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span style={{ width: '10px', height: '10px', borderRadius: '3px', backgroundColor: item.color }} />
                        <span style={{ color: '#102333', fontWeight: 600 }}>{item.name}</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span style={{ color: '#5A6D7C', fontWeight: 700 }}>{item.count}</span>
                        <span style={{ color: '#8A9CA8', fontSize: '0.75rem' }}>({item.percentage}%)</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Card: Recent Complaints */}
            <div style={{
              backgroundColor: '#FFFFFF',
              border: '1px solid #DDE7E2',
              borderRadius: '16px',
              padding: '1.75rem',
              boxShadow: '0 2px 8px rgba(16, 35, 51, 0.04)',
              display: 'flex',
              flexDirection: 'column'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#102333' }}>
                  Recent Complaints
                </h3>
                <span style={{ fontSize: '0.78rem', color: '#087A55', fontWeight: 700, backgroundColor: '#E8F5EF', padding: '2px 8px', borderRadius: '4px' }}>
                  Live Feed
                </span>
              </div>

              {/* Rows */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', flex: 1 }}>
                {recentComplaints.map((item, idx) => (
                  <div
                    key={idx}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '0.75rem 0.9rem',
                      backgroundColor: '#F8FAF9',
                      borderRadius: '10px',
                      border: '1px solid #EBF1EE'
                    }}
                  >
                    <div>
                      <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#102333' }}>
                        {item.title}
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '2px', fontSize: '0.78rem', color: '#5A6D7C' }}>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
                          <MapPin size={12} color="#087A55" />
                          {item.ward}
                        </span>
                        <span>•</span>
                        <span>{item.category}</span>
                      </div>
                    </div>

                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: '0.78rem', color: '#8A9CA8', fontWeight: 500 }}>
                        {item.time}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Bottom: View All Button */}
              <div style={{ marginTop: '1.25rem', paddingTop: '1rem', borderTop: '1px solid #EEF3F0', textAlign: 'center' }}>
                <Link
                  to="/admin/complaints"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.35rem',
                    color: '#087A55',
                    fontWeight: 700,
                    fontSize: '0.9rem'
                  }}
                >
                  View All Complaints
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
