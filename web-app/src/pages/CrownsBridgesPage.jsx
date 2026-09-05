import React from 'react';
import ServiceLandingPage from '../components/ServiceLandingPage';

export default function CrownsBridgesPage() {
  return (
    <ServiceLandingPage
      title="Dental Crowns & Bridges"
      metaTitle="Dental Crowns & Bridges in Sirsa | Metal-Free Zirconia Caps | Elite Dental"
      metaDescription="Restore broken, root-canal treated, or missing teeth in Sirsa. Elite Dental Clinic provides German Zirconia & ceramic crowns with 10-year warranty options."
      canonicalUrl="/services/dental-crowns-and-bridges"
      breadcrumbs={[
        { name: "Home", url: "/" },
        { name: "Services", url: "/#services" },
        { name: "Dental Crowns & Bridges", url: "/services/dental-crowns-and-bridges" }
      ]}
      heroBadge="Metal-Free CAD/CAM Zirconia & Ceramic Restorations • Sirsa"
      h1="Dental Crowns & Bridges in Sirsa"
      leadIntro="Protect cracked teeth and replace missing dental units with precision-milled Zirconia crowns and fixed ceramic bridges. Engineered for maximum chewing durability and natural tooth aesthetics."
      quickFacts={[
        { label: "Appointments Required", value: "Typically 2 visits (Preparation + Cementation)" },
        { label: "Turnaround Time", value: "3 to 4 business days between visits" },
        { label: "Materials Offered", value: "Multilayer Monolithic Zirconia, E-max Ceramic, PFM" },
        { label: "Warranty Options", value: "Up to 10-year official laboratory warranty card" },
        { label: "Consultation Fee", value: "₹200 (Inclusive of digital shade matching)" },
        { label: "Durability", value: "15+ years with good oral hygiene" }
      ]}
      whoIsThisFor={[
        "Teeth that have undergone root canal treatment and need structural reinforcement",
        "Severely cracked, fractured, or worn-down teeth",
        "Patients with 1 or 2 missing teeth between healthy adjacent teeth (dental bridge)",
        "Teeth with large, broken, or failing amalgam fillings",
        "Patients wanting to replace dark, unsightly metal-lined PFM crowns with metal-free Zirconia"
      ]}
      whatItSolves={[
        "Restores full chewing power to weakened or fractured teeth",
        "Prevents post-RCT teeth from splitting down to the root",
        "Bridges empty gaps without removable plates or surgical implants",
        "Delivers seamless color harmony with adjacent natural teeth"
      ]}
      symptomsList={[
        "Sharp pain when chewing on a specific tooth",
        "Visible crack line through the tooth enamel",
        "Missing tooth creating a chewing gap",
        "Black line visible near the gum margin of an old crown"
      ]}
      procedureSteps={[
        {
          title: "1. Tooth Preparation & Core Foundation",
          desc: "The tooth is gently contoured around the perimeter under local anesthesia to create space for the crown thickness."
        },
        {
          title: "2. Precision Digital Impression",
          desc: "High-precision intraoral measurements capture the exact margins, bite registration, and relationship with opposing teeth."
        },
        {
          title: "3. Computer-Aided CAD/CAM Milling",
          desc: "The laboratory mills your crown from solid blocks of German Zirconia, sintering it at over 1500°C for exceptional structural density."
        },
        {
          title: "4. Shade Matching & Glaze Characterization",
          desc: "Individual tooth characterization and natural enamel translucency are baked on to match your surrounding smile perfectly."
        },
        {
          title: "5. Clinical Try-In & Permanent Resin Cementation",
          desc: "The bite, contact points, and margins are verified before permanent bonding with high-strength dual-cure resin cement."
        }
      ]}
      technologyUsed={[
        {
          title: "Multilayer Monolithic Zirconia",
          benefit: "Offers over 1100 MPa flexural strength — virtually unbreakable under heavy molar chewing forces, with zero metal."
        },
        {
          title: "CAD/CAM Digital Milling",
          benefit: "Guarantees microscopic margin seal preventing bacteria from leaking under the crown and causing secondary decay."
        },
        {
          title: "E-max Lithium Disilicate Glass Ceramic",
          benefit: "Ideal for front teeth requiring red-carpet translucency and seamless light transmission."
        }
      ]}
      timelineAndRecovery={{
        timeline: "Visit 1 (Preparation & temporary protection): ~45 mins. Visit 2 (Permanent bonding): ~20 mins, usually scheduled 3 to 4 days later.",
        aftercare: "You may chew normally within a few hours of cementation. Maintain twice-daily brushing and use dental floss or interdental brushes under bridge pontics."
      }}
      treatmentAlternatives={[
        {
          name: "Dental Implant",
          comparison: "For a missing tooth, an implant replaces the root without touching adjacent teeth. If adjacent teeth already need crowns, a bridge can be a fast, non-surgical alternative."
        },
        {
          name: "Composite Tooth Filling",
          comparison: "Suitable only for minor cavities. Large fillings in molars lack the circumferential hoop strength of a full-coverage crown and often lead to tooth fracture."
        }
      ]}
      faqs={[
        {
          q: "What is the difference between Zirconia and PFM (Metal-Ceramic) crowns?",
          a: "PFM crowns have a dark metal core coated with ceramic, which often reveals an unsightly black line at the gum margin over time. Zirconia is 100% metal-free, significantly stronger, and biocompatible with gum tissues."
        },
        {
          q: "Do dental crowns come with a warranty in Sirsa?",
          a: "Yes. Our premium Zirconia crowns come with manufacturer warranty cards ranging from 5 to 10 years, guaranteeing against chipping or material fracture."
        },
        {
          q: "Can a dental bridge fall off?",
          a: "When bonded with modern resin cements to properly prepared anchor teeth, dental bridges are extremely stable and feel like natural teeth."
        },
        {
          q: "How much does a dental crown cost in Sirsa?",
          a: "Cost depends on the material chosen (e.g. standard metal-ceramic vs. monolithic CAD/CAM Zirconia). We outline all material grades and price options during your ₹200 consultation."
        }
      ]}
      relatedTreatments={[
        { title: "Root Canal Treatment", url: "/services/root-canal-treatment" },
        { title: "Dental Implants", url: "/services/dental-implants" },
        { title: "Porcelain Veneers", url: "/services/porcelain-veneers" }
      ]}
    />
  );
}
