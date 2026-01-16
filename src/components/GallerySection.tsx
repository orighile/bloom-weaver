import { motion } from 'framer-motion';
import { useState } from 'react';

import galleryWhiteRose from '@/assets/gallery-white-rose.jpg';
import galleryRedRose from '@/assets/gallery-red-rose.jpg';
import galleryPinkCream from '@/assets/gallery-pink-cream.jpg';
import galleryPinkMix from '@/assets/gallery-pink-mix.jpg';
import galleryPureWhite from '@/assets/gallery-pure-white.jpg';
import galleryDeepRed from '@/assets/gallery-deep-red.jpg';
import galleryGreenWall from '@/assets/gallery-green-wall.jpg';

const galleryItems = [
  {
    src: galleryPureWhite,
    title: 'Pure White Rose Wall',
    category: 'Signature',
  },
  {
    src: galleryDeepRed,
    title: 'Classic Red Rose Backdrop',
    category: 'Signature',
  },
  {
    src: galleryPinkMix,
    title: 'Romantic Pink & Mauve',
    category: 'Wedding',
  },
  {
    src: galleryPinkCream,
    title: 'Blush Pink & Cream',
    category: 'Bridal Shower',
  },
  {
    src: galleryGreenWall,
    title: 'Garden Greenery Wall',
    category: 'Corporate',
  },
  {
    src: galleryWhiteRose,
    title: 'Elegant White Roses',
    category: 'Wedding',
  },
  {
    src: galleryRedRose,
    title: 'Deep Red Statement',
    category: 'Quinceañera',
  },
];

const GallerySection = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section id="gallery" className="py-24 lg:py-32 bg-background">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-block text-champagne font-sans text-sm uppercase tracking-[0.3em] mb-4">
            Our Portfolio
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif mb-6">
            A Gallery of{' '}
            <span className="italic">Beautiful</span> Moments
          </h2>
          <div className="section-divider mb-6" />
          <p className="text-charcoal-light text-lg">
            Every event tells a story. Explore how we've transformed spaces 
            into breathtaking floral experiences.
          </p>
        </motion.div>

        {/* Gallery Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {galleryItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative aspect-square overflow-hidden rounded-lg cursor-pointer image-zoom"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <img
                src={item.src}
                alt={item.title}
                className="w-full h-full object-cover"
              />
              
              {/* Overlay */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: hoveredIndex === index ? 1 : 0 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0 bg-charcoal/60 flex flex-col items-center justify-center p-6"
              >
                <span className="text-champagne-light text-xs uppercase tracking-[0.2em] mb-2">
                  {item.category}
                </span>
                <h3 className="text-primary-foreground font-serif text-xl text-center">
                  {item.title}
                </h3>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Instagram CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <a 
            href="https://www.instagram.com/tpecflowers" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-champagne font-medium elegant-underline"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
            Follow us on Instagram
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default GallerySection;
