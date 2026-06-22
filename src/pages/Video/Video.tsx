import PlayVideo from '../../Components/PlayVideo/PlayVideo'
import Recommended from '../../Components/Recommended/Recommended'
import { useParams } from 'react-router-dom'

const Video = () => {
  const { categoryId } = useParams<{ categoryId: string; videoId: string }>();
  return (
    <div className='flex flex-col lg:flex-row gap-6 p-4 max-w-[1600px] mx-auto'>
      <PlayVideo />
      <Recommended categoryId={categoryId} />
    </div>
  )
}

export default Video
