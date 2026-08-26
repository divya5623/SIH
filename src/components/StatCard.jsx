import React from 'react';

export default function StatCard({ value, label, icon: Icon, color = "#087A55", trend, subtext }) {
  return (
    <div style={{
      backgroundColor: '#FFFFFF',
      border: '1px solid #DDE7E2',
      borderRadius: '12px',
      padding: '1.35rem 1.5rem',
      display: 'flex',
      flexDirection: 'column',
      boxShadow: '0 2px 8px rgba(16, 35, 51, 0.04)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.6rem' }}>
        <span style={{ fontSize: '0.88rem', fontWeight: 600, color: '#5A6D7C' }}>
          {label}
        </span>
        {Icon && (
          <div style={{
            width: '36px',
            height: '36px',
            borderRadius: '8px',
            backgroundColor: `${color}15`,
            color: color,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Icon size={18} />
          </div>
        )}
      </div>

      <div style={{ fontSize: '1.85rem', fontWeight: 800, color: '#102333', lineHeight: 1.1 }}>
        {value}
      </div>

      {(trend || subtext) && (
        <div style={{ fontSize: '0.78rem', color: trend ? (trend.startsWith('+') ? '#087A55' : '#E94B4B') : '#8A9CA8', marginTop: '0.4rem', fontWeight: 500 }}>
          {trend && <span style={{ fontWeight: 700, marginRight: '4px' }}>{trend}</span>}
          {subtext}
        </div>
      )}
    </div>
  );
}
