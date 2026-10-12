import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

interface OrbitalWheelSectionProps {
  children: React.ReactNode;
  id?: string;
  className?: string;
  dampen?: boolean;
}

export const OrbitalWheelSection: React.FC<OrbitalWheelSectionProps> = ({
  children,
  id,
  className = '',
  dampen = false,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Track the section's position as it travels across the viewport
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  // DRAMATIC CIRCUMFERENCE / WHEEL ORBIT:
  // Enters distinctly from FAR RIGHT (+x) along a sweeping circular arc,
  // aligns perfectly in viewport center (x=0, rot=0),
  // and exits curving upwards to the LEFT (-x)
  const xTravel = dampen ? '32vw' : '48vw';
  const negXTravel = dampen ? '-32vw' : '-48vw';
  const rotationAngle = dampen ? 12 : 18;
  const yArc = dampen ? 110 : 150;

  const x = useTransform(scrollYProgress, [0, 0.5, 1], [xTravel, '0vw', negXTravel]);
  const y = useTransform(scrollYProgress, [0, 0.5, 1], [yArc, 0, -yArc]);
  const rotate = useTransform(scrollYProgress, [0, 0.5, 1], [rotationAngle, 0, -rotationAngle]);
  const opacity = useTransform(scrollYProgress, [0, 0.22, 0.78, 1], [0.1, 1, 1, 0.1]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.88, 1, 0.88]);

  return (
    <div
      ref={containerRef}
      id={id}
      className={`relative w-full overflow-visible py-8 sm:py-12 ${className}`}
    >
      <motion.div
        style={{
          x,
          y,
          rotate,
          opacity,
          scale,
          transformOrigin: '50% 180%',
        }}
        className="w-full will-change-transform"
      >
        {children}
      </motion.div>
    </div>
  );
};
