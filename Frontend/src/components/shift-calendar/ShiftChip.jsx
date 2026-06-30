import React from 'react';

export default function ShiftChip({ assignment, empName, template, onClick }) {
  const color = template?.color || '#CFE0F0';
  const cancelled = assignment.status === 'cancelled';

  return (
    <button
      onClick={(e) => { e.stopPropagation(); onClick(assignment); }}
      className={`w-full text-left px-1.5 py-0.5 rounded text-[11px] leading-tight hover:opacity-80 transition-opacity truncate flex items-center gap-1
        ${cancelled ? 'opacity-40 line-through' : ''}`}
      style={{ backgroundColor: color + '33', borderLeft: `2.5px solid ${color}` }}
    >
      <span className="font-medium text-cwop-ink truncate">{empName}</span>
      <span className="text-muted-foreground flex-shrink-0">{template?.start_time}</span>
    </button>
  );
}