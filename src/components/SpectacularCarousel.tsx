import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Circle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CarouselImage {
  src: string;
  title: string;
  description: string;
  type?: 'image' | 'video';
}

interface SpectacularCarouselProps {
  images: CarouselImage[];
  onNext?: () => void;
  onPrev?: () => void;
}

const SpectacularCarousel: React.FC<SpectacularCarouselProps> = ({ 
  images, 
  onNext, 
  onPrev 
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const nextImage = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev + 1) % images.length);
    setTimeout(() => setIsTransitioning(false), 600);
  };

  const prevImage = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    setTimeout(() => setIsTransitioning(false), 600);
  };

  const goToImage = (index: number) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex(index);
    setTimeout(() => setIsTransitioning(false), 600);
  };

  // Auto-advance carousel
  useEffect(() => {
    const interval = setInterval(() => {
      nextImage();
    }, 4000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Background Images with Parallax Effect */}
      <div className="absolute inset-0">
        {images.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
              index === currentIndex 
                ? 'opacity-100 scale-100' 
                : 'opacity-0 scale-110'
            }`}
            style={{
              backgroundImage: image.type === 'video' ? 'none' : `url(${image.src})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              filter: index === currentIndex ? 'brightness(0.7)' : 'brightness(0.3)',
            }}
          >
            {image.type === 'video' && (
              <video
                src={image.src}
                className="w-full h-full object-cover"
                autoPlay
                muted
                loop
                playsInline
                style={{
                  filter: index === currentIndex ? 'brightness(0.7)' : 'brightness(0.3)',
                }}
              />
            )}
          </div>
        ))}
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/30 to-background/90" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 sm:px-6 lg:px-8">
        {/* Main Image Display */}
        <div className="relative mb-4 sm:mb-6 lg:mb-8">
          <div className="w-72 h-48 sm:w-80 sm:h-52 md:w-96 md:h-64 lg:w-[28rem] lg:h-72 xl:w-[32rem] xl:h-80 rounded-2xl overflow-hidden elegant-glow">
            {images[currentIndex].type === 'video' ? (
              <video
                src={images[currentIndex].src}
                className={`w-full h-full object-cover transition-all duration-700 ${
                  isTransitioning ? 'scale-110 rotate-1' : 'scale-100 rotate-0'
                }`}
                autoPlay
                muted
                loop
                playsInline
              />
            ) : (
              <img
                src={images[currentIndex].src}
                alt={images[currentIndex].title}
                className={`w-full h-full object-cover transition-all duration-700 ${
                  isTransitioning ? 'scale-110 rotate-1' : 'scale-100 rotate-0'
                }`}
              />
            )}
          </div>
          
          {/* Image Counter */}
          <div className="absolute top-2 right-2 sm:top-4 sm:right-4 bg-background/80 backdrop-blur-sm px-2 py-1 sm:px-3 sm:py-1 rounded-full text-xs sm:text-sm font-medium">
            ✨ Recuerdos Especiales
          </div>
        </div>

        {/* Image Title and Description */}
        <div className="text-center max-w-xs sm:max-w-lg md:max-w-xl lg:max-w-2xl mb-4 sm:mb-6 lg:mb-8 px-2">
          <h3 
            key={`title-${currentIndex}`}
            className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-primary mb-2 sm:mb-3 lg:mb-4 animate-fade-in text-glow"
          >
            {images[currentIndex].title}
          </h3>
          <p 
            key={`desc-${currentIndex}`}
            className="text-sm sm:text-base md:text-lg lg:text-xl text-foreground/80 animate-fade-in leading-relaxed"
            style={{ animationDelay: '0.2s' }}
          >
            {images[currentIndex].description}
          </p>
        </div>

        {/* Carousel Controls */}
        <div className="flex items-center gap-3 sm:gap-4 md:gap-6 lg:gap-8 mb-4 sm:mb-6 lg:mb-8">
          <Button
            variant="outline"
            size="icon"
            onClick={prevImage}
            className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full border-primary/30 hover:border-primary hover:bg-primary/10"
            disabled={isTransitioning}
          >
            <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
          </Button>

          {/* Dot Indicators */}
          <div className="flex gap-2 sm:gap-3">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => goToImage(index)}
                className={`transition-all duration-300 ${
                  index === currentIndex
                    ? 'scale-125'
                    : 'scale-100 hover:scale-110'
                }`}
                disabled={isTransitioning}
              >
                <Circle
                  className={`w-2 h-2 sm:w-3 sm:h-3 ${
                    index === currentIndex
                      ? 'fill-primary text-primary'
                      : 'fill-muted text-muted'
                  }`}
                />
              </button>
            ))}
          </div>

          <Button
            variant="outline"
            size="icon"
            onClick={nextImage}
            className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full border-primary/30 hover:border-primary hover:bg-primary/10"
            disabled={isTransitioning}
          >
            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
          </Button>
        </div>

        {/* Navigation Buttons */}
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 w-full max-w-sm sm:max-w-none px-4 sm:px-0">
          <Button
            variant="outline"
            onClick={onPrev}
            className="bg-secondary/20 border-primary/30 hover:bg-secondary/40 hover:border-primary text-xs sm:text-sm md:text-base px-3 sm:px-4 py-2"
          >
            <ChevronLeft className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
            Anterior
          </Button>
          
          <Button
            onClick={onNext}
            className="bg-primary text-primary-foreground hover:bg-primary/90 text-xs sm:text-sm md:text-base px-3 sm:px-4 py-2"
          >
            Continuar 🎉
            <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 ml-1 sm:ml-2" />
          </Button>
        </div>
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-primary/30 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default SpectacularCarousel;