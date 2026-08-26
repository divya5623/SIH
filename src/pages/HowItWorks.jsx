import React from 'react';
import { Link } from 'react-router-dom';
import { Mic, Cpu, Building2, TrendingUp, CheckCircle, ArrowRight, Shield } from 'lucide-react';
import VillageIllustration from '../components/VillageIllustration';

export default function HowItWorks() {
  const steps = [
    {
      num: "01",
      title: "Citizens Speak or Capture",
      desc: "Citizens tap one button to record a voice note in their native dialect or snap a photo of damaged civic infrastructure.",
      icon: Mic
    },
    {
      num: "02",
      title: "AI Understands & Classifies",
      desc: "Multilingual Indian voice models automatically extract the issue type, urgency level, category, and exact GPS coordinates.",
      icon: Cpu
    },
    {
      num: "03",
      title: "Authority Assigned Automatically",
      desc: "The grievance is instantly assigned to the responsible Gram Panchayat department (Water, Electrical, Sanitation, PWD).",
      icon: Building2
    },
    {
      num: "04",
      title: "Tracked in Real-Time",
      desc: "Transparent timeline tracking keeps both citizens and Panchayat leaders synchronized on repair status.",
      icon: TrendingUp
    },
    {
      num: "05",
      title: "Citizen Verifies Resolution",
      desc: "No complaint is marked closed until the citizen confirms the work has been completed satisfactorily on the ground.",
      icon: CheckCircle
    }
  ];

  return (
    <div style={{ backgroundColor: '#F7FAF8', minHeight: 'calc(100vh - 80px)', paddingBottom: '4rem' }}>
      <div className="page-wrapper">
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <span style={{ fontSize: '0.82rem', fontWeight: 800, color: '#087A55', textTransform: 'uppercase', letterSpacing: '1px', backgroundColor: '#E2F5EC', padding: '4px 12px', borderRadius: '9999px' }}>
            Process Overview
          </span>
          <h1 style={{ fontSize: '2.4rem', fontWeight: 900, color: '#102333', marginTop: '0.6rem', marginBottom: '0.5rem' }}>
            How Awaaz Sarpanch Works
          </h1>
          <p style={{ fontSize: '1rem', color: '#5A6D7C', maxWidth: '600px', margin: '0 auto' }}>
            Empowering rural communities with intuitive, barrier-free voice AI for rapid civic resolution.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.75rem', marginBottom: '3rem' }}>
          {steps.map((s, idx) => {
            const Icon = s.icon;
            return (
              <div key={idx} className="card card-hover" style={{ position: 'relative' }}>
                <div style={{
                  position: 'absolute',
                  top: '16px',
                  right: '16px',
                  fontSize: '1.25rem',
                  fontWeight: 900,
                  color: '#CDE5DA'
                }}>
                  {s.num}
                </div>
                <div style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '12px',
                  backgroundColor: '#E8F5EF',
                  color: '#087A55',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1rem'
                }}>
                  <Icon size={24} />
                </div>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#102333', marginBottom: '0.5rem' }}>
                  {s.title}
                </h3>
                <p style={{ fontSize: '0.88rem', color: '#5A6D7C', lineHeight: 1.5 }}>
                  {s.desc}
                </p>
              </div>
            );
          })}
        </div>

        <div style={{
          backgroundColor: '#FFFFFF',
          border: '1px solid #DDE7E2',
          borderRadius: '16px',
          padding: '2.5rem',
          textAlign: 'center',
          boxShadow: '0 4px 16px rgba(16, 35, 51, 0.04)'
        }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#102333', marginBottom: '0.5rem' }}>
            Ready to file a grievance in your village?
          </h2>
          <p style={{ fontSize: '0.92rem', color: '#5A6D7C', marginBottom: '1.5rem' }}>
            No typing required. Simply speak in your native language.
          </p>
          <Link to="/report" className="btn btn-primary btn-lg">
            <Mic size={18} />
            FILE A COMPLAINT NOW
          </Link>
        </div>
      </div>
    </div>
  );
}
