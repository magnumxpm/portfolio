import { MoveUpRight } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface ExternalLinkProps {
  href: string;
  className?: string;
  variant?: "default" | "big";
  children: ReactNode;
}

export function ExternalLink({
  href,
  className,
  variant = "default",
  children,
}: ExternalLinkProps) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "flex items-center gap-1 w-fit group outline-none",
        variant === "big" 
          ? "font-semibold text-base sm:text-md" 
          : "text-base_mobile sm:text-base",
        className
      )}
    >
      <div className="border-b-2 border-black group-hover:text-theme group-hover:border-theme group-focus:text-theme group-focus:border-theme">
        {children}
      </div>

      <MoveUpRight
        className={cn(
          variant === "big"
            ? "group-hover:text-theme_light group-focus:text-theme_light"
            : "group-hover:text-theme group-focus:text-theme"
        )}
      />
    </Link>
  );
}