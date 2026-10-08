import React, { useState } from 'react';
import {
  X,
  Phone,
  AlertTriangle,
  Ambulance,
  MapPin,
  Clock,
  CheckCircle,
  ShieldAlert
} from 'lucide-react';

interface EmergencyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const EmergencyModal: React.FC<EmergencyModalProps> = ({
  isOpen,
  onClose
}) => {
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [emergencyType, setEmergencyType] = useState('Cardiac / Chest Pain');
  const [dispatched, setDispatched] = useState(false);
  const [dispatchCode, setDispatchCode] = useState('');

  if (!isOpen) return null;

  const handleDispatch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone) return;
    const code = `AMB-${Math.floor(100 + Math.random() * 900)}`;
    setDispatchCode(code);
    setDispatched(true);
  };

  const handleReset = () => {
    setDispatched(false);
    setAddress('');
    setPhone('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs">
      <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-red-200 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Urgent Header */}
        <div className="bg-red-600 text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
              <Ambulance className="w-6 h-6 text-white animate-pulse" />
            </div>
            <div>
              <h2 className="text-lg font-bold">
                24/7 Emergency & Trauma Response
              </h2>
              <span className="text-xs text-red-100 font-medium">
                weCare Hospitals Level-1 Emergency Bay
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-white/80 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6 text-sm">
          {/* Urgent Direct Helpline Numbers */}
          <div className="bg-rose-50 border border-rose-200 rounded-xl p-4 space-y-3">
            <span className="text-xs font-bold text-rose-800 uppercase tracking-wide block">
              Immediate Voice Helplines
            </span>
            <div className="grid grid-cols-2 gap-3 text-xs">
              <a
                href="tel:18009322731"
                className="bg-white p-2.5 rounded-lg border border-rose-200 text-rose-800 font-bold flex items-center gap-2 hover:bg-rose-100/50 transition-colors"
              >
                <Phone className="w-4 h-4 text-rose-600" />
                <span>1800-WECARE</span>
              </a>
              <a
                href="tel:911"
                className="bg-white p-2.5 rounded-lg border border-rose-200 text-rose-800 font-bold flex items-center gap-2 hover:bg-rose-100/50 transition-colors"
              >
                <Phone className="w-4 h-4 text-rose-600" />
                <span>Direct ER: (800) 932-2731</span>
              </a>
            </div>
            <p className="text-[11px] text-rose-700">
              Trauma surgeons, cardiologists, and acute stroke neurologists are on-duty 24 hours a day.
            </p>
          </div>

          {/* Quick Ambulance Dispatch Form */}
          {!dispatched ? (
            <form onSubmit={handleDispatch} className="space-y-4">
              <div className="space-y-1">
                <h3 className="font-bold text-slate-900 text-sm">
                  Request Immediate GPS Ambulance Dispatch
                </h3>
                <p className="text-xs text-slate-500">
                  Advanced Life Support (ALS) vehicle with telemetry and paramedic crew
                </p>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Type of Emergency *
                </label>
                <select
                  value={emergencyType}
                  onChange={(e) => setEmergencyType(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  <option value="Cardiac / Chest Pain">Severe Chest Pain / Possible Heart Attack</option>
                  <option value="Acute Stroke / Facial Droop">Stroke Symptoms (Speech difficulty / Facial droop)</option>
                  <option value="Poly-Trauma / Accident">Road Accident / Severe Physical Trauma</option>
                  <option value="Severe Breathing Distress">Severe Asthma / Respiratory Failure</option>
                  <option value="Pediatric Emergency">Pediatric / Infant High Fever or Convulsion</option>
                  <option value="Obstetric Emergency">Labor Complications / High-Risk Pregnancy</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Patient Location / Pickup Address *
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Enter street address, building, landmark..."
                    className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Contact Phone Number *
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Your mobile number for driver callback..."
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg transition-colors shadow-sm flex items-center justify-center gap-2"
              >
                <Ambulance className="w-4 h-4" />
                <span>Dispatch Nearest ALS Ambulance Now</span>
              </button>
            </form>
          ) : (
            <div className="text-center py-4 space-y-3">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                <CheckCircle className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-slate-900 text-base">
                Ambulance Dispatched!
              </h3>
              <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 text-xs space-y-1">
                <div>
                  Unit Tracking Code: <strong className="font-mono text-slate-900">{dispatchCode}</strong>
                </div>
                <div>
                  Estimated Arrival Time: <strong className="text-red-600">6 - 9 minutes</strong>
                </div>
                <div>Emergency Triage Team has been notified.</div>
              </div>
              <p className="text-xs text-slate-500">
                Please keep line <strong className="text-slate-800">{phone}</strong> open for the paramedic driver.
              </p>
              <button
                type="button"
                onClick={handleReset}
                className="px-5 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg"
              >
                Close Window
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
