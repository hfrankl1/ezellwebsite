import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Sounds by Ez & Lz – DJ Sets, Mixes, and Creative Experiences | Ezell Franklin',
  description: 'Club nights, rooftop sets, and blends that feel like late-night conversations.',
}

export default function SoundsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

