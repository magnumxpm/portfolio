import "@testing-library/jest-dom"

// jsdom has no canvas, no rAF-driven layout, and no observers. The background
// field is decorative, so tests stub it rather than exercising it.
global.ResizeObserver = class {
	observe() {}
	unobserve() {}
	disconnect() {}
} as unknown as typeof ResizeObserver

global.IntersectionObserver = class {
	readonly root = null
	readonly rootMargin = ""
	readonly thresholds: ReadonlyArray<number> = []
	observe() {}
	unobserve() {}
	disconnect() {}
	takeRecords(): IntersectionObserverEntry[] {
		return []
	}
} as unknown as typeof IntersectionObserver

if (!window.matchMedia) {
	window.matchMedia = ((query: string) => ({
		matches: false,
		media: query,
		onchange: null,
		addEventListener: () => {},
		removeEventListener: () => {},
		addListener: () => {},
		removeListener: () => {},
		dispatchEvent: () => false,
	})) as unknown as typeof window.matchMedia
}
