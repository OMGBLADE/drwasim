'use client'

import { useEffect, useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Navigation from '@/components/Navigation'
import ThreeBackground from '@/components/ThreeBackground'
import VideoSidebar from '@/components/VideoSidebar'
import TestimonialSection from '@/components/TestimonialSection'
import InteractiveFeatures from '@/components/InteractiveFeatures'
import MediaGallery from '@/components/MediaGallery'
import Image from 'next/image'

gsap.registerPlugin(ScrollTrigger)

export default function Home() {
  // Typewriter effect: strictly alternate typing and deleting
  const professions = useMemo(() => [' Doctor', '  ML Engineer', ' Researcher', '  Teacher'], [])
  const [currentProfession, setCurrentProfession] = useState(0)
  const [displayed, setDisplayed] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  const [charIndex, setCharIndex] = useState(0)
  const [blink, setBlink] = useState(true)
  const [isIdle, setIsIdle] = useState(false)

  useEffect(() => {
    let timeout: NodeJS.Timeout
    let blinkTimeout: NodeJS.Timeout
    const fullText = professions[currentProfession]
    if (!isDeleting) {
      // Typing
      if (charIndex < fullText.length) {
        const randomDelay = 30 + Math.random() * 40 // 30-70ms
        timeout = setTimeout(() => {
          setDisplayed(fullText.slice(0, charIndex + 1))
          setCharIndex(charIndex + 1)
        }, randomDelay)
        setIsIdle(false)
      } else {
        // Pause before deleting
        setIsIdle(true)
        timeout = setTimeout(() => {
          setIsDeleting(true)
          setIsIdle(false)
        }, 600)
      }
    } else {
      // Deleting
      if (charIndex > 0) {
        timeout = setTimeout(() => {
          setDisplayed(fullText.slice(0, charIndex - 1))
          setCharIndex(charIndex - 1)
        }, 40)
        setIsIdle(false)
      } else {
        // Move to next profession and start typing
        setIsDeleting(false)
        setCurrentProfession((prev) => (prev + 1) % professions.length)
      }
    }
    if (isIdle) {
      blinkTimeout = setTimeout(() => setBlink((b) => !b), 500)
    } else {
      setBlink(true)
    }
    return () => {
      clearTimeout(timeout)
      clearTimeout(blinkTimeout)
    }
  }, [charIndex, isDeleting, currentProfession, professions, isIdle])

  useEffect(() => {
    // When currentProfession changes, reset charIndex and displayed
    setCharIndex(0)
    setDisplayed('')
  }, [currentProfession])

  useEffect(() => {
    // GSAP Animations
    // Parallax effect for cards
    gsap.utils.toArray('.card').forEach((card: any) => {
      gsap.to(card, {
        y: -50,
        scrollTrigger: {
          trigger: card,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1
        }
      })
    })
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  }

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: 'easeOut'
      }
    }
  }

  return (
    <main className="min-h-screen">
      <ThreeBackground />
      <Navigation />
      <VideoSidebar />

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center relative px-6 pt-20">
        <div className="floating-card flex items-center justify-center text-6xl animate-float-gentle">
          <span role="img" aria-label="cube">🧊</span>
        </div>
        <div className="floating-card flex items-center justify-center text-6xl animate-float-gentle">
          <span role="img" aria-label="atom">⚛️</span>
        </div>
        <div className="floating-card flex items-center justify-center text-6xl animate-float-gentle">
          <span role="img" aria-label="rocket">🚀</span>
        </div>
        
        <motion.div
          className="max-w-7xl w-full text-center z-20"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1
            className="hero-title text-6xl md:text-8xl font-black mb-6 gradient-text"
            variants={itemVariants}
          >
            Dr. Waseem Ahmad Khan
          </motion.h1>
          <motion.p
            className="hero-subtitle text-xl md:text-2xl text-muted mb-12 max-w-2xl mx-auto flex items-center justify-center min-h-[2.5em]"
            variants={itemVariants}
          >
            I am a
            <span style={{ display: 'inline-block', minWidth: 120 }}>
              {' '}
              {displayed.split('').map((char, i) => (
                <motion.span
                  key={char + i + displayed.length + isDeleting}
                  initial={{ opacity: 0, scale: 0.7 }}
                  animate={{ opacity: 1, scale: [1.2, 0.95, 1] }}
                  transition={{ duration: 0.22, delay: i * 0.03 }}
                  className="font-bold gradient-text inline-block"
                >
                  {char}
                </motion.span>
              ))}
              <span className="ml-1" style={{ opacity: blink ? 1 : 0 }}>|</span>
            </span>
          </motion.p>
          <motion.a
            href="#contact"
            className="hero-cta animated-btn inline-block px-8 py-4 rounded-2xl font-semibold text-lg"
            variants={itemVariants}
            whileHover={{ scale: 1.08, boxShadow: '0 0 24px 4px rgba(79,195,247,0.4)' }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 300, damping: 18 }}
          >
            Get In Touch
          </motion.a>
        </motion.div>
      </section>

      {/* About Section */}
      <section id="about" className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            className="section-title text-4xl md:text-6xl font-bold text-center mb-20 gradient-text"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            About Me
          </motion.h2>
          
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              className="relative"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="w-80 h-80 mx-auto relative">
                <Image
                  src="https://images.unsplash.com/photo-1511367461989-f85a21fda167?auto=format&fit=facearea&w=400&h=400"
                  alt="Dr. Waseem Ahmad Khan"
                  className="w-full h-full object-cover rounded-full border-4 border-accent"
                  width={320}
                  height={320}
                  priority
                />
                <div className="absolute inset-0 rounded-full border-2 border-accent animate-spin" style={{ animationDuration: '20s' }}></div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h3 className="text-3xl md:text-4xl font-bold mb-6 gradient-text">Passionate About Innovation</h3>
              <p className="text-lg text-muted mb-6 leading-relaxed">
                I&apos;m a dedicated medical professional and machine learning engineer with a passion for bridging the gap between healthcare and technology. With expertise in both clinical practice and cutting-edge AI development, I strive to create solutions that improve patient outcomes and advance medical research.
              </p>
              <p className="text-lg text-muted leading-relaxed">
                My work spans from developing diagnostic AI systems to teaching the next generation of healthcare professionals. I believe in the power of interdisciplinary collaboration to solve complex healthcare challenges.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            className="section-title text-4xl md:text-6xl font-bold text-center mb-20 gradient-text"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Expertise
          </motion.h2>
          
          <motion.div
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[
              { icon: '🏥', name: 'Clinical Medicine' },
              { icon: '🤖', name: 'Machine Learning' },
              { icon: '📊', name: 'Data Science' },
              { icon: '🔬', name: 'Research' },
              { icon: '👨‍🏫', name: 'Teaching' },
              { icon: '💻', name: 'Programming' }
            ].map((skill, index) => (
              <motion.div
                key={skill.name}
                className="skill-item glass p-6 text-center card-hover"
                variants={itemVariants}
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <div className="text-4xl mb-4">{skill.icon}</div>
                <div className="font-semibold text-sm">{skill.name}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            className="section-title text-4xl md:text-6xl font-bold text-center mb-20 gradient-text"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Featured Projects
          </motion.h2>
          
          <motion.div
            className="grid md:grid-cols-3 gap-8" style={{ perspective: 1200 }}
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[
              {
                icon: '🏥',
                title: 'AI Diagnostic System',
                description: 'Developed an advanced AI system for early disease detection using deep learning and medical imaging.'
              },
              {
                icon: '📚',
                title: 'Medical Education Platform',
                description: 'Created an interactive learning platform for medical students with AI-powered personalized content.'
              },
              {
                icon: '🔬',
                title: 'Research Publications',
                description: 'Published multiple research papers on AI applications in healthcare and medical technology.'
              }
            ].map((project, index) => (
              <motion.div
                key={project.title}
                className="card glass p-8 card-hover relative overflow-hidden shadow-[0_8px_32px_0_rgba(79,195,247,0)]"
                variants={itemVariants}
                whileHover={
                  index === 1
                    ? { scale: 1.12, rotateY: 0, zIndex: 2, boxShadow: '0 8px 32px 0 rgba(79,195,247,0.18)' }
                    : index === 0
                    ? { scale: 1.08, rotateY: 18, zIndex: 1, boxShadow: '0 8px 32px 0 rgba(79,195,247,0.18)' }
                    : { scale: 1.08, rotateY: -18, zIndex: 1, boxShadow: '0 8px 32px 0 rgba(79,195,247,0.18)' }
                }
                transition={{ type: 'spring', stiffness: 700, damping: 18, mass: 0.7 }}
                style={{ zIndex: 0, transformStyle: 'preserve-3d' }}
              >
                <div className="text-5xl mb-6 relative z-10">{project.icon}</div>
                <h3 className="text-xl font-bold mb-4 relative z-10">{project.title}</h3>
                <p className="text-muted leading-relaxed relative z-10">{project.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Interactive Features Section */}
      <InteractiveFeatures />

      {/* Testimonials Section */}
      <TestimonialSection />

      {/* Media Gallery Section */}
      <MediaGallery />

      {/* Contact Section */}
      <section id="contact" className="py-32 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.h2
            className="section-title text-4xl md:text-6xl font-bold text-center mb-20 gradient-text"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Get In Touch
          </motion.h2>
          
          <motion.form
            className="contact-form glass p-8 rounded-3xl"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <input
                type="text"
                placeholder="Your Name"
                className="form-input w-full px-4 py-3 glass rounded-xl text-text placeholder-muted"
                required
              />
              <input
                type="email"
                placeholder="Your Email"
                className="form-input w-full px-4 py-3 glass rounded-xl text-text placeholder-muted"
                required
              />
            </div>
            <textarea
              placeholder="Your Message"
              rows={6}
              className="form-textarea w-full px-4 py-3 glass rounded-xl text-text placeholder-muted mb-6"
              required
            ></textarea>
            <motion.button
              type="submit"
              className="submit-btn animated-btn w-full py-4 rounded-xl font-semibold text-lg"
              whileHover={{ scale: 1.05, boxShadow: '0 0 24px 4px rgba(79,195,247,0.4)' }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 300, damping: 18 }}
            >
              Send Message
            </motion.button>
          </motion.form>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer glass border-t border-border py-16 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex justify-center space-x-6 mb-8">
            {['📧', '💼', '📱', '🔗'].map((icon, index) => (
              <motion.a
                key={index}
                href="#"
                className="social-link w-12 h-12 glass rounded-full flex items-center justify-center text-xl"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.9 }}
              >
                {icon}
              </motion.a>
            ))}
          </div>
          <p className="text-muted">© 2025 Dr. Waseem Ahmad Khan. All rights reserved.</p>
        </div>
      </footer>
    </main>
  )
} 