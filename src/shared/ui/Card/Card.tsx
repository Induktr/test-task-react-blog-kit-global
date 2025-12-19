import type { FC, HTMLAttributes, PropsWithChildren } from "react";
import { cn } from "../../lib/utils";

type CardProps = PropsWithChildren<HTMLAttributes<HTMLDivElement>> & {
  variant?: "default" | "flat" | "elevated";
  className?: string;
};

const cardVariants = {
  default: "bg-white border border-slate-200",
  flat: "bg-slate-50 border border-slate-100",
  elevated: "bg-white border border-slate-100 shadow-xl shadow-slate-200/50",
};

export const Card: FC<CardProps> = ({
  children,
  variant = "default",
  className,
  ...props
}) => {
  return (
    <div
      {...props}
      className={cn(
        "rounded-2xl transition-all duration-300",
        cardVariants[variant],
        className
      )}
    >
      {children}
    </div>
  );
};