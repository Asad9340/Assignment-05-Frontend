import Link from 'next/link'

export default function EventDetailsNotFound() {
  return (
    <div>
      <h2>Not Found event details</h2>
      <p>Could not find requested resource</p>
      <Link href="/">Return Home</Link>
    </div>
  )
}