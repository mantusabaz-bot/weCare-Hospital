import React from 'react';
import {
  X,
  Star,
  Calendar,
  Clock,
  MapPin,
  Award,
  GraduationCap,
  Globe,
  CheckCircle,
  FileCheck2,
  Stethoscope
} from 'lucide-react';
import { Doctor } from '../data/hospitalData';

interface DoctorProfileModalProps {
  doctor: Doctor | null;
  onClose: () => void;
  onBookAppointment: (doctorId: string, deptId: string) => void;
}

export const DoctorProfileModal: React.FC<DoctorProfileModalProps> = ({
  doctor,
  onClose,
  onBookAppointment
}) => {
  if (!doctor) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-200">
        {/* Modal Header */}
        <div className="p-6 border-b border-slate-100 flex items-start justify-between bg-gradient-to-r from-slate-50 via-teal-50/30 to-white">
          <div className="flex items-start gap-4">
            <div
              className={`w-16 h-16 rounded-xl bg-gradient-to-br ${doctor.accentColor} text-white font-bold text-xl flex items-center justify-center shadow-sm shrink-0`}
            >
              {doctor.initials}
            </div>
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-teal-700 block mb-0.5">
                {doctor.departmentName}
              </span>
              <h2 className="text-2xl font-bold text-slate-900 font-serif">
                {doctor.name}
              </h2>
              <p className="text-xs text-slate-600 font-medium">
                {doctor.title}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-700 p-1.5 rounded-lg hover:bg-slate-100 transition-colors"
            aria-label="Close Profile"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 space-y-6 text-sm">
          {/* Key Facts Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-50 p-3.5 rounded-xl border border-slate-200/80 text-xs">
            <div>
              <span className="text-slate-500 block text-[11px]">Experience</span>
              <span className="font-bold text-slate-900 font-mono text-sm tabular-nums">
                {doctor.experienceYears} Years
              </span>
            </div>
            <div>
              <span className="text-slate-500 block text-[11px]">Patient Rating</span>
              <div className="flex items-center gap-1 font-bold text-amber-600 font-mono text-sm tabular-nums">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
                <span>{doctor.rating}</span>
              </div>
            </div>
            <div>
              <span className="text-slate-500 block text-[11px]">Consultation Fee</span>
              <span className="font-bold text-slate-900 font-mono text-sm tabular-nums">
                ${doctor.consultationFee}
              </span>
            </div>
            <div>
              <span className="text-slate-500 block text-[11px]">OPD Location</span>
              <span className="font-bold text-slate-900 text-xs">
                {doctor.opdRoom}
              </span>
            </div>
          </div>

          {/* Biography */}
          <div>
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
              Professional Biography
            </h3>
            <p className="text-slate-600 leading-relaxed text-sm">
              {doctor.bio}
            </p>
          </div>

          {/* Clinical Expertise & Specializations */}
          <div>
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2.5">
              Clinical Specializations & Procedures
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {doctor.specializations.map((spec, i) => (
                <div
                  key={i}
                  className="flex items-start gap-2 bg-slate-50 p-2.5 rounded-lg border border-slate-100 text-xs text-slate-700"
                >
                  <CheckCircle className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                  <span>{spec}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Education & Fellowships */}
          <div>
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
              <GraduationCap className="w-4 h-4 text-teal-700" />
              <span>Medical Education & Fellowships</span>
            </h3>
            <div className="space-y-2">
              {doctor.education.map((edu, idx) => (
                <div
                  key={idx}
                  className="flex items-baseline justify-between p-2.5 rounded-lg bg-slate-50 border border-slate-100 text-xs"
                >
                  <div>
                    <span className="font-bold text-slate-800 block">
                      {edu.degree}
                    </span>
                    <span className="text-slate-500">{edu.institution}</span>
                  </div>
                  <span className="font-mono text-slate-400 tabular-nums shrink-0 ml-3">
                    {edu.year}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Consultation Schedule & Languages */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-teal-50/40 p-4 rounded-xl border border-teal-100 text-xs">
            <div>
              <span className="font-bold text-teal-900 block mb-1">
                Visiting Days
              </span>
              <p className="text-slate-700">
                {doctor.availableDays.join(' · ')}
              </p>
            </div>
            <div>
              <span className="font-bold text-teal-900 block mb-1">
                Languages Spoken
              </span>
              <p className="text-slate-700">
                {doctor.languages.join(', ')}
              </p>
            </div>
          </div>
        </div>

        {/* Modal Footer / CTA */}
        <div className="p-6 border-t border-slate-100 bg-slate-50 flex items-center justify-between">
          <div className="text-xs text-slate-500">
            Next available slots in <span className="font-semibold text-slate-800">24-48 hours</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2.5 text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                onClose();
                onBookAppointment(doctor.id, doctor.departmentId);
              }}
              className="px-5 py-2.5 text-xs font-semibold text-white bg-teal-600 hover:bg-teal-700 rounded-lg shadow-sm transition-colors flex items-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Appointment with {doctor.name}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
