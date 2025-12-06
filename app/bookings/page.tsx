import { Metadata } from 'next'
import { Suspense } from 'react'
import BookingsClient from './BookingsClient'

export const metadata: Metadata = {
  title: 'Book Photos or Sounds | Ezell Franklin',
  description: 'Book photo sessions or DJ sets with Ezell Franklin. Share your vision and get a personal reply with options, timing, and next steps.',
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
