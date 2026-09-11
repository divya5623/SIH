import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Shield, Target, Award, Mic, Cpu, Route, Eye } from 'lucide-react';

const pillars = [
  {
    icon: Target,
    title: 'The Problem',
    desc: "More than 65% of India's population lives in rural areas governed by Gram Panchayats. Most government grievance portals require text forms, English literacy and stable internet — barriers that exclude a significant portion of citizens who should have equal access to local governance."
  },
  {
    icon: Mic,
    title: 'The Solution',
    desc: 'Awaaz Sarpanch lets citizens speak in their own language — Kannada, Hindi, Telugu, Tamil, Marathi or English. Their voice is transcribed, the issue is intelligently classified, and the complaint is routed directly to the correct department — all automatically.'
  },
  {
    icon: Cpu,
    title: 'AI-Powered Classification',
    desc: 'Grievances are analysed using AI to identify the issue type (roads, water, electricity, drainage, garbage) and assign an appropriate priority. This removes manual sorting and ensures faster action by the responsible department.'
  },
  {
    icon: Route,
    title: 'Intelligent Routing',
    desc: 'Each complaint is automatically forwarded to the correct authority — PWD for roads, water department for supply issues, electrical department for street lights. No citizen needs to know which department to contact.'
  },
  {
    icon: Eye,
    title: 'Transparent Tracking',
    desc: 'Every complaint gets a unique Grievance ID. Citizens track progress in real time — from registration through department assignment, work in progress and final resolution. There is no black box.'
  },
  {
    icon: Shield,
    title: 'Citizen Accountability',
    desc: 'Resolution is only confirmed when the citizen verifies it. This ensures authorities cannot close complaints prematurely and creates a culture of accountability in local governance.'
  }
];

export default function AboutUs() {
  useEffect(() => {
    document.title = 'About Awaaz Sarpanch | Voice-First AI Civic Governance';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute(
        'content',
        'Learn about Awaaz Sarpanch, a voice-first AI civic governance platform founded and developed by Divya Shettar to improve communication between citizens and local authorities.'
      );
    }
    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) {
      canonical.setAttribute('href', 'https://sih-lake-sigma.vercel.app/about');
    }

    return () => {
      document.title = 'Awaaz Sarpanch | Divya Shettar — Founder & Project Lead';
      if (metaDesc) {
        metaDesc.setAttribute(
          'content',
          'Awaaz Sarpanch, founded and developed by Divya Shettar, is a voice-first AI civic governance platform designed to make communication between citizens and Gram Panchayat authorities more accessible, transparent and accountable.'
        );
      }
      if (canonical) {
        canonical.setAttribute('href', 'https://sih-lake-sigma.vercel.app/');
      }
    };
  }, []);

  return (
    <div style={{ backgroundColor: '#F7FAF8', minHeight: 'calc(100vh - 80px)', paddingBottom: '5rem' }}>
      {/* Page-specific JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "AboutPage",
            "name": "About Awaaz Sarpanch | Voice-First AI Civic Governance",
            "url": "https://sih-lake-sigma.vercel.app/about",
            "description": "Learn about Awaaz Sarpanch, a voice-first AI civic governance platform founded and developed by Divya Shettar to improve communication between citizens and local authorities.",
            "mainEntity": {
              "@type": "SoftwareApplication",
              "@id": "https://sih-lake-sigma.vercel.app/#app",
              "name": "Awaaz Sarpanch",
              "url": "https://sih-lake-sigma.vercel.app/",
              "founder": {
                "@type": "Person",
                "@id": "https://sih-lake-sigma.vercel.app/founder#divya-shettar",
                "name": "Divya Shettar",
                "url": "https://sih-lake-sigma.vercel.app/founder"
              }
            }
          })
        }}
      />

      <div className="page-wrapper">
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <span style={{
            fontSize: '0.82rem', fontWeight: 800, color: '#087A55',
            textTransform: 'uppercase', letterSpacing: '1px',
            backgroundColor: '#E2F5EC', padding: '4px 12px', borderRadius: '9999px'
          }}>
            About the Platform
          </span>
          <h1 style={{
            fontSize: '2.4rem', fontWeight: 900, color: '#102333',
            marginTop: '0.6rem', marginBottom: '0.5rem'
          }}>
            About Awaaz Sarpanch
          </h1>
          <p style={{ fontSize: '1rem', color: '#5A6D7C', maxWidth: '680px', margin: '0 auto', lineHeight: 1.7 }}>
            Awaaz Sarpanch is a voice-first AI civic-governance platform{' '}
            <strong>founded by <Link to="/founder" style={{ color: '#087A55', fontWeight: 700, textDecoration: 'none' }}>Divya Shettar</Link></strong>.
            It bridges the communication gap between citizens and Gram Panchayat authorities through
            conversational AI, intelligent issue classification and transparent complaint tracking.
          </p>
        </div>

        {/* Six Pillars */}
        <section style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1.5rem', marginBottom: '3.5rem'
        }} aria-label="Platform pillars">
          {pillars.map((p, i) => {
            const Icon = p.icon;
            return (
              <div key={i} className="card" style={{ padding: '1.75rem' }}>
                <div style={{ color: '#087A55', marginBottom: '0.75rem' }} aria-hidden="true">
                  <Icon size={28} />
                </div>
                <h2 style={{
                  fontSize: '1.1rem', fontWeight: 800, color: '#102333',
                  marginBottom: '0.4rem'
                }}>
                  {p.title}
                </h2>
                <p style={{ fontSize: '0.88rem', color: '#5A6D7C', lineHeight: 1.65 }}>
                  {p.desc}
                </p>
              </div>
            );
          })}
        </section>

        {/* Citizen & Authority Experience */}
        <section style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '1.5rem', marginBottom: '3.5rem'
        }}>
          <div style={{
            backgroundColor: '#087A55', borderRadius: '16px', padding: '2rem', color: '#FFFFFF'
          }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '1rem' }}>
              Citizen Experience
            </h2>
            <ul style={{ paddingLeft: '1.25rem', lineHeight: 2, fontSize: '0.92rem', color: '#C8F0DF' }}>
              <li>Speak in your own language</li>
              <li>No forms, no English required</li>
              <li>Receive a unique Grievance ID</li>
              <li>Track your complaint in real time</li>
              <li>Verify resolution before the case closes</li>
            </ul>
          </div>
          <div style={{
            backgroundColor: '#102333', borderRadius: '16px', padding: '2rem', color: '#FFFFFF'
          }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '1rem' }}>
              Authority Experience
            </h2>
            <ul style={{ paddingLeft: '1.25rem', lineHeight: 2, fontSize: '0.92rem', color: '#C8D8E4' }}>
              <li>Receive pre-classified, structured complaints</li>
              <li>See priority and department assignment automatically</li>
              <li>Track resolution timelines on the dashboard</li>
              <li>View analytics on recurring issues by ward</li>
              <li>Build a transparent public record of actions taken</li>
            </ul>
          </div>
        </section>

        {/* Vision */}
        <section style={{
          backgroundColor: '#FFFFFF', border: '1px solid #DDE7E2',
          borderRadius: '16px', padding: '2rem 2.5rem',
          textAlign: 'center', marginBottom: '2.5rem'
        }}>
          <Award size={32} color="#087A55" style={{ marginBottom: '1rem' }} aria-hidden="true" />
          <h2 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#102333', marginBottom: '0.75rem' }}>
            Vision
          </h2>
          <p style={{
            fontSize: '0.95rem', color: '#5A6D7C',
            lineHeight: 1.75, maxWidth: '620px', margin: '0 auto'
          }}>
            To make grassroots governance genuinely participatory — where every citizen, regardless
            of language, literacy or location, can communicate with local authorities and hold them
            accountable through transparent, technology-enabled processes.
          </p>
        </section>

        {/* Internal links */}
        <div style={{ textAlign: 'center' }}>
          <p style={{ fontSize: '0.88rem', color: '#8A9CA8', marginBottom: '1rem' }}>
            Learn more about the people and technology behind Awaaz Sarpanch
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <Link to="/founder" style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
              backgroundColor: '#087A55', color: '#FFFFFF',
              padding: '0.6rem 1.25rem', borderRadius: '8px',
              textDecoration: 'none', fontWeight: 700, fontSize: '0.88rem'
            }}>
              Meet the Founder
            </Link>
            <Link to="/how-it-works" style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
              backgroundColor: '#FFFFFF', color: '#102333',
              border: '1px solid #DDE7E2',
              padding: '0.6rem 1.25rem', borderRadius: '8px',
              textDecoration: 'none', fontWeight: 700, fontSize: '0.88rem'
            }}>
              How It Works
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
