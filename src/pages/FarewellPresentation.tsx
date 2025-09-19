import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ChevronDown, Star, Briefcase, Award, Users, Heart, ArrowRight, ArrowLeft } from 'lucide-react';
import ParticleSystem from '@/components/ParticleSystem';
import ElegantBackground from '@/components/ElegantBackground';
import AnimatedText from '@/components/AnimatedText';
import AnimatedLetter from '@/components/AnimatedLetter';
import TimelineMilestone from '@/components/TimelineMilestone';
import SpectacularCarousel from '@/components/SpectacularCarousel';
import profilePhoto from '@/assets/profile-photo.jpg';
import companyLogo from '@/assets/company-logo.png';
// Carousel images
import memoriaDuoEquipo from '@/assets/memoria-duo-equipo.jpg';
import memoriaEjerciciosEquipo from '@/assets/memoria-ejercicios-equipo.jpg';
import memoriaActividadesGrupo from '@/assets/memoria-actividades-grupo.jpg';
import memoriaVideo1 from '@/assets/memoria-video-1.mp4';
import memoriaVideo2 from '@/assets/memoria-video-2.mp4';
import memoriaVideo3 from '@/assets/memoria-video-3.mp4';

interface SectionProps {
  isVisible: boolean;
  children: React.ReactNode;
  className?: string;
}

const Section: React.FC<SectionProps> = ({ isVisible, children, className = '' }) => {
  if (!isVisible) return null;
  return <div className={`min-h-screen flex flex-col justify-center items-center px-8 ${className}`}>{children}</div>;
};

const FarewellPresentation: React.FC = () => {
  const [currentSection, setCurrentSection] = useState(0);
  const [showApplause, setShowApplause] = useState(false);
  const [typewriterComplete, setTypewriterComplete] = useState(false);
  const [letterComplete, setLetterComplete] = useState(false);

  const sections = [
    'cover',
    'institutional', 
    'timeline',
    'carousel',  // Galería antepenúltima
    'closing',
    'footer'
  ];

  const letterContent = [
    "Querido Herbert Ayrton,",
    "",
    "Biox Salud y Bienestar escribe estas líneas con el corazón lleno de gratitud y admiración por todo lo que has aportado a la organización durante tu tiempo con la empresa.",
    "",
    "Tu profesionalismo, dedicación y pasión por la excelencia han dejado una huella imborrable en cada proyecto que has tocado. Has sido más que un colaborador; has sido un mentor, un líder y un ejemplo a seguir para todo el equipo.",
    "",
    "Los momentos compartidos, los desafíos superados y los éxitos alcanzados son testimonios de tu invaluable contribución. Tu legado continuará inspirando a las futuras generaciones de profesionales que tengan la fortuna de seguir tus pasos.",
    "",
    "Aunque la empresa lamenta verte partir, celebra los nuevos horizontes que te esperan. La dirección sabe que llevarás contigo los mismos valores y la misma excelencia que has demostrado en Biox Salud y Bienestar.",
    "",
    "La organización te desea el mayor de los éxitos en esta nueva etapa de tu carrera profesional. Las puertas de Biox Salud y Bienestar siempre estarán abiertas para ti.",
    "",
    "Con todo el cariño y mejores deseos de la empresa,"
  ];

  const carouselImages = [
    {
      src: memoriaDuoEquipo,
      title: "¡Los Mejores Compañeros! 👫",
      description: "Esos momentos geniales que vivimos juntos, donde cada sonrisa nos recuerda lo increíble que es trabajar en equipo 😊",
      type: 'image' as const
    },
    {
      src: memoriaVideo1,
      title: "¡En Acción! 🎬",
      description: "Videos súper divertidos del equipo trabajando, llenos de buena energía y esa amistad que nos caracteriza ✨",
      type: 'video' as const
    },
    {
      src: memoriaEjerciciosEquipo,
      title: "¡Juntos Somos Imparables! 💪",
      description: "Esos desafíos chéveres que enfrentamos unidos, demostrando que con amistad y trabajo en equipo todo se puede 🚀",
      type: 'image' as const
    },
    {
      src: memoriaActividadesGrupo,
      title: "¡El Alma del Equipo! ❤️",
      description: "Herbert siempre fue esa persona especial que le daba vida a todas nuestras actividades con su energía positiva 🌟",
      type: 'image' as const
    },
    {
      src: memoriaVideo3,
      title: "¡Hasta Pronto, Amigo! 👋",
      description: "Los últimos momentos especiales que capturamos, llenos de cariño y todos esos recuerdos que siempre guardaremos 💝",
      type: 'video' as const
    }
  ];

  const nextSection = () => {
    setCurrentSection(prev => {
      const next = prev + 1;
      return Math.min(next, sections.length - 1);
    });
  };

  const prevSection = () => {
    setCurrentSection(prev => {
      const newSection = Math.max(prev - 1, 0);
      return newSection;
    });
  };

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      e.preventDefault();
      if (e.key === 'ArrowRight' || e.key === ' ') {
        nextSection();
      } else if (e.key === 'ArrowLeft') {
        prevSection();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  // Reset states when section changes
  useEffect(() => {
    setShowApplause(false);
    setTypewriterComplete(false);
    setLetterComplete(false);
  }, [currentSection]);

  // Trigger applause after typewriter completes - ONCE ONLY
  useEffect(() => {
    if (currentSection === 1 && typewriterComplete && !showApplause) {
      const timer = setTimeout(() => {
        setShowApplause(true);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [currentSection, typewriterComplete, showApplause]);

  return (
    <div className="relative overflow-hidden">
      {/* Background gradient */}
      <div 
        className="fixed inset-0 bg-gradient-to-br from-background via-muted/20 to-background"
        style={{ backgroundImage: 'var(--gradient-dark)' }}
      />

      {/* Elegant Backgrounds and Particle Systems */}
      {currentSection === 0 && (
        <>
          <ElegantBackground variant="default" />
          <ParticleSystem type="falling" count={35} />
        </>
      )}
      {currentSection === 1 && (
        <>
          <ElegantBackground variant="institutional" />
          <ParticleSystem type="falling" count={25} />
        </>
      )}
      {currentSection === 2 && (
        <>
          <ElegantBackground variant="timeline" />
          <ParticleSystem type="falling" count={30} />
        </>
      )}
      {currentSection === 3 && (
        <>
          <ElegantBackground variant="closing" />
          <ParticleSystem type="falling" count={25} />
          <ParticleSystem type="rising" count={15} />
        </>
      )}
      {currentSection === 3 && (
        <>
          <ElegantBackground variant="default" />
          <ParticleSystem type="falling" count={40} />
        </>
      )}
      {currentSection === 4 && (
        <>
          <ElegantBackground variant="closing" />
          <ParticleSystem type="falling" count={25} />
          <ParticleSystem type="rising" count={15} />
        </>
      )}
      {currentSection === 5 && (
        <>
          <ElegantBackground variant="footer" />
          <ParticleSystem type="falling" count={20} />
        </>
      )}

      {/* Cover Section */}
      <Section isVisible={currentSection === 0} className="text-center">
        <div className="space-y-8">
          {/* Company Logo */}
          <div className="animate-fade-in" style={{ animationDelay: '3s' }}>
            <img 
              src={companyLogo} 
              alt="Company Logo" 
              className="w-24 h-24 mx-auto mb-8 elegant-glow"
            />
          </div>

          {/* Collaborator Photo */}
          <div className="zoom-in-blur">
            <div className="golden-frame w-48 h-48 mx-auto">
              <img 
                src={profilePhoto} 
                alt="Herbert Ayrton" 
                className="w-full h-full object-cover rounded-full"
              />
            </div>
          </div>

          {/* Title */}
          <div className="space-y-4">
            <AnimatedText 
              text="Despedida de"
              className="text-3xl font-light text-muted-foreground"
              delay={1.5}
              type="letter-by-letter"
            />
            <AnimatedText 
              text="Herbert Ayrton"
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-glow"
              delay={2.5}
              type="letter-by-letter"
            />
          </div>

          {/* Navigation hint */}
          <div className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 animate-pulse relative z-50 w-full px-4">
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 items-center justify-center">
              {currentSection > 0 && (
                <Button 
                  variant="ghost" 
                  onClick={prevSection}
                  className="text-primary hover:text-primary/80 flex items-center gap-2 relative z-50 bg-background/10 backdrop-blur-sm text-sm sm:text-base px-3 sm:px-4 py-2"
                >
                  <ArrowLeft className="w-3 h-3 sm:w-4 sm:h-4" /> Anterior
                </Button>
              )}
              <Button 
                variant="ghost" 
                onClick={nextSection}
                className="text-primary hover:text-primary/80 flex items-center gap-2 relative z-50 bg-background/10 backdrop-blur-sm text-sm sm:text-base px-3 sm:px-4 py-2"
              >
                Continuar <ChevronDown className="w-3 h-3 sm:w-4 sm:h-4" />
              </Button>
            </div>
          </div>
        </div>
      </Section>

      {/* Institutional Message Section */}
      <Section isVisible={currentSection === 1} className="bg-gradient-to-br from-secondary/30 to-background">
        <div className="max-w-4xl text-center space-y-8">
          {/* Curtain Effect Container */}
          <div className="curtain-open overflow-hidden">
            <Card className="p-12 bg-card/50 border-primary/20 backdrop-blur-sm">
              <div className="space-y-6">
                <h2 className="text-3xl font-bold text-primary mb-8">
                  En nombre de Biox Salud y Bienestar
                </h2>
                
                <AnimatedText 
                  text="La empresa agradece tu compromiso, esfuerzo y huella en su historia. Tu profesionalismo deja un legado que siempre será recordado por Biox Salud y Bienestar."
                  className="text-xl leading-relaxed text-foreground"
                  delay={1000}
                  type="typewriter"
                  onComplete={() => setTypewriterComplete(true)}
                />

                {/* Applause Icons - Simplified */}
                {showApplause && (
                  <div className="flex justify-center gap-4 mt-8">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i}
                        className="w-6 h-6 text-primary animate-pulse" 
                        style={{ 
                          animationDelay: `${i * 200}ms`,
                          animationDuration: '1s'
                        }}
                      />
                    ))}
                  </div>
                )}
              </div>
            </Card>
          </div>

          {/* Always show continue button */}
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 justify-center relative z-50 mt-8 w-full px-4">
            {currentSection > 0 && (
              <Button 
                onClick={prevSection}
                variant="outline"
                className="border-primary/30 hover:border-primary hover:bg-primary/10 flex items-center gap-2 relative z-50 bg-background/80 backdrop-blur-sm text-sm sm:text-base px-3 sm:px-4 py-2"
              >
                <ArrowLeft className="w-3 h-3 sm:w-4 sm:h-4" /> Anterior
              </Button>
            )}
            <Button 
              onClick={nextSection}
              className="bg-primary text-primary-foreground hover:bg-primary/90 flex items-center gap-2 relative z-50 text-sm sm:text-base px-3 sm:px-4 py-2"
            >
              Siguiente <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
            </Button>
          </div>
        </div>
      </Section>

      {/* Timeline Section */}
      <Section isVisible={currentSection === 2} className="py-16">
        <div className="max-w-4xl w-full">
          <h2 className="text-4xl font-bold text-center text-primary mb-16">
            Logros y Trayectoria
          </h2>
          
          <div className="relative">
            <TimelineMilestone 
              title="Inicio en la empresa"
              icon={Star}
              position="left"
              delay={0.5}
            />
            <TimelineMilestone 
              title="Proyectos claves"
              icon={Briefcase}
              position="right"
              delay={1}
            />
            <TimelineMilestone 
              title="Aportes destacados"
              icon={Award}
              position="left"
              delay={1.5}
            />
            <TimelineMilestone 
              title="Liderazgo de equipo"
              icon={Users}
              position="right"
              delay={2}
            />
          </div>

          <div className="text-center mt-12">
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 justify-center relative z-50 px-4">
              <Button 
                onClick={prevSection}
                variant="outline"
                className="border-primary/30 hover:border-primary hover:bg-primary/10 flex items-center gap-2 relative z-50 bg-background/80 backdrop-blur-sm text-sm sm:text-base px-3 sm:px-4 py-2"
              >
                <ArrowLeft className="w-3 h-3 sm:w-4 sm:h-4" /> Anterior
              </Button>
              <Button 
                onClick={nextSection}
                className="bg-primary text-primary-foreground hover:bg-primary/90 relative z-50 text-sm sm:text-base px-3 sm:px-4 py-2"
              >
                Ver Galería
              </Button>
            </div>
          </div>
        </div>
      </Section>

      {/* Spectacular Carousel Section */}
      <Section isVisible={currentSection === 3}>
        <SpectacularCarousel
          images={carouselImages}
          onNext={nextSection}
          onPrev={prevSection}
        />
      </Section>

      {/* Closing Section - Animated Letter */}
      <Section isVisible={currentSection === 4} className="py-16">
        <div className="relative">
          <AnimatedLetter
            letterContent={letterContent}
            signature="Biox Salud y Bienestar"
            onComplete={() => setLetterComplete(true)}
          />
          
          {/* Navigation buttons - appear after letter is complete */}
            {letterComplete && (
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 justify-center mt-12 relative z-50 animate-fade-in px-4">
                <Button 
                  onClick={prevSection}
                  variant="outline"
                  className="border-primary/30 hover:border-primary hover:bg-primary/10 flex items-center gap-2 relative z-50 bg-background/80 backdrop-blur-sm text-sm sm:text-base px-3 sm:px-4 py-2"
                >
                  <ArrowLeft className="w-3 h-3 sm:w-4 sm:h-4" /> Anterior
                </Button>
                <Button 
                  onClick={nextSection}
                  className="bg-primary text-primary-foreground hover:bg-primary/90 relative z-50 text-sm sm:text-base px-3 sm:px-4 py-2"
                >
                  Finalizar
                </Button>
              </div>
            )}
        </div>
      </Section>

      {/* Footer Section */}
      <Section isVisible={currentSection === 5} className="text-center">
        <div className="space-y-8">
          <Heart className="w-16 h-16 text-primary mx-auto animate-pulse" />
          
          <div className="space-y-4">
            <p className="text-lg text-muted-foreground">
              Despedida organizada por Biox Salud y Bienestar
            </p>
            <p className="text-sm text-muted-foreground">
              {new Date().toLocaleDateString('es-ES', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
          </div>

          <div className="pt-8 flex flex-col sm:flex-row gap-2 sm:gap-4 justify-center relative z-50 px-4">
            <Button 
              onClick={prevSection}
              variant="outline"
              className="border-primary/30 hover:border-primary hover:bg-primary/10 flex items-center gap-2 relative z-50 bg-background/80 backdrop-blur-sm text-sm sm:text-base px-3 sm:px-4 py-2"
            >
              <ArrowLeft className="w-3 h-3 sm:w-4 sm:h-4" /> Anterior
            </Button>
            <Button 
              onClick={() => setCurrentSection(0)}
              className="bg-primary text-primary-foreground hover:bg-primary/90 relative z-50 text-sm sm:text-base px-3 sm:px-4 py-2"
            >
              Volver al Inicio
            </Button>
          </div>
        </div>
      </Section>
    </div>
  );
};

export default FarewellPresentation;