import Link from 'next/link'
import Image from 'next/image'

export default function Navbar() {
  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-white/95 backdrop-blur-sm shadow-sm">
      <div className="mx-auto max-w-7xl px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <Image src="/images/logo.webp" alt="WebUtsav" width={40} height={40} className="rounded" />
          <span className="font-poppins text-xl font-bold text-slate-900">WebUtsav</span>
        </Link>
        <nav className="hidden md:flex gap-8 text-sm font-medium">
          <a href="#about" className="text-slate-700 hover:text-primary-600 transition-colors">About</a>
          <a href="#services" className="text-slate-700 hover:text-primary-600 transition-colors">Services</a>
          <a href="#products" className="text-slate-700 hover:text-primary-600 transition-colors">Products</a>
          <a href="#projects" className="text-slate-700 hover:text-primary-600 transition-colors">Clients</a>
          <a href="#contact" className="text-slate-700 hover:text-primary-600 transition-colors">Contact</a>
        </nav>
      </div>
    </header>
  )
}
