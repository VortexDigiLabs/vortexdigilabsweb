import { ArrowRight } from 'lucide-react';

export default function Showcase() {
  return (
    <section id="showcase" className="py-24 bg-charcoal relative overflow-hidden flex flex-col items-center justify-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col items-center">
        
        <div className="w-full max-w-6xl rounded-2xl overflow-hidden border border-white/10 shadow-[0_0_50px_rgba(0,229,255,0.15)] relative group">
          <img 
            src="https://huprbedahpwszatolkce.supabase.co/storage/v1/object/public/Vortex%20Digi%20Labs%20-%20Website/Section%202.gif" 
            alt="Vortex Digi Labs Showcase" 
            className="w-full h-auto object-cover"
            referrerPolicy="no-referrer"
          />
          
          {/* Invisible overlay button positioned over the 'Get Started' button in the GIF */}
          <a
            href="#contact"
            className="absolute z-10 cursor-pointer rounded-lg transition-colors duration-300 hover:bg-white/10"
            style={{
              top: '46%',
              left: '10%',
              width: '20%',
              height: '12%',
            }}
            aria-label="Get Started"
          />
        </div>

      </div>
    </section>
  );
}
