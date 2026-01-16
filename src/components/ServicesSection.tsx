import { motion } from 'framer-motion';
import { Heart, Building2, Crown, Wine, Flower2, Cake, Baby, UtensilsCrossed, GraduationCap } from 'lucide-react';

const services = [
  {
    icon: Heart,
    title: 'Weddings',
    description: 'Where "I Do" Becomes Unforgettable',
  },
  {
    icon: Building2,
    title: 'Corporate Events',
    description: 'Brand Moments That Bloom',
  },
  {
    icon: Crown,
    title: 'Quinceañeras',
    description: 'Celebrate Her Crowning Moment',
  },
  {
    icon: Wine,
    title: 'Bridal Showers',
    description: 'Showering Love in Style',
  },
  {
    icon: Flower2,
    title: 'Celebration of Life',
    description: 'Honoring Memories with Grace',
  },
  {
    icon: Cake,
    title: 'Birthday Parties',
    description: 'Birthdays Worth Remembering',
  },
  {
    icon: Baby,
    title: 'Baby Showers',
    description: 'Welcome Baby in Bloom',
  },
  {
    icon: UtensilsCrossed,
    title: 'Luncheons',
    description: 'Elegant Affairs, Perfectly Styled',
  },
  {
    icon: GraduationCap,
    title: 'Graduation Parties',
    description: 'Celebrate Success in Style',
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0 },
};

const ServicesSection = () => {
  return (
    <section id="services" className="py-24 lg:py-32 bg-ivory">
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
            Our Services
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif mb-6">
            Crafting Moments of{' '}
            <span className="italic">Elegance</span>
          </h2>
          <div className="section-divider mb-6" />
          <p className="text-charcoal-light text-lg">
            From intimate gatherings to grand celebrations, our luxury floral backdrops 
            transform every event into an unforgettable experience.
          </p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={item}
              transition={{ duration: 0.6 }}
              className="group"
            >
              <div className="bg-card p-8 rounded-lg shadow-soft card-hover border border-border/50 h-full">
                <div className="w-14 h-14 rounded-full bg-blush flex items-center justify-center mb-6 group-hover:bg-champagne/20 transition-colors duration-300">
                  <service.icon className="w-6 h-6 text-champagne" strokeWidth={1.5} />
                </div>
                <h3 className="text-xl font-serif mb-2 text-charcoal">{service.title}</h3>
                <p className="text-charcoal-light">{service.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;
