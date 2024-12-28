import { Metadata } from "next"
import { AssetsTable } from "@/components/assets-table"

export const metadata: Metadata = {
  title: "Assets | Portfolio Storyteller",
  description: "Manage your crypto assets",
}

export default function AssetsPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Assets</h2>
      </div>
      <AssetsTable />
    </div>
  )
}

