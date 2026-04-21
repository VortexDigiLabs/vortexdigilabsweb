import { CardStack, CardStackItem } from "./ui/card-stack";

const items: CardStackItem[] = [
  {
    id: 7,
    title: "Video Project 10",
    description: "Immersive video experience.",
    videoSrc: "https://huprbedahpwszatolkce.supabase.co/storage/v1/object/public/Vortex%20Digi%20Labs%20-%20Website/Video%20Project%2010.mp4",
    href: "#",
  },
  {
    id: 1,
    title: "Background Paths",
    description: "Dynamic and engaging background path animations.",
    imageSrc: "https://huprbedahpwszatolkce.supabase.co/storage/v1/object/public/Vortex%20Digi%20Labs%20-%20Website/Background%20Paths.webp",
    href: "#",
  },
  {
    id: 2,
    title: "Bento Cards",
    description: "Modern bento-style card layouts for data presentation.",
    imageSrc: "https://huprbedahpwszatolkce.supabase.co/storage/v1/object/public/Vortex%20Digi%20Labs%20-%20Website/Bento%20Cards.webp",
    href: "#",
  },
  {
    id: 3,
    title: "AI Upscaled Vision",
    description: "High-resolution AI generated and upscaled imagery.",
    imageSrc: "https://huprbedahpwszatolkce.supabase.co/storage/v1/object/public/Vortex%20Digi%20Labs%20-%20Website/gemini-3-pro-image-preview-2k_a_Upscale_to_4k_only..png",
    href: "#",
  },
  {
    id: 4,
    title: "Info Cards",
    description: "Clean and informative card designs.",
    imageSrc: "https://huprbedahpwszatolkce.supabase.co/storage/v1/object/public/Vortex%20Digi%20Labs%20-%20Website/Info%20Cards.webp",
    href: "#",
  },
  {
    id: 5,
    title: "Scroll Animation",
    description: "Smooth and interactive scroll-based animations.",
    imageSrc: "https://huprbedahpwszatolkce.supabase.co/storage/v1/object/public/Vortex%20Digi%20Labs%20-%20Website/Scroll%20Animation.webp",
    href: "#",
  },
  {
    id: 6,
    title: "Shader Animation",
    description: "Advanced WebGL shader animations.",
    imageSrc: "https://huprbedahpwszatolkce.supabase.co/storage/v1/object/public/Vortex%20Digi%20Labs%20-%20Website/Shader%20Animation.webp",
    href: "#",
  },
  {
    id: 8,
    title: "Video Project 11",
    description: "Dynamic video showcase.",
    videoSrc: "https://huprbedahpwszatolkce.supabase.co/storage/v1/object/public/Vortex%20Digi%20Labs%20-%20Website/Video%20Project%2011.mp4",
    href: "#",
  },
];

export default function Vault() {
  return (
    <section id="vault" className="py-24 bg-charcoal text-silver overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold font-mono text-white mb-4 tracking-tight">
            THE <span className="text-cyan">VAULT</span>
          </h2>
          <p className="text-lg text-silver/80 max-w-2xl mx-auto">
            Explore our interactive gallery of digital and physical innovations.
          </p>
        </div>
        
        <div className="w-full">
          <div className="mx-auto w-full max-w-5xl p-8">
            <CardStack
              items={items}
              initialIndex={0}
              autoAdvance
              intervalMs={3000}
              pauseOnHover
              showDots
            />
          </div>
        </div>
      </div>
    </section>
  );
}
