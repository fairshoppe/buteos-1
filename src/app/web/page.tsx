import Link from 'next/link';
import Image from 'next/image';

export const metadata = {
  title: 'Digital Foundation Services - Houston Web Design & Local SEO',
  description: 'Professional digital foundation services for Houston hospitality and retail businesses. Website hosting, local SEO, Google Business Profile management, and social media marketing to establish your online presence.',
  keywords: ['Houston web design', 'local SEO Houston', 'Google Business Profile Houston', 'social media management Texas', 'hospitality website design', 'retail web development'],
};

export default function WebPage() {
  return (
    <main>
      <section className="hero-section">
        <div className="container">
          <div className="hero-content">
            <h1>Digital Foundation Services in Houston, Texas</h1>
            <p className="tagline">
              Your Foundation for Digital Excellence. Scalable, Secure, and Built to Engage.
            </p>
            <p>
              For Houston hospitality and retail businesses needing to establish a professional online footprint. We create stunning, intuitive, and secure platforms that serve as the core of your digital ecosystem. Whether you're launching a new restaurant, hotel, or retail store, we build the robust, user-centric digital foundation your Texas business needs to thrive in the local market.
            </p>
          </div>
        </div>
      </section>
      
      <section className="content-section">
        <div className="container">
          <h2>What's Included</h2>
          
          <div className="service-tier">
            <div className="tier-header">
              <i className="fas fa-server"></i>
              <h3>Website Essentials</h3>
            </div>
            <div className="tier-content">
              <div className="tier-focus">
                <h4>Focus:</h4>
                <p>For businesses needing to establish a professional online footprint.</p>
              </div>
              <div className="tier-description">
                <h4>Description:</h4>
                <p>Launch your digital presence with a beautifully designed, responsive website. We handle all the technical aspects so you can focus on your business.</p>
              </div>
              <div className="tier-features">
                <div className="feature-card">
                  <div className="feature-icon">
                    <i className="fas fa-shield-alt"></i>
                  </div>
                  <h4>Website Hosting & Security</h4>
                  <p>Reliable hosting with robust security measures and regular maintenance</p>
                </div>
                
                <div className="feature-card">
                  <div className="feature-icon">
                    <i className="fas fa-search"></i>
                  </div>
                  <h4>Foundational SEO</h4>
                  <p>On-page and local SEO optimization to help customers find you</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="service-tier">
            <div className="tier-header">
              <i className="fas fa-map-marker-alt"></i>
              <h3>Local Presence Management</h3>
            </div>
            <div className="tier-content">
              <div className="tier-description">
                <h4>Description:</h4>
                <p>Establish and maintain your business's local online presence to attract nearby customers and build credibility in your community.</p>
              </div>
              <div className="tier-features">
                <div className="feature-card">
                  <div className="feature-icon">
                    <i className="fab fa-google"></i>
                  </div>
                  <h4>Google Business Profile</h4>
                  <p>Complete setup and ongoing management of your Google Business listing</p>
                </div>
                
                <div className="feature-card">
                  <div className="feature-icon">
                    <i className="fas fa-star"></i>
                  </div>
                  <h4>Reputation Monitoring</h4>
                  <p>Basic monitoring of online reviews and reputation management</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="service-tier">
            <div className="tier-header">
              <i className="fas fa-hashtag"></i>
              <h3>Social Media Management</h3>
            </div>
            <div className="tier-content">
              <div className="tier-description">
                <h4>Description:</h4>
                <p>Maintain an active and engaging presence on social media platforms to connect with your audience and build your brand.</p>
              </div>
              <div className="tier-features">
                <div className="feature-card">
                  <div className="feature-icon">
                    <i className="fas fa-share-alt"></i>
                  </div>
                  <h4>2 Platform Management</h4>
                  <p>Content creation and management for two social media platforms</p>
                </div>
                
                <div className="feature-card">
                  <div className="feature-icon">
                    <i className="fas fa-calendar-alt"></i>
                  </div>
                  <h4>Regular Content</h4>
                  <p>Approximately 12 posts per month across your platforms</p>
                </div>
                
                <div className="feature-card">
                  <div className="feature-icon">
                    <i className="fas fa-chart-line"></i>
                  </div>
                  <h4>Performance Reporting</h4>
                  <p>Monthly reports on social media performance and engagement</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="local-seo-section">
            <h2>Why Choose Local Houston Digital Marketing?</h2>
            <p>As a Houston-based digital marketing consultancy, we understand the unique challenges facing Texas hospitality and retail businesses. From competing with national chains to attracting local customers, our Digital Foundation services are specifically designed to help Houston businesses establish a strong local online presence.</p>
            <ul>
              <li>Local Houston market expertise</li>
              <li>Google Business Profile optimization for Texas businesses</li>
              <li>Houston-focused SEO strategies</li>
              <li>Social media management tailored to Texas audiences</li>
            </ul>
          </div>
          
          <div className="cta-container">
            <Link href="/contact" className="cta-button">Get Your Free Houston Digital Marketing Consultation</Link>
          </div>
        </div>
      </section>
    </main>
  );
}