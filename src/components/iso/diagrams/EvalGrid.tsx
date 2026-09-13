import { evalGrid } from "@/data/isoDiagrams"

import { IsoBox } from "../IsoBox"
import { IsoScene } from "../IsoScene"

const CELL = 3

/**
 * Eval cells on a plane: a pass is a low tile, a failure a tall accent column.
 * Reads instantly at thumbnail size without a single glyph.
 */
export function EvalGrid() {
	const rows = evalGrid.length
	const cols = evalGrid[0].length
	const total = rows * cols
	const failures = evalGrid.flat().filter((pass) => !pass).length

	return (
		<IsoScene
			uid="eval-grid"
			width={360}
			bounds={{ min: [0, 0, 0], max: [cols * CELL, rows * CELL, 4] }}
			title="Evaluation harness results"
			desc={`${total - failures} of ${total} evaluation cases passing; failures stand out as tall columns.`}
		>
			{/* Back to front so nearer columns occlude farther ones. */}
			{evalGrid.flatMap((row, j) =>
				row.map((pass, i) => (
					<IsoBox
						key={`${i}-${j}`}
						origin={[i * CELL, j * CELL, 0]}
						size={[CELL - 0.4, CELL - 0.4, pass ? 0.4 : 3]}
						tone={pass ? "base" : "accent"}
						seam={false}
						step={i + j}
					/>
				))
			)}
		</IsoScene>
	)
}
