import React from 'react';
import { StardustButtonDemo } from "@/src/components/ui/stardust-button";
import { CircularGallery, GalleryItem } from '@/src/components/ui/circular-gallery';
import { CinematicFooter } from '@/src/components/ui/motion-footer';

// ... (galleryData remains same)

const CircularGalleryDemo = () => {
  return (
    <div className="w-full bg-charcoal text-silver" style={{ height: '300vh' }}>
      <div className="w-full h-screen sticky top-0 flex flex-col items-center justify-center overflow-hidden">
        <div className="text-center mb-8 absolute top-16 z-10">
          <h1 className="text-4xl font-bold">Animal Gallery</h1>
          <p className="text-cyan font-mono italic">Scroll to rotate the gallery</p>
        </div>
        <div className="w-full h-full">
          <CircularGallery items={galleryData} />
        </div>
      </div>
    </div>
  );
};

export default function DemoPage() {
  return (
    <div className="flex flex-col bg-charcoal min-h-screen">
      <section className="py-20 border-b border-silver/10">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-10 text-center text-silver">Stardust Button Demo</h2>
          <StardustButtonDemo />
        </div>
      </section>
      
      <section className="relative z-10 bg-charcoal border-b border-silver/10">
        <div className="container mx-auto px-4 py-20 pb-0">
          <h2 className="text-3xl font-bold mb-10 text-center text-silver">Circular Gallery & Cinematic Footer Reveal</h2>
        </div>
        <CircularGalleryDemo />
      </section>

      <section>
         {/* The footer reveal depends on scrolling past the content above it */}
         <CinematicFooter />
      </section>
    </div>
  );
}
