'use client';

import React from 'react';
import { Download } from 'lucide-react';

interface DownloadButtonProps {
  className?: string;
}

export function DownloadButton({ className = '' }: DownloadButtonProps) {
  const handleDownload = () => {
    // Create a temporary link element
    const link = document.createElement('a');
    link.href = '/api/print-pdf';
    link.download = 'WebUtsav_Company_Portfolio.pdf';
    link.target = '_blank';
    
    // Trigger the download
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <button
      onClick={handleDownload}
      className={`inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-colors duration-200 print:hidden ${className}`}
      data-print-hide
    >
      <Download className="w-4 h-4 mr-2" />
      Download Portfolio
    </button>
  );
}