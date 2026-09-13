import { elbow, handle, type Vec3 } from "@/lib/iso"
import { serviceStack } from "@/data/isoDiagrams"

import { IsoBox, IsoSlab } from "../IsoBox"
import { IsoLink } from "../IsoLink"
import { IsoScene } from "../IsoScene"
import { FOCUS_ASPECT } from "../aspect"

const SIZE = [7, 5, 3] as const

/** Services sitting on a runtime slab, with a trace threading through them. */
export function ServiceStack() {
	const { services } = serviceStack
	const at = (origin: Vec3, face: Parameters<typeof handle>[2]) =>
		handle(origin, SIZE, face)

	return (
		<IsoScene
			uid="service-stack"
			fit
			aspect={FOCUS_ASPECT}
			alive
			grid={[18, 14]}
			bounds={{ min: [0, 0, 0], max: [18, 14, 6] }}
			title="Deployed agent services"
			desc="An API, a worker running the agent loop and a trace store, all on one container runtime, with a request traced across them."
		>
			{/* The runtime the services sit on. Unlabelled: any caption here would
			    be occluded by the boxes standing on it, and the section copy
			    already says what it is. */}
			<IsoSlab origin={[0, 0, 0]} size={[18, 14]} tone="deep" step={0} />

			<IsoLink
				route={elbow(at(services[0].origin, "left"), at(services[1].origin, "top"))}
				active
				step={1}
			/>
			<IsoLink
				route={elbow(at(services[1].origin, "right"), at(services[2].origin, "left"))}
				active
				step={2}
			/>

			{services.map((s, i) => (
				<IsoBox
					key={s.id}
					origin={s.origin}
					size={SIZE}
					tone={i === 1 ? "accent" : "base"}
					step={i + 1}
				/>
			))}
		</IsoScene>
	)
}
