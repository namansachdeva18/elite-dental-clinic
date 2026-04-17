import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronDown, Phone, MessageCircle } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const navLinks = [
  { name: 'Home', href: '/#' },
  { name: 'Services', href: '/#services' },
  { name: 'About', href: '/#about' },
  { name: 'Results', href: '/#results' },
  { name: 'Clinic Tour', href: '/#clinic-tour' },
  { name: 'Patient Gallery', href: '/#patient-gallery' },
  { name: 'Reviews', href: '/#reviews' },
  { name: 'FAQs', href: '/#faq' },
  { name: 'Contact', href: '/#contact' }
];

const serviceLinks = [
  { name: 'Root Canal Treatment', href: '/#service-rct' },
  { name: 'Dental Implants', href: '/#service-implants' },
  { name: 'Braces & Aligners', href: '/#service-braces' },
  { name: 'Teeth Whitening', href: '/#service-whitening' },
  { name: 'Smile Designing', href: '/#service-smile-design' },
  { name: 'Wisdom Tooth Removal', href: '/#service-wisdom-tooth' },
  { name: 'Dental Crowns & Caps', href: '/#service-crowns' },
  { name: 'Pediatric Dentistry', href: '/#service-pediatric' },
  { name: 'Emergency Care', href: '/#service-emergency' }
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false); // Mobile dropdown state
  
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  return (
    <>
      <nav 
        className={`sticky top-0 z-[90] w-full transition-all duration-300 ${
          isScrolled 
            ? 'bg-white/95 backdrop-blur-md shadow-sm py-3' 
            : 'bg-white py-4 md:py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 md:px-8 flex items-center justify-between">
          
          {/* Logo element */}
          <Link to="/" onClick={() => window.scrollTo(0,0)} className="flex items-center gap-3 group z-50">
            <img src="/images/logo.webp" alt="Elite Dental Clinic Logo" className="h-[40px] md:h-[50px] w-auto object-contain group-hover:scale-[1.03] transition-transform duration-300" />
            <span className="font-display font-bold text-[19px] md:text-[22px] tracking-tighter text-[#A38A5F] hidden sm:block mt-1">Elite Dental Clinic</span>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-7">
            {/* Standard Nav Item (Home) */}
            <a href="/#" className="text-[15px] font-semibold text-dark hover:text-[#A38A5F] transition-colors">Home</a>

            {/* Services Dropdown */}
            <div className="relative group">
              <button className="flex items-center gap-1 text-[15px] font-semibold text-dark group-hover:text-[#A38A5F] transition-colors py-2">
                Services
                <ChevronDown size={14} className="group-hover:rotate-180 transition-transform duration-300" />
              </button>
              
              {/* Dropdown Panel */}
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-64 bg-white rounded-xl shadow-xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 pointer-events-none group-hover:pointer-events-auto overflow-hidden">
                <div className="py-2">
                  {serviceLinks.map((service, idx) => (
                    <a 
                      key={idx} 
                      href={service.href}
                      className="block px-5 py-3 text-[14.5px] font-medium text-gray-700 hover:text-[#A38A5F] hover:bg-[#FDFBF7] transition-colors"
                      onClick={(e) => {
                         // Fallback smooth scroll specifically for dropdown
                         if (service.href.includes('#')) {
                           e.preventDefault();
                           document.querySelector(service.href.split('/')[1]).scrollIntoView({behavior: 'smooth'});
                         }
                      }}
                    >
                      {service.name}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Mapping remaining standard links */}
            {navLinks.slice(1).map((link, idx) => (
              <a 
                key={idx} 
                href={link.href}
                className="text-[15px] font-semibold text-dark hover:text-[#A38A5F] transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Right Action Buttons */}
          <div className="hidden lg:flex items-center gap-4">
            <a href="tel:+919306299901" className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-50 text-dark hover:text-[#A38A5F] hover:bg-gray-100 transition-colors" aria-label="Call Us">
              <Phone size={18} />
            </a>
            <a href="https://wa.me/919306299901" target="_blank" rel="noreferrer" className="flex items-center justify-center w-10 h-10 rounded-full bg-green-50 text-green-600 hover:bg-green-100 transition-colors" aria-label="WhatsApp">
              <MessageCircle size={18} />
            </a>
            <a 
              href="#contact" 
              className="bg-gradient-to-r from-[#A38A5F] to-[#9A7B4F] text-white px-6 py-2.5 rounded-full text-sm font-bold shadow-md shadow-[#A38A5F]/20 hover:shadow-lg hover:shadow-[#A38A5F]/30 hover:scale-105 transition-all duration-300"
            >
              Book Appointment
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="lg:hidden z-50">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-dark hover:text-[#A38A5F] transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Full-Screen Sidebar / Drawer */}
      <div 
        className={`fixed inset-0 bg-black/40 z-[80] lg:hidden transition-opacity duration-300 ${
          isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
        onClick={() => setIsMobileMenuOpen(false)}
      >
        <div 
          className={`fixed right-0 top-0 bottom-0 w-4/5 max-w-[340px] bg-white shadow-2xl overflow-y-auto transition-transform duration-300 transform ${
            isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="pt-24 pb-10 px-6 flex flex-col min-h-full">
            {/* Links */}
            <div className="flex flex-col gap-5 flex-grow">
              <a href="/#" onClick={() => setIsMobileMenuOpen(false)} className="text-xl font-display font-semibold text-dark">Home</a>
              
              {/* Mobile Services Accordion */}
              <div>
                <button 
                  onClick={() => setIsServicesOpen(!isServicesOpen)}
                  className="flex items-center justify-between w-full text-xl font-display font-semibold text-dark"
                >
                  Services
                  <ChevronDown size={20} className={`text-muted transition-transform duration-300 ${isServicesOpen ? 'rotate-180' : ''}`} />
                </button>
                <div className={`overflow-hidden transition-all duration-300 ${isServicesOpen ? 'max-h-[400px] mt-4' : 'max-h-0'}`}>
                  <div className="flex flex-col gap-3 pl-4 border-l-2 border-gray-100">
                    {serviceLinks.map((service, idx) => (
                      <a 
                        key={idx} 
                        href={service.href} 
                        onClick={(e) => {
                          setIsMobileMenuOpen(false);
                          if (service.href.includes('#')) {
                            e.preventDefault();
                            document.querySelector(service.href.split('/')[1]).scrollIntoView({behavior: 'smooth'});
                          }
                        }}
                        className="text-base font-medium text-gray-600 active:text-[#A38A5F]"
                      >
                        {service.name}
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              {navLinks.slice(1).map((link, idx) => (
                <a 
                  key={idx} 
                  href={link.href} 
                  onClick={() => setIsMobileMenuOpen(false)} 
                  className="text-xl font-display font-semibold text-dark active:text-[#A38A5F]"
                >
                  {link.name}
                </a>
              ))}
            </div>

            {/* Mobile Actions Overlay Bottom */}
            <div className="mt-10 pt-8 border-t border-gray-100">
              <div className="flex gap-4 mb-5">
                <a href="tel:+919306299901" className="flex-1 flex items-center justify-center gap-2 bg-gray-50 text-dark py-3.5 rounded-xl font-semibold border border-gray-100">
                  <Phone size={18} /> Call Us
                </a>
                <a href="https://wa.me/919306299901" target="_blank" rel="noreferrer" className="flex-1 flex items-center justify-center gap-2 bg-green-50 text-green-700 py-3.5 rounded-xl font-semibold border border-green-100">
                  <MessageCircle size={18} /> WhatsApp
                </a>
              </div>
              <a 
                href="#contact"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full flex items-center justify-center bg-gradient-to-r from-[#A38A5F] to-[#9A7B4F] text-white py-4 rounded-xl font-bold shadow-lg shadow-[#A38A5F]/20 text-lg"
              >
                Book Appointment
              </a>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}
