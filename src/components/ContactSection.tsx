import { motion } from 'framer-motion';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { z } from 'zod';

// Validation schema for callback request
const inquirySchema = z.object({
  name: z.string().trim().min(1, 'First name is required').max(50, 'Name must be less than 50 characters'),
  phone: z.string().trim().min(1, 'Phone number is required').max(20, 'Phone must be less than 20 characters'),
});


const ContactSection = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const form = e.currentTarget;
    const formData = new FormData(form);
    
    try {
      // Collect and validate form data
      const rawData = {
        name: formData.get('name') as string,
        phone: formData.get('phone') as string,
      };

      // Validate the data
      const validatedData = inquirySchema.parse(rawData);

      // Submit to database with required fields
      const { error } = await supabase
        .from('inquiries')
        .insert({
          name: validatedData.name,
          phone: validatedData.phone,
          email: 'callback-request@placeholder.com',
          event_type: 'Callback Request',
          location: 'TBD',
          vision: 'Customer requested a callback',
        });

      if (error) throw error;

      // Send email notification (fire and forget - don't block on failure)
      try {
        await supabase.functions.invoke('send-inquiry-notification', {
          body: {
            name: validatedData.name,
            phone: validatedData.phone,
            email: 'N/A',
            event_type: 'Callback Request',
            event_date: null,
            location: 'TBD',
            vision: 'Customer requested a callback',
            budget_range: null,
            referral_source: null,
          },
        });
      } catch (emailError) {
        console.error('Email notification failed:', emailError);
      }

      toast.success('Thank you! We\'ll call you back shortly.');
      form.reset();
    } catch (error) {
      if (error instanceof z.ZodError) {
        const firstError = error.errors[0];
        toast.error(firstError.message);
      } else {
        console.error('Form submission error:', error);
        toast.error('Failed to submit request. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 lg:py-32 bg-ivory">
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
            Get in Touch
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif mb-6">
            Let's Create{' '}
            <span className="italic">Magic</span> Together
          </h2>
          <div className="section-divider mb-6" />
          <p className="text-charcoal-light text-lg">
            Ready to transform your event? Share your vision with us, and we'll craft 
            the perfect floral experience for your special day.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-1 space-y-8"
          >
            <div className="bg-card p-8 rounded-lg shadow-soft border border-border/50">
              <h3 className="text-xl font-serif mb-6 text-charcoal">Contact Details</h3>
              
              <div className="space-y-6">
                <a href="tel:+18179179518" className="flex items-start gap-4 group">
                  <div className="w-10 h-10 rounded-full bg-blush flex items-center justify-center shrink-0 group-hover:bg-champagne/20 transition-colors">
                    <Phone className="w-4 h-4 text-champagne" />
                  </div>
                  <div>
                    <p className="text-sm text-charcoal-light mb-1">Phone</p>
                    <p className="text-charcoal font-medium">(817) 917-9518</p>
                  </div>
                </a>

                <a href="mailto:info@tpecflowers.com" className="flex items-start gap-4 group">
                  <div className="w-10 h-10 rounded-full bg-blush flex items-center justify-center shrink-0 group-hover:bg-champagne/20 transition-colors">
                    <Mail className="w-4 h-4 text-champagne" />
                  </div>
                  <div>
                    <p className="text-sm text-charcoal-light mb-1">Email</p>
                    <p className="text-charcoal font-medium">info@tpecflowers.com</p>
                  </div>
                </a>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-blush flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4 text-champagne" />
                  </div>
                  <div>
                    <p className="text-sm text-charcoal-light mb-1">Service Areas</p>
                    <p className="text-charcoal font-medium">Austin, San Antonio, Houston & Dallas</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-blush flex items-center justify-center shrink-0">
                    <Clock className="w-4 h-4 text-champagne" />
                  </div>
                  <div>
                    <p className="text-sm text-charcoal-light mb-1">Hours</p>
                    <p className="text-charcoal font-medium">Mon–Sat: 9AM–7PM</p>
                    <p className="text-charcoal font-medium">Sun: By Appointment</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Trust Message */}
            <div className="text-center lg:text-left">
              <p className="text-sm text-charcoal-light italic">
                "Trusted by couples, brands, and families across Texas"
              </p>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-2"
          >
            <form onSubmit={handleSubmit} className="bg-card p-8 lg:p-10 rounded-lg shadow-soft border border-border/50">
              <h3 className="text-xl font-serif mb-6 text-charcoal">Request a Quote</h3>
              <p className="text-charcoal-light mb-6">
                Leave your details and we'll call you back to discuss your event!
              </p>
              
              <div className="space-y-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium text-charcoal">
                    First Name <span className="text-champagne">*</span>
                  </label>
                  <Input 
                    id="name"
                    name="name"
                    placeholder="Your first name" 
                    required 
                    maxLength={50}
                    className="bg-background border-border focus:border-champagne focus:ring-champagne"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="phone" className="text-sm font-medium text-charcoal">
                    Callback Number <span className="text-champagne">*</span>
                  </label>
                  <Input 
                    id="phone"
                    name="phone"
                    type="tel" 
                    placeholder="(555) 555-5555" 
                    required 
                    maxLength={20}
                    className="bg-background border-border focus:border-champagne focus:ring-champagne"
                  />
                </div>
              </div>

              <div className="mt-8">
                <Button 
                  type="submit" 
                  variant="hero" 
                  size="lg" 
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Sending...' : 'Request Callback'}
                </Button>
                <p className="text-sm text-charcoal-light mt-3 text-center">
                  We'll call you back within 24 hours ✨
                </p>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
