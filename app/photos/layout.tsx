import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Photography – Editorial, Portraits, Events | Ezell Franklin',
  description: 'Editorial photography, portraits, events, and fine art photography.',
}

export default function PhotosLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

