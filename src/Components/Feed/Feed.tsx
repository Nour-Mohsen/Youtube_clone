import { useEffect, useState } from 'react'
import { fetchPopularVideos, searchVideos } from '../../api/youtube'
import type { YouTubeVideoItem } from '../../types/youtube'
import { VideoCard } from './VideoCard'

type FeedProps = {
  sidebarCategoryId: number
  feedSearchQuery: string | null
}

const Feed = ({ sidebarCategoryId, feedSearchQuery }: FeedProps) => {
  const [videos, setVideos] = useState<YouTubeVideoItem[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadVideos = async () => {
      setIsLoading(true)
      try {
        // Search API when a query is active; otherwise show popular videos.
        const results = feedSearchQuery
          ? await searchVideos(feedSearchQuery)
          : await fetchPopularVideos(sidebarCategoryId)
        setVideos(results)
      } catch (error) {
        console.error('Failed to fetch videos:', error)
        setVideos([])
      } finally {
        setIsLoading(false)
      }
    }

    loadVideos()
  }, [sidebarCategoryId, feedSearchQuery])

  if (isLoading) {
    return null
  }

  if (videos.length === 0) {
    return (
      <p className="text-neutral-600 text-center py-12">
        {feedSearchQuery ? `No results found for "${feedSearchQuery}"` : 'No videos available'}
      </p>
    )
  }

  return (
    <div className='grid gap-4 grid-cols-[repeat(auto-fill,minmax(300px,1fr))]'>
      {videos.map((video) => (
        <VideoCard key={video.id} video={video} />
      ))}
    </div>
  )
}

export default Feed
