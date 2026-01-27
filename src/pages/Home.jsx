import { motion } from 'framer-motion'
import Hero from '../components/Hero'
import ScrollText from '../components/Scrolltext.jsx'
import VideoCarousel from '../components/VideoCarousel.jsx'
import BentoGrid from '../components/BentoGrid.jsx'
import MediaGrid from '../components/MediaGrid.jsx'
import BlogSection from '../components/BlogSection.jsx'
// import ThreeBackground from '../three/ThreeBackground'

function Home() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Optional: Three.js background - uncomment to enable */}
      {/* <ThreeBackground variant="particles" /> */}
      
      <Hero />
      <ScrollText />
      <VideoCarousel />
      <BentoGrid />
      <MediaGrid />
      <BlogSection />
    </motion.div>
  )
}

export default Home