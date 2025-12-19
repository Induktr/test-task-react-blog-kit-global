import type { FC } from "react";
import { useNavigate } from "react-router-dom";
import { Inbox, AlertTriangle, Home, PlusCircle, RefreshCw } from "lucide-react";
import { PATHS } from "../../config/paths";
import { Button } from "../Button/Button";
import { cn } from "../../lib/utils";

interface NotFoundProps {
  type?: "page" | "empty" | "error";
  message?: string;
  className?: string;
  onAction?: () => void;
  actionText?: string;
  showAction?: boolean;
}

export const NotFound: FC<NotFoundProps> = ({
  type = "page",
  message,
  className,
  onAction,
  actionText,
  showAction = true,
}) => {
  const navigate = useNavigate();

  const configs = {
    page: {
      icon: <Home className="w-16 h-16 text-slate-200" />,
      title: "404",
      defaultMessage: "Area Restricted: The requested industrial document does not exist.",
      buttonText: "Return to Base",
      buttonIcon: <Home className="w-4 h-4 mr-2" />,
      onButtonClick: () => navigate(PATHS.INDEX),
      titleClassName: "text-[12rem] font-black leading-none text-slate-100 select-none",
      contentClassName: "-mt-16",
    },
    empty: {
      icon: <Inbox className="w-16 h-16 text-[#F59E0B]" />,
      title: null,
      defaultMessage: message || "No architectural insights discovered in this sector.",
      buttonText: actionText || "Launch New Project",
      buttonIcon: <PlusCircle className="w-4 h-4 mr-2" />,
      onButtonClick: onAction || (() => navigate(PATHS.CREATE)),
      titleClassName: "",
      contentClassName: "",
    },
    error: {
      icon: <AlertTriangle className="w-16 h-16 text-rose-500" />,
      title: "STRUCTURAL FAILURE",
      defaultMessage: message || "Critical error detected while retrieving professional data.",
      buttonText: actionText || "Retry Request",
      buttonIcon: <RefreshCw className="w-4 h-4 mr-2" />,
      onButtonClick: onAction || (() => window.location.reload()),
      titleClassName: "text-2xl font-black text-rose-600 tracking-tighter mb-2",
      contentClassName: "",
    },
  };

  const config = configs[type];

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center w-full min-h-[500px] p-12 text-center",
        className
      )}
    >
      {config.title && (
        <div className={cn("font-sora", config.titleClassName)}>
          {config.title}
        </div>
      )}
      
      <div className={cn("flex flex-col items-center gap-6", config.contentClassName)}>
        <div className="p-6 bg-slate-50 rounded-[2rem] border border-slate-100 shadow-sm mb-2">
            {config.icon}
        </div>
        
        <p className="text-xl font-bold text-[#1B2A41] max-w-lg leading-relaxed font-sora">
          {message || config.defaultMessage}
        </p>

        {showAction && config.onButtonClick && (
          <Button
            variant={type === "error" ? "secondary" : "primary"}
            className="mt-6 px-10 h-14 rounded-2xl text-base font-black uppercase tracking-widest shadow-xl shadow-[#1B2A41]/10"
            onClick={config.onButtonClick}
          >
            {config.buttonIcon}
            {config.buttonText}
          </Button>
        )}
      </div>
    </div>
  );
};