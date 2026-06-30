import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { base44 } from '@/api/base44Client';
import {
  LayoutDashboard, Building2, Users, Clock, CalendarDays, CalendarRange, ClipboardCheck,
  UserCheck, ShieldCheck, AlertTriangle, Siren, BarChart3,
  FileText, ChevronLeft, ChevronRight, LogOut, Settings, Activity, UserCog
} from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useUserPermissions } from '@/hooks/useUserPermissions';

const iconMap = {
  LayoutDashboard, Building2, Users, Clock, CalendarDays, CalendarRange, ClipboardCheck,
  UserCheck, ShieldCheck, AlertTriangle, Siren, BarChart3, FileText, UserCog
};

const navSections = [
  {
    title: 'Operations',
    items: [
      { label: 'Dashboard', path: '/', icon: 'LayoutDashboard' },
      { label: 'Dept Summary', path: '/department-summary', icon: 'ClipboardCheck' },
      { label: 'Hospitals', path: '/hospitals', icon: 'Building2' },
      { label: 'Workforce', path: '/workforce', icon: 'Users' },
    ]
  },
  {
    title: 'Management',
    items: [
      { label: 'Attendance', path: '/attendance', icon: 'Clock' },
      { label: 'Shifts', path: '/shifts', icon: 'CalendarDays' },
      { label: 'Shift Calendar', path: '/shift-calendar', icon: 'CalendarRange' },
      { label: 'Staffing', path: '/staffing', icon: 'UserCheck' },
    ]
  },
  {
    title: 'Intelligence',
    items: [
      { label: 'Compliance', path: '/compliance', icon: 'ShieldCheck' },
      { label: 'Fatigue Risk', path: '/fatigue', icon: 'AlertTriangle' },
      { label: 'Emergency', path: '/emergency', icon: 'Siren' },
    ]
  },
  {
    title: 'Insights',
    items: [
      { label: 'Analytics', path: '/analytics', icon: 'BarChart3' },
      { label: 'Audit Logs', path: '/audit', icon: 'FileText' },
    ]
  },
  {
    title: 'Administration',
    items: [
      { label: 'User Management', path: '/users', icon: 'UserCog' },
    ]
  }
];

export default function Sidebar({ collapsed, onToggle }) {
  const location = useLocation();
  const { isSystemAdmin } = useUserPermissions();

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  const handleLogout = () => {
    base44.auth.logout('/login');
  };

  return (
    <TooltipProvider delayDuration={0}>
      <motion.aside
        initial={false}
        animate={{ width: collapsed ? 72 : 260 }}
        transition={{ duration: 0.2, ease: 'easeInOut' }}
        className="fixed left-0 top-0 bottom-0 z-40 bg-white border-r border-border flex flex-col"
      >
        {/* Logo */}
        <div className="h-16 flex items-center px-4 border-b border-border">
          <div className="w-9 h-9 rounded-xl bg-cwop-indigo flex items-center justify-center flex-shrink-0">
            <Activity className="w-5 h-5 text-white" />
          </div>
          <AnimatePresence>
            {!collapsed && (
              <motion.div
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: 'auto' }}
                exit={{ opacity: 0, width: 0 }}
                className="ml-3 overflow-hidden whitespace-nowrap"
              >
                <span className="text-base font-bold text-cwop-ink tracking-tight">CWOP</span>
                <span className="block text-[10px] text-muted-foreground leading-tight -mt-0.5">Workforce Intelligence</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-3 px-2.5 space-y-4">
          {navSections
            .map((section) => ({
              ...section,
              items: section.items.filter((item) => {
                if ((item.path === '/audit' || item.path === '/users') && !isSystemAdmin) return false;
                return true;
              }),
            }))
            .filter((section) => section.items.length > 0)
            .map((section) => (
            <div key={section.title}>
              <AnimatePresence>
                {!collapsed && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="px-2.5 mb-1.5 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground"
                  >
                    {section.title}
                  </motion.p>
                )}
              </AnimatePresence>
              <div className="space-y-0.5">
                {section.items.map((item) => {
                  const Icon = iconMap[item.icon];
                  const active = isActive(item.path);
                  const linkContent = (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={`flex items-center gap-3 px-2.5 py-2 rounded-lg transition-all duration-150 group
                        ${active
                          ? 'bg-cwop-lavender text-cwop-ink font-medium'
                          : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                        }`}
                    >
                      <Icon className={`w-[18px] h-[18px] flex-shrink-0 ${active ? 'text-cwop-indigo' : ''}`} />
                      <AnimatePresence>
                        {!collapsed && (
                          <motion.span
                            initial={{ opacity: 0, width: 0 }}
                            animate={{ opacity: 1, width: 'auto' }}
                            exit={{ opacity: 0, width: 0 }}
                            className="text-sm whitespace-nowrap overflow-hidden"
                          >
                            {item.label}
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </Link>
                  );

                  if (collapsed) {
                    return (
                      <Tooltip key={item.path}>
                        <TooltipTrigger asChild>{linkContent}</TooltipTrigger>
                        <TooltipContent side="right" className="text-xs">{item.label}</TooltipContent>
                      </Tooltip>
                    );
                  }
                  return <div key={item.path}>{linkContent}</div>;
                })}
              </div>
            </div>
          ))}
        </nav>

        {/* Footer */}
        <div className="border-t border-border p-2.5 space-y-0.5">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-2.5 py-2 rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground transition-colors text-sm"
          >
            <LogOut className="w-[18px] h-[18px] flex-shrink-0" />
            <AnimatePresence>
              {!collapsed && (
                <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="whitespace-nowrap">
                  Sign Out
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>

        {/* Toggle */}
        <button
          onClick={onToggle}
          className="absolute -right-3 top-20 w-6 h-6 rounded-full bg-white border border-border shadow-sm flex items-center justify-center hover:bg-muted transition-colors"
        >
          {collapsed ? <ChevronRight className="w-3.5 h-3.5" /> : <ChevronLeft className="w-3.5 h-3.5" />}
        </button>
      </motion.aside>
    </TooltipProvider>
  );
}