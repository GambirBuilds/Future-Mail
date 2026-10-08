import React, { useState } from 'react';

export const FloatingCapsule: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="relative w-full max-w-[480px] aspect-square mx-auto flex items-center justify-center select-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Outer ambient glow */}
      <div 
        className={`absolute inset-8 rounded-full bg-gradient-to-tr from-[#818CF8]/30 via-[#38BDF8]/25 to-[#2FFFD2]/30 blur-3xl transition-opacity duration-700 ${
          isHovered ? 'opacity-90 scale-105' : 'opacity-50 scale-100'
        }`}
      />

      {/* Orbit Ring 1 - Deep Space Outer */}
      <div 
        className="absolute w-[380px] h-[380px] rounded-full border border-dashed border-[#818CF8]/30 animate-[spin_40s_linear_infinite]"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Orbital node: 2035 */}
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#0A1333]/90 border border-[#38BDF8]/50 text-[10px] font-mono text-[#38BDF8] shadow-[0_0_15px_rgba(56,189,248,0.4)]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#38BDF8] animate-pulse" />
          2035 DESTINATION
        </div>
      </div>

      {/* Orbit Ring 2 - Counter-rotating Mid */}
      <div 
        className="absolute w-[300px] h-[300px] rounded-full border border-[#38BDF8]/35 animate-[spin_28s_linear_infinite_reverse]"
      >
        {/* Orbital node: 2030 */}
        <div className="absolute top-1/2 -right-4 -translate-y-1/2 flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#0A1333]/90 border border-[#818CF8]/50 text-[10px] font-mono text-[#C4B5FD] shadow-[0_0_15px_rgba(129,140,248,0.4)]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#818CF8]" />
          2030 · ORBIT
        </div>
      </div>

      {/* Orbit Ring 3 - Tilted elliptical ring */}
      <div 
        className="absolute w-[240px] h-[240px] rounded-full border border-[#2FFFD2]/35 rotate-45 animate-[spin_20s_linear_infinite]"
      >
        {/* Orbital node: 2026 */}
        <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#0A1333]/90 border border-[#2FFFD2]/50 text-[10px] font-mono text-[#2FFFD2] shadow-[0_0_15px_rgba(47,255,210,0.4)]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#2FFFD2]" />
          2026 · ORIGIN
        </div>
      </div>

      {/* Central Floating Time Capsule Graphic */}
      <div 
        className={`relative z-10 transition-transform duration-500 ease-out ${
          isHovered ? 'scale-105 -translate-y-2' : 'animate-[bounce_6s_easeInOut_infinite]'
        }`}
        style={{
          animation: 'floatCapsule 5s ease-in-out infinite',
        }}
      >
        <svg 
          viewBox="0 0 240 280" 
          className="w-52 h-64 drop-shadow-[0_20px_40px_rgba(59,130,246,0.3)] overflow-visible"
        >
          <defs>
            <linearGradient id="capsuleBodyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#151B2E" stopOpacity="0.9" />
              <stop offset="40%" stopColor="#0F1424" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#090D1A" stopOpacity="0.95" />
            </linearGradient>

            <linearGradient id="neonRimGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#8B5CF6" />
              <stop offset="50%" stopColor="#3B82F6" />
              <stop offset="100%" stopColor="#22D3EE" />
            </linearGradient>

            <linearGradient id="envelopeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#EAF2FF" />
              <stop offset="100%" stopColor="#C4B5FD" />
            </linearGradient>

            <filter id="capsuleGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="8" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Outer Protective Shell */}
          <rect 
            x="35" 
            y="25" 
            width="170" 
            height="230" 
            rx="85" 
            fill="url(#capsuleBodyGrad)" 
            stroke="url(#neonRimGrad)" 
            strokeWidth="2.5" 
            className="transition-all duration-300"
          />

          {/* Capsule Upper Cap */}
          <path 
            d="M 40 100 Q 120 115 200 100" 
            stroke="rgba(34, 211, 238, 0.4)" 
            strokeWidth="1.5" 
            fill="none" 
          />

          {/* Capsule Lower Cap */}
          <path 
            d="M 40 180 Q 120 195 200 180" 
            stroke="rgba(139, 92, 246, 0.4)" 
            strokeWidth="1.5" 
            fill="none" 
          />

          {/* Inner Quantum Glass Chamber */}
          <rect 
            x="48" 
            y="70" 
            width="144" 
            height="140" 
            rx="24" 
            fill="rgba(15, 20, 36, 0.4)" 
            stroke="rgba(255, 255, 255, 0.12)" 
            strokeWidth="1" 
          />

          {/* Holographic Glowing Envelope Inside */}
          <g transform="translate(68, 105)">
            {/* Envelope Back */}
            <rect 
              x="0" 
              y="0" 
              width="104" 
              height="68" 
              rx="6" 
              fill="rgba(21, 27, 46, 0.9)" 
              stroke="url(#neonRimGrad)" 
              strokeWidth="1.5" 
            />
            {/* Envelope Flap Fold Lines */}
            <path 
              d="M 2 4 L 52 40 L 102 4" 
              stroke="#22D3EE" 
              strokeWidth="1.5" 
              fill="none" 
              strokeLinecap="round" 
            />
            <path 
              d="M 4 66 L 40 34" 
              stroke="rgba(139, 92, 246, 0.5)" 
              strokeWidth="1" 
            />
            <path 
              d="M 100 66 L 64 34" 
              stroke="rgba(139, 92, 246, 0.5)" 
              strokeWidth="1" 
            />

            {/* Central Temporal Wax Seal / Emblem */}
            <circle 
              cx="52" 
              cy="38" 
              r="10" 
              fill="#090D1A" 
              stroke="#2FFFD2" 
              strokeWidth="1.5" 
            />
            <polygon 
              points="52,32 57,41 47,41" 
              fill="#2FFFD2" 
            />
          </g>

          {/* Laser scanning beam line sweeping downward */}
          <line 
            x1="45" 
            y1="138" 
            x2="195" 
            y2="138" 
            stroke="#22D3EE" 
            strokeWidth="2" 
            strokeOpacity="0.8" 
            className="animate-pulse"
          />

          {/* Specular highlight on glass */}
          <path 
            d="M 60 45 C 90 35 150 35 180 45" 
            stroke="rgba(255, 255, 255, 0.35)" 
            strokeWidth="2.5" 
            strokeLinecap="round" 
            fill="none" 
          />
        </svg>

        {/* Small floating HUD readout badge */}
        <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap px-3 py-1 rounded-md bg-[#0F1424]/90 border border-white/10 text-[11px] font-mono text-[#94A3B8] shadow-lg flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#2FFFD2] animate-ping" />
          <span>STATUS: TIME-SEALED</span>
          <span className="text-[#38BDF8]">·</span>
          <span>TEMP-STABLE</span>
        </div>
      </div>

      <style>{`
        @keyframes floatCapsule {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-12px) rotate(1.5deg); }
        }
      `}</style>
    </div>
  );
};
