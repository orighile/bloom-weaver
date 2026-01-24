import { motion } from 'framer-motion';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const faqItems = [
  {
    question: 'How far in advance should I book?',
    answer: 'We recommend booking at least 2-4 weeks in advance to ensure availability, especially for peak wedding season (March-November). For major holidays and popular dates, booking 4-6 weeks ahead is ideal.',
  },
  {
    question: 'What areas do you serve?',
    answer: 'We proudly serve Austin, San Antonio, Houston, Dallas, and surrounding areas across Texas. Travel fees may apply for locations outside our primary service areas.',
  },
  {
    question: 'How long does setup take?',
    answer: 'Setup typically takes 30-60 minutes depending on the backdrop size and complexity. We arrive early to ensure everything is perfectly arranged before your event begins.',
  },
  {
    question: 'What sizes are available?',
    answer: 'Our rose wall backdrops come in various sizes: 8x8 ft (standard), 8x10 ft (popular for weddings), and custom sizes up to 8x16 ft. We can help you choose the perfect size for your venue and guest count.',
  },
  {
    question: 'Can I customize the colors?',
    answer: 'Absolutely! We offer a variety of color palettes including classic whites, romantic pinks, bold reds, and mixed arrangements. We can also create custom color combinations to match your event theme.',
  },
  {
    question: 'What is included in the rental?',
    answer: 'All rentals include delivery, professional setup, and pickup. Our team handles everything so you can focus on enjoying your event. Props and accessories can be added for an additional fee.',
  },
  {
    question: 'What happens if there\'s bad weather for outdoor events?',
    answer: 'Our backdrops are designed for both indoor and outdoor use. For outdoor events, we recommend having a backup indoor location. We\'ll work with you to find the best solution if weather becomes a concern.',
  },
  {
    question: 'How do I book and what payment methods do you accept?',
    answer: 'Simply fill out our inquiry form or call us at (817) 917-9518. We accept all major credit cards, Venmo, Zelle, and cash. A 50% deposit is required to secure your date, with the balance due on the event day.',
  },
];

const FAQSection = () => {
  return (
    <section id="faq" className="py-24 lg:py-32 bg-background">
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
            Common Questions
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif mb-6">
            Frequently Asked{' '}
            <span className="italic">Questions</span>
          </h2>
          <div className="section-divider mb-6" />
          <p className="text-charcoal-light text-lg">
            Everything you need to know about our rose wall backdrop rentals.
          </p>
        </motion.div>

        {/* FAQ Accordion */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto"
        >
          <Accordion type="single" collapsible className="space-y-4">
            {faqItems.map((item, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-card border border-border/50 rounded-lg px-6 shadow-soft"
              >
                <AccordionTrigger className="text-left font-serif text-lg text-charcoal hover:text-champagne hover:no-underline py-5">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-charcoal-light leading-relaxed pb-5">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-12"
        >
          <p className="text-charcoal-light">
            Still have questions?{' '}
            <a href="#contact" className="text-champagne font-medium elegant-underline">
              Get in touch
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQSection;
