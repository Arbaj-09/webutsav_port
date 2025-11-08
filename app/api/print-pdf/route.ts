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
    
    // Directly manipulate DOM and apply styles using JavaScript
    await page.evaluate(() => {
      // Hide download button
      document.querySelectorAll('[data-print-hide]').forEach(el => {
        (el as HTMLElement).style.display = 'none'
      })
      
      // PAGE 1: Cover image
      const firstSection = document.querySelector('main > section:first-child') as HTMLElement
      if (firstSection) {
        firstSection.style.maxHeight = '270mm'
        firstSection.style.paddingTop = '2px'
        firstSection.style.paddingBottom = '2px'
        firstSection.style.breakInside = 'avoid'
        firstSection.style.pageBreakInside = 'avoid'
        firstSection.style.breakAfter = 'page'
        firstSection.style.pageBreakAfter = 'always'
        
        const img = firstSection.querySelector('img') as HTMLElement
        if (img) {
          img.style.maxHeight = '265mm'
          img.style.height = 'auto'
          img.style.objectFit = 'contain'
        }
      }
      
      // PAGE 2: About + Team
      const about = document.getElementById('about') as HTMLElement
      if (about) {
        about.style.breakBefore = 'page'
        about.style.pageBreakBefore = 'always'
        about.style.paddingTop = '20px'
        about.style.paddingBottom = '20px'
      }
      
      const team = document.getElementById('team') as HTMLElement
      if (team) {
        team.style.paddingTop = '20px'
        team.style.paddingBottom = '20px'
        team.style.breakAfter = 'page'
        team.style.pageBreakAfter = 'always'
      }
      
      // PAGE 3: Expertise
      const expertise = document.getElementById('expertise') as HTMLElement
      if (expertise) {
        expertise.style.breakBefore = 'page'
        expertise.style.pageBreakBefore = 'always'
        expertise.style.paddingTop = '40px'
        expertise.style.paddingBottom = '40px'
        expertise.style.breakAfter = 'page'
        expertise.style.pageBreakAfter = 'always'
        expertise.style.display = 'flex'
        expertise.style.flexDirection = 'column'
        expertise.style.justifyContent = 'center'
        
        const expertiseTitle = expertise.querySelector('.text-center') as HTMLElement
        if (expertiseTitle) expertiseTitle.style.marginBottom = '24px'
        
        const expertiseGrid = expertise.querySelector('.grid') as HTMLElement
        if (expertiseGrid) expertiseGrid.style.gap = '20px'
      }
      
      // PAGE 4-5: Products
      const products = document.getElementById('products') as HTMLElement
      if (products) {
        products.style.breakBefore = 'page'
        products.style.pageBreakBefore = 'always'
        products.style.paddingTop = '20px'
        products.style.paddingBottom = '20px'
        
        const productGrid = products.querySelector('.grid') as HTMLElement
        if (productGrid) {
          productGrid.style.display = 'grid'
          productGrid.style.gridTemplateColumns = '1fr 1fr'
          productGrid.style.gap = '20px'
          
          const productCards = Array.from(productGrid.children) as HTMLElement[]
          
          // Product 2: break after (end page 4)
          if (productCards[1]) {
            productCards[1].style.breakAfter = 'page'
            productCards[1].style.pageBreakAfter = 'always'
          }
          
          // Products 3-6: full width vertical (page 5)
          for (let i = 2; i < productCards.length; i++) {
            productCards[i].style.gridColumn = '1 / -1'
            productCards[i].style.maxWidth = '100%'
          }
          
          // Product 6: break after (end page 5)
          if (productCards[5]) {
            productCards[5].style.breakAfter = 'page'
            productCards[5].style.pageBreakAfter = 'always'
          }
          
          // Prevent splitting
          productCards.forEach(card => {
            card.style.breakInside = 'avoid'
            card.style.pageBreakInside = 'avoid'
          })
        }
      }
      
      // PAGE 6: Clients + Footer
      const projects = document.getElementById('projects') as HTMLElement
      if (projects) {
        projects.style.breakBefore = 'page'
        projects.style.pageBreakBefore = 'always'
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
      
      // Footer
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
