import React from 'react';
import Hero from './Hero';

import SocialProofBar from './SocialProofBar';
import WhyChooseUs from './WhyChooseUs';
import Services from './Services';
import DoctorProfile from './DoctorProfile';
import BeforeAfter from './BeforeAfter';
import Gallery from './Gallery';
import Testimonials from './Testimonials';
import PatientPhotoSlider from './PatientPhotoSlider';
import FAQ from './FAQ';
import Contact from './Contact';

export default function Home() {
  return (
    <>
      <Hero />

      <SocialProofBar />
      <DoctorProfile />
      <WhyChooseUs />
      <Services />
      <BeforeAfter />
      <PatientPhotoSlider />
      <Gallery />
      <Testimonials />
      <FAQ />
      <Contact />
    </>
  );
}
