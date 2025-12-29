
import React from 'react';

const HealthTips: React.FC = () => {
  const tips = [
    { title: 'Monitor Sodium Intake', desc: 'Excess salt increases blood pressure. Aim for less than 2,300mg of sodium per day.', category: 'Diet' },
    { title: 'The 150-Minute Rule', desc: 'Perform at least 150 minutes of moderate-intensity aerobic activity per week.', category: 'Exercise' },
    { title: 'Prioritize Sleep', desc: 'Adults need 7-9 hours of quality sleep to maintain vascular health and reduce inflammation.', category: 'Lifestyle' },
    { title: 'Fiber for Cholesterol', desc: 'Soluble fiber (found in oats, beans, and lentils) helps lower LDL ("bad") cholesterol.', category: 'Diet' },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-10">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900">Heart Health Education</h2>
        <p className="text-gray-500 mt-2">Clinical guidelines for a healthier cardiovascular lifestyle.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {tips.map((tip, idx) => (
          <div key={idx} className="bg-white border border-gray-100 p-8 rounded-2xl shadow-sm hover:shadow-md transition-all">
            <span className="inline-block px-2 py-0.5 bg-red-50 text-red-600 text-[10px] font-black uppercase rounded tracking-wider mb-4">
              {tip.category}
            </span>
            <h4 className="text-xl font-bold text-gray-900 mb-3">{tip.title}</h4>
            <p className="text-gray-600 leading-relaxed">{tip.desc}</p>
          </div>
        ))}
      </div>

      <div className="bg-gray-900 text-white p-10 rounded-3xl relative overflow-hidden">
        <div className="relative z-10">
          <h3 className="text-2xl font-bold mb-4">Professional Disclaimer</h3>
          <p className="text-gray-400 leading-relaxed">
            These tips are for awareness only and not a substitute for professional medical advice. 
            Always consult with a qualified cardiologist before making significant changes to your diet or exercise regimen.
          </p>
        </div>
        <div className="absolute top-0 right-0 p-8 text-gray-800 opacity-20">
          <svg className="w-48 h-48" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default HealthTips;
