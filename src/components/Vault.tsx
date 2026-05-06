import { CardStack, CardStackItem } from "./ui/card-stack";

const items: CardStackItem[] = [
  {
    id: "v1",
    title: "Quantum Shift",
    description: "Cinematic digital transition and motion architecture.",
    videoSrc: "https://res.cloudinary.com/ddfuc0ktg/video/upload/v1778082593/hyl4rk0mqayz4rui0ywy.mp4",
    href: "#",
  },
  {
    id: "v2",
    title: "Cyber Pulse",
    description: "Dynamic network visualization and data flow systems.",
    videoSrc: "https://res.cloudinary.com/ddfuc0ktg/video/upload/v1778082574/siu8fd0joplzizqstfdh.mp4",
    href: "#",
  },
  {
    id: "v3",
    title: "Digital Flux",
    description: "High-energy digital stream and particle dynamics.",
    videoSrc: "https://res.cloudinary.com/ddfuc0ktg/video/upload/v1778082533/wuyv3wxyz7jaafsuoaj5.mp4",
    href: "#",
  },
  {
    id: "v4",
    title: "Neural Network",
    description: "AI-driven architecture and synaptic interface design.",
    videoSrc: "https://res.cloudinary.com/ddfuc0ktg/video/upload/v1778082511/siqikkwcak8qetpqcbo2.mp4",
    href: "#",
  },
  {
    id: "v5",
    title: "RELQQ Design",
    description: "Strategic design systems for facility management.",
    imageSrc: "https://res.cloudinary.com/ddfuc0ktg/image/upload/v1778081574/relqqvg7gaochwjhhcnl.jpg",
    href: "#",
  },
  {
    id: "v6",
    title: "YYZB Graphics",
    description: "Precision-engineered graphic elements and identity.",
    imageSrc: "https://res.cloudinary.com/ddfuc0ktg/image/upload/v1778081574/yyzb0mvrbrbuehn8ojgo.png",
    href: "#",
  },
  {
    id: "v7",
    title: "R8UZ Systems",
    description: "Complex system integration and interactive data.",
    imageSrc: "https://res.cloudinary.com/ddfuc0ktg/image/upload/v1778081574/r8uzxlojqupwk00xykad.png",
    href: "#",
  },
  {
    id: "v8",
    title: "Vortex Stream",
    description: "Core intelligence rotation and orbital dynamics.",
    videoSrc: "https://res.cloudinary.com/ddfuc0ktg/video/upload/v1778082498/fwq6hupyz9ynfkynr9vy.mp4",
    href: "#",
  },
  {
    id: "v9",
    title: "Bio Rhythm",
    description: "Organic synthesis and biological interface flow.",
    videoSrc: "https://res.cloudinary.com/ddfuc0ktg/video/upload/v1778082479/uhmjmrlp7kcicnksxxaa.mp4",
    href: "#",
  },
  {
    id: "v10",
    title: "Plasma Core",
    description: "Energy discharge and high-intensity core dynamics.",
    videoSrc: "https://res.cloudinary.com/ddfuc0ktg/video/upload/v1778082473/ruhug5awcq6j8rdr3wub.mp4",
    href: "#",
  },
  {
    id: "v11",
    title: "Echo Logic",
    description: "Algorithmic flow and recursive digital logic.",
    videoSrc: "https://res.cloudinary.com/ddfuc0ktg/video/upload/v1778082371/bmda3o4eq1aux93vekf1.mp4",
    href: "#",
  },
];

export default function Vault() {
  return (
    <section id="vault" className="py-24 bg-charcoal text-silver overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl premium-heading mb-4 glitch-text" data-text="FEATURED WORK">
            FEATURED WORK
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
