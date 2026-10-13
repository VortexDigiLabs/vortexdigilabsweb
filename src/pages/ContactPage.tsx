import { useEffect } from 'react';
import Navbar from '../components/Navbar';
import ArchitectureDiscovery from '../components/ArchitectureDiscovery';
import Footer from '../components/Footer';

export default function ContactPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#07080b] text-silver selection:bg-cyan/30 selection:text-white">
      <Navbar />
      <main className="pt-20">
        <ArchitectureDiscovery />
      </main>
      <Footer />
    </div>
  );
}
