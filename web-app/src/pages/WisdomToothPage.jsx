import React from 'react';
import ServiceLandingPage from '../components/ServiceLandingPage';

export default function WisdomToothPage() {
  return (
    <ServiceLandingPage
      title="Wisdom Tooth Treatment & Extraction"
      metaTitle="Wisdom Tooth Removal in Sirsa | Gentle Surgical Extraction | Elite Dental"
      metaDescription="Experiencing wisdom tooth pain, swelling, or jaw stiffness in Sirsa? Elite Dental Clinic offers atraumatic, gentle wisdom tooth removal by Dr. Nandini Bansal."
      canonicalUrl="/services/wisdom-tooth-extraction"
      breadcrumbs={[
        { name: "Home", url: "/" },
        { name: "Services", url: "/#services" },
        { name: "Wisdom Tooth Treatment", url: "/services/wisdom-tooth-extraction" }
      ]}
      heroBadge="Minor Oral Surgery & Pain Relief • Sirsa"
      h1="Wisdom Tooth Treatment & Gentle Removal in Sirsa"
      leadIntro="Relieve agonizing jaw pain, localized cheek swelling, and recurrent gum infections caused by impacted third molars. Performed with atraumatic surgical methods and precision local anesthesia at Elite Dental Clinic Sirsa."
      quickFacts={[
        { label: "Procedure Duration", value: "25 to 45 minutes depending on impaction depth" },
        { label: "Surgical Approach", value: "Atraumatic bone-preserving minor oral surgery" },
        { label: "Anesthesia Used", value: "Targeted nerve block with zero intra-operative pain" },
        { label: "Recovery Period", value: "2 to 4 days for initial soft tissue closure" },
        { label: "Consultation Fee", value: "₹200 (Includes digital radiograph evaluation)" },
        { label: "Emergency Slots", value: "Priority same-day relief for acute pericoronitis" }
      ]}
      whoIsThisFor={[
        "Patients with recurring throbbing pain at the back corners of the jaw",
        "Individuals unable to fully open their mouth due to jaw stiffness (trismus)",
        "Swollen or tender gum flap over a partially erupted wisdom tooth (pericoronitis)",
        "Wisdom teeth growing horizontally and damaging roots of adjacent second molars",
        "Patients with food trap cavities between third and second molars"
      ]}
      whatItSolves={[
        "Stops intense headaches, jaw throbbing, and ear radiation pain permanently",
        "Prevents deep cyst formation and bone resorption in the posterior mandible",
        "Protects healthy second molar teeth from root caries and irreversible decay",
        "Eliminates bad breath caused by food rot under partially trapped gum flaps"
      ]}
      symptomsList={[
        "Severe jaw pain radiating to ear or temple",
        "Swollen, red, or bleeding gums at the back of the mouth",
        "Difficulty chewing or swallowing food",
        "Foul taste or bad breath from trapped bacteria",
        "Stiffness when opening the mouth wide"
      ]}
      procedureSteps={[
        {
          title: "1. Diagnostic Radiograph (OPG / IOPA)",
          desc: "We evaluate the exact 3D root curvature, impaction type (mesioangular, horizontal, vertical), and distance from the inferior alveolar nerve canal."
        },
        {
          title: "2. Deep Local Anesthetic Block",
          desc: "Targeted anesthesia numbs the quadrant completely so that you only feel light pressure, with zero sharp pain during the extraction."
        },
        {
          title: "3. Gentle Atraumatic Tooth Sectioning",
          desc: "Rather than forcing the tooth against the bone, the tooth is sectioned into smaller segments with precision dental burs and gently removed piece by piece."
        },
        {
          title: "4. Thorough Debridement & Socket Irrigation",
          desc: "The extraction site is flushed with sterile saline to eliminate bone dust and bacteria, promoting rapid blood clot stabilization."
        },
        {
          title: "5. Resorbable Sutures & Pressure Pack",
          desc: "Small dissolving or fine sutures close the gum margins to prevent food lodgment, and a gauze pressure pack stops bleeding within minutes."
        }
      ]}
      technologyUsed={[
        {
          title: "Piezoelectric & Surgical Handpieces",
          benefit: "Provides clean, low-heat surgical cuts that dramatically minimize post-op facial swelling and bone trauma."
        },
        {
          title: "Sterile Surgical Suite Setup",
          benefit: "Full hospital-grade draping and autoclaved armamentarium ensuring safe healing without alveolitis or dry socket."
        },
        {
          title: "Laser Soft Tissue Gum Contouring",
          benefit: "For mild cases without bone impaction, laser operculectomy removes overlying gum flaps without full tooth extraction."
        }
      ]}
      timelineAndRecovery={{
        timeline: "The procedure is finished in 30 to 45 minutes in a single outpatient sitting. Normal eating is resumed within 2 to 3 days.",
        aftercare: "Bite firmly on the sterile gauze pack for 45 minutes. Avoid spitting, sucking through straws, or drinking hot liquids for 24 hours to protect the healing blood clot. Apply ice packs externally to cheek during the first 12 hours."
      }}
      treatmentAlternatives={[
        {
          name: "Laser Operculectomy (Gum Flap Trimming)",
          comparison: "If the wisdom tooth is growing in an upright, functional position and only covered by a minor gum flap, trimming the flap with dental laser can save the tooth."
        },
        {
          name: "Antibiotic Therapy Alone",
          comparison: "Antibiotics only provide temporary relief of acute bacterial flares. They cannot fix the physical impaction angle, and pain will recur until the underlying tooth is removed."
        }
      ]}
      faqs={[
        {
          q: "Does wisdom tooth extraction hurt at Elite Dental Clinic?",
          a: "No. With proper local nerve block anesthesia, the entire procedure is completely painless. You will feel pressure sensations as the tooth is elevated, but no sharp pain."
        },
        {
          q: "What is a dry socket and how do you prevent it?",
          a: "A dry socket occurs if the protective blood clot in the socket is dislodged before the bone heals. Following our post-op instructions (no smoking, no spitting, no drinking with straws for 48 hours) prevents dry socket in over 99% of patients."
        },
        {
          q: "How many days off work will I need after removal?",
          a: "Most patients require only 1 day of rest and can return to office work or studies the next day. Strenuous gym exercise should be avoided for 48 hours."
        },
        {
          q: "Do all four wisdom teeth need to be extracted at once?",
          a: "Not necessarily. We only recommend removing wisdom teeth that are actively causing pain, impaction damage, or decay. If both teeth on one side require removal, they can be treated in the same visit for convenience."
        }
      ]}
      relatedTreatments={[
        { title: "Root Canal Treatment", url: "/services/root-canal-treatment" },
        { title: "Dental Implants", url: "/services/dental-implants" },
        { title: "Dental Crowns & Bridges", url: "/services/dental-crowns-and-bridges" }
      ]}
    />
  );
}
