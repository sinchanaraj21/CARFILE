
import React, { useState } from 'react';
import { getPrediction } from '../services/geminiService';
import { PatientData, PredictionResult } from '../types';

const INITIAL_DATA: PatientData = {
  age: 52, sex: 0, cp: 0, trestbps: 128, chol: 204, fbs: 1,
  restecg: 1, thalach: 156, exang: 0, oldpeak: 1.0, slope: 1,
  ca: 0, thal: 2
};

interface InputFieldProps {
  label: string;
  name: string;
  options?: { label: string; value: number }[];
  placeholder?: string;
  value: number;
  onChange: (name: string, value: number) => void;
}

// Move InputField OUTSIDE to prevent remounting and focus loss
const InputField: React.FC<InputFieldProps> = ({ label, name, options, placeholder, value, onChange }) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-[13px] font-bold text-gray-700">{label}</label>
    {options ? (
      <select 
        value={value} 
        onChange={(e) => onChange(name, Number(e.target.value))}
        className="bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 outline-none focus:border-red-500 transition-all appearance-none cursor-pointer"
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
    ) : (
      <input 
        type="number"
        step="any"
        placeholder={placeholder}
        value={value === 0 && name !== 'ca' && name !== 'fbs' && name !== 'exang' ? '' : value}
        onChange={(e) => onChange(name, e.target.value === '' ? 0 : Number(e.target.value))}
        className="bg-gray-50/50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 outline-none focus:border-red-500 focus:bg-white transition-all shadow-sm"
      />
    )}
  </div>
);

const PredictNow: React.FC = () => {
  const [data, setData] = useState<PatientData>(INITIAL_DATA);
  const [result, setResult] = useState<PredictionResult | null>(null);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (name: string, value: number) => {
    setData(prev => ({ ...prev, [name]: value }));
  };

  const handlePredict = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const res = await getPrediction(data);
    setResult(res);
    setLoading(false);
  };

  const handleReset = () => {
    setData(INITIAL_DATA);
    setResult(null);
  };

  const downloadReport = () => {
    if (!result) return;

    const date = new Date().toLocaleDateString();
    const time = new Date().toLocaleTimeString();

    const htmlContent = `
<!DOCTYPE html>
<html>
<head>
    <style>
        body { font-family: 'Inter', sans-serif; margin: 0; padding: 0; color: #333; line-height: 1.5; }
        .header { background: #c52828; color: white; padding: 40px; position: relative; }
        .header h1 { margin: 0; font-size: 32px; font-weight: 900; letter-spacing: -1px; }
        .header p { margin: 5px 0 0; font-size: 14px; opacity: 0.9; }
        .meta { position: absolute; right: 40px; top: 40px; text-align: right; font-size: 12px; line-height: 1.4; }
        .container { padding: 40px; max-width: 800px; margin: 0 auto; }
        .section-title { font-size: 20px; font-weight: 800; margin: 40px 0 20px; border-bottom: 2px solid #f3f4f6; padding-bottom: 10px; color: #111; }
        .result-banner { background: ${result.riskCategory === 'Low' ? '#eefdf5' : '#fdf2f2'}; border: 1px solid ${result.riskCategory === 'Low' ? '#d1fae5' : '#fee2e2'}; border-radius: 12px; padding: 30px; margin-bottom: 30px; text-align: center; }
        .result-banner h2 { margin: 0; color: ${result.riskCategory === 'Low' ? '#10b981' : '#c52828'}; font-size: 24px; }
        .result-banner p { margin: 10px 0 0; color: #666; font-weight: 600; }
        .param-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin-bottom: 30px; }
        .param-item { font-size: 13px; }
        .param-label { font-weight: 700; color: #666; width: 120px; display: inline-block; }
        .shap-row { display: flex; align-items: center; margin-bottom: 15px; }
        .shap-label { width: 150px; font-size: 13px; font-weight: 700; }
        .shap-bar-bg { flex-grow: 1; height: 12px; background: #f3f4f6; border-radius: 6px; margin: 0 15px; overflow: hidden; position: relative; }
        .shap-bar { height: 100%; border-radius: 6px; }
        .shap-value { width: 60px; font-size: 13px; font-weight: 800; text-align: right; }
        .footer { background: #c52828; color: white; padding: 20px; text-align: center; font-size: 10px; font-weight: 700; margin-top: 60px; }
    </style>
</head>
<body>
    <div class="header">
        <h1>CARDEON</h1>
        <p>Heart Disease Predictability in Your Hands</p>
        <div class="meta">
            Report Date: ${date}<br>
            Time: ${time}
        </div>
    </div>
    <div class="container">
        <div class="section-title">Prediction Result</div>
        <div class="result-banner">
            <h2>${result.riskCategory === 'Low' ? 'No Heart Disease Detected' : 'Heart Disease Risk Detected'}</h2>
            <p>Confidence: ${result.probability.toFixed(1)}%</p>
        </div>

        <div class="section-title">Clinical Parameters</div>
        <div class="param-grid">
            <div class="param-item"><span class="param-label">Age:</span> ${data.age} years</div>
            <div class="param-item"><span class="param-label">Sex:</span> ${data.sex === 1 ? 'Male' : 'Female'}</div>
            <div class="param-item"><span class="param-label">Chest Pain:</span> ${['Typical', 'Atypical', 'Non-Anginal', 'Asymptomatic'][data.cp]}</div>
            <div class="param-item"><span class="param-label">Resting BP:</span> ${data.trestbps} mm Hg</div>
            <div class="param-item"><span class="param-label">Cholesterol:</span> ${data.chol} mg/dl</div>
            <div class="param-item"><span class="param-label">Fasting Sugar:</span> ${data.fbs === 1 ? '> 120 mg/dl' : '< 120 mg/dl'}</div>
            <div class="param-item"><span class="param-label">Resting ECG:</span> ${data.restecg}</div>
            <div class="param-item"><span class="param-label">Max HR:</span> ${data.thalach} bpm</div>
            <div class="param-item"><span class="param-label">Ex. Angina:</span> ${data.exang === 1 ? 'Yes' : 'No'}</div>
            <div class="param-item"><span class="param-label">ST Depression:</span> ${data.oldpeak.toFixed(1)}</div>
            <div class="param-item"><span class="param-label">ST Slope:</span> ${data.slope}</div>
            <div class="param-item"><span class="param-label">Major Vessels:</span> ${data.ca}</div>
            <div class="param-item"><span class="param-label">Thalassemia:</span> ${data.thal}</div>
        </div>

        <div class="section-title">Key Contributing Factors (SHAP Analysis)</div>
        ${result.shapExplanations.map(s => `
            <div class="shap-row">
                <div class="shap-label">${s.feature}</div>
                <div class="shap-bar-bg">
                    <div class="shap-bar" style="width: ${Math.min(Math.abs(s.impact) * 5, 100)}%; background: ${s.impact > 0 ? '#ef4444' : '#10b981'};"></div>
                </div>
                <div class="shap-value" style="color: ${s.impact > 0 ? '#ef4444' : '#10b981'}">${s.impact > 0 ? '+' : ''}${Math.round(s.impact)}%</div>
            </div>
        `).join('')}
    </div>
    <div class="footer">
        © CARDEON - Heart Disease Prediction System | Powered by XGBoost & SHAP
    </div>
</body>
</html>`;

    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Cardeon_Clinical_Report_${data.age}_${data.sex === 1 ? 'M' : 'F'}.html`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-7xl mx-auto py-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        
        {/* Left Panel: Inputs */}
        <section className="bg-white border border-gray-100 rounded-[32px] p-8 space-y-8 shadow-sm">
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center">
                <svg className="w-6 h-6 text-[#c52828]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
             </div>
             <h3 className="text-2xl font-black text-gray-900 tracking-tight">Clinical Parameters</h3>
          </div>

          <form onSubmit={handlePredict} className="space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-5">
              <InputField label="Age (years)" name="age" value={data.age} onChange={handleInputChange} />
              <InputField label="Sex" name="sex" value={data.sex} onChange={handleInputChange} options={[{label: 'Male', value: 1}, {label: 'Female', value: 0}]} />
              <InputField label="Chest Pain Type" name="cp" value={data.cp} onChange={handleInputChange} options={[{label: 'Typical Angina', value: 0}, {label: 'Atypical Angina', value: 1}, {label: 'Non-Anginal', value: 2}, {label: 'Asymptomatic', value: 3}]} />
              <InputField label="Resting Blood Pressure (mm Hg)" name="trestbps" value={data.trestbps} onChange={handleInputChange} />
              <InputField label="Serum Cholesterol (mg/dl)" name="chol" value={data.chol} onChange={handleInputChange} />
              <InputField label="Fasting Blood Sugar > 120 mg/dl" name="fbs" value={data.fbs} onChange={handleInputChange} options={[{label: 'No', value: 0}, {label: 'Yes', value: 1}]} />
              <InputField label="Resting ECG Results" name="restecg" value={data.restecg} onChange={handleInputChange} options={[{label: 'Normal', value: 0}, {label: 'ST-T Abnormality', value: 1}, {label: 'LV Hypertrophy', value: 2}]} />
              <InputField label="Max Heart Rate Achieved" name="thalach" value={data.thalach} onChange={handleInputChange} />
              <InputField label="Exercise Induced Angina" name="exang" value={data.exang} onChange={handleInputChange} options={[{label: 'No', value: 0}, {label: 'Yes', value: 1}]} />
              <InputField label="ST Depression (Oldpeak)" name="oldpeak" value={data.oldpeak} onChange={handleInputChange} />
              <InputField label="ST Segment Slope" name="slope" value={data.slope} onChange={handleInputChange} options={[{label: 'Upsloping', value: 0}, {label: 'Flat', value: 1}, {label: 'Downsloping', value: 2}]} />
              <InputField label="Major Vessels (0-3)" name="ca" value={data.ca} onChange={handleInputChange} options={[{label: '0', value: 0}, {label: '1', value: 1}, {label: '2', value: 2}, {label: '3', value: 3}]} />
              <div className="sm:col-span-2">
                <InputField label="Thalassemia" name="thal" value={data.thal} onChange={handleInputChange} options={[{label: 'Normal', value: 1}, {label: 'Fixed Defect', value: 2}, {label: 'Reversible Defect', value: 3}]} />
              </div>
            </div>

            <div className="flex gap-4 pt-4">
              <button 
                type="submit" 
                disabled={loading}
                className="flex-grow bg-[#c52828] text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-3 hover:bg-red-700 transition-all shadow-lg shadow-red-100 disabled:opacity-50 text-base"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/></svg>
                {loading ? 'Processing Analysis...' : 'Predict Risk'}
              </button>
              <button 
                type="button" 
                onClick={handleReset}
                className="w-16 h-14 border-2 border-gray-200 text-gray-400 rounded-2xl flex items-center justify-center hover:bg-gray-50 hover:border-red-200 hover:text-red-500 transition-all"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
              </button>
            </div>
          </form>
        </section>

        {/* Right Panel: Analysis Result */}
        <section className="space-y-6 sticky top-24">
          {!result ? (
            <div className="h-full min-h-[600px] bg-gray-50/50 border-2 border-dashed border-gray-200 rounded-[32px] flex flex-col items-center justify-center p-12 text-center space-y-6">
              <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center shadow-sm text-gray-300">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>
              </div>
              <div>
                <h4 className="text-xl font-bold text-gray-900">Analysis Pending</h4>
                <p className="text-sm text-gray-500 mt-2 max-w-xs font-medium">Configure the patient's parameters and execute diagnostic inference to see results.</p>
              </div>
            </div>
          ) : (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-8 duration-700">
              
              {/* Result Summary Card */}
              <div className={`p-8 rounded-[32px] border ${result.riskCategory === 'Low' ? 'bg-[#eefdf5] border-[#d1fae5]' : 'bg-[#fdf2f2] border-[#fee2e2]'} flex items-start gap-6 shadow-sm`}>
                 <div className={`w-14 h-14 rounded-full flex items-center justify-center shadow-sm shrink-0 ${result.riskCategory === 'Low' ? 'bg-white text-emerald-500' : 'bg-white text-red-500'}`}>
                   {result.riskCategory === 'Low' ? (
                     <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"/></svg>
                   ) : (
                     <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
                   )}
                 </div>
                 <div className="flex-grow space-y-1">
                   <h3 className={`text-2xl font-black ${result.riskCategory === 'Low' ? 'text-emerald-900' : 'text-red-900'}`}>
                     {result.riskCategory === 'Low' ? 'No Heart Disease Detected' : 'Heart Disease Detected'}
                   </h3>
                   <p className="text-sm font-medium text-gray-500">Based on the XGBoost model analysis of clinical features.</p>
                   
                   <div className="pt-6 space-y-3">
                      <div className="flex justify-between items-end text-sm">
                        <span className="font-bold text-gray-400 uppercase tracking-widest text-[10px]">Confidence Level</span>
                        <span className="font-black text-gray-900 text-lg">{result.probability.toFixed(1)}%</span>
                      </div>
                      <div className="h-3 bg-white/50 rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full transition-all duration-1000 ${result.riskCategory === 'Low' ? 'bg-emerald-500' : 'bg-red-500'}`}
                          style={{ width: `${result.probability}%` }}
                        ></div>
                      </div>
                   </div>
                 </div>
              </div>

              {/* SHAP Feature Importance */}
              <div className="bg-white border border-gray-100 rounded-[32px] p-8 space-y-8 shadow-sm">
                <div className="flex items-center gap-3">
                  <svg className="w-6 h-6 text-[#c52828]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
                  <h4 className="text-xl font-bold text-gray-900 tracking-tight">SHAP Feature Importance</h4>
                </div>
                <p className="text-sm text-gray-500 -mt-4 font-medium">How each clinical factor influenced your specific prediction</p>

                <div className="space-y-6 pt-2">
                  {result.shapExplanations.map((shap, i) => (
                    <div key={i} className="space-y-2">
                      <div className="flex justify-between items-center text-sm font-bold">
                        <span className="text-gray-800">{shap.feature}</span>
                        <div className="flex items-center gap-2">
                           <span className={shap.impact > 0 ? 'text-red-500' : 'text-emerald-500'}>
                             {shap.impact > 0 ? '+' : ''}{Math.round(shap.impact)}%
                           </span>
                        </div>
                      </div>
                      <div className="h-2 bg-gray-50 rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full transition-all duration-1000 ${shap.impact > 0 ? 'bg-red-500' : 'bg-emerald-500'}`}
                          style={{ width: `${Math.min(Math.abs(shap.impact) * 4, 100)}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>

                <button 
                  onClick={downloadReport}
                  className="w-full mt-6 py-4 bg-gray-900 text-white font-bold rounded-2xl hover:bg-black transition-all flex items-center justify-center gap-3"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
                  Download Complete Report
                </button>
              </div>

            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default PredictNow;
