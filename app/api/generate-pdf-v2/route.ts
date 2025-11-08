import React from 'react';
import { NextResponse } from 'next/server';
import { renderToBuffer } from '@react-pdf/renderer';
import { PortfolioPDFWithImages } from '@/lib/generatePDFWithImages';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    // Create the PDF component instance
    const MyDoc = React.createElement(PortfolioPDFWithImages);
    
    // Render to buffer
    const buffer = await renderToBuffer(MyDoc);
    // Convert to web-compatible BodyInit
    const pdfBytes = new Uint8Array(buffer);
    
    return new NextResponse(pdfBytes, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="WebUtsav_Portfolio_2025_Final.pdf"'
      }
    });
  } catch (error) {
    console.error('Error generating PDF:', error);
    return new NextResponse('Error generating PDF', { status: 500 });
  }
}