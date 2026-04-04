import React, { useState, useEffect } from 'react';
import { X, User, Phone, CheckCircle } from 'lucide-react';

export default function LeadPopup({ isOpen, onClose }) {
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      onClose();
      setIsSubmitted(false);
    }, 3000);
  };

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-dark/60 backdrop-blur-sm">
      <div className="bg-white rounded-3xl p-8 max-w-md w-full relative shadow-2xl animate-in zoom-in duration-300">
        
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-dark transition-colors bg-gray-100 rounded-full p-1"
        >
          <X size={24} />
        </button>

        {!isSubmitted ? (
          <div>
            <div className="text-center mb-6">
              <div className="bg-green-100 text-green-700 font-bold px-4 py-1 rounded-full inline-block mb-4 text-sm">
                Get Your Free Consultation
              </div>
              <h3 className="font-display text-3xl font-bold text-dark mb-2">Claim Your ₹200 Consultation.</h3>
              <p className="font-sans text-muted text-sm px-2">
                Drop your details below and our clinic coordinator will call you back within 15 minutes.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <User size={18} className="text-gray-400" />
                </div>
                <input 
                  type="text" 
                  required
                  placeholder="Your Full Name" 
                  className="w-full pl-12 pr-4 py-4 rounded-xl border border-gray-200 focus:border-[#9A7B4F] focus:ring-1 focus:ring-[#9A7B4F] outline-none transition-all"
                />
              </div>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Phone size={18} className="text-gray-400" />
                </div>
                <input 
                  type="tel" 
                  required
                  placeholder="Your Mobile Number" 
                  className="w-full pl-12 pr-4 py-4 rounded-xl border border-gray-200 focus:border-[#9A7B4F] focus:ring-1 focus:ring-[#9A7B4F] outline-none transition-all"
                />
              </div>

              <button 
                type="submit"
                className="w-full bg-[#9A7B4F] text-white font-bold py-4 rounded-xl hover:bg-dark transition-colors shadow-lg mt-2"
              >
                Book My Slot Now
              </button>
            </form>

            <p className="font-sans text-[11px] text-gray-400 text-center mt-4 uppercase tracking-wide">
              Your information is strictly 100% confidential.
            </p>
          </div>
        ) : (
          <div className="text-center py-8">
            <CheckCircle size={64} className="text-green-500 mx-auto mb-6" />
            <h3 className="font-display text-3xl font-bold text-dark mb-2">Request Received!</h3>
            <p className="font-sans text-muted mb-4">
              Our team from Elite Dental Clinic will contact you shortly to confirm your preferred time.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
