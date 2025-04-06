
import React from "react";
import { cn } from "@/lib/utils";
import { RobotTentacle } from "./robot-tentacle";
import { LucideIcon } from "lucide-react";

interface FunctionIconProps extends React.HTMLAttributes<HTMLDivElement> {
  icon: LucideIcon;
  iconColor?: string;
  tentacleColor?: string;
  tentacleDirection?: "up" | "down" | "left" | "right";
  label?: string;
  sublabel?: string;
}

export const FunctionIcon = ({ 
  icon: Icon,
  iconColor = "text-brand-blue",
  tentacleColor = "text-brand-blue/50",
  tentacleDirection = "up",
  label,
  sublabel,
  className,
  ...props 
}: FunctionIconProps) => {
  return (
    <div className={cn("relative p-4 rounded-lg bg-white shadow-sm border border-gray-100 hover:shadow-md transition-all", className)} {...props}>
      <div className="relative w-12 h-12 mx-auto mb-3">
        {/* Main Icon */}
        <div className={cn("absolute inset-0 rounded-full flex items-center justify-center z-10", `bg-${iconColor.split('-')[1]}/10`)}>
          <Icon className={cn(iconColor, "w-6 h-6")} />
        </div>
        
        {/* Tentacle */}
        <div className="absolute inset-0 z-0">
          <RobotTentacle 
            direction={tentacleDirection}
            className={cn(tentacleColor, "w-full h-full")}
          />
        </div>
      </div>
      
      {label && <p className="font-medium text-center">{label}</p>}
      {sublabel && <p className="text-xs text-gray-500 text-center">{sublabel}</p>}
    </div>
  );
};
