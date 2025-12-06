import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Fine Art Prints – Photography Prints for Sale | Ezell Franklin',
  description: 'Purchase fine art photography prints by Ezell Franklin. Available in multiple sizes with custom framing options. Email to inquire.',
}

export default function PrintsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

