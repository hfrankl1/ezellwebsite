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
    title: collection.title,
    description: collection.description,
  }
}

export default function PhotoCollectionPage({ params }: PageProps) {
  const collection = photoCollections.find((c) => c.slug === params.slug)

  if (!collection) {
    notFound()
  }

  return <PhotoCollectionClient collection={collection} />
}
