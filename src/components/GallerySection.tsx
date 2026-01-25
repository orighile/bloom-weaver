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
