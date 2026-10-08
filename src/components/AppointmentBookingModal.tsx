import React, { useState, useEffect } from 'react';
import {
  X,
  Calendar,
  Clock,
  User,
  CheckCircle2,
  AlertCircle,
  FileText,
  Printer,
  ChevronRight,
  ChevronLeft,
  Stethoscope,
  Building2,
  CreditCard,
  Check
} from 'lucide-react';
import {
  DEPARTMENTS,
  DOCTORS,
  Department,
  Doctor,
  Appointment
} from '../data/hospitalData';

interface AppointmentBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedDeptId?: string;
  preselectedDoctorId?: string;
  onAppointmentCreated: (appointment: Appointment) => void;
  onViewMyAppointments: () => void;
  defaultPatientName?: string;
  defaultPatientEmail?: string;
  defaultPatientPhone?: string;
}

export const AppointmentBookingModal: React.FC<AppointmentBookingModalProps> = ({
  isOpen,
  onClose,
  preselectedDeptId,
  preselectedDoctorId,
  onAppointmentCreated,
  onViewMyAppointments,
  defaultPatientName,
  defaultPatientEmail,
  defaultPatientPhone
}) => {
  // Step state: 1 (Dept) -> 2 (Doctor) -> 3 (Date/Slot) -> 4 (Patient Info) -> 5 (Confirmation Pass)
  const [step, setStep] = useState<number>(1);

  // Form selections
  const [selectedDeptId, setSelectedDeptId] = useState<string>('');
  const [selectedDoctorId, setSelectedDoctorId] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedSlot, setSelectedSlot] = useState<string>('');
  
  // Patient details
  const [patientName, setPatientName] = useState(defaultPatientName || '');
  const [patientPhone, setPatientPhone] = useState(defaultPatientPhone || '');
  const [patientEmail, setPatientEmail] = useState(defaultPatientEmail || '');
  const [patientAge, setPatientAge] = useState<number | ''>('');
  const [patientGender, setPatientGender] = useState<'Male' | 'Female' | 'Other'>('Male');
  const [visitType, setVisitType] = useState<'New Consultation' | 'Follow-up' | 'Second Opinion'>('New Consultation');
  const [symptoms, setSymptoms] = useState('');

  // Confirmed appointment state
  const [createdAppointment, setCreatedAppointment] = useState<Appointment | null>(null);

  // Error handling
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});

  // Setup prefilled values when opened
  useEffect(() => {
    if (isOpen) {
      if (defaultPatientName && !patientName) setPatientName(defaultPatientName);
      if (defaultPatientEmail && !patientEmail) setPatientEmail(defaultPatientEmail);
      if (defaultPatientPhone && !patientPhone) setPatientPhone(defaultPatientPhone);

      if (preselectedDoctorId) {
        const doc = DOCTORS.find((d) => d.id === preselectedDoctorId);
        if (doc) {
          setSelectedDeptId(doc.departmentId);
          setSelectedDoctorId(doc.id);
          setStep(3); // Jump right to date & time
          return;
        }
      }
      if (preselectedDeptId) {
        setSelectedDeptId(preselectedDeptId);
        setSelectedDoctorId('');
        setStep(2); // Jump to doctor selection
        return;
      }
      // Default to step 1
      setStep(1);
      setSelectedDeptId('');
      setSelectedDoctorId('');
      setSelectedDate('');
      setSelectedSlot('');
      setCreatedAppointment(null);
      setFormErrors({});
    }
  }, [isOpen, preselectedDeptId, preselectedDoctorId]);

  if (!isOpen) return null;

  // Selected department and doctor helpers
  const currentDept = DEPARTMENTS.find((d) => d.id === selectedDeptId);
  const departmentDoctors = DOCTORS.filter((d) => d.departmentId === selectedDeptId);
  const currentDoctor = DOCTORS.find((d) => d.id === selectedDoctorId);

  // Generate next 14 available dates
  const availableDates = Array.from({ length: 14 }).map((_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + (i + 1)); // Starting tomorrow
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    const dateString = `${year}-${month}-${day}`;
    const weekday = d.toLocaleDateString('en-US', { weekday: 'short' });
    const formatted = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    return {
      dateString,
      weekday,
      formatted
    };
  });

  // Doctor time slots
  const doctorSlots = currentDoctor?.availableSlots || [
    '09:00 AM',
    '10:00 AM',
    '11:30 AM',
    '02:30 PM',
    '03:45 PM',
    '04:30 PM'
  ];

  // Validation
  const validatePatientForm = () => {
    const errors: { [key: string]: string } = {};
    if (!patientName.trim()) {
      errors.name = 'Patient full name is required';
    }
    if (!patientPhone.trim() || patientPhone.length < 7) {
      errors.phone = 'Valid contact phone number is required';
    }
    if (!patientEmail.trim() || !patientEmail.includes('@')) {
      errors.email = 'Valid email address is required';
    }
    if (!patientAge || Number(patientAge) <= 0 || Number(patientAge) > 120) {
      errors.age = 'Please enter a valid age (1-120)';
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleConfirmBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validatePatientForm()) {
      return;
    }
    if (!currentDoctor || !currentDept || !selectedDate || !selectedSlot) {
      return;
    }

    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const appointmentId = `WC-2026-${randomSuffix}`;

    const newAppointment: Appointment = {
      id: appointmentId,
      patientName: patientName.trim(),
      patientPhone: patientPhone.trim(),
      patientEmail: patientEmail.trim(),
      patientAge: Number(patientAge),
      patientGender,
      departmentId: currentDept.id,
      departmentName: currentDept.name,
      doctorId: currentDoctor.id,
      doctorName: currentDoctor.name,
      doctorTitle: currentDoctor.title,
      appointmentDate: selectedDate,
      timeSlot: selectedSlot,
      visitType,
      symptoms: symptoms.trim() || 'General consultation & clinical checkup',
      opdRoom: currentDoctor.opdRoom,
      status: 'Confirmed',
      createdAt: new Date().toISOString().split('T')[0]
    };

    onAppointmentCreated(newAppointment);
    setCreatedAppointment(newAppointment);
    setStep(5); // Confirmation pass screen
  };

  const handlePrintPass = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[95vh] overflow-y-auto shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-200 flex flex-col">
        {/* Modal Top Bar */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-teal-600 text-white flex items-center justify-center">
              <Calendar className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900 font-sans">
                Book Outpatient Appointment
              </h2>
              <span className="text-xs text-slate-500">
                Step {step} of 4 {step === 5 && '· Confirmed Pass'}
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-700 p-1.5 rounded-lg hover:bg-slate-200 transition-colors"
            aria-label="Close Booking Dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress tracker */}
        {step < 5 && (
          <div className="bg-slate-100 px-6 py-2 border-b border-slate-200 text-xs">
            <div className="flex items-center justify-between text-[11px] font-semibold text-slate-500">
              <span className={step >= 1 ? 'text-teal-700 font-bold' : ''}>1. Department</span>
              <span className="text-slate-300">›</span>
              <span className={step >= 2 ? 'text-teal-700 font-bold' : ''}>2. Doctor</span>
              <span className="text-slate-300">›</span>
              <span className={step >= 3 ? 'text-teal-700 font-bold' : ''}>3. Date & Time</span>
              <span className="text-slate-300">›</span>
              <span className={step >= 4 ? 'text-teal-700 font-bold' : ''}>4. Patient Info</span>
            </div>
          </div>
        )}

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex-1">
          {/* STEP 1: SELECT DEPARTMENT */}
          {step === 1 && (
            <div className="space-y-4">
              <div>
                <h3 className="text-base font-bold text-slate-900 mb-1 font-serif">
                  Select Clinical Department
                </h3>
                <p className="text-xs text-slate-500">
                  Choose the specialty that best addresses your clinical symptoms.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto pr-1">
                {DEPARTMENTS.map((dept) => {
                  const isSelected = selectedDeptId === dept.id;
                  const docCount = DOCTORS.filter((d) => d.departmentId === dept.id).length;
                  return (
                    <button
                      key={dept.id}
                      type="button"
                      onClick={() => {
                        setSelectedDeptId(dept.id);
                        setSelectedDoctorId('');
                        setStep(2);
                      }}
                      className={`p-3.5 rounded-xl border text-left transition-all flex items-start justify-between group ${
                        isSelected
                          ? 'border-teal-600 bg-teal-50/50 shadow-xs'
                          : 'border-slate-200 hover:border-teal-300 hover:bg-slate-50'
                      }`}
                    >
                      <div className="space-y-1">
                        <span className="font-bold text-slate-900 text-sm block group-hover:text-teal-700">
                          {dept.name}
                        </span>
                        <span className="text-xs text-slate-500 block">
                          {docCount} Specialists · {dept.floorLocation}
                        </span>
                      </div>
                      <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-teal-600 shrink-0 mt-1" />
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 2: SELECT DOCTOR */}
          {step === 2 && currentDept && (
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div>
                  <h3 className="text-base font-bold text-slate-900 font-serif">
                    Select Specialist in {currentDept.shortName}
                  </h3>
                  <p className="text-xs text-slate-500">
                    Each doctor maintains verified OPD consultation hours.
                  </p>
                </div>
                <button
                  onClick={() => setStep(1)}
                  className="text-xs text-teal-700 hover:underline font-semibold flex items-center gap-1"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                  <span>Change Dept</span>
                </button>
              </div>

              <div className="space-y-3 max-h-[50vh] overflow-y-auto pr-1">
                {departmentDoctors.map((doc) => {
                  const isSelected = selectedDoctorId === doc.id;
                  return (
                    <div
                      key={doc.id}
                      onClick={() => {
                        setSelectedDoctorId(doc.id);
                        setStep(3);
                      }}
                      className={`p-4 rounded-xl border cursor-pointer transition-all flex items-center justify-between gap-4 ${
                        isSelected
                          ? 'border-teal-600 bg-teal-50/40 shadow-xs'
                          : 'border-slate-200 hover:border-teal-300 hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center gap-3.5 min-w-0">
                        <div
                          className={`w-12 h-12 rounded-xl bg-gradient-to-br ${doc.accentColor} text-white font-bold text-sm flex items-center justify-center shrink-0 shadow-xs`}
                        >
                          {doc.initials}
                        </div>
                        <div className="min-w-0">
                          <h4 className="font-bold text-slate-900 text-sm truncate">
                            {doc.name}
                          </h4>
                          <p className="text-xs text-slate-500 truncate">
                            {doc.title}
                          </p>
                          <div className="flex items-center gap-2 text-[11px] text-slate-600 mt-1">
                            <span>{doc.experienceYears}y exp</span>
                            <span>·</span>
                            <span className="font-semibold text-slate-700">{doc.opdRoom}</span>
                            <span>·</span>
                            <span>★ {doc.rating}</span>
                          </div>
                        </div>
                      </div>

                      <div className="text-right shrink-0">
                        <div className="text-xs text-slate-500 text-[11px]">Fee</div>
                        <div className="text-base font-bold text-slate-900 font-mono tabular-nums">
                          ${doc.consultationFee}
                        </div>
                        <button
                          type="button"
                          className="mt-1 text-xs font-semibold text-teal-700 hover:text-teal-800"
                        >
                          Select ›
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 3: DATE & TIME SLOT */}
          {step === 3 && currentDoctor && currentDept && (
            <div className="space-y-5">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-teal-600 text-white font-bold text-xs flex items-center justify-center">
                    {currentDoctor.initials}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">
                      {currentDoctor.name}
                    </h3>
                    <p className="text-xs text-slate-500">
                      {currentDept.name} · {currentDoctor.opdRoom}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setStep(2)}
                  className="text-xs text-teal-700 hover:underline font-semibold flex items-center gap-1"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                  <span>Change Doctor</span>
                </button>
              </div>

              {/* Date selection cards */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-2">
                  1. Select Appointment Date
                </label>
                <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
                  {availableDates.slice(0, 7).map((d) => {
                    const isSelected = selectedDate === d.dateString;
                    return (
                      <button
                        key={d.dateString}
                        type="button"
                        onClick={() => setSelectedDate(d.dateString)}
                        className={`p-2 rounded-lg border text-center transition-all ${
                          isSelected
                            ? 'border-teal-600 bg-teal-600 text-white shadow-xs'
                            : 'border-slate-200 hover:border-slate-300 bg-slate-50 text-slate-800'
                        }`}
                      >
                        <span className={`block text-[11px] font-medium ${isSelected ? 'text-teal-100' : 'text-slate-500'}`}>
                          {d.weekday}
                        </span>
                        <span className="block font-bold text-xs mt-0.5">
                          {d.formatted}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Time slot selection */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-2">
                  2. Select Consultation Time Slot
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {doctorSlots.map((slot) => {
                    const isSelected = selectedSlot === slot;
                    return (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => setSelectedSlot(slot)}
                        className={`p-2.5 rounded-lg border text-xs font-semibold transition-all flex items-center justify-center gap-1.5 ${
                          isSelected
                            ? 'border-teal-600 bg-teal-50 text-teal-800 ring-1 ring-teal-600'
                            : 'border-slate-200 hover:border-slate-300 bg-white text-slate-700'
                        }`}
                      >
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        <span>{slot}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Next step button */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs text-slate-500 font-medium">
                  {selectedDate && selectedSlot ? (
                    <span className="text-teal-700 font-semibold">
                      Selected: {selectedDate} at {selectedSlot}
                    </span>
                  ) : (
                    'Please select date and slot to proceed'
                  )}
                </span>

                <button
                  type="button"
                  disabled={!selectedDate || !selectedSlot}
                  onClick={() => setStep(4)}
                  className="px-5 py-2.5 text-xs font-semibold text-white bg-teal-600 hover:bg-teal-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg shadow-sm transition-colors flex items-center gap-2"
                >
                  <span>Patient Information</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: PATIENT DETAILS */}
          {step === 4 && currentDoctor && currentDept && (
            <form onSubmit={handleConfirmBooking} className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div>
                  <h3 className="text-sm font-bold text-slate-900">
                    Patient Consultation Details
                  </h3>
                  <p className="text-xs text-slate-500">
                    With {currentDoctor.name} on {selectedDate} at {selectedSlot}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="text-xs text-teal-700 hover:underline font-semibold flex items-center gap-1"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                  <span>Change Slot</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Full name */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Patient Full Name *
                  </label>
                  <input
                    type="text"
                    value={patientName}
                    onChange={(e) => setPatientName(e.target.value)}
                    placeholder="e.g. Johnathan Miller"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white"
                  />
                  {formErrors.name && (
                    <span className="text-xs text-rose-600 mt-1 block">{formErrors.name}</span>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Contact Phone Number *
                  </label>
                  <input
                    type="tel"
                    value={patientPhone}
                    onChange={(e) => setPatientPhone(e.target.value)}
                    placeholder="+1 (555) 000-0000"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white"
                  />
                  {formErrors.phone && (
                    <span className="text-xs text-rose-600 mt-1 block">{formErrors.phone}</span>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    value={patientEmail}
                    onChange={(e) => setPatientEmail(e.target.value)}
                    placeholder="patient@example.com"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white"
                  />
                  {formErrors.email && (
                    <span className="text-xs text-rose-600 mt-1 block">{formErrors.email}</span>
                  )}
                </div>

                {/* Age & Gender */}
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Age *
                    </label>
                    <input
                      type="number"
                      value={patientAge}
                      onChange={(e) => setPatientAge(e.target.value === '' ? '' : Number(e.target.value))}
                      placeholder="e.g. 45"
                      min={1}
                      max={120}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white"
                    />
                    {formErrors.age && (
                      <span className="text-xs text-rose-600 mt-1 block">{formErrors.age}</span>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Gender
                    </label>
                    <select
                      value={patientGender}
                      onChange={(e) => setPatientGender(e.target.value as any)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white"
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Consultation type */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Type of Consultation
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(['New Consultation', 'Follow-up', 'Second Opinion'] as const).map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setVisitType(type)}
                      className={`py-2 px-2.5 rounded-lg border text-xs font-semibold text-center transition-colors ${
                        visitType === type
                          ? 'bg-teal-50 border-teal-600 text-teal-800'
                          : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              {/* Symptoms / Chief Complaint */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Primary Symptoms / Medical Concern
                </label>
                <textarea
                  value={symptoms}
                  onChange={(e) => setSymptoms(e.target.value)}
                  rows={2}
                  placeholder="Describe your current symptoms, pain level, or past medical records..."
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white"
                />
              </div>

              {/* Fee Notice */}
              <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 flex items-center justify-between text-xs">
                <span className="text-slate-600">
                  OPD Registration & Specialist Fee:
                </span>
                <span className="font-bold text-slate-900 font-mono text-sm">
                  ${currentDoctor.consultationFee} (Payable at Hospital Reception)
                </span>
              </div>

              {/* Submit CTA */}
              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900"
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 text-xs font-semibold text-white bg-teal-600 hover:bg-teal-700 rounded-lg shadow-sm transition-colors flex items-center gap-2"
                >
                  <Check className="w-4 h-4" />
                  <span>Confirm & Generate Appointment Pass</span>
                </button>
              </div>
            </form>
          )}

          {/* STEP 5: CONFIRMATION PASS */}
          {step === 5 && createdAppointment && (
            <div className="space-y-6">
              <div className="text-center space-y-2">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 font-serif">
                  Appointment Confirmed!
                </h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  Your appointment slot has been reserved in our hospital OPD management system.
                </p>
              </div>

              {/* The Printable Pass */}
              <div
                id="appointment-pass"
                className="bg-white border-2 border-teal-700 rounded-xl p-5 shadow-sm space-y-4"
              >
                {/* Pass Header */}
                <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                  <div>
                    <span className="text-base font-bold text-slate-900 font-serif">
                      Sabaz weCare hospitals
                    </span>
                    <span className="text-[11px] text-teal-700 block font-medium">
                      Official Outpatient Consultation Pass
                    </span>
                  </div>

                  <div className="text-right">
                    <span className="text-[10px] text-slate-400 uppercase tracking-wider block">
                      Booking Ref ID
                    </span>
                    <span className="font-mono font-extrabold text-sm text-slate-900">
                      {createdAppointment.id}
                    </span>
                  </div>
                </div>

                {/* Pass Details Grid */}
                <div className="grid grid-cols-2 gap-4 text-xs">
                  <div>
                    <span className="text-slate-400 block text-[11px]">Patient Name</span>
                    <span className="font-bold text-slate-900 text-sm">
                      {createdAppointment.patientName}
                    </span>
                    <span className="text-slate-500 block text-[11px]">
                      {createdAppointment.patientAge}y · {createdAppointment.patientGender}
                    </span>
                  </div>

                  <div>
                    <span className="text-slate-400 block text-[11px]">Consulting Doctor</span>
                    <span className="font-bold text-teal-900 text-sm">
                      {createdAppointment.doctorName}
                    </span>
                    <span className="text-slate-500 block text-[11px]">
                      {createdAppointment.departmentName}
                    </span>
                  </div>

                  <div>
                    <span className="text-slate-400 block text-[11px]">Date & Time Slot</span>
                    <span className="font-bold text-slate-900">
                      {createdAppointment.appointmentDate}
                    </span>
                    <span className="text-teal-700 font-semibold block">
                      {createdAppointment.timeSlot}
                    </span>
                  </div>

                  <div>
                    <span className="text-slate-400 block text-[11px]">OPD Wing & Counter</span>
                    <span className="font-bold text-slate-900">
                      {createdAppointment.opdRoom}
                    </span>
                    <span className="text-slate-500 block text-[11px]">
                      Check-in 15m prior
                    </span>
                  </div>
                </div>

                {/* Important Patient Instructions */}
                <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 text-xs text-slate-600 space-y-1">
                  <div className="font-semibold text-slate-800">Arrival Instructions:</div>
                  <ul className="space-y-0.5 list-disc list-inside text-[11px]">
                    <li>Please report to Reception Desk Counter B 15 minutes before scheduled time.</li>
                    <li>Carry past medical prescriptions, scan reports, and a valid photo ID.</li>
                    <li>For cancellation or rescheduling, dial 1800-WECARE or use the portal.</li>
                  </ul>
                </div>
              </div>

              {/* Pass Actions */}
              <div className="flex flex-col sm:flex-row items-center gap-3 justify-between pt-2">
                <button
                  type="button"
                  onClick={handlePrintPass}
                  className="w-full sm:w-auto px-4 py-2.5 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-300 rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  <Printer className="w-4 h-4 text-slate-500" />
                  <span>Print / Save Pass</span>
                </button>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      onViewMyAppointments();
                    }}
                    className="flex-1 sm:flex-none px-4 py-2.5 text-xs font-semibold text-teal-700 bg-teal-50 hover:bg-teal-100 border border-teal-200 rounded-lg transition-colors text-center"
                  >
                    View in My Appointments
                  </button>

                  <button
                    type="button"
                    onClick={onClose}
                    className="flex-1 sm:flex-none px-5 py-2.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors text-center"
                  >
                    Done
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
