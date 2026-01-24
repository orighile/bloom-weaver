import { useEffect, useCallback } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface GalleryLightboxProps {
  isOpen: boolean;
  onClose: () => void;
  images: Array<{ src: string; title: string; alt: string; category: string }>;
  currentIndex: number;
  onPrevious: () => void;
  onNext: () => void;
}

const GalleryLightbox = ({
  isOpen,
  onClose,
  images,
  currentIndex,
  onPrevious,
  onNext,
}: GalleryLightboxProps) => {
  const currentImage = images[currentIndex];

  // Keyboard navigation
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (!isOpen) return;

      switch (event.key) {
        case 'ArrowLeft':
          event.preventDefault();
          onPrevious();
          break;
        case 'ArrowRight':
          event.preventDefault();
          onNext();
          break;
        case 'Escape':
          event.preventDefault();
          onClose();
          break;
      }
    },
    [isOpen, onPrevious, onNext, onClose]
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  if (!currentImage) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[95vw] max-h-[95vh] p-0 bg-charcoal/95 border-none overflow-hidden">
        {/* Close button */}
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="absolute top-4 right-4 z-50 text-white/80 hover:text-white hover:bg-white/10 rounded-full"
        >
          <X className="h-6 w-6" />
          <span className="sr-only">Close</span>
        </Button>

        {/* Navigation buttons */}
        {images.length > 1 && (
          <>
            <Button
              variant="ghost"
              size="icon"
              onClick={onPrevious}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-50 text-white/80 hover:text-white hover:bg-white/10 rounded-full h-12 w-12"
            >
              <ChevronLeft className="h-8 w-8" />
              <span className="sr-only">Previous image</span>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={onNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-50 text-white/80 hover:text-white hover:bg-white/10 rounded-full h-12 w-12"
            >
              <ChevronRight className="h-8 w-8" />
              <span className="sr-only">Next image</span>
            </Button>
          </>
        )}

        {/* Image container */}
        <div className="flex flex-col items-center justify-center min-h-[60vh] p-4">
          <img
            src={currentImage.src}
            alt={currentImage.alt}
            className="max-w-full max-h-[75vh] object-contain rounded-lg"
          />
          
          {/* Caption */}
          <div className="text-center mt-4 px-4">
            <span className="text-champagne-light text-xs uppercase tracking-[0.2em] block mb-1">
              {currentImage.category}
            </span>
            <h3 className="text-white font-serif text-xl">
              {currentImage.title}
            </h3>
          </div>

          {/* Image counter */}
          {images.length > 1 && (
            <p className="text-white/60 text-sm mt-3">
              {currentIndex + 1} / {images.length}
            </p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default GalleryLightbox;
