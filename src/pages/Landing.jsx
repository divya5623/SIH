import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Mic, 
  Cpu, 
  Building2, 
  TrendingUp, 
  CheckCircle, 
  ArrowRight, 
  ShieldCheck, 
  Smartphone, 
  Radio, 
  Sparkles,
  Users
} from 'lucide-react';
import VillageIllustration from '../components/VillageIllustration';
import { landingStats, featureItems } from '../data/mockData';

export default function Landing() {
  const featureIcons = [Mic, Cpu, Building2, TrendingUp, CheckCircle];

  return (
    <div className="landing-page" style={{ backgroundColor: '#F7FAF8', minHeight: '100vh', paddingBottom: '4rem' }}>
      <div className="page-wrapper-lg">
        {/* HERO SECTION */}
        <section style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '3rem',
          alignItems: 'center',
          padding: '2.5rem 0 3.5rem 0'
        }}>
          {/* Left Hero Column */}
          <div>
            {/* Small Green Badge */}
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              backgroundColor: '#E2F5EC',
              color: '#087A55',
              padding: '0.4rem 0.9rem',
              borderRadius: '9999px',
              fontSize: '0.82rem',
              fontWeight: 700,
              letterSpacing: '0.3px',
              marginBottom: '1.25rem',
              border: '1px solid #C4EBD8'
            }}>
              <Sparkles size={14} />
              <span>Voice-first • AI-Powered • Citizen-Centric</span>
            </div>

            {/* Large Heading */}
            <h1 style={{
              fontSize: 'clamp(2.5rem, 5vw, 3.75rem)',
              fontWeight: 900,
              lineHeight: 1.1,
              marginBottom: '1rem',
              letterSpacing: '-0.5px'
            }}>
              <span style={{ color: '#087A55' }}>AWAAZ </span>
              <span style={{ color: '#102333' }}>SARPANCH</span>
            </h1>

            {/* Subtitle */}
            <h2 style={{
              fontSize: '1.28rem',
              fontWeight: 700,
              color: '#102333',
              marginBottom: '0.85rem',
              lineHeight: 1.3
            }}>
              "Citizens Speak. AI Understands. Authorities Act."
            </h2>

            {/* Description */}
            <p style={{
              fontSize: '1.05rem',
              color: '#5A6D7C',
              lineHeight: 1.6,
              marginBottom: '2rem',
              maxWidth: '540px'
            }}>
              Voice-first AI for accessible, transparent and accountable local governance. Bridging the gap between rural citizens and Gram Panchayat authorities through conversational intelligence.
            </p>

            {/* Hero Action Buttons */}
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '1rem',
              alignItems: 'center'
            }}>
              <Link
                to="/report"
                className="btn btn-primary btn-lg"
                style={{
                  boxShadow: '0 4px 16px rgba(8, 122, 85, 0.28)',
                  textTransform: 'uppercase',
                  fontWeight: 700,
                  fontSize: '0.92rem'
                }}
              >
                <Mic size={18} />
                FILE A COMPLAINT
              </Link>

              <Link
                to="/admin"
                className="btn btn-dark btn-lg"
                style={{
                  boxShadow: '0 4px 16px rgba(16, 35, 51, 0.25)',
                  textTransform: 'uppercase',
                  fontWeight: 700,
                  fontSize: '0.92rem'
                }}
              >
                <Building2 size={18} />
                AI / AUTHORITY PORTAL
              </Link>

              <Link
                to="/how-it-works"
                className="btn btn-outline btn-lg"
                style={{
                  borderColor: '#DDE7E2',
                  backgroundColor: '#FFFFFF',
                  textTransform: 'uppercase',
                  fontWeight: 600,
                  fontSize: '0.88rem'
                }}
              >
                SEE HOW IT WORKS
              </Link>
            </div>
          </div>

          {/* Right Hero Column: Indian Village Scene */}
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <VillageIllustration />
          </div>
        </section>

        {/* STATISTICS CARD SECTION */}
        <section style={{
          backgroundColor: '#FFFFFF',
          border: '1px solid #DDE7E2',
          borderRadius: '18px',
          padding: '2rem 2.5rem',
          boxShadow: '0 6px 20px rgba(16, 35, 51, 0.05)',
          marginBottom: '3.5rem'
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '2rem',
            textAlign: 'center'
          }}>
            {landingStats.map((stat, idx) => (
              <div key={idx} style={{ position: 'relative' }}>
                <div style={{
                  fontSize: '2.4rem',
                  fontWeight: 900,
                  color: '#087A55',
                  lineHeight: 1.1,
                  marginBottom: '0.35rem',
                  fontFamily: 'Inter, sans-serif'
                }}>
                  {stat.value}
                </div>
                <div style={{
                  fontSize: '0.95rem',
                  fontWeight: 600,
                  color: '#102333'
                }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* FIVE FEATURE ITEMS SECTION */}
        <section style={{ marginBottom: '2rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <h3 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#102333', marginBottom: '0.4rem' }}>
              How Awaaz Sarpanch Works
            </h3>
            <p style={{ fontSize: '0.95rem', color: '#5A6D7C' }}>
              5 simple steps from voice recording to verified local resolution
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1.25rem'
          }}>
            {featureItems.map((item, index) => {
              const Icon = featureIcons[index];
              return (
                <div
                  key={index}
                  style={{
                    backgroundColor: '#FFFFFF',
                    border: '1px solid #DDE7E2',
                    borderRadius: '14px',
                    padding: '1.75rem 1.25rem',
                    textAlign: 'center',
                    boxShadow: '0 2px 8px rgba(16, 35, 51, 0.03)',
                    transition: 'all 0.2s ease',
                    position: 'relative'
                  }}
                  className="card-hover"
                >
                  {/* Step Number Tag */}
                  <div style={{
                    position: 'absolute',
                    top: '12px',
                    right: '12px',
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    color: '#8A9CA8',
                    backgroundColor: '#F3F6F5',
                    padding: '2px 8px',
                    borderRadius: '9999px'
                  }}>
                    {item.step}
                  </div>

                  {/* Icon */}
                  <div style={{
                    width: '50px',
                    height: '50px',
                    borderRadius: '12px',
                    backgroundColor: '#E8F5EF',
                    color: '#087A55',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 1.15rem auto'
                  }}>
                    <Icon size={24} strokeWidth={2.2} />
                  </div>

                  {/* Feature Title */}
                  <h4 style={{
                    fontSize: '1.05rem',
                    fontWeight: 800,
                    color: '#102333',
                    marginBottom: '0.35rem'
                  }}>
                    {item.title}
                  </h4>

                  {/* Feature Description */}
                  <p style={{
                    fontSize: '0.86rem',
                    color: '#5A6D7C',
                    fontWeight: 500
                  }}>
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}
