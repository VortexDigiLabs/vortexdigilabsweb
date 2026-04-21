import React from 'react';
import { CircularGallery, GalleryItem } from './ui/circular-gallery';

const galleryData: GalleryItem[] = [
	{
		common: 'Butcher Shop',
		binomial: 'Visual Branding',
		photo: {
			url: 'https://bxmgsjtsxygxfgvpnnjh.supabase.co/storage/v1/object/public/Vortex%20Digi%20labs%20Main%20Website/Butcher.png',
			text: 'Butcher shop visual identity',
			by: 'Vortex Digi Labs'
		}
	},
	{
		common: 'Industrial Hub',
		binomial: 'Construction & Design',
		photo: {
			url: 'https://bxmgsjtsxygxfgvpnnjh.supabase.co/storage/v1/object/public/Vortex%20Digi%20labs%20Main%20Website/Construction.png',
			text: 'Construction site visualization',
			by: 'Vortex Digi Labs'
		}
	},
	{
		common: 'Euphoria',
		binomial: 'Digital Experience',
		photo: {
			url: 'https://bxmgsjtsxygxfgvpnnjh.supabase.co/storage/v1/object/public/Vortex%20Digi%20labs%20Main%20Website/Feel%20The%20Euphoria.png',
			text: 'Feel the Euphoria digital art',
			by: 'Vortex Digi Labs'
		}
	},
	{
		common: 'Kahana',
		binomial: 'Luxury Lifestyle',
		photo: {
			url: 'https://bxmgsjtsxygxfgvpnnjh.supabase.co/storage/v1/object/public/Vortex%20Digi%20labs%20Main%20Website/Kahana.png',
			text: 'Kahana lifestyle branding',
			by: 'Vortex Digi Labs'
		}
	},
	{
		common: 'Karoo Velvet',
		binomial: 'Premium Textures',
		photo: {
			url: 'https://bxmgsjtsxygxfgvpnnjh.supabase.co/storage/v1/object/public/Vortex%20Digi%20labs%20Main%20Website/Karoo%20Velvet.png',
			text: 'Karoo Velvet aesthetic',
			by: 'Vortex Digi Labs'
		}
	},
	{
		common: 'PlatteLand',
		binomial: 'Rural Landscapes',
		photo: {
			url: 'https://bxmgsjtsxygxfgvpnnjh.supabase.co/storage/v1/object/public/Vortex%20Digi%20labs%20Main%20Website/PlatteLand.png',
			text: 'PlatteLand visualization',
			by: 'Vortex Digi Labs'
		}
	},
	{
		common: 'Jelly 2.0',
		binomial: 'Abstract Motion',
		photo: {
			url: 'https://bxmgsjtsxygxfgvpnnjh.supabase.co/storage/v1/object/public/Vortex%20Digi%20labs%20Main%20Website/Jelly%202.PNG',
			text: 'Abstract jelly art',
			by: 'Vortex Digi Labs'
		}
	},
	{
		common: 'NFT Template',
		binomial: 'Digital Assets',
		photo: {
			url: 'https://images.unsplash.com/photo-1644018335954-ab54c83aa049?w=900&auto=format&fit=crop&q=80',
			text: 'Premium NFT template video',
			by: 'Vortex Digi Labs'
		},
		videoUrl: 'https://bxmgsjtsxygxfgvpnnjh.supabase.co/storage/v1/object/public/Vortex%20Digi%20labs%20Main%20Website/Template%20NFT.mp4'
	},
];

export default function GallerySection() {
  return (
    <div className="w-full bg-charcoal" style={{ height: '300vh' }}>
      <div className="w-full h-screen sticky top-0 flex flex-col items-center justify-center overflow-hidden">
        <div className="text-center mb-8 absolute top-32 z-10">
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-silver premium-heading mb-4">
            DIGITAL SPACES
          </h2>
        </div>
        <div className="w-full h-full">
          <CircularGallery items={galleryData} radius={800} />
        </div>
      </div>
    </div>
  );
}
