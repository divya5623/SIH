import React from 'react';
import { Link } from 'react-router-dom';
import { Mic, Globe, Shield, Sparkles, MapPin, BarChart3, BellRing, Smartphone, CheckCircle } from 'lucide-react';

export default function Features() {
  const featuresList = [
    {
      title: "Multilingual Indian Voice AI",
      desc: "Supports 12+ regional languages including Hindi, Marathi, Bengali, Telugu, Kannada, Gujarati, and local dialects.",
      icon: Globe
    },
    {
      title: "Auto-GPS & Geographic Pinpointing",
      desc: "Automatically extracts landmark coordinates and pins complaints to specific village wards and street poles.",
      icon: MapPin
    },
    {
      title: "Systemic Cluster Detection",
      desc: "Identifies recurring pipeline breaches or fused lighting corridors before they escalate into village-wide crises.",
      icon: Sparkles
    },
    {
      title: "Direct Department Routing",
      desc: "Eliminates red tape by forwarding issues directly to junior engineers and Panchayat water/sanitation supervisors.",
      icon: Shield
    },
    {
      title: "Closed-Loop Citizen Verification",
      desc: "Ensures genuine grassroots accountability by requiring citizen sign-off before marking any task completed.",
      icon: CheckCircle
    },
    {
      title: "Real-time Panchayat Dashboard",
      desc: "Full visibility for Sarpanches, Gram Sevaks, and Block Development Officers with live heatmaps and trend graphs.",
      icon: BarChart3
    }
  ];

  return (
    <div style={{ backgroundColor: '#F7FAF8', minHeight: 'calc(100vh - 80px)', paddingBottom: '4rem' }}>
      <div className="page-wrapper">
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <span style={{ fontSize: '0.82rem', fontWeight: 800, color: '#087A55', textTransform: 'uppercase', letterSpacing: '1px', backgroundColor: '#E2F5EC', padding: '4px 12px', borderRadius: '9999px' }}>
            Core Capabilities
          </span>
          <h1 style={{ fontSize: '2.4rem', fontWeight: 900, color: '#102333', marginTop: '0.6rem', marginBottom: '0.5rem' }}>
            Built for Bharat, Engineered for Precision
          </h1>
          <p style={{ fontSize: '1rem', color: '#5A6D7C', maxWidth: '640px', margin: '0 auto' }}>
            Every feature in AWAAZ SARPANCH is designed to remove digital literacy barriers and ensure civic accountability.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
          {featuresList.map((f, idx) => {
            const Icon = f.icon;
            return (
              <div key={idx} className="card card-hover">
                <div style={{
                  width: '46px',
                  height: '46px',
                  borderRadius: '12px',
                  backgroundColor: '#E8F5EF',
                  color: '#087A55',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1.25rem'
                }}>
                  <Icon size={22} strokeWidth={2.2} />
                </div>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#102333', marginBottom: '0.4rem' }}>
                  {f.title}
                </h3>
                <p style={{ fontSize: '0.88rem', color: '#5A6D7C', lineHeight: 1.5 }}>
                  {f.desc}
                </p>
              </div>
            );
          })}
        </div>

        <div style={{ textAlign: 'center' }}>
          <Link to="/report" className="btn btn-primary btn-lg">
            Try Voice Reporting
          </Link>
        </div>
      </div>
    </div>
  );
}
