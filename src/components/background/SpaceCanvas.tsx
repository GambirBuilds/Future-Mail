import React, { useEffect, useRef } from 'react';
import { useFutureMail } from '../../context/FutureMailContext';

interface Star {
  x: number;
  y: number;
  size: number;
  baseOpacity: number;
  opacity: number;
  twinkleSpeed: number;
  color: string;
}

interface Meteor {
  x: number;
  y: number;
  length: number;
  speed: number;
  angle: number;
  opacity: number;
  active: boolean;
}

export const SpaceCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { skyTheme } = useFutureMail();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Star colors tuned for ethereal future sky
    const getThemeColors = () => {
      if (skyTheme === 'aurora-sky') {
        return {
          bgTop: '#04141A',
          bgMid: '#08252E',
          bgBottom: '#0A3B44',
          horizonGlow: 'rgba(52, 211, 153, 0.18)',
          aurora1: 'rgba(45, 212, 191, 0.16)',
          aurora2: 'rgba(56, 189, 248, 0.12)',
          stars: ['#F0FDFA', '#99F6E4', '#5EEAD4', '#A7F3D0'],
        };
      }
      if (skyTheme === 'sunset-sky') {
        return {
          bgTop: '#14081E',
          bgMid: '#240F35',
          bgBottom: '#3D1548',
          horizonGlow: 'rgba(251, 146, 60, 0.22)',
          aurora1: 'rgba(244, 63, 94, 0.15)',
          aurora2: 'rgba(192, 132, 252, 0.15)',
          stars: ['#FFF1F2', '#FDE047', '#FDA4AF', '#E9D5FF'],
        };
      }
      if (skyTheme === 'starlight-sky') {
        return {
          bgTop: '#020617',
          bgMid: '#0A1128',
          bgBottom: '#111D42',
          horizonGlow: 'rgba(96, 165, 250, 0.15)',
          aurora1: 'rgba(139, 92, 246, 0.12)',
          aurora2: 'rgba(59, 130, 246, 0.14)',
          stars: ['#FFFFFF', '#BAE6FD', '#E2E8F0', '#C7D2FE'],
        };
      }
      // Default: 'future-sky' (Atmospheric Twilight Stratosphere)
      return {
        bgTop: '#060B1E',
        bgMid: '#0B173D',
        bgBottom: '#132860',
        horizonGlow: 'rgba(56, 189, 248, 0.22)',
        aurora1: 'rgba(129, 140, 248, 0.16)',
        aurora2: 'rgba(47, 255, 210, 0.14)',
        stars: ['#F0F7FF', '#BAE6FD', '#A5B4FC', '#2FFFD2'],
      };
    };

    const themeColors = getThemeColors();

    // 1. Generate celestial stars
    const starCount = Math.min(100, Math.floor((width * height) / 14000));
    const stars: Star[] = Array.from({ length: starCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 1.8 + 0.5,
      baseOpacity: Math.random() * 0.5 + 0.25,
      opacity: Math.random() * 0.6 + 0.2,
      twinkleSpeed: Math.random() * 0.02 + 0.006,
      color: themeColors.stars[Math.floor(Math.random() * themeColors.stars.length)],
    }));

    // 2. Shooting stars / meteors
    const meteors: Meteor[] = [
      { x: 0, y: 0, length: 120, speed: 12, angle: Math.PI / 4, opacity: 0, active: false },
      { x: 0, y: 0, length: 90, speed: 10, angle: Math.PI / 3.8, opacity: 0, active: false },
    ];

    let lastMeteorTime = Date.now();
    let auroraPhase = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      const currentTheme = getThemeColors();

      // A. Future Sky Stratosphere Atmospheric Background Gradient
      const skyGrad = ctx.createLinearGradient(0, 0, 0, height);
      skyGrad.addColorStop(0, currentTheme.bgTop);
      skyGrad.addColorStop(0.45, currentTheme.bgMid);
      skyGrad.addColorStop(1, currentTheme.bgBottom);
      ctx.fillStyle = skyGrad;
      ctx.fillRect(0, 0, width, height);

      // B. Radiant Horizon Atmospheric Dawn / Dusk Glow
      const horizonGrad = ctx.createRadialGradient(
        width * 0.5,
        height * 1.05,
        50,
        width * 0.5,
        height * 0.9,
        Math.max(width * 0.7, 500)
      );
      horizonGrad.addColorStop(0, currentTheme.horizonGlow);
      horizonGrad.addColorStop(0.4, currentTheme.horizonGlow.replace(/[\d.]+\)$/, '0.08)'));
      horizonGrad.addColorStop(1, 'transparent');
      ctx.fillStyle = horizonGrad;
      ctx.fillRect(0, 0, width, height);

      // C. Luminous Aurora Stratosphere Ribbon (undulating slow wave)
      auroraPhase += 0.003;
      const waveX = width * 0.5 + Math.sin(auroraPhase) * (width * 0.2);
      const waveY = height * 0.35 + Math.cos(auroraPhase * 0.7) * (height * 0.1);

      const auroraGrad = ctx.createRadialGradient(
        waveX,
        waveY,
        40,
        waveX,
        waveY,
        width * 0.65
      );
      auroraGrad.addColorStop(0, currentTheme.aurora1);
      auroraGrad.addColorStop(0.5, currentTheme.aurora2);
      auroraGrad.addColorStop(1, 'transparent');
      ctx.fillStyle = auroraGrad;
      ctx.fillRect(0, 0, width, height);

      // D. Draw Twinkling Stars & Distant Sky Motes
      const time = Date.now();
      for (let i = 0; i < stars.length; i++) {
        const star = stars[i];

        // Twinkle
        star.opacity = star.baseOpacity + Math.sin(time * star.twinkleSpeed + i) * 0.25;
        const currentOpacity = Math.max(0.1, Math.min(1, star.opacity));

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = star.color;
        ctx.globalAlpha = currentOpacity;
        ctx.fill();

        // Subtle glowing halo on larger celestial stars
        if (star.size > 1.3) {
          ctx.beginPath();
          ctx.arc(star.x, star.y, star.size * 2.8, 0, Math.PI * 2);
          ctx.globalAlpha = currentOpacity * 0.2;
          ctx.fill();
        }
      }
      ctx.globalAlpha = 1;

      // E. Periodic Future Sky Shooting Star
      if (time - lastMeteorTime > 5500 && Math.random() < 0.03) {
        lastMeteorTime = time;
        const m = meteors.find((met) => !met.active);
        if (m) {
          m.x = Math.random() * (width * 0.8) + width * 0.1;
          m.y = Math.random() * (height * 0.35);
          m.opacity = 1;
          m.active = true;
          m.speed = Math.random() * 6 + 10;
        }
      }

      // Update and draw active meteors
      for (const m of meteors) {
        if (!m.active) continue;

        m.x += Math.cos(m.angle) * m.speed;
        m.y += Math.sin(m.angle) * m.speed;
        m.opacity -= 0.015;

        if (m.opacity <= 0 || m.x > width || m.y > height) {
          m.active = false;
          continue;
        }

        const tailX = m.x - Math.cos(m.angle) * m.length;
        const tailY = m.y - Math.sin(m.angle) * m.length;

        const meteorGrad = ctx.createLinearGradient(tailX, tailY, m.x, m.y);
        meteorGrad.addColorStop(0, 'transparent');
        meteorGrad.addColorStop(0.7, 'rgba(56, 189, 248, 0.4)');
        meteorGrad.addColorStop(1, 'rgba(255, 255, 255, 0.95)');

        ctx.beginPath();
        ctx.moveTo(tailX, tailY);
        ctx.lineTo(m.x, m.y);
        ctx.strokeStyle = meteorGrad;
        ctx.lineWidth = 1.8;
        ctx.stroke();

        // Sparkle head
        ctx.beginPath();
        ctx.arc(m.x, m.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = '#FFFFFF';
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [skyTheme]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
      {/* Subtle atmospheric hairline grid overlay */}
      <div 
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(147, 197, 253, 0.15) 1px, transparent 1px), linear-gradient(to bottom, rgba(147, 197, 253, 0.15) 1px, transparent 1px)`,
          backgroundSize: '54px 54px',
        }}
      />
    </div>
  );
};
