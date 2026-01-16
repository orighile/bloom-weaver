import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Menu, X, Settings } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import Logo from '@/components/Logo';

const navLinks = [
  { href: '#services', label: 'Services' },
  { href: '#gallery', label: 'Gallery' },
  { href: '#contact', label: 'Contact' },
];

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [newInquiriesCount, setNewInquiriesCount] = useState(0);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (user) {
      const fetchNewInquiries = async () => {
        const { count } = await supabase
          .from('inquiries')
          .select('*', { count: 'exact', head: true })
          .eq('status', 'new');
        setNewInquiriesCount(count || 0);
      };
      fetchNewInquiries();

      // Subscribe to realtime updates
      const channel = supabase
        .channel('inquiries-header')
        .on(
          'postgres_changes',
          { event: '*', schema: 'public', table: 'inquiries' },
          () => fetchNewInquiries()
        )
        .subscribe();

      return () => {
        supabase.removeChannel(channel);
      };
    }
  }, [user]);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-background/95 backdrop-blur-md shadow-soft py-4' 
          : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-6 lg:px-12">
        <nav className="flex items-center justify-between">
          {/* Logo */}
          <Logo size="md" variant="light" />

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-charcoal-light hover:text-champagne transition-colors elegant-underline"
              >
                {link.label}
              </a>
            ))}
            <Button variant="hero" size="default" asChild>
              <a href="#contact">Get a Quote</a>
            </Button>
            {user && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate('/admin')}
                className="relative text-charcoal-light hover:text-champagne"
              >
                <Settings className="w-4 h-4 mr-1" />
                Admin
                {newInquiriesCount > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center bg-champagne text-white text-xs">
                    {newInquiriesCount}
                  </Badge>
                )}
              </Button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-charcoal"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </nav>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden absolute top-full left-0 right-0 bg-background border-b border-border shadow-medium p-6"
          >
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-lg font-medium text-charcoal py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <Button variant="hero" size="lg" className="mt-2" asChild>
                <a href="#contact" onClick={() => setIsMobileMenuOpen(false)}>
                  Get a Quote
                </a>
              </Button>
              {user && (
                <Button
                  variant="outline"
                  size="lg"
                  className="mt-2 relative"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    navigate('/admin');
                  }}
                >
                  <Settings className="w-4 h-4 mr-2" />
                  Admin Dashboard
                  {newInquiriesCount > 0 && (
                    <Badge className="ml-2 bg-champagne text-white">
                      {newInquiriesCount}
                    </Badge>
                  )}
                </Button>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </motion.header>
  );
};

export default Header;
