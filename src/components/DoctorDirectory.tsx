import React, { useState, useMemo } from 'react';
import {
  Search,
  Filter,
  Calendar,
  Star,
  Clock,
  MapPin,
  Award,
  Stethoscope,
  ChevronRight,
  CheckCircle,
  X
} from 'lucide-react';
import { DOCTORS, DEPARTMENTS, Doctor } from '../data/hospitalData';

interface DoctorDirectoryProps {
  onSelectDoctor: (doctor: Doctor) => void;
  onOpenBookingWithDoctor: (doctorId: string, deptId: string) => void;
  initialDepartmentFilter?: string;
}

export const DoctorDirectory: React.FC<DoctorDirectoryProps> = ({
  onSelectDoctor,
  onOpenBookingWithDoctor,
  initialDepartmentFilter
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDept, setSelectedDept] = useState<string>(initialDepartmentFilter || 'all');
  const [selectedDay, setSelectedDay] = useState<string>('all');
  const [minExperience, setMinExperience] = useState<number>(0);

  const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const filteredDoctors = useMemo(() => {
    return DOCTORS.filter((doc) => {
      // Dept filter
      if (selectedDept !== 'all' && doc.departmentId !== selectedDept) {
        return false;
      }
      // Day filter
      if (selectedDay !== 'all' && !doc.availableDays.includes(selectedDay)) {
        return false;
      }
      // Experience filter
      if (minExperience > 0 && doc.experienceYears < minExperience) {
        return false;
      }
      // Search query filter (name, title, specializations, qualifications)
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase();
        const matchesName = doc.name.toLowerCase().includes(query);
        const matchesTitle = doc.title.toLowerCase().includes(query);
        const matchesDept = doc.departmentName.toLowerCase().includes(query);
        const matchesSpecs = doc.specializations.some((s) => s.toLowerCase().includes(query));
        const matchesQual = doc.qualifications.toLowerCase().includes(query);
        if (!matchesName && !matchesTitle && !matchesDept && !matchesSpecs && !matchesQual) {
          return false;
        }
      }
      return true;
    });
  }, [searchQuery, selectedDept, selectedDay, minExperience]);

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedDept('all');
    setSelectedDay('all');
    setMinExperience(0);
  };

  const hasActiveFilters = searchQuery !== '' || selectedDept !== 'all' || selectedDay !== 'all' || minExperience > 0;

  return (
    <section id="doctors" className="py-16 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="mb-8 space-y-2">
          <span className="text-xs font-bold tracking-wider uppercase text-teal-700">
            Clinical Faculty Directory
          </span>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 font-serif">
                Specialist Physicians & Surgeons
              </h2>
              <p className="text-slate-600 text-sm mt-1">
                Meet our 24 internationally certified medical faculty across 8 specialized institutes.
              </p>
            </div>

            {hasActiveFilters && (
              <button
                onClick={resetFilters}
                className="text-xs text-teal-700 hover:text-teal-800 font-semibold flex items-center gap-1 self-start sm:self-auto bg-teal-50 px-3 py-1.5 rounded-md border border-teal-200 transition-colors"
              >
                <X className="w-3.5 h-3.5" />
                <span>Reset All Filters</span>
              </button>
            )}
          </div>
        </div>

        {/* Filter Controls Bar */}
        <div className="bg-white rounded-xl p-4 sm:p-5 border border-slate-200 shadow-xs mb-8 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            {/* Search Input */}
            <div className="md:col-span-5 relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by Doctor Name, Condition (e.g. bypass, knee, stroke)..."
                className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white transition-all"
              />
            </div>

            {/* Department Filter */}
            <div className="md:col-span-4">
              <select
                value={selectedDept}
                onChange={(e) => setSelectedDept(e.target.value)}
                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white transition-all font-medium"
              >
                <option value="all">All Departments ({DOCTORS.length} Doctors)</option>
                {DEPARTMENTS.map((dept) => (
                  <option key={dept.id} value={dept.id}>
                    {dept.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Experience Filter */}
            <div className="md:col-span-3">
              <select
                value={minExperience}
                onChange={(e) => setMinExperience(Number(e.target.value))}
                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white transition-all font-medium"
              >
                <option value={0}>Any Experience Level</option>
                <option value={12}>12+ Years Clinical Experience</option>
                <option value={15}>15+ Years Clinical Experience</option>
                <option value={20}>20+ Years Clinical Experience</option>
              </select>
            </div>
          </div>

          {/* Day of Week Filter Buttons */}
          <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-slate-600">Available Days:</span>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setSelectedDay('all')}
                  className={`px-2.5 py-1 rounded text-xs font-semibold transition-colors ${
                    selectedDay === 'all'
                      ? 'bg-slate-900 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  All Days
                </button>
                {daysOfWeek.map((day) => (
                  <button
                    key={day}
                    onClick={() => setSelectedDay(day)}
                    className={`px-2.5 py-1 rounded text-xs font-semibold transition-colors ${
                      selectedDay === day
                        ? 'bg-teal-600 text-white'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {day}
                  </button>
                ))}
              </div>
            </div>

            <div className="text-slate-500 font-mono text-xs tabular-nums">
              Showing <span className="font-bold text-slate-900">{filteredDoctors.length}</span> of {DOCTORS.length} specialists
            </div>
          </div>
        </div>

        {/* Doctor Grid */}
        {filteredDoctors.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-xl border border-slate-200 p-8">
            <Stethoscope className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h3 className="text-base font-bold text-slate-900 mb-1">
              No specialists match your criteria
            </h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto mb-4">
              Try adjusting your search terms or resetting the department and day filters.
            </p>
            <button
              onClick={resetFilters}
              className="px-4 py-2 text-xs font-semibold text-teal-700 bg-teal-50 border border-teal-200 rounded-lg hover:bg-teal-100 transition-colors"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDoctors.map((doc) => (
              <div
                key={doc.id}
                className="bg-white rounded-xl border border-slate-200 hover:border-teal-400 hover:shadow-md transition-all duration-200 flex flex-col justify-between p-6"
              >
                <div>
                  {/* Doctor Card Top Banner */}
                  <div className="flex items-start gap-4 mb-4">
                    {/* Visual Monogram Avatar */}
                    <div
                      className={`w-14 h-14 rounded-xl bg-gradient-to-br ${doc.accentColor} text-white font-bold text-lg flex items-center justify-center shadow-xs shrink-0 tracking-wider`}
                    >
                      {doc.initials}
                    </div>

                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-0.5">
                        <span className="font-medium truncate text-teal-700">{doc.departmentName}</span>
                      </div>
                      <h3
                        onClick={() => onSelectDoctor(doc)}
                        className="text-base font-bold text-slate-900 hover:text-teal-700 transition-colors cursor-pointer truncate font-serif"
                      >
                        {doc.name}
                      </h3>
                      <p className="text-xs text-slate-500 line-clamp-1">
                        {doc.title}
                      </p>
                    </div>
                  </div>

                  {/* Qualifications & Experience Tag */}
                  <div className="text-xs text-slate-600 space-y-1 mb-4 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                    <div className="font-medium text-slate-800 line-clamp-1">
                      {doc.qualifications}
                    </div>
                    <div className="flex items-center justify-between text-[11px] text-slate-500">
                      <span>{doc.experienceYears} Years Clinical Exp.</span>
                      <span className="font-semibold text-slate-700">{doc.opdRoom}</span>
                    </div>
                  </div>

                  {/* Rating & Fee */}
                  <div className="flex items-center justify-between text-xs mb-4">
                    <div className="flex items-center gap-1 text-amber-600 font-semibold">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
                      <span className="font-mono tabular-nums">{doc.rating}</span>
                      <span className="text-slate-500 font-normal">
                        ({doc.reviewCount})
                      </span>
                    </div>

                    <div className="text-right">
                      <span className="text-xs text-slate-500 block text-[11px]">Consultation Fee</span>
                      <span className="font-bold text-slate-900 font-mono tabular-nums text-sm">
                        ${doc.consultationFee}
                      </span>
                    </div>
                  </div>

                  {/* Specializations preview */}
                  <div className="space-y-1.5 mb-5">
                    <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide block">
                      Clinical Focus:
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {doc.specializations.slice(0, 2).map((spec, idx) => (
                        <span
                          key={idx}
                          className="text-[11px] font-medium text-slate-700 bg-slate-100 px-2 py-0.5 rounded"
                        >
                          {spec}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Available Days */}
                  <div className="text-xs text-slate-500 mb-5 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span className="font-medium text-slate-700">Days:</span>
                    <span className="truncate">{doc.availableDays.join(', ')}</span>
                  </div>
                </div>

                {/* Bottom Card Actions */}
                <div className="pt-3 border-t border-slate-100 grid grid-cols-2 gap-2">
                  <button
                    onClick={() => onSelectDoctor(doc)}
                    className="py-2.5 px-3 text-xs font-semibold text-slate-700 hover:text-slate-900 bg-white hover:bg-slate-100 border border-slate-200 rounded-lg transition-colors text-center"
                  >
                    View Credentials
                  </button>

                  <button
                    onClick={() => onOpenBookingWithDoctor(doc.id, doc.departmentId)}
                    className="py-2.5 px-3 text-xs font-semibold text-white bg-teal-600 hover:bg-teal-700 rounded-lg transition-colors shadow-xs flex items-center justify-center gap-1.5"
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Book Now</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
