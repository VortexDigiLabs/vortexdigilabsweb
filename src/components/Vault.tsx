import { CardStack, CardStackItem } from "./ui/card-stack";

const items: CardStackItem[] = [
  {
    id: "v1",
    title: "N6OX Innovation",
    description: "Advanced digital architecture and system design.",
    imageSrc: "https://res.cloudinary.com/ddfuc0ktg/image/upload/v1778081575/n6ox25nngnafwjyfbljz.png",
    href: "#",
  },
  {
    id: "v2",
    title: "WO6L Interface",
    description: "Modern UI/UX components for premium digital experiences.",
    imageSrc: "https://res.cloudinary.com/ddfuc0ktg/image/upload/v1778081575/wo6lqec9r8yuj5st8lgx.png",
    href: "#",
  },
  {
    id: "v3",
    title: "ALDJNE Architecture",
    description: "High-end structural and digital design concepts.",
    imageSrc: "https://res.cloudinary.com/ddfuc0ktg/image/upload/v1778081575/aldjne1ufhyuyl0jpduw.png",
    href: "#",
  },
  {
    id: "v4",
    title: "K0XI Visuals",
    description: "Immersive visual storytelling and brand assets.",
    imageSrc: "https://res.cloudinary.com/ddfuc0ktg/image/upload/v1778081574/k0xiwlgsdzen5tuu3g6f.png",
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
