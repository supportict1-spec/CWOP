import React from 'react';
import { motion } from 'framer-motion';

const getStatusFromScore = (score) => {
  if (score >= 80) return { status: 'green', label: 'Operational', color: '#2D7A3E', bg: '#C9E8D8' };
  if (score >= 60) return { status: 'amber', label: 'Attention', color: '#92400E', bg: '#F5DCC8' };
  return { status: 'red', label: 'Critical', color: '#991B1B', bg: '#FECACA' };
};

export default function ReadinessGauge({ score = 0, size = 'lg', label }) {
  const { status, label: statusLabel, color, bg } = getStatusFromScore(score);
  const sizeMap = { sm: 80, md: 120, lg: 160 };
  const dim = sizeMap[size] || 160;
  const strokeWidth = size === 'sm' ? 6 : 8;
  const radius = (dim - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = (score / 100) * circumference;

  return (
    <div className="flex flex-col items-center">
      <div className="relative" style={{ width: dim, height: dim }}>
        <svg width={dim} height={dim} className="-rotate-90">
          <circle cx={dim / 2} cy={dim / 2} r={radius} fill="none" stroke="#E5E7EB" strokeWidth={strokeWidth} />
          <motion.circle
            cx={dim / 2} cy={dim / 2} r={radius} fill="none"
            stroke={color} strokeWidth={strokeWidth} strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: circumference - progress }}
            transition={{ duration: 1, ease: 'easeOut' }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.span
            className="font-bold text-cwop-ink"
            style={{ fontSize: size === 'sm' ? 20 : size === 'md' ? 28 : 40 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {score}
          </motion.span>
          {size !== 'sm' && (
            <span className="text-xs text-muted-foreground font-medium -mt-1">/ 100</span>
          )}
        </div>
      </div>
      <div className="mt-2 flex flex-col items-center">
        <span
          className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold"
          style={{ backgroundColor: bg, color }}
        >
          {statusLabel}
        </span>
        {label && <span className="text-xs text-muted-foreground mt-1">{label}</span>}
      </div>
    </div>
  );
}