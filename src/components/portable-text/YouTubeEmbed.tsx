interface YouTubeEmbedProps {
  url: string
  caption?: string
}

function getYouTubeId(url: string): string | null {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
  const match = url.match(regExp)
  return match && match[2].length === 11 ? match[2] : null
}

export function YouTubeEmbed({ url, caption }: YouTubeEmbedProps) {
  const videoId = getYouTubeId(url)

  if (!videoId) {
    return (
      <div className="my-8 p-8 bg-warm-100 rounded-xl text-center text-warm-600">
        Invalid YouTube URL
      </div>
    )
  }

  return (
    <figure className="my-8">
      <div className="aspect-video rounded-xl overflow-hidden shadow-lg">
        <iframe
          src={`https://www.youtube.com/embed/${videoId}`}
          title="YouTube video"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full h-full"
          loading="lazy"
        />
      </div>
      {caption && (
        <figcaption className="text-center text-sm text-warm-500 mt-3">
          {caption}
        </figcaption>
      )}
    </figure>
  )
}
