'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { gsap } from 'gsap'

interface Testimonial {
  id: string
  name: string
  role: string
  organization: string
  content: string
  rating: number
  avatar: string
  category: string
}

const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Dr. Sarah Chen',
    role: 'Chief Medical Officer',
    organization: 'Stanford Health',
    content: 'Dr. Khan\'s expertise in AI-driven diagnostics has revolutionized our approach to early disease detection. His innovative solutions have improved patient outcomes significantly.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=100&h=100&fit=crop&crop=face',
    category: 'Healthcare'
  },
  {
    id: '2',
    name: 'Prof. Michael Rodriguez',
    role: 'Head of Research',
    organization: 'MIT Medical AI Lab',
    content: 'Working with Dr. Khan on our machine learning projects has been transformative. His deep understanding of both clinical practice and AI technology is invaluable.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
    category: 'Research'
  },
  {
    id: '3',
    name: 'Dr. Emily Watson',
    role: 'Medical Director',
    organization: 'Johns Hopkins Medicine',
    content: 'The educational platform Dr. Khan developed has enhanced our medical training program tremendously. Students are more engaged and learning outcomes have improved dramatically.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
    category: 'Education'
  },
  {
    id: '4',
    name: 'Alex Thompson',
    role: 'Data Science Lead',
    organization: 'Google Health',
    content: 'Dr. Khan\'s research on clinical decision support systems has been groundbreaking. His work continues to influence how we approach healthcare technology.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
    category: 'Technology'
  },
  {
    id: '5',
    name: 'Dr. Lisa Park',
    role: 'Research Fellow',
    organization: 'Harvard Medical School',
    content: 'As a mentor, Dr. Khan has been exceptional. His guidance in both clinical research and AI applications has shaped my career path significantly.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
    category: 'Education'
  }
]

export default function TestimonialSection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setDirection(1)
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isAutoPlaying])

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  }

  const swipeConfidenceThreshold = 10000
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity
  }

  const paginate = (newDirection: number) => {
    setDirection(newDirection)
    setCurrentIndex((prev) => (prev + newDirection + testimonials.length) % testimonials.length)
  }

  const handleDotClick = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1)
    setCurrentIndex(index)
  }

  return (
    <section id="testimonials" className="py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          className="section-title text-4xl md:text-6xl font-bold text-center mb-20 gradient-text"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          What People Say
        </motion.h2>

        <div className="relative">
          {/* Testimonial Carousel */}
          <div className="relative h-96 md:h-80 overflow-hidden">
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: 'spring', stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 }
                }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={1}
                onDragEnd={(e, { offset, velocity }) => {
                  const swipe = swipePower(offset.x, velocity.x)

                  if (swipe < -swipeConfidenceThreshold) {
                    paginate(1)
                  } else if (swipe > swipeConfidenceThreshold) {
                    paginate(-1)
                  }
                }}
                className="absolute inset-0"
              >
                <div className="testimonial-card glass p-8 md:p-12 h-full flex flex-col justify-center">
                  <div className="flex items-center mb-6">
                    <div className="flex-1">
                      <div className="flex items-center mb-4">
                        <img
                          src={testimonials[currentIndex].avatar}
                          alt={testimonials[currentIndex].name}
                          className="w-16 h-16 rounded-full object-cover mr-4 border-2 border-accent"
                        />
                        <div>
                          <h3 className="text-xl font-bold gradient-text">
                            {testimonials[currentIndex].name}
                          </h3>
                          <p className="text-muted text-sm">
                            {testimonials[currentIndex].role} at {testimonials[currentIndex].organization}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center mb-4">
                        {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                          <span key={i} className="text-yellow-400 text-xl">⭐</span>
                        ))}
                      </div>
                    </div>
                    <div className="text-6xl opacity-20">"</div>
                  </div>
                  
                  <blockquote className="text-lg md:text-xl text-muted leading-relaxed italic mb-6">
                    "{testimonials[currentIndex].content}"
                  </blockquote>
                  
                  <div className="mt-auto">
                    <span className="inline-block bg-accent/20 text-accent px-3 py-1 rounded-full text-sm font-medium">
                      {testimonials[currentIndex].category}
                    </span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Dots */}
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => handleDotClick(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? 'bg-accent scale-125'
                    : 'bg-muted hover:bg-accent/50'
                }`}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              />
            ))}
          </div>

          {/* Navigation Arrows */}
          <motion.button
            className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 glass rounded-full flex items-center justify-center text-xl"
            onClick={() => paginate(-1)}
            whileHover={{ scale: 1.1, boxShadow: '0 8px 32px 0 rgba(79,195,247,0.3)' }}
            whileTap={{ scale: 0.9 }}
          >
            ‹
          </motion.button>
          
          <motion.button
            className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 glass rounded-full flex items-center justify-center text-xl"
            onClick={() => paginate(1)}
            whileHover={{ scale: 1.1, boxShadow: '0 8px 32px 0 rgba(79,195,247,0.3)' }}
            whileTap={{ scale: 0.9 }}
          >
            ›
          </motion.button>

          {/* Auto-play Toggle */}
          <motion.button
            className="absolute top-4 right-4 w-10 h-10 glass rounded-full flex items-center justify-center text-sm"
            onClick={() => setIsAutoPlaying(!isAutoPlaying)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {isAutoPlaying ? '⏸' : '▶'}
          </motion.button>
        </div>

        {/* Testimonial Stats */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {[
            { number: '50+', label: 'Research Papers' },
            { number: '100+', label: 'Students Taught' },
            { number: '25+', label: 'AI Projects' },
            { number: '95%', label: 'Satisfaction Rate' }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              className="text-center glass p-6 rounded-xl"
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <div className="text-3xl md:text-4xl font-bold gradient-text mb-2">
                {stat.number}
              </div>
              <div className="text-muted text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
} 