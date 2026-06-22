import { useState, useEffect } from 'react'
import like from '../../assets/like.png'
import dislike from '../../assets/dislike.png'
import share from '../../assets/share.png'
import save from '../../assets/save.png'
import moment from 'moment'
import { useParams } from 'react-router-dom'
import { fetchChannelById, fetchComments, fetchVideoById } from '../../api/youtube'
import { formatCount } from '../../utils/formatCount'
import type { YouTubeChannelItem, YouTubeCommentThread, YouTubeVideoItem } from '../../types/youtube'

const PlayVideo = () => {
  const { videoId } = useParams<{ categoryId: string; videoId: string }>()
  const [video, setVideo] = useState<YouTubeVideoItem | null>(null)
  const [channel, setChannel] = useState<YouTubeChannelItem | null>(null)
  const [comments, setComments] = useState<YouTubeCommentThread[]>([])

  useEffect(() => {
    if (!videoId) return

    const loadVideo = async () => {
      const result = await fetchVideoById(videoId)
      setVideo(result)
    }

    loadVideo()
  }, [videoId])

  useEffect(() => {
    if (!video) return

    const loadChannel = async () => {
      const result = await fetchChannelById(video.snippet.channelId)
      setChannel(result)
    }

    loadChannel()
  }, [video])

  useEffect(() => {
    if (!videoId) return

    const loadComments = async () => {
      const result = await fetchComments(videoId)
      setComments(result)
    }

    loadComments()
  }, [videoId])

  return (
    <div className='w-full lg:w-[70%] flex flex-col'>
      <iframe
        className='w-full aspect-video rounded-xl'
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      ></iframe>

      <h3 className='text-xl font-bold mt-4 mb-2 text-neutral-900 leading-tight'>
        {video ? video.snippet.title : 'Loading title...'}
      </h3>

      <div className='flex flex-col md:flex-row justify-between items-start md:items-center text-sm mb-4 gap-4'>
        <div className='flex items-center gap-3'>
          <img className='w-10 h-10 rounded-full object-cover shrink-0' src={channel ? channel.snippet.thumbnails.default.url : ''} alt="" />
          <div className='flex flex-col'>
            <h4 className='font-bold text-neutral-900 text-base leading-tight'>{video ? video.snippet.channelTitle : 'Channel name'}</h4>
            <p className='text-xs text-neutral-600'>{channel ? formatCount(channel.statistics.subscriberCount) : '...'} subscribers</p>
          </div>
          <button className='bg-black text-white hover:bg-neutral-800 font-semibold px-4 py-2.5 rounded-full ml-3 transition border-none text-sm'>
            Subscribe
          </button>
        </div>

        <div className='flex items-center gap-2'>
          <div className='flex items-center bg-neutral-100 rounded-full overflow-hidden'>
            <button className='flex items-center gap-2 hover:bg-neutral-200 px-4 py-2 border-r border-neutral-300 font-medium text-neutral-900'>
              <img src={like} className='w-5' alt="" />
              {video ? formatCount(video.statistics?.likeCount ?? 0) : '...'}
            </button>
            <button className='flex items-center hover:bg-neutral-200 px-4 py-2'>
              <img src={dislike} className='w-5' alt="" />
            </button>
          </div>

          <button className='flex items-center gap-2 bg-neutral-100 hover:bg-neutral-200 px-4 py-2 rounded-full font-medium text-neutral-900'>
            <img src={share} className='w-5' alt="" />
            Share
          </button>
          <button className='flex items-center gap-2 bg-neutral-100 hover:bg-neutral-200 px-4 py-2 rounded-full font-medium text-neutral-900'>
            <img src={save} className='w-5' alt="" />
            Save
          </button>
        </div>
      </div>

      <div className='bg-neutral-100 hover:bg-neutral-200 cursor-pointer rounded-xl p-3 text-sm mt-2 flex flex-col transition'>
        <p className='font-semibold mb-1 text-neutral-900'>{video ? formatCount(video.statistics?.viewCount ?? 0) : '...'} views &bull; {video ? moment(video.snippet.publishedAt).fromNow() : ''}</p>
        <p className='whitespace-pre-line text-neutral-800'>{video ? video.snippet.description.slice(0, 250) : 'Loading description...'}</p>
        <span className='font-bold mt-2 text-neutral-900'>...more</span>
      </div>

      <div className='mt-6'>
        <h4 className='text-xl font-bold mb-4'>{video ? formatCount(video.statistics?.commentCount ?? 0) : '...'} Comments</h4>
        <div className='flex flex-col gap-6'>
          {comments.map((item, index) => (
            <div key={index} className='flex gap-4'>
              <img className='w-10 h-10 rounded-full object-cover shrink-0' src={item.snippet.topLevelComment.snippet.authorProfileImageUrl} alt="" />
              <div className='flex flex-col gap-1'>
                <div className='flex items-center gap-2 text-sm'>
                  <h3 className='font-bold text-neutral-900'>{item.snippet.topLevelComment.snippet.authorDisplayName}</h3>
                  <span className='text-xs text-neutral-600'>{moment(item.snippet.topLevelComment.snippet.publishedAt).fromNow()}</span>
                </div>
                <p className='text-sm text-neutral-900 whitespace-pre-line leading-relaxed'>
                  {item.snippet.topLevelComment.snippet.textDisplay}
                </p>
                <div className='flex items-center gap-4 mt-1 text-neutral-600 text-sm'>
                  <div className='flex items-center gap-1 cursor-pointer hover:bg-neutral-100 p-1.5 rounded-full -ml-1.5 transition'>
                    <img src={like} className='w-4' alt="" />
                    <span>{item.snippet.topLevelComment.snippet.likeCount ? formatCount(item.snippet.topLevelComment.snippet.likeCount) : ''}</span>
                  </div>
                  <div className='cursor-pointer hover:bg-neutral-100 p-1.5 rounded-full transition'>
                    <img src={dislike} className='w-4' alt="" />
                  </div>
                  <span className='font-semibold text-xs cursor-pointer hover:bg-neutral-100 px-3 py-1.5 rounded-full transition'>Reply</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default PlayVideo
