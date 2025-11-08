'use client';

import React from 'react';
import { Download } from 'lucide-react';

interface DownloadButtonProps {
  className?: string;
}

export function DownloadButton({ className = '' }: DownloadButtonProps) {
  const handleDownload = () => {
    // Create a link element and trigger download
    const link = document.createElement('a')
    link.href = '/api/generate-portfolio-pdf'
    link.download = 'WebUtsav_Company_Portfolio.pdf'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)

    // Fallback in case the programmatic click is blocked
    setTimeout(() => {
      if (!document.hidden) {
        window.location.href = '/api/generate-portfolio-pdf'
      }
    }, 50)
  };

  return (
    <button
      onClick={handleDownload}
      type="button"
      className={`inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-colors duration-200 print:hidden ${className}`}
      data-print-hide
    >
      <Download className="w-4 h-4 mr-2" />
      Download Portfolio
    </button>
  );
}