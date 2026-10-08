import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { AuthPage } from './components/AuthPage';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { DepartmentSection } from './components/DepartmentSection';
import { DoctorDirectory } from './components/DoctorDirectory';
import { DoctorProfileModal } from './components/DoctorProfileModal';
import { AppointmentBookingModal } from './components/AppointmentBookingModal';
import { MyAppointmentsModal } from './components/MyAppointmentsModal';
import { AboutSection } from './components/AboutSection';
import { EmergencyModal } from './components/EmergencyModal';
import { Footer } from './components/Footer';
import { testConnection } from './lib/firebase';
import {
  DEPARTMENTS,
  DOCTORS,
  INITIAL_BOOKINGS,
  Appointment,
  Doctor
} from './data/hospitalData';
import {
  Calendar,
  Stethoscope,
  HeartPulse,
  Phone,
  ShieldCheck,
  Award,
  ArrowRight,
  Clock,
  Sparkles,
  CheckCircle2,
  Users,
  RefreshCw
} from 'lucide-react';

function HospitalPortal() {
  const { currentUser, userProfile, loading, phoneVerifiedSession, logout } = useAuth();

  const [activeTab, setActiveTab] = useState<'home' | 'departments' | 'doctors' | 'about'>('home');
  const [selectedDoctorForModal, setSelectedDoctorForModal] = useState<Doctor | null>(null);

  // Booking modal states
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingPrefillDeptId, setBookingPrefillDeptId] = useState<string | undefined>(undefined);
  const [bookingPrefillDoctorId, setBookingPrefillDoctorId] = useState<string | undefined>(undefined);

  // Other modals
  const [isMyAppointmentsOpen, setIsMyAppointmentsOpen] = useState(false);
  const [isEmergencyOpen, setIsEmergencyOpen] = useState(false);

  // Filter state for doctors page
  const [doctorsDeptFilter, setDoctorsDeptFilter] = useState<string>('all');

  // Appointments persistence
  const [appointments, setAppointments] = useState<Appointment[]>(() => {
    try {
      const stored = localStorage.getItem('wecare_hospital_appointments');
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.error('Error reading appointments from localStorage:', e);
    }
    return INITIAL_BOOKINGS;
  });

  useEffect(() => {
    testConnection();
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('wecare_hospital_appointments', JSON.stringify(appointments));
    } catch (e) {
      console.error('Error writing appointments to localStorage:', e);
    }
  }, [appointments]);

  // Handlers
  const handleOpenBooking = (prefillDept?: string, prefillDoctor?: string) => {
    setBookingPrefillDeptId(prefillDept);
    setBookingPrefillDoctorId(prefillDoctor);
    setIsBookingOpen(true);
  };

  const handleOpenBookingWithDoctor = (doctorId: string, deptId: string) => {
    setBookingPrefillDeptId(deptId);
    setBookingPrefillDoctorId(doctorId);
    setIsBookingOpen(true);
  };

  const handleSelectDepartmentFromHero = (deptId: string) => {
    setDoctorsDeptFilter(deptId);
    setActiveTab('departments');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAppointmentCreated = (newApp: Appointment) => {
    setAppointments((prev) => [newApp, ...prev]);
  };

  const handleCancelAppointment = (appId: string) => {
    setAppointments((prev) =>
      prev.map((app) => (app.id === appId ? { ...app, status: 'Cancelled' as const } : app))
    );
  };

  // 1. Loading splash
  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center p-4 text-white">
        <div className="w-14 h-14 rounded-2xl bg-teal-500 text-slate-950 flex items-center justify-center mb-4 shadow-lg animate-pulse">
          <HeartPulse className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-bold font-serif">Sabaz weCare hospitals</h2>
        <p className="text-xs text-slate-400 mt-1 flex items-center gap-2">
          <RefreshCw className="w-3.5 h-3.5 animate-spin text-teal-400" />
          <span>Verifying Secure Healthcare Session...</span>
        </p>
      </div>
    );
  }

  // 2. Authentication Gate: If unauthenticated or phone OTP unverified for this session
  if (!currentUser || !phoneVerifiedSession) {
    return (
      <AuthPage
        onAuthenticated={() => {
          // Handled via context state update
        }}
      />
    );
  }

  // 3. Authenticated Hospital Portal
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col text-slate-900 font-sans">
      {/* Top Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenBooking={() => handleOpenBooking()}
        onOpenEmergency={() => setIsEmergencyOpen(true)}
        onOpenMyAppointments={() => setIsMyAppointmentsOpen(true)}
        appointments={appointments}
        userEmail={currentUser.email}
        userName={userProfile?.displayName || currentUser.displayName}
        onLogout={logout}
      />

      {/* Main View Area */}
      <main className="flex-1">
        {/* TAB 1: HOME PAGE */}
        {activeTab === 'home' && (
          <div>
            {/* Hero Section */}
            <HeroSection
              onOpenBooking={handleOpenBooking}
              onNavigateToTab={setActiveTab}
              onOpenEmergency={() => setIsEmergencyOpen(true)}
              onSelectDepartment={handleSelectDepartmentFromHero}
            />

            {/* Department Showcase Preview */}
            <DepartmentSection
              onSelectDepartment={(deptId) => {
                setDoctorsDeptFilter(deptId);
                setActiveTab('departments');
              }}
              onOpenBooking={handleOpenBooking}
              onSelectDoctor={(doc) => setSelectedDoctorForModal(doc)}
            />

            {/* Featured Doctors Section */}
            <section className="py-16 bg-slate-50 border-b border-slate-200">
              <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 pb-4 border-b border-slate-200 gap-4">
                  <div>
                    <span className="text-xs font-bold tracking-wider uppercase text-teal-700">
                      World-Class Clinical Faculty
                    </span>
                    <h2 className="text-3xl font-bold text-slate-900 font-serif">
                      Featured Specialist Doctors
                    </h2>
                    <p className="text-xs text-slate-500 mt-1">
                      Distinguished department directors and chief surgeons available for consultation
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      setDoctorsDeptFilter('all');
                      setActiveTab('doctors');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="text-xs font-semibold text-teal-700 hover:text-teal-800 flex items-center gap-1 self-start sm:self-auto bg-white px-3.5 py-2 rounded-lg border border-slate-200 shadow-xs transition-colors"
                  >
                    <span>View All 24 Specialists</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Grid of Marquee Doctors */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {DOCTORS.slice(0, 4).map((doc) => (
                    <div
                      key={doc.id}
                      className="bg-white rounded-xl border border-slate-200 hover:border-teal-400 p-5 shadow-xs transition-all flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center gap-3 mb-3">
                          <div
                            className={`w-12 h-12 rounded-xl bg-gradient-to-br ${doc.accentColor} text-white font-bold text-base flex items-center justify-center shrink-0 shadow-xs`}
                          >
                            {doc.initials}
                          </div>
                          <div className="min-w-0">
                            <span className="text-[11px] font-medium text-teal-700 block truncate">
                              {doc.departmentName}
                            </span>
                            <h3
                              onClick={() => setSelectedDoctorForModal(doc)}
                              className="text-sm font-bold text-slate-900 hover:text-teal-700 cursor-pointer truncate"
                            >
                              {doc.name}
                            </h3>
                          </div>
                        </div>

                        <p className="text-xs text-slate-500 line-clamp-1 mb-2">
                          {doc.title}
                        </p>

                        <div className="bg-slate-50 p-2 rounded text-[11px] text-slate-600 mb-3 space-y-0.5">
                          <div className="flex justify-between">
                            <span>Experience</span>
                            <span className="font-semibold text-slate-900">{doc.experienceYears} Years</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Fee</span>
                            <span className="font-bold text-slate-900 font-mono">${doc.consultationFee}</span>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100">
                        <button
                          onClick={() => setSelectedDoctorForModal(doc)}
                          className="py-1.5 px-2 text-[11px] font-semibold text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded text-center transition-colors"
                        >
                          Profile
                        </button>
                        <button
                          onClick={() => handleOpenBookingWithDoctor(doc.id, doc.departmentId)}
                          className="py-1.5 px-2 text-[11px] font-semibold text-white bg-teal-600 hover:bg-teal-700 rounded text-center transition-colors flex items-center justify-center gap-1"
                        >
                          <Calendar className="w-3 h-3" />
                          <span>Book</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Quick Booking Callout Banner */}
            <section className="py-14 bg-gradient-to-r from-teal-800 to-slate-900 text-white">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="space-y-2 text-center md:text-left">
                  <span className="text-xs font-bold text-teal-300 uppercase tracking-wider">
                    Instant Scheduling
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-bold font-serif">
                    Need an in-person or follow-up doctor appointment?
                  </h3>
                  <p className="text-xs sm:text-sm text-teal-100 max-w-xl">
                    Choose from 24 specialists across 8 departments. Immediate slot confirmation with printable OPD consultation pass.
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <button
                    onClick={() => handleOpenBooking()}
                    className="px-6 py-3 bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs rounded-lg shadow-sm transition-colors flex items-center gap-2"
                  >
                    <Calendar className="w-4 h-4" />
                    <span>Book Appointment Online</span>
                  </button>

                  <button
                    onClick={() => setIsEmergencyOpen(true)}
                    className="px-5 py-3 bg-white/10 hover:bg-white/20 text-white font-semibold text-xs rounded-lg border border-white/20 transition-colors flex items-center gap-2"
                  >
                    <Phone className="w-4 h-4 text-rose-400" />
                    <span>Emergency: 1800-WECARE</span>
                  </button>
                </div>
              </div>
            </section>

            {/* About & Trust Overview on Home */}
            <AboutSection
              onOpenBooking={() => handleOpenBooking()}
              onNavigateToTab={setActiveTab}
            />
          </div>
        )}

        {/* TAB 2: DEPARTMENTS PAGE */}
        {activeTab === 'departments' && (
          <div className="pt-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-6">
              <div className="bg-gradient-to-r from-slate-900 to-teal-950 text-white p-8 rounded-2xl">
                <span className="text-xs font-bold text-teal-400 uppercase tracking-wider block mb-1">
                  8 Quaternary Institutes of Medicine
                </span>
                <h1 className="text-3xl sm:text-4xl font-bold font-serif">
                  Clinical Departments & Centers of Excellence
                </h1>
                <p className="text-slate-300 text-xs sm:text-sm mt-2 max-w-2xl">
                  Every department at weCare Hospitals is staffed by multiple board-certified specialists, specialized critical care infrastructure, and cutting-edge surgical suites.
                </p>
              </div>
            </div>

            <DepartmentSection
              onSelectDepartment={(deptId) => {
                setDoctorsDeptFilter(deptId);
                setActiveTab('doctors');
              }}
              onOpenBooking={handleOpenBooking}
              onSelectDoctor={(doc) => setSelectedDoctorForModal(doc)}
            />
          </div>
        )}

        {/* TAB 3: DOCTOR DIRECTORY PAGE */}
        {activeTab === 'doctors' && (
          <div className="pt-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-6">
              <div className="bg-gradient-to-r from-teal-900 to-slate-900 text-white p-8 rounded-2xl">
                <span className="text-xs font-bold text-teal-400 uppercase tracking-wider block mb-1">
                  Faculty Directory
                </span>
                <h1 className="text-3xl sm:text-4xl font-bold font-serif">
                  Find a Doctor & Specialist
                </h1>
                <p className="text-slate-300 text-xs sm:text-sm mt-2 max-w-2xl">
                  Filter by medical department, clinical experience, or consultation days. Directly book an appointment with instant verification.
                </p>
              </div>
            </div>

            <DoctorDirectory
              onSelectDoctor={(doc) => setSelectedDoctorForModal(doc)}
              onOpenBookingWithDoctor={handleOpenBookingWithDoctor}
              initialDepartmentFilter={doctorsDeptFilter}
            />
          </div>
        )}

        {/* TAB 4: ABOUT PAGE */}
        {activeTab === 'about' && (
          <div className="pt-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-6">
              <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white p-8 rounded-2xl">
                <span className="text-xs font-bold text-teal-400 uppercase tracking-wider block mb-1">
                  Institutional Heritage & Mandate
                </span>
                <h1 className="text-3xl sm:text-4xl font-bold font-serif">
                  About weCare Hospitals
                </h1>
                <p className="text-slate-300 text-xs sm:text-sm mt-2 max-w-2xl">
                  Discover our clinical legacy, leadership, world-class accreditations, and commitment to compassionate patient outcomes.
                </p>
              </div>
            </div>

            <AboutSection
              onOpenBooking={() => handleOpenBooking()}
              onNavigateToTab={setActiveTab}
            />
          </div>
        )}
      </main>

      {/* Modals & Dialogs */}
      {/* 1. Doctor Profile Modal */}
      <DoctorProfileModal
        doctor={selectedDoctorForModal}
        onClose={() => setSelectedDoctorForModal(null)}
        onBookAppointment={(doctorId, deptId) => {
          setSelectedDoctorForModal(null);
          handleOpenBookingWithDoctor(doctorId, deptId);
        }}
      />

      {/* 2. Interactive Appointment Booking Flow */}
      <AppointmentBookingModal
        isOpen={isBookingOpen}
        onClose={() => {
          setIsBookingOpen(false);
          setBookingPrefillDeptId(undefined);
          setBookingPrefillDoctorId(undefined);
        }}
        preselectedDeptId={bookingPrefillDeptId}
        preselectedDoctorId={bookingPrefillDoctorId}
        onAppointmentCreated={handleAppointmentCreated}
        onViewMyAppointments={() => {
          setIsBookingOpen(false);
          setIsMyAppointmentsOpen(true);
        }}
        defaultPatientName={userProfile?.displayName || currentUser?.displayName || ''}
        defaultPatientEmail={currentUser?.email || ''}
        defaultPatientPhone={userProfile?.phoneNumber || ''}
      />

      {/* 3. My Appointments Management Modal */}
      <MyAppointmentsModal
        isOpen={isMyAppointmentsOpen}
        onClose={() => setIsMyAppointmentsOpen(false)}
        appointments={appointments}
        onCancelAppointment={handleCancelAppointment}
        onBookNew={() => {
          setIsMyAppointmentsOpen(false);
          handleOpenBooking();
        }}
      />

      {/* 4. 24/7 Emergency & Ambulance Dispatch Modal */}
      <EmergencyModal
        isOpen={isEmergencyOpen}
        onClose={() => setIsEmergencyOpen(false)}
      />

      {/* Footer */}
      <Footer
        onNavigateToTab={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenBooking={() => handleOpenBooking()}
        onOpenEmergency={() => setIsEmergencyOpen(true)}
        onOpenMyAppointments={() => setIsMyAppointmentsOpen(true)}
      />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <HospitalPortal />
    </AuthProvider>
  );
}
