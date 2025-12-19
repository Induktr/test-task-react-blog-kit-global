import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatDate = (dateValue: any): string => {
  if (!dateValue) return "Date unknown";

  let date: Date;

  if (dateValue && typeof dateValue.toDate === "function") {
    date = dateValue.toDate();
  } 

  else if (dateValue instanceof Date) {
    date = dateValue;
  } 
  
  else if (dateValue && typeof dateValue === 'object' && 'seconds' in dateValue) {
    date = new Date(dateValue.seconds * 1000);
  }
  
  else {
    date = new Date(dateValue);
  }
  
  if (Number.isNaN(date.getTime())) {
    return "Invalid Date";
  }

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });
};
