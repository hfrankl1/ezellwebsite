import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-6xl md:text-8xl font-bold mb-4">404</h1>
        <h2 className="text-2xl md:text-3xl font-semibold mb-4">Page Not Found</h2>
        <p className="text-white/70 mb-8">
          The page you&apos;re looking for doesn&apos;t exist.
        </p>
        <Link
          href="/"
          className="inline-block bg-wine hover:bg-wine-light text-white px-8 py-3 rounded-full font-medium transition-colors"
        >
          Go Home
        </Link>
      </div>
    </div>
  )
}

