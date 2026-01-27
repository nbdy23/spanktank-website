import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'

function VideoCarousel() {
  const sectionRef = useRef(null)
  const videoRef = useRef(null)
  const [isMuted, setIsMuted] = useState(true)
  const [isPlaying, setIsPlaying] = useState(false)
  
  const isInView = useInView(sectionRef, { amount: 0.3 })

  // Handle scroll-triggered play/pause
  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    if (isInView && !isPlaying) {
      video.play().then(() => setIsPlaying(true)).catch(() => {})
    } else if (!isInView && isPlaying) {
      video.pause()
      setIsPlaying(false)
    }
  }, [isInView, isPlaying])

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  return (
    <section ref={sectionRef} className="py-32 bg-sk-background">
      {/* Header */}
      <div className="max-w-[1400px] mx-auto px-8 mb-16">
        <span className="section-label block mb-2">Featured</span>
        <h2 className="section-title">In Motion</h2>
      </div>

      {/* Video */}
      <div className="max-w-[1400px] mx-auto px-8">
        <div className="relative rounded-2xl overflow-hidden bg-sk-black">
          <div className="relative aspect-video">
            <video
              ref={videoRef}
              className="w-full h-full object-cover"
              loop
              playsInline
              muted={isMuted}
            >
              {/* Add your video sources here */}
              <source src="/assets/videos/featured.mp4" type="video/mp4" />
              <source src="/assets/videos/featured.mov" type="video/quicktime" />
              Your browser does not support the video tag.
            </video>

            {/* Controls */}
            <div className="absolute bottom-8 right-8 z-10">
              <button
                onClick={toggleMute}
                className="w-12 h-12 rounded-full bg-black/60 backdrop-blur-sm flex items-center justify-center text-sk-white hover:bg-black/80 hover:scale-105 transition-all duration-200"
                aria-label={isMuted ? 'Unmute video' : 'Mute video'}
              >
                {isMuted ? (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
                    <path d="M11 5L6 9H2v6h4l5 4V5z" />
                    <line x1="23" y1="9" x2="17" y2="15" />
                    <line x1="17" y1="9" x2="23" y2="15" />
                  </svg>
                ) : (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
                    <path d="M11 5L6 9H2v6h4l5 4V5z" />
                    <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
                  </svg>
                )}
              </button>
            </div>

            {/* Gradient overlay */}
            <div className="absolute inset-0 video-gradient pointer-events-none" />
          </div>
        </div>

        {/* Scroll hint */}
        <p className="text-center mt-8 font-accent text-[0.7rem] uppercase tracking-[0.2em] text-sk-light-grey opacity-70">
          Scroll to pause
        </p>
      </div>
    </section>
  )
}

export default VideoCarousel