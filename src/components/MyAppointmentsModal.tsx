import React, { useState } from 'react';
import {
  X,
  Calendar,
  Clock,
  MapPin,
  User,
  Trash2,
  Printer,
  Plus,
  AlertTriangle,
  CheckCircle,
  FileText
} from 'lucide-react';
import { Appointment } from '../data/hospitalData';

interface MyAppointmentsModalProps {
  isOpen: boolean;
  onClose: () => void;
  appointments: Appointment[];
  onCancelAppointment: (id: string) => void;
  onBookNew: () => void;
}

export const MyAppointmentsModal: React.FC<MyAppointmentsModalProps> = ({
  isOpen,
  onClose,
  appointments,
  onCancelAppointment,
  onBookNew
}) => {
  const [filter, setFilter] = useState<'all' | 'Confirmed' | 'Cancelled'>('all');
  const [cancelTargetId, setCancelTargetId] = useState<string | null>(null);

  if (!isOpen) return null;

  const filteredAppointments = appointments.filter((app) => {
    if (filter === 'all') return true;
    return app.status === filter;
  });

  const handlePrint = (app: Appointment) => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-200 flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-teal-600 text-white flex items-center justify-center">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900 font-serif">
                My Scheduled Appointments
              </h2>
              <p className="text-xs text-slate-500">
                Manage your consultations, print passes, or cancel bookings
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-700 p-1.5 rounded-lg hover:bg-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter & Actions Bar */}
        <div className="px-6 py-3 border-b border-slate-100 flex items-center justify-between bg-white text-xs">
          <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-lg">
            <button
              onClick={() => setFilter('all')}
              className={`px-3 py-1 font-semibold rounded-md transition-colors ${
                filter === 'all'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              All ({appointments.length})
            </button>
            <button
              onClick={() => setFilter('Confirmed')}
              className={`px-3 py-1 font-semibold rounded-md transition-colors ${
                filter === 'Confirmed'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Upcoming ({appointments.filter(a => a.status === 'Confirmed').length})
            </button>
            <button
              onClick={() => setFilter('Cancelled')}
              className={`px-3 py-1 font-semibold rounded-md transition-colors ${
                filter === 'Cancelled'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Cancelled ({appointments.filter(a => a.status === 'Cancelled').length})
            </button>
          </div>

          <button
            onClick={() => {
              onClose();
              onBookNew();
            }}
            className="px-3 py-1.5 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-lg flex items-center gap-1 shadow-xs transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>New Booking</span>
          </button>
        </div>

        {/* Appointments List */}
        <div className="p-6 overflow-y-auto space-y-4 flex-1">
          {filteredAppointments.length === 0 ? (
            <div className="text-center py-12 text-slate-500">
              <Calendar className="w-12 h-12 text-slate-300 mx-auto mb-2" />
              <p className="text-sm font-semibold text-slate-700">No appointments found</p>
              <p className="text-xs text-slate-500 mt-1">
                You have no scheduled consultations in this category.
              </p>
              <button
                onClick={() => {
                  onClose();
                  onBookNew();
                }}
                className="mt-4 px-4 py-2 text-xs font-semibold text-white bg-teal-600 hover:bg-teal-700 rounded-lg"
              >
                Book Your First Consultation
              </button>
            </div>
          ) : (
            filteredAppointments.map((app) => (
              <div
                key={app.id}
                className={`p-4 rounded-xl border transition-all ${
                  app.status === 'Confirmed'
                    ? 'border-slate-200 bg-white hover:border-teal-300 shadow-xs'
                    : 'border-slate-200 bg-slate-50 opacity-80'
                }`}
              >
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-mono text-xs font-bold text-slate-900 bg-slate-100 px-2 py-0.5 rounded">
                        {app.id}
                      </span>
                      <span
                        className={`text-[11px] font-bold px-2 py-0.5 rounded ${
                          app.status === 'Confirmed'
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : 'bg-rose-50 text-rose-700 border border-rose-200'
                        }`}
                      >
                        {app.status}
                      </span>
                      <span className="text-xs text-slate-500">
                        · {app.visitType}
                      </span>
                    </div>

                    <h3 className="font-bold text-slate-900 text-base">
                      {app.doctorName}
                    </h3>
                    <p className="text-xs text-slate-500">
                      {app.departmentName} · {app.opdRoom}
                    </p>
                  </div>

                  {app.status === 'Confirmed' && (
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handlePrint(app)}
                        className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg"
                        title="Print Appointment Pass"
                      >
                        <Printer className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setCancelTargetId(app.id)}
                        className="p-2 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded-lg"
                        title="Cancel Appointment"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>

                {/* Details grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 bg-slate-50 p-3 rounded-lg text-xs mb-3">
                  <div>
                    <span className="text-slate-400 block text-[11px]">Date & Time</span>
                    <span className="font-semibold text-slate-800">
                      {app.appointmentDate} at {app.timeSlot}
                    </span>
                  </div>

                  <div>
                    <span className="text-slate-400 block text-[11px]">Patient</span>
                    <span className="font-semibold text-slate-800 truncate block">
                      {app.patientName} ({app.patientAge}y)
                    </span>
                  </div>

                  <div className="col-span-2 sm:col-span-1">
                    <span className="text-slate-400 block text-[11px]">Contact Phone</span>
                    <span className="font-semibold text-slate-800">
                      {app.patientPhone}
                    </span>
                  </div>
                </div>

                {app.symptoms && (
                  <p className="text-xs text-slate-600 italic">
                    Note: "{app.symptoms}"
                  </p>
                )}

                {/* Cancel Confirmation Prompt */}
                {cancelTargetId === app.id && (
                  <div className="mt-3 p-3 bg-rose-50 border border-rose-200 rounded-lg flex items-center justify-between text-xs">
                    <span className="text-rose-800 font-medium">
                      Are you sure you want to cancel this booking?
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setCancelTargetId(null)}
                        className="px-2.5 py-1 text-slate-600 hover:bg-slate-200 rounded font-medium"
                      >
                        Keep
                      </button>
                      <button
                        onClick={() => {
                          onCancelAppointment(app.id);
                          setCancelTargetId(null);
                        }}
                        className="px-3 py-1 bg-rose-600 text-white rounded font-semibold hover:bg-rose-700"
                      >
                        Yes, Cancel
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 bg-slate-50 text-right">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-700 hover:text-slate-900"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
