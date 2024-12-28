import { Metadata } from "next"
import { InsightsList } from "@/components/insights-list"

export const metadata: Metadata = {
  title: "AI Insights | Portfolio Storyteller",
  description: "AI-powered insights for your portfolio",
}

export default function InsightsPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">AI Insights</h2>
      </div>
      <InsightsList />
    </div>
  )
}

