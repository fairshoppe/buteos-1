import Link from 'next/link';
import Image from 'next/image';

export default function AgentPage() {
  return (
    <main>
      <section className="hero-section">
        <div className="container">
          <div className="hero-content">
            <h1>Buteos Flight | Growth Partnership</h1>
            <p className="tagline">
              Intelligence that Elevates. Automate, Analyze, and Accelerate Your Business.
            </p>
            <p>
              For established businesses ready to drive measurable growth in leads and sales. Buteos Flight integrates intelligent systems into your workflow to handle repetitive tasks, uncover critical insights from your data, and create smarter customer experiences. Let us equip your business with the AI-powered vision to anticipate challenges and seize opportunities faster than ever before.
            </p>
          </div>
        </div>
      </section>
      
      <section className="content-section">
        <div className="container">
          <h2>What's Included</h2>
          
          <div className="service-tier">
            <div className="tier-header">
              <i className="fas fa-search"></i>
              <h3>Advanced SEO & Content Creation</h3>
            </div>
            <div className="tier-content">
              <div className="tier-focus">
                <h4>Focus:</h4>
                <p>For established businesses ready to drive measurable growth in leads and sales.</p>
              </div>
              <div className="tier-description">
                <h4>Description:</h4>
                <p>Elevate your online visibility and establish thought leadership with comprehensive SEO strategies and regular content creation.</p>
              </div>
              <div className="tier-features">
                <div className="feature-card">
                  <div className="feature-icon">
                    <i className="fas fa-file-alt"></i>
                  </div>
                  <h4>Content Creation</h4>
                  <p>2 high-quality blog posts per month optimized for search engines</p>
                </div>
                
                <div className="feature-card">
                  <div className="feature-icon">
                    <i className="fas fa-chart-line"></i>
                  </div>
                  <h4>Keyword Strategy</h4>
                  <p>Advanced keyword research and implementation</p>
                </div>
                
                <div className="feature-card">
                  <div className="feature-icon">
                    <i className="fas fa-link"></i>
                  </div>
                  <h4>Link Building</h4>
                  <p>Strategic backlink acquisition to boost domain authority</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="service-tier">
            <div className="tier-header">
              <i className="fas fa-ad"></i>
              <h3>Digital Advertising & Email Marketing</h3>
            </div>
            <div className="tier-content">
              <div className="tier-description">
                <h4>Description:</h4>
                <p>Drive targeted traffic and nurture leads with strategic digital advertising and email marketing campaigns.</p>
              </div>
              <div className="tier-features">
                <div className="feature-card">
                  <div className="feature-icon">
                    <i className="fab fa-google"></i>
                  </div>
                  <h4>Google Ads Management</h4>
                  <p>Strategic campaign setup, optimization, and management</p>
                </div>
                
                <div className="feature-card">
                  <div className="feature-icon">
                    <i className="fab fa-facebook"></i>
                  </div>
                  <h4>Meta Ads Management</h4>
                  <p>Facebook and Instagram ad campaign management</p>
                </div>
                
                <div className="feature-card">
                  <div className="feature-icon">
                    <i className="fas fa-envelope"></i>
                  </div>
                  <h4>Email Marketing</h4>
                  <p>Campaign creation, automation, and performance tracking</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="service-tier">
            <div className="tier-header">
              <i className="fas fa-robot"></i>
              <h3>Automation & Reputation Management</h3>
            </div>
            <div className="tier-content">
              <div className="tier-description">
                <h4>Description:</h4>
                <p>Streamline your marketing efforts and protect your brand reputation with intelligent automation and proactive management.</p>
              </div>
              <div className="tier-features">
                <div className="feature-card">
                  <div className="feature-icon">
                    <i className="fas fa-cogs"></i>
                  </div>
                  <h4>Marketing Automation</h4>
                  <p>Foundational workflows to nurture leads and engage customers</p>
                </div>
                
                <div className="feature-card">
                  <div className="feature-icon">
                    <i className="fas fa-star"></i>
                  </div>
                  <h4>Reputation Management</h4>
                  <p>Proactive monitoring and response to online reviews</p>
                </div>
                
                <div className="feature-card">
                  <div className="feature-icon">
                    <i className="fas fa-file-contract"></i>
                  </div>
                  <h4>Monthly Reporting</h4>
                  <p>Comprehensive reports with actionable insights</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="service-tier">
            <div className="tier-header">
              <i className="fas fa-plus-circle"></i>
              <h3>All Digital Foundation Services</h3>
            </div>
            <div className="tier-content">
              <div className="tier-description">
                <h4>Description:</h4>
                <p>Includes all services from our Digital Foundation package, providing a comprehensive digital marketing solution.</p>
              </div>
              <div className="tier-features">
                <div className="feature-card">
                  <div className="feature-icon">
                    <i className="fas fa-server"></i>
                  </div>
                  <h4>Website Essentials</h4>
                  <p>Hosting, security, maintenance, and foundational SEO</p>
                </div>
                
                <div className="feature-card">
                  <div className="feature-icon">
                    <i className="fas fa-map-marker-alt"></i>
                  </div>
                  <h4>Local Presence</h4>
                  <p>Google Business Profile management</p>
                </div>
                
                <div className="feature-card">
                  <div className="feature-icon">
                    <i className="fas fa-hashtag"></i>
                  </div>
                  <h4>Social Media</h4>
                  <p>Management of 2 platforms with regular content</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="cta-container">
            <Link href="/contact" className="cta-button">Contact Us</Link>
          </div>
        </div>
      </section>
    </main>
  );
}