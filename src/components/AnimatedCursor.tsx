import React, { useEffect, useState, useRef } from 'react';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  velocity: { x: number; y: number };
  life: number;
}

const AnimatedCursor: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [particles, setParticles] = useState<Particle[]>([]);
  const [isClicking, setIsClicking] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const particleIdRef = useRef(0);
  const animationFrameRef = useRef<number>();

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768 || 'ontouchstart' in window);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Don't render cursor on mobile devices
  if (isMobile) {
    return null;
  }

  useEffect(() => {
    let rafId: number;
    
    const updateMousePosition = (e: MouseEvent) => {
      // Throttle mouse movements for better performance
      if (rafId) return;
      
      rafId = requestAnimationFrame(() => {
        setMousePosition({ x: e.clientX, y: e.clientY });

        // Create particle trail with controlled frequency
        if (Math.random() > 0.7) { // Only create particles 30% of the time
          const particle: Particle = {
            id: particleIdRef.current++,
            x: e.clientX,
            y: e.clientY,
            size: Math.random() * 3 + 1,
            opacity: 0.6,
            velocity: {
              x: (Math.random() - 0.5) * 1.5,
              y: (Math.random() - 0.5) * 1.5
            },
            life: 20 + Math.random() * 10 // Shorter life for better performance
          };

          setParticles(prev => [...prev.slice(-8), particle]); // Limit to 8 particles
        }
        rafId = 0;
      });
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    const handleMouseEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive = 
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.classList.contains('cursor-pointer') ||
        target.closest('button') ||
        target.closest('a') ||
        target.closest('[role="button"]');
      
      setIsHovering(!!isInteractive);
    };

    // Only hide cursor on desktop with pointer device
    if (window.matchMedia('(min-width: 769px) and (pointer: fine)').matches) {
      document.body.style.cursor = 'none';
    }

    window.addEventListener('mousemove', updateMousePosition, { passive: true });
    window.addEventListener('mouseover', handleMouseEnter, { passive: true });
    window.addEventListener('mousedown', handleMouseDown, { passive: true });
    window.addEventListener('mouseup', handleMouseUp, { passive: true });

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      document.body.style.cursor = 'auto';
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mouseover', handleMouseEnter);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  // Optimize particle animation with better performance
  useEffect(() => {
    let lastTime = 0;
    const targetFPS = 60;
    const frameTime = 1000 / targetFPS;

    const animateParticles = (currentTime: number) => {
      if (currentTime - lastTime >= frameTime) {
        setParticles(prev => {
          if (prev.length === 0) return prev;
          
          return prev
            .map(particle => ({
              ...particle,
              x: particle.x + particle.velocity.x,
              y: particle.y + particle.velocity.y,
              opacity: particle.opacity * 0.96,
              life: particle.life - 1,
              size: particle.size * 0.99
            }))
            .filter(particle => particle.life > 0 && particle.opacity > 0.05);
        });
        lastTime = currentTime;
      }

      animationFrameRef.current = requestAnimationFrame(animateParticles);
    };

    if (particles.length > 0) {
      animationFrameRef.current = requestAnimationFrame(animateParticles);
    }

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [particles.length > 0]);

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999]">
      {/* Main cursor */}
      <div
        className={`fixed top-0 left-0 transition-all duration-150 ease-out ${
          isClicking ? 'scale-75' : isHovering ? 'scale-150' : 'scale-100'
        }`}
        style={{
          transform: `translate(${mousePosition.x - 16}px, ${mousePosition.y - 16}px) scale(${
            isClicking ? 0.75 : isHovering ? 1.5 : 1
          })`,
        }}
      >
        {/* Outer ring */}
        <div
          className={`w-8 h-8 border-2 rounded-full transition-all duration-300 ${
            isHovering
              ? 'border-primary bg-primary/20 shadow-lg'
              : 'border-primary/60 bg-primary/10'
          } ${isClicking ? 'animate-pulse' : ''}`}
          style={{
            boxShadow: isHovering
              ? '0 0 20px hsl(var(--primary) / 0.5)'
              : '0 0 10px hsl(var(--primary) / 0.3)',
          }}
        />
        
        {/* Inner dot */}
        <div
          className={`absolute top-1/2 left-1/2 w-2 h-2 bg-primary rounded-full transform -translate-x-1/2 -translate-y-1/2 transition-all duration-150 ${
            isClicking ? 'scale-150' : 'scale-100'
          }`}
          style={{
            boxShadow: '0 0 8px hsl(var(--primary) / 0.8)',
          }}
        />
      </div>

      {/* Particles */}
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute w-1 h-1 bg-primary rounded-full pointer-events-none"
          style={{
            left: particle.x - particle.size / 2,
            top: particle.y - particle.size / 2,
            width: particle.size,
            height: particle.size,
            opacity: particle.opacity,
            background: `radial-gradient(circle, hsl(var(--primary)) 0%, hsl(var(--primary) / 0.5) 50%, transparent 100%)`,
            boxShadow: `0 0 ${particle.size * 2}px hsl(var(--primary) / ${particle.opacity})`,
          }}
        />
      ))}

      {/* Hover effect particles */}
      {isHovering && (
        <div
          className="absolute animate-spin"
          style={{
            left: mousePosition.x - 24,
            top: mousePosition.y - 24,
          }}
        >
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-primary rounded-full"
              style={{
                transform: `rotate(${i * 45}deg) translateX(20px)`,
                animation: `sparkle 1s ease-in-out infinite ${i * 0.1}s`,
                boxShadow: '0 0 4px hsl(var(--primary))',
              }}
            />
          ))}
        </div>
      )}

      {/* Click ripple effect */}
      {isClicking && (
        <div
          className="absolute border-2 border-primary rounded-full animate-ping"
          style={{
            left: mousePosition.x - 20,
            top: mousePosition.y - 20,
            width: '40px',
            height: '40px',
            background: 'radial-gradient(circle, hsl(var(--primary) / 0.3) 0%, transparent 70%)',
          }}
        />
      )}
    </div>
  );
};

export default AnimatedCursor;