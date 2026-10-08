import React, { useState } from 'react';
import {
  Heart,
  Brain,
  Bone,
  Baby,
  ShieldAlert,
  HeartHandshake,
  Activity,
  Ambulance,
  ArrowRight,
  UserCheck,
  Check,
  Building2,
  Calendar,
  Sparkles,
  ChevronRight
} from 'lucide-react';
import { DEPARTMENTS, DOCTORS, Department, Doctor } from '../data/hospitalData';

interface DepartmentSectionProps {
  onSelectDepartment: (deptId: string) => void;
  onOpenBooking: (deptId?: string, doctorId?: string) => void;
  onSelectDoctor: (doctor: Doctor) => void;
}

export const DepartmentSection: React.FC<DepartmentSectionProps> = ({
  onSelectDepartment,
  onOpenBooking,
  onSelectDoctor
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeDeptModal, setActiveDeptModal] = useState<Department | null>(null);

  const getDepartmentIcon = (iconName: string) => {
    switch (iconName) {
      case 'Heart':
        return <Heart className="w-6 h-6 text-rose-600" />;
      case 'Brain':
        return <Brain className="w-6 h-6 text-indigo-600" />;
      case 'Bone':
        return <Bone className="w-6 h-6 text-amber-600" />;
      case 'Baby':
        return <Baby className="w-6 h-6 text-teal-600" />;
      case 'ShieldAlert':
        return <ShieldAlert className="w-6 h-6 text-purple-600" />;
      case 'HeartHandshake':
        return <HeartHandshake className="w-6 h-6 text-pink-600" />;
      case 'Activity':
        return <Activity className="w-6 h-6 text-emerald-600" />;
      case 'Ambulance':
        return <Ambulance className="w-6 h-6 text-red-600" />;
      default:
        return <Activity className="w-6 h-6 text-teal-600" />;
    }
  };

  const filteredDepartments = selectedCategory === 'all'
    ? DEPARTMENTS
    : selectedCategory === 'emergency'
    ? DEPARTMENTS.filter(d => d.emergencyAvailable)
    : DEPARTMENTS;

  return (
    <section id="departments" className="py-16 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-6 border-b border-slate-200 gap-4">
          <div className="space-y-2">
            <span className="text-xs font-bold tracking-wider uppercase text-teal-700">
              Centers of Clinical Excellence
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 font-serif">
              Specialized Medical Departments
            </h2>
            <p className="text-slate-600 max-w-2xl text-sm">
              Each department is led by distinguished senior clinicians, specialized nursing teams, and dedicated critical care infrastructure.
            </p>
          </div>

          {/* Interactive Filter Buttons */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-lg shrink-0 self-start md:self-auto">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                selectedCategory === 'all'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              All Departments ({DEPARTMENTS.length})
            </button>
            <button
              onClick={() => setSelectedCategory('emergency')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                selectedCategory === 'emergency'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              24/7 Critical Units
            </button>
          </div>
        </div>

        {/* Departments Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredDepartments.map((dept) => {
            const deptDoctors = DOCTORS.filter((d) => d.departmentId === dept.id);
            return (
              <div
                key={dept.id}
                className="group bg-slate-50 hover:bg-white rounded-xl border border-slate-200 hover:border-teal-300 hover:shadow-md transition-all duration-200 flex flex-col justify-between p-6"
              >
                <div>
                  {/* Icon & Emergency tag */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-lg bg-white border border-slate-200 flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
                      {getDepartmentIcon(dept.iconName)}
                    </div>
                    {dept.emergencyAvailable ? (
                      <span className="text-[11px] font-semibold text-rose-700 bg-rose-50 border border-rose-200 px-2 py-0.5 rounded">
                        24/7 On-Call
                      </span>
                    ) : (
                      <span className="text-[11px] font-medium text-slate-500">
                        OPD & Daycare
                      </span>
                    )}
                  </div>

                  {/* Title & Tagline */}
                  <h3 className="text-lg font-bold text-slate-900 mb-1 font-serif group-hover:text-teal-700 transition-colors">
                    {dept.name}
                  </h3>
                  <p className="text-xs text-slate-500 line-clamp-2 mb-4">
                    {dept.tagline}
                  </p>

                  {/* Doctor Team Peek */}
                  <div className="pt-3 border-t border-slate-200/80 mb-4">
                    <div className="flex items-center justify-between text-xs text-slate-600 mb-2 font-medium">
                      <span className="flex items-center gap-1 text-slate-700 font-semibold">
                        <UserCheck className="w-3.5 h-3.5 text-teal-600" />
                        {deptDoctors.length} Specialists
                      </span>
                      <span className="text-slate-500">{dept.floorLocation}</span>
                    </div>

                    <div className="space-y-1">
                      {deptDoctors.slice(0, 2).map((doc) => (
                        <button
                          key={doc.id}
                          onClick={() => onSelectDoctor(doc)}
                          className="w-full text-left text-xs text-slate-700 hover:text-teal-700 hover:underline flex items-center justify-between group/doc py-0.5"
                        >
                          <span className="truncate">{doc.name}</span>
                          <span className="text-[10px] text-slate-600 shrink-0 font-medium">{doc.experienceYears}y exp</span>
                        </button>
                      ))}
                      {deptDoctors.length > 2 && (
                        <span className="text-[11px] text-slate-600 block pt-0.5 font-medium">
                          +{deptDoctors.length - 2} more doctors
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Key Procedures Tags */}
                  <div className="space-y-1 mb-5">
                    <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">
                      Common Interventions:
                    </span>
                    <ul className="text-xs text-slate-600 space-y-1">
                      {dept.keyProcedures.slice(0, 2).map((proc, idx) => (
                        <li key={idx} className="flex items-start gap-1.5 line-clamp-1">
                          <Check className="w-3.5 h-3.5 text-teal-600 shrink-0 mt-0.5" />
                          <span>{proc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Actions */}
                <div className="pt-3 border-t border-slate-200 flex items-center gap-2">
                  <button
                    onClick={() => setActiveDeptModal(dept)}
                    className="flex-1 py-2 px-3 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-100 border border-slate-200 rounded-lg transition-colors text-center"
                  >
                    Department Info
                  </button>
                  <button
                    onClick={() => onOpenBooking(dept.id)}
                    className="py-2 px-3 text-xs font-semibold text-white bg-teal-600 hover:bg-teal-700 rounded-lg transition-colors flex items-center justify-center gap-1"
                    title="Book Consultation in this Department"
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Book</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Department Detail Modal */}
      {activeDeptModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 p-6 sm:p-8 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-start justify-between border-b border-slate-100 pb-4 mb-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-teal-50 border border-teal-200 flex items-center justify-center">
                  {getDepartmentIcon(activeDeptModal.iconName)}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 font-serif">
                    {activeDeptModal.name}
                  </h3>
                  <p className="text-xs text-slate-500 font-medium">
                    {activeDeptModal.floorLocation} · {activeDeptModal.phoneExtension}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setActiveDeptModal(null)}
                className="text-slate-400 hover:text-slate-700 p-1 rounded-lg hover:bg-slate-100"
              >
                ✕
              </button>
            </div>

            <div className="space-y-6 text-sm">
              <div>
                <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
                  Clinical Overview & Mandate
                </h4>
                <p className="text-slate-600 leading-relaxed">
                  {activeDeptModal.overview}
                </p>
              </div>

              {/* Department Head */}
              <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
                <span className="text-[11px] font-bold text-teal-700 uppercase tracking-wide block mb-1">
                  Head of Department
                </span>
                <span className="font-bold text-slate-900 text-sm block">
                  {activeDeptModal.headOfDepartment}
                </span>
              </div>

              {/* Specialists in this department */}
              <div>
                <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-3">
                  Consultant Faculty & Specialists
                </h4>
                <div className="space-y-2.5">
                  {DOCTORS.filter(d => d.departmentId === activeDeptModal.id).map(doc => (
                    <div
                      key={doc.id}
                      className="p-3 rounded-lg border border-slate-200 bg-white hover:border-teal-400 transition-colors flex items-center justify-between gap-3"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-10 h-10 rounded-full bg-teal-600 text-white font-bold text-xs flex items-center justify-center shrink-0">
                          {doc.initials}
                        </div>
                        <div className="min-w-0">
                          <button
                            onClick={() => {
                              setActiveDeptModal(null);
                              onSelectDoctor(doc);
                            }}
                            className="font-bold text-slate-900 text-sm hover:text-teal-700 text-left block truncate"
                          >
                            {doc.name}
                          </button>
                          <span className="text-xs text-slate-500 block truncate">
                            {doc.title} · {doc.experienceYears} Years Exp.
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <span className="text-xs font-semibold text-slate-700 hidden sm:inline">
                          ${doc.consultationFee}
                        </span>
                        <button
                          onClick={() => {
                            setActiveDeptModal(null);
                            onOpenBooking(activeDeptModal.id, doc.id);
                          }}
                          className="px-3 py-1.5 text-xs font-semibold bg-teal-600 hover:bg-teal-700 text-white rounded-lg transition-colors flex items-center gap-1"
                        >
                          <Calendar className="w-3.5 h-3.5" />
                          <span>Book</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Facilities & Procedures */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div>
                  <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
                    Key Procedures Performed
                  </h4>
                  <ul className="text-xs text-slate-600 space-y-1.5">
                    {activeDeptModal.keyProcedures.map((proc, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <span className="text-teal-600 font-bold">•</span>
                        <span>{proc}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
                    Department Facilities
                  </h4>
                  <ul className="text-xs text-slate-600 space-y-1.5">
                    {activeDeptModal.facilities.map((fac, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <span className="text-teal-600 font-bold">•</span>
                        <span>{fac}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Bottom CTA */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
                <button
                  onClick={() => setActiveDeptModal(null)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    const deptId = activeDeptModal.id;
                    setActiveDeptModal(null);
                    onOpenBooking(deptId);
                  }}
                  className="px-5 py-2.5 text-xs font-semibold text-white bg-teal-600 hover:bg-teal-700 rounded-lg transition-colors flex items-center gap-2"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Book Consultation in {activeDeptModal.shortName}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
