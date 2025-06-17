import Link from 'next/link';
import Image from 'next/image';

export default function CustomPage() {
  return (
    <main>
      <section className="hero-section">
        <div className="container">
          <div className="hero-content">
            <h1>Buteos Talon | Full Digital Transformation</h1>
            <p className="tagline">
              Your Vision, Forged into Reality. Uncompromising Solutions for Unique Challenges.
            </p>
            <p>
              For businesses seeking a significant competitive advantage through technology and data. When off-the-shelf products fall short, we become your dedicated development partner, diving deep into your operations to build systems perfectly tailored to your strategic goals.
            </p>
            <p>
              From custom AI implementations to advanced analytics dashboards, our process is collaborative, agile, and transparent. We combine your industry expertise with our technical mastery to forge powerful, one-of-a-kind tools that become your ultimate competitive advantage.
            </p>
          </div>
        </div>
      </section>
      
      <section className="content-section">
        <div className="container">
          <h2>What's Included</h2>
          
          <div className="service-tier">
            <div className="tier-header">
              <i className="fas fa-brain"></i>
              <h3>Custom AI Solutions</h3>
            </div>
            <div className="tier-content">
              <div className="tier-focus">
                <h4>Focus:</h4>
                <p>For businesses seeking a significant competitive advantage through technology and data.</p>
              </div>
              <div className="tier-description">
                <h4>Description:</h4>
                <p>Leverage the power of artificial intelligence to solve complex business challenges and create unique competitive advantages.</p>
              </div>
              <div className="tier-features">
                <div className="feature-card">
                  <div className="feature-icon">
                    <i className="fas fa-robot"></i>
                  </div>
                  <h4>Custom AI Implementation</h4>
                  <p>1-2 tailored AI solutions designed for your specific business needs</p>
                </div>
                
                <div className="feature-card">
                  <div className="feature-icon">
                    <i className="fas fa-cogs"></i>
                  </div>
                  <h4>Process Automation</h4>
                  <p>Intelligent automation of complex business processes</p>
                </div>
                
                <div className="feature-card">
                  <div className="feature-icon">
                    <i className="fas fa-lightbulb"></i>
                  </div>
                  <h4>Innovation Strategy</h4>
                  <p>Strategic planning for technology implementation and adoption</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="service-tier">
            <div className="tier-header">
              <i className="fas fa-chart-bar"></i>
              <h3>Advanced Analytics & Business Intelligence</h3>
            </div>
            <div className="tier-content">
              <div className="tier-description">
                <h4>Description:</h4>
                <p>Transform your data into actionable insights with sophisticated analytics tools and custom dashboards.</p>
              </div>
              <div className="tier-features">
                <div className="feature-card">
                  <div className="feature-icon">
                    <i className="fas fa-tachometer-alt"></i>
                  </div>
                  <h4>Custom BI Dashboard</h4>
                  <p>Tailored business intelligence dashboard for real-time insights</p>
                </div>
                
                <div className="feature-card">
                  <div className="feature-icon">
                    <i className="fas fa-database"></i>
                  </div>
                  <h4>Data Integration</h4>
                  <p>Unified view of data from multiple sources and systems</p>
                </div>
                
                <div className="feature-card">
                  <div className="feature-icon">
                    <i className="fas fa-chart-pie"></i>
                  </div>
                  <h4>Predictive Analytics</h4>
                  <p>Advanced forecasting and trend analysis for informed decisions</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="service-tier">
            <div className="tier-header">
              <i className="fas fa-handshake"></i>
              <h3>Strategic Partnership & Support</h3>
            </div>
            <div className="tier-content">
              <div className="tier-description">
                <h4>Description:</h4>
                <p>Benefit from a true strategic partnership with dedicated support and regular business reviews.</p>
              </div>
              <div className="tier-features">
                <div className="feature-card">
                  <div className="feature-icon">
                    <i className="fas fa-calendar-check"></i>
                  </div>
                  <h4>Quarterly Business Reviews</h4>
                  <p>Strategic planning sessions to align technology with business goals</p>
                </div>
                
                <div className="feature-card">
                  <div className="feature-icon">
                    <i className="fas fa-phone-alt"></i>
                  </div>
                  <h4>Direct Access</h4>
                  <p>Priority communication channels to our technical team</p>
                </div>
                
                <div className="feature-card">
                  <div className="feature-icon">
                    <i className="fas fa-life-ring"></i>
                  </div>
                  <h4>Priority Support</h4>
                  <p>Expedited response times and dedicated support resources</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="service-tier">
            <div className="tier-header">
              <i className="fas fa-plus-circle"></i>
              <h3>All Growth Partnership Services</h3>
            </div>
            <div className="tier-content">
              <div className="tier-description">
                <h4>Description:</h4>
                <p>Includes all services from our Growth Partnership package, providing a comprehensive digital marketing and automation solution.</p>
              </div>
              <div className="tier-features">
                <div className="feature-card">
                  <div className="feature-icon">
                    <i className="fas fa-search"></i>
                  </div>
                  <h4>Advanced SEO & Content</h4>
                  <p>Comprehensive SEO strategy with regular content creation</p>
                </div>
                
                <div className="feature-card">
                  <div className="feature-icon">
                    <i className="fas fa-ad"></i>
                  </div>
                  <h4>Digital Advertising</h4>
                  <p>Google & Meta ad management with email marketing</p>
                </div>
                
                <div className="feature-card">
                  <div className="feature-icon">
                    <i className="fas fa-cog"></i>
                  </div>
                  <h4>Marketing Automation</h4>
                  <p>Foundational automation and reputation management</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="cta-container">
            <Link href="/contact" className="cta-button">Contact Us About Custom Solutions</Link>
          </div>
        </div>
      </section>
    </main>
  );
}