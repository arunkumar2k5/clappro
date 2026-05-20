import React, { useEffect, useRef } from 'react';
import './BlobLoader.css';

interface BlobLoaderProps {
  message?: string;
}

export const BlobLoader: React.FC<BlobLoaderProps> = ({ message = 'Processing...' }) => {
  const burstRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!burstRef.current) return;

    const burst = burstRef.current;
    const CFG = {
      rotSpeed: 150,
      waveSpeed: 5.0,
      count: 12
    };

    const MAX_H = 44;
    const MIN_H = 7;

    const petals: HTMLDivElement[] = [];
    let rotAngle = 0;
    let lastTs: number | null = null;
    let animationId: number;

    // Build petals
    burst.innerHTML = '';
    for (let i = 0; i < CFG.count; i++) {
      const p = document.createElement('div');
      p.className = 'petal';
      burst.appendChild(p);
      petals.push(p);
    }

    function frame(ts: number) {
      if (!lastTs) lastTs = ts;
      const dt = Math.min((ts - lastTs) / 1000, 0.05);
      lastTs = ts;

      rotAngle += CFG.rotSpeed * dt;
      burst.style.transform = `rotate(${rotAngle}deg)`;

      const t = ts / 1000;
      const n = petals.length;

      petals.forEach((p, i) => {
        const angle = (i / n) * Math.PI * 2;
        const wave = Math.sin(t * CFG.waveSpeed - angle);
        const norm = wave * 0.5 + 0.5;
        const h = Math.round(MIN_H + (MAX_H - MIN_H) * norm);

        p.style.height = h + 'px';
        p.style.marginTop = (-h) + 'px';
        p.style.transformOrigin = `center ${h}px`;
        p.style.transform = `rotate(${i * (360 / n)}deg)`;
        p.style.opacity = (0.3 + 0.7 * norm).toFixed(2);
      });

      animationId = requestAnimationFrame(frame);
    }

    animationId = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center p-8">
      <div className="burst" ref={burstRef}></div>
      <p className="mt-6 text-gray-600 font-medium text-lg">{message}</p>
    </div>
  );
};
