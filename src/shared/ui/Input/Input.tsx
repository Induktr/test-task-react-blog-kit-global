import { type FC, type InputHTMLAttributes, forwardRef } from "react";
import { Search } from "lucide-react";
import { cn } from "../../lib/utils";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  variant?: "default" | "search";
  icon?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, variant = "default", icon = false, ...props }, ref) => {
    const isSearch = variant === "search" || icon;

    return (
      <div className={cn("relative flex items-center w-full group", className)}>
        {isSearch && (
          <Search className="absolute left-4 w-4 h-4 text-slate-400 group-focus-within:text-[#F59E0B] transition-colors" />
        )}
        <input
          {...props}
          ref={ref}
          className={cn(
            "w-full bg-slate-50 border border-slate-200 text-slate-900 text-sm rounded-xl transition-all duration-200",
            "focus:bg-white focus:ring-4 focus:ring-amber-500/10 focus:border-amber-500 outline-none",
            "placeholder:text-slate-400 font-medium",
            "py-2.5",
            isSearch ? "pl-11 pr-4" : "px-4",
          )}
        />
      </div>
    );
  }
);

Input.displayName = "Input";
