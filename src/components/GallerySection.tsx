import React from 'react';
import { CircularGallery, GalleryItem } from './ui/circular-gallery';

const galleryData: GalleryItem[] = [
  {
    common: 'HYL4RK Shift',
    binomial: 'Quantum Motion',
    photo: {
      url: 'https://res.cloudinary.com/ddfuc0ktg/video/upload/v1778082593/hyl4rk0mqayz4rui0ywy.jpg',
      text: 'HYL4RK Shift cinematic motion',
      by: 'Vortex Digi Labs'
    },
    videoUrl: 'https://res.cloudinary.com/ddfuc0ktg/video/upload/v1778082593/hyl4rk0mqayz4rui0ywy.mp4'
  },
  {
    common: 'SIU8FD Pulse',
    binomial: 'Cyber Dynamic',
    photo: {
      url: 'https://res.cloudinary.com/ddfuc0ktg/video/upload/v1778082574/siu8fd0joplzizqstfdh.jpg',
      text: 'SIU8FD Pulse network flow',
      by: 'Vortex Digi Labs'
    },
    videoUrl: 'https://res.cloudinary.com/ddfuc0ktg/video/upload/v1778082574/siu8fd0joplzizqstfdh.mp4'
  },
  {
    common: 'WUYV3W Flux',
    binomial: 'Digital Stream',
    photo: {
      url: 'https://res.cloudinary.com/ddfuc0ktg/video/upload/v1778082533/wuyv3wxyz7jaafsuoaj5.jpg',
      text: 'WUYV3W Flux energy stream',
      by: 'Vortex Digi Labs'
    },
    videoUrl: 'https://res.cloudinary.com/ddfuc0ktg/video/upload/v1778082533/wuyv3wxyz7jaafsuoaj5.mp4'
  },
  {
    common: 'SIQIKK Neural',
    binomial: 'AI Architecture',
    photo: {
      url: 'https://res.cloudinary.com/ddfuc0ktg/video/upload/v1778082511/siqikkwcak8qetpqcbo2.jpg',
      text: 'SIQIKK Neural network visualization',
      by: 'Vortex Digi Labs'
    },
    videoUrl: 'https://res.cloudinary.com/ddfuc0ktg/video/upload/v1778082511/siqikkwcak8qetpqcbo2.mp4'
  },
  {
    common: 'FWQ6HU Vortex',
    binomial: 'Core Intelligence',
    photo: {
      url: 'https://res.cloudinary.com/ddfuc0ktg/video/upload/v1778082498/fwq6hupyz9ynfkynr9vy.jpg',
      text: 'FWQ6HU Vortex core rotation',
      by: 'Vortex Digi Labs'
    },
    videoUrl: 'https://res.cloudinary.com/ddfuc0ktg/video/upload/v1778082498/fwq6hupyz9ynfkynr9vy.mp4'
  },
  {
    common: 'UHMJMR Rhythm',
    binomial: 'Bio Synthesis',
    photo: {
      url: 'https://res.cloudinary.com/ddfuc0ktg/video/upload/v1778082479/uhmjmrlp7kcicnksxxaa.jpg',
      text: 'UHMJMR Rhythm organic synthesis',
      by: 'Vortex Digi Labs'
    },
    videoUrl: 'https://res.cloudinary.com/ddfuc0ktg/video/upload/v1778082479/uhmjmrlp7kcicnksxxaa.mp4'
  },
  {
    common: 'RUHUG5 Plasma',
    binomial: 'Energy Core',
    photo: {
      url: 'https://res.cloudinary.com/ddfuc0ktg/video/upload/v1778082473/ruhug5awcq6j8rdr3wub.jpg',
      text: 'RUHUG5 Plasma energy discharge',
      by: 'Vortex Digi Labs'
    },
    videoUrl: 'https://res.cloudinary.com/ddfuc0ktg/video/upload/v1778082473/ruhug5awcq6j8rdr3wub.mp4'
  },
  {
    common: 'BMDA3O Echo',
    binomial: 'Logic Flow',
    photo: {
      url: 'https://res.cloudinary.com/ddfuc0ktg/video/upload/v1778082371/bmda3o4eq1aux93vekf1.jpg',
      text: 'BMDA3O Echo algorithmic flow',
      by: 'Vortex Digi Labs'
    },
    videoUrl: 'https://res.cloudinary.com/ddfuc0ktg/video/upload/v1778082371/bmda3o4eq1aux93vekf1.mp4'
  },
];

export default function GallerySection() {
  const [radius, setRadius] = React.useState(800);

  React.useEffect(() => {
    const updateRadius = () => {
      if (window.innerWidth < 768) {
        setRadius(400);
      } else if (window.innerWidth < 1024) {
        setRadius(600);
      } else {
        setRadius(800);
      }
    };
    
    updateRadius();
    window.addEventListener('resize', updateRadius);
    return () => window.removeEventListener('resize', updateRadius);
  }, []);

  return (
    <div className="w-full bg-charcoal" style={{ height: window.innerWidth < 768 ? '150vh' : '300vh' }}>
      <div className="w-full h-screen sticky top-0 flex flex-col items-center justify-center overflow-hidden">
        <div className="text-center mb-8 absolute top-16 z-10">
          <h2 className="text-4xl md:text-6xl font-black text-silver premium-heading mb-4">
            DIGITAL SPACES
          </h2>
        </div>
        <div className="w-full h-full">
          <CircularGallery items={galleryData} radius={radius} />
        </div>
      </div>
    </div>
  );
}
