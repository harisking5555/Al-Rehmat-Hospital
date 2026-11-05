import React, { useEffect, useState } from 'react';

export const CustomCursor: React.FC = () => {
  const [trailingPos, setTrailingPos] = useState({ x: -200, y: -200 });
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only enable on desktop pointer devices
    if (typeof window === 'undefined' || window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    let animationFrameId: number;
    let targetX = -200;
    let targetY = -200;

    const onMouseMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
      if (!isVisible) setIsVisible(true);
    };

    // Smooth physics-based trailing illumination torch
    const animateTrail = () => {
      setTrailingPos((prev) => ({
        x: prev.x + (targetX - prev.x) * 0.14,
        y: prev.y + (targetY - prev.y) * 0.14,
      }));
      animationFrameId = requestAnimationFrame(animateTrail);
    };

    animationFrameId = requestAnimationFrame(animateTrail);

    const onMouseEnterInteractive = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.tagName === 'INPUT' ||
        target.tagName === 'SELECT' ||
        target.tagName === 'TEXTAREA' ||
        target.closest('button') ||
        target.closest('a')
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseover', onMouseEnterInteractive);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseover', onMouseEnterInteractive);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    /* Soft ambient illumination lighting glow (No obstructive dots or ring circles) */
    <div
      className="pointer-events-none fixed top-0 left-0 z-40 transition-opacity duration-300 ease-out"
      style={{
        transform: `translate3d(${trailingPos.x - 175}px, ${trailingPos.y - 175}px, 0)`,
      }}
    >
      <div
        className={`w-[350px] h-[350px] rounded-full pointer-events-none transition-all duration-300 ${
          isHovered
            ? 'bg-radial from-red-500/16 via-rose-500/8 to-transparent blur-2xl scale-125'
            : 'bg-radial from-red-500/9 via-rose-500/4 to-transparent blur-3xl scale-100'
        }`}
      />
    </div>
  );
};
