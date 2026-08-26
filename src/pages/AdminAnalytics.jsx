import React from 'react';
import { BarChart3, TrendingUp, MapPin, Calendar, Download, Sparkles, Filter } from 'lucide-react';
import AdminSidebar from '../components/AdminSidebar';
import StatCard from '../components/StatCard';
import { categoryBreakdown } from '../data/mockData';

export default function AdminAnalytics() {
  const wardPerformance = [
    { ward: "Ward 1", total: 24, resolved: 22, avgDays: "1.8 days", score: "98%" },
    { ward: "Ward 2", total: 32, resolved: 28, avgDays: "2.3 days", score: "94%" },
    { ward: "Ward 3", total: 26, resolved: 24, avgDays: "2.1 days", score: "96%" },
    { ward: "Ward 4", total: 19, resolved: 17, avgDays: "1.9 days", score: "95%" },
    { ward: "Ward 5", total: 27, resolved: 20, avgDays: "3.4 days", score: "89%" },
  ];

  return (
    <div className="admin-layout">
      <AdminSidebar />
      <div className="admin-main">
        <header className="admin-topbar">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ width: '34px', height: '34px', borderRadius: '50%', backgroundColor: '#E8F5EF', color: '#087A55', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700 }}>PA</div>
            <div>
              <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#102333' }}>Panchayat Admin</div>
              <div style={{ fontSize: '0.72rem', color: '#5A6D7C' }}>Kalyanpur Gram Panchayat</div>
            </div>
          </div>
        </header>

        <main className="admin-content">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <h1 style={{ fontSize: '1.9rem', fontWeight: 800, color: '#102333' }}>Full Grievance Analytics</h1>
              <p style={{ fontSize: '0.9rem', color: '#5A6D7C' }}>Comprehensive department resolution speed and ward comparative benchmarks</p>
            </div>
            <button className="btn btn-outline btn-sm" style={{ borderColor: '#DDE7E2', color: '#102333' }}>
              <Download size={15} /> Export PDF Report
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.25rem', marginBottom: '2rem' }}>
            <StatCard value="2.1 Days" label="Avg Resolution Time" icon={TrendingUp} color="#087A55" trend="-18%" subtext="faster than district avg" />
            <StatCard value="96.2%" label="Citizen Satisfaction" icon={Sparkles} color="#1D9B61" trend="+2.4%" subtext="verified resolutions" />
            <StatCard value="94.8%" label="AI Triage Accuracy" icon={BarChart3} color="#2366B1" subtext="across 12 dialects" />
            <StatCard value="3.2 hrs" label="Avg First Response" icon={Calendar} color="#7150A8" subtext="dept assignment" />
          </div>

          {/* Ward Performance Table */}
          <div className="card" style={{ marginBottom: '2rem' }}>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#102333', marginBottom: '1.25rem' }}>Ward-Level Governance Performance</h3>
            <div style={{ overflowX: 'auto' }}>
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Ward / Zone</th>
                    <th>Total Registered</th>
                    <th>Resolved</th>
                    <th>Avg Resolution Speed</th>
                    <th>Satisfaction Index</th>
                  </tr>
                </thead>
                <tbody>
                  {wardPerformance.map(w => (
                    <tr key={w.ward}>
                      <td style={{ fontWeight: 700, color: '#102333' }}>{w.ward}</td>
                      <td>{w.total}</td>
                      <td style={{ color: '#087A55', fontWeight: 700 }}>{w.resolved}</td>
                      <td>{w.avgDays}</td>
                      <td>
                        <span className="badge badge-green">{w.score}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
