import React from 'react';
import { Link } from 'react-router-dom';
import { 
  AlertTriangle, 
  TrendingUp, 
  Sparkles, 
  ArrowRight, 
  Eye, 
  MapPin, 
  Info,
  Building,
  CheckCircle
} from 'lucide-react';
import AdminSidebar from '../components/AdminSidebar';
import StatusBadge from '../components/StatusBadge';
import { recurringClusters } from '../data/mockData';

export default function RecurringIssues() {
  return (
    <div className="admin-layout">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content Body */}
      <div className="admin-main">
        {/* Topbar */}
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

        <main className="admin-content">
          {/* Heading */}
          <div style={{ marginBottom: '1.75rem' }}>
            <h1 style={{ fontSize: '1.9rem', fontWeight: 800, color: '#102333', letterSpacing: '-0.3px' }}>
              Recurring Issues Detected
            </h1>
            <p style={{ fontSize: '0.9rem', color: '#5A6D7C' }}>
              Spatial clustering and frequency analysis for preventive governance
            </p>
          </div>

          {/* WARNING / INFO ALERT */}
          <div style={{
            backgroundColor: '#FEF6E7',
            border: '1px solid #FCD99A',
            borderRadius: '14px',
            padding: '1.15rem 1.5rem',
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            marginBottom: '1.75rem',
            boxShadow: '0 2px 6px rgba(244, 166, 42, 0.08)'
          }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '10px',
              backgroundColor: '#FDE4B0',
              color: '#B54708',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}>
              <AlertTriangle size={22} strokeWidth={2.4} />
            </div>
            <div>
              <div style={{ fontSize: '0.95rem', fontWeight: 800, color: '#8F3800' }}>
                AI has detected recurring issue clusters.
              </div>
              <div style={{ fontSize: '0.84rem', color: '#B54708', marginTop: '2px' }}>
                3 localized hotspots identified with more than 8 repeated complaints within a 500m radius in the last 14 days.
              </div>
            </div>
          </div>

          {/* RECURRING ISSUES CLUSTER TABLE */}
          <div className="data-table-container" style={{ marginBottom: '2rem' }}>
            <div style={{ overflowX: 'auto' }}>
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Issue Cluster</th>
                    <th>Location</th>
                    <th>Complaints</th>
                    <th>Trend</th>
                    <th>Severity</th>
                    <th style={{ textAlign: 'right' }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {recurringClusters.map((cluster) => (
                    <tr key={cluster.id}>
                      <td>
                        <div style={{ fontWeight: 800, color: '#102333', fontSize: '0.95rem' }}>
                          {cluster.issue}
                        </div>
                        <div style={{ fontSize: '0.78rem', color: '#5A6D7C' }}>
                          Dept: {cluster.department}
                        </div>
                      </td>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#102333', fontWeight: 600 }}>
                          <MapPin size={14} color="#087A55" />
                          {cluster.location}
                        </div>
                      </td>
                      <td style={{ fontWeight: 700, color: '#102333' }}>
                        {cluster.complaints} complaints
                      </td>
                      <td>
                        <span style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '4px',
                          color: '#D92D20',
                          backgroundColor: '#FDE8E8',
                          padding: '3px 8px',
                          borderRadius: '6px',
                          fontSize: '0.78rem',
                          fontWeight: 700
                        }}>
                          <TrendingUp size={13} />
                          up trend
                        </span>
                      </td>
                      <td>
                        <StatusBadge priority={cluster.severity} />
                      </td>
                      <td style={{ textAlign: 'right' }}>
                        <Link
                          to="/admin/complaints"
                          className="btn btn-outline btn-sm"
                          style={{
                            padding: '0.35rem 0.85rem',
                            fontSize: '0.78rem',
                            fontWeight: 700,
                            borderColor: '#DDE7E2'
                          }}
                        >
                          <Eye size={13} />
                          View
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* AI INSIGHT CARD */}
          <div style={{
            backgroundColor: '#FFFFFF',
            border: '1px solid #DDE7E2',
            borderRadius: '16px',
            padding: '1.75rem 2rem',
            boxShadow: '0 4px 12px rgba(16, 35, 51, 0.04)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '1.5rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1.25rem', maxWidth: '700px' }}>
              <div style={{
                width: '46px',
                height: '46px',
                borderRadius: '12px',
                backgroundColor: '#E8F5EF',
                color: '#087A55',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}>
                <Sparkles size={24} strokeWidth={2.2} />
              </div>
              <div>
                <div style={{ fontSize: '0.8rem', fontWeight: 800, color: '#087A55', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  AI Preventive Insight
                </div>
                <p style={{ fontSize: '1rem', fontWeight: 700, color: '#102333', marginTop: '4px', lineHeight: 1.4 }}>
                  Multiple complaints from the same area indicate a systemic issue that requires immediate attention.
                </p>
                <p style={{ fontSize: '0.84rem', color: '#5A6D7C', marginTop: '4px' }}>
                  Ward 5 water leakage cluster is correlated with old main feeder pipeline pressure surge.
                </p>
              </div>
            </div>

            {/* View Full Analytics Button */}
            <Link
              to="/admin/analytics"
              className="btn btn-primary"
              style={{
                padding: '0.8rem 1.6rem',
                fontWeight: 800,
                fontSize: '0.88rem',
                boxShadow: '0 4px 12px rgba(8, 122, 85, 0.25)'
              }}
            >
              VIEW FULL ANALYTICS
              <ArrowRight size={16} />
            </Link>
          </div>
        </main>
      </div>
    </div>
  );
}
