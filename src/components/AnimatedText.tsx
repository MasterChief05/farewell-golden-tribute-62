import React, { useEffect, useState, useCallback } from 'react';

interface AnimatedTextProps {
  text: string;
  className?: string;
  delay?: number;
  type?: 'letter-by-letter' | 'typewriter' | 'fade-in';
  onComplete?: () => void;
}

const AnimatedText: React.FC<AnimatedTextProps> = ({ 
  text, 
  className = '', 
  delay = 0, 
  type = 'letter-by-letter',
  onComplete
}) => {
  const [visibleText, setVisibleText] = useState('');
  const [isComplete, setIsComplete] = useState(false);

  const completeAnimation = useCallback(() => {
    if (!isComplete) {
      setIsComplete(true);
      onComplete?.();
    }
  }, [isComplete, onComplete]);

  useEffect(() => {
    if (type === 'typewriter') {
      setVisibleText('');
      setIsComplete(false);
      
      let typeInterval: NodeJS.Timeout;
      
      const startTimer = setTimeout(() => {
        let currentIndex = 0;
        
        typeInterval = setInterval(() => {
          if (currentIndex < text.length) {
            currentIndex++;
            setVisibleText(text.slice(0, currentIndex));
          } else {
            clearInterval(typeInterval);
            setIsComplete(true);
            onComplete?.();
          }
        }, 50);
      }, delay);

      return () => {
        clearTimeout(startTimer);
        if (typeInterval) {
          clearInterval(typeInterval);
        }
      };
    } else {
      // Para otros tipos, completar inmediatamente después del delay
      const timer = setTimeout(() => {
        setVisibleText(text);
        setIsComplete(true);
        onComplete?.();
      }, delay);
      
      return () => clearTimeout(timer);
    }
  }, [text, delay, type, onComplete]);

  if (type === 'letter-by-letter') {
    return (
      <div className={className}>
        {text.split('').map((char, index) => (
          <span
            key={index}
            className="letter-glow"
            style={{ 
              animationDelay: `${delay + index * 0.05}s`, // Más rápido
              opacity: 0
            }}
          >
            {char === ' ' ? '\u00A0' : char}
          </span>
        ))}
      </div>
    );
  }

  if (type === 'typewriter') {
    return (
      <div className={`${className}`}>
        {visibleText}
        {!isComplete && <span className="animate-pulse">|</span>}
      </div>
    );
  }

  return (
    <div className={`${className} animate-fade-in`} style={{ animationDelay: `${delay}s` }}>
      {text}
    </div>
  );
};

export default AnimatedText;