"use client"

export default function ContactForm() {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        console.log('submitted')
        alert('Thanks! We will contact you.')
      }}
      className="rounded-xl border bg-white p-5"
    >
      <div className="grid gap-3">
        <input required aria-label="Name" placeholder="Name" className="rounded border px-3 py-2" />
        <input required aria-label="Email" type="email" placeholder="Email" className="rounded border px-3 py-2" />
        <textarea required aria-label="Message" placeholder="Message" className="rounded border px-3 py-2 h-28" />
        <button type="submit" className="justify-self-start rounded bg-primary-600 text-white px-4 py-2">Send</button>
      </div>
    </form>
  )
}
