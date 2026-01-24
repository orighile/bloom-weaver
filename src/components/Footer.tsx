import { Instagram, Facebook, MapPin, Phone, Mail } from 'lucide-react';
import Logo from '@/components/Logo';

const Footer = () => {
  return (
    <footer className="bg-charcoal py-16">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="mb-4">
              <Logo size="lg" variant="dark" />
            </div>
            <p className="text-muted-foreground max-w-md mb-6">
              Transforming events across Texas with luxury rose backdrops and 
              breathtaking floral experiences since 2018.
            </p>
            <div className="flex gap-4">
              <a 
                href="https://www.instagram.com/tpecflowers" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-charcoal-light flex items-center justify-center hover:bg-champagne transition-colors group"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5 text-primary-foreground group-hover:text-charcoal" />
              </a>
              <a 
                href="https://www.facebook.com/tpecflowers" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-charcoal-light flex items-center justify-center hover:bg-champagne transition-colors group"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5 text-primary-foreground group-hover:text-charcoal" />
              </a>
              <a 
                href="https://www.pinterest.com/tpecflowers" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-charcoal-light flex items-center justify-center hover:bg-champagne transition-colors group"
                aria-label="Pinterest"
              >
                <svg className="w-5 h-5 text-primary-foreground group-hover:text-charcoal" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.627 0-12 5.372-12 12 0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146 1.124.347 2.317.535 3.554.535 6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-sans uppercase tracking-wider text-champagne-light mb-4">
              Quick Links
            </h4>
            <ul className="space-y-3">
              <li>
                <a href="#services" className="text-muted-foreground hover:text-primary-foreground transition-colors">
                  Services
                </a>
              </li>
              <li>
                <a href="#gallery" className="text-muted-foreground hover:text-primary-foreground transition-colors">
                  Gallery
                </a>
              </li>
              <li>
                <a href="#contact" className="text-muted-foreground hover:text-primary-foreground transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-sm font-sans uppercase tracking-wider text-champagne-light mb-4">
              Contact Us
            </h4>
            <ul className="space-y-3">
              <li>
                <a href="tel:+18179179518" className="flex items-center gap-2 text-muted-foreground hover:text-primary-foreground transition-colors">
                  <Phone className="w-4 h-4" />
                  (817) 917-9518
                </a>
              </li>
              <li>
                <a href="mailto:info@tpecflowers.com" className="flex items-center gap-2 text-muted-foreground hover:text-primary-foreground transition-colors">
                  <Mail className="w-4 h-4" />
                  info@tpecflowers.com
                </a>
              </li>
              <li className="flex items-start gap-2 text-muted-foreground">
                <MapPin className="w-4 h-4 mt-1 shrink-0" />
                <span>Serving Austin, San Antonio, Houston & Dallas</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-charcoal-light">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} TPEC Flowers. All rights reserved.
            </p>
            <p className="text-sm text-muted-foreground">
              Luxury Floral Backdrops for Texas Events
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
