'use client'
import Image from 'next/image'
import products from '@/data/products.json'
import clients from '@/data/clients.json'

export default function PDFTemplate() {
  return (
    <main className="pdf-template bg-white">
      <style jsx global>{`
        @media print {
          @page { size: A4 portrait; margin: 0; }
          html, body { width: 210mm; height: 297mm; margin: 0; padding: 0; }
          .page { width: 210mm; height: 297mm; page-break-after: always; page-break-inside: avoid; position: relative; overflow: hidden; }
          .page:last-child { page-break-after: auto; }
          .avoid-break { page-break-inside: avoid; break-inside: avoid; }
        }
        .page { width: 210mm; height: 297mm; position: relative; overflow: hidden; background: white; }
      `}</style>

      {/* PAGE 1: COVER (image only, full bleed) */}
      <div className="page relative">
        <Image src="/images/cover 3 copy.png" alt="Cover" fill className="object-cover" priority />
      </div>

      {/* PAGE 2: COMPANY INTRO + TEAM (two-column) */}
      <div className="page p-[20mm] flex flex-col">
        <div className="mb-8">
          <h2 className="font-poppins text-3xl font-bold text-slate-900 uppercase text-center mb-2">Company Introduction</h2>
          <div className="h-1 w-24 bg-gradient-to-r from-[#0b66c3] to-[#2b9edb] mx-auto" />
        </div>
        <div className="grid grid-cols-[2fr_1fr] gap-8 flex-1">
          <div>
            <p className="text-slate-700 text-sm leading-relaxed mb-4">WebUtsav Pvt. Ltd. is a full-stack IT company providing software development, digital marketing, and cloud services. We build scalable products and measurable campaigns that help businesses grow.</p>
            <p className="text-slate-700 text-sm leading-relaxed mb-4">We focus on innovation, reliability, and client satisfaction—delivering modern solutions with excellent UX, performance, and maintainable code.</p>
            <p className="text-slate-700 text-sm leading-relaxed mb-6">We accelerate digital transformation through cloud-native architectures, automation, and data-driven decisions.</p>
            <div className="space-y-2">
              <p className="text-slate-800 text-sm font-semibold">Mr. Aslam Hasan Pathan — <span className="font-normal">A visionary leader passionate about innovative digital solutions.</span></p>
              <p className="text-slate-800 text-sm font-semibold">Mr. Somnath Narayan Jadhav — <span className="font-normal">Co-founder & Technical Head ensuring project excellence.</span></p>
            </div>
          </div>
          <div className="grid grid-rows-3 gap-4">
            {[
              { t: 'Office Address', v: 'Office No. 115, City Vista, Kharadi, Pune 411014' },
              { t: 'Email & Phone', v: 'info@webutsav.com | +91 87669 22792' },
              { t: 'Website', v: 'www.webutsav.com' },
            ].map((b, i) => (
              <div key={i} className="bg-white border-2 border-slate-200 shadow-sm p-4 avoid-break">
                <p className="text-xs text-slate-500 uppercase font-semibold mb-1">{b.t}</p>
                <p className="text-sm text-slate-800">{b.v}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* PAGE 3: TEAM + EXPERTISE */}
      <div className="page p-[20mm] flex flex-col">
        <h2 className="font-poppins text-2xl font-bold text-slate-900 uppercase text-center mb-6">About Our Team</h2>
        <div className="grid grid-cols-2 gap-6 mb-8">
          <div className="bg-slate-50 border-2 border-slate-200 p-6 avoid-break">
            <h3 className="font-poppins text-lg font-bold text-[#0b66c3] mb-3 uppercase">IT / Product Team</h3>
            <p className="text-slate-700 text-sm leading-relaxed mb-3">We build robust web and mobile applications with modern stacks and scalable cloud.</p>
            <div className="flex flex-wrap gap-2 text-xs font-semibold text-white">
              {['React','Next.js','Spring Boot','Flutter','Node.js','PostgreSQL','AWS'].map(k => (
                <span key={k} className="bg-gradient-to-r from-[#0b66c3] to-[#2b9edb] px-3 py-1 uppercase">{k}</span>
              ))}
            </div>
          </div>
          <div className="bg-slate-50 border-2 border-slate-200 p-6 avoid-break">
            <h3 className="font-poppins text-lg font-bold text-[#0b66c3] mb-3 uppercase">Digital Marketing Team</h3>
            <p className="text-slate-700 text-sm leading-relaxed mb-3">We drive measurable growth using SEO, PPC, SMM, content, and branding.</p>
            <div className="flex flex-wrap gap-2 text-xs font-semibold text-white">
              {['SEO','PPC','SMM','Content','Branding'].map(k => (
                <span key={k} className="bg-gradient-to-r from-[#0b66c3] to-[#2b9edb] px-3 py-1 uppercase">{k}</span>
              ))}
            </div>
          </div>
        </div>
        <h2 className="font-poppins text-2xl font-bold text-slate-900 uppercase text-center mb-4">Our Expertise</h2>
        <div className="grid grid-cols-3 gap-5">
          {[
            { title: 'Full-Stack Development', desc: 'React, Next.js, Node.js, and modern databases.' },
            { title: 'Mobile Apps', desc: 'Flutter and React Native cross-platform apps.' },
            { title: 'Cloud & AWS DevOps', desc: 'Infra setup, CI/CD, observability.' },
            { title: 'UI/UX', desc: 'User-centered design and prototyping.' },
            { title: 'CRM Integrations', desc: 'WhatsApp CRM, EmailJS, automation.' },
            { title: 'SEO & Ads', desc: 'Google Ads, analytics, and optimization.' },
          ].map((item, i) => (
            <div key={i} className="bg-white border-2 border-slate-200 p-4 avoid-break">
              <h3 className="font-poppins text-sm font-bold text-slate-900 mb-2 uppercase">{item.title}</h3>
              <p className="text-slate-700 text-xs leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* PAGE 4: 2 PRODUCTS VERTICAL (stacked full width) */}
      <div className="page p-[20mm] flex flex-col">
        <h2 className="font-poppins text-2xl font-bold text-slate-900 uppercase text-center mb-6">Our IT Products</h2>
        <div className="flex flex-col gap-6 flex-1">
          {/* ManagifyHR */}
          <div className="bg-white border-2 border-slate-200 p-5 avoid-break">
            <div className="flex items-center gap-3 mb-3">
              <Image src="/images/HRM_logo.png" alt="ManagifyHR" width={50} height={50} className="object-contain" />
              <div>
                <h3 className="font-poppins text-lg font-bold text-slate-900">ManagifyHR</h3>
                <span className="text-xs text-[#0b66c3] font-semibold uppercase">Full HRM System</span>
              </div>
            </div>
            <p className="text-slate-700 text-xs leading-relaxed mb-3">ManagifyHR is a complete Human Resource Management platform designed to streamline employee management, attendance tracking, and payroll automation. It supports both web and mobile access.</p>
            <ul className="text-slate-700 text-xs space-y-1">
              {['mobile punch-in/out with geo-fencing','automated payroll & payslip generation','leave/shift/attendance management','document uploads & employee self-service','multilingual interface (English/Hindi/Marathi)','real-time reports and notifications'].map((b,i)=>(<li key={i}>• {b}</li>))}
            </ul>
            <a href="https://managifyhr.com" className="text-[#0b66c3] text-xs font-semibold mt-3 inline-block">Visit managifyhr.com →</a>
          </div>
          {/* RouteBudget */}
          <div className="bg-white border-2 border-slate-200 p-5 avoid-break">
            <div className="flex items-center gap-3 mb-3">
              <Image src="/images/logo.png" alt="RouteBudget" width={50} height={50} className="object-contain" />
              <div>
                <h3 className="font-poppins text-lg font-bold text-slate-900">RouteBudget</h3>
                <span className="text-xs text-[#0b66c3] font-semibold uppercase">Fleet & Expense Management</span>
              </div>
            </div>
            <p className="text-slate-700 text-xs leading-relaxed mb-3">RouteBudget is a fleet and expense management solution for transport and cab businesses. It centralizes fuel, toll, maintenance, and driver expense data with analytics and cloud sync.</p>
            <ul className="text-slate-700 text-xs space-y-1">
              {['fuel & expense logging with image uploads','FastTag & toll recharge management','maintenance & service logs','vehicle-wise expense analytics','role-based ERP access','cloud sync & real-time reporting'].map((b,i)=>(<li key={i}>• {b}</li>))}
            </ul>
            <a href="https://routebudget.com" className="text-[#0b66c3] text-xs font-semibold mt-3 inline-block">Visit routebudget.com →</a>
          </div>
        </div>
      </div>

      {/* PAGE 5: 4 PRODUCTS HORIZONTAL (2 columns x 2 rows) */}
      <div className="page p-[20mm]">
        <div className="grid grid-cols-2 gap-6">
          {products.slice(2,6).map((product: any, i: number) => (
            <div key={i} className="bg-white border-2 border-slate-200 p-4 avoid-break flex flex-col">
              <div className="flex items-center gap-3 mb-3">
                <Image src={product.logo} alt={product.title} width={42} height={42} className="object-contain" />
                <div>
                  <h3 className="font-poppins text-base font-bold text-slate-900">{product.title}</h3>
                  {product.subtitle && (<span className="text-xs text-[#0b66c3] font-semibold uppercase">{product.subtitle}</span>)}
                </div>
              </div>
              <p className="text-slate-700 text-xs leading-relaxed mb-2">{product.description}</p>
              {Array.isArray(product.bullets) && (
                <ul className="text-slate-700 text-xs space-y-1 flex-1">
                  {product.bullets.slice(0,5).map((b:string, j:number)=>(<li key={j}>• {b}</li>))}
                </ul>
              )}
              {product.url && (<a href={product.url} className="text-[#0b66c3] text-xs font-semibold mt-3">Visit →</a>)}
            </div>
          ))}
        </div>
      </div>

      {/* PAGE 6: CLIENTS GRID + FOOTER */}
      <div className="page p-[20mm] flex flex-col">
        <h2 className="font-poppins text-2xl font-bold text-slate-900 uppercase text-center mb-2">Our Clients</h2>
        <div className="h-1 w-24 bg-gradient-to-r from-[#0b66c3] to-[#2b9edb] mx-auto mb-6" />
        <div className="grid grid-cols-4 gap-4 mb-8">
          {clients.map((client: any, i: number) => (
            <a key={i} href={client.url} className="bg-white border-2 border-slate-200 p-4 flex flex-col items-center justify-center avoid-break">
              <Image src={client.logo} alt={client.title} width={54} height={54} className="object-contain mb-2" />
              <p className="text-xs font-semibold text-slate-700 text-center">{client.title}</p>
            </a>
          ))}
        </div>
        <div className="mt-auto pt-6 border-t-2 border-slate-200">
          <div className="bg-slate-900 text-white p-6 -mx-[20mm] -mb-[20mm]">
            <div className="grid grid-cols-2 gap-6 mb-4">
              <div>
                <h3 className="font-poppins font-bold text-sm mb-2 uppercase">WebUtsav Pvt. Ltd.</h3>
                <p className="text-slate-300 text-xs leading-relaxed"><strong>Address:</strong> Office No. 115, City Vista, Kharadi, Pune, Maharashtra 411014</p>
                <p className="text-slate-300 text-xs"><strong>GST No.:</strong> 27AAACW1234Z1ZP</p>
              </div>
              <div>
                <h3 className="font-poppins font-bold text-sm mb-2 uppercase">Contact Details</h3>
                <p className="text-slate-300 text-xs"><strong>Email:</strong> info@webutsav.com</p>
                <p className="text-slate-300 text-xs"><strong>Phone:</strong> +91 87669 22792</p>
                <p className="text-slate-300 text-xs"><strong>Website:</strong> www.webutsav.com</p>
              </div>
            </div>
            <div className="text-center text-slate-400 text-xs pt-4 border-t border-slate-700">© 2025 WebUtsav Pvt. Ltd. All rights reserved.</div>
          </div>
        </div>
      </div>
    </main>
  )
}
