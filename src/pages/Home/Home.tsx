import Feed from '../../Components/Feed/Feed'
import { CategoryPills } from '../../Components/CategoryPills'
import { topicPills } from '../../Components/data/home'

type HomeProps = {
  sidebarCategoryId: number
  headerSearchQuery: string
  selectedTopicPill: string
  onTopicPillSelect: (pill: string) => void
}

const Home = ({
  sidebarCategoryId,
  headerSearchQuery,
  selectedTopicPill,
  onTopicPillSelect,
}: HomeProps) => {
  const displayedTopicPill = headerSearchQuery.trim() !== '' ? topicPills[0] : selectedTopicPill

  // Header search overrides topic pills; "All" falls back to popular feed.
  const feedSearchQuery =
    headerSearchQuery.trim() !== ''
      ? headerSearchQuery.trim()
      : selectedTopicPill !== 'All'
        ? selectedTopicPill
        : null

  return (
    <div className="flex flex-col gap-6 pt-4">
      <div className="sticky top-0 bg-white z-10 pb-4">
        <CategoryPills
          categories={topicPills}
          selectedCategory={displayedTopicPill}
          onSelect={onTopicPillSelect}
        />
      </div>
      <div>
        <Feed sidebarCategoryId={sidebarCategoryId} feedSearchQuery={feedSearchQuery} />
      </div>
    </div>
  )
}

export default Home
