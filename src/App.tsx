import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Video from './pages/Video/Video'
import Home from './pages/Home/Home'
import { PageHeader } from './Components/Layouts/PageHeader'
import { SideBar } from './Components/Layouts/SideBar'
import { SidebarProvider } from './Components/Sidebar/SidebarContext'
import { topicPills } from './Components/data/home'

const App = () => {
  const [sidebarCategoryId, setSidebarCategoryId] = useState<number>(0)
  const [headerSearchQuery, setHeaderSearchQuery] = useState('')
  const [selectedTopicPill, setSelectedTopicPill] = useState(topicPills[0])

  const handleSidebarCategoryChange = (id: number) => {
    setSidebarCategoryId(id)
    setHeaderSearchQuery('')
    setSelectedTopicPill(topicPills[0])
  }

  const handleTopicPillSelect = (pill: string) => {
    setSelectedTopicPill(pill)
    setHeaderSearchQuery('')
  }

  const homePage = (
    <Home
      sidebarCategoryId={sidebarCategoryId}
      headerSearchQuery={headerSearchQuery}
      selectedTopicPill={selectedTopicPill}
      onTopicPillSelect={handleTopicPillSelect}
    />
  )

  return (
    <div>
      <SidebarProvider>
        <div className='flex flex-col h-screen overflow-hidden'>
          <PageHeader searchQuery={headerSearchQuery} onSearch={setHeaderSearchQuery} />
          <div className='flex grow overflow-hidden'>
            <SideBar
              sidebarCategoryId={sidebarCategoryId}
              onSidebarCategoryChange={handleSidebarCategoryChange}
            />
            <div className='flex-1 overflow-y-auto overflow-x-hidden px-8 pb-4 min-w-0'>
              <Routes>
                <Route path='/' element={homePage} />
                <Route path='/video/:categoryId/:videoId' element={<Video />} />
                <Route path='*' element={homePage} />
              </Routes>
            </div>
          </div>
        </div>
      </SidebarProvider>
    </div>
  )
}

export default App
