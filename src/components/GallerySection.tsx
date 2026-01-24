import { motion } from 'framer-motion';
import { useState, useCallback } from 'react';
import GalleryLightbox from './GalleryLightbox';

import galleryWedding from '@/assets/gallery-wedding.jpg';
import galleryCorporate from '@/assets/gallery-corporate.jpg';
import galleryQuince from '@/assets/gallery-quince.jpg';
import galleryBabyshower from '@/assets/gallery-babyshower.jpg';
import galleryBridal from '@/assets/gallery-bridal.jpg';
import backdropPinkCream from '@/assets/backdrop-pink-cream.jpg';
import backdropMixedRoses from '@/assets/backdrop-mixed-roses.jpg';
import backdropWhiteRoses from '@/assets/backdrop-white-roses.jpg';
import backdropRedRoses from '@/assets/backdrop-red-roses.jpg';
import backdropGreenFloral from '@/assets/backdrop-green-floral.jpg';
import backdropRoselight from '@/assets/backdrop-roselight.jpg';
import backdropRoseBlend from '@/assets/backdrop-rose-blend.webp';

const galleryItems = [
  {
    src: galleryWedding,
    title: 'Romantic Wedding Ceremony',
    alt: 'Luxury rose flower backdrop at romantic wedding ceremony in Austin Texas',
    category: 'Wedding',
  },
  {
    src: galleryCorporate,
    title: 'Corporate Brand Launch',
    alt: 'Elegant floral backdrop for corporate brand launch event in Texas',
    category: 'Corporate',
  },
  {
    src: galleryQuince,
    title: 'Quinceañera Celebration',
    alt: 'Beautiful rose wall backdrop for quinceañera celebration',
    category: 'Quinceañera',
  },
  {
    src: galleryBabyshower,
    title: 'Elegant Baby Shower',
    alt: 'Stunning flower backdrop for elegant baby shower event',
    category: 'Baby Shower',
  },
  {
    src: galleryBridal,
    title: 'Luxe Bridal Shower',
    alt: 'Luxurious rose flower wall for bridal shower celebration',
    category: 'Bridal Shower',
  },
  {
    src: backdropPinkCream,
    title: 'Pink & Cream Rose Wall',
    alt: 'Pink and cream rose flower wall backdrop rental in Austin',
    category: 'Backdrop',
  },
  {
    src: backdropMixedRoses,
    title: 'Mixed Rose Wall',
    alt: 'Mixed color rose flower wall backdrop for events',
    category: 'Backdrop',
  },
  {
    src: backdropWhiteRoses,
    title: 'White Rose Wall',
    alt: 'Elegant white rose flower wall backdrop for weddings',
    category: 'Backdrop',
  },
  {
    src: backdropRedRoses,
    title: 'Red Rose Wall',
    alt: 'Romantic red rose flower wall backdrop rental',
    category: 'Backdrop',
  },
  {
    src: backdropGreenFloral,
    title: 'Green Floral Wall',
    alt: 'Fresh green floral backdrop for outdoor events',
    category: 'Backdrop',
  },
  {
    src: backdropRoselight,
    title: 'Roselight Wall',
    alt: 'Elegant white and pink rose wall backdrop with greenery for outdoor events',
    category: 'Backdrop',
  },
  {
    src: backdropRoseBlend,
    title: 'Pink & White Rose Blend',
    alt: 'Luxurious pink and white rose blend flower wall for elegant celebrations',
    category: 'Backdrop',
  },
];

const GallerySection = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const openLightbox = useCallback((index: number) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxOpen(false);
  }, []);

  const goToPrevious = useCallback(() => {
    setCurrentImageIndex((prev) => (prev === 0 ? galleryItems.length - 1 : prev - 1));
  }, []);

  const goToNext = useCallback(() => {
    setCurrentImageIndex((prev) => (prev === galleryItems.length - 1 ? 0 : prev + 1));
  }, []);

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
              onClick={() => openLightbox(index)}
            >
              <img
                src={item.src}
                alt={item.alt}
                loading="lazy"
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

      {/* Lightbox */}
      <GalleryLightbox
        isOpen={lightboxOpen}
        onClose={closeLightbox}
        images={galleryItems}
        currentIndex={currentImageIndex}
        onPrevious={goToPrevious}
        onNext={goToNext}
      />
    </section>
  );
};

export default GallerySection;
