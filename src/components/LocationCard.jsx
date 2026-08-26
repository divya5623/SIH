import React from 'react';
import { MapPin } from 'lucide-react';

export default function LocationCard({ enabled = true, onToggle, locationText = "12.8797° N, 74.8509° E • Ward 5, Near Govt School" }) {
  return (
    <div
      style={{
        backgroundColor: '#FFFFFF',
        border: '1px solid #DDE7E2',
        borderRadius: '14px',
        padding: '1.15rem 1.5rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        boxShadow: '0 2px 6px rgba(16, 35, 51, 0.03)',
        width: '100%',
        margin: '1.5rem 0'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <div
          style={{
            width: '42px',
            height: '42px',
            borderRadius: '10px',
            backgroundColor: '#E8F5EF',
            color: '#087A55',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0
          }}
        >
          <MapPin size={22} strokeWidth={2.2} />
        </div>
        <div>
          <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#102333' }}>
            Use My Current Location
          </div>
          <div style={{ fontSize: '0.82rem', color: '#5A6D7C', marginTop: '2px' }}>
            {locationText}
          </div>
        </div>
      </div>

      {/* Switch Toggle */}
      <label
        style={{
          position: 'relative',
          display: 'inline-block',
          width: '48px',
          height: '26px',
          cursor: 'pointer',
          flexShrink: 0
        }}
      >
        <input
          type="checkbox"
          checked={enabled}
          onChange={(e) => onToggle && onToggle(e.target.checked)}
          style={{ opacity: 0, width: 0, height: 0 }}
        />
        <span
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: enabled ? '#087A55' : '#CBD5E1',
            borderRadius: '26px',
            transition: '0.2s',
          }}
        >
          <span
            style={{
              position: 'absolute',
              content: '""',
              height: '20px',
              width: '20px',
              left: enabled ? '24px' : '4px',
              bottom: '3px',
              backgroundColor: 'white',
              borderRadius: '50%',
              transition: '0.2s',
              boxShadow: '0 1px 3px rgba(0,0,0,0.2)'
            }}
          />
        </span>
      </label>
    </div>
  );
}
