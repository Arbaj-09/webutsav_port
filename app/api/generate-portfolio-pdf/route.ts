import { NextResponse } from 'next/server'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function GET(request: Request) {
  const puppeteer = await import('puppeteer')

  const url = new URL(request.url)
  const origin = `${url.protocol}//${url.host}`
  const targetUrl = `${origin}/pdf-template`

  let browser: Awaited<ReturnType<typeof puppeteer.launch>> | null = null

  try {
    browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
      protocolTimeout: 180000,
    })

    const page = await browser.newPage()

    // Block third-party requests to prevent stalls
    await page.setRequestInterception(true)
    const originHost = new URL(origin).host
    page.on('request', (req) => {
      const reqUrl = req.url()
      const u = new URL(reqUrl)
      const isSameOrigin = u.host === originHost || u.origin === 'null'
      const isData = reqUrl.startsWith('data:') || reqUrl.startsWith('blob:')
      if (isSameOrigin || isData) return req.continue()
      if (req.resourceType() === 'document') return req.continue()
      return req.abort()
    })

    await page.setViewport({ width: 794, height: 1123, deviceScaleFactor: 2 }) // A4 at 96 DPI
    await page.emulateMediaType('print')
    await page.goto(targetUrl, { waitUntil: 'networkidle0', timeout: 120000 })

    // Normalize images to local-only and eager load
    await page.evaluate(() => {
      const imgs = Array.from(document.images) as HTMLImageElement[]
      for (const img of imgs) {
        const src = img.getAttribute('src') || ''
        if (src.startsWith('http://') || src.startsWith('https://')) {
          img.src = '/images/logo.png'
        }
        img.loading = 'eager'
        img.decoding = 'sync'
      }
    })

    // Wait for images (cap 5s)
    await Promise.race([
      page.evaluate(async () => {
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
      }),
      new Promise<void>((res) => setTimeout(res, 5000)),
    ])

    // Small delay to ensure rendering is complete
    await new Promise((resolve) => setTimeout(resolve, 500))

    const pdf = await page.pdf({
      format: 'A4',
      printBackground: true,
      preferCSSPageSize: false,
      margin: { top: '0mm', right: '0mm', bottom: '0mm', left: '0mm' },
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
    console.error('PDF generation failed', err)
    return new NextResponse('Failed to generate PDF', { status: 500 })
  }
}
