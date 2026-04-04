import React from 'react';
import Hero from './Hero';
import InstantTrust from './InstantTrust';
import SocialProofBar from './SocialProofBar';
import WhyChooseUs from './WhyChooseUs';
import Services from './Services';
import DoctorProfile from './DoctorProfile';
import BeforeAfter from './BeforeAfter';
import HowItWorks from './HowItWorks';
import Gallery from './Gallery';
import Testimonials from './Testimonials';
import FAQ from './FAQ';
import Contact from './Contact';
import FinalCTA from './FinalCTA';

export default function Home() {
  return (
    <>
      <Hero />
      <InstantTrust />
      <SocialProofBar />
      <WhyChooseUs />
      <Services />
      <DoctorProfile />
      <BeforeAfter />
      <HowItWorks />
      <Gallery />
      <Testimonials />
      <FAQ />
      <Contact />
      <FinalCTA />
    </>
  );
}
