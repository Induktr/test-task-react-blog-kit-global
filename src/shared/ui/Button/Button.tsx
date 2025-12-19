import type { FC } from "react";
import { cn } from "../../lib/utils";
import { VARIANTS, SIZES } from "../../lib/constants";
import type { ButtonProps } from "../../lib/types";

export const Button: FC<ButtonProps> = ({
  children,
  variant = "default",
  size = "default",
  className,
  fullWidth = false,
  ...props
}) => {
  return (
    <button
      {...props}
      className={cn(
        "inline-flex items-center justify-center gap-2 transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed",
        VARIANTS[variant],
        SIZES[size],
        fullWidth && "w-full",
        // Mobile-first: full-width on mobile if requested or by default for primary buttons in some contexts
        className
      )}
    >
      {children}
    </button>
  );
};