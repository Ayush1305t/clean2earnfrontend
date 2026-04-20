import React from 'react';
import { motion } from 'framer-motion';
import { Send, MapPin, Mail, Phone } from 'lucide-react';

const Contact = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full flex flex-col lg:flex-row gap-16 relative overflow-hidden">
      {/* Background blur decorators */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-light-green/20 rounded-full blur-[100px] z-[-1]" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-sky-blue/20 rounded-full blur-[120px] z-[-1]" />

      <motion.div 
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="flex-1 space-y-12"
      >
        <div>
          <h1 className="text-5xl md:text-6xl font-extrabold text-slate-950 mb-6 tracking-tight">Get in Touch</h1>
          <p className="text-xl text-slate-600 leading-relaxed max-w-lg">
            Have questions about Clean2Earn? Want to partner with us? We'd love to hear from you. Drop us a message!
          </p>
        </div>

        <div className="space-y-6">
          <motion.div whileHover={{ scale: 1.02 }} className="flex items-center gap-6 glass p-6 rounded-3xl transition-transform">
            <div className="p-4 bg-sky-blue/20 rounded-2xl text-sky-blue">
              <Mail size={28} />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500 mb-1">Email Us</p>
              <p className="text-lg font-bold text-slate-950">ayush1313tiwari@gmail.com</p>
            </div>
          </motion.div>
          <motion.div whileHover={{ scale: 1.02 }} className="flex items-center gap-6 glass p-6 rounded-3xl transition-transform">
            <div className="p-4 bg-light-green/20 rounded-2xl text-light-green-dark">
              <MapPin size={28} />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500 mb-1">Visit Us</p>
              <p className="text-lg font-bold text-slate-950 leading-tight">Kcc Institute of Technology <br/>and Management</p>
            </div>
          </motion.div>
          <motion.div whileHover={{ scale: 1.02 }} className="flex items-center gap-6 glass p-6 rounded-3xl transition-transform">
            <div className="p-4 bg-sky-blue-dark/20 rounded-2xl text-sky-blue-dark">
              <Phone size={28} />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500 mb-1">Call Us</p>
              <p className="text-lg font-bold text-slate-950">+916306055008</p>
            </div>
          </motion.div>
        </div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="flex-1"
      >
        <div className="glass p-8 md:p-12 rounded-3xl relative overflow-hidden">
          {/* Subtle gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent pointer-events-none" />
          
          <h2 className="text-3xl font-bold text-slate-950 mb-8 relative z-10">Send us a Message</h2>
          <form className="space-y-6 relative z-10" onSubmit={(e) => e.preventDefault()}>
            <div className="space-y-2 group">
              <label className="text-sm font-medium text-slate-700 ml-1 group-focus-within:text-light-green-dark transition-colors">Full Name</label>
              <input 
                type="text" 
                placeholder="John Doe" 
                className="w-full bg-white/70 border border-sky-blue/20 rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-light-green/50 focus:border-light-green-dark text-slate-900 transition-all shadow-inner"
              />
            </div>
            <div className="space-y-2 group">
              <label className="text-sm font-medium text-slate-700 ml-1 group-focus-within:text-light-green-dark transition-colors">Email Address</label>
              <input 
                type="email" 
                placeholder="john@example.com" 
                className="w-full bg-white/70 border border-sky-blue/20 rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-light-green/50 focus:border-light-green-dark text-slate-900 transition-all shadow-inner"
              />
            </div>
            <div className="space-y-2 group">
              <label className="text-sm font-medium text-slate-700 ml-1 group-focus-within:text-light-green-dark transition-colors">Message</label>
              <textarea 
                rows="5" 
                placeholder="How can we help you?" 
                className="w-full bg-white/70 border border-sky-blue/20 rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-light-green/50 focus:border-light-green-dark text-slate-900 transition-all resize-none shadow-inner"
              ></textarea>
            </div>
            <button className="w-full bg-light-green-dark hover:bg-light-green text-white font-bold text-lg py-4 rounded-2xl shadow-xl hover:shadow-light-green/30 transition-all flex items-center justify-center gap-3 group mt-4">
              Send Message
              <Send size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default Contact;
