import PlayVideo from '../../Components/PlayVideo/PlayVideo'
import Recommended from '../../Components/Recommended/Recommended'
import { useParams } from 'react-router-dom'

const Video = () => {
  const { categoryId, videoId } = useParams<{ categoryId: string; videoId: string }>()
  return (
    <div className='flex flex-col lg:flex-row gap-6 p-4 max-w-[1600px] mx-auto'>
      <PlayVideo />
      <Recommended categoryId={categoryId} videoId={videoId} />
    </div>
  )
}

export default Video
