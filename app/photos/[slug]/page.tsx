import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { photoCollections } from '@/data/photos'
import PhotoCollectionClient from './PhotoCollectionClient'

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
    title: `${collection.title} – ${collection.category} Photography | Ezell Franklin`,
    description: collection.description,
    openGraph: {
      title: `${collection.title} – ${collection.category} Photography`,
      description: collection.description,
      type: 'website',
    },
  }
}

export default function PhotoCollectionPage({ params }: PageProps) {
  const collection = photoCollections.find((c) => c.slug === params.slug)

  if (!collection) {
    notFound()
  }

  // Structured data for photo collection
  const collectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'ImageGallery',
    name: collection.title,
    description: collection.description,
    image: collection.images.map((img) => `https://ezellfranklin.com${img}`),
    creator: {
      '@type': 'Person',
      name: 'Ezell Franklin',
    },
    datePublished: collection.date || new Date().toISOString(),
    ...(collection.location && { locationCreated: collection.location }),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />
      <PhotoCollectionClient collection={collection} />
    </>
  )
}
