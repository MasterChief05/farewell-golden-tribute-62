import React from 'react';

interface ElegantBackgroundProps {
  variant?: 'default' | 'institutional' | 'timeline' | 'closing' | 'footer';
}

const ElegantBackground: React.FC<ElegantBackgroundProps> = ({ variant = 'default' }) => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Animated geometric shapes */}
      <div className="absolute inset-0">
        {/* Floating orbs */}
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-gradient-to-br from-primary/10 to-primary/5 animate-pulse blur-sm"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${50 + Math.random() * 100}px`,
              height: `${50 + Math.random() * 100}px`,
              animationDelay: `${Math.random() * 4}s`,
              animationDuration: `${3 + Math.random() * 2}s`,
            }}
          />
        ))}

        {/* Diagonal lines */}
        {[...Array(8)].map((_, i) => (
          <div
            key={`line-${i}`}
            className="absolute bg-gradient-to-r from-transparent via-primary/10 to-transparent opacity-30"
            style={{
              left: `${-20 + i * 15}%`,
              top: `${-10 + i * 12}%`,
              width: '200px',
              height: '1px',
              transform: `rotate(${-30 + Math.random() * 60}deg)`,
              animation: `fade-in 2s ease-in-out ${i * 0.5}s both`,
            }}
          />
        ))}

        {/* Sparkles */}
        {[...Array(20)].map((_, i) => (
          <div
            key={`sparkle-${i}`}
            className="absolute w-1 h-1 bg-primary/40 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${1 + Math.random() * 2}s`,
            }}
          />
        ))}

        {/* Variant-specific elements */}
        {variant === 'institutional' && (
          <>
            {/* Elegant borders */}
            <div className="absolute top-10 left-10 w-32 h-32 border border-primary/20 rounded-full animate-spin opacity-20" style={{ animationDuration: '20s' }} />
            <div className="absolute bottom-10 right-10 w-24 h-24 border border-primary/20 rounded-full animate-spin opacity-20" style={{ animationDuration: '15s', animationDirection: 'reverse' }} />
          </>
        )}

        {variant === 'timeline' && (
          <>
            {/* Timeline decorative elements */}
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-primary/30 to-transparent" />
            {[...Array(6)].map((_, i) => (
              <div
                key={`timeline-dot-${i}`}
                className="absolute left-1/2 w-2 h-2 bg-primary/30 rounded-full animate-pulse transform -translate-x-1/2"
                style={{
                  top: `${10 + i * 15}%`,
                  animationDelay: `${i * 0.3}s`,
                }}
              />
            ))}
          </>
        )}

        {variant === 'closing' && (
          <>
            {/* Heart-shaped particles */}
            {[...Array(15)].map((_, i) => (
              <div
                key={`heart-${i}`}
                className="absolute text-primary/20 animate-pulse"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  fontSize: `${8 + Math.random() * 16}px`,
                  animationDelay: `${Math.random() * 2}s`,
                  transform: `rotate(${Math.random() * 360}deg)`,
                }}
              >
                ♥
              </div>
            ))}
          </>
        )}

        {variant === 'footer' && (
          <>
            {/* Company elegance */}
            <div className="absolute inset-0 bg-gradient-to-t from-primary/5 via-transparent to-transparent" />
            {[...Array(10)].map((_, i) => (
              <div
                key={`star-${i}`}
                className="absolute text-primary/30 animate-pulse"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  fontSize: `${6 + Math.random() * 12}px`,
                  animationDelay: `${Math.random() * 3}s`,
                }}
              >
                ★
              </div>
            ))}
          </>
        )}
      </div>

      {/* Animated gradient overlay */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          background: `
            radial-gradient(circle at 20% 20%, hsl(var(--primary) / 0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 80%, hsl(var(--primary) / 0.08) 0%, transparent 50%),
            radial-gradient(circle at 40% 60%, hsl(var(--primary) / 0.05) 0%, transparent 50%)
          `,
          animation: 'fade-in 3s ease-in-out',
        }}
      />
    </div>
  );
};

export default ElegantBackground;