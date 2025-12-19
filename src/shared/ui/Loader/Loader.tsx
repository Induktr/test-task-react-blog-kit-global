import type { FC } from "react";
import { Loader2 } from "lucide-react";
import { cn } from "../../lib/utils";

interface LoaderProps {
  className?: string;
  size?: number;
}

export const Loader: FC<LoaderProps> = ({ className, size = 48 }) => {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center w-full py-20 gap-6",
        className
      )}
    >
      <div className="relative">
        <Loader2 
            className="animate-spin text-[#1B2A41]" 
            size={size} 
            strokeWidth={3}
        />
        <div className="absolute inset-0 animate-ping opacity-20 bg-[#F59E0B] rounded-full scale-150" />
      </div>
      
      <div className="flex flex-col items-center gap-1">
        <span className="text-sm font-black text-[#1B2A41] uppercase tracking-[0.3em] font-sora">
          Building Insights
        </span>
        <div className="flex gap-1">
            <div className="w-1.5 h-1.5 bg-[#F59E0B] rounded-full animate-bounce [animation-delay:-0.3s]" />
            <div className="w-1.5 h-1.5 bg-[#F59E0B] rounded-full animate-bounce [animation-delay:-0.15s]" />
            <div className="w-1.5 h-1.5 bg-[#F59E0B] rounded-full animate-bounce" />
        </div>
      </div>
    </div>
  );
};
