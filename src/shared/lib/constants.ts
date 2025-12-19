import type { Sizes, Variants } from "./types";

export const VARIANTS: Variants = {
  default: "bg-slate-100 text-slate-900 hover:bg-slate-200 transition-all duration-200 font-semibold rounded-lg shadow-sm border border-slate-200",
  primary: "bg-[#1B2A41] text-white hover:bg-[#253956] transition-all duration-200 font-semibold rounded-lg shadow-md border border-[#1B2A41]",
  secondary: "bg-[#F59E0B] text-white hover:bg-[#d97706] transition-all duration-200 font-semibold rounded-lg shadow-md border border-[#F59E0B]",
  success: "bg-emerald-600 text-white hover:bg-emerald-700 transition-all duration-200 font-semibold rounded-lg shadow-sm",
  error: "bg-rose-600 text-white hover:bg-rose-700 transition-all duration-200 font-semibold rounded-lg shadow-sm",
  icon: "p-2 hover:bg-slate-100 rounded-full transition-colors",
  ghost: "bg-transparent hover:bg-slate-50 text-slate-600 transition-all duration-200 font-medium",
};

export const SIZES: Sizes = {
  default: "py-2.5 px-6 text-sm",
  sm: "py-1.5 px-3 text-xs",
  lg: "py-3.5 px-8 text-base",
};
