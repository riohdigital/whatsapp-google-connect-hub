
import React from "react";
import { RobotTentacle } from "./robot-tentacle";
import { cn } from "@/lib/utils";

interface RobotAssistantProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "sm" | "md" | "lg";
  tentacleCount?: number;
}

export const RobotAssistant = ({ 
  size = "md", 
  tentacleCount = 4,
  className,
  ...props 
}: RobotAssistantProps) => {
  const directions = ["up", "down", "left", "right"] as const;
  const tentacles = Array.from({ length: tentacleCount }).map((_, i) => ({
    direction: directions[i % directions.length],
    delay: `${i * 0.1}s`
  }));
  
  const sizeClasses = {
    sm: "w-10 h-10",
    md: "w-20 h-20",
    lg: "w-32 h-32",
  };
  
  return (
    <div className={cn("relative", sizeClasses[size], className)} {...props}>
      {/* Robot Body */}
      <div className="absolute inset-0 bg-brand-blue rounded-full flex items-center justify-center shadow-md overflow-hidden">
        {/* Robot Face */}
        <div className="w-1/2 h-1/2 bg-white rounded-full flex items-center justify-center">
          <div className="w-3/4 h-3/4 flex items-center justify-center">
            <div className="w-1/3 h-1/3 bg-brand-blue rounded-full animate-pulse-slow" />
          </div>
        </div>
        
        {/* Tentacles */}
        {tentacles.map((tentacle, index) => (
          <RobotTentacle 
            key={index}
            direction={tentacle.direction}
            className={`absolute w-full h-full opacity-70 text-brand-blue`}
            style={{ 
              animationDelay: tentacle.delay,
              opacity: 0.7,
              filter: "drop-shadow(0 0 2px rgba(66, 133, 244, 0.5))"
            }}
          />
        ))}
      </div>
    </div>
  );
};
