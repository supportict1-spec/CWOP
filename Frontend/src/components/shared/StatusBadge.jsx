import React from 'react';

const statusStyles = {
  active: { bg: '#C9E8D8', color: '#2D7A3E' },
  inactive: { bg: '#E5E7EB', color: '#6B7280' },
  present: { bg: '#C9E8D8', color: '#2D7A3E' },
  absent: { bg: '#FECACA', color: '#991B1B' },
  late: { bg: '#F5DCC8', color: '#92400E' },
  on_leave: { bg: '#CFE0F0', color: '#1E40AF' },
  compliant: { bg: '#C9E8D8', color: '#2D7A3E' },
  expired: { bg: '#FECACA', color: '#991B1B' },
  expiring_30: { bg: '#FECACA', color: '#991B1B' },
  expiring_60: { bg: '#F5DCC8', color: '#92400E' },
  expiring_90: { bg: '#F5DCC8', color: '#92400E' },
  missing: { bg: '#E5E7EB', color: '#6B7280' },
  low: { bg: '#C9E8D8', color: '#2D7A3E' },
  moderate: { bg: '#F5DCC8', color: '#92400E' },
  high: { bg: '#FED7AA', color: '#B83A52' },
  critical: { bg: '#FECACA', color: '#991B1B' },
  green: { bg: '#C9E8D8', color: '#2D7A3E' },
  amber: { bg: '#F5DCC8', color: '#92400E' },
  red: { bg: '#FECACA', color: '#991B1B' },
  pending: { bg: '#F5DCC8', color: '#92400E' },
  approved: { bg: '#C9E8D8', color: '#2D7A3E' },
  rejected: { bg: '#FECACA', color: '#991B1B' },
  declared: { bg: '#FECACA', color: '#991B1B' },
  resolved: { bg: '#C9E8D8', color: '#2D7A3E' },
  scheduled: { bg: '#CFE0F0', color: '#1E40AF' },
  completed: { bg: '#C9E8D8', color: '#2D7A3E' },
  cancelled: { bg: '#E5E7EB', color: '#6B7280' },
  notified: { bg: '#CFE0F0', color: '#1E40AF' },
  acknowledged: { bg: '#F5DCC8', color: '#92400E' },
  arrived: { bg: '#C9E8D8', color: '#2D7A3E' },
  en_route: { bg: '#F5DCC8', color: '#92400E' },
  unavailable: { bg: '#E5E7EB', color: '#6B7280' },
  no_response: { bg: '#FECACA', color: '#991B1B' },
  permanent: { bg: '#C9E8D8', color: '#2D7A3E' },
  contract: { bg: '#CFE0F0', color: '#1E40AF' },
  locum: { bg: '#F5DCC8', color: '#92400E' },
  suspended: { bg: '#FECACA', color: '#991B1B' },
  transferred: { bg: '#CFE0F0', color: '#1E40AF' },
};

export default function StatusBadge({ status, className = '' }) {
  const style = statusStyles[status] || { bg: '#E5E7EB', color: '#6B7280' };
  const label = String(status || 'unknown').replace(/_/g, ' ');

  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold capitalize whitespace-nowrap ${className}`}
      style={{ backgroundColor: style.bg, color: style.color }}
    >
      {label}
    </span>
  );
}