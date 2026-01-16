import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import heroBackdrop from "@/assets/hero-backdrop.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img src={heroBackdrop} alt="Luxury rose flower backdrop" className="w-full h-full object-cover" />
        <div className="absolute inset-0 hero-overlay" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 lg:px-12">
        <div className="max-w-2xl">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-block text-champagne font-sans text-sm uppercase tracking-[0.3em] mb-6"
          >
            Austin's Premier Floral Backdrops
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-serif leading-tight mb-6"
          >
            Luxury Rose Backdrops for <span className="italic">Unforgettable</span> Events
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg md:text-xl text-charcoal-light leading-relaxed mb-10 max-w-xl"
          >
            Transforming weddings, celebrations, and corporate events across Austin and beyond with breathtaking floral
            experiences.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Button variant="hero" size="xl" asChild>
              <a href="#contact">Request a Quote</a>
            </Button>
            <Button variant="hero-outline" size="xl" asChild>
              <a href="#gallery">View Our Work</a>
            </Button>
          </motion.div>

          {/* Trust Badge */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="mt-16 flex items-center gap-3"
          >
            <div className="flex -space-x-2">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="w-10 h-10 rounded-full bg-blush border-2 border-background flex items-center justify-center"
                >
                  <span className="text-xs text-champagne">★</span>
                </div>
              ))}
            </div>
            <p className="text-sm text-charcoal-light">
              <span className="font-semibold text-charcoal">Number of+</span> events transformed across Texas
            </p>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 border-2 border-champagne/50 rounded-full flex justify-center pt-2"
        >
          <div className="w-1 h-2 bg-champagne rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
