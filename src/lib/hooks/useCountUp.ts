'use client';

import { useEffect, useState } from 'react';

export const useCountUp = (target: number, duration: number = 800, enabled: boolean = true) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!enabled) {
      setCount(target);
      return;
    }

    let start = 0;
    const end = target;
    if (start === end) {
      setCount(end);
      return;
    }

    let startTime: number | null = null;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const progressPercentage = Math.min(progress / duration, 1);
      
      // Ease-out quad formula
      const easeProgress = progressPercentage * (2 - progressPercentage);
      
      const currentCount = start + (end - start) * easeProgress;
      setCount(currentCount);

      if (progress < duration) {
        window.requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    window.requestAnimationFrame(animate);
  }, [target, duration, enabled]);

  return count;
};
