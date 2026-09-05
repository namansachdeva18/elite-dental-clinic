import React from 'react';
import ServiceLandingPage from '../components/ServiceLandingPage';

export default function SmileMakeoverPage() {
  return (
    <ServiceLandingPage
      title="Smile Makeover & Smile Design"
      metaTitle="Smile Makeover in Sirsa | 3D Digital Aesthetic Dentistry | Elite Dental"
      metaDescription="Transform your smile with digital aesthetic planning in Sirsa. Elite Dental Clinic combines veneers, laser contouring, and alignment for your ideal wedding-ready smile."
      canonicalUrl="/services/smile-makeover"
      breadcrumbs={[
        { name: "Home", url: "/" },
        { name: "Services", url: "/#services" },
        { name: "Smile Makeover", url: "/services/smile-makeover" }
      ]}
      heroBadge="Comprehensive Aesthetic Smile Architecture • Sirsa"
      h1="Comprehensive Smile Makeovers in Sirsa"
      leadIntro="Custom smile architecture tailored to your unique facial aesthetics, lip line, and skin tone. We combine digital smile design, porcelain veneers, laser gum contouring, and alignment planning at Elite Dental Clinic Sirsa."
      quickFacts={[
        { label: "Treatment Duration", value: "Customized timeline (1 to 3 visits typically)" },
        { label: "Modalities Combined", value: "Veneers, crowns, laser gum reshaping, whitening" },
        { label: "Design Approach", value: "Facially guided digital smile proportioning" },
        { label: "Pre-Evaluation", value: "Physical digital mock-up preview before starting" },
        { label: "Consultation Fee", value: "₹200 (Includes comprehensive cosmetic assessment)" },
        { label: "Ideal Timing", value: "Plan 3 to 6 weeks before wedding or major event" }
      ]}
      whoIsThisFor={[
        "Brides, grooms, and models preparing for life milestone photography",
        "Patients with multiple cosmetic concerns (crooked, discolored, and chipped teeth)",
        "Individuals with a 'gummy smile' showing excessive pink tissue when smiling",
        "Adults with worn, short teeth that cause premature facial aging",
        "Anyone who consciously hides their smile in family and social photos"
      ]}
      whatItSolves={[
        "Creates harmonious facial symmetry and a brighter, confident smile",
        "Rebalances the pink-to-white ratio using gentle laser gum contouring",
        "Restores proper dental arch width and youthful tooth proportions",
        "Eliminates dark buccal corridors (shadows at corners of the mouth)"
      ]}
      symptomsList={[
        "Multiple chipped or worn teeth",
        "Excessive gums showing when laughing",
        "Mismatched tooth shades and old dark fillings",
        "Asymmetrical smile line"
      ]}
      procedureSteps={[
        {
          title: "1. Facial Aesthetic Mapping & 3D Photography",
          desc: "We analyze your facial midline, eye plane, smile curvature, and speech dynamics with high-resolution photography."
        },
        {
          title: "2. In-Clinic Smile Preview (Mock-Up)",
          desc: "Before any clinical intervention, a trial composite mock-up is placed over your natural teeth so you can visualize the result in the mirror."
        },
        {
          title: "3. Soft-Tissue Laser Symmetry Contouring",
          desc: "If needed, our bloodless dental laser sculpts uneven gum margins in minutes, creating balanced tooth heights with zero stitches."
        },
        {
          title: "4. Minimally Invasive Restorative Treatment",
          desc: "Custom porcelain veneers, ceramic crowns, or alignment corrections are executed based on your personalized aesthetic blueprint."
        },
        {
          title: "5. Final Polish & Photography Session",
          desc: "Your new smile is balanced for natural bite occlusion and documented with final professional clinical photography."
        }
      ]}
      technologyUsed={[
        {
          title: "Facially Driven Digital Smile Architecture",
          benefit: "Aligns your smile with facial landmarks rather than generating generic, cookie-cutter teeth."
        },
        {
          title: "Painless Soft Tissue Diode Laser",
          benefit: "Corrects gummy smiles with instant sealing and rapid healing, eliminating scalpels and sutures."
        },
        {
          title: "German E-max Lithium Disilicate & Zirconia",
          benefit: "Provides optical depth that replicates natural tooth enamel under flash photography."
        }
      ]}
      timelineAndRecovery={{
        timeline: "Simple aesthetic makeovers (whitening + 4-6 veneers) require 7 to 10 days. Comprehensive cases involving alignment take longer.",
        aftercare: "Maintain gentle brushing and daily flossing. We provide a custom nighttime protective guard if you tend to clench your jaw during sleep."
      }}
      treatmentAlternatives={[
        {
          name: "Orthodontics Alone",
          comparison: "Aligns teeth naturally over 9-15 months, but does not alter intrinsic discoloration, chipped edges, or tooth proportions."
        },
        {
          name: "Direct Composite Edge Bonding",
          comparison: "A faster, single-visit solution for minor touch-ups, though less permanent and stain-resistant than porcelain makeovers."
        }
      ]}
      faqs={[
        {
          q: "How long does a complete smile makeover take in Sirsa?",
          a: "Most restorative smile makeovers combining laser gum contouring and porcelain veneers take 2 to 3 appointments over 1 to 2 weeks. For wedding events, we advise visiting 4 to 6 weeks in advance."
        },
        {
          q: "Can I see what my new smile will look like beforehand?",
          a: "Yes. We create an in-mouth provisional mock-up that allows you to see the transformed shape and length directly on your own face before proceeding."
        },
        {
          q: "Will a smile makeover look fake or unnaturally white?",
          a: "Never at Elite Dental Clinic. Dr. Nandini Bansal customizes the tooth hue, value, and translucency to complement your unique skin tone and facial features for an authentically beautiful result."
        },
        {
          q: "What is the consultation fee for smile designing?",
          a: "Our diagnostic consultation is ₹200. During this session, Dr. Nandini analyzes your smile line and outlines transparent customized treatment packages."
        }
      ]}
      relatedTreatments={[
        { title: "Porcelain Veneers", url: "/services/porcelain-veneers" },
        { title: "Teeth Whitening", url: "/services/teeth-whitening" },
        { title: "Clear Aligners & Braces", url: "/services/braces-and-aligners" }
      ]}
    />
  );
}
