import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LinkedinIcon, GithubIcon } from './SocialIcons';

const footerLinks = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/founder', label: 'Founder' },
  { to: '/how-it-works', label: 'How It Works' },
  { to: '/complaints', label: 'My Complaints' },
  { to: '/login', label: 'Login' },
];

export default function Footer() {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');
  const isLogin = location.pathname === '/login';

  // Don't show footer on admin or login pages
  if (isAdmin || isLogin) return null;

  return (
    <footer style={{
      backgroundColor: '#102333',
      color: '#C8D8E4',
      padding: '3rem 1.5rem 2rem',
      marginTop: '2rem'
    }} role="contentinfo">
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '2.5rem',
          marginBottom: '2.5rem'
        }}>
          {/* Brand Column */}
          <div>
            <div style={{ marginBottom: '0.75rem' }}>
              <span style={{ color: '#087A55', fontWeight: 900, fontSize: '1.2rem', letterSpacing: '0.3px' }}>AWAAZ </span>
              <span style={{ color: '#FFFFFF', fontWeight: 900, fontSize: '1.2rem' }}>SARPANCH</span>
            </div>
            <p style={{ fontSize: '0.87rem', lineHeight: 1.7, color: '#8A9CA8', marginBottom: '0.85rem', maxWidth: '260px' }}>
              Voice-first AI for accessible, transparent and accountable local governance.
            </p>
            <p style={{ fontSize: '0.82rem', color: '#6A7F8C' }}>
              Founded &amp; developed by{' '}
              <Link
                to="/founder"
                style={{ color: '#4CB87A', fontWeight: 700, textDecoration: 'none' }}
                aria-label="Divya Shettar — Founder of Awaaz Sarpanch"
              >
                Divya Shettar
              </Link>
            </p>
          </div>

          {/* Navigation Column */}
          <nav aria-label="Footer navigation">
            <div style={{ fontSize: '0.78rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1.2px', color: '#4CB87A', marginBottom: '1rem' }}>
              Navigation
            </div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              {footerLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    style={{ color: '#8A9CA8', textDecoration: 'none', fontSize: '0.88rem', fontWeight: 500 }}
                    onMouseOver={e => e.target.style.color = '#FFFFFF'}
                    onMouseOut={e => e.target.style.color = '#8A9CA8'}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Connect Column */}
          <div>
            <div style={{ fontSize: '0.78rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1.2px', color: '#4CB87A', marginBottom: '1rem' }}>
              Connect
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <a
                href="https://linkedin.com/in/divya-shettar-258078370"
                target="_blank" rel="noopener noreferrer"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                  color: '#8A9CA8', textDecoration: 'none', fontSize: '0.88rem'
                }}
                aria-label="Divya Shettar on LinkedIn (opens in new tab)"
                onMouseOver={e => e.currentTarget.style.color = '#FFFFFF'}
                onMouseOut={e => e.currentTarget.style.color = '#8A9CA8'}
              >
                <LinkedinIcon size={16} aria-hidden="true" /> LinkedIn — Divya Shettar
              </a>
              <a
                href="https://github.com/divya5623"
                target="_blank" rel="noopener noreferrer"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                  color: '#8A9CA8', textDecoration: 'none', fontSize: '0.88rem'
                }}
                aria-label="Awaaz Sarpanch on GitHub (opens in new tab)"
                onMouseOver={e => e.currentTarget.style.color = '#FFFFFF'}
                onMouseOut={e => e.currentTarget.style.color = '#8A9CA8'}
              >
                <GithubIcon size={16} aria-hidden="true" /> GitHub — divya5623
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{
          borderTop: '1px solid #1E3347',
          paddingTop: '1.5rem',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '0.75rem'
        }}>
          <p style={{ fontSize: '0.8rem', color: '#4D6275', margin: 0 }}>
            © {new Date().getFullYear()} Awaaz Sarpanch. Built by{' '}
            <Link to="/founder" style={{ color: '#4CB87A', textDecoration: 'none', fontWeight: 600 }}>
              Divya Shettar
            </Link>{' '}
            · Smart India Hackathon Project
          </p>
          <p style={{ fontSize: '0.8rem', color: '#4D6275', margin: 0 }}>
            Prototype · Demo · Not for production use
          </p>
        </div>
      </div>
    </footer>
  );
}
