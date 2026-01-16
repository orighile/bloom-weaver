import { motion } from 'framer-motion';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'light' | 'dark';
  className?: string;
}

const Logo = ({ size = 'md', variant = 'light', className = '' }: LogoProps) => {
  const sizeClasses = {
    sm: {
      tpec: 'text-lg',
      flowers: 'text-[10px] tracking-[0.25em]',
      lineWidth: 'w-6',
      flowerSize: 'w-3 h-3',
      bottomLine: 'w-10',
      gap: 'gap-0.5',
    },
    md: {
      tpec: 'text-2xl',
      flowers: 'text-xs tracking-[0.3em]',
      lineWidth: 'w-8',
      flowerSize: 'w-4 h-4',
      bottomLine: 'w-14',
      gap: 'gap-1',
    },
    lg: {
      tpec: 'text-3xl',
      flowers: 'text-sm tracking-[0.35em]',
      lineWidth: 'w-10',
      flowerSize: 'w-5 h-5',
      bottomLine: 'w-16',
      gap: 'gap-1.5',
    },
  };

  const colorClasses = {
    light: {
      text: 'text-charcoal',
      accent: 'text-champagne',
      line: 'bg-champagne',
      lineFaded: 'bg-champagne/50',
    },
    dark: {
      text: 'text-primary-foreground',
      accent: 'text-champagne-light',
      line: 'bg-champagne-light',
      lineFaded: 'bg-champagne-light/50',
    },
  };

  const sizes = sizeClasses[size];
  const colors = colorClasses[variant];

  return (
    <motion.a
      href="#"
      className={`flex flex-col items-center ${sizes.gap} ${className}`}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      {/* Top decorative line with flower accent */}
      <div className="flex items-center gap-2">
        <div className={`${sizes.lineWidth} h-px ${colors.line}`} />
        <svg
          className={`${sizes.flowerSize} ${colors.accent}`}
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          {/* Simple rose/flower icon */}
          <path d="M12 2C12 2 9.5 4.5 9.5 7C9.5 8.5 10.5 9.5 12 9.5C13.5 9.5 14.5 8.5 14.5 7C14.5 4.5 12 2 12 2Z" />
          <path d="M7 8C5 7 3 8 2.5 10C2 12 3 14 5 14.5C5 14.5 4 12 5.5 10.5C7 9 7 8 7 8Z" />
          <path d="M17 8C19 7 21 8 21.5 10C22 12 21 14 19 14.5C19 14.5 20 12 18.5 10.5C17 9 17 8 17 8Z" />
          <path d="M12 22C12 22 12 14 12 12C12 10 10 9 8 10C6 11 6 13 7 15C8 17 12 22 12 22Z" />
          <path d="M12 22C12 22 12 14 12 12C12 10 14 9 16 10C18 11 18 13 17 15C16 17 12 22 12 22Z" />
          <circle cx="12" cy="11" r="2.5" />
        </svg>
        <div className={`${sizes.lineWidth} h-px ${colors.line}`} />
      </div>

      {/* Typography stack */}
      <div className="text-center leading-tight">
        <div className={`font-serif font-bold tracking-tight ${sizes.tpec} ${colors.text}`}>
          TPEC
        </div>
        <div className={`font-serif font-light ${sizes.flowers} ${colors.text} uppercase`}>
          Flowers
        </div>
      </div>

      {/* Bottom decorative line */}
      <div className={`${sizes.bottomLine} h-px ${colors.lineFaded}`} />
    </motion.a>
  );
};

export default Logo;
