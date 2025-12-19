import type { FC, PropsWithChildren } from "react";
import { cn } from "../../shared/lib/utils";

type HeaderProps = PropsWithChildren & {
    className?: string;
}

export const Header: FC<HeaderProps> = ({
    children,
    className,
}) => {
    return (
        <header
            className={cn(
                "glass-header px-6 py-4 flex justify-between items-center",
                className
            )}
        >
            {children}
        </header>
    );
};