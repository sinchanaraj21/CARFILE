
import React, { useState, useEffect } from 'react';
import { Checkup } from '../types';

const Checkups: React.FC = () => {
  const [records, setRecords] = useState<Checkup[]>([]);
  const [showAdd, setShowAdd] = useState(false);
  const [newCheckup, setNewCheckup] = useState({ date: '', notes: '' });

  useEffect(() => {
    const saved = localStorage.getItem('cardeon_checkups');
    if (saved) setRecords(JSON.parse(saved));
  }, []);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    const checkup: Checkup = {
      id: Math.random().toString(36).substr(2, 9),
      date: newCheckup.date,
      notes: newCheckup.notes,
    };
    const updated = [checkup, ...records];
    setRecords(updated);
    localStorage.setItem('cardeon_checkups', JSON.stringify(updated));
    setShowAdd(false);
    setNewCheckup({ date: '', notes: '' });
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-10">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Health Records</h2>
          <p className="text-gray-500 mt-1">Manage your historical checkups and medical documentation.</p>
        </div>
        <button 
          onClick={() => setShowAdd(!showAdd)}
          className="bg-red-600 text-white font-bold px-6 py-2.5 rounded-xl hover:bg-red-700 transition-all flex items-center gap-2"
        >
          {showAdd ? 'Cancel' : 'Add Checkup'}
        </button>
      </div>

      {showAdd && (
        <div className="bg-white border border-red-100 p-8 rounded-2xl shadow-sm mb-10 animate-in slide-in-from-top-4 duration-300">
          <form onSubmit={handleAdd} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-gray-500 uppercase">Checkup Date</label>
                <input 
                  required 
                  type="date" 
                  value={newCheckup.date}
                  onChange={e => setNewCheckup({...newCheckup, date: e.target.value})}
                  className="bg-gray-50 border border-gray-200 rounded-lg p-3 outline-none focus:border-red-500"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-gray-500 uppercase">Upload Reports (PDF/JPG)</label>
                <input 
                  type="file" 
                  className="bg-gray-50 border border-gray-200 rounded-lg p-2.5 text-sm file:mr-4 file:py-1 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-bold file:bg-red-50 file:text-red-700 hover:file:bg-red-100"
                />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-gray-500 uppercase">Doctor's Notes / Observations</label>
              <textarea 
                rows={3} 
                required
                value={newCheckup.notes}
                onChange={e => setNewCheckup({...newCheckup, notes: e.target.value})}
                placeholder="e.g., Routine scan, blood pressure check..."
                className="bg-gray-50 border border-gray-200 rounded-lg p-3 outline-none focus:border-red-500"
              />
            </div>
            <button type="submit" className="bg-gray-900 text-white font-bold w-full py-3 rounded-xl">Save Record</button>
          </form>
        </div>
      )}

      <div className="space-y-4">
        {records.length === 0 ? (
          <div className="text-center py-20 bg-gray-50 rounded-2xl border border-gray-100">
            <p className="text-gray-400 font-medium">No historical records found.</p>
          </div>
        ) : (
          records.map((rec) => (
            <div key={rec.id} className="bg-white border border-gray-100 p-6 rounded-2xl shadow-sm flex flex-col md:flex-row md:items-center gap-6 group hover:border-red-200 transition-colors">
              <div className="flex flex-col items-center justify-center bg-red-50 rounded-xl p-4 w-24 h-24 shrink-0">
                <span className="text-xs font-black text-red-600 uppercase">{new Date(rec.date).toLocaleString('default', { month: 'short' })}</span>
                <span className="text-2xl font-black text-red-700">{new Date(rec.date).getDate()}</span>
                <span className="text-xs font-bold text-red-600">{new Date(rec.date).getFullYear()}</span>
              </div>
              <div className="flex-grow">
                <h4 className="text-lg font-bold text-gray-900 mb-1">Clinical Assessment</h4>
                <p className="text-gray-600 text-sm leading-relaxed">{rec.notes}</p>
              </div>
              <div className="flex items-center gap-4">
                 <button className="text-xs font-bold text-gray-400 hover:text-red-600 transition-colors">VIEW REPORT</button>
                 <button className="text-xs font-bold text-gray-400 hover:text-red-600 transition-colors">DELETE</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Checkups;
