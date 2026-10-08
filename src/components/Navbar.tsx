import React, { useState } from 'react';
import { Phone, Calendar, HeartPulse, Menu, X, Clock, ShieldCheck, LogOut, UserCheck } from 'lucide-react';
import { Appointment } from '../data/hospitalData';

interface NavbarProps {
  activeTab: 'home' | 'departments' | 'doctors' | 'about';
  setActiveTab: (tab: 'home' | 'departments' | 'doctors' | 'about') => void;
  onOpenBooking: () => void;
  onOpenEmergency: () => void;
  onOpenMyAppointments: () => void;
  appointments: Appointment[];
  userEmail?: string | null;
  userName?: string | null;
  onLogout?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  onOpenBooking,
  onOpenEmergency,
  onOpenMyAppointments,
  appointments,
  userEmail,
  userName,
  onLogout
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const upcomingCount = appointments.filter(a => a.status === 'Confirmed').length;

  const handleNavClick = (tab: 'home' | 'departments' | 'doctors' | 'about') => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      {/* Top Clinical & Emergency Bar */}
      <div className="bg-slate-900 text-slate-200 text-xs py-1.5 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 font-medium text-emerald-400">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              24/7 Level-1 Emergency & Trauma Center Active
            </span>
            <span className="hidden md:inline text-slate-400">·</span>
            <span className="hidden md:inline text-slate-400">
              Door-to-doctor emergency care under 6 mins
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs font-medium">
            <button
              onClick={onOpenEmergency}
              className="text-rose-400 hover:text-rose-300 flex items-center gap-1 font-semibold transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-rose-400" />
              <span>1800-WECARE (932-273)</span>
            </button>
            <span className="text-slate-700">|</span>
            <button
              onClick={onOpenMyAppointments}
              className="hover:text-white flex items-center gap-1 text-slate-300 transition-colors"
            >
              <Calendar className="w-3.5 h-3.5 text-teal-400" />
              <span>My Appointments</span>
              {upcomingCount > 0 && (
                <span className="ml-1 px-1.5 py-0.2 bg-teal-600 text-white rounded text-[11px] font-bold tabular-nums">
                  {upcomingCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Main Top Bar - strict 3-zone contract */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-18 flex items-center justify-between">
        {/* Zone 1: Brand Wordmark (Single text element with icon) */}
        <button
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-2.5 text-left group"
        >
          <div className="w-10 h-10 rounded-xl bg-teal-600 text-white flex items-center justify-center shadow-sm group-hover:bg-teal-700 transition-colors">
            <HeartPulse className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xl font-bold tracking-tight text-slate-900 block leading-tight font-serif">
              Sabaz weCare <span className="text-teal-600 font-sans font-semibold text-lg">hospitals</span>
            </span>
            <span className="text-[11px] text-slate-500 font-medium tracking-wide">
              Quaternary Healthcare & Research
            </span>
          </div>
        </button>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
          <button
            onClick={() => handleNavClick('home')}
            className={`transition-colors hover:text-slate-900 ${
              activeTab === 'home'
                ? 'text-teal-700 font-semibold border-b-2 border-teal-600 pb-1'
                : 'text-slate-600'
            }`}
          >
            Home
          </button>
          <button
            onClick={() => handleNavClick('departments')}
            className={`transition-colors hover:text-slate-900 ${
              activeTab === 'departments'
                ? 'text-teal-700 font-semibold border-b-2 border-teal-600 pb-1'
                : 'text-slate-600'
            }`}
          >
            Departments
          </button>
          <button
            onClick={() => handleNavClick('doctors')}
            className={`transition-colors hover:text-slate-900 ${
              activeTab === 'doctors'
                ? 'text-teal-700 font-semibold border-b-2 border-teal-600 pb-1'
                : 'text-slate-600'
            }`}
          >
            Find a Doctor
          </button>
          <button
            onClick={() => handleNavClick('about')}
            className={`transition-colors hover:text-slate-900 ${
              activeTab === 'about'
                ? 'text-teal-700 font-semibold border-b-2 border-teal-600 pb-1'
                : 'text-slate-600'
            }`}
          >
            About weCare
          </button>
        </nav>

        {/* Zone 3: Primary Actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenBooking}
            className="px-4 py-2.5 text-sm font-semibold text-white bg-teal-600 rounded-lg hover:bg-teal-700 transition-colors shadow-sm hover:shadow flex items-center gap-2 whitespace-nowrap"
          >
            <Calendar className="w-4 h-4" />
            <span>Book Appointment</span>
          </button>

          {/* User Profile & Logout */}
          {userEmail && (
            <div className="hidden sm:flex items-center gap-2 pl-2 border-l border-slate-200">
              <div className="text-right">
                <span className="block text-xs font-bold text-slate-800 leading-tight">
                  {userName || userEmail.split('@')[0]}
                </span>
                <span className="block text-[10px] text-emerald-600 font-medium">
                  Verified Patient
                </span>
              </div>
              {onLogout && (
                <button
                  onClick={onLogout}
                  title="Sign Out of Portal"
                  className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              )}
            </div>
          )}

          {/* Mobile menu trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-lg"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 py-4 space-y-3 shadow-lg">
          {userEmail && (
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-slate-900 block">
                  {userName || userEmail}
                </span>
                <span className="text-[11px] text-emerald-600 font-medium">
                  OTP Verified Patient
                </span>
              </div>
              {onLogout && (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onLogout();
                  }}
                  className="px-2.5 py-1 text-xs font-semibold text-rose-600 bg-rose-50 hover:bg-rose-100 rounded border border-rose-200 flex items-center gap-1"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Logout</span>
                </button>
              )}
            </div>
          )}
          <button
            onClick={() => handleNavClick('home')}
            className={`block w-full text-left py-2 px-3 rounded-lg text-sm font-medium ${
              activeTab === 'home' ? 'bg-teal-50 text-teal-800' : 'text-slate-700'
            }`}
          >
            Home
          </button>
          <button
            onClick={() => handleNavClick('departments')}
            className={`block w-full text-left py-2 px-3 rounded-lg text-sm font-medium ${
              activeTab === 'departments' ? 'bg-teal-50 text-teal-800' : 'text-slate-700'
            }`}
          >
            Departments & Centers of Excellence
          </button>
          <button
            onClick={() => handleNavClick('doctors')}
            className={`block w-full text-left py-2 px-3 rounded-lg text-sm font-medium ${
              activeTab === 'doctors' ? 'bg-teal-50 text-teal-800' : 'text-slate-700'
            }`}
          >
            Find a Doctor (24 Specialists)
          </button>
          <button
            onClick={() => handleNavClick('about')}
            className={`block w-full text-left py-2 px-3 rounded-lg text-sm font-medium ${
              activeTab === 'about' ? 'bg-teal-50 text-teal-800' : 'text-slate-700'
            }`}
          >
            About weCare Hospitals
          </button>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenMyAppointments();
            }}
            className="w-full text-left py-2 px-3 rounded-lg text-sm font-medium text-slate-700 bg-slate-50 flex items-center justify-between"
          >
            <span>My Booked Appointments</span>
            {upcomingCount > 0 && (
              <span className="px-2 py-0.5 bg-teal-600 text-white rounded text-xs font-semibold">
                {upcomingCount}
              </span>
            )}
          </button>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenEmergency();
            }}
            className="w-full py-2.5 px-3 rounded-lg text-sm font-semibold text-rose-700 bg-rose-50 border border-rose-200 flex items-center justify-center gap-2"
          >
            <Phone className="w-4 h-4 text-rose-600" />
            <span>24/7 Ambulance & Emergency</span>
          </button>
        </div>
      )}
    </header>
  );
};

