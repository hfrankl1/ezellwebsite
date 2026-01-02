import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import YouTubeEmbed from '@/components/YouTubeEmbed'

interface PageProps {
  params: {
    slug: string
  }
}

// In production, you'd read from MDX files
const journalPosts: Record<string, { title: string; date: string; content: string; videoId?: string }> = {
  'the-dual-identity': {
    title: 'The Dual Identity',
    date: '2024-01-15',
    content: `
# The Dual Identity

Exploring the intersection of photography and music, and how both inform my creative practice.

Photography and DJing might seem like separate worlds, but for me, they're two sides of the same creative coin. Both are about capturing moments—one visually, one sonically. Both require an understanding of rhythm, timing, and flow.

When I'm behind the camera, I'm thinking about composition, light, and the story I want to tell. When I'm behind the decks, I'm thinking about energy, mood, and how to move people. The principles are the same: create something that resonates, that makes people feel something.

This dual identity isn't about splitting myself in two. It's about bringing everything I am to everything I do. The photographer in me sees the world differently when I'm selecting tracks. The DJ in me understands rhythm and flow when I'm composing a shot.

It's all connected. It's all one story.
    `.trim(),
  },
  'behind-the-scenes-portrait-session': {
    title: 'Behind the Scenes: Portrait Session',
    date: '2024-01-10',
    content: `
# Behind the Scenes: Portrait Session

A look into the process of creating intimate portraits and the stories they tell.

Every portrait session starts with a conversation. Before I even pick up the camera, I want to understand who I'm photographing—not just what they look like, but who they are. What's their story? What do they want to express?

The technical stuff matters—lighting, composition, camera settings—but the real magic happens in the moments between shots. It's in the way someone relaxes when they forget the camera is there. It's in the genuine smile that comes after a joke. It's in the quiet confidence that emerges when someone feels seen.

My job isn't just to take a picture. It's to create a space where someone can be themselves, fully and authentically. That's when the real portraits happen.
    `.trim(),
  },
  'nightlife-culture': {
    title: 'Nightlife Culture',
    date: '2024-01-05',
    content: `
# Nightlife Culture

Documenting the energy and community of nightlife through photography and sound.

Nightlife isn't just about music and dancing. It's about community. It's about creating a space where people can be free, express themselves, and connect with others. As both a photographer and a DJ, I get to witness this from two perspectives.

From behind the camera, I capture the energy, the movement, the moments of connection. From behind the decks, I help create that energy, guide that movement, facilitate those connections.

There's something beautiful about a room full of people moving together, lost in the music. It's temporary—the moment will pass, the night will end—but the feeling lingers. That's what I'm trying to capture, both in my photos and in my sets.

Nightlife culture is about more than just partying. It's about finding your people, expressing yourself, and creating memories that last long after the lights come on.
    `.trim(),
  },
  'full-set-live-session': {
    title: 'Full Set: Live Session',
    date: '2024-01-20',
    videoId: '5Y8d5RM7SPw',
    content: `
# Full Set: Live Session

A full recording from a recent night—energy, transitions, and the room's evolution.

There's something different about a full-length set compared to a curated mix. It's not just about the tracks—it's about the journey. The way the energy builds and shifts. The moments of connection between songs. The way the room responds and evolves throughout the night.

This recording captures that arc. From the opening moments when people are still finding their place, to the peak when everything clicks and the room moves as one, to the closing tracks that bring it all back down. It's all there—the transitions, the energy, the flow.

A set is a conversation. With the music, with the room, with yourself. This is one of those conversations.
    `.trim(),
  },
}

export async function generateStaticParams() {
  return Object.keys(journalPosts).map((slug) => ({
    slug,
  }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const post = journalPosts[params.slug]
  
  if (!post) {
    return {
      title: 'Not Found',
    }
  }

  return {
    title: `${post.title} | Journal | Ezell Franklin`,
    description: `Read ${post.title} on the Ezell Franklin journal. Behind-the-scenes stories, moodboards, and thoughts on art, culture, and music.`,
  }
}

export default function JournalPostPage({ params }: PageProps) {
  const post = journalPosts[params.slug]

  if (!post) {
    notFound()
  }

  return (
    <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <Link
          href="/journal"
          className="text-sm text-white/50 hover:text-wine transition-colors mb-8 inline-block"
        >
          ← Back to Journal
        </Link>

        <article className="prose prose-invert prose-lg max-w-none">
          <div className="mb-8">
            <time
              dateTime={post.date}
              className="text-sm text-white/50"
            >
              {new Date(post.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </time>
            <h1 className="text-4xl md:text-5xl font-bold mt-4 mb-0">
              {post.title}
            </h1>
          </div>

          <div className="prose prose-invert prose-lg">
            {post.content.split('\n').map((paragraph, index) => {
              if (paragraph.startsWith('# ')) {
                return (
                  <h2 key={index} className="text-2xl font-bold mt-8 mb-4">
                    {paragraph.replace('# ', '')}
                  </h2>
                )
              }
              if (paragraph.trim()) {
                return (
                  <p key={index} className="mb-4 text-white/80 leading-relaxed">
                    {paragraph}
                  </p>
                )
              }
              return null
            })}
            {post.videoId && (
              <div className="my-8">
                <YouTubeEmbed videoId={post.videoId} title={post.title} />
                <div className="mt-4 text-center">
                  <a
                    href={`https://www.youtube.com/watch?v=${post.videoId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-muted-foreground hover:text-accent transition-colors"
                  >
                    Watch on YouTube
                  </a>
                </div>
              </div>
            )}
          </div>
        </article>
      </div>
    </div>
  )
}

