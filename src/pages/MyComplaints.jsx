import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Phone, PlusCircle, Search, Eye, Filter, HelpCircle, ArrowRight } from 'lucide-react';
import StatusBadge from '../components/StatusBadge';
import { useComplaints } from '../context/ComplaintContext';

export default function MyComplaints() {
  const navigate = useNavigate();
  const { complaints } = useComplaints();
  const [activeTab, setActiveTab] = useState('all'); // 'all', 'in_progress', 'resolved'
  const [searchQuery, setSearchQuery] = useState('');

  const filteredComplaints = complaints.filter(item => {
    // Tab filter
    if (activeTab === 'in_progress' && item.status.toLowerCase() !== 'in progress') return false;
    if (activeTab === 'resolved' && item.status.toLowerCase() !== 'resolved') return false;

    // Search filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return item.id.toLowerCase().includes(q) ||
             item.issue.toLowerCase().includes(q) ||
             item.location.toLowerCase().includes(q) ||
             item.category.toLowerCase().includes(q);
    }
    return true;
  });

  return (
    <div style={{ backgroundColor: '#F7FAF8', minHeight: 'calc(100vh - 80px)', paddingBottom: '4rem' }}>
      <div className="page-wrapper">
        {/* Top Header & New Complaint Button */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          marginBottom: '2rem',
          flexWrap: 'wrap',
          gap: '1rem'
        }}>
          <div>
            <h1 style={{
              fontSize: '2.1rem',
              fontWeight: 800,
              color: '#102333',
              marginBottom: '0.35rem',
              letterSpacing: '-0.3px'
            }}>
              My Complaints
            </h1>
            <p style={{ fontSize: '0.95rem', color: '#5A6D7C', fontWeight: 500 }}>
              Track all your complaints and their status
            </p>
          </div>

          <Link to="/report" className="btn btn-primary">
            <PlusCircle size={18} />
            File New Complaint
          </Link>
        </div>

        {/* Tabs & Search Bar */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
          marginBottom: '1.5rem'
        }}>
          {/* Tabs */}
          <div style={{
            display: 'flex',
            backgroundColor: '#EAEFEA',
            padding: '4px',
            borderRadius: '10px',
            gap: '4px'
          }}>
            <button
              type="button"
              onClick={() => setActiveTab('all')}
              style={{
                border: 'none',
                backgroundColor: activeTab === 'all' ? '#FFFFFF' : 'transparent',
                color: activeTab === 'all' ? '#102333' : '#5A6D7C',
                fontWeight: activeTab === 'all' ? 700 : 500,
                padding: '0.5rem 1.25rem',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '0.88rem',
                boxShadow: activeTab === 'all' ? '0 2px 4px rgba(0,0,0,0.06)' : 'none',
                transition: 'all 0.15s ease'
              }}
            >
              All ({complaints.length})
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('in_progress')}
              style={{
                border: 'none',
                backgroundColor: activeTab === 'in_progress' ? '#FFFFFF' : 'transparent',
                color: activeTab === 'in_progress' ? '#B46B00' : '#5A6D7C',
                fontWeight: activeTab === 'in_progress' ? 700 : 500,
                padding: '0.5rem 1.25rem',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '0.88rem',
                boxShadow: activeTab === 'in_progress' ? '0 2px 4px rgba(0,0,0,0.06)' : 'none',
                transition: 'all 0.15s ease'
              }}
            >
              In Progress ({complaints.filter(c => c.status.toLowerCase() === 'in progress').length})
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('resolved')}
              style={{
                border: 'none',
                backgroundColor: activeTab === 'resolved' ? '#FFFFFF' : 'transparent',
                color: activeTab === 'resolved' ? '#087A55' : '#5A6D7C',
                fontWeight: activeTab === 'resolved' ? 700 : 500,
                padding: '0.5rem 1.25rem',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '0.88rem',
                boxShadow: activeTab === 'resolved' ? '0 2px 4px rgba(0,0,0,0.06)' : 'none',
                transition: 'all 0.15s ease'
              }}
            >
              Resolved ({complaints.filter(c => c.status.toLowerCase() === 'resolved').length})
            </button>
          </div>

          {/* Search Input */}
          <div style={{ position: 'relative', minWidth: '260px' }}>
            <Search size={16} color="#8A9CA8" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
            <input
              type="text"
              placeholder="Search by ID, issue, location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '0.55rem 1rem 0.55rem 2.25rem',
                borderRadius: '8px',
                border: '1px solid #DDE7E2',
                fontSize: '0.85rem',
                outline: 'none',
                backgroundColor: '#FFFFFF'
              }}
            />
          </div>
        </div>

        {/* COMPLAINTS TABLE */}
        <div className="data-table-container" style={{ marginBottom: '3rem' }}>
          <div style={{ overflowX: 'auto' }}>
            <table className="data-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Issue</th>
                  <th>Location</th>
                  <th>Status</th>
                  <th>Date</th>
                  <th style={{ textAlign: 'right' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredComplaints.length > 0 ? (
                  filteredComplaints.map((item) => (
                    <tr key={item.id}>
                      <td style={{ fontWeight: 700, color: '#087A55', letterSpacing: '0.3px' }}>
                        {item.id}
                      </td>
                      <td>
                        <div style={{ fontWeight: 700, color: '#102333' }}>{item.issue}</div>
                        <div style={{ fontSize: '0.78rem', color: '#5A6D7C' }}>{item.category}</div>
                      </td>
                      <td style={{ color: '#5A6D7C' }}>
                        {item.location}
                      </td>
                      <td>
                        <StatusBadge status={item.status} />
                      </td>
                      <td style={{ color: '#5A6D7C', fontSize: '0.85rem' }}>
                        {item.date}
                      </td>
                      <td style={{ textAlign: 'right' }}>
                        <Link
                          to={`/complaints/${item.id}`}
                          className="btn btn-outline btn-sm"
                          style={{
                            padding: '0.35rem 0.85rem',
                            fontSize: '0.8rem',
                            fontWeight: 700,
                            borderColor: '#DDE7E2'
                          }}
                        >
                          <Eye size={14} />
                          View
                        </Link>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} style={{ textAlign: 'center', padding: '3rem 1rem', color: '#8A9CA8' }}>
                      No complaints found matching your criteria.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* BOTTOM HELP SECTION */}
        <div style={{
          backgroundColor: '#FFFFFF',
          border: '1px solid #DDE7E2',
          borderRadius: '16px',
          padding: '1.75rem 2rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1.5rem',
          boxShadow: '0 2px 8px rgba(16, 35, 51, 0.04)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
            <div style={{
              width: '48px',
              height: '48px',
              borderRadius: '12px',
              backgroundColor: '#E8F5EF',
              color: '#087A55',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}>
              <HelpCircle size={26} strokeWidth={2.2} />
            </div>
            <div>
              <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#102333', marginBottom: '0.2rem' }}>
                Need Help?
              </h4>
              <p style={{ fontSize: '0.88rem', color: '#5A6D7C' }}>
                Call our 24x7 citizen support team or report discrepancies to your Panchayat officer.
              </p>
            </div>
          </div>

          <a
            href="tel:18001234567"
            className="btn btn-dark"
            style={{
              padding: '0.75rem 1.5rem',
              fontWeight: 700,
              fontSize: '0.95rem'
            }}
          >
            <Phone size={18} />
            1800-123-4567
          </a>
        </div>
      </div>
    </div>
  );
}
