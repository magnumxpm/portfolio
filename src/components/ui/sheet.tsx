"use client"

import * as React from "react"
import * as SheetPrimitive from "@radix-ui/react-dialog"
import { X } from "lucide-react"

import { cn } from "@/lib/utils"

const Sheet = SheetPrimitive.Root
const SheetTrigger = SheetPrimitive.Trigger
const SheetClose = SheetPrimitive.Close

const SheetOverlay = React.forwardRef<
	React.ElementRef<typeof SheetPrimitive.Overlay>,
	React.ComponentPropsWithoutRef<typeof SheetPrimitive.Overlay>
>(({ className, ...props }, ref) => (
	<SheetPrimitive.Overlay
		ref={ref}
		className={cn(
			"fixed inset-0 z-50 bg-black/70 backdrop-blur-sm",
			"data-[state=open]:animate-in data-[state=open]:fade-in-0",
			"data-[state=closed]:animate-out data-[state=closed]:fade-out-0",
			className
		)}
		{...props}
	/>
))
SheetOverlay.displayName = SheetPrimitive.Overlay.displayName

interface SheetContentProps
	extends React.ComponentPropsWithoutRef<typeof SheetPrimitive.Content> {
	side?: "right" | "left"
	title?: string
}

const SheetContent = React.forwardRef<
	React.ElementRef<typeof SheetPrimitive.Content>,
	SheetContentProps
>(({ side = "right", title = "Navigation", className, children, ...props }, ref) => (
	<SheetPrimitive.Portal>
		<SheetOverlay />
		<SheetPrimitive.Content
			ref={ref}
			className={cn(
				"fixed inset-y-0 z-50 flex w-72 flex-col border-line bg-bg p-6 shadow-2xl",
				"transition ease-out data-[state=open]:duration-300 data-[state=closed]:duration-200",
				side === "right"
					? "right-0 border-l data-[state=open]:animate-in data-[state=open]:slide-in-from-right data-[state=closed]:animate-out data-[state=closed]:slide-out-to-right"
					: "left-0 border-r data-[state=open]:animate-in data-[state=open]:slide-in-from-left data-[state=closed]:animate-out data-[state=closed]:slide-out-to-left",
				className
			)}
			{...props}
		>
			{/* Radix requires a title for the dialog to be announced correctly; it is
			    visually hidden because the panel is obviously a nav menu on screen. */}
			<SheetPrimitive.Title className="sr-only">{title}</SheetPrimitive.Title>
			<SheetClose
				aria-label="Close navigation menu"
				className="absolute right-5 top-5 text-fg-dim transition-colors duration-200 ease-out hover:text-fg"
			>
				<X className="size-4" aria-hidden="true" />
			</SheetClose>
			{children}
		</SheetPrimitive.Content>
	</SheetPrimitive.Portal>
))
SheetContent.displayName = SheetPrimitive.Content.displayName

export { Sheet, SheetClose, SheetContent, SheetTrigger }
