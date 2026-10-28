import Link from "next/link"
import { ArrowLeft } from "lucide-react"

interface Crumb {
	href: string
	label: string
}

/**
 * The home page's nav is anchor links into one long page, which mean nothing
 * here. Subpages get a static bar instead: the brand mark home, then a
 * breadcrumb, all server-rendered.
 */
export function SubpageHeader({ crumbs }: { crumbs: Crumb[] }) {
	return (
		<header className="relative z-10">
			<nav className="shell flex min-h-16 items-center gap-4 py-3" aria-label="Breadcrumb">
				<Link
					href="/"
					className="nav-pill font-mono text-meta uppercase tracking-[0.14em] text-fg transition-colors duration-200 ease-out hover:text-accent"
				>
					PM
					<span className="text-accent">.</span>
				</Link>
				<ol className="flex min-w-0 items-center gap-3 font-mono text-meta text-fg-faint">
					{crumbs.map((crumb, i) => {
						const last = i === crumbs.length - 1
						return (
							<li key={crumb.href} className="flex min-w-0 items-center gap-3">
								<span aria-hidden="true">/</span>
								{last ? (
									<span aria-current="page" className="truncate text-fg-dim">
										{crumb.label}
									</span>
								) : (
									<Link href={crumb.href} className="sweep truncate transition-colors duration-200 ease-out hover:text-accent">
										{crumb.label}
									</Link>
								)}
							</li>
						)
					})}
				</ol>
				<Link
					href={crumbs.length > 1 ? crumbs[crumbs.length - 2].href : "/"}
					className="ml-auto hidden items-center gap-1.5 font-mono text-meta text-fg-faint transition-colors duration-200 ease-out hover:text-accent sm:inline-flex"
				>
					<ArrowLeft aria-hidden="true" className="size-3.5" />
					Back
				</Link>
			</nav>
		</header>
	)
}
