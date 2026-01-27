import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const bentoItems = [
  {
    id: 1,
    title: 'Community Fitness App Launch',
    excerpt: 'Building the future of social fitness technology.',
    tag: 'Sequorr',
    link: 'https://sequorr.com',
    image: '/assets/images/placeholder-1.jpg',
    size: 'large',
  },
  {
    id: 2,
    title: 'Latest Update',
    excerpt: 'Project milestone announcement.',
    tag: 'LinkedIn',
    link: 'https://linkedin.com/company/sequorr',
    image: '/assets/images/placeholder-2.jpg',
  },
  {
    id: 3,
    title: 'Behind the Scenes',
    excerpt: 'Building in public.',
    tag: 'Instagram',
    link: 'https://instagram.com/sequorr.app',
    image: '/assets/images/placeholder-3.jpg',
  },
  {
    id: 4,
    title: 'Findrr',
    excerpt: 'Race finder application.',
    tag: 'Project',
    link: '#',
    image: '/assets/images/placeholder-4.jpg',
  },
  {
    id: 5,
    title: 'Tech Stack',
    excerpt: 'Open source contributions.',
    tag: 'Development',
    link: '#',
    image: '/assets/images/placeholder-5.jpg',
  },
  {
    id: 6,
    title: 'Growing Together',
    excerpt: '100 million people mission.',
    tag: 'Community',
    link: '#',
    image: '/assets/images/placeholder-6.jpg',
  },
]

function BentoCard({ item, index }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })

  const isLarge = item.size === 'large'

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.6,
        delay: index * 0.05,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={`bento-card bg-sk-background ${
        isLarge 
          ? 'col-span-1 md:col-span-2 md:row-span-2 aspect-video md:aspect-auto' 
          : 'aspect-[4/3]'
      }`}
    >
      <a
        href={item.link}
        target="_blank"
        rel="noopener noreferrer"
        className="block w-full h-full relative group"
      >
        {/* Image */}
        <div className="absolute inset-0">
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-full object-cover transition-transform duration-700 ease-smooth group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bento-overlay" />
        </div>

        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 text-sk-white z-10">
          <span className="font-accent text-[0.65rem] uppercase tracking-[0.15em] opacity-80 mb-2 block">
            {item.tag}
          </span>
          <h3
            className={`font-display leading-tight mb-2 ${
              isLarge ? 'text-2xl md:text-4xl' : 'text-xl md:text-2xl'
            }`}
          >
            {item.title}
          </h3>
          <p className="font-body text-sm opacity-80 line-clamp-2">
            {item.excerpt}
          </p>
        </div>
      </a>
    </motion.article>
  )
}

function BentoGrid() {
  const scrollRef = useRef(null)

  const scrollCarousel = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 400
      scrollRef.current.scrollBy({
        left: direction === 'next' ? scrollAmount : -scrollAmount,
        behavior: 'smooth',
      })
    }
  }

  return (
    <section className="py-32 bg-sk-white">
      {/* Header */}
      <div className="max-w-[1400px] mx-auto px-8 mb-16">
        <span className="section-label block mb-2">Updates</span>
        <h2 className="section-title">News & Projects</h2>
      </div>

      {/* Grid */}
      <div className="max-w-[1400px] mx-auto px-8">
        <div
          ref={scrollRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8"
        >
          {bentoItems.map((item, index) => (
            <BentoCard key={item.id} item={item} index={index} />
          ))}
        </div>

        {/* Navigation */}
        <div className="flex justify-center gap-4 mt-8">
          <button
            onClick={() => scrollCarousel('prev')}
            className="w-12 h-12 rounded-full border border-sk-border-grey flex items-center justify-center text-sk-font-grey hover:bg-sk-green hover:border-sk-green hover:text-sk-white transition-all duration-200"
            aria-label="Previous"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
          <button
            onClick={() => scrollCarousel('next')}
            className="w-12 h-12 rounded-full border border-sk-border-grey flex items-center justify-center text-sk-font-grey hover:bg-sk-green hover:border-sk-green hover:text-sk-white transition-all duration-200"
            aria-label="Next"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  )
}

export default BentoGrid