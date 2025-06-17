import Link from 'next/link';
import Image from 'next/image';

export default function MobilePage() {
  return (
    <main>
      <section className="hero-section">
        <div className="container">
          <div className="hero-content">
            <h1>Buteos Nest | Mobile Applications</h1>
            <p className="tagline">
              Your Foundation for Digital Excellence. Scalable, Secure, and Built to Engage.
            </p>
            <p>
              Every great vision needs a place to hatch. Buteos Nest is our dedicated web and mobile application development service. We create stunning, intuitive, and secure platforms that serve as the core of your digital ecosystem. Whether you're launching a new idea or scaling an existing one, we build the robust, user-centric nest your business needs to thrive.
            </p>
          </div>
        </div>
      </section>
      
      <section className="content-section">
        <div className="container">
          <h2>Mobile Application Services</h2>
          <p className="section-intro">Put your business in your customers' pockets with powerful, engaging mobile applications</p>
          
          <div className="service-tier">
            <div className="tier-header">
              <i className="fas fa-feather"></i>
              <h3>Fledgling Package (Essential Mobile Presence)</h3>
            </div>
            <div className="tier-content">
              <div className="tier-focus">
                <h4>Focus:</h4>
                <p>Perfect for small businesses looking to establish a basic mobile presence with core functionality.</p>
              </div>
              <div className="tier-description">
                <h4>Description:</h4>
                <p>Launch your mobile presence with a beautifully designed, user-friendly app. We focus on essential features, intuitive navigation, and a consistent brand experience. It's everything you need to connect with customers on their mobile devices.</p>
              </div>
              <div className="tier-features">
                <div className="feature-card">
                  <div className="feature-icon">
                    <i className="fas fa-palette"></i>
                  </div>
                  <h4>Custom Design</h4>
                  <p>Branded interface that reflects your business identity</p>
                </div>
                
                <div className="feature-card">
                  <div className="feature-icon">
                    <i className="fas fa-mobile-alt"></i>
                  </div>
                  <h4>Cross-Platform</h4>
                  <p>Works on both iOS and Android devices</p>
                </div>
                
                <div className="feature-card">
                  <div className="feature-icon">
                    <i className="fas fa-th-large"></i>
                  </div>
                  <h4>5 Core Screens</h4>
                  <p>Essential features your customers need</p>
                </div>
                
                <div className="feature-card">
                  <div className="feature-icon">
                    <i className="fas fa-upload"></i>
                  </div>
                  <h4>App Store Deployment</h4>
                  <p>We'll help get your app published</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="service-tier">
            <div className="tier-header">
              <i className="fas fa-wind"></i>
              <h3>Soar Package (Advanced Mobile Application)</h3>
            </div>
            <div className="tier-content">
              <div className="tier-focus">
                <h4>Focus:</h4>
                <p>For businesses ready to offer interactive services, e-commerce, and dedicated user experiences on mobile.</p>
              </div>
              <div className="tier-description">
                <h4>Description:</h4>
                <p>Elevate your mobile engagement with a powerful application. This package includes everything in Fledgling, plus custom feature development, user account systems, API integrations, and e-commerce functionality. We'll build the mobile platform that drives your core business operations.</p>
              </div>
              <div className="tier-features">
                <div className="feature-card">
                  <div className="feature-icon">
                    <i className="fas fa-user-lock"></i>
                  </div>
                  <h4>User Authentication</h4>
                  <p>Secure login and personalized experiences</p>
                </div>
                
                <div className="feature-card">
                  <div className="feature-icon">
                    <i className="fas fa-shopping-cart"></i>
                  </div>
                  <h4>In-App E-commerce</h4>
                  <p>Sell products directly in your app with payment processing</p>
                </div>
                
                <div className="feature-card">
                  <div className="feature-icon">
                    <i className="fas fa-plug"></i>
                  </div>
                  <h4>API Integrations</h4>
                  <p>Connect with third-party services and tools</p>
                </div>
                
                <div className="feature-card">
                  <div className="feature-icon">
                    <i className="fas fa-bell"></i>
                  </div>
                  <h4>Push Notifications</h4>
                  <p>Send updates and offers directly to users' phones</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="service-tier">
            <div className="tier-header">
              <i className="fas fa-mountain"></i>
              <h3>Aerie Package (Enterprise-Grade Mobile Platform)</h3>
            </div>
            <div className="tier-content">
              <div className="tier-focus">
                <h4>Focus:</h4>
                <p>Complex, mission-critical mobile applications for established businesses requiring top-tier performance, security, and scalability.</p>
              </div>
              <div className="tier-description">
                <h4>Description:</h4>
                <p>For the most demanding requirements, the Aerie package delivers a comprehensive, enterprise-grade mobile solution. This includes advanced features, sophisticated security protocols, offline capabilities, and ongoing performance optimization. This is your mobile fortress, built for market leadership.</p>
              </div>
              <div className="tier-features">
                <div className="feature-card">
                  <div className="feature-icon">
                    <i className="fas fa-shield-alt"></i>
                  </div>
                  <h4>Advanced Security</h4>
                  <p>Enterprise-grade protection for your data and users</p>
                </div>
                
                <div className="feature-card">
                  <div className="feature-icon">
                    <i className="fas fa-wifi"></i>
                  </div>
                  <h4>Offline Access</h4>
                  <p>Let users access key features even without internet</p>
                </div>
                
                <div className="feature-card">
                  <div className="feature-icon">
                    <i className="fas fa-language"></i>
                  </div>
                  <h4>Multilingual Support</h4>
                  <p>Offer your app in multiple languages</p>
                </div>
                
                <div className="feature-card">
                  <div className="feature-icon">
                    <i className="fas fa-tachometer-alt"></i>
                  </div>
                  <h4>Performance Optimization</h4>
                  <p>Continuous monitoring and enhancement for peak efficiency</p>
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