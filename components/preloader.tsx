'use client';

import { useEffect, useState } from 'react';

const SLOGANS = [
  'Turn capability into proof',
  'Know what to do next',
  'Hire with evidence · Upskill with direction',
  'Potential, made provable',
];

export function Preloader() {
  const [visible, setVisible] = useState(false);
  const [animatingOut, setAnimatingOut] = useState(false);
  const [sloganIndex] = useState(0);

  useEffect(() => {
    // Only show once per session
    try {
      if (sessionStorage.getItem('pw_preloader_seen')) {
        return;
      }
      sessionStorage.setItem('pw_preloader_seen', '1');
      setVisible(true);
      document.body.style.overflow = 'hidden';
    } catch {
      return;
    }

    const timer = setTimeout(() => {
      setAnimatingOut(true);
      setTimeout(() => {
        setVisible(false);
        document.body.style.overflow = '';
      }, 350);
    }, 550);

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = '';
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 99999,
        background: '#ffffff',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        pointerEvents: animatingOut ? 'none' : 'auto',
        opacity: animatingOut ? 0 : 1,
        transform: animatingOut ? 'translateY(-100%)' : 'translateY(0)',
        transition: 'transform 0.75s cubic-bezier(0.77, 0, 0.175, 1), opacity 0.75s ease',
      }}
    >
      {/* Dynamic blurred radial glows inspired by Framer spec */}
      <div
        style={{
          position: 'absolute',
          width: '520px',
          height: '520px',
          left: '-160px',
          bottom: '-160px',
          background: 'radial-gradient(circle, rgba(59, 130, 246, 0.35) 0%, rgba(255, 255, 255, 0) 70%)',
          filter: 'blur(60px)',
          pointerEvents: 'none',
          animation: 'preloaderPulse 3s ease-in-out infinite alternate',
        }}
      />
      <div
        style={{
          position: 'absolute',
          width: '520px',
          height: '520px',
          right: '-160px',
          top: '-160px',
          background: 'radial-gradient(circle, rgba(245, 158, 11, 0.28) 0%, rgba(255, 255, 255, 0) 70%)',
          filter: 'blur(60px)',
          pointerEvents: 'none',
          animation: 'preloaderPulse 3s ease-in-out infinite alternate-reverse',
        }}
      />

      {/* Center content */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '18px',
          position: 'relative',
          zIndex: 2,
          padding: '0 24px',
          textAlign: 'center',
        }}
      >
        {/* Pathwisse Icon + Brand Mark */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '14px',
            animation: 'preloaderScaleIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
          }}
        >
          {/* Pathwisse Emblem */}
          <div
            style={{
              width: '54px',
              height: '54px',
              borderRadius: '16px',
              background: 'linear-gradient(135deg, #1F3861 0%, #2458ae 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 12px 30px rgba(36, 88, 174, 0.25)',
              position: 'relative',
            }}
          >
            <svg width="34" height="34" viewBox="0 0 44 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M29 5H16v12H5v17h13v-9h16V14"
                stroke="#FFFFFF"
                strokeWidth="5.5"
                strokeLinejoin="round"
                strokeLinecap="round"
              />
              <circle cx="37" cy="5" r="4.5" fill="#f5913f" />
            </svg>
          </div>

          {/* Pathwisse Typography */}
          <span
            style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: '34px',
              fontWeight: 700,
              letterSpacing: '-0.03em',
              color: '#1F3861',
              display: 'inline-flex',
              alignItems: 'baseline',
            }}
          >
            Path<span style={{ color: '#2458ae' }}>wisse</span>
          </span>
        </div>

        {/* Staggered Slogan Cycle */}
        <div
          style={{
            height: '28px',
            overflow: 'hidden',
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minWidth: '280px',
          }}
        >
          <p
            key={sloganIndex}
            style={{
              fontFamily: 'var(--font-sans, sans-serif)',
              fontSize: '15px',
              fontWeight: 500,
              color: '#64748B',
              letterSpacing: '-0.01em',
              margin: 0,
              animation: 'preloaderTextIn 0.35s ease-out forwards',
            }}
          >
            {SLOGANS[sloganIndex]}
          </p>
        </div>

        {/* Subtle loading indicator line */}
        <div
          style={{
            width: '140px',
            height: '3px',
            borderRadius: '999px',
            background: '#E2E8F0',
            overflow: 'hidden',
            marginTop: '10px',
            position: 'relative',
          }}
        >
          <div
            style={{
              position: 'absolute',
              height: '100%',
              width: '45%',
              background: 'linear-gradient(90deg, #2458ae, #f5913f)',
              borderRadius: '999px',
              animation: 'preloaderBar 1.2s ease-in-out infinite',
            }}
          />
        </div>
      </div>

      <style>{`
        @keyframes preloaderScaleIn {
          0% {
            opacity: 0;
            transform: scale(0.9) translateY(10px);
          }
          100% {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
        @keyframes preloaderTextIn {
          0% {
            opacity: 0;
            transform: translateY(16px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes preloaderPulse {
          0% {
            transform: scale(0.92);
          }
          100% {
            transform: scale(1.12);
          }
        }
        @keyframes preloaderBar {
          0% {
            left: -45%;
          }
          50% {
            left: 50%;
            width: 60%;
          }
          100% {
            left: 105%;
          }
        }
      `}</style>
    </div>
  );
}
