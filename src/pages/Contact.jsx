import React, { useState } from 'react';
import { Phone, Mail, MapPin, Send, MessageCircle, CheckCircle } from 'lucide-react';

export default function Contact() {
  const [sent, setSent] = useState(false);
  const [formData, setFormData] = useState({ name: '', phone: '', village: '', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div style={{ backgroundColor: '#F7FAF8', minHeight: 'calc(100vh - 80px)', paddingBottom: '4rem' }}>
      <div className="page-wrapper-sm">
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <span style={{ fontSize: '0.82rem', fontWeight: 800, color: '#087A55', textTransform: 'uppercase', letterSpacing: '1px', backgroundColor: '#E2F5EC', padding: '4px 12px', borderRadius: '9999px' }}>
            Support & Grievance Cell
          </span>
          <h1 style={{ fontSize: '2.2rem', fontWeight: 900, color: '#102333', marginTop: '0.6rem', marginBottom: '0.4rem' }}>
            Contact Us
          </h1>
          <p style={{ fontSize: '0.95rem', color: '#5A6D7C' }}>
            Reach our 24x7 Gram Panchayat citizen assistance helpline
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem', marginBottom: '2.5rem' }}>
          <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ width: '42px', height: '42px', borderRadius: '10px', backgroundColor: '#E8F5EF', color: '#087A55', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Phone size={20} />
            </div>
            <div>
              <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#8A9CA8' }}>Toll Free Helpline</div>
              <div style={{ fontSize: '1.05rem', fontWeight: 800, color: '#102333' }}>1800-123-4567</div>
            </div>
          </div>

          <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ width: '42px', height: '42px', borderRadius: '10px', backgroundColor: '#EFF5FB', color: '#2366B1', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Mail size={20} />
            </div>
            <div>
              <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#8A9CA8' }}>Email Assistance</div>
              <div style={{ fontSize: '0.95rem', fontWeight: 800, color: '#102333' }}>help@awaazsarpanch.gov.in</div>
            </div>
          </div>
        </div>

        <div className="card" style={{ padding: '2rem' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#102333', marginBottom: '1.25rem' }}>
            Send Inquiry to District Panchayat Cell
          </h2>

          {sent ? (
            <div style={{ textAlign: 'center', padding: '2rem 1rem', color: '#087A55' }}>
              <CheckCircle size={48} style={{ margin: '0 auto 1rem auto' }} />
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#102333' }}>Message Received!</h3>
              <p style={{ fontSize: '0.9rem', color: '#5A6D7C', marginTop: '4px' }}>Our field representative will contact your village ward within 24 hours.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#102333', marginBottom: '0.35rem' }}>Your Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Ramesh Kumar"
                    style={{ width: '100%', padding: '0.65rem 0.85rem', borderRadius: '8px', border: '1px solid #DDE7E2', outline: 'none' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#102333', marginBottom: '0.35rem' }}>Mobile Number</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="98765 43210"
                    style={{ width: '100%', padding: '0.65rem 0.85rem', borderRadius: '8px', border: '1px solid #DDE7E2', outline: 'none' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#102333', marginBottom: '0.35rem' }}>Gram Panchayat / Village</label>
                <input
                  type="text"
                  required
                  value={formData.village}
                  onChange={(e) => setFormData({ ...formData, village: e.target.value })}
                  placeholder="e.g. Kalyanpur Gram Panchayat, Ward 5"
                  style={{ width: '100%', padding: '0.65rem 0.85rem', borderRadius: '8px', border: '1px solid #DDE7E2', outline: 'none' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#102333', marginBottom: '0.35rem' }}>Message</label>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Describe your inquiry or requirement..."
                  style={{ width: '100%', padding: '0.65rem 0.85rem', borderRadius: '8px', border: '1px solid #DDE7E2', outline: 'none', resize: 'none' }}
                />
              </div>

              <button type="submit" className="btn btn-primary" style={{ alignSelf: 'flex-start', padding: '0.75rem 2rem' }}>
                <Send size={16} />
                SUBMIT MESSAGE
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
