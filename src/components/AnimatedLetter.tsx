import React, { useState, useEffect } from 'react';
import { Feather } from 'lucide-react';

interface AnimatedLetterProps {
  letterContent: string[];
  signature: string;
  onComplete?: () => void;
}

const AnimatedLetter: React.FC<AnimatedLetterProps> = ({ 
  letterContent, 
  signature, 
  onComplete 
}) => {
  const [currentParagraph, setCurrentParagraph] = useState(0);
  const [currentChar, setCurrentChar] = useState(0);
  const [showSignature, setShowSignature] = useState(false);
  const [isWriting, setIsWriting] = useState(true);
  const [textAreaRef, setTextAreaRef] = useState<HTMLDivElement | null>(null);

  const skipAnimation = () => {
    setCurrentParagraph(letterContent.length);
    setCurrentChar(0);
    setShowSignature(true);
    setIsWriting(false);
    onComplete?.();
  };


  useEffect(() => {
    if (currentParagraph >= letterContent.length) {
      setTimeout(() => {
        setShowSignature(true);
        setIsWriting(false);
        onComplete?.();
      }, 1000);
      return;
    }

    const currentText = letterContent[currentParagraph];
    
    if (currentChar < currentText.length) {
      const timer = setTimeout(() => {
        setCurrentChar(prev => prev + 1);
      }, 80 + Math.random() * 40); // Variable typing speed for realism

      return () => clearTimeout(timer);
    } else {
      // Move to next paragraph after delay
      setTimeout(() => {
        setCurrentParagraph(prev => prev + 1);
        setCurrentChar(0);
      }, 800);
    }
  }, [currentChar, currentParagraph, letterContent, onComplete]);

  return (
    <div className="relative w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Skip button */}
      {isWriting && (
        <button 
          onClick={skipAnimation}
          className="absolute top-4 right-4 z-20 bg-primary/90 text-primary-foreground px-3 py-1 rounded-md text-sm font-medium hover:bg-primary transition-colors"
        >
          Saltar
        </button>
      )}
      
      {/* Letter Paper */}
      <div className="bg-amber-50 backdrop-blur-sm p-6 sm:p-8 lg:p-12 rounded-lg shadow-2xl border border-amber-300 relative overflow-hidden mx-auto">
        {/* Paper texture overlay */}
        <div className="absolute inset-0 opacity-5 bg-gradient-to-br from-amber-100 via-transparent to-amber-100" />
        
        {/* Letter header */}
        <div className="text-center mb-6 sm:mb-8 relative z-10">
          <div className="w-12 sm:w-16 h-px bg-primary/30 mx-auto mb-3 sm:mb-4" />
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-serif text-primary/80 mb-2">Carta de Despedida</h2>
          <div className="w-12 sm:w-16 h-px bg-primary/30 mx-auto" />
        </div>

        {/* Letter content */}
        <div 
          ref={setTextAreaRef}
          className="relative z-10 space-y-4 sm:space-y-6 font-serif text-base sm:text-lg lg:text-xl leading-relaxed text-gray-800 text-center"
        >
          {letterContent.map((paragraph, index) => (
            <p key={index} className="relative">
              {index <= currentParagraph && (
                <span className="relative">
                  {index === currentParagraph 
                    ? paragraph.slice(0, currentChar)
                    : paragraph
                  }
                  {index === currentParagraph && currentChar < paragraph.length && (
                    <span className="inline-block w-0.5 h-6 bg-primary/60 animate-pulse ml-1" />
                  )}
                </span>
              )}
            </p>
          ))}

          {/* Signature */}
          {showSignature && (
            <div className="mt-12 text-right animate-fade-in">
              <p className="text-xl font-serif text-primary/80 mb-2">Con cariño y gratitud,</p>
              <div className="relative inline-block">
                <p className="text-2xl font-signature text-primary font-bold">
                  {signature}
                </p>
                {/* Signature underline */}
                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-primary/60 to-transparent animate-fade-in" 
                     style={{ animationDelay: '0.5s' }} />
              </div>
            </div>
          )}
        </div>

        {/* Decorative elements */}
        <div className="absolute top-6 right-6 w-12 h-12 border-2 border-primary/20 rounded-full animate-pulse opacity-50" />
        <div className="absolute bottom-6 left-6 w-8 h-8 border border-primary/20 rotate-45 animate-pulse opacity-30" />
        
        {/* Floating ink particles */}
        {isWriting && (
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-primary/40 rounded-full animate-pulse"
                style={{
                  left: `${20 + Math.random() * 60}%`,
                  top: `${30 + Math.random() * 40}%`,
                  animationDelay: `${Math.random() * 2}s`,
                  animationDuration: `${1 + Math.random()}s`,
                }}
              />
            ))}
          </div>
        )}
      </div>

      {/* Floating feathers animation */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-pulse opacity-30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 2}s`,
              transform: `rotate(${Math.random() * 360}deg) scale(${0.5 + Math.random() * 0.5})`,
            }}
          >
            <Feather className="w-6 h-6 text-amber-600/40" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnimatedLetter;