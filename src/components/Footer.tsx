import React from 'react';
import { HeartPulse, Phone, MapPin, Mail, Clock, ShieldCheck } from 'lucide-react';
import { DEPARTMENTS } from '../data/hospitalData';

interface FooterProps {
  onNavigateToTab: (tab: 'home' | 'departments' | 'doctors' | 'about') => void;
  onOpenBooking: () => void;
  onOpenEmergency: () => void;
  onOpenMyAppointments: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigateToTab,
  onOpenBooking,
  onOpenEmergency,
  onOpenMyAppointments
}) => {
  return (
    <footer className="bg-slate-900 text-slate-300 text-xs border-t border-slate-800">
      {/* Upper Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand & About */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-teal-500 text-slate-950 flex items-center justify-center font-bold">
                <HeartPulse className="w-5 h-5" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white font-serif">
                Sabaz weCare <span className="text-teal-400 font-sans font-semibold text-lg">hospitals</span>
              </span>
            </div>

            <p className="text-slate-400 leading-relaxed text-xs max-w-sm">
              weCare Hospitals is a premier quaternary multi-specialty healthcare institution dedicated to patient-centric medical treatment, advanced clinical research, and compassion.
            </p>

            <div className="space-y-1.5 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                <span>450 Medical Center Boulevard, Healthcare District</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                <span>24/7 Emergency: 1800-WECARE (932-273)</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                <span>care@wecarehospitals.org</span>
              </div>
            </div>
          </div>

          {/* Clinical Departments Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Clinical Institutes
            </h4>
            <ul className="space-y-2 text-slate-400">
              {DEPARTMENTS.slice(0, 5).map((d) => (
                <li key={d.id}>
                  <button
                    onClick={() => onNavigateToTab('departments')}
                    className="hover:text-teal-400 transition-colors text-left"
                  >
                    {d.shortName}
                  </button>
                </li>
              ))}
              <li>
                <button
                  onClick={() => onNavigateToTab('departments')}
                  className="text-teal-400 hover:underline font-semibold"
                >
                  View All 8 Departments →
                </button>
              </li>
            </ul>
          </div>

          {/* Patient Quick Access */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Patient Services
            </h4>
            <ul className="space-y-2 text-slate-400">
              <li>
                <button
                  onClick={onOpenBooking}
                  className="hover:text-teal-400 transition-colors"
                >
                  Book Doctor Consultation
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenMyAppointments}
                  className="hover:text-teal-400 transition-colors"
                >
                  Manage My Appointments
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateToTab('doctors')}
                  className="hover:text-teal-400 transition-colors"
                >
                  Doctor Profiles (24 Specialists)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateToTab('about')}
                  className="hover:text-teal-400 transition-colors"
                >
                  Visitor Guidelines & ICU Hours
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenEmergency}
                  className="text-rose-400 hover:text-rose-300 font-semibold"
                >
                  Emergency Ambulance Dispatch
                </button>
              </li>
            </ul>
          </div>

          {/* Accreditations & Hours */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Operating Hours
            </h4>
            <div className="space-y-2 text-slate-400">
              <div>
                <span className="text-white block font-medium">Emergency Bay</span>
                <span>Open 24/7, 365 Days</span>
              </div>
              <div>
                <span className="text-white block font-medium">Outpatient Clinics</span>
                <span>Mon – Sat: 8:30 AM – 7:00 PM</span>
              </div>
              <div>
                <span className="text-white block font-medium">Diagnostics & Lab</span>
                <span>Round-the-clock 24/7</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-800 py-6 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-slate-400 text-xs">
          <div>
            © {new Date().getFullYear()} weCare Hospitals & Research Foundation. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <span className="hover:text-white transition-colors cursor-pointer">Patient Charter</span>
            <span>·</span>
            <span className="hover:text-white transition-colors cursor-pointer">Clinical Governance</span>
            <span>·</span>
            <span className="hover:text-white transition-colors cursor-pointer">Privacy & HIPAA Compliance</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
