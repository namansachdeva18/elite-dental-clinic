import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

export default function VideoPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const videoSchema = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    "name": "Prabhnoor Kaur Testimonial - Elite Dental Clinic",
    "description": "Happy international patient from Australia sharing her pain-free dental experience at Elite Dental Clinic Sirsa.",
    "thumbnailUrl": "https://www.elitedentalclinic.info/images/logo.webp",
    "uploadDate": "2024-03-20T08:00:00+08:00",
    "contentUrl": "https://www.elitedentalclinic.info/videos/prabhnoor-testimonial.mp4",
    "embedUrl": "https://www.elitedentalclinic.info/videos/prabhnoor-testimonial.mp4",
    "publisher": {
      "@type": "Organization",
      "name": "Elite Dental Clinic",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.elitedentalclinic.info/images/logo.webp"
      }
    },
    "duration": "PT1M"
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [{
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://www.elitedentalclinic.info/"
    },{
      "@type": "ListItem",
      "position": 2,
      "name": "Videos",
      "item": "https://www.elitedentalclinic.info/videos"
    },{
      "@type": "ListItem",
      "position": 3,
      "name": "Prabhnoor Kaur Testimonial"
    }]
  };

  return (
    <div className="py-32 px-6 min-h-[90vh] bg-[#FDFBF7]">
      <Helmet>
        <title>Watch: Prabhnoor Kaur Testimonial | Elite Dental Clinic</title>
        <meta name="description" content="Watch this video testimonial from Prabhnoor Kaur, an international patient from Australia, sharing her pain-free dental experience at Elite Dental Clinic Sirsa." />
        <link rel="canonical" href="https://www.elitedentalclinic.info/videos/prabhnoor-testimonial" />
        <script type="application/ld+json">{JSON.stringify(videoSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      </Helmet>
      
      <div className="max-w-4xl mx-auto flex flex-col items-center">
        <h1 className="text-4xl md:text-5xl font-display font-bold text-dark mb-6 text-center">
          Prabhnoor Kaur Testimonial
        </h1>
        
        <p className="text-muted text-center max-w-2xl mb-12">
          Watch along as international patient Prabhnoor Kaur from Australia shares her delightful and pain-free treatment experience at Elite Dental Clinic.
        </p>
        
        <div className="w-full relative rounded-3xl overflow-hidden shadow-2xl border border-gray-100 bg-black/5 flex items-center justify-center group mb-12 aspect-video max-w-[450px] mx-auto">
          <video
            className="w-full h-full object-cover rounded-3xl"
            controls
            preload="metadata"
            title="Prabhnoor Kaur Testimonial"
            aria-label="Prabhnoor Kaur speaking about her pain-free international dental experience at Elite Dental Clinic"
            poster="/images/logo.webp"
          >
            <source src="/videos/prabhnoor-testimonial.mp4" type="video/mp4" />
            Your browser does not support HTML5 video element.
          </video>
        </div>

        <div className="text-center w-full px-4 mb-16">
          <h2 className="font-display font-bold text-2xl text-dark mb-4">Video Summary</h2>
          <p className="font-sans text-muted leading-relaxed max-w-2xl mx-auto">
            In this short video, Prabhnoor reflects on the exceptional care she received. Traveling all the way from Australia, she trusted Elite Dental Clinic for her dental needs and was amazed by the seamless, high-tech, and entirely pain-free process provided by our expert doctors.
          </p>
        </div>

        <Link to="/#reviews" className="inline-flex bg-[#9A7B4F] text-white font-bold px-8 py-4 rounded-full hover:opacity-90 transition-opacity shadow-lg shadow-[#A38A5F]/20">
          &larr; Back to Home
        </Link>
      </div>
    </div>
  );
}
