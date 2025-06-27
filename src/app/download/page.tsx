'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function DownloadPage() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/download', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });

      if (response.ok) {
        router.push('/');
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main>
      <section className="hero-section">
        <div className="container">
          <div className="hero-content">
            <h1>Get Your Free Digital Marketing Guide</h1>
            <p>Enter your email to receive your free download link instantly.</p>
            
            <form onSubmit={handleSubmit} className="download-form">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                required
                disabled={isSubmitting}
              />
              <button 
                type="submit" 
                className="cta-button"
                disabled={isSubmitting || !email}
              >
                {isSubmitting ? 'Sending...' : 'Get Free Download'}
              </button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}