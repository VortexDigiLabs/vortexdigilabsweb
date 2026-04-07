import React, { useState } from 'react';

const VortexForm: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSuccessMessage('');

    const form = e.currentTarget;
    
    // Validate Primary Service is selected
    const primaryCheckboxes = form.querySelectorAll<HTMLInputElement>('input[name="Primary_Service"]:checked');
    if (primaryCheckboxes.length === 0) {
      setSuccessMessage('Please select at least one option for "What do you need help with?".');
      setIsSubmitting(false);
      return;
    }

    const data = new FormData(form);

    // Helper to combine multiple checkboxes into a single comma-separated string
    const combineCheckboxes = (name: string) => {
      const checkboxes = form.querySelectorAll<HTMLInputElement>(`input[name="${name}"]:checked`);
      if (checkboxes.length > 0) {
        const valuesArray = Array.from(checkboxes).map(cb => cb.value);
        data.set(name, valuesArray.join(', '));
      }
    };

    combineCheckboxes('Primary_Service');
    combineCheckboxes('Add_ons');
    combineCheckboxes('Budget');

    try {
      // Send data to Google Sheets
      await fetch('https://script.google.com/macros/s/AKfycbxluhaYj7f2nFIZ8TmedkS6jj2hmg88V32VlBa4n_8bXQt7RNQ3AQBpv0g3mXN_uGri/exec', {
        method: 'POST',
        body: data,
        mode: 'no-cors', // Required for Google Apps Script
      });

      setSuccessMessage('Success! Your project details have been submitted. We will be in touch.');
      form.reset();
    } catch (error) {
      setSuccessMessage('There was an error submitting the form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div id="contact" style={{ maxWidth: '600px', margin: '40px auto', color: '#ffffff', fontFamily: "'Inter', sans-serif", background: '#111111', padding: '40px', borderRadius: '8px', border: '1px solid #333333' }}>
      <form id="vortexForm" onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        
        <label style={{ fontSize: '14px', fontWeight: '500', color: '#cccccc' }}>Full Name *</label>
        <input type="text" name="Name" required placeholder="John Doe" style={inputStyle} />

        <label style={{ fontSize: '14px', fontWeight: '500', color: '#cccccc' }}>Email Address *</label>
        <input type="email" name="Email" required placeholder="john@company.com" style={inputStyle} />

        <label style={{ fontSize: '14px', fontWeight: '500', color: '#cccccc' }}>Contact Number *</label>
        <input type="tel" name="Phone" required placeholder="+27 12 345 6789" style={inputStyle} />

        <label style={{ fontSize: '14px', fontWeight: '500', color: '#cccccc' }}>Company / Brand Name</label>
        <input type="text" name="Company" placeholder="Acme Corp" style={inputStyle} />

        <label style={{ fontSize: '14px', fontWeight: '500', color: '#cccccc' }}>What do you need help with? *</label>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', background: '#1a1a1a', padding: '15px', borderRadius: '4px', border: '1px solid #333' }}>
          <label style={{ color: '#ffffff', fontWeight: '400', cursor: 'pointer' }}><input type="checkbox" name="Primary_Service" value="Immersive 3D Website Build" /> Immersive 3D Website Build</label>
          <label style={{ color: '#ffffff', fontWeight: '400', cursor: 'pointer' }}><input type="checkbox" name="Primary_Service" value="Premium Landing Page / Website" /> Premium Landing Page / Website</label>
          <label style={{ color: '#ffffff', fontWeight: '400', cursor: 'pointer' }}><input type="checkbox" name="Primary_Service" value="E-Commerce Store Setup" /> E-Commerce Store Setup</label>
          <label style={{ color: '#ffffff', fontWeight: '400', cursor: 'pointer' }}><input type="checkbox" name="Primary_Service" value="SEO & Google Maps Optimization" /> SEO & Google Maps Optimization</label>
          <label style={{ color: '#ffffff', fontWeight: '400', cursor: 'pointer' }}><input type="checkbox" name="Primary_Service" value="Social Media Management" /> Social Media Management</label>
          <label style={{ color: '#ffffff', fontWeight: '400', cursor: 'pointer' }}><input type="checkbox" name="Primary_Service" value="AI Content (Avatars, Videos, Voice)" /> AI Content (Avatars, Videos, Voice)</label>
          <label style={{ color: '#ffffff', fontWeight: '400', cursor: 'pointer' }}><input type="checkbox" name="Primary_Service" value="Full Digital Strategy (Multiple Services)" /> Full Digital Strategy (Multiple Services)</label>
        </div>

        <label style={{ fontSize: '14px', fontWeight: '500', color: '#cccccc' }}>Which AI/Content add-ons interest you? (Check all that apply)</label>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', background: '#1a1a1a', padding: '15px', borderRadius: '4px', border: '1px solid #333' }}>
          <label style={{ color: '#ffffff', fontWeight: '400', cursor: 'pointer' }}><input type="checkbox" name="Add_ons" value="Short-form Video Content" /> Short-form Video Content</label>
          <label style={{ color: '#ffffff', fontWeight: '400', cursor: 'pointer' }}><input type="checkbox" name="Add_ons" value="Custom AI Avatars" /> Custom AI Avatars</label>
          <label style={{ color: '#ffffff', fontWeight: '400', cursor: 'pointer' }}><input type="checkbox" name="Add_ons" value="Podcast / Voiceover Editing" /> Podcast / Voiceover Editing</label>
          <label style={{ color: '#ffffff', fontWeight: '400', cursor: 'pointer' }}><input type="checkbox" name="Add_ons" value="High-Volume Image Generation" /> High-Volume Image Generation</label>
        </div>

        <label style={{ fontSize: '14px', fontWeight: '500', color: '#cccccc' }}>Estimated Budget Range</label>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', background: '#1a1a1a', padding: '15px', borderRadius: '4px', border: '1px solid #333' }}>
          <label style={{ color: '#ffffff', fontWeight: '400', cursor: 'pointer' }}><input type="checkbox" name="Budget" value="R500 - R5k" /> R500 - R5k</label>
          <label style={{ color: '#ffffff', fontWeight: '400', cursor: 'pointer' }}><input type="checkbox" name="Budget" value="R5k - R15k" /> R5k - R15k</label>
          <label style={{ color: '#ffffff', fontWeight: '400', cursor: 'pointer' }}><input type="checkbox" name="Budget" value="R15k - R40k" /> R15k - R40k</label>
          <label style={{ color: '#ffffff', fontWeight: '400', cursor: 'pointer' }}><input type="checkbox" name="Budget" value="R40k+" /> R40k+</label>
          <label style={{ color: '#ffffff', fontWeight: '400', cursor: 'pointer' }}><input type="checkbox" name="Budget" value="Let's Discuss" /> Let's Discuss</label>
        </div>

        <label style={{ fontSize: '14px', fontWeight: '500', color: '#cccccc' }}>Tell us about your vision</label>
        <textarea name="Vision" rows={4} placeholder="E.g., I need a 3D landing page for my Johannesburg real estate company..." style={inputStyle} />

        <button type="submit" disabled={isSubmitting} style={{ background: isSubmitting ? '#006655' : '#00ffcc', color: '#000', padding: '16px', border: 'none', fontWeight: 'bold', cursor: isSubmitting ? 'not-allowed' : 'pointer', borderRadius: '4px', fontSize: '16px', marginTop: '10px' }}>
          {isSubmitting ? 'Submitting...' : 'Start My Project'}
        </button>

        {successMessage && <p style={{ color: '#00ffcc', textAlign: 'center', marginTop: '10px' }}>{successMessage}</p>}
      </form>
    </div>
  );
};

// Inline styles to prevent CSS module conflicts in your app
const inputStyle: React.CSSProperties = {
  background: '#1a1a1a',
  border: '1px solid #333',
  color: '#fff',
  padding: '14px',
  borderRadius: '4px',
  fontSize: '16px',
  width: '100%',
  boxSizing: 'border-box',
  appearance: 'auto'
};

const optionStyle: React.CSSProperties = {
  background: '#1a1a1a',
  color: '#ffffff'
};

export default VortexForm;
