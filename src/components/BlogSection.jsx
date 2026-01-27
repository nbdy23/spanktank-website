import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'

const blogPosts = [
  {
    id: 1,
    slug: 'post-1',
    title: 'Blog Post Title Placeholder',
    excerpt: 'A brief excerpt of the blog post content goes here. This gives readers a preview of what to expect.',
    date: 'January 15, 2026',
    dateTime: '2026-01-15',
    image: '/assets/images/blog-placeholder-1.jpg',
  },
  {
    id: 2,
    slug: 'post-2',
    title: 'Another Blog Post Title',
    excerpt: 'Another excerpt placeholder for the second blog post. Sharing thoughts and insights.',
    date: 'January 10, 2026',
    dateTime: '2026-01-10',
    image: '/assets/images/blog-placeholder-2.jpg',
  },
  {
    id: 3,
    slug: 'post-3',
    title: 'Third Blog Post Title',
    excerpt: 'Third post excerpt. Personal interests, running, technology, and more.',
    date: 'January 5, 2026',
    dateTime: '2026-01-05',
    image: '/assets/images/blog-placeholder-3.jpg',
  },
]

function BlogCard({ post, index }) {
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
      className="rounded-2xl overflow-hidden bg-sk-background hover:-translate-y-1 hover:shadow-2xl transition-all duration-300"
    >
      <Link to={`/blog/${post.slug}`} className="block group">
        {/* Image */}
        <div className="aspect-[16/10] overflow-hidden">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover transition-transform duration-700 ease-smooth group-hover:scale-105"
            loading="lazy"
          />
        </div>

        {/* Content */}
        <div className="p-6 md:p-8">
          <time
            dateTime={post.dateTime}
            className="font-accent text-[0.65rem] uppercase tracking-widest text-sk-light-grey mb-2 block"
          >
            {post.date}
          </time>
          <h3 className="font-display text-2xl text-sk-font-grey leading-tight mb-2">
            {post.title}
          </h3>
          <p className="font-body text-sm text-sk-grey leading-relaxed mb-4">
            {post.excerpt}
          </p>
          <span className="font-accent text-[0.7rem] uppercase tracking-widest text-sk-green group-hover:text-sk-accent transition-colors duration-200">
            Read More →
          </span>
        </div>
      </Link>
    </motion.article>
  )
}

function BlogSection() {
  return (
    <section className="py-32 bg-sk-white">
      {/* Header */}
      <div className="max-w-[1400px] mx-auto px-8 mb-16">
        <span className="section-label block mb-2">Read</span>
        <h2 className="section-title">Blog</h2>
      </div>

      {/* Grid */}
      <div className="max-w-[1400px] mx-auto px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
          {blogPosts.map((post, index) => (
            <BlogCard key={post.id} post={post} index={index} />
          ))}
        </div>

        {/* View All */}
        <div className="text-center mt-16">
          <Link
            to="/blog"
            className="inline-block px-8 py-4 border border-sk-border-grey rounded-full font-accent text-xs uppercase tracking-widest text-sk-font-grey hover:bg-sk-green hover:border-sk-green hover:text-sk-white transition-all duration-200"
          >
            View All Posts
          </Link>
        </div>
      </div>
    </section>
  )
}

export default BlogSection