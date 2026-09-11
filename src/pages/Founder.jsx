import React from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink, Mic, Cpu, Route, Eye, Users } from 'lucide-react';
import { LinkedinIcon, GithubIcon } from '../components/SocialIcons';

// Page-level SEO via document title
if (typeof document !== 'undefined') {
  document.title = 'Divya Shettar | Founder of Awaaz Sarpanch';
}

const pillStyle = {
  display: 'inline-flex', alignItems: 'center', gap: '0.45rem',
  backgroundColor: '#E2F5EC', color: '#087A55',
  padding: '0.35rem 0.9rem', borderRadius: '9999px',
  fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.3px',
  border: '1px solid #C4EBD8', marginBottom: '1.5rem'
};

const cardStyle = {
  backgroundColor: '#FFFFFF', border: '1px solid #DDE7E2',
  borderRadius: '14px', padding: '1.5rem',
  boxShadow: '0 2px 8px rgba(16,35,51,0.04)'
};

const linkBtnStyle = (bg, color) => ({
  display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
  backgroundColor: bg, color: color,
  padding: '0.6rem 1.2rem', borderRadius: '8px',
  textDecoration: 'none', fontWeight: 700, fontSize: '0.88rem',
  border: `1px solid ${color === '#FFFFFF' ? 'transparent' : '#DDE7E2'}`,
  transition: 'opacity 0.15s ease'
});

const reasons = [
  {
    icon: Mic,
    title: 'Voice-First Accessibility',
    desc: 'Text-heavy government portals create barriers for rural citizens who speak diverse local languages and dialects. Awaaz Sarpanch removes this barrier by allowing citizens to speak naturally in their own language.'
  },
  {
    icon: Cpu,
    title: 'AI-Powered Complaint Understanding',
    desc: 'Spoken or typed grievances are automatically analysed by AI to extract the issue type, assign the correct government department and set an appropriate priority — without manual intervention.'
  },
  {
    icon: Route,
    title: 'Intelligent Authority Routing',
    desc: 'The platform routes each complaint directly to the responsible department — PWD for roads, water department for supply issues, electrical department for street lights — ensuring faster resolution.'
  },
  {
    icon: Eye,
    title: 'Transparent Complaint Tracking',
    desc: 'Citizens receive a unique Grievance ID and can track the status of their complaint in real time, from registration through verification and final resolution.'
  },
  {
    icon: Users,
    title: 'Accountability in Local Governance',
    desc: 'By making complaint submission easy and resolution trackable, Awaaz Sarpanch creates a culture of accountability between local authorities and the communities they serve.'
  }
];

export default function Founder() {
  return (
    <div style={{ backgroundColor: '#F7FAF8', minHeight: 'calc(100vh - 80px)', paddingBottom: '5rem' }}>
      {/* Page-specific JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ProfilePage",
            "mainEntity": {
              "@type": "Person",
              "@id": "https://sih-lake-sigma.vercel.app/#divya-shettar",
              "name": "Divya Shettar",
              "jobTitle": "Founder & Project Lead",
              "url": "https://sih-lake-sigma.vercel.app/founder",
              "sameAs": [
                "https://linkedin.com/in/divya-shettar-258078370",
                "https://github.com/divya5623"
              ],
              "founder": {
                "@type": "SoftwareApplication",
                "name": "Awaaz Sarpanch",
                "url": "https://sih-lake-sigma.vercel.app/"
              }
            }
          })
        }}
      />

      <div style={{ maxWidth: '860px', margin: '0 auto', padding: '3rem 1.5rem 0' }}>

        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" style={{ fontSize: '0.82rem', color: '#8A9CA8', marginBottom: '2rem' }}>
          <Link to="/" style={{ color: '#087A55', textDecoration: 'none', fontWeight: 600 }}>Home</Link>
          <span style={{ margin: '0 0.5rem' }}>›</span>
          <span>Founder</span>
        </nav>

        {/* Hero Card */}
        <div style={{
          backgroundColor: '#FFFFFF', border: '1px solid #DDE7E2',
          borderRadius: '20px', padding: '2.5rem',
          boxShadow: '0 4px 20px rgba(16,35,51,0.06)',
          marginBottom: '3rem',
          display: 'grid',
          gridTemplateColumns: 'auto 1fr',
          gap: '2rem',
          alignItems: 'start'
        }}>
          {/* Avatar placeholder */}
          <div style={{
            width: '96px', height: '96px', borderRadius: '50%',
            backgroundColor: '#087A55',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '2.4rem', fontWeight: 900, color: '#FFFFFF',
            flexShrink: 0, letterSpacing: '-1px'
          }} aria-hidden="true">
            DS
          </div>

          <div>
            <div style={pillStyle}>Founder & Project Lead</div>
            <h1 style={{
              fontSize: 'clamp(1.8rem, 4vw, 2.6rem)',
              fontWeight: 900, color: '#102333',
              marginBottom: '0.35rem', lineHeight: 1.15
            }}>
              Divya Shettar
            </h1>
            <p style={{
              fontSize: '1.05rem', color: '#087A55',
              fontWeight: 700, marginBottom: '1rem'
            }}>
              Founder &amp; Project Lead — Awaaz Sarpanch
            </p>
            <p style={{
              fontSize: '0.95rem', color: '#5A6D7C',
              lineHeight: 1.7, marginBottom: '1.5rem', maxWidth: '560px'
            }}>
              Awaaz Sarpanch is a voice-first AI civic-governance platform founded by Divya Shettar
              to bridge the communication gap between citizens and Gram Panchayat authorities.
              The platform combines conversational AI, intelligent issue classification, authority
              routing and transparent complaint tracking to make local governance more accessible,
              accountable and citizen-centric.
            </p>

            {/* Links */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
              <a
                href="https://linkedin.com/in/divya-shettar-258078370"
                target="_blank" rel="noopener noreferrer"
                style={linkBtnStyle('#0A66C2', '#FFFFFF')}
                aria-label="Divya Shettar on LinkedIn"
              >
                <LinkedinIcon size={16} /> LinkedIn
              </a>
              <a
                href="https://github.com/divya5623"
                target="_blank" rel="noopener noreferrer"
                style={linkBtnStyle('#24292F', '#FFFFFF')}
                aria-label="Divya Shettar on GitHub"
              >
                <GithubIcon size={16} /> GitHub
              </a>
              <a
                href="https://sih-lake-sigma.vercel.app/"
                target="_blank" rel="noopener noreferrer"
                style={linkBtnStyle('#087A55', '#FFFFFF')}
                aria-label="Awaaz Sarpanch live prototype"
              >
                <ExternalLink size={16} /> Live Prototype
              </a>
            </div>
          </div>
        </div>

        {/* Why Awaaz Sarpanch Was Created */}
        <section style={{ marginBottom: '3rem' }}>
          <h2 style={{
            fontSize: '1.5rem', fontWeight: 800, color: '#102333',
            marginBottom: '0.5rem'
          }}>
            Why Awaaz Sarpanch Was Created
          </h2>
          <p style={{
            fontSize: '0.95rem', color: '#5A6D7C', lineHeight: 1.7,
            marginBottom: '1.5rem', maxWidth: '700px'
          }}>
            More than 65% of India's population lives in rural areas governed by Gram Panchayats.
            While mobile phone penetration continues to grow, most government grievance portals
            require text-heavy forms, English literacy and stable internet — barriers that exclude
            a significant portion of citizens from accessing the local governance they are entitled to.
          </p>
          <p style={{
            fontSize: '0.95rem', color: '#5A6D7C', lineHeight: 1.7,
            maxWidth: '700px'
          }}>
            Divya Shettar built Awaaz Sarpanch on a simple principle:{' '}
            <em style={{ color: '#102333', fontStyle: 'italic' }}>
              "If a citizen can speak, they should be able to demand governance."
            </em>{' '}
            The platform turns natural spoken complaints into structured, actionable work orders —
            automatically classified, routed and tracked.
          </p>
        </section>

        {/* Five Pillars */}
        <section style={{ marginBottom: '3rem' }}>
          <h2 style={{
            fontSize: '1.5rem', fontWeight: 800, color: '#102333', marginBottom: '1.5rem'
          }}>
            What the Platform Addresses
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.25rem'
          }}>
            {reasons.map((item, i) => {
              const Icon = item.icon;
              return (
                <div key={i} style={cardStyle}>
                  <div style={{
                    width: '42px', height: '42px', borderRadius: '10px',
                    backgroundColor: '#E8F5EF', color: '#087A55',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    marginBottom: '0.85rem'
                  }} aria-hidden="true">
                    <Icon size={20} strokeWidth={2.2} />
                  </div>
                  <h3 style={{
                    fontSize: '1rem', fontWeight: 800, color: '#102333',
                    marginBottom: '0.4rem'
                  }}>
                    {item.title}
                  </h3>
                  <p style={{ fontSize: '0.86rem', color: '#5A6D7C', lineHeight: 1.6 }}>
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Vision */}
        <section style={{
          backgroundColor: '#102333', borderRadius: '16px',
          padding: '2.25rem 2rem', marginBottom: '3rem', color: '#FFFFFF'
        }}>
          <h2 style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: '0.75rem' }}>
            Vision
          </h2>
          <p style={{ fontSize: '0.95rem', lineHeight: 1.75, color: '#C8D8E4', maxWidth: '640px' }}>
            To make grassroots governance genuinely participatory — where every citizen, regardless
            of language, literacy or location, can communicate with local authorities and hold them
            accountable through transparent, technology-enabled processes.
          </p>
        </section>

        {/* Project Links */}
        <section style={{ textAlign: 'center' }}>
          <p style={{ fontSize: '0.9rem', color: '#8A9CA8', marginBottom: '1.25rem' }}>
            Explore Awaaz Sarpanch
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <Link to="/" style={linkBtnStyle('#087A55', '#FFFFFF')}>
              Home
            </Link>
            <Link to="/about" style={linkBtnStyle('#FFFFFF', '#102333')}>
              About the Platform
            </Link>
            <Link to="/how-it-works" style={linkBtnStyle('#FFFFFF', '#102333')}>
              How It Works
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
