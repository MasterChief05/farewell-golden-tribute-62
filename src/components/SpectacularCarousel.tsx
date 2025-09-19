import React, { useState, useEffect, useCallback, useMemo } from 'react';
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

  const nextImage = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev + 1) % images.length);
    setTimeout(() => setIsTransitioning(false), 400); // Reduced transition time
  }, [isTransitioning, images.length]);

  const prevImage = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    setTimeout(() => setIsTransitioning(false), 400);
  }, [isTransitioning, images.length]);

  const goToImage = useCallback((index: number) => {
    if (isTransitioning || index === currentIndex) return;
    setIsTransitioning(true);
    setCurrentIndex(index);
    setTimeout(() => setIsTransitioning(false), 400);
  }, [isTransitioning, currentIndex]);

  // Optimized auto-advance with cleanup
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isTransitioning) {
        nextImage();
      }
    }, 6000); // Longer interval for better UX

    return () => clearInterval(interval);
  }, [nextImage, isTransitioning]);

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
          <div className="w-80 h-56 sm:w-96 sm:h-64 md:w-[28rem] md:h-72 lg:w-[32rem] lg:h-80 xl:w-[36rem] xl:h-[22rem] rounded-3xl overflow-hidden elegant-glow shadow-2xl backdrop-blur-sm border border-white/20">
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
        <div className="text-center max-w-sm sm:max-w-lg md:max-w-xl lg:max-w-3xl mb-4 sm:mb-6 lg:mb-8 px-4">
          <h3 
            key={`title-${currentIndex}`}
            className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-primary mb-3 sm:mb-4 lg:mb-6 animate-fade-in text-glow drop-shadow-lg"
          >
            {images[currentIndex].title}
          </h3>
          <p 
            key={`desc-${currentIndex}`}
            className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-foreground/90 animate-fade-in leading-relaxed font-medium bg-background/20 backdrop-blur-sm rounded-xl px-4 sm:px-6 py-3 sm:py-4 shadow-lg border border-white/10"
            style={{ animationDelay: '0.2s' }}
          >
            {images[currentIndex].description}
          </p>
        </div>

        {/* Carousel Controls */}
        <div className="flex items-center justify-center gap-4 sm:gap-6 md:gap-8 mb-6 sm:mb-8 lg:mb-10">
          <Button
            variant="outline"
            size="icon"
            onClick={prevImage}
            className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full border-primary/40 hover:border-primary hover:bg-primary/20 backdrop-blur-sm bg-background/20 shadow-lg transition-all duration-300 hover:scale-110"
            disabled={isTransitioning}
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" />
          </Button>

          {/* Dot Indicators */}
          <div className="flex gap-2 sm:gap-3 px-4 py-2 bg-background/20 backdrop-blur-sm rounded-full shadow-lg">
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
                  className={`w-3 h-3 sm:w-4 sm:h-4 transition-colors duration-300 ${
                    index === currentIndex
                      ? 'fill-primary text-primary'
                      : 'fill-muted-foreground/50 text-muted-foreground/50 hover:fill-primary/70 hover:text-primary/70'
                  }`}
                />
              </button>
            ))}
          </div>

          <Button
            variant="outline"
            size="icon"
            onClick={nextImage}
            className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full border-primary/40 hover:border-primary hover:bg-primary/20 backdrop-blur-sm bg-background/20 shadow-lg transition-all duration-300 hover:scale-110"
            disabled={isTransitioning}
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" />
          </Button>
        </div>

        {/* Navigation Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-6 justify-center items-center w-full max-w-md sm:max-w-lg mx-auto px-4">
          <Button
            variant="outline"
            onClick={onPrev}
            className="w-full sm:w-auto bg-background/80 backdrop-blur-sm border-primary/40 hover:bg-primary/10 hover:border-primary text-sm sm:text-base md:text-lg px-6 sm:px-8 py-3 sm:py-4 shadow-lg transition-all duration-300 hover:scale-105"
          >
            <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
            Anterior
          </Button>
          
          <Button
            onClick={onNext}
            className="w-full sm:w-auto bg-primary text-primary-foreground hover:bg-primary/90 text-sm sm:text-base md:text-lg px-6 sm:px-8 py-3 sm:py-4 shadow-lg transition-all duration-300 hover:scale-105"
          >
            Continuar 🎉
            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
          </Button>
        </div>
      </div>

      {/* Optimized Floating Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {useMemo(() => 
          [...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-primary/20 rounded-full animate-pulse"
              style={{
                left: `${20 + (i * 15)}%`,
                top: `${30 + (i * 10)}%`,
                animationDelay: `${i * 0.5}s`,
                animationDuration: `${3 + (i * 0.5)}s`,
              }}
            />
          )), [])}
      </div>
    </div>
  );
};

export default SpectacularCarousel;