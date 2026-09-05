import React from 'react';
import ServiceLandingPage from '../components/ServiceLandingPage';

export default function BracesAlignersPage() {
  return (
    <ServiceLandingPage
      title="Braces & Clear Aligners"
      metaTitle="Clear Aligners & Braces in Sirsa | Teeth Straightening | Elite Dental"
      metaDescription="Straighten crooked or gapped teeth in Sirsa. Elite Dental Clinic offers invisible clear aligners and modern ceramic braces for teens and adults. Consult Dr. Nandini Bansal."
      canonicalUrl="/services/braces-and-aligners"
      breadcrumbs={[
        { name: "Home", url: "/" },
        { name: "Services", url: "/#services" },
        { name: "Braces & Clear Aligners", url: "/services/braces-and-aligners" }
      ]}
      heroBadge="Invisible Orthodontics & Precision Alignment • Sirsa"
      h1="Clear Aligners & Orthodontic Braces in Sirsa"
      leadIntro="Achieve a symmetrical, healthy bite without social hesitation. Choose from virtually invisible clear aligners or modern self-ligating ceramic braces at Elite Dental Clinic Sirsa."
      quickFacts={[
        { label: "Treatment Duration", value: "6 to 18 months depending on alignment severity" },
        { label: "System Options", value: "Clear Aligners, Ceramic Braces, Metal Braces" },
        { label: "Visibility", value: "Virtually undetectable with transparent aligners" },
        { label: "Dietary Restrictions", value: "None with aligners (removable during meals)" },
        { label: "Consultation Fee", value: "₹200 (Comprehensive bite & smile evaluation)" },
        { label: "Age Suitability", value: "Teens (12+) and adults of all ages" }
      ]}
      whoIsThisFor={[
        "Adults seeking discreet teeth straightening without visible metal wires",
        "Patients with crowded, overlapping, or rotated teeth",
        "Individuals with visible gaps between front teeth (diastema)",
        "Those with overbite, underbite, crossbite, or open bite alignment problems",
        "Teens preparing for high school, college, or special occasions"
      ]}
      whatItSolves={[
        "Straightens crowded or crooked teeth for a symmetrical smile",
        "Closes irregular gaps that trap food and cause gum inflammation",
        "Improves bite mechanics and reduces uneven enamel wear",
        "Eases dental hygiene maintenance, making brushing and flossing effortless"
      ]}
      symptomsList={[
        "Crooked or twisted front teeth",
        "Spaces or gaps between front teeth",
        "Difficulty biting into food evenly",
        "Jaw joint clicking from improper dental bite",
        "Feeling self-conscious in photographs"
      ]}
      procedureSteps={[
        {
          title: "1. 3D Digital Smile & Arch Analysis",
          desc: "We perform high-resolution digital scanning and facial photography to evaluate your dental arches and bite relationship."
        },
        {
          title: "2. Custom Treatment Simulation Plan",
          desc: "A step-by-step digital roadmap is generated showing how your teeth will shift from week to week toward the target smile."
        },
        {
          title: "3. Fabrication of Custom Aligners / Brackets",
          desc: "Your series of custom medical-grade polyurethane trays or low-profile ceramic brackets are prepared with precision."
        },
        {
          title: "4. Regular Progress Tracking & Refinement",
          desc: "You wear each tray set for 1 to 2 weeks (20-22 hours/day) with periodic quick checkups at our Sirsa clinic to confirm scheduled tooth movement."
        },
        {
          title: "5. Retention for Lifetime Stability",
          desc: "After alignment is perfected, custom clear retainers ensure your teeth remain locked in their ideal positions permanently."
        }
      ]}
      technologyUsed={[
        {
          title: "3D Digital Arch Mapping",
          benefit: "Eliminates uncomfortable messy impression goop and previews your post-treatment smile outcome."
        },
        {
          title: "SmartTrack Polyurethane Aligners",
          benefit: "Delivers gentle, continuous calibrated forces for predictable, faster tooth shifts and reduced discomfort."
        },
        {
          title: "Low-Profile Ceramic Brackets",
          benefit: "Stain-resistant, tooth-colored ceramic brackets that blend naturally with your enamel for patients preferring fixed orthodontics."
        }
      ]}
      timelineAndRecovery={{
        timeline: "Minor spacing and crowding corrections can finish in 6 to 9 months. Moderate to severe bite adjustments generally take 12 to 18 months.",
        aftercare: "You may experience gentle pressure for 24-48 hours after switching to a new tray. Rinse trays with lukewarm water and clean daily with a soft toothbrush."
      }}
      treatmentAlternatives={[
        {
          name: "Porcelain Veneers (Instant Orthodontics)",
          comparison: "For minor cosmetic gaps or mild misalignments in front teeth, veneers can provide results in 2 visits. However, aligners physically move natural teeth without any enamel trimming."
        },
        {
          name: "Traditional Metal Braces",
          comparison: "Highly effective and budget-friendly for complex skeletal cases, though more visible than clear aligners or ceramic systems."
        }
      ]}
      faqs={[
        {
          q: "Are clear aligners really invisible?",
          a: "Yes. Made from ultra-clear medical thermoplastic, aligners are virtually undetectable from normal conversational distances."
        },
        {
          q: "How many hours a day do I need to wear aligners?",
          a: "For optimal results, aligners should be worn 20 to 22 hours per day, removing them only when eating, drinking warm beverages, or brushing."
        },
        {
          q: "What is the cost of braces or clear aligners in Sirsa?",
          a: "Costs vary depending on whether you choose metal braces, ceramic braces, or custom clear aligners, as well as the complexity of crowding. We discuss transparent treatment packages during your initial consultation."
        },
        {
          q: "Can adults in their 30s or 40s get their teeth straightened?",
          a: "Absolutely. Adult orthodontics is extremely common today. As long as your gums and supporting bone are healthy, teeth can be safely repositioned at any age."
        }
      ]}
      relatedTreatments={[
        { title: "Teeth Whitening", url: "/services/teeth-whitening" },
        { title: "Porcelain Veneers & Laminates", url: "/services/porcelain-veneers" },
        { title: "Smile Makeover", url: "/services/smile-makeover" }
      ]}
    />
  );
}
