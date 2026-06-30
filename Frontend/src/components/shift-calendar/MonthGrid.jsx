import React from 'react';
import {
  format, isSameMonth, isToday, isSameDay,
  startOfWeek, endOfWeek, startOfMonth, endOfMonth, eachDayOfInterval
} from 'date-fns';
import ShiftChip from './ShiftChip';

const WEEKDAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export default function MonthGrid({ currentMonth, assignments, employees, templates, onDayClick, onShiftClick }) {
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const gridStart = startOfWeek(monthStart, { weekStartsOn: 1 });
  const gridEnd = endOfWeek(monthEnd, { weekStartsOn: 1 });
  const days = eachDayOfInterval({ start: gridStart, end: gridEnd });

  const empName = (id) => {
    const e = employees.find((em) => em.id === id);
    return e ? `${e.first_name} ${e.last_name}` : '—';
  };
  const tmpl = (id) => templates.find((t) => t.id === id);

  const shiftsForDay = (day) =>
    assignments
      .filter((a) => a.date && isSameDay(new Date(a.date), day))
      .sort((a, b) => (a.start_time || '').localeCompare(b.start_time || ''));

  return (
    <div>
      <div className="grid grid-cols-7 mb-1">
        {WEEKDAYS.map((d) => (
          <div key={d} className="text-center text-xs font-semibold text-muted-foreground py-2">{d}</div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {days.map((day) => {
          const inMonth = isSameMonth(day, currentMonth);
          const today = isToday(day);
          const shifts = shiftsForDay(day);

          return (
            <div
              key={day.toISOString()}
              onClick={() => onDayClick(day)}
              className={`min-h-[110px] p-1.5 rounded-lg border cursor-pointer transition-colors hover:border-cwop-indigo/40
                ${inMonth ? 'bg-white border-border' : 'bg-muted/30 border-transparent'}
                ${today ? 'ring-1 ring-cwop-indigo/40' : ''}`}
            >
              <div className={`text-xs mb-1 ${today ? 'font-bold text-cwop-indigo' : inMonth ? 'text-cwop-ink' : 'text-muted-foreground/40'}`}>
                {format(day, 'd')}
              </div>
              <div className="space-y-0.5">
                {shifts.slice(0, 4).map((s) => (
                  <ShiftChip
                    key={s.id}
                    assignment={s}
                    empName={empName(s.employee_id)}
                    template={tmpl(s.shift_template_id)}
                    onClick={onShiftClick}
                  />
                ))}
                {shifts.length > 4 && (
                  <p className="text-[10px] text-muted-foreground px-1.5 font-medium">+{shifts.length - 4} more</p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}