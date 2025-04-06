
import React from "react";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface FunctionIconProps extends React.HTMLAttributes<HTMLDivElement> {
  icon: LucideIcon;
  iconColor?: string;
  label?: string;
  sublabel?: string;
  connected?: boolean;
  connectionPosition?: "top" | "right" | "bottom" | "left" | "top-right" | "top-left" | "bottom-right" | "bottom-left";
}

export const FunctionIcon = ({ 
  icon: Icon,
  iconColor = "text-brand-blue",
  label,
  sublabel,
  connected = true,
  connectionPosition = "top",
  className,
  ...props 
}: FunctionIconProps) => {
  
  const getConnectionStyles = () => {
    if (!connected) return "";
    
    const baseStyles = "absolute border-dashed border-2 z-0";
    
    switch (connectionPosition) {
      case "top":
        return `${baseStyles} left-1/2 -translate-x-1/2 -top-[60px] h-[60px] w-0 border-l-2 border-r-0 border-b-0 border-t-0`;
      case "right":
        return `${baseStyles} top-1/2 -translate-y-1/2 -right-[60px] w-[60px] h-0 border-t-2 border-b-0 border-l-0 border-r-0`;
      case "bottom":
        return `${baseStyles} left-1/2 -translate-x-1/2 -bottom-[60px] h-[60px] w-0 border-l-2 border-r-0 border-b-0 border-t-0`;
      case "left":
        return `${baseStyles} top-1/2 -translate-y-1/2 -left-[60px] w-[60px] h-0 border-t-2 border-b-0 border-r-0 border-l-0`;
      // Add diagonal connections but actually we'll handle them with SVG lines in the main component
      case "top-right":
      case "top-left":
      case "bottom-right":
      case "bottom-left":
        return ""; // These are handled by the SVG in the parent component
      default:
        return "";
    }
  };
  
  return (
    <div className={cn("relative group", className)} {...props}>
      {/* Linha de conexão pontilhada */}
      {connected && connectionPosition && !connectionPosition.includes("-") && (
        <div 
          className={cn(
            getConnectionStyles(), 
            iconColor.replace("text-", "border-")
          )}
        />
      )}
      
      {/* Icon */}
      <div className="relative flex flex-col items-center">
        <div className={cn("relative w-14 h-14 p-3 rounded-full flex items-center justify-center transition-all group-hover:scale-110", `bg-${iconColor.split('-')[1]}/10`)}>
          <Icon className={cn(iconColor, "w-8 h-8")} />
          
          {/* Efeito de pulsação */}
          <span className={cn("absolute inset-0 rounded-full opacity-0 group-hover:opacity-70 animate-ping", `bg-${iconColor.split('-')[1]}/30`)} />
        </div>
        
        {/* Label */}
        {label && (
          <div className="mt-3 text-center">
            <p className="font-medium text-gray-800">{label}</p>
            {sublabel && <p className="text-xs text-gray-500">{sublabel}</p>}
          </div>
        )}
      </div>
    </div>
  );
};
