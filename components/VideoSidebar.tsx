'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface VideoItem {
  id: string
  title: string
  description: string
  thumbnail: string
  duration: string
  category: string
  url: string
}

const videoData: VideoItem[] = [
  {
    id: '1',
    title: 'AI in Healthcare: Future Perspectives',
    description: 'Exploring the transformative potential of artificial intelligence in modern healthcare delivery.',
    thumbnail: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=225&fit=crop',
    duration: '12:34',
    category: 'Research',
    url: '#'
  },
  {
    id: '2',
    title: 'Machine Learning for Medical Imaging',
    description: 'Deep dive into convolutional neural networks for diagnostic imaging analysis.',
    thumbnail: 'https://images.unsplash.com/photo-1576091160399-112c8b48a6a8?w=400&h=225&fit=crop',
    duration: '18:45',
    category: 'Education',
    url: '#'
  },
  {
    id: '3',
    title: 'Clinical Decision Support Systems',
    description: 'How AI-powered tools are enhancing clinical decision-making processes.',
    thumbnail: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400&h=225&fit=crop',
    duration: '15:22',
    category: 'Technology',
    url: '#'
  },
  {
    id: '4',
    title: 'Data Science in Medicine',
    description: 'Leveraging big data analytics for improved patient outcomes and research.',
    thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=225&fit=crop',
    duration: '20:18',
    category: 'Research',
    url: '#'
  }
]

export default function VideoSidebar() {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedVideo, setSelectedVideo] = useState<VideoItem | null>(null)
  const [activeCategory, setActiveCategory] = useState('All')

  const categories = ['All', 'Research', 'Education', 'Technology']

  const handleOpen = () => setIsOpen(true)
  const handleClose = () => {
    setIsOpen(false)
    setSelectedVideo(null)
  }
  const handleVideoSelect = (video: VideoItem) => {
    setSelectedVideo(video)
    setIsOpen(false) // Auto-close sidebar when a video is selected
    // Add video player logic here
  }

  const filteredVideos = activeCategory === 'All' 
    ? videoData 
    : videoData.filter(video => video.category === activeCategory)

  return (
    <>
      {/* Toggle Button */}
      <motion.button
        className="fixed right-6 top-1/2 transform -translate-y-1/2 z-50 glass p-4 rounded-full shadow-lg"
        onClick={handleOpen}
        whileHover={{ scale: 1.1, boxShadow: '0 0 24px 4px rgba(79,195,247,0.3)' }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: 'spring', stiffness: 300, damping: 18 }}
        aria-label="Open video sidebar"
      >
        <span className="text-2xl">🎥</span>
      </motion.button>

      {/* Video Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="video-sidebar fixed right-0 top-0 h-full w-96 max-w-full glass border-l border-border z-40 overflow-hidden"
            initial={{ x: '100%' }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '100%', opacity: 0 }}
            transition={{ type: 'spring', stiffness: 400, damping: 32 }}
            style={{ willChange: 'transform, opacity' }}
          >
            <div className="p-6 h-full flex flex-col">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold gradient-text">Video Library</h3>
                <motion.button
                  onClick={handleClose}
                  className="w-8 h-8 glass rounded-full flex items-center justify-center"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label="Close video sidebar"
                >
                  ✕
                </motion.button>
              </div>

              {/* Category Filter */}
              <div className="flex gap-2 mb-6 overflow-x-auto scrollbar-hide">
                {categories.map((category) => (
                  <motion.button
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${
                      activeCategory === category
                        ? 'bg-accent text-secondary'
                        : 'glass text-muted hover:text-text'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {category}
                  </motion.button>
                ))}
              </div>

              {/* Video List */}
              <div className="flex-1 overflow-y-auto scrollbar-hide">
                <div className="space-y-4">
                  {filteredVideos.map((video, index) => (
                    <motion.div
                      key={video.id}
                      className="video-item glass p-4 rounded-xl cursor-pointer"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.07 }}
                      whileHover={{ 
                        scale: 1.02, 
                        boxShadow: '0 8px 32px 0 rgba(79,195,247,0.15)' 
                      }}
                      onClick={() => handleVideoSelect(video)}
                    >
                      <div className="relative mb-3">
                        <img
                          src={video.thumbnail}
                          alt={video.title}
                          className="w-full h-32 object-cover rounded-lg"
                        />
                        <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                          {video.duration}
                        </div>
                        <div className="absolute inset-0 bg-black/20 rounded-lg opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                          <span className="text-white text-2xl">▶</span>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm mb-1 line-clamp-2">{video.title}</h4>
                        <p className="text-xs text-muted line-clamp-2">{video.description}</p>
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-xs bg-accent/20 text-accent px-2 py-1 rounded">
                            {video.category}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Selected Video Player */}
              {selectedVideo && (
                <motion.div
                  className="mt-6 p-4 glass rounded-xl"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <h4 className="font-semibold mb-2">{selectedVideo.title}</h4>
                  <div className="relative">
                    <img
                      src={selectedVideo.thumbnail}
                      alt={selectedVideo.title}
                      className="w-full h-32 object-cover rounded-lg"
                    />
                    <div className="absolute inset-0 bg-black/40 rounded-lg flex items-center justify-center">
                      <span className="text-white text-3xl">▶</span>
                    </div>
                  </div>
                  <p className="text-xs text-muted mt-2">{selectedVideo.description}</p>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
} 