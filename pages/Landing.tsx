
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Landing: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white flex flex-col items-center">
      {/* Header */}
      <nav className="w-full max-w-7xl px-8 h-20 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <svg className="w-8 h-8 text-[#c52828]" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
          </svg>
          <span className="text-2xl font-bold tracking-tight text-[#c52828]">CARDEON</span>
        </div>
        <div className="flex items-center gap-6">
          <button onClick={() => navigate('/login')} className="text-sm font-semibold text-gray-600 hover:text-gray-900 transition-colors">Login</button>
          <button onClick={() => navigate('/signup')} className="bg-[#c52828] text-white px-6 py-2.5 rounded-xl font-bold text-sm shadow-lg shadow-red-100 hover:bg-red-700 transition-all">Sign Up</button>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="flex-grow flex flex-col items-center justify-center text-center px-4 max-w-4xl py-20 animate-in fade-in zoom-in duration-1000">
        <div className="relative mb-8">
          <div className="animate-heartbeat-fast">
            <svg className="w-24 h-24 text-[#c52828]" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
          </div>
          {/* Subtle orbiting shadows/hearts if needed */}
        </div>

        <h1 className="text-8xl font-black text-[#c52828] mb-4 tracking-tighter uppercase">CARDEON</h1>
        <h2 className="text-3xl font-bold text-gray-700 mb-8">Heart Disease Predictability in Your Hands</h2>
        <p className="text-gray-500 text-lg leading-relaxed mb-12 max-w-2xl font-medium">
          An AI-powered, interpretable heart disease risk assessment platform using 
          advanced machine learning and explainable AI to provide transparent, clinically 
          meaningful predictions.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 mb-24">
          <button 
            onClick={() => navigate('/signup')} 
            className="bg-[#c52828] text-white px-10 py-4 rounded-xl font-bold text-lg shadow-xl shadow-red-200 hover:scale-105 transition-all flex items-center gap-2"
          >
            Get Started <span className="text-xl">→</span>
          </button>
          <button 
            onClick={() => navigate('/login')} 
            className="border-2 border-[#c52828] text-[#c52828] px-10 py-4 rounded-xl font-bold text-lg hover:bg-red-50 transition-all"
          >
            Sign In
          </button>
        </div>

        {/* Feature Ribbon */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-12 w-full max-w-3xl">
          <div className="flex items-center gap-3 justify-center text-gray-500 text-sm font-bold uppercase tracking-wide">
            <svg className="w-5 h-5 text-[#c52828]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
            Clinically Informed
          </div>
          <div className="flex items-center gap-3 justify-center text-gray-500 text-sm font-bold uppercase tracking-wide">
            <svg className="w-5 h-5 text-[#c52828]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
            UCI Dataset Trained
          </div>
          <div className="flex items-center gap-3 justify-center text-gray-500 text-sm font-bold uppercase tracking-wide">
            <svg className="w-5 h-5 text-[#c52828]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>
            XGBoost + SHAP
          </div>
        </div>
      </main>

      {/* Mouse Icon Decor */}
      <div className="mb-10 opacity-50 animate-bounce">
         <div className="w-6 h-10 border-2 border-red-200 rounded-full flex justify-center p-1">
           <div className="w-1 h-2 bg-red-400 rounded-full"></div>
         </div>
      </div>
    </div>
  );
};

export default Landing;
