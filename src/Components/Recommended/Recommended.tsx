import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { fetchRelatedVideos } from '../../api/youtube'
import { formatCount } from '../../utils/formatCount'
import type { YouTubeVideoItem } from '../../types/youtube'

type RecommendedProps = {
  categoryId?: string
}

const Recommended = ({ categoryId }: RecommendedProps) => {
  const [relatedVideos, setRelatedVideos] = useState<YouTubeVideoItem[]>([])

  useEffect(() => {
    const loadRelatedVideos = async () => {
      if (!categoryId) return
      try {
        const results = await fetchRelatedVideos(categoryId)
        setRelatedVideos(results)
      } catch (error) {
        console.error('Failed to fetch recommended:', error)
      }
    }

    loadRelatedVideos()
  }, [categoryId])

  return (
    <div className='w-full lg:w-[30%] flex flex-col gap-3'>
      {relatedVideos.map((video) => (
        <Link
          to={`/video/${video.snippet.categoryId}/${video.id}`}
          key={video.id}
          className='flex gap-2 cursor-pointer hover:bg-neutral-100 p-2 rounded-lg'
        >
          <img
            className='w-40 h-[90px] rounded-xl object-cover shrink-0'
            src={video.snippet.thumbnails.medium?.url}
            alt=""
          />
          <div className='flex flex-col'>
            <h4 className='text-sm font-semibold line-clamp-2 leading-tight mb-1 text-neutral-900'>{video.snippet.title}</h4>
            <p className='text-xs text-neutral-600 truncate'>{video.snippet.channelTitle}</p>
            <p className='text-xs text-neutral-600'>{formatCount(video.statistics?.viewCount ?? 0)} views</p>
          </div>
        </Link>
      ))}
    </div>
  )
}

export default Recommended
