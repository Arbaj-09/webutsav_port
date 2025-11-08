import { DownloadButton } from '@/components/DownloadButton'
import ProductCard from '@/components/ProductCard'
import products from '@/data/products.json'
import clients from '@/data/clients.json'
import Image from 'next/image'

export default function Page() {
  return (
    <main className="bg-white">
      {/* Hero Cover Section - Full Width */}
      <section className="relative w-full bg-slate-900 overflow-hidden py-4 md:py-8">
        <div className="absolute top-4 right-4 md:top-8 md:right-8 z-10">
          <DownloadButton />
        </div>
        <div className="mx-auto max-w-7xl px-4">
          <Image 
            src="/images/cover 3 copy.png" 
            alt="WebUtsav - We Look After You" 
            width={1364}
            height={2048}
            className="w-full h-auto object-contain"
            sizes="100vw"
            priority
          />
        </div>
      </section>

      {/* Company Intro */}
      <section id="about" className="py-12 md:py-20 bg-slate-50 border-t-4 border-primary-600">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="text-center max-w-4xl mx-auto">
            <h2 className="font-poppins text-2xl md:text-4xl font-bold text-slate-900 uppercase tracking-wide">WebUtsav Pvt. Ltd.</h2>
            <div className="h-1 w-24 md:w-32 bg-primary-600 mx-auto mt-4 md:mt-6" />
            <p className="text-slate-700 mt-6 md:mt-8 text-sm md:text-base leading-relaxed text-justify px-2">
              WebUtsav Pvt. Ltd. is a full-stack IT company providing software development, digital marketing, and cloud services. We build scalable products and measurable campaigns that help businesses grow. Our mission is to deliver innovative, scalable, and impactful tech solutions for businesses globally through digital empowerment and smart technology.
            </p>
          </div>
        </div>
      </section>

      {/* About Our Team */}
      <section id="team" className="py-12 md:py-20 bg-white border-t-4 border-primary-600">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="text-center mb-8 md:mb-16">
            <h2 className="font-poppins text-2xl md:text-4xl font-bold text-slate-900 uppercase tracking-wide">About Our Team</h2>
            <div className="h-1 w-24 md:w-32 bg-primary-600 mx-auto mt-4 md:mt-6" />
          </div>
          <div className="grid md:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto">
            <div className="bg-slate-50 border-2 border-slate-200 p-6 md:p-8">
              <h3 className="font-poppins text-xl md:text-2xl font-bold text-primary-600 mb-4 uppercase">IT Development Team</h3>
              <p className="text-slate-700 text-sm md:text-base leading-relaxed mb-4 text-justify">
                Our technical team comprises experienced developers and engineers specializing in modern web and mobile technologies. We leverage cutting-edge frameworks and cloud infrastructure to build robust, scalable solutions.
              </p>
              <div className="flex flex-wrap gap-2 mt-4">
                <span className="bg-primary-600 text-white px-3 py-1 text-xs font-semibold uppercase">React</span>
                <span className="bg-primary-600 text-white px-3 py-1 text-xs font-semibold uppercase">Flutter</span>
                <span className="bg-primary-600 text-white px-3 py-1 text-xs font-semibold uppercase">Node.js</span>
                <span className="bg-primary-600 text-white px-3 py-1 text-xs font-semibold uppercase">AWS</span>
                <span className="bg-primary-600 text-white px-3 py-1 text-xs font-semibold uppercase">DevOps</span>
              </div>
            </div>
            <div className="bg-slate-50 border-2 border-slate-200 p-6 md:p-8">
              <h3 className="font-poppins text-xl md:text-2xl font-bold text-primary-600 mb-4 uppercase">Marketing Team</h3>
              <p className="text-slate-700 text-sm md:text-base leading-relaxed mb-4 text-justify">
                Our digital marketing experts drive measurable growth through data-driven strategies. From search engine optimization to paid advertising campaigns, we deliver results that matter to your business.
              </p>
              <div className="flex flex-wrap gap-2 mt-4">
                <span className="bg-primary-600 text-white px-3 py-1 text-xs font-semibold uppercase">SEO</span>
                <span className="bg-primary-600 text-white px-3 py-1 text-xs font-semibold uppercase">PPC</span>
                <span className="bg-primary-600 text-white px-3 py-1 text-xs font-semibold uppercase">Social Media</span>
                <span className="bg-primary-600 text-white px-3 py-1 text-xs font-semibold uppercase">Analytics</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Expertise */}
      <section id="expertise" className="py-12 md:py-20 bg-slate-50 border-t-4 border-primary-600">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="text-center mb-8 md:mb-16">
            <h2 className="font-poppins text-2xl md:text-4xl font-bold text-slate-900 uppercase tracking-wide">Our Expertise</h2>
            <div className="h-1 w-24 md:w-32 bg-primary-600 mx-auto mt-4 md:mt-6" />
            <p className="text-slate-700 mt-4 md:mt-6 text-sm md:text-base max-w-3xl mx-auto px-2">Comprehensive technology solutions across the full development lifecycle</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            <div className="bg-white border-2 border-slate-200 p-5 md:p-6 hover:border-primary-600 transition-all">
              <h3 className="font-poppins text-base md:text-lg font-bold text-slate-900 mb-3 uppercase">Full-Stack Development</h3>
              <p className="text-slate-700 text-xs md:text-sm leading-relaxed text-justify">
                End-to-end web application development using React, Next.js, Node.js, and modern databases. Scalable architecture and clean code practices.
              </p>
            </div>
            <div className="bg-white border-2 border-slate-200 p-5 md:p-6 hover:border-primary-600 transition-all">
              <h3 className="font-poppins text-base md:text-lg font-bold text-slate-900 mb-3 uppercase">Mobile Apps</h3>
              <p className="text-slate-700 text-xs md:text-sm leading-relaxed text-justify">
                Cross-platform mobile applications with Flutter and React Native. Native performance with beautiful, intuitive user interfaces.
              </p>
            </div>
            <div className="bg-white border-2 border-slate-200 p-5 md:p-6 hover:border-primary-600 transition-all">
              <h3 className="font-poppins text-base md:text-lg font-bold text-slate-900 mb-3 uppercase">Cloud & DevOps</h3>
              <p className="text-slate-700 text-xs md:text-sm leading-relaxed text-justify">
                AWS infrastructure setup, CI/CD pipelines, containerization with Docker, and automated deployment strategies for reliability.
              </p>
            </div>
            <div className="bg-white border-2 border-slate-200 p-5 md:p-6 hover:border-primary-600 transition-all">
              <h3 className="font-poppins text-base md:text-lg font-bold text-slate-900 mb-3 uppercase">UI/UX Design</h3>
              <p className="text-slate-700 text-xs md:text-sm leading-relaxed text-justify">
                User-centered design with modern interfaces. Wireframing, prototyping, and design systems that enhance user experience.
              </p>
            </div>
            <div className="bg-white border-2 border-slate-200 p-5 md:p-6 hover:border-primary-600 transition-all">
              <h3 className="font-poppins text-base md:text-lg font-bold text-slate-900 mb-3 uppercase">WhatsApp CRM</h3>
              <p className="text-slate-700 text-xs md:text-sm leading-relaxed text-justify">
                Automated customer engagement through WhatsApp Business API. Campaign management, chatbots, and CRM integration.
              </p>
            </div>
            <div className="bg-white border-2 border-slate-200 p-5 md:p-6 hover:border-primary-600 transition-all">
              <h3 className="font-poppins text-base md:text-lg font-bold text-slate-900 mb-3 uppercase">Digital Marketing</h3>
              <p className="text-slate-700 text-xs md:text-sm leading-relaxed text-justify">
                SEO optimization, Google Ads, social media marketing, and content strategy. Data-driven campaigns with measurable ROI.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Products */}
      <section id="products" className="py-12 md:py-20 bg-white border-t-4 border-primary-600">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="text-center mb-8 md:mb-16">
            <h2 className="font-poppins text-2xl md:text-4xl font-bold text-slate-900 uppercase tracking-wide">Our Products</h2>
            <div className="h-1 w-24 md:w-32 bg-primary-600 mx-auto mt-4 md:mt-6" />
            <p className="text-slate-700 mt-4 md:mt-6 text-sm md:text-base max-w-3xl mx-auto px-2">Innovative software solutions built for real-world business challenges</p>
          </div>
          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {(products as any[]).map((p) => (
              <ProductCard 
                key={p.slug} 
                title={p.title} 
                subtitle={p.subtitle}
                description={p.description}
                href={p.href} 
                logo={p.logo} 
                bullets={p.bullets} 
              />
            ))}
          </div>
        </div>
      </section>

      {/* Projects & Clients */}
      <section id="projects" className="py-12 md:py-20 bg-slate-50 border-t-4 border-primary-600">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="text-center mb-8 md:mb-16">
            <h2 className="font-poppins text-2xl md:text-4xl font-bold text-slate-900 uppercase tracking-wide">Our Clients</h2>
            <div className="h-1 w-24 md:w-32 bg-primary-600 mx-auto mt-4 md:mt-6" />
            <p className="text-slate-700 mt-4 md:mt-6 text-sm md:text-base px-2">Trusted by leading businesses across industries</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
            {(clients as any[]).map((c) => (
              <a 
                key={c.title} 
                href={c.url} 
                target="_blank" 
                rel="noreferrer" 
                className="bg-white border-2 border-slate-200 p-4 md:p-6 flex flex-col items-center justify-center hover:border-primary-600 transition-all duration-300 group min-h-[140px] md:min-h-[160px]"
              >
                <div className="h-12 w-12 md:h-16 md:w-16 mb-3 md:mb-4 flex items-center justify-center">
                  <Image 
                    src={c.logo} 
                    alt={c.title} 
                    width={80} 
                    height={80} 
                    className="object-contain max-h-full max-w-full transition-all" 
                  />
                </div>
                <p className="text-xs md:text-sm font-semibold text-slate-700 text-center group-hover:text-primary-600 transition-colors leading-tight">
                  {c.title}
                </p>
              </a>
            ))}
          </div>
        </div>
      </section>

      

      {/* Company Information Footer */}
      <section className="py-8 md:py-12 bg-slate-900 text-white border-t-4 border-primary-600">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12">
            <div>
              <h3 className="font-poppins font-bold text-lg md:text-xl mb-4 md:mb-6 uppercase tracking-wide">WebUtsav Pvt. Ltd.</h3>
              <div className="space-y-2 md:space-y-3 text-slate-300 text-xs md:text-sm leading-relaxed">
                <p><strong className="text-white">Address:</strong> Office No. 115, City Vista, Kharadi, Pune, Maharashtra 411014</p>
                <p><strong className="text-white">GST No.:</strong> 27AAACW1234Z1ZP</p>
              </div>
            </div>
            <div>
              <h3 className="font-poppins font-bold text-lg md:text-xl mb-4 md:mb-6 uppercase tracking-wide">Contact Details</h3>
              <div className="space-y-2 md:space-y-3 text-slate-300 text-xs md:text-sm leading-relaxed">
                <p><strong className="text-white">Email:</strong> <a className="text-primary-400 hover:text-primary-300 break-all" href="mailto:info@webutsav.com">info@webutsav.com</a></p>
                <p><strong className="text-white">Phone:</strong> <a className="text-primary-400 hover:text-primary-300" href="tel:+918766922792">+91 87669 22792</a></p>
                <p><strong className="text-white">Website:</strong> <a className="text-primary-400 hover:text-primary-300" href="https://webutsav.com" target="_blank" rel="noreferrer">www.webutsav.com</a></p>
              </div>
            </div>
          </div>
          <div className="mt-8 md:mt-12 pt-6 md:pt-8 border-t border-slate-700 text-center text-slate-400 text-xs md:text-sm">
            <p>&copy; {new Date().getFullYear()} WebUtsav Pvt. Ltd. All rights reserved.</p>
          </div>
        </div>
      </section>
    </main>
  )
}
