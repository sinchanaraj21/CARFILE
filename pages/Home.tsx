
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { UserProfile } from '../types';

const Home: React.FC<{ user: UserProfile | null }> = ({ user }) => {
  const navigate = useNavigate();

  const stats = [
    { label: '95%', sub: 'Model Accuracy', model: 'XGBoost Model', iconColor: 'text-red-600', bgColor: 'bg-red-50' },
    { label: '13', sub: 'Clinical Features', model: 'UCI Dataset', iconColor: 'text-red-600', bgColor: 'bg-red-50' },
    { label: '100%', sub: 'Explainability', model: 'SHAP', iconColor: 'text-red-600', bgColor: 'bg-red-50' },
  ];

  const actions = [
    { title: 'Predict Now', icon: '🩺', path: '/predict' },
    { title: 'Check Ups', icon: '📋', path: '/checkups' },
    { title: 'Health Tips', icon: '💡', path: '/tips' },
    { title: 'Contact Us', icon: '💬', path: '/contact' },
  ];

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 space-y-12">
      {/* Welcome Banner */}
      <div className="bg-soft-blush rounded-[40px] p-12 relative overflow-hidden flex items-center min-h-[300px]">
        <div className="relative z-10 space-y-4 max-w-xl">
          <p className="text-red-600 font-bold">Welcome back,</p>
          <h2 className="text-6xl font-extrabold text-gray-900 tracking-tight">{user?.name}</h2>
          <p className="text-gray-500 text-lg font-medium leading-relaxed">
            Your heart health dashboard is ready. Start a new prediction or explore our resources to learn more about cardiovascular wellness.
          </p>
          <button 
            onClick={() => navigate('/predict')}
            className="mt-4 bg-[#c52828] text-white px-8 py-3.5 rounded-2xl font-bold flex items-center gap-2 hover:scale-105 transition-all shadow-lg shadow-red-100"
          >
            Start Prediction <span>→</span>
          </button>
        </div>
        {/* Heart Watermark */}
        <div className="absolute right-[-100px] top-[-50px] opacity-[0.05] pointer-events-none">
          <svg className="w-[600px] h-[600px] text-red-900" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
          </svg>
        </div>
        <div className="absolute right-10 top-1/2 -translate-y-1/2 opacity-20 hidden lg:block">
           <svg className="w-64 h-64 text-red-100" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
          </svg>
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white border border-gray-100 rounded-3xl p-8 flex flex-col justify-between h-52 group hover:shadow-xl transition-all">
            <div className="flex justify-between items-start">
              <div className={`${stat.bgColor} p-3 rounded-2xl`}>
                <svg className={`w-6 h-6 ${stat.iconColor}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {i === 0 && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />}
                  {i === 1 && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />}
                  {i === 2 && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />}
                </svg>
              </div>
              <span className="text-[10px] font-bold text-gray-400 bg-gray-50 px-3 py-1 rounded-full uppercase">{stat.model}</span>
            </div>
            <div>
              <p className="text-4xl font-black text-gray-900">{stat.label}</p>
              <p className="text-sm font-bold text-gray-400 mt-1 uppercase tracking-wider">{stat.sub}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="space-y-6">
        <h3 className="text-3xl font-bold text-gray-900 tracking-tight">Quick Actions</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {actions.map((action, i) => (
            <button 
              key={i}
              onClick={() => navigate(action.path)}
              className="bg-white border border-gray-100 rounded-3xl p-8 text-left hover:border-red-200 hover:shadow-lg transition-all flex flex-col gap-6 group"
            >
              <div className="w-12 h-12 bg-red-50 rounded-2xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                {action.icon}
              </div>
              <span className="text-xl font-bold text-gray-900">{action.title}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
