import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const testimonials = [
  {
    name: 'Maria González',
    event: 'Wedding',
    location: 'San Antonio',
    rating: 5,
    text: 'TPEC Flowers made our wedding absolutely magical! The rose wall backdrop was stunning and all our guests couldn\'t stop taking photos. The team was professional and the setup was flawless.',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face',
  },
  {
    name: 'Jennifer Smith',
    event: 'Corporate Event',
    location: 'Houston',
    rating: 5,
    text: 'We hired TPEC for our company gala and they exceeded all expectations. The floral backdrop added such elegance to our event. Will definitely use them again!',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
  },
  {
    name: 'Ana Rodriguez',
    event: 'Quinceañera',
    location: 'Austin',
    rating: 5,
    text: 'My daughter\'s quinceañera was perfect thanks to TPEC! The pink rose backdrop matched our theme beautifully. Everyone was asking where we got it!',
    image: 'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=100&h=100&fit=crop&crop=face',
  },
  {
    name: 'Emily Thompson',
    event: 'Bridal Shower',
    location: 'Dallas',
    rating: 5,
    text: 'The attention to detail was incredible. From the initial consultation to setup, everything was seamless. Our photos turned out amazing!',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face',
  },
];

const StarRating = ({ rating }: { rating: number }) => {
  return (
    <div className="flex gap-1">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`w-4 h-4 ${
            i < rating ? 'fill-champagne text-champagne' : 'text-border'
          }`}
        />
      ))}
    </div>
  );
};

const TestimonialsSection = () => {
  return (
    <section id="testimonials" className="py-24 lg:py-32 bg-blush/30">
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
            Client Love
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif mb-6">
            What Our <span className="italic">Clients</span> Say
          </h2>
          <div className="section-divider mb-6" />
          <p className="text-charcoal-light text-lg">
            Don't just take our word for it – hear from the couples, families, and brands 
            who've trusted us with their special moments.
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-card p-8 rounded-lg shadow-soft border border-border/50"
            >
              <div className="flex items-start gap-4 mb-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-14 h-14 rounded-full object-cover border-2 border-champagne/30"
                />
                <div className="flex-1">
                  <h4 className="font-serif text-lg text-charcoal">{testimonial.name}</h4>
                  <p className="text-sm text-charcoal-light">
                    {testimonial.event} • {testimonial.location}
                  </p>
                  <StarRating rating={testimonial.rating} />
                </div>
              </div>
              <blockquote className="text-charcoal-light italic leading-relaxed">
                "{testimonial.text}"
              </blockquote>
            </motion.div>
          ))}
        </div>

        {/* Trust Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <div className="inline-flex items-center gap-2 bg-card px-6 py-3 rounded-full shadow-soft border border-border/50">
            <div className="flex -space-x-2">
              {testimonials.slice(0, 3).map((t, i) => (
                <img
                  key={i}
                  src={t.image}
                  alt=""
                  className="w-8 h-8 rounded-full border-2 border-card"
                />
              ))}
            </div>
            <span className="text-sm text-charcoal-light">
              <span className="font-semibold text-charcoal">100+</span> happy clients across Texas
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
