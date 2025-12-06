import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Journal – Behind the Scenes Stories | Ezell Franklin',
  description: 'Behind-the-scenes stories, moodboards, and thoughts on art, culture, and music from photographer and DJ Ezell Franklin.',
}

// For now, we'll use a simple array. In production, you'd read from MDX files
const journalPosts = [
  {
    slug: 'the-dual-identity',
    title: 'The Dual Identity',
    date: '2024-01-15',
    excerpt: 'Exploring the intersection of photography and music, and how both inform my creative practice.',
    tags: ['Photography', 'Music', 'Identity'],
  },
  {
    slug: 'behind-the-scenes-portrait-session',
    title: 'Behind the Scenes: Portrait Session',
    date: '2024-01-10',
    excerpt: 'A look into the process of creating intimate portraits and the stories they tell.',
    tags: ['Photography', 'Portraits', 'Process'],
  },
  {
    slug: 'nightlife-culture',
    title: 'Nightlife Culture',
    date: '2024-01-05',
    excerpt: 'Documenting the energy and community of nightlife through photography and sound.',
    tags: ['Nightlife', 'Culture', 'Documentary'],
  },
]

export default function JournalPage() {
  return (
    <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Journal</h1>
          <p className="text-lg text-muted-foreground">
            Behind-the-scenes stories, moodboards, and thoughts on art, culture, and music.
          </p>
        </div>

        <div className="space-y-8">
          {journalPosts.map((post) => (
            <article key={post.slug}>
              <Link href={`/journal/${post.slug}`} className="group block">
                <div className="bg-card rounded-lg p-8 border border-border hover:border-accent/50 transition-colors shadow-lg">
                  <div className="flex items-center gap-4 mb-3 text-sm text-muted-foreground">
                    <time dateTime={post.date}>
                      {new Date(post.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </time>
                  </div>
                  <h2 className="text-2xl font-bold mb-3 group-hover:text-accent transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-muted-foreground mb-4">{post.excerpt}</p>
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-2 py-1 bg-background/50 rounded border border-border"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </div>
  )
}

