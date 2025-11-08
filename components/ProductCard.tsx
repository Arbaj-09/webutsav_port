import Image from 'next/image'

type Props = {
  title: string
  subtitle?: string
  description?: string
  href?: string
  logo?: string
  bullets: string[]
}

export default function ProductCard({ title, subtitle, description, href, logo, bullets }: Props) {
  return (
    <div className="bg-white border-2 border-slate-200 overflow-hidden hover:border-primary-600 transition-all duration-300 flex flex-col h-full">
      {/* Product Image */}
      {logo && (
        <div className="relative h-40 md:h-48 lg:h-56 bg-white border-b-2 border-slate-200 flex items-center justify-center p-4 md:p-6 lg:p-8">
          <Image 
            src={logo} 
            alt={title} 
            width={220} 
            height={220} 
            className="object-contain max-h-full w-auto"
          />
        </div>
      )}
      
      {/* Product Content */}
      <div className="p-4 md:p-5 lg:p-6 flex flex-col flex-grow">
        {/* Title with colored bar */}
        <div className="mb-3 md:mb-4">
          <div className="bg-primary-600 text-white px-3 md:px-4 py-1.5 md:py-2 text-[10px] md:text-xs font-bold uppercase tracking-wider inline-block">
            {subtitle || 'PRODUCT'}
          </div>
          <h3 className="font-poppins text-lg md:text-xl lg:text-2xl font-bold mt-3 md:mt-4 text-slate-900 leading-tight">{title}</h3>
        </div>

        {/* Description */}
        {description && (
          <p className="text-slate-700 text-xs md:text-sm leading-relaxed mb-4 md:mb-5 text-justify">
            {description}
          </p>
        )}

        {/* Features List */}
        <ul className="space-y-2 md:space-y-2.5 mb-4 md:mb-5 flex-grow">
          {bullets.map((bullet, i) => (
            <li key={i} className="text-xs md:text-sm text-slate-700 flex items-start leading-relaxed">
              <span className="text-primary-600 mr-2 md:mr-3 mt-0.5 font-bold flex-shrink-0">•</span>
              <span>{bullet}</span>
            </li>
          ))}
        </ul>

        {/* Link */}
        {href && (
          <div className="pt-3 md:pt-4 border-t border-slate-200 mt-auto">
            <a 
              href={href} 
              target="_blank" 
              rel="noreferrer" 
              className="text-primary-600 hover:text-primary-700 font-semibold text-xs md:text-sm break-all"
            >
              {href.replace('https://', '').replace('www.', '')}
            </a>
          </div>
        )}
      </div>
    </div>
  )
}
