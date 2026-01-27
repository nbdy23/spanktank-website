import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const blogPosts = [
  {
    id: 1,
    slug: 'post-1',
    title: 'Blog Post Title Placeholder',
    excerpt: 'A brief excerpt of the blog post content goes here. This gives readers a preview of what to expect.',
    date: 'January 15, 2026',
    dateTime: '2026-01-15',
    image: '/assets/images/blog-placeholder-1.jpg',
    category: 'Mindset',
  },
  {
    id: 2,
    slug: 'post-2',
    title: 'Another Blog Post Title',
    excerpt: 'Another excerpt placeholder for the second blog post. Sharing thoughts and insights.',
    date: 'January 10, 2026',
    dateTime: '2026-01-10',
    image: '/assets/images/blog-placeholder-2.jpg',
    category: 'Fitness',
  },
  {
    id: 3,
    slug: 'post-3',
    title: 'Third Blog Post Title',
    excerpt: 'Third post excerpt. Personal interests, running, technology, and more.',
    date: 'January 5, 2026',
    dateTime: '2026-01-05',
    image: '/assets/images/blog-placeholder-3.jpg',
    category: 'Technology',
  },
]

function Blog() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="pt-32 pb-32"
    >
      {/* Header */}
      <div className="max-w-[1400px] mx-auto px-8 mb-16">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="section-label block mb-2"
        >
          Thoughts & Insights
        </motion.span>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="font-display text-sk-font-grey leading-tight"
          style={{ fontSize: 'clamp(3rem, 8vw, 6rem)' }}
        >
          Blog
        </motion.h1>
      </div>

      {/* Blog Grid */}
      <div className="max-w-[1400px] mx-auto px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + index * 0.1 }}
              className="rounded-2xl overflow-hidden bg-sk-white hover:-translate-y-1 hover:shadow-2xl transition-all duration-300"
            >
              <Link to={`/blog/${post.slug}`} className="block group">
                <div className="aspect-[16/10] overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-smooth group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <div className="p-6 md:p-8">
                  <div className="flex items-center gap-4 mb-4">
                    <span className="font-accent text-[0.65rem] uppercase tracking-widest text-sk-green">
                      {post.category}
                    </span>
                    <time
                      dateTime={post.dateTime}
                      className="font-accent text-[0.65rem] uppercase tracking-widest text-sk-light-grey"
                    >
                      {post.date}
                    </time>
                  </div>
                  <h2 className="font-display text-2xl text-sk-font-grey leading-tight mb-2">
                    {post.title}
                  </h2>
                  <p className="font-body text-sm text-sk-grey leading-relaxed mb-4">
                    {post.excerpt}
                  </p>
                  <span className="font-accent text-[0.7rem] uppercase tracking-widest text-sk-green group-hover:text-sk-accent transition-colors duration-200">
                    Read More →
                  </span>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export default Blog