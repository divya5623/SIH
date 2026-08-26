import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Shield, ChevronDown, Menu, X, PlusCircle, User, LogOut, LayoutDashboard, FileText } from 'lucide-react';
import { useComplaints } from '../context/ComplaintContext';

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser, setCurrentUser } = useComplaints();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const isCitizenAuthPath = location.pathname.startsWith('/complaints') || 
                            location.pathname.startsWith('/complaint/') || 
                            location.pathname.startsWith('/report');

  const isAdminPath = location.pathname.startsWith('/admin');

  if (isAdminPath) {
    return null; // Admin has its own sidebar layout
  }

  const handleLogout = () => {
    setUserDropdownOpen(false);
    navigate('/login');
  };

  return (
    <header className="site-header">
      <div className="header-inner">
        {/* Brand Logo & Subtitle */}
        <Link to="/" className="brand-container" style={{ textDecoration: 'none' }}>
          <div className="brand-icon">
            <Shield size={22} strokeWidth={2.4} />
          </div>
          <div className="brand-text">
            <div className="brand-title">
              <span className="awaaz">AWAAZ</span>
              <span className="sarpanch">SARPANCH</span>
            </div>
            <div className="brand-subtitle">
              Citizens Speak. AI Understands. Authorities Act.
            </div>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="header-nav">
          <Link
            to="/"
            className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
          >
            Home
          </Link>

          {isCitizenAuthPath ? (
            <Link
              to="/complaints"
              className={`nav-link ${location.pathname.startsWith('/complaints') ? 'active' : ''}`}
            >
              My Complaints
            </Link>
          ) : (
            <>
              <Link
                to="/how-it-works"
                className={`nav-link ${location.pathname === '/how-it-works' ? 'active' : ''}`}
              >
                How It Works
              </Link>
              <Link
                to="/features"
                className={`nav-link ${location.pathname === '/features' ? 'active' : ''}`}
              >
                Features
              </Link>
              <Link
                to="/about"
                className={`nav-link ${location.pathname === '/about' ? 'active' : ''}`}
              >
                About Us
              </Link>
              <Link
                to="/contact"
                className={`nav-link ${location.pathname === '/contact' ? 'active' : ''}`}
              >
                Contact
              </Link>
            </>
          )}
        </nav>

        {/* Desktop Actions */}
        <div className="header-actions">
          {isCitizenAuthPath ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', position: 'relative' }}>
              <Link to="/report" className="btn btn-primary btn-sm" style={{ padding: '0.45rem 1rem' }}>
                <PlusCircle size={15} />
                New Complaint
              </Link>

              {/* User Avatar Badge with Dropdown */}
              <div
                className="user-profile-badge"
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                title="User Profile"
              >
                <div className="user-avatar">
                  {currentUser.name ? currentUser.name.charAt(0) : 'R'}
                </div>
                <span className="user-name">{currentUser.name || 'Ramesh Kumar'}</span>
                <ChevronDown size={14} color="#5A6D7C" />
              </div>

              {userDropdownOpen && (
                <div
                  style={{
                    position: 'absolute',
                    top: '110%',
                    right: 0,
                    backgroundColor: '#FFFFFF',
                    border: '1px solid #DDE7E2',
                    borderRadius: '10px',
                    boxShadow: '0 8px 24px rgba(16, 35, 51, 0.12)',
                    width: '210px',
                    zIndex: 100,
                    overflow: 'hidden'
                  }}
                >
                  <div style={{ padding: '0.75rem 1rem', borderBottom: '1px solid #EEF2F0', backgroundColor: '#F8FAF9' }}>
                    <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#102333' }}>{currentUser.name}</div>
                    <div style={{ fontSize: '0.75rem', color: '#5A6D7C' }}>{currentUser.village}</div>
                    <div style={{ fontSize: '0.7rem', color: '#087A55', fontWeight: 600, marginTop: '2px' }}>{currentUser.citizenId}</div>
                  </div>
                  <Link
                    to="/complaints"
                    onClick={() => setUserDropdownOpen(false)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.6rem',
                      padding: '0.65rem 1rem',
                      fontSize: '0.85rem',
                      color: '#102333',
                      textDecoration: 'none'
                    }}
                  >
                    <FileText size={15} color="#087A55" />
                    My Complaints
                  </Link>
                  <Link
                    to="/admin"
                    onClick={() => setUserDropdownOpen(false)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.6rem',
                      padding: '0.65rem 1rem',
                      fontSize: '0.85rem',
                      color: '#102333',
                      textDecoration: 'none'
                    }}
                  >
                    <LayoutDashboard size={15} color="#2366B1" />
                    Authority / Admin
                  </Link>
                  <div
                    onClick={handleLogout}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.6rem',
                      padding: '0.65rem 1rem',
                      fontSize: '0.85rem',
                      color: '#E94B4B',
                      borderTop: '1px solid #EEF2F0',
                      cursor: 'pointer'
                    }}
                  >
                    <LogOut size={15} color="#E94B4B" />
                    Logout
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <Link to="/login" className="btn btn-outline btn-sm" style={{ padding: '0.5rem 1.1rem' }}>
                Login
              </Link>
              <Link to="/report" className="btn btn-primary btn-sm" style={{ padding: '0.5rem 1.25rem' }}>
                File a Complaint
              </Link>
            </div>
          )}

          {/* Mobile hamburger button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{
              display: 'none',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: '#102333',
              padding: '4px'
            }}
            className="mobile-menu-btn"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown menu */}
      {mobileMenuOpen && (
        <div style={{
          backgroundColor: '#FFFFFF',
          borderBottom: '1px solid #DDE7E2',
          padding: '1rem 1.5rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.75rem'
        }}>
          <Link to="/" onClick={() => setMobileMenuOpen(false)} style={{ padding: '0.5rem 0', fontWeight: 600 }}>Home</Link>
          <Link to="/how-it-works" onClick={() => setMobileMenuOpen(false)} style={{ padding: '0.5rem 0' }}>How It Works</Link>
          <Link to="/features" onClick={() => setMobileMenuOpen(false)} style={{ padding: '0.5rem 0' }}>Features</Link>
          <Link to="/complaints" onClick={() => setMobileMenuOpen(false)} style={{ padding: '0.5rem 0' }}>My Complaints</Link>
          <Link to="/admin" onClick={() => setMobileMenuOpen(false)} style={{ padding: '0.5rem 0', color: '#2366B1', fontWeight: 600 }}>Authority Portal</Link>
          <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
            <Link to="/login" onClick={() => setMobileMenuOpen(false)} className="btn btn-outline btn-full">Login</Link>
            <Link to="/report" onClick={() => setMobileMenuOpen(false)} className="btn btn-primary btn-full">File Complaint</Link>
          </div>
        </div>
      )}
    </header>
  );
}
