import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronDown, Phone, MessageCircle } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'Services', href: '/#services' },
  { name: 'About Doctor', href: '/#about' },
  { name: 'Results', href: '/#results' },
  { name: 'Clinic Tour', href: '/#clinic-tour' },
  { name: 'Patient Gallery', href: '/#patient-gallery' },
  { name: 'Reviews', href: '/#reviews' },
  { name: 'FAQs', href: '/#faq' },
  { name: 'Contact', href: '/contact' }
];

const serviceLinks = [
  { name: 'Root Canal Treatment (RCT)', href: '/services/root-canal-treatment' },
  { name: 'Dental Implants', href: '/services/dental-implants' },
  { name: 'Braces & Clear Aligners', href: '/services/braces-and-aligners' },
  { name: 'Teeth Whitening', href: '/services/teeth-whitening' },
  { name: 'Dental Crowns & Bridges', href: '/services/dental-crowns-and-bridges' },
  { name: 'Wisdom Tooth Removal', href: '/services/wisdom-tooth-extraction' },
  { name: 'Porcelain Veneers', href: '/services/porcelain-veneers' },
  { name: 'Smile Makeover', href: '/services/smile-makeover' }
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
            ? 'bg-white/90 backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.05)] border-b border-[#9A7B4F]/20 py-2.5' 
            : 'bg-white/95 backdrop-blur-sm border-b border-[#9A7B4F]/15 py-3 md:py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 flex items-center justify-between">
          
          {/* Logo element with refined metallic gold text */}
          <Link to="/" onClick={() => window.scrollTo(0,0)} className="flex items-center gap-2.5 sm:gap-3 group z-50">
            <div className="relative">
              <img 
                src="/images/logo.webp" 
                alt="Elite Dental Clinic Logo" 
                className="h-[36px] sm:h-[42px] md:h-[46px] w-auto object-contain group-hover:scale-105 transition-transform duration-300 drop-shadow-xs" 
              />
            </div>
            <div className="flex flex-col">
              <span className="font-display font-extrabold text-[16px] sm:text-[19px] md:text-[21px] tracking-tight bg-gradient-to-r from-[#80633C] via-[#A38A5F] to-[#6E5535] bg-clip-text text-transparent group-hover:brightness-110 transition-all leading-tight">
                Elite Dental Clinic
              </span>
              <span className="font-mono text-[8px] sm:text-[9.5px] uppercase tracking-widest text-[#9A7B4F]/80 font-bold -mt-0.5">
                Sirsa • Pain-Free Care
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-7">
            {/* Standard Nav Item (Home) */}
            <Link to="/" onClick={() => window.scrollTo(0,0)} className="text-[14.5px] font-semibold text-dark hover:text-[#A38A5F] transition-colors">Home</Link>

            {/* Services Dropdown */}
            <div className="relative group">
              <button className="flex items-center gap-1 text-[14.5px] font-semibold text-dark group-hover:text-[#A38A5F] transition-colors py-2 cursor-pointer">
                Services
                <ChevronDown size={14} className="group-hover:rotate-180 transition-transform duration-300" />
              </button>
              
              {/* Dropdown Panel */}
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-72 bg-white rounded-2xl shadow-xl border border-[#9A7B4F]/20 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 pointer-events-none group-hover:pointer-events-auto overflow-hidden">
                <div className="py-2">
                  {serviceLinks.map((service, idx) => (
                    <Link 
                      key={idx} 
                      to={service.href}
                      className="block px-5 py-2.5 text-[13.5px] font-medium text-gray-700 hover:text-[#A38A5F] hover:bg-[#FDFBF7] transition-colors"
                    >
                      {service.name}
                    </Link>
                  ))}
                  <div className="border-t border-gray-100 mt-1 pt-1">
                    <a 
                      href="/#services" 
                      className="block px-5 py-2 text-[12px] font-bold text-[#9A7B4F] hover:underline"
                    >
                      View All 16+ Treatments &rarr;
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Mapping remaining standard links */}
            {navLinks.slice(2).map((link, idx) => (
              link.href.startsWith('/') && !link.href.includes('#') ? (
                <Link
                  key={idx}
                  to={link.href}
                  className="text-[14.5px] font-semibold text-dark hover:text-[#A38A5F] transition-colors"
                >
                  {link.name}
                </Link>
              ) : (
                <a 
                  key={idx} 
                  href={link.href}
                  className="text-[14.5px] font-semibold text-dark hover:text-[#A38A5F] transition-colors"
                >
                  {link.name}
                </a>
              )
            ))}
          </div>

          {/* Right Action Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            <a 
              href="tel:+919467624898" 
              className="flex items-center justify-center w-9 h-9 rounded-full bg-[#FAF8F5] border border-[#9A7B4F]/25 text-dark hover:text-white hover:bg-[#9A7B4F] transition-all shadow-xs" 
              aria-label="Call Us"
            >
              <Phone size={15} />
            </a>
            <a 
              href="https://wa.me/919467624898" 
              target="_blank" 
              rel="noreferrer" 
              className="flex items-center justify-center w-9 h-9 rounded-full bg-emerald-50 border border-emerald-300/40 text-emerald-600 hover:bg-emerald-600 hover:text-white transition-all shadow-xs" 
              aria-label="WhatsApp"
            >
              <MessageCircle size={15} />
            </a>
            <a 
              href="#book" 
              className="bg-gradient-to-r from-[#9A7B4F] to-[#7D623C] text-white px-5 py-2 rounded-full text-xs font-bold shadow-sm hover:shadow-md hover:brightness-105 active:scale-95 transition-all"
            >
              Book Appointment
            </a>
          </div>

          {/* Mobile Quick Action Buttons & Menu Toggle */}
          <div className="lg:hidden flex items-center gap-2 z-50">
            <a 
              href="tel:+919467624898"
              className="w-8 h-8 rounded-full bg-[#FAF8F5] border border-[#9A7B4F]/25 text-[#80633C] flex items-center justify-center shadow-xs"
              aria-label="Call Clinic"
            >
              <Phone size={13} />
            </a>

            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="w-8 h-8 rounded-full bg-white border border-gray-200 text-dark flex items-center justify-center hover:border-[#9A7B4F] transition-colors shadow-xs"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
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
              <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="text-xl font-display font-semibold text-dark">Home</Link>
              
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
                      <Link 
                        key={idx} 
                        to={service.href} 
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="text-base font-medium text-gray-600 active:text-[#A38A5F]"
                      >
                        {service.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              {navLinks.slice(2).map((link, idx) => (
                link.href.startsWith('/') && !link.href.includes('#') ? (
                  <Link
                    key={idx}
                    to={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-xl font-display font-semibold text-dark active:text-[#A38A5F]"
                  >
                    {link.name}
                  </Link>
                ) : (
                  <a 
                    key={idx} 
                    href={link.href} 
                    onClick={() => setIsMobileMenuOpen(false)} 
                    className="text-xl font-display font-semibold text-dark active:text-[#A38A5F]"
                  >
                    {link.name}
                  </a>
                )
              ))}
            </div>

            {/* Mobile Actions Overlay Bottom */}
            <div className="mt-10 pt-8 border-t border-gray-100">
              <div className="flex gap-4 mb-5">
                <a href="tel:+919467624898" className="flex-1 flex items-center justify-center gap-2 bg-gray-50 text-dark py-3.5 rounded-xl font-semibold border border-gray-100 text-sm">
                  <Phone size={16} /> Call Us
                </a>
                <a href="https://wa.me/919467624898" target="_blank" rel="noreferrer" className="flex-1 flex items-center justify-center gap-2 bg-green-50 text-green-700 py-3.5 rounded-xl font-semibold border border-green-100 text-sm">
                  <MessageCircle size={16} /> WhatsApp
                </a>
              </div>
              <a 
                href="#book"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full flex items-center justify-center bg-gradient-to-r from-[#A38A5F] to-[#9A7B4F] text-white py-3.5 rounded-xl font-bold shadow-lg shadow-[#A38A5F]/20 text-base"
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
