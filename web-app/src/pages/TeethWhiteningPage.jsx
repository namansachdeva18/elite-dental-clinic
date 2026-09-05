import React from 'react';
import ServiceLandingPage from '../components/ServiceLandingPage';

export default function TeethWhiteningPage() {
  return (
    <ServiceLandingPage
      title="Teeth Whitening"
      metaTitle="Teeth Whitening in Sirsa | Safe LED Laser Bleaching | Elite Dental"
      metaDescription="Looking for teeth whitening in Sirsa? Get 6–8 shades brighter teeth in a single 45-minute clinic visit at Elite Dental Clinic. Enamel-safe, zero sensitivity."
      canonicalUrl="/services/teeth-whitening"
      breadcrumbs={[
        { name: "Home", url: "/" },
        { name: "Services", url: "/#services" },
        { name: "Teeth Whitening", url: "/services/teeth-whitening" }
      ]}
      heroBadge="In-Clinic Laser & LED Enamel-Safe Bleaching • Sirsa"
      h1="Professional Teeth Whitening in Sirsa"
      leadIntro="Erase years of stubborn stains from tea, coffee, smoking, and aging. Our dentist-supervised in-clinic bleaching delivers noticeably brighter smiles in under an hour without harming tooth enamel."
      quickFacts={[
        { label: "Procedure Duration", value: "45 minutes in a single comfortable visit" },
        { label: "Shade Improvement", value: "Up to 6 to 8 shades noticeably brighter" },
        { label: "Sensitivity Protection", value: "Built-in potassium nitrate desensitizing agent" },
        { label: "Enamel Safety", value: "100% pH-neutral dental formula" },
        { label: "Consultation Fee", value: "₹200 (Includes pre-whitening shade match)" },
        { label: "Results Longevity", value: "12 to 24 months with regular maintenance" }
      ]}
      whoIsThisFor={[
        "Brides, grooms, and wedding attendees seeking an instant smile glow",
        "Patients with heavy stains from tea, coffee, cola, or tobacco",
        "Individuals with natural yellowing or dullness due to enamel aging",
        "Working professionals preparing for interviews or stage presentations",
        "Anyone who has tried over-the-counter whitening toothpastes without real results"
      ]}
      whatItSolves={[
        "Removes deep intrinsic and extrinsic enamel stains safely",
        "Restores natural brightness to dull, aged, or discolored teeth",
        "Enhances overall facial youthfulness and smile confidence",
        "Safely avoids enamel abrasion caused by abrasive commercial powders"
      ]}
      symptomsList={[
        "Yellow or brownish discoloration on front teeth",
        "Dark stains from frequent chai or coffee consumption",
        "Uneven tooth shades noticeable in wedding photos",
        "Loss of youthful dental luster"
      ]}
      procedureSteps={[
        {
          title: "1. Baseline Shade Assessment & Polish",
          desc: "We measure your starting enamel shade against our clinical VITA shade guide and remove surface plaque with gentle ultrasonic polishing."
        },
        {
          title: "2. Protective Gingival Barrier Application",
          desc: "A liquid resin dam is applied along your gum line and light-cured to protect sensitive gum tissues from the whitening gel."
        },
        {
          title: "3. Professional Whitening Gel Activation",
          desc: "The medical-grade hydrogen peroxide gel is applied to the front teeth and activated with our specialized cold-blue LED bleaching light."
        },
        {
          title: "4. Multi-Cycle Activation (15 mins x 3)",
          desc: "The light breaks down stubborn chromophores deep within the enamel prisms over three 15-minute intervals."
        },
        {
          title: "5. Anti-Sensitivity Enamel Sealant",
          desc: "Gel is rinsed away and a remineralizing desensitizing sealant is applied to leave your enamel glossy and comfortable."
        }
      ]}
      technologyUsed={[
        {
          title: "Cold-Blue LED Bleaching Light",
          benefit: "Emits a narrow blue light spectrum that accelerates oxidation without thermal heating of the dental pulp."
        },
        {
          title: "pH-Neutral Bleaching Chemistry",
          benefit: "Formulated to preserve enamel micro-hardness while breaking down deep dietary discoloration."
        },
        {
          title: "Light-Cured Gingival Barrier",
          benefit: "Ensures complete soft-tissue isolation so your gums remain free from irritation or chemical burning."
        }
      ]}
      timelineAndRecovery={{
        timeline: "Completed in a single 45 to 60 minute in-clinic appointment with instant post-treatment results.",
        aftercare: "Follow the 'White Diet' for 48 hours following treatment: avoid dark staining substances like turmeric curry, coffee, tea, red wine, and tobacco to allow the enamel pores to settle."
      }}
      treatmentAlternatives={[
        {
          name: "Porcelain Veneers",
          comparison: "For severe fluorosis or tetracycline staining that does not respond to bleaching, porcelain veneers cover the front tooth surface completely with custom German ceramic."
        },
        {
          name: "Ultrasonic Scaling & Polishing",
          comparison: "Removes exterior tartar and surface tea stains. While it cleans teeth thoroughly, it restores your natural base shade rather than bleaching it multiple shades lighter."
        }
      ]}
      faqs={[
        {
          q: "Does teeth whitening damage tooth enamel?",
          a: "No. Professional dentist-supervised whitening uses pH-balanced solutions that break down stain molecules inside the microscopic enamel pores without stripping or thinning the enamel structure."
        },
        {
          q: "Will my teeth be sensitive after whitening?",
          a: "Some patients experience mild sensitivity for 12 to 24 hours. At Elite Dental Clinic, our whitening formula includes built-in desensitizing agents, and we apply a soothing fluoride mineralizer to minimize discomfort."
        },
        {
          q: "How long do the whitening results last?",
          a: "Results typically last 1 to 2 years, depending on dietary habits. Limiting heavy tea/coffee intake and practicing good oral hygiene preserves your bright shade significantly longer."
        },
        {
          q: "Can crowns, veneers, or fillings be whitened?",
          a: "Whitening gels only work on natural tooth enamel; they do not alter the shade of synthetic ceramic, zirconia, or composite resin restorations."
        }
      ]}
      relatedTreatments={[
        { title: "Porcelain Veneers", url: "/services/porcelain-veneers" },
        { title: "Smile Makeover", url: "/services/smile-makeover" },
        { title: "Dental Crowns & Bridges", url: "/services/dental-crowns-and-bridges" }
      ]}
    />
  );
}
