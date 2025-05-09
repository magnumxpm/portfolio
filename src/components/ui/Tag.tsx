import { TagProps } from "@/types";
import { cn } from "@/lib/utils";

/**
 * Reusable tag component used across the application
 */
export function Tag({ tag, className }: TagProps) {
  return (
    <div
      className={cn(
        "border px-2 py-1 rounded-full font-code text-xs text-gray-300 transition-all duration-700 delay-75",
        className
      )}
    >
      {tag}
    </div>
  );
}

/**
 * Variant of Tag used in the hero section with different styling
 */
export function HeroTag({ tag, className }: TagProps) {
  return (
    <div
      className={cn(
        "bg-gray-100 px-2 py-1 rounded-md font-code text-sm sm:text-base_mobile transition-all duration-700 delay-75",
        className
      )}
    >
      {tag}
    </div>
  );
}