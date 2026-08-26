import React from 'react';
import { Shield, Target, Users, Award, Heart } from 'lucide-react';
import VillageIllustration from '../components/VillageIllustration';

export default function AboutUs() {
  return (
    <div style={{ backgroundColor: '#F7FAF8', minHeight: 'calc(100vh - 80px)', paddingBottom: '4rem' }}>
      <div className="page-wrapper">
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <span style={{ fontSize: '0.82rem', fontWeight: 800, color: '#087A55', textTransform: 'uppercase', letterSpacing: '1px', backgroundColor: '#E2F5EC', padding: '4px 12px', borderRadius: '9999px' }}>
            Our Mission
          </span>
          <h1 style={{ fontSize: '2.4rem', fontWeight: 900, color: '#102333', marginTop: '0.6rem', marginBottom: '0.5rem' }}>
            About AWAAZ SARPANCH
          </h1>
          <p style={{ fontSize: '1rem', color: '#5A6D7C', maxWidth: '640px', margin: '0 auto' }}>
            Transforming Indian local governance through conversational voice intelligence and accountable civic delivery.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '3rem',
          alignItems: 'center',
          marginBottom: '3rem'
        }}>
          <div>
            <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#102333', marginBottom: '1rem' }}>
              Bridging the Voice Gap in Rural Governance
            </h2>
            <p style={{ fontSize: '0.95rem', color: '#5A6D7C', lineHeight: 1.6, marginBottom: '1rem' }}>
              More than 65% of India lives in rural areas governed by Gram Panchayats. While smartphone penetration is at an all-time high, text-heavy government portals create friction for citizens speaking diverse local dialects.
            </p>
            <p style={{ fontSize: '0.95rem', color: '#5A6D7C', lineHeight: 1.6 }}>
              <strong>AWAAZ SARPANCH</strong> was built with a simple ethos: <em>"If a citizen can speak, they can demand governance."</em> By turning natural spoken complaints into structured, actionable department work orders, we empower Panchayats to act decisively.
            </p>
          </div>

          <div>
            <VillageIllustration />
          </div>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '1.5rem'
        }}>
          <div className="card">
            <div style={{ color: '#087A55', marginBottom: '0.75rem' }}><Target size={28} /></div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#102333', marginBottom: '0.3rem' }}>Zero Literacy Barrier</h3>
            <p style={{ fontSize: '0.85rem', color: '#5A6D7C' }}>Voice-first recognition ensures anyone can report issues without typing.</p>
          </div>

          <div className="card">
            <div style={{ color: '#087A55', marginBottom: '0.75rem' }}><Shield size={28} /></div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#102333', marginBottom: '0.3rem' }}>100% Transparency</h3>
            <p style={{ fontSize: '0.85rem', color: '#5A6D7C' }}>Publicly auditable timelines and citizen resolution sign-offs.</p>
          </div>

          <div className="card">
            <div style={{ color: '#087A55', marginBottom: '0.75rem' }}><Award size={28} /></div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#102333', marginBottom: '0.3rem' }}>AI-Driven Priority</h3>
            <p style={{ fontSize: '0.85rem', color: '#5A6D7C' }}>Critical hazards automatically prioritized for same-day inspection.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
