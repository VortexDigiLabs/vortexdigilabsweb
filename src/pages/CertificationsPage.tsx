import { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Certifications from '../components/Certifications';
import Footer from '../components/Footer';
import NexusAI from '../components/NexusAI';

export default function CertificationsPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-charcoal text-silver selection:bg-cyan/30 selection:text-white">
      <Navbar />
      <main className="pt-20">
        <Certifications />
      </main>
      <Footer />
      <NexusAI />
    </div>
  );
}
