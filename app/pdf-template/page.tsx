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
        <div className="grid grid-cols-[2fr_1fr] gap-8 flex-1">
          {/* Left column */}
          <div className="space-y-4">
            <h2 className="font-poppins text-2xl font-bold text-slate-900 uppercase">Company Introduction</h2>
            <div className="bg-white border-2 border-slate-200 p-5 avoid-break">
              <p className="text-slate-700 text-sm leading-relaxed mb-3">WebUtsav Pvt. Ltd. is a full-stack IT solutions company offering software development, mobile app design, digital marketing, and cloud services.</p>
              <p className="text-slate-700 text-sm leading-relaxed">Our mission is to help businesses accelerate digital transformation through innovation, reliability, and scalable technology.</p>
            </div>
            <div className="bg-white border-2 border-slate-200 p-5 avoid-break">
              <p className="text-slate-800 text-sm font-semibold mb-1">Mr. Aslam Hasan Pathan — <span className="font-normal">A visionary leader passionate about innovative digital solutions.</span></p>
              <p className="text-slate-800 text-sm font-semibold">Mr. Somnath Narayan Jadhav — <span className="font-normal">Co-Founder & Technical Head ensuring project excellence.</span></p>
            </div>
          </div>
          {/* Right column */}
          <div className="space-y-4">
            <h3 className="font-poppins text-xl font-bold text-slate-900 uppercase">About Our Team</h3>
            <div className="bg-white border-2 border-slate-200 p-5 avoid-break">
              <p className="text-slate-700 text-sm leading-relaxed mb-3">Our IT/Product team consists of full-stack developers, designers, and engineers working with React, Next.js, Spring Boot, Flutter, and AWS.</p>
              <p className="text-slate-700 text-sm leading-relaxed">Our Digital Marketing team specializes in SEO, PPC, branding, and creative content to enhance online presence and lead generation.</p>
            </div>
          </div>
        </div>
      </div>

      {/* PAGE 3: EXPERTISE (2-column grid + paragraph) */}
      <div className="page p-[20mm] flex flex-col">
        <h2 className="font-poppins text-2xl font-bold text-slate-900 uppercase text-center mb-6">Our Expertise</h2>
        <div className="grid grid-cols-2 gap-5 mb-6">
          {[
            'Full-stack software development',
            'Mobile app engineering (Flutter, React Native)',
            'Cloud & AWS DevOps',
            'UI/UX and web design',
            'CRM integrations (WhatsApp CRM, EmailJS)',
            'SEO, Google Ads, and social media marketing',
          ].map((title, i) => (
            <div key={i} className="bg-white border-2 border-slate-200 p-4 avoid-break">
              <h3 className="font-poppins text-sm font-bold text-slate-900">{title}</h3>
            </div>
          ))}
        </div>
        <p className="text-slate-700 text-center text-sm max-w-[150mm] mx-auto">
          We combine technology and creativity to deliver end-to-end digital solutions that drive measurable business growth.
        </p>
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
              {[
                'Mobile punch-in/out with geo-fencing',
                'Automated payroll and payslip generation',
                'Leave, shift, and attendance management',
                'Document uploads and employee self-service',
                'Multilingual interface (English/Hindi/Marathi)',
                'Real-time reports and notifications',
              ].map((b,i)=>(<li key={i}>• {b}</li>))}
            </ul>
            <a href="https://managifyhr.com" className="text-[#0b66c3] text-xs font-semibold mt-3 inline-block">Visit managifyhr.com →</a>
            {/* Wide screenshot placeholder */}
            <div className="mt-4">
              <Image src="/images/managifyhr-screenshot.jpg" alt="ManagifyHR Screenshot" width={1000} height={520} className="w-full h-auto object-cover border border-slate-200" />
            </div>
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
              {[
                'Fuel & expense logging with image uploads',
                'FastTag & toll recharge management',
                'Maintenance & service logs',
                'Vehicle-wise analytics dashboard',
                'Role-based ERP access',
                'Cloud sync & real-time reporting',
              ].map((b,i)=>(<li key={i}>• {b}</li>))}
            </ul>
            <a href="https://routebudget.com" className="text-[#0b66c3] text-xs font-semibold mt-3 inline-block">Visit routebudget.com →</a>
            {/* Wide screenshot placeholder */}
            <div className="mt-4">
              <Image src="/images/routebudget-screenshot.jpg" alt="RouteBudget Screenshot" width={1000} height={520} className="w-full h-auto object-cover border border-slate-200" />
            </div>
          </div>
        </div>
      </div>

      {/* PAGE 5: Product Versions & Highlights (2x2 grid) */}
      <div className="page p-[20mm]">
        <h2 className="font-poppins text-2xl font-bold text-slate-900 uppercase text-center mb-6">Product Versions & Highlights</h2>
        <div className="grid grid-cols-2 gap-6">
          {[
            { title: 'ManagifyHR — Mobile App', desc: 'Mobile dashboard for employees, field attendance, and instant notifications.' },
            { title: 'ManagifyHR — Admin Panel', desc: 'Centralized HR dashboard for payroll, attendance, and compliance.' },
            { title: 'RouteBudget — Mobile App', desc: 'Real-time expense tracking, receipt uploads, and route monitoring.' },
            { title: 'RouteBudget — Admin Panel', desc: 'Vehicle analytics, driver records, and cost management tools.' },
          ].map((item, i) => (
            <div key={i} className="bg-white border-2 border-slate-200 p-5 avoid-break">
              <h3 className="font-poppins text-base font-bold text-[#0b66c3] mb-2">{item.title}</h3>
              <p className="text-slate-700 text-sm leading-relaxed">{item.desc}</p>
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
