import Image from "next/image";
import Link from "next/link";
import { BlogPost } from "@/types/BlogPosts"

// Add this async function to fetch the latest blog post
async function getLatestBlogPost(): Promise<BlogPost | null> {
  try {
    // Use absolute URL for server components
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://buteossystems.com';
    const apiUrl = new URL('/api/blog/articles', baseUrl).toString();
    
    const response = await fetch(apiUrl, { cache: 'no-store' });
    if (!response.ok) return null;
    
    const posts = await response.json();
    if (!posts || !posts.length) return null;
    
    // Sort by ID in descending order and get the first one
    const latestPost = posts.sort((a: BlogPost, b: BlogPost) => b.id - a.id)[0];
    
    // Fetch the full article data
    const articleResponse = await fetch(`${baseUrl}/api/blog/articles?id=${latestPost.id}`);
    if (!articleResponse.ok) return latestPost; // Fallback to list data if full article fetch fails
    
    const fullArticle = await articleResponse.json();
    return fullArticle;
  } catch (error) {
    console.error('Error fetching latest blog post:', error);
    return null;
  }
}


export default async function Home() {
  // Fetch the latest blog post
  const latestPost = await getLatestBlogPost();

  return (
    <main>
      <section className="hero-section">
        <div className="container">
          <div className="hero-content">
            <h1>Precision Digital Strategy, Unmatched Vision.</h1>
            <div className="hero-paragraphs">
              <p>In today's market, you need more than just an online presence—you need a commanding view of the field. Buteos Systems is the strategic web consultancy that gives your business a hawk's-eye view to dominate your competition.</p>
              
              <p>We go beyond standard web design. We manage your entire digital world, ensuring your website, local search ranking, social media, and intelligent AI solutions all work in concert to achieve your primary business goals. For our partners in retail and hospitality, this means more traffic, more direct sales, and a stronger bottom line.</p>
              
              <p>It's time to stop competing and start commanding. Explore our offerings and find your perfect flight path, from the foundational security of Buteos Nest to the ambitious growth of Buteos Flight, or the transformative power of Buteos Talon.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Add the latest blog post section */}
      {latestPost && (
        <section className="content-section">
          <div className="container">
            <h2>Latest from Our Blog</h2>
            <div className="blog-preview-card">
              <div className="blog-preview-image">
                <img 
                  src={
                    // Handle both old and new image formats
                    latestPost.main_image?.file_url || 
                    latestPost.image || 
                    '/default-blog-image.jpg'
                  } 
                  alt={
                    latestPost.main_image?.alt_text || 
                    latestPost.title
                  }
                  style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '8px' }}
                />
              </div>
              <div className="blog-preview-content">
                <h3>{latestPost.title}</h3>
                <div className="blog-meta">
                  <span><i className="fas fa-user"></i> {latestPost.author}</span>
                  <span><i className="fas fa-calendar"></i> {latestPost.date}</span>
                </div>
                <p>{latestPost.excerpt}</p>
                <Link 
                  href={`/blog/${latestPost.id}`} 
                  className="cta-button"
                >
                  Read More <i className="fas fa-arrow-right"></i>
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      <section id="web-design" className="content-section">
        <div className="container">
          <h2>Buteos Nest | Digital Foundation</h2>
          <p className="section-intro">Your Foundation for Digital Excellence. Scalable, Secure, and Built to Engage.</p>
          <p>For businesses needing to establish a professional online footprint. We create stunning, intuitive, and secure platforms that serve as the core of your digital ecosystem. Whether you're launching a new idea or scaling an existing one, we build the robust, user-centric nest your business needs to thrive.</p>
          <div className="features-grid">
            <div className="card">
              <div className="face face1">
                <div className="content">
                  <i className="fas fa-server"></i>
                  <h3>Website Essentials</h3>
                </div>
              </div>
              <div className="face face2">
                <div className="content">
                  <p>Website Hosting, Security & Maintenance with foundational on-page & local SEO.</p>
                  <Link href="/web" className="learn-more">Learn More</Link>
                </div>
              </div>
            </div>
            <div className="card">
              <div className="face face1">
                <div className="content">
                  <i className="fas fa-map-marker-alt"></i>
                  <h3>Local Presence</h3>
                </div>
              </div>
              <div className="face face2">
                <div className="content">
                  <p>Google Business Profile Management and basic reputation monitoring.</p>
                  <Link href="/web" className="learn-more">Learn More</Link>
                </div>
              </div>
            </div>
            <div className="card">
              <div className="face face1">
                <div className="content">
                  <i className="fas fa-hashtag"></i>
                  <h3>Social Media</h3>
                </div>
              </div>
              <div className="face face2">
                <div className="content">
                  <p>Management of social media platforms with scheduled posting.</p>
                  <Link href="/web" className="learn-more">Learn More</Link>
                </div>
              </div>
            </div>
          </div>
          <div className="section-cta">
            <Link href="/web" className="cta-button">Learn More</Link>
            <Link href="/book" className="cta-button book-button">Book an Appointment</Link>
          </div>
        </div>
      </section>

      <section id="ai-automation" className="content-section alt-bg">
        <div className="container">
          <h2>Buteos Flight | Growth Partnership</h2>
          <p className="section-intro">Intelligence that Elevates. Automate, Analyze, and Accelerate Your Business.</p>
          <p>For established businesses ready to drive measurable growth in leads and sales. Buteos Flight integrates intelligent systems into your workflow to handle repetitive tasks, uncover critical insights from your data, and create smarter customer experiences.</p>
          <div className="features-grid">
            <div className="card">
              <div className="face face1">
                <div className="content">
                  <i className="fas fa-search"></i>
                  <h3>Advanced SEO</h3>
                </div>
              </div>
              <div className="face face2">
                <div className="content">
                  <p>Advanced SEO & Content Creation to drive organic traffic.</p>
                  <Link href="/agent" className="learn-more">Learn More</Link>
                </div>
              </div>
            </div>
            <div className="card">
              <div className="face face1">
                <div className="content">
                  <i className="fas fa-ad"></i>
                  <h3>Ad Management</h3>
                </div>
              </div>
              <div className="face face2">
                <div className="content">
                  <p>Google & Meta Ad Management with email marketing campaign management.</p>
                  <Link href="/agent" className="learn-more">Learn More</Link>
                </div>
              </div>
            </div>
            <div className="card">
              <div className="face face1">
                <div className="content">
                  <i className="fas fa-robot"></i>
                  <h3>Marketing Automation</h3>
                </div>
              </div>
              <div className="face face2">
                <div className="content">
                  <p>Foundational marketing automation and proactive reputation management.</p>
                  <Link href="/agent" className="learn-more">Learn More</Link>
                </div>
              </div>
            </div>
          </div>
          <div className="section-cta">
            <Link href="/agent" className="cta-button">Learn More</Link>
            <Link href="/book" className="cta-button book-button">Book an Appointment</Link>
          </div>
        </div>
      </section>

      <section id="custom-software" className="content-section">
        <div className="container">
          <h2>Buteos Talon | Full Digital Transformation</h2>
          <p className="section-intro">Your Vision, Forged into Reality. Uncompromising Solutions for Unique Challenges.</p>
          <p>For businesses seeking a significant competitive advantage through technology and data. When off-the-shelf products fall short, we become your dedicated development partner, diving deep into your operations to build systems perfectly tailored to your strategic goals.</p>
          <div className="features-grid">
            <div className="card">
              <div className="face face1">
                <div className="content">
                  <i className="fas fa-brain"></i>
                  <h3>Custom AI Solutions</h3>
                </div>
              </div>
              <div className="face face2">
                <div className="content">
                  <p>Custom AI Solution Implementations to transform your business processes.</p>
                  <Link href="/custom" className="learn-more">Learn More</Link>
                </div>
              </div>
            </div>
            <div className="card">
              <div className="face face1">
                <div className="content">
                  <i className="fas fa-chart-bar"></i>
                  <h3>Advanced Analytics</h3>
                </div>
              </div>
              <div className="face face2">
                <div className="content">
                  <p>Advanced Analytics & Business Intelligence Dashboard for data-driven decisions.</p>
                  <Link href="/custom" className="learn-more">Learn More</Link>
                </div>
              </div>
            </div>
            <div className="card">
              <div className="face face1">
                <div className="content">
                  <i className="fas fa-handshake"></i>
                  <h3>Strategic Partnership</h3>
                </div>
              </div>
              <div className="face face2">
                <div className="content">
                  <p>Quarterly Business Reviews (QBRs) with direct access & priority support.</p>
                  <Link href="/custom" className="learn-more">Learn More</Link>
                </div>
              </div>
            </div>
          </div>
          <div className="section-cta">
            <Link href="/custom" className="cta-button">Learn More</Link>
            <Link href="/book" className="cta-button book-button">Book an Appointment</Link>
          </div>
        </div>
      </section>

      <section id="why-us" className="content-section alt-bg">
        <div className="container">
          <h2>Your Strategic Digital Partner</h2>
          <p className="section-intro">Buteos Systems delivers comprehensive digital strategy solutions that evolve with your business needs. From establishing your foundation to driving growth and transformation, we provide the expertise and tools you need at every stage of your journey.</p>
          <ul className="benefits-list">
            <li><i className="fas fa-feather"></i> <strong>Digital Foundation:</strong> Establish a professional online footprint with managed website, local SEO, and social media</li>
            <li><i className="fas fa-wind"></i> <strong>Growth Partnership:</strong> Drive measurable results with advanced SEO, content creation, and targeted advertising</li>
            <li><i className="fas fa-mountain"></i> <strong>Digital Transformation:</strong> Gain competitive advantage through custom AI solutions and data-driven insights</li>
            <li><i className="fas fa-chart-line"></i> <strong>Measurable Results:</strong> Clear reporting and analytics that demonstrate real business impact</li>
          </ul>
        </div>
      </section>

      <section id="cta" className="content-section">
        <div className="container">
          <h2>Ready to Transform Your Business?</h2>
          <p>Join the businesses already thriving with our software solutions.</p>
          <div className="cta-buttons">
            <Link href="/contact" className="cta-button">Contact Us</Link>
            <Link href="/book" className="cta-button book-button">Book an Appointment</Link>
          </div>
        </div>
      </section>
    </main>
  );
}