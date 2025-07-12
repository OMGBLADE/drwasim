'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

interface GalleryItem {
  id: string
  title: string
  description: string
  image: string
  category: string
  type: 'image' | 'video' | 'document'
  date: string
}

const galleryData: GalleryItem[] = [
  {
    id: '1',
    title: 'AI Diagnostic Interface',
    description: 'User interface for the AI-powered diagnostic system showing real-time analysis.',
    image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600&h=400&fit=crop',
    category: 'Technology',
    type: 'image',
    date: '2024'
  },
  {
    id: '2',
    title: 'Research Presentation',
    description: 'Presenting findings at the International Conference on Medical AI.',
    image: 'https://images.unsplash.com/photo-1576091160399-112c8b48a6a8?w=600&h=400&fit=crop',
    category: 'Research',
    type: 'image',
    date: '2023'
  },
  {
    id: '3',
    title: 'Medical Education Platform',
    description: 'Screenshot of the interactive learning platform for medical students.',
    image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=600&h=400&fit=crop',
    category: 'Education',
    type: 'image',
    date: '2024'
  },
  {
    id: '4',
    title: 'Data Analysis Dashboard',
    description: 'Real-time analytics dashboard for clinical decision support.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop',
    category: 'Technology',
    type: 'image',
    date: '2023'
  },
  {
    id: '5',
    title: 'Research Publication',
    description: 'Cover of the peer-reviewed journal featuring our latest research.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=400&fit=crop',
    category: 'Research',
    type: 'document',
    date: '2024'
  },
  {
    id: '6',
    title: 'Teaching Session',
    description: 'Interactive teaching session with medical students using AI tools.',
    image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=600&h=400&fit=crop',
    category: 'Education',
    type: 'video',
    date: '2023'
  }
]

export default function MediaGallery() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const categories = ['All', 'Technology', 'Research', 'Education']

  const filteredItems = selectedCategory === 'All' 
    ? galleryData 
    : galleryData.filter(item => item.category === selectedCategory)

  const handleItemClick = (item: GalleryItem) => {
    setSelectedItem(item)
    setIsModalOpen(true)
  }

  return (
    <section id="gallery" className="py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          className="section-title text-4xl md:text-6xl font-bold text-center mb-20 gradient-text"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          Media Gallery
        </motion.h2>

        {/* Category Filter */}
        <motion.div
          className="flex justify-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div className="flex gap-4 overflow-x-auto scrollbar-hide">
            {categories.map((category) => (
              <motion.button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-3 rounded-full font-medium whitespace-nowrap transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-accent text-secondary shadow-lg'
                    : 'glass text-muted hover:text-text hover:bg-glass-strong'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {category}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Gallery Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1
              }
            }
          }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {filteredItems.map((item, index) => (
            <motion.div
              key={item.id}
              className="gallery-item glass rounded-xl overflow-hidden cursor-pointer group"
              variants={{
                hidden: { opacity: 0, y: 50 },
                visible: { opacity: 1, y: 0 }
              }}
              whileHover={{ 
                scale: 1.02, 
                y: -5,
                boxShadow: '0 8px 32px 0 rgba(79,195,247,0.15)' 
              }}
              onClick={() => handleItemClick(item)}
            >
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="text-white text-2xl">
                    {item.type === 'video' ? '▶' : item.type === 'document' ? '📄' : '🔍'}
                  </div>
                </div>
                <div className="absolute top-4 right-4 bg-black/70 text-white text-xs px-2 py-1 rounded">
                  {item.date}
                </div>
                <div className="absolute bottom-4 left-4 bg-accent/90 text-white text-xs px-2 py-1 rounded">
                  {item.category}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-bold mb-2 gradient-text">{item.title}</h3>
                <p className="text-muted text-sm leading-relaxed">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Dynamic Content Widgets */}
        <motion.div
          className="mt-16 grid md:grid-cols-3 gap-8"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          {[
            {
              icon: '📊',
              title: 'Latest Publications',
              content: 'Recent research papers and conference presentations',
              count: '12',
              color: 'from-blue-500 to-cyan-500'
            },
            {
              icon: '🎓',
              title: 'Teaching Materials',
              content: 'Educational resources and course materials',
              count: '25',
              color: 'from-purple-500 to-pink-500'
            },
            {
              icon: '🔬',
              title: 'Research Projects',
              content: 'Ongoing and completed research initiatives',
              count: '8',
              color: 'from-green-500 to-emerald-500'
            }
          ].map((widget, index) => (
            <motion.div
              key={widget.title}
              className="content-widget glass p-6 rounded-xl"
              whileHover={{ scale: 1.05, y: -5 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className={`text-4xl mb-4 bg-gradient-to-r ${widget.color} bg-clip-text text-transparent`}>
                {widget.icon}
              </div>
              <h3 className="text-xl font-bold mb-2 gradient-text">{widget.title}</h3>
              <p className="text-muted text-sm mb-4">{widget.content}</p>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-accent">{widget.count}</span>
                <motion.button
                  className="text-accent hover:text-primary transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  View All →
                </motion.button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Modal */}
        <AnimatePresence>
          {isModalOpen && selectedItem && (
            <motion.div
              className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
            >
              <motion.div
                className="glass p-8 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="relative mb-6">
                  <Image
                    src={selectedItem.image}
                    alt={selectedItem.title}
                    width={600}
                    height={400}
                    className="w-full h-64 object-cover rounded-lg"
                  />
                  <div className="absolute top-4 right-4 bg-black/70 text-white text-xs px-2 py-1 rounded">
                    {selectedItem.date}
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-4 gradient-text">{selectedItem.title}</h3>
                <p className="text-muted mb-4">{selectedItem.description}</p>
                <div className="flex items-center justify-between">
                  <span className="bg-accent/20 text-accent px-3 py-1 rounded-full text-sm">
                    {selectedItem.category}
                  </span>
                  <motion.button
                    onClick={() => setIsModalOpen(false)}
                    className="w-8 h-8 glass rounded-full flex items-center justify-center"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    ✕
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
} 