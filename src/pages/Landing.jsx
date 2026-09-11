import React from 'react';
import { Link } from 'react-router-dom';
import {
  Mic,
  Cpu,
  Building2,
  TrendingUp,
  CheckCircle,
  ArrowRight,
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { LinkedinIcon, GithubIcon } from '../components/SocialIcons';
import VillageIllustration from '../components/VillageIllustration';
import { landingStats, featureItems } from '../data/mockData';

export default function Landing() {
  const featureIcons = [Mic, Cpu, Building2, TrendingUp, CheckCircle];

  return (
    <div className="landing-page" style={{ backgroundColor: '#F7FAF8', minHeight: '100vh', paddingBottom: '4rem' }}>
      <div className="page-wrapper-lg">

        {/* ── HERO SECTION ── */}
        <section style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '3rem',
          alignItems: 'center',
          padding: '2.5rem 0 3.5rem 0'
        }}>
          {/* Left: text */}
          <div>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              backgroundColor: '#E2F5EC', color: '#087A55',
              padding: '0.4rem 0.9rem', borderRadius: '9999px',
              fontSize: '0.82rem', fontWeight: 700, letterSpacing: '0.3px',
              marginBottom: '1.25rem', border: '1px solid #C4EBD8'
            }}>
              <Sparkles size={14} aria-hidden="true" />
              <span>Voice-first · AI-Powered · Citizen-Centric</span>
            </div>

            <h1 style={{
              fontSize: 'clamp(2.5rem, 5vw, 3.75rem)', fontWeight: 900,
              lineHeight: 1.1, marginBottom: '1rem', letterSpacing: '-0.5px'
            }}>
              <span style={{ color: '#087A55' }}>AWAAZ </span>
              <span style={{ color: '#102333' }}>SARPANCH</span>
            </h1>

            <h2 style={{
              fontSize: '1.28rem', fontWeight: 700, color: '#102333',
              marginBottom: '0.85rem', lineHeight: 1.3
            }}>
              "Citizens Speak. AI Understands. Authorities Act."
            </h2>

            <p style={{
              fontSize: '1.05rem', color: '#5A6D7C', lineHeight: 1.6,
              marginBottom: '2rem', maxWidth: '540px'
            }}>
              Voice-first AI for accessible, transparent and accountable local governance.
              Bridging the gap between rural citizens and Gram Panchayat authorities through
              conversational intelligence.{' '}
              <Link to="/founder" style={{ color: '#087A55', fontWeight: 700, textDecoration: 'none' }}>
                Founded by Divya Shettar.
              </Link>
            </p>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center' }}>
              <Link
                to="/report"
                className="btn btn-primary btn-lg"
                style={{ boxShadow: '0 4px 16px rgba(8,122,85,0.28)', textTransform: 'uppercase', fontWeight: 700, fontSize: '0.92rem' }}
                aria-label="File a complaint using voice or text"
              >
                <Mic size={18} aria-hidden="true" /> FILE A COMPLAINT
              </Link>
              <Link
                to="/admin"
                className="btn btn-dark btn-lg"
                style={{ boxShadow: '0 4px 16px rgba(16,35,51,0.25)', textTransform: 'uppercase', fontWeight: 700, fontSize: '0.92rem' }}
                aria-label="Open the authority admin portal"
              >
                <Building2 size={18} aria-hidden="true" /> AI / AUTHORITY PORTAL
              </Link>
              <Link
                to="/how-it-works"
                className="btn btn-outline btn-lg"
                style={{ borderColor: '#DDE7E2', backgroundColor: '#FFFFFF', textTransform: 'uppercase', fontWeight: 600, fontSize: '0.88rem' }}
              >
                SEE HOW IT WORKS
              </Link>
            </div>
          </div>

          {/* Right: illustration */}
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <VillageIllustration />
          </div>
        </section>

        {/* ── STATISTICS — clearly labelled as prototype data ── */}
        <section style={{
          backgroundColor: '#FFFFFF', border: '1px solid #DDE7E2',
          borderRadius: '18px', padding: '2rem 2.5rem',
          boxShadow: '0 6px 20px rgba(16,35,51,0.05)', marginBottom: '3.5rem'
        }}>
          <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
            <span style={{
              display: 'inline-block', backgroundColor: '#FFF8E7', color: '#92610A',
              border: '1px solid #F4DDA0', borderRadius: '9999px',
              fontSize: '0.75rem', fontWeight: 700,
              padding: '0.25rem 0.85rem', letterSpacing: '0.4px'
            }}>
              ⚠ Prototype / Demo Data — not real-world statistics
            </span>
          </div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '2rem', textAlign: 'center'
          }}>
            {landingStats.map((stat, idx) => (
              <div key={idx}>
                <div style={{
                  fontSize: '2.4rem', fontWeight: 900, color: '#087A55',
                  lineHeight: 1.1, marginBottom: '0.35rem'
                }}>{stat.value}</div>
                <div style={{ fontSize: '0.95rem', fontWeight: 600, color: '#102333' }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── HOW IT WORKS ── */}
        <section style={{ marginBottom: '3.5rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#102333', marginBottom: '0.4rem' }}>
              How Awaaz Sarpanch Works
            </h2>
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
                <div key={index} className="card-hover" style={{
                  backgroundColor: '#FFFFFF', border: '1px solid #DDE7E2',
                  borderRadius: '14px', padding: '1.75rem 1.25rem', textAlign: 'center',
                  boxShadow: '0 2px 8px rgba(16,35,51,0.03)',
                  transition: 'all 0.2s ease', position: 'relative'
                }}>
                  <div style={{
                    position: 'absolute', top: '12px', right: '12px',
                    fontSize: '0.72rem', fontWeight: 700, color: '#8A9CA8',
                    backgroundColor: '#F3F6F5', padding: '2px 8px', borderRadius: '9999px'
                  }} aria-hidden="true">{item.step}</div>
                  <div style={{
                    width: '50px', height: '50px', borderRadius: '12px',
                    backgroundColor: '#E8F5EF', color: '#087A55',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    margin: '0 auto 1.15rem auto'
                  }} aria-hidden="true">
                    <Icon size={24} strokeWidth={2.2} />
                  </div>
                  <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#102333', marginBottom: '0.35rem' }}>
                    {item.title}
                  </h3>
                  <p style={{ fontSize: '0.86rem', color: '#5A6D7C', fontWeight: 500 }}>
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* ── MEET THE FOUNDER SECTION ── */}
        <section
          id="founder"
          aria-labelledby="founder-heading"
          style={{
            backgroundColor: '#FFFFFF', border: '1px solid #DDE7E2',
            borderRadius: '20px', padding: '2.5rem',
            boxShadow: '0 4px 20px rgba(16,35,51,0.05)', marginBottom: '2rem'
          }}
        >
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <span style={{
              display: 'inline-block', backgroundColor: '#E2F5EC', color: '#087A55',
              padding: '0.35rem 0.9rem', borderRadius: '9999px',
              fontSize: '0.8rem', fontWeight: 700,
              border: '1px solid #C4EBD8', marginBottom: '0.75rem'
            }}>
              Meet the Founder
            </span>
            <h2 id="founder-heading" style={{
              fontSize: '1.6rem', fontWeight: 800, color: '#102333', marginBottom: '0.3rem'
            }}>
              Divya Shettar
            </h2>
            <p style={{ fontSize: '0.95rem', color: '#087A55', fontWeight: 700 }}>
              Founder &amp; Project Lead — Awaaz Sarpanch
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '2.5rem', alignItems: 'center'
          }}>
            {/* Avatar + social links */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.25rem' }}>
              <div
                style={{
                  width: '110px', height: '110px', borderRadius: '50%',
                  backgroundColor: '#087A55',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '2.5rem', fontWeight: 900, color: '#FFFFFF', letterSpacing: '-1px'
                }}
                aria-label="Divya Shettar — initials DS"
              >
                DS
              </div>
              <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                <a
                  href="https://linkedin.com/in/divya-shettar-258078370"
                  target="_blank" rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: '0.45rem',
                    backgroundColor: '#0A66C2', color: '#FFFFFF',
                    padding: '0.5rem 1rem', borderRadius: '7px',
                    textDecoration: 'none', fontWeight: 700, fontSize: '0.84rem'
                  }}
                  aria-label="Divya Shettar on LinkedIn (opens in new tab)"
                >
                  <LinkedinIcon size={15} aria-hidden="true" /> LinkedIn
                </a>
                <a
                  href="https://github.com/divya5623"
                  target="_blank" rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: '0.45rem',
                    backgroundColor: '#24292F', color: '#FFFFFF',
                    padding: '0.5rem 1rem', borderRadius: '7px',
                    textDecoration: 'none', fontWeight: 700, fontSize: '0.84rem'
                  }}
                  aria-label="Divya Shettar on GitHub (opens in new tab)"
                >
                  <GithubIcon size={15} aria-hidden="true" /> GitHub
                </a>
                <a
                  href="https://sih-lake-sigma.vercel.app/"
                  target="_blank" rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: '0.45rem',
                    backgroundColor: '#F7FAF8', color: '#087A55',
                    border: '1px solid #C4EBD8',
                    padding: '0.5rem 1rem', borderRadius: '7px',
                    textDecoration: 'none', fontWeight: 700, fontSize: '0.84rem'
                  }}
                  aria-label="Awaaz Sarpanch live project demo"
                >
                  <ExternalLink size={15} aria-hidden="true" /> Project Demo
                </a>
              </div>
            </div>

            {/* Bio */}
            <div>
              <p style={{
                fontSize: '1rem', color: '#5A6D7C',
                lineHeight: 1.75, marginBottom: '1.25rem',
                fontStyle: 'italic'
              }}>
                "Awaaz Sarpanch is a voice-first AI civic-governance platform founded by Divya Shettar
                to bridge the communication gap between citizens and Gram Panchayat authorities.
                The platform combines conversational AI, intelligent issue classification, authority
                routing and transparent complaint tracking to make local governance more accessible,
                accountable and citizen-centric."
              </p>
              <Link
                to="/founder"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '0.45rem',
                  color: '#087A55', fontWeight: 700, fontSize: '0.9rem',
                  textDecoration: 'none',
                  borderBottom: '2px solid #C4EBD8', paddingBottom: '2px'
                }}
                aria-label="Learn more about Divya Shettar, Founder of Awaaz Sarpanch"
              >
                Learn more about the founder <ArrowRight size={15} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
