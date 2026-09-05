import React from 'react';
import ServiceLandingPage from '../components/ServiceLandingPage';

export default function DentalImplantsPage() {
  return (
    <ServiceLandingPage
      title="Dental Implants"
      metaTitle="Dental Implants in Sirsa | Permanent Tooth Replacement | Elite Dental"
      metaDescription="Looking for permanent dental implants in Sirsa? Elite Dental Clinic offers titanium tooth replacements with lifetime strength and natural aesthetics. Consult Dr. Nandini Bansal."
      canonicalUrl="/services/dental-implants"
      breadcrumbs={[
        { name: "Home", url: "/" },
        { name: "Services", url: "/#services" },
        { name: "Dental Implants", url: "/services/dental-implants" }
      ]}
      heroBadge="Titanium & Zirconia Permanent Replacements • Sirsa"
      h1="Permanent Dental Implants in Sirsa"
      leadIntro="Restore your chewing strength and natural smile with bio-compatible titanium dental implants. The gold-standard solution for missing teeth, performed under clinical PGI sterilization standards at Elite Dental Clinic Sirsa."
      quickFacts={[
        { label: "Procedure Duration", value: "45 to 60 minutes for implant placement" },
        { label: "Osseointegration Period", value: "8 to 12 weeks for solid bone integration" },
        { label: "Material Used", value: "Medical-grade Grade-V Titanium / Zirconia" },
        { label: "Bite Strength Restored", value: "Up to 98% of natural tooth biting power" },
        { label: "Consultation Fee", value: "₹200 (Inclusive of comprehensive exam)" },
        { label: "Expected Lifespan", value: "25+ years to a lifetime with routine care" }
      ]}
      whoIsThisFor={[
        "Individuals with one or more missing teeth",
        "Patients frustrated with loose or slipping removable dentures",
        "Anyone who wants to avoid grinding down adjacent teeth for a dental bridge",
        "Patients suffering from bone loss due to long-term missing teeth",
        "Adults seeking a permanent, natural-looking tooth replacement"
      ]}
      whatItSolves={[
        "Permanently replaces missing teeth with realistic function and aesthetics",
        "Halts jawbone deterioration and sunken facial skin aging",
        "Allows you to eat hard, crunchy, and fibrous foods without hesitation",
        "Eliminates embarrassing speech slips or clicks associated with dentures"
      ]}
      symptomsList={[
        "Missing molar or front tooth",
        "Difficulty chewing apples, nuts, or rotis",
        "Dentures causing painful gum sores",
        "Adjacent teeth drifting into empty tooth gaps",
        "Self-consciousness when smiling in social gatherings"
      ]}
      procedureSteps={[
        {
          title: "1. Diagnostic Evaluation & Bone Density Assessment",
          desc: "We analyze your jawbone height and width with digital radiographs to plan the exact 3D angulation and implant diameter."
        },
        {
          title: "2. Gentle Precision Implant Fixture Placement",
          desc: "Under local anesthesia, the medical-grade titanium screw is seated precisely into the jawbone. The procedure is typically painless and comfortable."
        },
        {
          title: "3. Osseointegration (Bone Fusion)",
          desc: "Over 8 to 12 weeks, the titanium implant fuses with your natural bone cells, forming a rock-solid artificial root foundation."
        },
        {
          title: "4. Abutment & Digital Crown Fitting",
          desc: "An abutment connector is attached, and a custom-milled zirconia crown matched to your natural tooth shade is cemented or screw-retained."
        }
      ]}
      technologyUsed={[
        {
          title: "Precision Torque Implant Motor",
          benefit: "Provides micro-controlled insertion torque preventing bone overheating and accelerating biological healing."
        },
        {
          title: "CAD/CAM Milled Zirconia Crowns",
          benefit: "Custom digital design delivers exact contact points and lifelike translucency matching your adjacent teeth."
        },
        {
          title: "PGI Sterilization Environment",
          benefit: "Dedicated surgical draping and 100% autoclave validation to minimize post-operative infection risks."
        },
        {
          title: "Laser Soft Tissue Profiling",
          benefit: "Contours the gum line around the implant collar for natural emergence and easy floss cleaning."
        }
      ]}
      timelineAndRecovery={{
        timeline: "The initial surgical placement takes under an hour. Complete healing and bone bonding typically takes 2 to 3 months before final ceramic crown placement.",
        aftercare: "Maintain a soft diet for the first 3 to 5 days. Keep the area clean with warm salt water rinses as directed. Most patients return to regular work the very next day."
      }}
      treatmentAlternatives={[
        {
          name: "Fixed Dental Bridge",
          comparison: "A bridge can replace missing teeth quicker, but requires trimming down adjacent healthy teeth. Implants stand independently without harming neighboring teeth."
        },
        {
          name: "Removable Dentures",
          comparison: "Significantly cheaper upfront, but dentures restore only 20-30% of chewing efficiency, slip during meals, and do not stop gradual jawbone shrinkage."
        }
      ]}
      faqs={[
        {
          q: "What is the cost of dental implants in Sirsa?",
          a: "Dental implant costs depend on bone availability, need for bone grafting, and the choice of crown material (e.g. monolithic Zirconia vs PFM). A transparent clinical quote is provided after your ₹200 diagnostic evaluation."
        },
        {
          q: "Is dental implant surgery painful?",
          a: "Most patients report that having a dental implant placed is much less uncomfortable than having a tooth extracted. The surgery is performed under targeted local anesthesia so you feel no sharp sensations."
        },
        {
          q: "Can older adults get dental implants?",
          a: "Yes. Age is rarely a barrier for dental implants. Overall health and sufficient jawbone density are the key criteria. We have successfully restored smiles for patients well into their 70s."
        },
        {
          q: "How long do dental implants last?",
          a: "With routine brushing, flossing, and 6-month dental checkups, quality titanium implants have a success rate exceeding 95% and can last 25 years to a lifetime."
        }
      ]}
      relatedTreatments={[
        { title: "Dental Crowns & Bridges", url: "/services/dental-crowns-and-bridges" },
        { title: "Root Canal Treatment", url: "/services/root-canal-treatment" },
        { title: "Smile Makeover", url: "/services/smile-makeover" }
      ]}
    />
  );
}
