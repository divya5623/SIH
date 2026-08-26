import React, { useState, useEffect } from 'react';
import { Mic, Volume2, Play, Pause } from 'lucide-react';

export default function AudioWaveform({ isRecording = false, duration = "00:06", playable = true }) {
  const [isPlaying, setIsPlaying] = useState(false);

  const bars = [
    18, 32, 45, 60, 85, 95, 70, 48, 88, 92, 65, 40, 75, 90, 82, 55, 30, 68, 85, 50,
    35, 78, 95, 65, 42, 85, 60, 45, 72, 88, 55, 30, 20
  ];

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '1rem',
      backgroundColor: '#F3F9F6',
      border: '1px solid #CDE5DA',
      padding: '0.85rem 1.25rem',
      borderRadius: '12px',
      width: '100%'
    }}>
      {playable && (
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          type="button"
          style={{
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            backgroundColor: '#087A55',
            color: '#fff',
            border: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            flexShrink: 0
          }}
          aria-label={isPlaying ? "Pause audio" : "Play audio"}
        >
          {isPlaying ? <Pause size={18} /> : <Play size={18} style={{ marginLeft: '2px' }} />}
        </button>
      )}

      {isRecording && (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.4rem',
          color: '#E94B4B',
          fontWeight: 700,
          fontSize: '0.85rem',
          flexShrink: 0
        }}>
          <span style={{
            width: '10px',
            height: '10px',
            borderRadius: '50%',
            backgroundColor: '#E94B4B',
            display: 'inline-block',
            animation: 'pulseWave 1s infinite'
          }} />
          REC
        </div>
      )}

      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '3px',
        flex: 1,
        height: '38px',
        overflow: 'hidden'
      }}>
        {bars.map((height, idx) => (
          <span
            key={idx}
            style={{
              width: '3px',
              height: isPlaying || isRecording ? `${Math.max(15, (height * (idx % 2 === 0 ? 1 : 0.85)))}%` : `${height * 0.7}%`,
              backgroundColor: isRecording ? '#087A55' : (isPlaying ? '#087A55' : '#87BCA9'),
              borderRadius: '3px',
              transition: 'height 0.15s ease, background-color 0.2s ease',
              display: 'inline-block'
            }}
          />
        ))}
      </div>

      <div style={{
        fontSize: '0.88rem',
        fontWeight: 600,
        color: '#07563F',
        fontVariantNumeric: 'tabular-nums',
        flexShrink: 0
      }}>
        {duration}
      </div>
    </div>
  );
}
