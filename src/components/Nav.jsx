import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

function Nav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    // Prevent body scroll when menu is open
    document.body.style.overflow = isMenuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [isMenuOpen])

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)
  const closeMenu = () => setIsMenuOpen(false)

  const menuLinks = [
    { to: '/', label: 'Home', index: '01' },
    { to: '/blog', label: 'Blog', index: '02' },
    { to: '/latest', label: 'Latest', index: '03' },
  ]

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 h-[70px] transition-all duration-300 ${
        isScrolled ? 'nav-scrolled' : 'bg-transparent'
      } ${isMenuOpen ? 'bg-transparent' : ''}`}
    >
      <div className="max-w-[1400px] mx-auto px-8 h-full flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="z-[1001]"
          onClick={closeMenu}
          aria-label="Spencer Kenyon Home"
        >
          <svg viewBox="0 0 200 24" className="h-[18px] w-auto">
            <text
              x="0"
              y="18"
              className={`font-display text-lg tracking-widest transition-colors duration-200 ${
                isMenuOpen ? 'fill-sk-white' : 'fill-sk-font-grey'
              }`}
            >
              SPENCER KENYON
            </text>
          </svg>
        </Link>

        {/* Menu Toggle */}
        <button
          className={`flex items-center gap-4 px-4 py-2 z-[1001] transition-colors duration-200 ${
            isMenuOpen ? 'text-sk-white' : 'text-sk-font-grey'
          }`}
          onClick={toggleMenu}
          aria-label="Toggle menu"
          aria-expanded={isMenuOpen}
        >
          <span className="w-6 h-3.5 relative flex flex-col justify-between">
            <span
              className={`w-full h-0.5 bg-current transition-transform duration-300 origin-center ${
                isMenuOpen ? 'translate-y-[6px] rotate-45' : ''
              }`}
            />
            <span
              className={`w-full h-0.5 bg-current transition-transform duration-300 origin-center ${
                isMenuOpen ? '-translate-y-[6px] -rotate-45' : ''
              }`}
            />
          </span>
          <span className="font-accent text-xs uppercase tracking-widest">
            Menu
          </span>
        </button>
      </div>

      {/* Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 bg-sk-green flex items-center justify-center"
          >
            <div className="text-center">
              <ul className="flex flex-col gap-8">
                {menuLinks.map((link, i) => (
                  <motion.li
                    key={link.to}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 30 }}
                    transition={{
                      duration: 0.4,
                      delay: 0.1 + i * 0.05,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    <Link
                      to={link.to}
                      onClick={closeMenu}
                      className="relative font-display text-sk-white hover:text-sk-white/70 transition-colors duration-200"
                      style={{ fontSize: 'clamp(3rem, 10vw, 6rem)' }}
                    >
                      <span className="absolute -left-16 top-1/2 -translate-y-1/2 font-accent text-xs opacity-50 hidden md:block">
                        {link.index}
                      </span>
                      {link.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}

export default Nav