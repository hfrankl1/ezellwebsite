import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { photoCollections } from '@/data/photos'

interface PageProps {
  params: {
    slug: string
  }
}

export async function generateStaticParams() {
  return photoCollections.map((collection) => ({
    slug: collection.slug,
  }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const collection = photoCollections.find((c) => c.slug === params.slug)
  
  if (!collection) {
    return {
      title: 'Not Found',
    }
  }

  return {
    title: collection.title,
    description: collection.description,
  }
}

export default function PhotoCollectionPage({ params }: PageProps) {
  const collection = photoCollections.find((c) => c.slug === params.slug)

  if (!collection) {
    notFound()
  }

  return (
    <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Hero */}
        <div className="mb-16">
          <div className="relative aspect-[16/9] rounded-lg overflow-hidden bg-white/5 mb-8">
            <div className="absolute inset-0 bg-gradient-to-br from-wine/30 to-black" />
            <div className="absolute bottom-0 left-0 right-0 p-8 z-10">
              <span className="text-sm px-4 py-2 bg-black/50 backdrop-blur-sm rounded-full mb-4 inline-block">
                {collection.category}
              </span>
              <h1 className="text-4xl md:text-6xl font-bold mb-4">{collection.title}</h1>
              <p className="text-lg text-white/70 max-w-2xl">{collection.description}</p>
            </div>
          </div>

          {collection.story && (
            <div className="prose prose-invert max-w-3xl">
              <p className="text-lg text-white/80 leading-relaxed">{collection.story}</p>
            </div>
          )}

          {(collection.date || collection.location) && (
            <div className="mt-6 flex gap-6 text-sm text-white/60">
              {collection.date && <span>Date: {collection.date}</span>}
              {collection.location && <span>Location: {collection.location}</span>}
            </div>
          )}
        </div>

        {/* Gallery */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {collection.images.map((image, index) => (
            <div
              key={index}
              className="relative aspect-[4/3] rounded-lg overflow-hidden bg-white/5 group cursor-pointer"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-wine/20 to-black opacity-0 group-hover:opacity-100 transition-opacity" />
              {/* Placeholder - replace with actual Image component when images are available */}
              <div className="w-full h-full bg-gradient-to-br from-wine/30 to-black" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

