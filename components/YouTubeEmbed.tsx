interface YouTubeEmbedProps {
  videoId: string
  title?: string
}

export default function YouTubeEmbed({ videoId, title }: YouTubeEmbedProps) {
  return (
    <div className="w-full">
      <div className="relative w-full" style={{ paddingBottom: '56.25%' }}> {/* 16:9 aspect ratio */}
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${videoId}?modestbranding=1&rel=0`}
          title={title || 'YouTube video player'}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          loading="lazy"
          className="absolute top-0 left-0 w-full h-full rounded-lg"
        />
      </div>
    </div>
  )
}

