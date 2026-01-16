import { motion } from 'framer-motion';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { z } from 'zod';

// Validation schema for form data
const inquirySchema = z.object({
  name: z.string().trim().min(1, 'Name is required').max(100, 'Name must be less than 100 characters'),
  email: z.string().trim().email('Please enter a valid email address').max(255, 'Email must be less than 255 characters'),
  phone: z.string().trim().min(1, 'Phone is required').max(20, 'Phone must be less than 20 characters'),
  event_type: z.string().min(1, 'Event type is required'),
  event_date: z.string().nullable().optional(),
  location: z.string().min(1, 'Location is required'),
  vision: z.string().trim().min(1, 'Please tell us about your vision').max(2000, 'Vision must be less than 2000 characters'),
  budget_range: z.string().nullable().optional(),
  referral_source: z.string().max(200, 'Referral source must be less than 200 characters').nullable().optional(),
});

const eventTypes = [
  'Wedding',
  'Corporate Event',
  'Quinceañera',
  'Bridal Shower',
  'Baby Shower',
  'Birthday Party',
  'Graduation Party',
  'Luncheon',
  'Celebration of Life',
  'Other',
];

const locations = [
  'Austin',
  'San Antonio',
  'Houston',
  'Dallas',
  'Other',
];

const budgetRanges = [
  'Under $500',
  '$500 - $1,000',
  '$1,000 - $2,500',
  '$2,500 - $5,000',
  '$5,000+',
  'Not sure yet',
];

const ContactSection = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [eventType, setEventType] = useState<string>('');
  const [location, setLocation] = useState<string>('');
  const [budgetRange, setBudgetRange] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const form = e.currentTarget;
    const formData = new FormData(form);
    
    try {
      // Collect and validate form data
      const rawData = {
        name: formData.get('name') as string,
        email: formData.get('email') as string,
        phone: formData.get('phone') as string,
        event_type: eventType,
        event_date: (formData.get('eventDate') as string) || null,
        location: location,
        vision: formData.get('vision') as string,
        budget_range: budgetRange || null,
        referral_source: (formData.get('source') as string) || null,
      };

      // Validate the data
      const validatedData = inquirySchema.parse(rawData);

      // Submit to database
      const { error } = await supabase
        .from('inquiries')
        .insert({
          name: validatedData.name,
          email: validatedData.email,
          phone: validatedData.phone,
          event_type: validatedData.event_type,
          event_date: validatedData.event_date || null,
          location: validatedData.location,
          vision: validatedData.vision,
          budget_range: validatedData.budget_range || null,
          referral_source: validatedData.referral_source || null,
        });

      if (error) throw error;

      toast.success('Thank you for your inquiry! We\'ll be in touch within 24 hours.');
      form.reset();
      setEventType('');
      setLocation('');
      setBudgetRange('');
    } catch (error) {
      if (error instanceof z.ZodError) {
        const firstError = error.errors[0];
        toast.error(firstError.message);
      } else {
        console.error('Form submission error:', error);
        toast.error('Failed to submit inquiry. Please try again.');
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
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium text-charcoal">
                    Name <span className="text-champagne">*</span>
                  </label>
                  <Input 
                    id="name"
                    name="name"
                    placeholder="Your full name" 
                    required 
                    maxLength={100}
                    className="bg-background border-border focus:border-champagne focus:ring-champagne"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-charcoal">
                    Email <span className="text-champagne">*</span>
                  </label>
                  <Input 
                    id="email"
                    name="email"
                    type="email" 
                    placeholder="your@email.com" 
                    required 
                    maxLength={255}
                    className="bg-background border-border focus:border-champagne focus:ring-champagne"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="phone" className="text-sm font-medium text-charcoal">
                    Phone <span className="text-champagne">*</span>
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

                <div className="space-y-2">
                  <label htmlFor="eventType" className="text-sm font-medium text-charcoal">
                    Event Type <span className="text-champagne">*</span>
                  </label>
                  <Select required value={eventType} onValueChange={setEventType}>
                    <SelectTrigger className="bg-background border-border focus:border-champagne focus:ring-champagne">
                      <SelectValue placeholder="Select event type" />
                    </SelectTrigger>
                    <SelectContent>
                      {eventTypes.map((type) => (
                        <SelectItem key={type} value={type.toLowerCase()}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label htmlFor="eventDate" className="text-sm font-medium text-charcoal">
                    Event Date
                  </label>
                  <Input 
                    id="eventDate"
                    name="eventDate"
                    type="date" 
                    className="bg-background border-border focus:border-champagne focus:ring-champagne"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="location" className="text-sm font-medium text-charcoal">
                    City / Location <span className="text-champagne">*</span>
                  </label>
                  <Select required value={location} onValueChange={setLocation}>
                    <SelectTrigger className="bg-background border-border focus:border-champagne focus:ring-champagne">
                      <SelectValue placeholder="Select location" />
                    </SelectTrigger>
                    <SelectContent>
                      {locations.map((loc) => (
                        <SelectItem key={loc} value={loc.toLowerCase()}>
                          {loc}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2 md:col-span-2">
                  <label htmlFor="vision" className="text-sm font-medium text-charcoal">
                    Tell Us About Your Vision <span className="text-champagne">*</span>
                  </label>
                  <Textarea 
                    id="vision"
                    name="vision"
                    placeholder="Describe your dream event and how we can help bring it to life..." 
                    required 
                    rows={4}
                    maxLength={2000}
                    className="bg-background border-border focus:border-champagne focus:ring-champagne resize-none"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="budget" className="text-sm font-medium text-charcoal">
                    Budget Range (Optional)
                  </label>
                  <Select value={budgetRange} onValueChange={setBudgetRange}>
                    <SelectTrigger className="bg-background border-border focus:border-champagne focus:ring-champagne">
                      <SelectValue placeholder="Select budget range" />
                    </SelectTrigger>
                    <SelectContent>
                      {budgetRanges.map((range) => (
                        <SelectItem key={range} value={range.toLowerCase()}>
                          {range}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label htmlFor="source" className="text-sm font-medium text-charcoal">
                    How Did You Hear About Us?
                  </label>
                  <Input 
                    id="source"
                    name="source"
                    placeholder="Instagram, referral, Google, etc."
                    maxLength={200}
                    className="bg-background border-border focus:border-champagne focus:ring-champagne"
                  />
                </div>
              </div>

              <div className="mt-8">
                <Button 
                  type="submit" 
                  variant="hero" 
                  size="lg" 
                  className="w-full md:w-auto"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Sending...' : 'Send My Inquiry'}
                </Button>
                <p className="text-sm text-charcoal-light mt-3">
                  We respond within 24 hours ✨
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
