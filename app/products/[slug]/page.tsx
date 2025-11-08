import { notFound } from 'next/navigation'
import products from '@/data/products.json'

export default function ProductPage({ params }: { params: { slug: string } }) {
  const product = (products as any[]).find(p => p.slug === params.slug)
  if (!product) return notFound()
  return (
    <div className="mx-auto max-w-4xl px-4 py-24">
      <h1 className="font-poppins text-3xl font-bold">{product.title}</h1>
      {product.href && (
        <p className="mt-2 text-primary-600"><a href={product.href} target="_blank" rel="noreferrer">{product.href}</a></p>
      )}
      <ul className="mt-6 list-disc pl-5 space-y-2">
        {product.bullets.map((b: string, i: number) => (
          <li key={i}>{b}</li>
        ))}
      </ul>
    </div>
  )
}
