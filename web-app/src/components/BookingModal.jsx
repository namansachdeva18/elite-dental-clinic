import React, { useState, useEffect } from 'react';
import { X, User, Phone, CheckCircle, Calendar, Clock, Stethoscope, MessageSquare, Loader2 } from 'lucide-react';

export default function BookingModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    treatment: '',
    date: '',
    time: '',
    message: ''
  });

  // Global event listener to intercept all #book CTA clicks
  useEffect(() => {
    const handleTrigger = () => setIsOpen(true);
    
    const clickInterceptor = (e) => {
      const target = e.target.closest('a');
      if (target && target.getAttribute('href') === '#book') {
        e.preventDefault();
        setIsOpen(true);
      }
    };

    window.addEventListener('open-booking-modal', handleTrigger);
    document.addEventListener('click', clickInterceptor);

    return () => {
      window.removeEventListener('open-booking-modal', handleTrigger);
      document.removeEventListener('click', clickInterceptor);
    };
  }, []);

  // Body scroll lock
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const getTodayDateString = () => {
    const tzoffset = (new Date()).getTimezoneOffset() * 60000;
    return (new Date(Date.now() - tzoffset)).toISOString().split('T')[0];
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg("");

    // Anti-spam & strict 10 digit validation
    if (!/^\d{10}$/.test(formData.phone)) {
      setErrorMsg("Phone number must be exactly 10 digits.");
      setIsSubmitting(false);
      return;
    }

    try {
      // 1. Compile FormData strictly to Web3Forms specs
      const submitData = new FormData();
      submitData.append("access_key", "981e01b6-99a1-4747-8bcf-ce1921d63780");
      submitData.append("subject", "New Appointment Booking - Elite Dental Clinic");
      submitData.append("from_name", "Elite Dental Clinic Website");
      
      submitData.append("name", formData.name);
      submitData.append("phone", formData.phone);
      submitData.append("treatment", formData.treatment);
      submitData.append("date", formData.date);
      submitData.append("time", formData.time);
      if (formData.message) submitData.append("message", formData.message);

      // 2. Submit to Web3Forms API
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: submitData
      });

      if (!response.ok) {
        throw new Error("Web3Forms API Submission failed");
      }

      // 3. Formatting the precise WhatsApp Message requested
      const waLink = `https://wa.me/919306299901?text=Hi%20Elite%20Dental%20Clinic,%20I%20want%20to%20book%20an%20appointment%20for%20${encodeURIComponent(formData.treatment)}%20on%20${encodeURIComponent(formData.date)}%20at%20${encodeURIComponent(formData.time)}.`;

      // 4. Show Success & Execute Redirect
      setIsSuccess(true);
      
      setTimeout(() => {
        window.location.href = waLink;
        
        // Reset modal gracefully after redirect triggers
        setTimeout(() => {
          setIsOpen(false);
          setIsSuccess(false);
          setIsSubmitting(false);
          setFormData({ name: '', phone: '', treatment: '', date: '', time: '', message: '' });
        }, 1000);
      }, 2500);

    } catch (err) {
      console.error(err);
      setErrorMsg("Something went wrong. Please try again or call us directly.");
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 lg:p-0 bg-dark/70 backdrop-blur-md overflow-y-auto w-full">
      <div className="bg-white rounded-3xl w-full max-w-lg my-auto relative shadow-2xl animate-in zoom-in duration-300">
        
        {/* Close Button */}
        <button 
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-4 z-10 text-gray-xl hover:text-dark transition-colors bg-gray-100 rounded-full p-2"
        >
          <X size={20} />
        </button>

        {!isSuccess ? (
          <div className="p-6 md:p-8 w-full">
            
            {/* Header / Trust Triggers */}
            <div className="text-center mb-6 pt-2">
              <div className="bg-[#9A7B4F]/10 text-[#9A7B4F] font-bold px-4 py-1.5 rounded-full inline-flex tracking-wide mb-3 text-xs uppercase">
                Trusted by 1000+ patients in Sirsa
              </div>
              <h3 className="font-display text-3xl font-bold text-dark mb-1">Book Your Slot</h3>
              <p className="font-sans text-muted text-sm px-2">
                Secure your consultation for just ₹200.
              </p>
            </div>

            {/* Error State */}
            {errorMsg && (
              <div className="bg-red-50 text-red-600 border border-red-200 text-sm font-bold p-3 rounded-lg text-center mb-4 transition-all">
                {errorMsg}
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <User size={18} className="text-[#9A7B4F]" />
                </div>
                <input type="text" name="name" value={formData.name} onChange={handleChange} required placeholder="Full Name" className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-gray-200 focus:border-[#9A7B4F] focus:ring-1 focus:ring-[#9A7B4F] outline-none text-dark bg-gray-50/50 transition-colors" />
              </div>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Phone size={18} className="text-[#9A7B4F]" />
                </div>
                <input type="tel" name="phone" pattern="[0-9]{10}" value={formData.phone} onChange={handleChange} required placeholder="Mobile Number (10 digits)" className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-gray-200 focus:border-[#9A7B4F] focus:ring-1 focus:ring-[#9A7B4F] outline-none text-dark bg-gray-50/50 transition-colors" />
              </div>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Stethoscope size={18} className="text-[#9A7B4F]" />
                </div>
                <select name="treatment" value={formData.treatment} onChange={handleChange} required className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-gray-200 focus:border-[#9A7B4F] focus:ring-1 focus:ring-[#9A7B4F] outline-none text-dark bg-gray-50/50 appearance-none transition-colors">
                  <option value="" disabled>Select Treatment</option>
                  <option value="Root Canal Treatment">Root Canal Treatment</option>
                  <option value="Teeth Whitening">Teeth Whitening</option>
                  <option value="Braces & Aligners">Braces & Aligners</option>
                  <option value="Dental Implants">Dental Implants</option>
                  <option value="General Checkup">General Checkup</option>
                </select>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Calendar size={18} className="text-[#9A7B4F]" />
                  </div>
                  <input type="date" name="date" value={formData.date} onChange={handleChange} required min={getTodayDateString()} className="w-full pl-12 pr-2 py-3.5 rounded-xl border border-gray-200 focus:border-[#9A7B4F] focus:ring-1 focus:ring-[#9A7B4F] outline-none text-dark text-sm bg-gray-50/50 transition-colors" />
                </div>

                <div className="relative flex-1">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Clock size={18} className="text-[#9A7B4F]" />
                  </div>
                  <select name="time" value={formData.time} onChange={handleChange} required className="w-full pl-12 pr-2 py-3.5 rounded-xl border border-gray-200 focus:border-[#9A7B4F] focus:ring-1 focus:ring-[#9A7B4F] outline-none text-dark text-sm bg-gray-50/50 appearance-none transition-colors">
                    <option value="" disabled>Select Time</option>
                    <option value="Morning (9-12)">Morning (9–12)</option>
                    <option value="Afternoon (12-4)">Afternoon (12–4)</option>
                    <option value="Evening (4-8)">Evening (4–8)</option>
                  </select>
                </div>
              </div>

              <div className="relative">
                <div className="absolute top-4 left-0 pl-4 pointer-events-none">
                  <MessageSquare size={18} className="text-[#9A7B4F]" />
                </div>
                <textarea name="message" value={formData.message} onChange={handleChange} placeholder="Optional message" rows="2" className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-gray-200 focus:border-[#9A7B4F] focus:ring-1 focus:ring-[#9A7B4F] outline-none text-dark bg-gray-50/50 resize-none transition-colors"></textarea>
              </div>

              <button 
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#9A7B4F] text-white font-bold text-lg py-4 rounded-xl hover:bg-dark transition-colors shadow-lg mt-2 disabled:opacity-70 flex justify-center items-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="animate-spin" size={20} />
                    Submitting...
                  </>
                ) : (
                  "Confirm Appointment"
                )}
              </button>
            </form>

            <div className="flex flex-col items-center mt-5 gap-1 pt-4 border-t border-gray-100">
               <span className="font-sans text-xs font-bold text-red-500 uppercase tracking-widest text-center animate-pulse">
                 ⚡ Only 3 slots left today 
               </span>
               <span className="font-sans text-[11px] text-muted text-center tracking-wide">
                 100% pain-free treatment guaranteed.
               </span>
            </div>

          </div>
        ) : (
          <div className="p-10 text-center flex flex-col items-center justify-center min-h-[400px]">
            <CheckCircle size={80} className="text-green-500 mb-6" />
            <h3 className="font-display text-3xl font-bold text-dark mb-4">Appointment Request Received!</h3>
            <p className="font-sans text-lg text-dark/70 mb-2">
              Redirecting to WhatsApp...
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
