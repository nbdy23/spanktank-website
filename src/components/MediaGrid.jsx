
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const mediaItems = [
  {
    id: 1,
    title: 'Video Title Placeholder',
    platform: 'YouTube',
    duration: '12:34',
    link: 'https://youtube.com/iamspencerkenyon',
    thumbnail: '/assets/images/media-placeholder-1.jpg',
  },
  {
    id: 2,
    title: 'Reel Title Placeholder',
    platform: 'Instagram',
    duration: '0:45',
    link: 'https://instagram.com/iamspencerkenyon',
    thumbnail: '/assets/images/media-placeholder-2.jpg',
  },
  {
    id: 3,
    title: 'Video Title Placeholder',
    platform: 'YouTube',
    duration: '8:22',
    link: 'https://youtube.com/iamspencerkenyon',
    thumbnail: '/assets/images/media-placeholder-3.jpg',
  },
  {
    id: 4,
    title: 'Reel Title Placeholder',
    platform: 'Instagram',
    duration: '1:15',
    link: 'https://instagram.com/iamspencerkenyon',
    thumbnail: '/assets/images/media-placeholder-4.jpg',
  },
  {
    id: 5,
    title: 'Video Title Placeholder',
    platform: 'YouTube',
    duration: '15:08',
    link: 'https://youtube.com/iamspencerkenyon',
    thumbnail: '/assets/images/media-placeholder-5.jpg',
  },
  {
    id: 6,
    title: 'Reel Title Placeholder',
    platform: 'Instagram',
    duration: '0:58',
    link: 'https://instagram.com/iamspencerkenyon',
    thumbnail: '/assets/images/media-placeholder-6.jpg',
  },
]

function MediaCard({ item, index }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })

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
      className="rounded-2xl overflow-hidden bg-sk-white hover:-translate-y-1 hover:shadow-2xl transition-all duration-300"
    >
      <a
        href={item.link}
        target="_blank"
        rel="noopener noreferrer"
        className="block group"
      >
        {/* Thumbnail */}
        <div className="relative aspect-video overflow-hidden">
          <img
            src={item.thumbnail}
            alt={item.title}
            className="w-full h-full object-cover transition-transform duration-700 ease-smooth group-hover:scale-105"
            loading="lazy"
          />
          
          {/* Play icon */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-white/95 flex items-center justify-center text-sk-green group-hover:scale-110 transition-transform duration-200">
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 ml-1">
              <polygon points="5 3 19 12 5 21 5 3" />
            </svg>
          </div>

          {/* Duration */}
          <div className="absolute bottom-2 right-2 px-2 py-1 bg-black/80 rounded font-accent text-[0.65rem] text-sk-white">
            {item.duration}
          </div>
        </div>

        {/* Info */}
        <div className="p-4">
          <span className="font-accent text-[0.65rem] uppercase tracking-widest text-sk-light-grey mb-2 block">
            {item.platform}
          </span>
          <h3 className="font-body text-base font-medium text-sk-font-grey leading-tight">
            {item.title}
          </h3>
        </div>
      </a>
    </motion.article>
  )
}

function MediaGrid() {
  return (
    <section className="py-32 bg-sk-background">
      {/* Header */}
      <div className="max-w-[1400px] mx-auto px-8 mb-16">
        <span className="section-label block mb-2">Watch</span>
        <h2 className="section-title">Media</h2>
      </div>

      {/* Grid */}
      <div className="max-w-[1400px] mx-auto px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
          {mediaItems.map((item, index) => (
            <MediaCard key={item.id} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default MediaGrid