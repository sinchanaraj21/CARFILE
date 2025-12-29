
import React from 'react';

const AboutUs: React.FC = () => {
  const technologies = [
    {
      title: 'UCI Heart Disease Dataset',
      desc: 'Trained on the Cleveland clinical records, ensuring model validity across diverse patient demographics and historical medical standards.',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      )
    },
    {
      title: 'XGBoost Architecture',
      desc: 'Utilizes a gradient-boosted decision tree framework for industry-leading accuracy in binary classification tasks and cardiovascular risk assessment.',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      )
    },
    {
      title: 'SHAP Interpretability',
      desc: 'Bridges the "black-box" gap by quantifying exactly how each clinical feature—from age to ECG results—influences the final risk score.',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
      )
    },
    {
      title: '13 Clinical Biomarkers',
      desc: 'Analyzes a holistic set of indicators including resting blood pressure, serum cholesterol levels, and exercise-induced angina symptoms.',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
        </svg>
      )
    }
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-24 py-10 animate-in fade-in slide-in-from-bottom-6 duration-1000">
      {/* Hero Vision */}
      <section className="text-center space-y-8">
        <div className="flex justify-center">
          <div className="w-20 h-20 bg-soft-blush rounded-[32px] flex items-center justify-center animate-heartbeat-fast shadow-xl shadow-red-50">
            <svg className="w-10 h-10 text-[#c52828]" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
          </div>
        </div>
        <div className="space-y-4">
          <h1 className="text-7xl font-black text-gray-900 tracking-tighter uppercase">About CARDEON</h1>
          <p className="text-2xl text-gray-400 font-medium max-w-3xl mx-auto leading-relaxed">
            CARDEON is an AI-powered heart disease prediction and explanation platform designed to 
            provide transparent, clinically informed cardiovascular risk assessments using advanced 
            machine learning techniques.
          </p>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="space-y-16">
        <div className="text-center space-y-2">
          <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight">Our Technology</h2>
          <p className="text-xs font-bold text-gray-400 uppercase tracking-[0.4em]">Built on state-of-the-art machine learning</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {technologies.map((tech, i) => (
            <div 
              key={i} 
              className="bg-white border border-gray-100 p-10 rounded-[40px] shadow-sm hover:shadow-2xl hover:border-red-100 transition-all group animate-in slide-in-from-bottom-8 duration-700"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <div className="w-14 h-14 bg-red-50 rounded-2xl flex items-center justify-center text-[#c52828] mb-6 group-hover:scale-110 transition-transform shadow-sm">
                {tech.icon}
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4 tracking-tight">{tech.title}</h3>
              <p className="text-gray-500 font-medium leading-relaxed">{tech.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="bg-soft-blush rounded-[60px] p-16 flex flex-col lg:flex-row gap-16 items-center">
        <div className="lg:w-1/2 space-y-6">
          <h2 className="text-5xl font-black text-gray-900 tracking-tighter">Clinical Integrity</h2>
          <p className="text-gray-600 text-lg font-medium leading-relaxed">
            Our mission is to empower clinicians and patients alike with secondary diagnostic 
            opinions rooted in statistical rigor. By utilizing SHAP (SHapley Additive exPlanations), 
            we move beyond simple prediction to true clinical insight.
          </p>
        </div>
        <div className="lg:w-1/2 w-full grid grid-cols-1 gap-4">
          {[
            "UCI Machine Learning Repository Validated",
            "Explainable AI (XAI) for Medical Trust",
            "Optimized for Early Detection Screening",
            "Peer-Reviewed Algorithmic Frameworks"
          ].map((item, i) => (
            <div key={i} className="bg-white p-6 rounded-2xl flex items-center gap-4 border border-white/50 shadow-sm transition-transform hover:translate-x-2">
              <div className="w-2 h-2 bg-[#c52828] rounded-full"></div>
              <span className="font-bold text-gray-700">{item}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
