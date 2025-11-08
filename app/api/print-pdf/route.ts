import { NextResponse } from 'next/server'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function GET(request: Request) {
  // Lazy import to avoid bundling in edge/runtime
  const puppeteer = await import('puppeteer')

  const url = new URL(request.url)
  const origin = `${url.protocol}//${url.host}`
  const targetUrl = origin + '/'

  let browser: Awaited<ReturnType<typeof puppeteer.launch>> | null = null
  try {
    browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    })
    const page = await browser.newPage()
    await page.setViewport({ width: 1280, height: 1000, deviceScaleFactor: 2 })

    await page.emulateMediaType('print')
    await page.goto(targetUrl, { waitUntil: 'networkidle0', timeout: 120000 })
    
    // Directly manipulate DOM and insert physical page breaks
    await page.evaluate(() => {
      // Helper function to create page break div
      const createPageBreak = () => {
        const div = document.createElement('div')
        div.style.pageBreakAfter = 'always'
        div.style.breakAfter = 'page'
        div.style.height = '0'
        div.style.margin = '0'
        div.style.padding = '0'
        div.style.border = 'none'
        return div
      }
      
      // Hide download button
      document.querySelectorAll('[data-print-hide]').forEach(el => {
        (el as HTMLElement).style.display = 'none'
      })
      
      // PAGE 1: Cover image FULL PAGE (no blue background)
      const firstSection = document.querySelector('main > section:first-child') as HTMLElement
      if (firstSection) {
        // Remove all padding, margins, backgrounds
        firstSection.style.height = '287mm'
        firstSection.style.maxHeight = '287mm'
        firstSection.style.paddingTop = '0'
        firstSection.style.paddingBottom = '0'
        firstSection.style.paddingLeft = '0'
        firstSection.style.paddingRight = '0'
        firstSection.style.margin = '0'
        firstSection.style.backgroundColor = 'white'
        firstSection.style.display = 'block'
        firstSection.style.overflow = 'hidden'
        firstSection.style.breakInside = 'avoid'
        firstSection.style.pageBreakInside = 'avoid'
        
        // Remove the container div padding
        const container = firstSection.querySelector('div:not([data-print-hide])') as HTMLElement
        if (container) {
          container.style.maxWidth = '100%'
          container.style.padding = '0'
          container.style.margin = '0'
        }
        
        const img = firstSection.querySelector('img') as HTMLElement
        if (img) {
          img.style.width = '100%'
          img.style.height = '287mm'
          img.style.maxHeight = '287mm'
          img.style.objectFit = 'cover'
          img.style.objectPosition = 'center'
          img.style.display = 'block'
        }
        
        // Insert page break after cover
        firstSection.insertAdjacentElement('afterend', createPageBreak())
      }
      
      // PAGE 2: About + Team
      const about = document.getElementById('about') as HTMLElement
      if (about) {
        about.style.paddingTop = '20px'
        about.style.paddingBottom = '20px'
      }
      
      const team = document.getElementById('team') as HTMLElement
      if (team) {
        team.style.paddingTop = '20px'
        team.style.paddingBottom = '20px'
        
        // Insert page break after team
        team.insertAdjacentElement('afterend', createPageBreak())
      }
      
      // PAGE 3: Expertise
      const expertise = document.getElementById('expertise') as HTMLElement
      if (expertise) {
        expertise.style.paddingTop = '40px'
        expertise.style.paddingBottom = '40px'
        expertise.style.display = 'flex'
        expertise.style.flexDirection = 'column'
        expertise.style.justifyContent = 'center'
        
        const expertiseTitle = expertise.querySelector('.text-center') as HTMLElement
        if (expertiseTitle) expertiseTitle.style.marginBottom = '24px'
        
        const expertiseGrid = expertise.querySelector('.grid') as HTMLElement
        if (expertiseGrid) expertiseGrid.style.gap = '20px'
        
        // Insert page break after expertise
        expertise.insertAdjacentElement('afterend', createPageBreak())
      }
      
      // PAGE 4-5: Products - Restructure completely
      const products = document.getElementById('products') as HTMLElement
      if (products) {
        const productGrid = products.querySelector('.grid') as HTMLElement
        if (productGrid) {
          const productCards = Array.from(productGrid.children) as HTMLElement[]
          
          // Clear the grid
          productGrid.innerHTML = ''
          productGrid.style.display = 'block'
          productGrid.style.padding = '0'
          productGrid.style.margin = '0'
          
          // Create Page 4 container (2 products horizontal)
          const page4Container = document.createElement('div')
          page4Container.style.display = 'grid'
          page4Container.style.gridTemplateColumns = '1fr 1fr'
          page4Container.style.gap = '20px'
          page4Container.style.paddingTop = '20px'
          page4Container.style.paddingBottom = '20px'
          page4Container.style.breakInside = 'avoid'
          page4Container.style.pageBreakInside = 'avoid'
          
          // Add products 1-2 to page 4
          if (productCards[0]) {
            productCards[0].style.breakInside = 'avoid'
            page4Container.appendChild(productCards[0])
          }
          if (productCards[1]) {
            productCards[1].style.breakInside = 'avoid'
            page4Container.appendChild(productCards[1])
          }
          
          productGrid.appendChild(page4Container)
          
          // Insert page break after page 4
          productGrid.appendChild(createPageBreak())
          
          // Create Page 5 container (4 products vertical)
          const page5Container = document.createElement('div')
          page5Container.style.display = 'flex'
          page5Container.style.flexDirection = 'column'
          page5Container.style.gap = '20px'
          page5Container.style.paddingTop = '20px'
          page5Container.style.paddingBottom = '20px'
          page5Container.style.breakInside = 'avoid'
          page5Container.style.pageBreakInside = 'avoid'
          
          // Add products 3-6 to page 5
          for (let i = 2; i < productCards.length; i++) {
            if (productCards[i]) {
              productCards[i].style.breakInside = 'avoid'
              productCards[i].style.width = '100%'
              page5Container.appendChild(productCards[i])
            }
          }
          
          productGrid.appendChild(page5Container)
          
          // Insert page break after page 5
          productGrid.appendChild(createPageBreak())
        }
      }
      
      // PAGE 6: Clients + Footer
      const projects = document.getElementById('projects') as HTMLElement
      if (projects) {
        projects.style.paddingTop = '20px'
        projects.style.paddingBottom = '20px'
        
        const clientGrid = projects.querySelector('.grid')
        if (clientGrid) {
          const clients = Array.from(clientGrid.children) as HTMLElement[]
          clients.forEach(client => {
            client.style.breakInside = 'avoid'
            client.style.pageBreakInside = 'avoid'
          })
        }
      }
      
      // Footer with gap
      const footer = document.querySelector('section.bg-slate-900') as HTMLElement
      if (footer) {
        footer.style.marginTop = '30px'
        footer.style.paddingTop = '16px'
        footer.style.paddingBottom = '16px'
        footer.style.breakInside = 'avoid'
        footer.style.pageBreakInside = 'avoid'
      }
      
      // Keep headings with content
      document.querySelectorAll('h1, h2, h3').forEach(heading => {
        (heading as HTMLElement).style.breakAfter = 'avoid'
        ;(heading as HTMLElement).style.pageBreakAfter = 'avoid'
      })
    })
    
    // Wait for styles to be applied
    await new Promise(resolve => setTimeout(resolve, 1000))

    // Force-load all lazy images and wait until they are decoded
    await page.evaluate(async () => {
      document.querySelectorAll('img[loading="lazy"]').forEach((img) => {
        img.setAttribute('loading', 'eager')
      })
      document.querySelectorAll('img').forEach((img) => {
        ;(img as HTMLImageElement).decoding = 'sync'
      })

      // Scroll through the page to trigger any lazy loaders
      await new Promise<void>((resolve) => {
        let scrolled = 0
        const distance = 800
        const timer = setInterval(() => {
          window.scrollBy(0, distance)
          scrolled += distance
          if (scrolled + window.innerHeight >= document.body.scrollHeight) {
            clearInterval(timer)
            resolve()
          }
        }, 100)
      })

      // Wait for all images to complete
      const images = Array.from(document.images)
      await Promise.all(
        images.map((img) =>
          img.complete && img.naturalWidth > 0
            ? Promise.resolve()
            : new Promise<void>((res) => {
                img.addEventListener('load', () => res(), { once: true })
                img.addEventListener('error', () => res(), { once: true })
              })
        )
      )

      // Scroll back to top so PDF begins at page start
      window.scrollTo({ top: 0 })
    })

    const pdf = await page.pdf({
      format: 'A4',
      printBackground: true,
      preferCSSPageSize: true,
      margin: { top: '5mm', right: '6mm', bottom: '5mm', left: '6mm' },
    })

    await page.close()
    await browser.close()
    browser = null

    return new NextResponse(new Uint8Array(pdf), {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="WebUtsav_Company_Portfolio.pdf"',
      },
    })
  } catch (err: any) {
    if (browser) {
      try { await browser.close() } catch {}
    }
    console.error('PDF print failed', err)
    return new NextResponse('Failed to generate PDF', { status: 500 })
  }
}
