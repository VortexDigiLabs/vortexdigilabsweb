import { useEffect } from 'react';
import Navbar from '../components/Navbar';
import NexusAIWizard from '../components/NexusAIWizard';
import Footer from '../components/Footer';

export default function ContactPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-charcoal text-silver selection:bg-cyan/30 selection:text-white">
      <Navbar />
      <main className="pt-20">
        <NexusAIWizard />
      </main>
      <Footer />
    </div>
  );
}
