'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useInView, motion, useSpring, useTransform } from 'framer-motion';

interface AnimatedCounterProps {
  value: number;
  suffix?: string;
  prefix?: string;
}

export function AnimatedCounter({ value, suffix = '', prefix = '' }: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const [displayValue, setDisplayValue] = useState(0);

  const spring = useSpring(0, {
    stiffness: 45,
    damping: 18,
  });

  useEffect(() => {
    if (isInView) {
      spring.set(value);
    }
  }, [isInView, spring, value]);

  useEffect(() => {
    const unsubscribe = spring.on('change', (latest) => {
      setDisplayValue(Math.floor(latest));
    });
    return () => unsubscribe();
  }, [spring]);

  return (
    <span ref={ref} className="font-extrabold tracking-tight">
      {prefix}
      {displayValue.toLocaleString('en-IN')}
      {suffix}
    </span>
  );
}
