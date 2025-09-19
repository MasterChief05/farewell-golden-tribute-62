import React, { useEffect, useState } from 'react';

interface Particle {
  id: number;
  left: number;
  delay: number;
  size: number;
}

interface ParticleSystemProps {
  type?: 'falling' | 'rising';
  count?: number;
}

const ParticleSystem: React.FC<ParticleSystemProps> = ({ type = 'falling', count = 20 }) => {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const generateParticles = () => {
      const newParticles: Particle[] = [];
      for (let i = 0; i < count; i++) {
        newParticles.push({
          id: i,
          left: Math.random() * 100,
          delay: Math.random() * 8,
          size: Math.random() * 3 + 1,
        });
      }
      setParticles(newParticles);
    };

    generateParticles();
  }, [count]);

  return (
    <div className="fixed inset-0 pointer-events-none z-10">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className={type === 'falling' ? 'particle' : 'particle-rise'}
          style={{
            left: `${particle.left}%`,
            animationDelay: `${particle.delay}s`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
          }}
        />
      ))}
    </div>
  );
};

export default ParticleSystem;