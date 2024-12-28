import { Metadata } from "next"
// import { PortfolioOverview } from "@/components/portfolio-overview"
import { AssetsList } from "@/components/assets-list"
import { RecentTransactions } from "@/components/recent-transactions"

export const metadata: Metadata = {
  title: "Dashboard | Portfolio Storyteller",
  description: "View your crypto portfolio and insights",
}

export default function DashboardPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        {/* <PortfolioOverview className="col-span-4" /> */}
        <div className="col-span-3 space-y-4">
          <AssetsList />
          <RecentTransactions />
        </div>
      </div>
    </div>
  )
}

