import { Link } from 'react-router-dom'
import moment from 'moment'
import { formatCount } from '../../utils/formatCount'
import type { YouTubeSnippet, YouTubeStatistics, YouTubeVideoItem } from '../../types/youtube'

type VideoCardProps = {
    video: YouTubeVideoItem
}

function getThumbnailUrl(snippet: YouTubeSnippet): string {
    return snippet.thumbnails.medium?.url
        || snippet.thumbnails.high?.url
        || snippet.thumbnails.default?.url
        || ''
}

export function VideoCard({ video }: VideoCardProps) {
    const { snippet, statistics, id } = video

    return (
        <Link to={`/video/${snippet.categoryId}/${id}`} className='flex flex-col gap-2'>
            <img
                src={getThumbnailUrl(snippet)}
                className="rounded-xl aspect-video w-full object-cover"
                alt=""
            />
            <div className='flex gap-3 mt-1'>
                <div className='w-9 h-9 shrink-0 bg-neutral-200 rounded-full mt-1'></div>
                <div className='flex flex-col'>
                    <h2 className='text-base font-semibold line-clamp-2 leading-tight text-neutral-900'>{snippet.title}</h2>
                    <p className='text-sm text-neutral-600 mt-1'>{snippet.channelTitle}</p>
                    <VideoMeta snippet={snippet} statistics={statistics} />
                </div>
            </div>
        </Link>
    )
}

type VideoMetaProps = {
    snippet: YouTubeSnippet
    statistics?: YouTubeStatistics
}

function VideoMeta({ snippet, statistics }: VideoMetaProps) {
    return (
        <p className='text-sm text-neutral-600'>
            {formatCount(statistics?.viewCount || 0)} views &bull; {moment(snippet.publishedAt).fromNow()}
        </p>
    )
}
