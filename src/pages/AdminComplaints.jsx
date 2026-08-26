import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, Eye, ChevronLeft, ChevronRight, Download, SlidersHorizontal } from 'lucide-react';
import AdminSidebar from '../components/AdminSidebar';
import StatusBadge from '../components/StatusBadge';
import { useComplaints } from '../context/ComplaintContext';

export default function AdminComplaints() {
  const { complaints } = useComplaints();
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [selectedStatus, setSelectedStatus] = useState('All Status');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const categories = ['All Categories', 'Water Supply', 'Street Light', 'Roads', 'Garbage'];
  const statuses = ['All Status', 'In Progress', 'Resolved', 'Closed', 'Escalated'];

  const filtered = complaints.filter(item => {
    if (selectedCategory !== 'All Categories' && item.category !== selectedCategory) return false;
    if (selectedStatus !== 'All Status' && item.status !== selectedStatus) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return item.id.toLowerCase().includes(q) ||
             item.issue.toLowerCase().includes(q) ||
             item.location.toLowerCase().includes(q) ||
             item.authority.toLowerCase().includes(q);
    }
    return true;
  });

  return (
    <div className="admin-layout">
      {/* Admin Sidebar */}
      <AdminSidebar />

      {/* Admin Main Body */}
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

        {/* Content Area */}
        <main className="admin-content">
          {/* Heading */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.75rem' }}>
            <div>
              <h1 style={{ fontSize: '1.9rem', fontWeight: 800, color: '#102333', letterSpacing: '-0.3px' }}>
                All Complaints
              </h1>
              <p style={{ fontSize: '0.9rem', color: '#5A6D7C' }}>
                Manage, assign and verify department resolutions across all wards
              </p>
            </div>
          </div>

          {/* TOP FILTER BAR */}
          <div style={{
            backgroundColor: '#FFFFFF',
            border: '1px solid #DDE7E2',
            borderRadius: '14px',
            padding: '1rem 1.25rem',
            boxShadow: '0 2px 6px rgba(16, 35, 51, 0.03)',
            marginBottom: '1.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap', flex: 1 }}>
              {/* Category Dropdown */}
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                style={{
                  padding: '0.55rem 1rem',
                  borderRadius: '8px',
                  border: '1px solid #DDE7E2',
                  backgroundColor: '#F8FAF9',
                  color: '#102333',
                  fontSize: '0.88rem',
                  fontWeight: 600,
                  outline: 'none',
                  cursor: 'pointer'
                }}
              >
                {categories.map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>

              {/* Status Dropdown */}
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                style={{
                  padding: '0.55rem 1rem',
                  borderRadius: '8px',
                  border: '1px solid #DDE7E2',
                  backgroundColor: '#F8FAF9',
                  color: '#102333',
                  fontSize: '0.88rem',
                  fontWeight: 600,
                  outline: 'none',
                  cursor: 'pointer'
                }}
              >
                {statuses.map(s => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>

              {/* Search Box */}
              <div style={{ position: 'relative', minWidth: '260px', flex: 1 }}>
                <Search size={16} color="#8A9CA8" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                <input
                  type="text"
                  placeholder="Search complaints, wards, IDs..."
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

            {/* Filter Button */}
            <button
              type="button"
              className="btn btn-outline btn-sm"
              style={{ padding: '0.55rem 1.1rem', borderColor: '#DDE7E2', color: '#102333' }}
            >
              <SlidersHorizontal size={15} />
              Filter
            </button>
          </div>

          {/* LARGE COMPLAINTS TABLE */}
          <div className="data-table-container" style={{ marginBottom: '1.5rem' }}>
            <div style={{ overflowX: 'auto' }}>
              <table className="data-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Issue</th>
                    <th>Location</th>
                    <th>Category</th>
                    <th>Priority</th>
                    <th>Status</th>
                    <th>Date</th>
                    <th style={{ textAlign: 'right' }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.length > 0 ? (
                    filtered.map((item) => (
                      <tr key={item.id}>
                        <td style={{ fontWeight: 700, color: '#087A55', letterSpacing: '0.3px' }}>
                          {item.id}
                        </td>
                        <td style={{ fontWeight: 700, color: '#102333' }}>
                          {item.issue}
                        </td>
                        <td style={{ color: '#5A6D7C' }}>
                          {item.location}
                        </td>
                        <td style={{ color: '#2366B1', fontWeight: 600 }}>
                          {item.category}
                        </td>
                        <td>
                          <StatusBadge priority={item.priority} />
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
                              padding: '0.35rem 0.8rem',
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
                    ))
                  ) : (
                    <tr>
                      <td colSpan={8} style={{ textAlign: 'center', padding: '3rem', color: '#8A9CA8' }}>
                        No complaints matching selected filter criteria.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* PAGINATION & FOOTER TEXT */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '1rem',
            padding: '0.5rem 0'
          }}>
            <div style={{ fontSize: '0.85rem', color: '#5A6D7C', fontWeight: 500 }}>
              Showing 1-5 of 128 results
            </div>

            {/* Pagination Controls matching screenshot */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              {[1, 2, 3, 4, 5].map((page) => (
                <button
                  key={page}
                  type="button"
                  onClick={() => setCurrentPage(page)}
                  style={{
                    width: '34px',
                    height: '34px',
                    borderRadius: '8px',
                    border: page === currentPage ? '1px solid #087A55' : '1px solid #DDE7E2',
                    backgroundColor: page === currentPage ? '#087A55' : '#FFFFFF',
                    color: page === currentPage ? '#FFFFFF' : '#102333',
                    fontWeight: page === currentPage ? 700 : 500,
                    fontSize: '0.85rem',
                    cursor: 'pointer'
                  }}
                >
                  {page}
                </button>
              ))}

              <span style={{ padding: '0 4px', color: '#8A9CA8' }}>...</span>

              <button
                type="button"
                style={{
                  width: '34px',
                  height: '34px',
                  borderRadius: '8px',
                  border: '1px solid #DDE7E2',
                  backgroundColor: '#FFFFFF',
                  color: '#102333',
                  fontSize: '0.85rem',
                  cursor: 'pointer',
                  fontWeight: 500
                }}
              >
                26
              </button>

              <button
                type="button"
                style={{
                  width: '34px',
                  height: '34px',
                  borderRadius: '8px',
                  border: '1px solid #DDE7E2',
                  backgroundColor: '#FFFFFF',
                  color: '#102333',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer'
                }}
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
