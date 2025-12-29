
import React, { useState } from 'react';

const ContactUs: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Construct mailto link for direct sending
    const subject = encodeURIComponent(`CARDEON Inquiry from ${formData.name}`);
    const body = encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`);
    const mailtoUrl = `mailto:sinchanarajg21@gmail.com?subject=${subject}&body=${body}`;
    
    // Attempt to open the mail client
    window.location.href = mailtoUrl;
    
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', message: '' });
    }, 5000);
  };

  return (
    <div className="max-w-7xl mx-auto py-12 animate-in fade-in slide-in-from-bottom-6 duration-1000">
      <div className="flex flex-col items-center text-center space-y-4 mb-16">
        <h2 className="text-5xl font-black text-gray-900 tracking-tighter uppercase">Get in Touch</h2>
        <p className="text-gray-500 font-medium max-w-lg">
          Have questions regarding clinical implementation or system integration? 
          Drop us a message and we'll respond as soon as possible.
        </p>
      </div>

      <div className="max-w-2xl mx-auto bg-white border border-gray-100 p-10 rounded-[40px] shadow-sm relative overflow-hidden">
        {submitted ? (
          <div className="text-center py-20 animate-in zoom-in duration-500">
            <div className="w-24 h-24 bg-red-50 text-[#c52828] rounded-full flex items-center justify-center mx-auto mb-8 animate-heartbeat-fast shadow-xl shadow-red-50">
              <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-3xl font-bold text-gray-900 tracking-tight">Message Initialized</h3>
            <p className="text-gray-500 mt-3 font-medium">Your request is being routed to <span className="text-[#c52828] font-bold">sinchanarajg21@gmail.com</span>.</p>
            <p className="text-xs text-gray-400 mt-6 uppercase tracking-widest font-bold italic">Check your email client for confirmation.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Your Name</label>
                <div className="relative group">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                  </span>
                  <input 
                    required 
                    type="text" 
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full pl-12 pr-4 py-4 bg-gray-50/50 border border-gray-100 rounded-2xl outline-none focus:border-red-500 focus:bg-white transition-all font-medium" 
                    placeholder="John Doe" 
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Email Address</label>
                <div className="relative group">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                  </span>
                  <input 
                    required 
                    type="email" 
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full pl-12 pr-4 py-4 bg-gray-50/50 border border-gray-100 rounded-2xl outline-none focus:border-red-500 focus:bg-white transition-all font-medium" 
                    placeholder="you@example.com" 
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Your Message</label>
                <textarea 
                  required 
                  rows={6} 
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  className="w-full p-4 bg-gray-50/50 border border-gray-100 rounded-2xl outline-none focus:border-red-500 focus:bg-white transition-all font-medium resize-none" 
                  placeholder="How can we help you?"
                ></textarea>
              </div>
            </div>

            <button 
              type="submit" 
              className="w-full bg-[#c52828] text-white font-bold py-5 rounded-2xl hover:bg-red-700 transition-all flex items-center justify-center gap-3 shadow-xl shadow-red-100 text-lg"
            >
              <svg className="w-5 h-5 rotate-45" fill="currentColor" viewBox="0 0 24 24"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>
              Send Message
            </button>
          </form>
        )}
      </div>

      <div className="mt-20 text-center space-y-2 opacity-50">
        <p className="text-sm font-bold text-gray-500 uppercase tracking-[0.2em]">Contact Node Direct</p>
        <p className="text-lg font-black text-gray-900">sinchanarajg21@gmail.com</p>
      </div>
    </div>
  );
};

export default ContactUs;
