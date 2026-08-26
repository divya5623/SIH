import React from 'react';
import { Check, Clock, Circle } from 'lucide-react';

export default function Timeline({ steps = [] }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0', padding: '0.5rem 0' }}>
      {steps.map((item, index) => {
        const isLast = index === steps.length - 1;
        const isCompleted = item.completed;
        const isCurrent = !isCompleted && (index === 0 || steps[index - 1].completed);

        return (
          <div key={index} style={{ display: 'flex', gap: '1.25rem', position: 'relative' }}>
            {/* Timeline track line */}
            {!isLast && (
              <div
                style={{
                  position: 'absolute',
                  left: '15px',
                  top: '30px',
                  bottom: '-8px',
                  width: '2px',
                  backgroundColor: isCompleted ? '#087A55' : '#DDE7E2',
                  zIndex: 0
                }}
              />
            )}

            {/* Timeline icon */}
            <div
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                backgroundColor: isCompleted ? '#087A55' : isCurrent ? '#FEF3D6' : '#F0F4F2',
                border: `2px solid ${isCompleted ? '#087A55' : isCurrent ? '#F4A62A' : '#DDE7E2'}`,
                color: isCompleted ? '#FFFFFF' : isCurrent ? '#B46B00' : '#8A9CA8',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 1,
                flexShrink: 0,
                boxShadow: isCompleted ? '0 2px 6px rgba(8, 122, 85, 0.2)' : 'none'
              }}
            >
              {isCompleted ? (
                <Check size={16} strokeWidth={2.5} />
              ) : isCurrent ? (
                <Clock size={15} strokeWidth={2.5} />
              ) : (
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#8A9CA8' }} />
              )}
            </div>

            {/* Timeline text content */}
            <div style={{ paddingBottom: isLast ? '0' : '1.75rem', flex: 1 }}>
              <div style={{
                fontSize: '0.95rem',
                fontWeight: isCompleted || isCurrent ? 700 : 500,
                color: isCompleted ? '#102333' : isCurrent ? '#B46B00' : '#8A9CA8'
              }}>
                {item.step}
              </div>
              <div style={{
                fontSize: '0.8rem',
                color: isCompleted ? '#5A6D7C' : isCurrent ? '#5A6D7C' : '#A0B2BF',
                marginTop: '2px'
              }}>
                {item.date || (isCompleted ? 'Completed' : 'Pending')}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
