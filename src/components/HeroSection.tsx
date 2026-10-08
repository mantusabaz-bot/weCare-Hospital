import React, { useState } from 'react';
import {
  Calendar,
  Search,
  ShieldCheck,
  Award,
  Clock,
  PhoneCall,
  Activity,
  Heart,
  Brain,
  Baby,
  ArrowRight,
  CheckCircle2,
  Stethoscope,
  ChevronRight
} from 'lucide-react';
import { DEPARTMENTS, HOSPITAL_STATS } from '../data/hospitalData';

interface HeroSectionProps {
  onOpenBooking: (prefillDept?: string, prefillDoctor?: string) => void;
  onNavigateToTab: (tab: 'departments' | 'doctors' | 'about') => void;
  onOpenEmergency: () => void;
  onSelectDepartment: (deptId: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenBooking,
  onNavigateToTab,
  onOpenEmergency,
  onSelectDepartment
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDeptId, setSelectedDeptId] = useState('');

  const handleQuickSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedDeptId) {
      onSelectDepartment(selectedDeptId);
    } else {
      onNavigateToTab('doctors');
    }
  };

  return (
    <section className="relative bg-gradient-to-b from-slate-50 via-teal-50/20 to-white pt-10 pb-16 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Trust Badges Bar */}
        <div className="flex flex-wrap items-center gap-3 text-xs text-slate-600 mb-6 font-medium">
          <span className="flex items-center gap-1.5 text-teal-800 bg-teal-100/70 px-2.5 py-1 rounded-md">
            <Award className="w-3.5 h-3.5 text-teal-700" />
            JCI Accredited Quaternary Medical Center
          </span>
          <span className="hidden sm:inline text-slate-300">|</span>
          <span className="flex items-center gap-1 text-slate-700">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            NABH Digital Gold Standard
          </span>
          <span className="hidden sm:inline text-slate-300">|</span>
          <span className="flex items-center gap-1 text-slate-700">
            <Clock className="w-3.5 h-3.5 text-blue-600" />
            24/7 Level-1 Emergency & Trauma
          </span>
        </div>

        {/* Hero Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Core Value Proposition */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-3">
              <span className="text-xs font-semibold tracking-wider uppercase text-teal-700">
                Pioneering Quaternary Care & Clinical Excellence
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-950 leading-[1.1] font-serif">
                Advanced medicine. <br />
                <span className="text-teal-700 font-sans font-extrabold">Compassionate</span> human care.
              </h1>
              <p className="text-lg text-slate-600 leading-relaxed max-w-2xl font-normal">
                weCare Hospitals unites international medical leaders, robotic surgical suites, and multi-specialty tumor boards to deliver rapid diagnosis and life-saving treatments with uncompromising empathy.
              </p>
            </div>

            {/* Quick Action CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => onOpenBooking()}
                className="px-6 py-3.5 rounded-lg bg-teal-600 hover:bg-teal-700 text-white font-semibold text-sm shadow-sm hover:shadow transition-all flex items-center gap-2.5"
              >
                <Calendar className="w-4 h-4" />
                <span>Book Doctor Appointment</span>
              </button>

              <button
                onClick={() => onNavigateToTab('doctors')}
                className="px-5 py-3.5 rounded-lg bg-white hover:bg-slate-50 text-slate-800 font-medium text-sm border border-slate-300 transition-colors flex items-center gap-2"
              >
                <Stethoscope className="w-4 h-4 text-teal-600" />
                <span>Find a Specialist</span>
              </button>

              <button
                onClick={onOpenEmergency}
                className="px-4 py-3.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-700 font-medium text-sm border border-rose-200 transition-colors flex items-center gap-2"
              >
                <PhoneCall className="w-4 h-4 text-rose-600" />
                <span>Emergency 24/7</span>
              </button>
            </div>

            {/* Key Clinical Commitments */}
            <div className="pt-2 grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs text-slate-600">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                <span>Instant confirmed slots</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                <span>No hidden facility fees</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                <span>Multi-specialty tumor boards</span>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Quick Booking & Triage Card */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-2xl border border-slate-200 shadow-md p-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-teal-50 rounded-full blur-2xl -z-0 opacity-70" />
              
              <div className="relative z-10 space-y-5">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div>
                    <h2 className="text-base font-bold text-slate-900 font-sans">
                      Schedule a Consultation
                    </h2>
                    <p className="text-xs text-slate-500">
                      Direct access to 24 specialist physicians across 8 departments
                    </p>
                  </div>
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" title="Appointments Live" />
                </div>

                <form onSubmit={handleQuickSearchSubmit} className="space-y-4 text-sm">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Select Department
                    </label>
                    <select
                      value={selectedDeptId}
                      onChange={(e) => setSelectedDeptId(e.target.value)}
                      className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white transition-all"
                    >
                      <option value="">All Clinical Departments</option>
                      {DEPARTMENTS.map((dept) => (
                        <option key={dept.id} value={dept.id}>
                          {dept.name} ({dept.stats.specialistCount} Doctors)
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Search by Doctor or Symptom (Optional)
                    </label>
                    <div className="relative">
                      <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="e.g. Dr. Sterling, Chest pain, Joint pain..."
                        className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white transition-all"
                      />
                    </div>
                  </div>

                  <div className="pt-1">
                    <button
                      type="button"
                      onClick={() => onOpenBooking(selectedDeptId || undefined)}
                      className="w-full py-3 bg-teal-600 hover:bg-teal-700 text-white rounded-lg font-semibold text-sm transition-colors shadow-sm flex items-center justify-center gap-2"
                    >
                      <Calendar className="w-4 h-4" />
                      <span>Proceed to Date & Slot Booking</span>
                    </button>
                  </div>
                </form>

                {/* Popular department shortcuts */}
                <div className="border-t border-slate-100 pt-4">
                  <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block mb-2">
                    Quick Clinical Centers:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {DEPARTMENTS.slice(0, 4).map((d) => (
                      <button
                        key={d.id}
                        onClick={() => onSelectDepartment(d.id)}
                        className="text-xs font-medium px-2.5 py-1 rounded bg-slate-100 hover:bg-teal-50 hover:text-teal-700 text-slate-700 transition-colors"
                      >
                        {d.shortName}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabular Quantitative Proof Bar */}
        <div className="mt-14 pt-8 border-t border-slate-200 grid grid-cols-2 md:grid-cols-4 gap-6">
          {HOSPITAL_STATS.map((stat, idx) => (
            <div key={idx} className="space-y-1">
              <div className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-mono tabular-nums tracking-tight">
                {stat.value}
              </div>
              <div className="text-xs font-bold text-slate-800 uppercase tracking-wide">
                {stat.label}
              </div>
              <p className="text-xs text-slate-500">
                {stat.subtext}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
