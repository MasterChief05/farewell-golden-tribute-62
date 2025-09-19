import React from 'react';
import { LucideIcon } from 'lucide-react';

interface TimelineMilestoneProps {
  title: string;
  icon: LucideIcon;
  position: 'left' | 'right';
  delay: number;
}

const TimelineMilestone: React.FC<TimelineMilestoneProps> = ({ 
  title, 
  icon: Icon, 
  position, 
  delay 
}) => {
  return (
    <div className="flex items-center mb-8 relative">
      {/* Timeline line */}
      <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-muted"></div>
      
      {/* Content */}
      <div className={`w-1/2 ${position === 'left' ? 'pr-8 text-right' : 'pl-8 text-left ml-auto'}`}>
        <div 
          className={`${position === 'left' ? 'slide-in-left' : 'slide-in-right'} opacity-0`}
          style={{ animationDelay: `${delay}s` }}
        >
          <div className="flex items-center gap-3 justify-center">
            <Icon 
              className="w-6 h-6 text-primary bounce-elegant opacity-0" 
              style={{ animationDelay: `${delay + 0.3}s` }}
            />
            <span className="text-lg font-medium text-foreground">{title}</span>
          </div>
        </div>
      </div>
      
      {/* Timeline point */}
      <div 
        className="absolute left-1/2 transform -translate-x-1/2 timeline-point opacity-0"
        style={{ animationDelay: `${delay + 0.5}s`, animation: `bounceElegant 0.6s ease-out ${delay + 0.5}s forwards` }}
      ></div>
    </div>
  );
};

export default TimelineMilestone;