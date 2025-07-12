'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Feature {
  id: string
  title: string
  description: string
  icon: string
  color: string
  stats: string[]
}

const features: Feature[] = [
  {
    id: '1',
    title: 'AI Diagnostic Systems',
    description: 'Advanced machine learning algorithms for early disease detection and diagnosis.',
    icon: '🤖',
    color: 'from-blue-500 to-cyan-500',
    stats: ['95% Accuracy', 'Real-time Analysis', 'Multi-modal Data']
  },
  {
    id: '2',
    title: 'Medical Education',
    description: 'Interactive learning platforms powered by AI for personalized medical training.',
    icon: '📚',
    color: 'from-purple-500 to-pink-500',
    stats: ['Personalized Learning', 'Virtual Simulations', 'Progress Tracking']
  },
  {
    id: '3',
    title: 'Research & Publications',
    description: 'Cutting-edge research in healthcare AI and clinical applications.',
    icon: '🔬',
    color: 'from-green-500 to-emerald-500',
    stats: ['Peer-reviewed Papers', 'Conference Presentations', 'Patent Applications']
  }
]

export default function InteractiveFeatures() {
  const [activeFeature, setActiveFeature] = useState(0)
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isHovered) {
        setActiveFeature((prev) => (prev + 1) % features.length)
      }
    }, 4000)
    return () => clearInterval(interval)
  }, [isHovered])

  // Animation variants for feature card
  const featureVariants = {
    initial: { opacity: 0, scale: 0.92, y: 30 },
    animate: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.5, type: 'spring', stiffness: 120 } },
    exit: { opacity: 0, scale: 1.08, y: -30, transition: { duration: 0.4 } }
  }

  return (
    <section id="features" className="py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          className="section-title text-4xl md:text-6xl font-bold text-center mb-20 gradient-text"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          Interactive Features
        </motion.h2>

        <div className="flex flex-col lg:flex-row gap-16 items-center justify-center">
          {/* Feature Showcase */}
          <div className="flex-1 flex flex-col items-center justify-center min-w-[340px]">
            <div className="relative w-full flex flex-col items-center justify-center min-h-[380px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeFeature}
                  className="w-full"
                  variants={featureVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                >
                  <div className="feature-card glass p-10 h-full flex flex-col justify-center items-center border border-accent/40 shadow-xl" style={{ minHeight: 320 }}>
                    <div className={`text-8xl mb-6 bg-gradient-to-r ${features[activeFeature].color} bg-clip-text text-transparent drop-shadow-[0_2px_16px_rgba(79,195,247,0.25)]`}>
                      {features[activeFeature].icon}
                    </div>
                    <h3 className="text-3xl font-bold mb-2 gradient-text text-center">
                      {features[activeFeature].title}
                    </h3>
                    <p className="text-lg text-muted leading-relaxed text-center mb-6">
                      {features[activeFeature].description}
                    </p>
                    <div className="grid grid-cols-1 gap-2 w-full max-w-xs mx-auto">
                      {features[activeFeature].stats.map((stat, index) => (
                        <motion.div
                          key={stat}
                          className="flex items-center space-x-3"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
                          <span className="text-muted text-sm">{stat}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
            {/* Navigation Dots - Redesigned */}
            <div className="flex justify-center mt-8 space-x-4">
              {features.map((_, index) => (
                <motion.button
                  key={index}
                  onClick={() => setActiveFeature(index)}
                  className={`w-5 h-5 rounded-full border-2 transition-all duration-300 flex items-center justify-center shadow-md ${
                    index === activeFeature
                      ? 'bg-accent border-accent shadow-accent animate-glow'
                      : 'bg-glass border-muted hover:border-accent'
                  }`}
                  whileHover={{ scale: 1.25 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className={`block w-2.5 h-2.5 rounded-full ${index === activeFeature ? 'bg-white/90' : 'bg-accent/30'}`}></span>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Interactive Stats */}
          <div className="flex-1 w-full space-y-8 flex flex-col justify-center">
            <motion.div
              className="stats-grid grid grid-cols-2 gap-6"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              {[
                { number: '15+', label: 'Years Experience', icon: '⏰' },
                { number: '200+', label: 'AI Models Built', icon: '🧠' },
                { number: '50+', label: 'Research Papers', icon: '📄' },
                { number: '1000+', label: 'Students Mentored', icon: '👥' }
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className="stat-card glass p-6 text-center border border-accent/20"
                  whileHover={{ 
                    scale: 1.05, 
                    y: -5,
                    boxShadow: '0 8px 32px 0 rgba(79,195,247,0.15)' 
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="text-3xl mb-2">{stat.icon}</div>
                  <div className="text-2xl font-bold gradient-text mb-1">
                    {stat.number}
                  </div>
                  <div className="text-sm text-muted">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>

            {/* Progress Bars */}
            <motion.div
              className="skills-progress space-y-6"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold gradient-text mb-6">Expertise Levels</h3>
              {[
                { skill: 'Machine Learning', level: 95 },
                { skill: 'Clinical Medicine', level: 90 },
                { skill: 'Data Science', level: 88 },
                { skill: 'Research Methods', level: 92 }
              ].map((skill, index) => (
                <motion.div
                  key={skill.skill}
                  className="skill-progress"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">{skill.skill}</span>
                    <span className="text-accent font-bold">{skill.level}%</span>
                  </div>
                  <div className="w-full bg-muted/20 rounded-full h-2 overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-accent to-primary rounded-full"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      transition={{ duration: 1, delay: index * 0.1 }}
                      viewport={{ once: true }}
                    />
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Call to Action */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <motion.a
            href="#contact"
            className="animated-btn inline-block px-8 py-4 rounded-2xl font-semibold text-lg"
            whileHover={{ scale: 1.08, boxShadow: '0 0 24px 4px rgba(79,195,247,0.4)' }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 300, damping: 18 }}
          >
            Explore My Work
          </motion.a>
        </motion.div>
      </div>
      <style jsx global>{`
        @keyframes glow {
          0% { box-shadow: 0 0 0 0 rgba(79,195,247,0.4); }
          50% { box-shadow: 0 0 16px 4px rgba(79,195,247,0.7); }
          100% { box-shadow: 0 0 0 0 rgba(79,195,247,0.4); }
        }
        .animate-glow {
          animation: glow 1.5s infinite;
        }
      `}</style>
    </section>
  )
} 