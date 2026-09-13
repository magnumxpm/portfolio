import type { FocusItem } from "@/types"

/**
 * Capability areas, deliberately stated as what the work *is* rather than as
 * claimed outcomes. Expand these only with details that are actually true.
 */
export const focusData: FocusItem[] = [
	{
		id: "orchestration",
		title: "Agent Orchestration",
		description: "Multi-step agent graphs in LangGraph, rather than one-shot prompts.",
		keywords: ["LangGraph", "State machines", "Tool routing"],
	},
	{
		id: "rag",
		title: "RAG & Knowledge Engineering",
		description: "Retrieval pipelines and the knowledge modelling that makes a corpus answerable.",
		keywords: ["Retrieval", "Chunking", "Knowledge modelling"],
	},
	{
		id: "agentops",
		title: "AgentOps & Deployments",
		description: "Shipping agents as deployed services, with the operational tooling around them.",
		keywords: ["Deployment", "Tracing", "Observability"],
	},
	{
		id: "harness",
		title: "Harness Engineering",
		description: "Harnesses that exercise and evaluate agent behaviour.",
		keywords: ["Evals", "Regression", "Scoring"],
	},
]
