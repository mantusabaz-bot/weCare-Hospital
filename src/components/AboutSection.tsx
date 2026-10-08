import React from 'react';
import {
  ShieldCheck,
  Award,
  Building,
  Heart,
  Users,
  Clock,
  Sparkles,
  CheckCircle,
  FileText,
  Activity,
  HeartPulse
} from 'lucide-react';
import {
  HOSPITAL_ACCREDITATIONS,
  HOSPITAL_TESTIMONIALS,
  HOSPITAL_STATS
} from '../data/hospitalData';

interface AboutSectionProps {
  onOpenBooking: () => void;
  onNavigateToTab: (tab: 'departments' | 'doctors') => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({
  onOpenBooking,
  onNavigateToTab
}) => {
  return (
    <section id="about" className="py-16 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-16">
        {/* Heritage & Mission */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-5">
            <span className="text-xs font-bold tracking-wider uppercase text-teal-700">
              Institutional Heritage & Vision
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 font-serif leading-tight">
              A quarter-century of pioneering clinical excellence and compassionate healing.
            </h2>
            <p className="text-slate-600 leading-relaxed text-sm">
              Established in 2001, <strong className="text-slate-900 font-semibold">weCare Hospitals</strong> has grown into an international quaternary healthcare destination. With over 650 inpatient beds, 140 dedicated intensive care units, and 28 state-of-the-art laminar airflow operating theaters, we deliver hope in the most demanding clinical scenarios.
            </p>
            <p className="text-slate-600 leading-relaxed text-sm">
              Our multidisciplinary care pathways ensure that no clinical decision is made in isolation. Complex cardiac cases, neurovascular emergencies, and rare oncological conditions are deliberated in organ-specific tumor boards and rapid emergency councils.
            </p>

            <div className="pt-2 flex flex-wrap gap-4">
              <button
                onClick={() => onNavigateToTab('doctors')}
                className="px-5 py-2.5 bg-teal-600 hover:bg-teal-700 text-white rounded-lg text-xs font-semibold shadow-xs transition-colors"
              >
                Explore Medical Faculty
              </button>
              <button
                onClick={() => onNavigateToTab('departments')}
                className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg text-xs font-semibold transition-colors"
              >
                View 8 Clinical Institutes
              </button>
            </div>
          </div>

          <div className="lg:col-span-5 bg-slate-50 border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-teal-600 text-white flex items-center justify-center">
                <HeartPulse className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-base font-serif">
                  The weCare Clinical Oath
                </h3>
                <span className="text-xs text-slate-500">
                  Four Non-Negotiable Tenets
                </span>
              </div>
            </div>

            <div className="space-y-3.5 text-xs text-slate-700">
              <div className="flex items-start gap-2.5">
                <span className="font-bold text-teal-700 font-mono">01.</span>
                <div>
                  <strong className="text-slate-900 block font-semibold">Patient-Centric Transparent Care</strong>
                  <span>Every diagnosis, treatment pathway, and expected cost is discussed openly with patient and kin.</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <span className="font-bold text-teal-700 font-mono">02.</span>
                <div>
                  <strong className="text-slate-900 block font-semibold">Uncompromised Infection Control</strong>
                  <span>Zero-tolerance sterile laminar flow air filtration ensuring infection rates below 0.2%.</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <span className="font-bold text-teal-700 font-mono">03.</span>
                <div>
                  <strong className="text-slate-900 block font-semibold">Evidence-Based Clinical Protocols</strong>
                  <span>Care pathways calibrated to international guidelines from ACC, AHA, ESMO, and NICE UK.</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <span className="font-bold text-teal-700 font-mono">04.</span>
                <div>
                  <strong className="text-slate-900 block font-semibold">Rapid Emergency Golden-Hour Response</strong>
                  <span>24/7 dedicated acute stroke, STEMI heart attack, and multi-trauma response teams.</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Global Accreditations Bar */}
        <div className="bg-slate-900 text-white rounded-2xl p-8 sm:p-10 space-y-6">
          <div className="max-w-2xl">
            <span className="text-xs font-bold text-teal-400 uppercase tracking-wider block mb-1">
              Quality Assurance & Certifications
            </span>
            <h3 className="text-2xl font-bold font-serif">
              International Healthcare Benchmarks
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Our clinical and laboratory workflows adhere rigorously to worldwide gold standards.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {HOSPITAL_ACCREDITATIONS.map((acc, i) => (
              <div
                key={i}
                className="bg-slate-800/80 border border-slate-700 rounded-xl p-4 space-y-2 hover:border-teal-500/50 transition-colors"
              >
                <div className="flex items-center justify-between text-xs">
                  <Award className="w-4 h-4 text-teal-400" />
                  <span className="text-[11px] text-slate-400 font-mono tabular-nums">
                    {acc.year}
                  </span>
                </div>
                <h4 className="font-bold text-sm text-slate-100">
                  {acc.name}
                </h4>
                <p className="text-xs text-slate-400">
                  {acc.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Clinical Infrastructure Highlights */}
        <div className="space-y-6">
          <div className="text-center max-w-xl mx-auto space-y-1">
            <span className="text-xs font-bold tracking-wider uppercase text-teal-700">
              Quaternary Infrastructure
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 font-serif">
              High-Precision Medical Technology
            </h3>
            <p className="text-xs text-slate-500">
              Equipped with next-generation diagnostic and therapeutic platforms
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
              <div className="w-10 h-10 rounded-lg bg-teal-100 text-teal-800 flex items-center justify-center">
                <Building className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-slate-900 text-base">
                Robotic Surgery Center
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Featuring the Mako Robotic-Arm Joint system and da Vinci Xi robotic consoles for sub-millimeter surgical accuracy, minimal incision trauma, and expedited recovery times.
              </p>
            </div>

            <div className="p-6 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
              <div className="w-10 h-10 rounded-lg bg-teal-100 text-teal-800 flex items-center justify-center">
                <Activity className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-slate-900 text-base">
                Bi-Plane Cath Labs & 3T MRI
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Two hybrid bi-plane cardiovascular suites alongside ultra-quiet 3T MRI and 256-slice CT scanners enabling non-invasive vascular and neurological mapping in minutes.
              </p>
            </div>

            <div className="p-6 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
              <div className="w-10 h-10 rounded-lg bg-teal-100 text-teal-800 flex items-center justify-center">
                <Clock className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-slate-900 text-base">
                Level III NICU & Critical Care
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Dedicated neonatal and pediatric intensive care wings with high-frequency oscillatory ventilation, therapeutic hypothermia, and bedside telemetry.
              </p>
            </div>
          </div>
        </div>

        {/* Verified Patient Outcomes & Testimonials */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
            <div>
              <span className="text-xs font-bold tracking-wider uppercase text-teal-700">
                Patient Journeys
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 font-serif">
                Stories of Healing and Hope
              </h3>
            </div>
            <span className="text-xs text-slate-500">
              Verified clinical case reviews
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {HOSPITAL_TESTIMONIALS.map((t) => (
              <div
                key={t.id}
                className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span className="font-semibold text-teal-700">
                      {t.department}
                    </span>
                    <span className="font-mono tabular-nums">{t.date}</span>
                  </div>

                  <p className="text-xs text-slate-700 italic leading-relaxed">
                    "{t.quote}"
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <h5 className="font-bold text-slate-900 text-xs">
                      {t.patientName}
                    </h5>
                    <span className="text-[11px] text-slate-500">
                      Procedure: {t.procedure}
                    </span>
                  </div>
                  <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    Verified
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Visiting Hours & Patient Amenities */}
        <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6 sm:p-8">
          <h4 className="font-bold text-slate-900 text-base font-serif mb-4">
            Patient & Visitor Information
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs text-slate-600">
            <div>
              <strong className="text-slate-900 block font-semibold mb-1">
                General Visiting Hours
              </strong>
              <p>Inpatient Rooms: 10:00 AM – 12:00 PM & 04:30 PM – 07:00 PM daily.</p>
              <p className="mt-1">ICU Visits: 05:00 PM – 06:00 PM (1 attendant per patient).</p>
            </div>
            <div>
              <strong className="text-slate-900 block font-semibold mb-1">
                Outpatient Clinics (OPD)
              </strong>
              <p>Monday to Saturday: 08:30 AM – 07:00 PM.</p>
              <p className="mt-1">Emergency Department: Open 24 Hours, 365 Days.</p>
            </div>
            <div>
              <strong className="text-slate-900 block font-semibold mb-1">
                Pharmacy & Diagnostics
              </strong>
              <p>Central In-House Pharmacy: Open 24/7 with home delivery.</p>
              <p className="mt-1">Pathology & Radiology: 24/7 with digital report access.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
