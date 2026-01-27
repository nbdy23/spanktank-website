import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

function ScrollText() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { 
    amount: 0.3,
    once: false 
  })

  const words = ['Founder.', 'Ultramarathoner.', 'Innovator.']

  return (
    <section
      ref={sectionRef}
      className="min-h-screen flex items-center justify-center bg-sk-dark relative overflow-hidden"
    >
      <div className="max-w-[1400px] px-8 w-full">
        <div className="overflow-hidden">
          <h2 className="flex flex-col gap-2 md:gap-4 text-center">
            {words.map((word, index) => (
              <motion.span
                key={word}
                initial={{ opacity: 0, y: 100 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 100 }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.15,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="font-display text-sk-white leading-none"
                style={{ fontSize: 'clamp(3rem, 15vw, 10rem)' }}
              >
                {word}
              </motion.span>
            ))}
          </h2>
        </div>
      </div>
    </section>
  )
}

export default ScrollText