
import { motion } from 'framer-motion'

function Hero() {
  return (
    <section className="relative min-h-screen flex items-end overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <div className="w-full h-full relative">
          <picture>
            {/* Desktop */}
            <source
              media="(min-width: 1024px)"
              srcSet="/assets/images/headshot-desktop.jpg"
            />
            {/* Tablet */}
            <source
              media="(min-width: 768px)"
              srcSet="/assets/images/headshot-tablet.jpg"
            />
            {/* Mobile (default) */}
            <img
              src="/assets/images/headshot.jpg"
              alt="Spencer Kenyon"
              className="w-full h-full object-cover object-[center_20%] md:object-[center_30%] lg:object-center"
              loading="eager"
              fetchpriority="high"
            />
          </picture>
          {/* Gradient overlay */}
          <div className="absolute inset-0 hero-gradient" />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 w-full px-8 pb-32 pt-16">
        {/* Top label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="mb-8"
        >
          <span className="font-accent text-xs uppercase tracking-[0.2em] text-sk-white">
            Marine Corps Veteran
          </span>
        </motion.div>

        {/* Title */}
        <h1 className="flex flex-col gap-0">
          <motion.span
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-sk-white leading-none"
            style={{ fontSize: 'clamp(2.5rem, 8vw, 5rem)' }}
          >
            CEO and Founder
          </motion.span>
          <motion.span
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-sk-accent-light leading-none"
            style={{ fontSize: 'clamp(2.5rem, 8vw, 5rem)' }}
          >
            Sequorr
          </motion.span>
        </h1>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
        <div className="w-px h-16 bg-gradient-to-b from-sk-white to-transparent animate-scroll-pulse" />
      </div>
    </section>
  )
}

export default Hero