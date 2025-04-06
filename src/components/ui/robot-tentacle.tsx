
import React from "react";
import { cn } from "@/lib/utils";

interface RobotTentacleProps extends React.SVGProps<SVGSVGElement> {
  direction?: "up" | "down" | "left" | "right";
  animated?: boolean;
}

export const RobotTentacle = ({ 
  direction = "down", 
  animated = true, 
  className,
  ...props 
}: RobotTentacleProps) => {
  const getAnimationClass = () => {
    if (!animated) return "";
    
    switch (direction) {
      case "up": return "animate-tentacle-up";
      case "down": return "animate-tentacle-down";
      case "left": return "animate-tentacle-left";
      case "right": return "animate-tentacle-right";
      default: return "animate-tentacle-down";
    }
  };

  const getTransform = () => {
    switch (direction) {
      case "up": return "rotate(0)";
      case "down": return "rotate(180)";
      case "left": return "rotate(270)";
      case "right": return "rotate(90)";
      default: return "rotate(0)";
    }
  };
  
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("robot-tentacle", getAnimationClass(), className)}
      style={{ transform: getTransform() }}
      {...props}
    >
      <path d="M12 2v4" className="tentacle-base" />
      <path d="M12 6c0 3 4 3 4 6s-4 3-4 6v2" className="tentacle-segment" />
      <circle cx="12" cy="20" r="2" className="tentacle-end" />
    </svg>
  );
};
