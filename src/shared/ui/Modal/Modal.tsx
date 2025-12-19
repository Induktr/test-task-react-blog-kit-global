import clsx from "clsx";
import type { FC, PropsWithChildren } from "react";

type ModalProps = PropsWithChildren & {
    onClose: () => void;
    variant?: "default" | "danger";
}

export const Modal: FC<ModalProps> = ({ children, onClose, variant = "default" }) => {
    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        >
            <div
                onClick={onClose}
                className={clsx(
                    "bg-white p-6 rounded shadow-lg",
                    variant === "danger" && "bg-red-500"
                )}
            >
                {children}
            </div>
        </div>
    )
}