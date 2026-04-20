import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, MessageSquare, Calendar, Send, CheckCircle } from 'lucide-react';

const JoinBeta = () => {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phoneNo: '',
    reason: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

 const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await fetch("http://localhost:3001/api/waitlist", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    });

    const data = await response.json();

    if (response.ok) {
      console.log("Success:", data);
      setSubmitted(true);
    } else {
      alert(data.message || "Failed to submit form");
    }

  } catch (error) {
    console.error("Error submitting form:", error);
    alert("Server error. Please try again.");
  }
};

  if (submitted) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 flex items-center justify-center min-h-[70vh]">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass p-12 rounded-3xl text-center max-w-md w-full"
        >
          <div className="w-20 h-20 bg-light-green/20 text-light-green-dark rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={48} />
          </div>
          <h2 className="text-3xl font-bold text-slate-950 mb-4">You're on the list!</h2>
          <p className="text-slate-600 mb-8">
            Thank you for joining our Beta program. We'll reach out to <strong>{formData.email}</strong> as soon as we're ready for you.
          </p>
          <button 
            onClick={() => setSubmitted(false)}
            className="w-full bg-light-green-dark hover:bg-light-green text-white font-bold py-4 rounded-2xl transition-all shadow-lg shadow-light-green/20"
          >
            Back to Home
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full flex flex-col items-center relative overflow-hidden">
      {/* Background Decorators */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-light-green/10 rounded-full blur-[120px] z-[-1]" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-sky-blue/10 rounded-full blur-[120px] z-[-1]" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12 max-w-2xl px-4"
      >
        <span className="inline-block px-4 py-1.5 rounded-full bg-light-green/20 text-light-green-dark font-bold text-sm mb-4 border border-light-green/40">
          Coming Soon! 👋
        </span>
        <h1 className="text-4xl md:text-6xl font-extrabold text-slate-950 mb-6">Join our Private <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-teal-500 to-sky-blue-dark">Beta</span></h1>
        <p className="text-lg text-slate-600 leading-relaxed">
          Be among the first to experience the future of AI-powered environmental rewards. Help us shape the platform and earn exclusive early-adopter badges.
        </p>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="w-full max-w-2xl"
      >
        <div className="glass p-8 md:p-10 rounded-[2.5rem] relative overflow-hidden">
          {/* Subtle gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent pointer-events-none" />
          
          <form className="space-y-6 relative z-10" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2 group">
                <label className="text-sm font-semibold text-slate-700 ml-1 group-focus-within:text-light-green-dark transition-colors flex items-center gap-2">
                  <User size={16} /> First Name
                </label>
                <input 
                  required
                  type="text" 
                  name="first_name"
                  value={formData.first_name}
                  onChange={handleChange}
                  placeholder="Bhumika" 
                  className="w-full bg-white/70 border border-sky-blue/20 rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-light-green/30 focus:border-light-green-dark text-slate-900 transition-all shadow-inner"
                />
              </div>
              <div className="space-y-2 group">
                <label className="text-sm font-semibold text-slate-700 ml-1 group-focus-within:text-light-green-dark transition-colors flex items-center gap-2">
                  <User size={16} /> Last Name
                </label>
                <input 
                  required
                  type="text" 
                  name="last_name"
                  value={formData.last_name}
                  onChange={handleChange}
                  placeholder="Tyagi" 
                  className="w-full bg-white/70 border border-sky-blue/20 rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-light-green/30 focus:border-light-green-dark text-slate-900 transition-all shadow-inner"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2 group">
                <label className="text-sm font-semibold text-slate-700 ml-1 group-focus-within:text-light-green-dark transition-colors flex items-center gap-2">
                  <Mail size={16} /> Email Address
                </label>
                <input 
                  required
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="ayush.tiwari@example.com" 
                  className="w-full bg-white/70 border border-sky-blue/20 rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-light-green/30 focus:border-light-green-dark text-slate-900 transition-all shadow-inner"
                />
              </div>
              <div className="space-y-2 group">
                <label className="text-sm font-semibold text-slate-700 ml-1 group-focus-within:text-light-green-dark transition-colors flex items-center gap-2">
                  <span className="text-lg">📞</span> Phone Number
                </label>
                <input 
                  required
                  type="tel" 
                  name="phoneNo"
                  value={formData.phoneNo}
                  onChange={handleChange}
                  placeholder="+91 9953195428" 
                  className="w-full bg-white/70 border border-sky-blue/20 rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-light-green/30 focus:border-light-green-dark text-slate-900 transition-all shadow-inner"
                />
              </div>
            </div>

            <div className="space-y-2 group">
              <label className="text-sm font-semibold text-slate-700 ml-1 group-focus-within:text-light-green-dark transition-colors flex items-center gap-2">
                <MessageSquare size={16} /> Why do you want to join?
              </label>
              <textarea 
                required
                name="reason"
                value={formData.reason}
                onChange={handleChange}
                rows="4" 
                placeholder="Share your interest in environmental sustainability..." 
                className="w-full bg-white/70 border border-sky-blue/20 rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-light-green/30 focus:border-light-green-dark text-slate-900 transition-all resize-none shadow-inner"
              ></textarea>
            </div>

            
            <button 
              type="submit"
              className="w-full bg-light-green-dark hover:bg-light-green text-white font-bold text-lg py-5 rounded-2xl shadow-xl hover:shadow-light-green/30 transition-all flex items-center justify-center gap-3 group mt-4 overflow-hidden relative"
            >
              <span className="relative z-10">Request Access</span>
              <Send size={20} className="relative z-10 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              <div className="absolute inset-0 bg-gradient-to-r from-light-green-dark to-sky-blue opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default JoinBeta;
