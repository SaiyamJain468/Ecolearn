import { useEffect } from 'react';

/**
 * Hook to apply a 3D tilt effect to an element on mouse move.
 * @param {React.RefObject} ref - The ref of the element to tilt.
 */
export function useTilt(ref) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onMove = (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -8;  // max 8deg
      const rotateY = ((x - centerX) / centerX) * 8;
      
      el.style.transform = 
        `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
    };

    const onLeave = () => {
      el.style.transform = 
        `perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)`;
    };

    el.style.transition = 'transform 0.15s ease';
    el.addEventListener('mousemove', onMove);
    el.addEventListener('mouseleave', onLeave);

    return () => {
      el.removeEventListener('mousemove', onMove);
      el.removeEventListener('mouseleave', onLeave);
    };
  }, [ref]);
}
