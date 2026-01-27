import { motion } from 'framer-motion'

function Latest() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="pt-32 pb-32 min-h-screen"
    >
      {/* Header */}
      <div className="max-w-[1400px] mx-auto px-8 mb-16">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="section-label block mb-2"
        >
          What's New
        </motion.span>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="font-display text-sk-font-grey leading-tight"
          style={{ fontSize: 'clamp(3rem, 8vw, 6rem)' }}
        >
          Latest
        </motion.h1>
      </div>

      {/* Content */}
      <div className="max-w-[1400px] mx-auto px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-sk-white rounded-2xl p-8 md:p-16 text-center"
        >
          <p className="font-body text-sk-grey text-lg mb-8">
            Latest updates, announcements, and news coming soon.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="https://instagram.com/iamspencerkenyon"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 border border-sk-border-grey rounded-full font-accent text-xs uppercase tracking-widest text-sk-font-grey hover:bg-sk-green hover:border-sk-green hover:text-sk-white transition-all duration-200"
            >
              Follow on Instagram
            </a>
            <a
              href="https://youtube.com/iamspencerkenyon"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 border border-sk-border-grey rounded-full font-accent text-xs uppercase tracking-widest text-sk-font-grey hover:bg-sk-green hover:border-sk-green hover:text-sk-white transition-all duration-200"
            >
              Subscribe on YouTube
            </a>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default Latest