import React, { useState } from 'react';
import { Users, Calendar, Shield, Trash2, Plus } from 'lucide-react';

interface Patient {
  id: number;
  name: string;
  age: number;
  condition: string;
  doctorNotes: string;
}

interface Appointment {
  id: number;
  patientName: string;
  doctorName: string;
  date: string;
  time: string;
}

export const HospitalManagementSystem: React.FC = () => {
  const [role, setRole] = useState<'Admin' | 'Doctor' | 'Patient'>('Doctor');

  // Simulated CRUD DB Storage
  const [patients, setPatients] = useState<Patient[]>([
    { id: 1, name: "Alice Jenkins", age: 34, condition: "Severe Asthma", doctorNotes: "Administered Albuterol nebulizer. Scheduled follow-up spirometry." },
    { id: 2, name: "Bob Miller", age: 52, condition: "Type 2 Diabetes Monitoring", doctorNotes: "A1C is 7.2. Recommended metformin dose increase. Diet adjustment required." }
  ]);

  const [appointments, setAppointments] = useState<Appointment[]>([
    { id: 1, patientName: "Alice Jenkins", doctorName: "Dr. Jules Architect", date: "2026-07-16", time: "10:30 AM" }
  ]);

  // Form states
  const [newPatientName, setNewPatientName] = useState('');
  const [newPatientAge, setNewPatientAge] = useState('');
  const [newPatientCondition, setNewPatientCondition] = useState('');
  const [newPatientNotes, setNewPatientNotes] = useState('');

  const [apptPatient, setApptPatient] = useState('');
  const [apptDate, setApptDate] = useState('');
  const [apptTime, setApptTime] = useState('');

  // Diagnostics preview states
  const [mriScannerText, setMriScannerText] = useState("Scan ID: #MRI-8240 - Normal sagittal cerebral imaging. No acute intracranial hemorrhage or mass effect identified.");

  const handleAddPatient = (e: React.FormEvent) => {
    e.preventDefault();
    if (role === 'Patient') {
      alert("Permission Denied: Patients cannot add diagnostic medical charts!");
      return;
    }
    if (!newPatientName || !newPatientAge || !newPatientCondition) {
      alert("Please fill in patient core fields.");
      return;
    }
    const nextId = patients.length > 0 ? Math.max(...patients.map(p => p.id)) + 1 : 1;
    setPatients([
      ...patients,
      { id: nextId, name: newPatientName, age: parseInt(newPatientAge), condition: newPatientCondition, doctorNotes: newPatientNotes }
    ]);
    setNewPatientName('');
    setNewPatientAge('');
    setNewPatientCondition('');
    setNewPatientNotes('');
  };

  const handleDeletePatient = (id: number) => {
    if (role !== 'Admin') {
      alert("Permission Denied: Only Admin roles have delete permissions for diagnostic charts!");
      return;
    }
    setPatients(patients.filter(p => p.id !== id));
  };

  const handleBookAppointment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!apptPatient || !apptDate || !apptTime) {
      alert("Please fill in scheduling parameters.");
      return;
    }
    const nextId = appointments.length > 0 ? Math.max(...appointments.map(a => a.id)) + 1 : 1;
    setAppointments([
      ...appointments,
      { id: nextId, patientName: apptPatient, doctorName: "Dr. Jules Architect", date: apptDate, time: apptTime }
    ]);
    setApptPatient('');
    setApptDate('');
    setApptTime('');
    alert("Appointment successfully registered in the secure ledger!");
  };

  return (
    <div className="space-y-8 py-4">
      <div className="border-b border-slate-200 dark:border-slate-800 pb-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">Hospital Management System</h1>
          <p className="text-slate-500 dark:text-slate-400">Experience a secure clinical database simulating full medical chart CRUD operations, appointment schedulers, and MRI preview scans.</p>
        </div>

        {/* Role Switcher RBAC simulated */}
        <div className="flex bg-slate-100 dark:bg-slate-900 p-1 rounded-xl w-fit self-start border border-slate-200 dark:border-slate-800">
          {['Admin', 'Doctor', 'Patient'].map((r: any) => (
            <button
              key={r}
              onClick={() => setRole(r)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1 cursor-pointer transition-all ${
                role === r
                  ? 'bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Shield className="h-3 w-3" /> {r} Mode
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

        {/* LHS: Diagnostic Patient Registry CRUD */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800/80">
              <h3 className="font-extrabold text-slate-900 dark:text-white text-base flex items-center gap-1.5">
                <Users className="h-5 w-5 text-indigo-500" /> Patient Medical Index
              </h3>
              <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Clinical Database Record</span>
            </div>

            <div className="space-y-4">
              {patients.length === 0 ? (
                <div className="text-center py-8 text-slate-400 text-xs">No patient chart data registered. Feel free to insert notes.</div>
              ) : (
                patients.map(p => (
                  <div key={p.id} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-150 dark:border-slate-850 flex flex-col md:flex-row justify-between gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-slate-900 dark:text-white">{p.name}</span>
                        <span className="px-2 py-0.5 rounded-md bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-[10px] font-bold">Age: {p.age}</span>
                      </div>
                      <div className="text-xs text-slate-500 font-medium">Condition: <span className="font-bold text-slate-700 dark:text-slate-300">{p.condition}</span></div>
                      <div className="text-xs italic text-slate-600 dark:text-slate-400 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/50 p-2.5 rounded-lg leading-relaxed">
                        Notes: {p.doctorNotes || "Awaiting diagnosis formulation..."}
                      </div>
                    </div>

                    <div className="flex items-start">
                      {role === 'Admin' ? (
                        <button
                          onClick={() => handleDeletePatient(p.id)}
                          className="px-2.5 py-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-600 dark:bg-rose-950/20 dark:hover:bg-rose-950/40 dark:text-rose-400 text-xs font-bold flex items-center gap-1 transition-colors cursor-pointer"
                        >
                          <Trash2 className="h-3.5 w-3.5" /> Remove
                        </button>
                      ) : (
                        <span className="text-[10px] text-slate-400 font-semibold italic">Requires Admin to Purge</span>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Create Patient (CRUD) Form */}
          {role !== 'Patient' ? (
            <form onSubmit={handleAddPatient} className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
              <h4 className="font-extrabold text-sm text-slate-900 dark:text-white flex items-center gap-1">
                <Plus className="h-4 w-4" /> Add Diagnostic Patient Chart
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-semibold">
                <div>
                  <label className="block text-slate-400 mb-1">Full Name</label>
                  <input required type="text" value={newPatientName} onChange={(e) => setNewPatientName(e.target.value)} placeholder="E.g., John Smith" className="w-full p-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-900 dark:text-white" />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Age</label>
                  <input required type="number" value={newPatientAge} onChange={(e) => setNewPatientAge(e.target.value)} placeholder="E.g., 42" className="w-full p-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-900 dark:text-white" />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Primary Symptoms / Condition</label>
                  <input required type="text" value={newPatientCondition} onChange={(e) => setNewPatientCondition(e.target.value)} placeholder="E.g., High Blood Pressure" className="w-full p-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-900 dark:text-white" />
                </div>
              </div>

              <div className="text-xs font-semibold">
                <label className="block text-slate-400 mb-1">Physician Clinical Diagnostics Notes</label>
                <textarea rows={3} value={newPatientNotes} onChange={(e) => setNewPatientNotes(e.target.value)} placeholder="Enter details about medication, dosage, therapy plans, or MRI evaluation suggestions..." className="w-full p-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-900 dark:text-white" />
              </div>

              <button type="submit" className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl cursor-pointer">
                Commit Medical Chart to Registry
              </button>
            </form>
          ) : (
            <div className="p-6 bg-slate-100 dark:bg-slate-900/40 rounded-3xl border border-dashed border-slate-200 dark:border-slate-800 text-center text-xs text-slate-400">
              Your active role is <span className="font-bold">Patient</span>. Switch to Doctor or Admin role inside the header panel to access and execute Medical Chart creations.
            </div>
          )}
        </div>

        {/* RHS: Schedulers & MRI Scanner Diagnostics Preview */}
        <div className="lg:col-span-4 space-y-6">

          {/* Scheduling Appts panel */}
          <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <h4 className="font-extrabold text-sm text-slate-900 dark:text-white flex items-center gap-1.5">
              <Calendar className="h-4 w-4 text-indigo-500" /> Book Consultation
            </h4>

            <form onSubmit={handleBookAppointment} className="space-y-3 text-xs font-semibold">
              <div>
                <label className="block text-slate-400 mb-1">Select Patient</label>
                <input required type="text" value={apptPatient} onChange={(e) => setApptPatient(e.target.value)} placeholder="E.g., Alice Jenkins" className="w-full p-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-900 dark:text-white" />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-slate-400 mb-1">Consultation Date</label>
                  <input required type="date" value={apptDate} onChange={(e) => setApptDate(e.target.value)} className="w-full p-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-900 dark:text-white text-[10px]" />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Time Slot</label>
                  <input required type="text" value={apptTime} onChange={(e) => setApptTime(e.target.value)} placeholder="E.g., 2:30 PM" className="w-full p-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-900 dark:text-white" />
                </div>
              </div>

              <button type="submit" className="w-full py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-lg cursor-pointer">
                Confirm Booking Slot
              </button>
            </form>

            <div className="border-t border-slate-100 dark:border-slate-800 pt-3 space-y-2">
              <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block">Upcoming Consultations Ledger</span>
              <div className="space-y-2 max-h-[110px] overflow-y-auto">
                {appointments.map(a => (
                  <div key={a.id} className="p-2 rounded bg-slate-50 dark:bg-slate-950 text-[10px] flex justify-between items-center border border-slate-100 dark:border-slate-800">
                    <div>
                      <div className="font-bold text-slate-800 dark:text-slate-200">{a.patientName}</div>
                      <div className="text-slate-400">{a.doctorName}</div>
                    </div>
                    <div className="text-right text-indigo-600 dark:text-indigo-400 font-bold">
                      <div>{a.date}</div>
                      <div>{a.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* MRI Diagnostics Visual mock panel */}
          <div className="bg-slate-950 p-6 rounded-3xl border border-slate-800 text-white space-y-4">
            <h4 className="font-extrabold text-sm text-indigo-400 flex items-center gap-1.5">
              MRI Scanner Diagnostics preview
            </h4>

            {/* Simulated Brain Scanner Plate */}
            <div className="relative aspect-square max-w-[180px] mx-auto rounded-full bg-slate-900 border border-indigo-500/30 overflow-hidden flex items-center justify-center p-4 shadow-inner">
              <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/5 via-teal-500/5 to-transparent animate-pulse"></div>
              {/* Core skull profile mock visual */}
              <div className="w-20 h-24 rounded-full border-4 border-dashed border-indigo-400/40 opacity-55 animate-spin"></div>
              <div className="absolute font-mono text-[9px] text-teal-400 bottom-3">SCANNER ONLINE</div>
            </div>

            <textarea
              value={mriScannerText}
              onChange={(e) => setMriScannerText(e.target.value)}
              rows={3}
              className="w-full text-[10px] font-mono bg-slate-900/50 p-3 rounded-lg border border-slate-800 text-slate-300 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>

        </div>

      </div>
    </div>
  );
};
export default HospitalManagementSystem;
