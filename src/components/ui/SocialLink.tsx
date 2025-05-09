import { SocialLinkProps } from "@/types";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Icon } from "@iconify/react";

/**
 * Social media link component with icon
 */
export function SocialLink({ icon, href, className }: SocialLinkProps) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "p-2 border group rounded-lg focus:outline-none focus:border-theme_light opacity-0",
        className
      )}
    >
      <Icon
        icon={icon}
        className="h-5 w-5 opacity-50 group-hover:opacity-100 group-focus:opacity-100"
      />
    </Link>
  );
}