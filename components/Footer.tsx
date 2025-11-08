import { DownloadButton } from './DownloadButton'

export default function Footer() {
  return (
    <footer className="mt-16 border-t">
      <div className="mx-auto max-w-6xl px-4 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm">© WebUtsav Pvt. Ltd. — Empowering Digital Transformation</p>
        <DownloadButton />
      </div>
    </footer>
  )
}
