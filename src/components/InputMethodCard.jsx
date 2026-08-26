import React from 'react';

export default function InputMethodCard({
  type,
  title,
  description,
  icon: Icon,
  colorScheme, // 'green', 'blue', 'purple'
  children,
  isSelected,
  onSelect,
  buttonText,
  onButtonClick
}) {
  const schemes = {
    green: {
      border: '#087A55',
      headerBg: '#EAF6F0',
      iconColor: '#087A55',
      iconBg: '#D5EBE1',
      btnClass: 'btn-primary',
      selectedBg: '#F3FAF6'
    },
    blue: {
      border: '#2366B1',
      headerBg: '#EFF5FB',
      iconColor: '#2366B1',
      iconBg: '#DBE9F8',
      btnClass: 'btn-dark',
      selectedBg: '#F4F8FC'
    },
    purple: {
      border: '#7150A8',
      headerBg: '#F5F0FC',
      iconColor: '#7150A8',
      iconBg: '#E9DEFA',
      btnClass: 'btn-dark',
      selectedBg: '#FAF6FE'
    }
  };

  const scheme = schemes[colorScheme] || schemes.green;

  return (
    <div
      onClick={onSelect}
      style={{
        backgroundColor: '#FFFFFF',
        border: `2px solid ${isSelected ? scheme.border : '#DDE7E2'}`,
        borderRadius: '16px',
        padding: '1.75rem 1.5rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        cursor: 'pointer',
        boxShadow: isSelected ? '0 8px 24px rgba(8, 122, 85, 0.12)' : '0 2px 8px rgba(16, 35, 51, 0.04)',
        transition: 'all 0.25s ease',
        position: 'relative',
        height: '100%'
      }}
    >
      {/* Icon Badge */}
      <div
        style={{
          width: '56px',
          height: '56px',
          borderRadius: '14px',
          backgroundColor: scheme.iconBg,
          color: scheme.iconColor,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '1rem'
        }}
      >
        <Icon size={28} strokeWidth={2.2} />
      </div>

      {/* Title */}
      <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#102333', marginBottom: '0.4rem', letterSpacing: '0.5px' }}>
        {title}
      </h3>

      {/* Description */}
      <p style={{ fontSize: '0.88rem', color: '#5A6D7C', marginBottom: '1.25rem', lineHeight: 1.4 }}>
        {description}
      </p>

      {/* Custom Body / Visual preview */}
      <div style={{ width: '100%', marginBottom: '1.5rem', flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {children}
      </div>

      {/* Action Button */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          if (onButtonClick) onButtonClick();
          if (onSelect) onSelect();
        }}
        className={`btn ${scheme.btnClass} btn-full`}
        style={{
          backgroundColor: colorScheme === 'green' ? '#087A55' : (colorScheme === 'blue' ? '#2366B1' : '#7150A8'),
          borderColor: 'transparent',
          fontSize: '0.85rem'
        }}
      >
        {buttonText}
      </button>
    </div>
  );
}
