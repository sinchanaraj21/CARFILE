
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Signup: React.FC<{ onLogin: (name: string, email: string) => void }> = ({ onLogin }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const normalizedEmail = email.trim().toLowerCase();
    
    // Get current registry
    const registry = JSON.parse(localStorage.getItem('cardeon_registry') || '[]');
    
    // Check if user already exists
    const userExists = registry.find((u: any) => u.email.trim().toLowerCase() === normalizedEmail);
    
    if (userExists) {
      setError("An account with this email already exists. Please sign in.");
      return;
    }

    // Add new user to registry
    const newUser = { name: name.trim(), email: normalizedEmail, password };
    registry.push(newUser);
    localStorage.setItem('cardeon_registry', JSON.stringify(registry));

    // Log in
    onLogin(newUser.name || normalizedEmail.split('@')[0], normalizedEmail);
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-white overflow-hidden">
      {/* Branding Half */}
      <div className="md:w-1/2 bg-soft-blush relative flex flex-col items-center justify-center p-12 overflow-hidden">
        <div className="absolute top-[10%] left-[10%] w-64 h-64 border border-red-100 rounded-full opacity-50"></div>
        <div className="absolute bottom-[-150px] left-[-100px] w-[500px] h-[500px] bg-white rounded-full opacity-30"></div>
        
        <div className="relative z-10 text-center space-y-8 animate-in zoom-in duration-700">
           <div className="flex justify-center">
             <div className="w-40 h-40 bg-white rounded-[60px] shadow-2xl shadow-red-50 flex items-center justify-center animate-float">
                <svg className="w-24 h-24 text-[#c52828]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                </svg>
             </div>
          </div>
          <div>
            <h1 className="text-5xl font-black text-[#c52828] mb-4 tracking-tight">Join CARDEON Today</h1>
            <p className="text-gray-500 font-semibold text-xl max-w-sm mx-auto leading-relaxed">
              Start your journey to better heart health with AI-powered insights.
            </p>
          </div>
        </div>
      </div>

      {/* Form Half */}
      <div className="md:w-1/2 flex items-center justify-center p-8 sm:p-12 lg:p-24 bg-white">
        <div className="w-full max-w-md space-y-10">
          <div className="space-y-4">
             <div className="flex items-center gap-2 mb-8">
               <svg className="w-6 h-6 text-[#c52828]" fill="currentColor" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
               <span className="text-xl font-bold text-[#c52828] tracking-tight">CARDEON</span>
            </div>
            <h2 className="text-5xl font-black text-gray-900 tracking-tighter">Create Account</h2>
            <p className="text-gray-500 font-medium">Get started with your free CARDEON account.</p>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-100 text-[#c52828] p-4 rounded-2xl text-sm font-bold animate-in fade-in slide-in-from-top-2">
              {error}
            </div>
          )}

          <form onSubmit={handleSignup} className="space-y-6">
            <div className="space-y-5">
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700">Full Name</label>
                <div className="relative group">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                  </span>
                  <input required type="text" value={name} onChange={e => setName(e.target.value)} className="w-full pl-12 pr-4 py-4 bg-white border border-gray-100 rounded-2xl outline-none focus:border-red-500 transition-all font-medium shadow-sm" placeholder="John Doe" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700">Email Address</label>
                <div className="relative group">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                  </span>
                  <input required type="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full pl-12 pr-4 py-4 bg-white border border-gray-100 rounded-2xl outline-none focus:border-red-500 transition-all font-medium shadow-sm" placeholder="you@example.com" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700">Password</label>
                <div className="relative group">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                  </span>
                  <input required type="password" value={password} onChange={e => setPassword(e.target.value)} className="w-full pl-12 pr-4 py-4 bg-white border border-gray-100 rounded-2xl outline-none focus:border-red-500 transition-all font-medium shadow-sm" placeholder="••••••••" />
                </div>
              </div>
            </div>

            <button type="submit" className="w-full bg-[#c52828] text-white font-bold py-5 rounded-2xl shadow-xl shadow-red-100 hover:bg-red-700 transition-all text-lg mt-4 flex items-center justify-center gap-2">
              Create Account <span>→</span>
            </button>
          </form>

          <div className="text-center">
            <p className="text-gray-500 font-medium">
              Already have an account? <Link to="/login" className="text-[#c52828] font-bold hover:underline">Sign In</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
