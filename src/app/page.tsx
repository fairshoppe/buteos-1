import Image from "next/image";
import Link from "next/link";
import { BlogPost } from "@/types/BlogPosts";
import { getLocationFromHeaders } from '@/utils/location';
import { localizedContent } from '@/data/localized-content';

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
  const userLocation = await getLocationFromHeaders();
  const content = localizedContent[userLocation];

  return (
    <main className="bg-white dark:bg-gray-900">
      <section className="hero-section py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="hero-content text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-800 dark:text-white">Precision Digital Strategy, Unmatched Vision.</h1>
            <div className="hero-paragraphs mt-6 space-y-4 text-slate-600 dark:text-slate-300">
              <p>In today's market, you need more than just an online presence—you need a commanding view of the field. Buteos Systems is the strategic {content.locationAdjective && `${content.locationAdjective} `}digital marketing consultancy that gives your business a hawk's-eye view to dominate your competition.</p>
              
              <p>We go beyond standard web design. We manage your entire digital world, ensuring your website, local search ranking, social media, and intelligent AI solutions all work in concert to achieve your primary business goals. For our partners in {content.businessFocus}, this means more traffic, more direct sales, and a stronger bottom line.</p>
              
              <p>It's time to stop competing and start commanding. Explore our offerings and find your perfect flight path, from the foundational security of Buteos Nest to the ambitious growth of Buteos Flight, or the transformative power of Buteos Talon.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced blog post section with improved layout */}
      {latestPost && (
        <section className="content-section py-12 md:py-16 bg-slate-50 dark:bg-slate-900/50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-slate-800 dark:text-white mb-8">Latest from Our Blog</h2>
            <div className="blog-preview-card max-w-2xl mx-auto bg-white dark:bg-slate-800 rounded-lg shadow-lg overflow-hidden md:flex">
              <div className="md:w-1/3">
                <img 
                  className="w-full h-48 md:h-full object-cover"
                  src={
                    latestPost.main_image?.file_url || 
                    latestPost.image || 
                    'https://placehold.co/400x300/cccccc/ffffff?text=Image'
                  } 
                  alt={
                    latestPost.main_image?.alt_text || 
                    latestPost.title
                  }
                />
              </div>
              <div className="p-6 md:w-2/3 flex flex-col justify-center">
                <h3 className="font-bold text-xl text-slate-800 dark:text-white">{latestPost.title}</h3>
                <div className="blog-meta text-sm text-slate-500 dark:text-slate-400 mt-2 mb-3">
                  <span className="mr-4"><i className="fas fa-user mr-1"></i> {latestPost.author}</span>
                  <span><i className="fas fa-calendar mr-1"></i> {latestPost.date}</span>
                </div>
                <p className="text-slate-600 dark:text-slate-300 mb-4">{latestPost.excerpt}</p>
                <Link 
                  href={`/blog/${latestPost.id}`} 
                  className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium"
                >
                  Read More <i className="fas fa-arrow-right ml-2"></i>
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      <section id="web-design" className="content-section py-16 md:py-20 bg-emerald-50 dark:bg-slate-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-600 rounded-full mb-6">
              <i className="fas fa-home text-2xl text-white"></i>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-white mb-4">Buteos Nest | Digital Foundation</h2>
            <p className="section-intro text-xl text-slate-600 dark:text-slate-300 mb-6 max-w-3xl mx-auto">Your Foundation for Digital Excellence. Scalable, Secure, and Built to Engage.</p>
            <p className="text-slate-600 dark:text-slate-300 mb-12 max-w-4xl mx-auto">For {content.businessFocus} needing to establish a professional online footprint. We create stunning, intuitive, and secure platforms that serve as the core of your digital ecosystem. Whether you're launching a new idea or scaling an existing one, we build the robust, user-centric nest your business needs to thrive in the {content.marketDescription}.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white dark:bg-slate-700 p-6 rounded-lg shadow-lg text-center">
              <i className="fas fa-server text-3xl text-emerald-600 mb-4"></i>
              <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-3">Website Essentials</h3>
              <p className="text-slate-600 dark:text-slate-300">Website Hosting, Security & Maintenance with foundational on-page & local SEO.</p>
            </div>
            <div className="bg-white dark:bg-slate-700 p-6 rounded-lg shadow-lg text-center">
              <i className="fas fa-map-marker-alt text-3xl text-emerald-600 mb-4"></i>
              <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-3">Local Presence</h3>
              <p className="text-slate-600 dark:text-slate-300">Google Business Profile Management and basic reputation monitoring.</p>
            </div>
            <div className="bg-white dark:bg-slate-700 p-6 rounded-lg shadow-lg text-center">
              <i className="fas fa-hashtag text-3xl text-emerald-600 mb-4"></i>
              <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-3">Social Media</h3>
              <p className="text-slate-600 dark:text-slate-300">Management of social media platforms with scheduled posting.</p>
            </div>
          </div>
          <div className="section-cta text-center">
            <Link href="/web" className="cta-button inline-block bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-lg font-medium mr-4 mb-4 transition-colors">Learn More</Link>
            <Link href="/book" className="cta-button book-button inline-block bg-slate-600 hover:bg-slate-700 text-white px-6 py-3 rounded-lg font-medium mb-4 transition-colors">Book an Appointment</Link>
          </div>
        </div>
      </section>

      <section id="ai-automation" className="content-section py-16 md:py-20 bg-blue-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full mb-6">
              <i className="fas fa-rocket text-2xl text-white"></i>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-white mb-4">Buteos Flight | Growth Partnership</h2>
            <p className="section-intro text-xl text-slate-600 dark:text-slate-300 mb-6 max-w-3xl mx-auto">Intelligence that Elevates. Automate, Analyze, and Accelerate Your Business.</p>
            <p className="text-slate-600 dark:text-slate-300 mb-12 max-w-4xl mx-auto">For established {content.businessFocus} ready to drive measurable growth in leads and sales. Buteos Flight integrates intelligent systems into your workflow to handle repetitive tasks, uncover critical insights from your data, and create smarter customer experiences.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-lg text-center">
              <i className="fas fa-search text-3xl text-blue-600 mb-4"></i>
              <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-3">Advanced SEO</h3>
              <p className="text-slate-600 dark:text-slate-300">Advanced SEO & Content Creation to drive organic traffic.</p>
            </div>
            <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-lg text-center">
              <i className="fas fa-ad text-3xl text-blue-600 mb-4"></i>
              <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-3">Ad Management</h3>
              <p className="text-slate-600 dark:text-slate-300">Google & Meta Ad Management with email marketing campaign management.</p>
            </div>
            <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-lg text-center">
              <i className="fas fa-robot text-3xl text-blue-600 mb-4"></i>
              <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-3">Marketing Automation</h3>
              <p className="text-slate-600 dark:text-slate-300">Foundational marketing automation and proactive reputation management.</p>
            </div>
          </div>
          <div className="section-cta text-center">
            <Link href="/agent" className="cta-button inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium mr-4 mb-4 transition-colors">Learn More</Link>
            <Link href="/book" className="cta-button book-button inline-block bg-slate-600 hover:bg-slate-700 text-white px-6 py-3 rounded-lg font-medium mb-4 transition-colors">Book an Appointment</Link>
          </div>
        </div>
      </section>

      <section id="custom-software" className="content-section py-16 md:py-20 bg-purple-50 dark:bg-slate-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-600 rounded-full mb-6">
              <i className="fas fa-bolt text-2xl text-white"></i>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-white mb-4">Buteos Talon | Full Digital Transformation</h2>
            <p className="section-intro text-xl text-slate-600 dark:text-slate-300 mb-6 max-w-3xl mx-auto">Your Vision, Forged into Reality. Uncompromising Solutions for Unique Challenges.</p>
            <p className="text-slate-600 dark:text-slate-300 mb-12 max-w-4xl mx-auto">For {content.businessFocus} seeking a significant competitive advantage through technology and data. When off-the-shelf products fall short, we become your dedicated development partner, diving deep into your operations to build systems perfectly tailored to your strategic goals.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white dark:bg-slate-700 p-6 rounded-lg shadow-lg text-center">
              <i className="fas fa-brain text-3xl text-purple-600 mb-4"></i>
              <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-3">Custom AI Solutions</h3>
              <p className="text-slate-600 dark:text-slate-300">Custom AI Solution Implementations to transform your business processes.</p>
            </div>
            <div className="bg-white dark:bg-slate-700 p-6 rounded-lg shadow-lg text-center">
              <i className="fas fa-chart-bar text-3xl text-purple-600 mb-4"></i>
              <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-3">Advanced Analytics</h3>
              <p className="text-slate-600 dark:text-slate-300">Advanced Analytics & Business Intelligence Dashboard for data-driven decisions.</p>
            </div>
            <div className="bg-white dark:bg-slate-700 p-6 rounded-lg shadow-lg text-center">
              <i className="fas fa-handshake text-3xl text-purple-600 mb-4"></i>
              <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-3">Strategic Partnership</h3>
              <p className="text-slate-600 dark:text-slate-300">Quarterly Business Reviews (QBRs) with direct access & priority support.</p>
            </div>
          </div>
          <div className="section-cta text-center">
            <Link href="/custom" className="cta-button inline-block bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-medium mr-4 mb-4 transition-colors">Learn More</Link>
            <Link href="/book" className="cta-button book-button inline-block bg-slate-600 hover:bg-slate-700 text-white px-6 py-3 rounded-lg font-medium mb-4 transition-colors">Book an Appointment</Link>
          </div>
        </div>
      </section>

      <section id="why-us" className="content-section py-16 md:py-20 bg-slate-50 dark:bg-slate-900/50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-slate-800 dark:text-white mb-6">Your Strategic Digital Partner</h2>
          <p className="section-intro text-xl text-center text-slate-600 dark:text-slate-300 mb-12 max-w-4xl mx-auto">Buteos Systems delivers comprehensive digital strategy solutions that evolve with your business needs. From establishing your foundation to driving growth and transformation, we provide the expertise and tools you need at every stage of your journey.</p>
          <ul className="benefits-list max-w-4xl mx-auto space-y-6">
            <li className="flex items-start text-slate-700 dark:text-slate-300"><i className="fas fa-feather text-blue-600 dark:text-blue-400 mr-4 mt-1"></i> <span><strong className="text-slate-800 dark:text-white">Digital Foundation:</strong> Establish a professional online footprint with managed website, local SEO, and social media</span></li>
            <li className="flex items-start text-slate-700 dark:text-slate-300"><i className="fas fa-wind text-blue-600 dark:text-blue-400 mr-4 mt-1"></i> <span><strong className="text-slate-800 dark:text-white">Growth Partnership:</strong> Drive measurable results with advanced SEO, content creation, and targeted advertising</span></li>
            <li className="flex items-start text-slate-700 dark:text-slate-300"><i className="fas fa-mountain text-blue-600 dark:text-blue-400 mr-4 mt-1"></i> <span><strong className="text-slate-800 dark:text-white">Digital Transformation:</strong> Gain competitive advantage through custom AI solutions and data-driven insights</span></li>
            <li className="flex items-start text-slate-700 dark:text-slate-300"><i className="fas fa-chart-line text-blue-600 dark:text-blue-400 mr-4 mt-1"></i> <span><strong className="text-slate-800 dark:text-white">Measurable Results:</strong> Clear reporting and analytics that demonstrate real business impact</span></li>
          </ul>
        </div>
      </section>

      <section id="cta" className="content-section py-16 md:py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-white mb-4">Ready to Transform Your Business?</h2>
          <p className="text-xl text-slate-600 dark:text-slate-300 mb-8">Join the {content.businessFocus} already thriving with our digital marketing solutions.</p>
          <div className="cta-buttons">
            <Link href="/contact" className="cta-button inline-block bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-medium text-lg mr-4 mb-4 transition-colors">Contact Us</Link>
            <Link href="/book" className="cta-button book-button inline-block bg-slate-600 hover:bg-slate-700 text-white px-8 py-4 rounded-lg font-medium text-lg mb-4 transition-colors">Book an Appointment</Link>
          </div>
        </div>
      </section>
    </main>
  );
}