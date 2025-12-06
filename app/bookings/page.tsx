import { Metadata } from 'next'
import { Suspense } from 'react'
import BookingsClient from './BookingsClient'

export const metadata: Metadata = {
  title: 'Book a Session – Photography & DJ Services | Ezell Franklin',
  description: 'Book a photography session or DJ set with Ezell Franklin. Available for portraits, events, club sets, and private parties.',
}

export default function BookingsPage() {
  return (
    <Suspense fallback={
      <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    }>
      <BookingsClient />
    </Suspense>
  )
}
