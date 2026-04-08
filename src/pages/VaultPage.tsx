import { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Vault from '../components/Vault';
import VideoSection from '../components/VideoSection';

export default function VaultPage() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="min-h-screen bg-charcoal text-silver selection:bg-cyan/30 selection:text-white flex flex-col">
      <Navbar />
      <main className="flex-grow pt-20">
        <Vault />
        <VideoSection />
      </main>
      <Footer />
    </div>
  );
}
