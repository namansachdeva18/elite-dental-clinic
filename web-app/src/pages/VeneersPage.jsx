import React from 'react';
import ServiceLandingPage from '../components/ServiceLandingPage';

export default function VeneersPage() {
  return (
    <ServiceLandingPage
      title="Porcelain Veneers & Laminates"
      metaTitle="Porcelain Veneers in Sirsa | Cosmetic Smile Transformation | Elite Dental"
      metaDescription="Get custom German porcelain veneers and composite laminates in Sirsa. Correct chipped, gapped, or discolored teeth with natural translucency. Consult Dr. Nandini Bansal."
      canonicalUrl="/services/porcelain-veneers"
      breadcrumbs={[
        { name: "Home", url: "/" },
        { name: "Services", url: "/#services" },
        { name: "Porcelain Veneers", url: "/services/porcelain-veneers" }
      ]}
      heroBadge="Cosmetic Dentistry & Aesthetic Laminates • Sirsa"
      h1="Porcelain Veneers & Dental Laminates in Sirsa"
      leadIntro="Custom-crafted ultra-thin German ceramic shells designed to correct stubborn discoloration, chipped edges, and minor dental gaps. Achieve natural aesthetic harmony with Dr. Nandini Bansal at Elite Dental Clinic Sirsa."
      quickFacts={[
        { label: "Appointments Required", value: "Typically 2 visits (Preparation + Bonding)" },
        { label: "Veneer Thickness", value: "0.3mm to 0.5mm ultra-thin preparation" },
        { label: "Material Options", value: "E-max Lithium Disilicate & Composite Laminates" },
        { label: "Stain Resistance", value: "100% glazed porcelain — impervious to coffee stains" },
        { label: "Consultation Fee", value: "₹200 (Includes facial smile line evaluation)" },
        { label: "Expected Longevity", value: "10 to 15+ years with proper oral care" }
      ]}
      whoIsThisFor={[
        "Individuals with severe intrinsic stains or fluorosis resistant to teeth whitening",
        "Patients with chipped, broken, or uneven front tooth edges",
        "Visible gaps or irregular spacing between upper front teeth",
        "Teeth that appear abnormally small, narrow, or worn down from clenching",
        "Patients wanting a permanent, symmetrical red-carpet smile transformation"
      ]}
      whatItSolves={[
        "Masks severe discoloration permanently with lifelike enamel translucency",
        "Creates uniform tooth shape, length, and proportional symmetry",
        "Closes front gaps without requiring months of orthodontic braces",
        "Provides permanent stain resistance against chai, coffee, and spices"
      ]}
      symptomsList={[
        "Chipped front tooth corner",
        "Uneven or jagged tooth edges",
        "Brown fluorosis streaks",
        "Gaps between front upper incisors"
      ]}
      procedureSteps={[
        {
          title: "1. Smile Analysis & Digital Aesthetic Planning",
          desc: "We analyze your facial midline, lip line, and tooth proportions to design a smile that looks completely natural with your features."
        },
        {
          title: "2. Conservative Micro-Preparation",
          desc: "Only a microscopic layer of front enamel (0.3mm to 0.5mm) is contoured to create space, preserving over 90% of your natural tooth structure."
        },
        {
          title: "3. Precision Impression & Temporary Placement",
          desc: "High-definition impressions are recorded and protective temporary veneers are placed while the master ceramist handcrafts your shells."
        },
        {
          title: "4. German Porcelain Ceramic Sintering",
          desc: "Individual ceramic layers are baked with customized translucency, internal mamelon details, and surface texture."
        },
        {
          title: "5. Resin Bonding & Curing",
          desc: "The veneers are bonded with high-bond-strength dual-cure resin luting agents, creating an inseparable union with your natural tooth."
        }
      ]}
      technologyUsed={[
        {
          title: "E-max Press Lithium Disilicate",
          benefit: "Provides 500 MPa strength with optical properties that mimic natural enamel light refraction."
        },
        {
          title: "Silane Coupling Chemical Bonding",
          benefit: "Molecularly fuses porcelain to etched enamel for lifelong adhesion that resists chewing dislodgment."
        },
        {
          title: "Digital Shade Spectroscopy",
          benefit: "Eliminates guessing by measuring exact natural tooth undertones for indistinguishable color blending."
        }
      ]}
      timelineAndRecovery={{
        timeline: "Completed in 2 clinical visits spaced 4 to 6 days apart. You walk out with your finished transformation after the second visit.",
        aftercare: "Maintain standard brushing and daily flossing. Avoid biting directly into hard objects like pens, ice, or opening bottles with front teeth."
      }}
      treatmentAlternatives={[
        {
          name: "Composite Bonding / Direct Laminates",
          comparison: "Completed in a single visit at lower cost, but composite resin absorbs stains over time and requires periodic polishing compared to stain-proof porcelain."
        },
        {
          name: "Clear Aligners / Orthodontics",
          comparison: "Aligners move teeth into alignment without altering their shape or color. Veneers fix alignment, shape, and shade all in one procedure."
        }
      ]}
      faqs={[
        {
          q: "Are veneers permanent?",
          a: "Because a tiny fraction of enamel is polished away to accommodate the veneer thickness, the procedure is irreversible. Quality porcelain veneers typically last 10 to 15+ years before requiring renewal."
        },
        {
          q: "Do porcelain veneers look fake or bulky?",
          a: "Not when engineered with modern 0.3mm ultra-thin ceramics. Dr. Nandini Bansal customizes the translucency, texture, and contour so your veneers look like natural, healthy teeth."
        },
        {
          q: "Can I eat normal food with porcelain veneers?",
          a: "Yes. Once fully bonded, veneers function like natural tooth enamel. You can chew regular Indian meals, rotis, and fruits without issue."
        },
        {
          q: "What is the cost of veneers in Sirsa?",
          a: "Cost depends on the number of units and material (direct composite vs. lab-fabricated German E-max porcelain). We review complete case quotes during your ₹200 consultation."
        }
      ]}
      relatedTreatments={[
        { title: "Smile Makeover", url: "/services/smile-makeover" },
        { title: "Teeth Whitening", url: "/services/teeth-whitening" },
        { title: "Dental Crowns & Bridges", url: "/services/dental-crowns-and-bridges" }
      ]}
    />
  );
}
