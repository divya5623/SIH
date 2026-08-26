import React from 'react';

export default function VillageIllustration({ className = "", style = {} }) {
  return (
    <div className={`village-illustration-container ${className}`} style={{ width: '100%', maxWidth: '520px', margin: '0 auto', ...style }}>
      <svg
        viewBox="0 0 540 380"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: '100%', height: 'auto', borderRadius: '16px', filter: 'drop-shadow(0 6px 16px rgba(8, 122, 85, 0.08))' }}
      >
        <defs>
          <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#E6F4EA" />
            <stop offset="60%" stopColor="#F5FAF6" />
            <stop offset="100%" stopColor="#FFF9E6" />
          </linearGradient>
          <linearGradient id="sunGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FFA043" />
            <stop offset="100%" stopColor="#FFC837" />
          </linearGradient>
          <linearGradient id="treeGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0A8F64" />
            <stop offset="100%" stopColor="#06543C" />
          </linearGradient>
          <linearGradient id="treeLight" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1DB37B" />
            <stop offset="100%" stopColor="#0D7F57" />
          </linearGradient>
          <linearGradient id="hillGrad1" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#CFE7DA" />
            <stop offset="100%" stopColor="#E2F0E8" />
          </linearGradient>
          <linearGradient id="hillGrad2" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#B3DCBE" />
            <stop offset="100%" stopColor="#D5EDDC" />
          </linearGradient>
          <linearGradient id="pathGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#E3C49B" />
            <stop offset="100%" stopColor="#D4AE7A" />
          </linearGradient>
          <linearGradient id="houseRoof1" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#DE5A38" />
            <stop offset="100%" stopColor="#B53A1B" />
          </linearGradient>
          <linearGradient id="houseRoof2" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#E67E22" />
            <stop offset="100%" stopColor="#C0392B" />
          </linearGradient>
        </defs>

        {/* Sky Background */}
        <rect width="540" height="380" rx="16" fill="url(#skyGrad)" />

        {/* Warm Sun */}
        <circle cx="430" cy="75" r="34" fill="url(#sunGrad)" opacity="0.9" />
        <circle cx="430" cy="75" r="48" fill="#FFA043" opacity="0.18" />

        {/* Soft Distant Hills */}
        <path d="M-20 220 Q120 140 260 200 T560 170 L560 380 L-20 380 Z" fill="url(#hillGrad1)" />
        <path d="M-20 240 Q150 180 320 230 T560 210 L560 380 L-20 380 Z" fill="url(#hillGrad2)" opacity="0.75" />

        {/* Ground Terrain */}
        <path d="M-20 270 Q130 250 290 270 T560 260 L560 380 L-20 380 Z" fill="#E6F2EA" />

        {/* Village Houses (Background Left & Middle) */}
        {/* House 1 - Panchayat Bhavan Style */}
        <rect x="70" y="195" width="85" height="60" rx="3" fill="#FFFDF8" stroke="#D3DDD7" strokeWidth="1" />
        <polygon points="62,195 112,160 162,195" fill="url(#houseRoof1)" />
        <rect x="98" y="220" width="28" height="35" rx="2" fill="#4A3525" />
        <rect x="78" y="208" width="14" height="14" rx="1" fill="#78B0D2" />
        <rect x="133" y="208" width="14" height="14" rx="1" fill="#78B0D2" />
        {/* Little Indian Flag on Panchayat roof */}
        <line x1="112" y1="160" x2="112" y2="135" stroke="#444" strokeWidth="1.5" />
        <polygon points="113,135 128,142 113,149" fill="#FF9933" />

        {/* House 2 (Right of Tree) */}
        <rect x="350" y="205" width="70" height="55" rx="2" fill="#FDFBF5" />
        <polygon points="342,205 385,175 428,205" fill="url(#houseRoof2)" />
        <rect x="375" y="225" width="20" height="35" fill="#5A4333" />
        <rect x="356" y="215" width="12" height="12" fill="#88C4D8" />
        <rect x="402" y="215" width="12" height="12" fill="#88C4D8" />

        {/* Winding Village Pathway */}
        <path d="M190 380 Q 230 310 260 280 T 360 250" fill="none" stroke="url(#pathGrad)" strokeWidth="48" strokeLinecap="round" opacity="0.85" />
        <path d="M190 380 Q 230 310 260 280 T 360 250" fill="none" stroke="#D1A76E" strokeWidth="2" strokeDasharray="6 8" opacity="0.6" />

        {/* Magnificent Banyan / Neem Village Tree (Center-Left) */}
        {/* Tree Trunk */}
        <path d="M225 295 Q 235 240 215 190 Q 240 180 255 190 Q 245 245 260 295 Z" fill="#5C3B1E" />
        <path d="M218 240 Q 200 220 185 225" fill="none" stroke="#5C3B1E" strokeWidth="7" strokeLinecap="round" />
        <path d="M245 230 Q 275 210 290 220" fill="none" stroke="#5C3B1E" strokeWidth="6" strokeLinecap="round" />
        
        {/* Lush Tree Foliage Layers */}
        <circle cx="210" cy="150" r="50" fill="url(#treeGrad)" />
        <circle cx="265" cy="145" r="48" fill="url(#treeLight)" />
        <circle cx="235" cy="115" r="54" fill="url(#treeGrad)" />
        <circle cx="175" cy="135" r="38" fill="url(#treeLight)" opacity="0.9" />
        <circle cx="295" cy="130" r="36" fill="url(#treeGrad)" opacity="0.9" />
        <circle cx="230" cy="95" r="32" fill="#1DB37B" opacity="0.8" />
        
        {/* Tree Platform / Chabutara */}
        <ellipse cx="240" cy="295" rx="55" ry="12" fill="#D3DDD7" stroke="#A8BDB2" strokeWidth="2" />

        {/* Solar Street Light (Smart village element) */}
        <line x1="320" y1="285" x2="320" y2="190" stroke="#7A8B99" strokeWidth="3" />
        <rect x="308" y="186" width="24" height="6" rx="2" fill="#1A3B5C" />
        <polygon points="314,192 326,192 328,198 312,198" fill="#F4D03F" />
        <circle cx="320" cy="202" r="14" fill="#F4D03F" opacity="0.15" />

        {/* Citizen with Smartphone (Foreground Hero Character) */}
        <g transform="translate(130, 240)">
          {/* Shadow */}
          <ellipse cx="25" cy="115" rx="22" ry="6" fill="rgba(16, 35, 51, 0.15)" />
          
          {/* Head & Traditional Turban / Hair */}
          <circle cx="25" cy="22" r="12" fill="#E0A97E" />
          <path d="M14 18 Q 25 10 36 18 Q 30 8 16 12 Z" fill="#087A55" />
          
          {/* Kurta / Body */}
          <path d="M12 36 Q 25 34 38 36 L 42 85 Q 25 88 8 85 Z" fill="#FFFFFF" stroke="#DDE7E2" strokeWidth="1" />
          <path d="M18 36 L 25 58 L 32 36" fill="none" stroke="#087A55" strokeWidth="2" />
          
          {/* Left Arm holding Smartphone high */}
          <path d="M37 40 Q 52 50 50 65" fill="none" stroke="#E0A97E" strokeWidth="6" strokeLinecap="round" />
          
          {/* Smartphone device */}
          <rect x="46" y="55" width="14" height="24" rx="3" fill="#102333" />
          <rect x="48" y="58" width="10" height="18" rx="1" fill="#087A55" />
          {/* Voice Wave emission from phone */}
          <circle cx="53" cy="50" r="4" fill="none" stroke="#087A55" strokeWidth="1.5" opacity="0.8" />
          <circle cx="53" cy="46" r="8" fill="none" stroke="#087A55" strokeWidth="1.5" opacity="0.5" />
          <circle cx="53" cy="42" r="12" fill="none" stroke="#087A55" strokeWidth="1.5" opacity="0.3" />

          {/* Right Arm */}
          <path d="M13 40 Q 6 56 10 70" fill="none" stroke="#E0A97E" strokeWidth="6" strokeLinecap="round" />
          
          {/* Legs / Pajama */}
          <line x1="18" y1="85" x2="16" y2="112" stroke="#ECEFF1" strokeWidth="6" strokeLinecap="round" />
          <line x1="32" y1="85" x2="34" y2="112" stroke="#ECEFF1" strokeWidth="6" strokeLinecap="round" />
          {/* Footwear */}
          <ellipse cx="14" cy="113" rx="5" ry="3" fill="#5A3A1E" />
          <ellipse cx="36" cy="113" rx="5" ry="3" fill="#5A3A1E" />
        </g>

        {/* Second Citizen / Villager standing near tree platform */}
        <g transform="translate(265, 225)">
          <ellipse cx="15" cy="72" rx="12" ry="4" fill="rgba(16, 35, 51, 0.12)" />
          <circle cx="15" cy="16" r="8" fill="#D2986E" />
          <path d="M8 26 Q 15 24 22 26 L 25 58 Q 15 60 5 58 Z" fill="#2366B1" />
          <line x1="10" y1="58" x2="10" y2="70" stroke="#FFFFFF" strokeWidth="4" strokeLinecap="round" />
          <line x1="20" y1="58" x2="20" y2="70" stroke="#FFFFFF" strokeWidth="4" strokeLinecap="round" />
        </g>

        {/* Small decorative village flora / shrubs */}
        <circle cx="45" cy="330" r="16" fill="#0E8A5E" />
        <circle cx="60" cy="336" r="12" fill="#1DB37B" />
        <circle cx="475" cy="310" r="18" fill="#0E8A5E" />
        <circle cx="495" cy="318" r="14" fill="#1DB37B" />

        {/* Flying birds in the sky */}
        <path d="M120 70 Q 126 62 132 70 Q 138 62 144 70" fill="none" stroke="#4A6572" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M150 85 Q 155 78 160 85 Q 165 78 170 85" fill="none" stroke="#4A6572" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    </div>
  );
}
