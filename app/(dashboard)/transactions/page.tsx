import { Metadata } from "next"
import { TransactionsTable } from "@/components/transactions-table"

export const metadata: Metadata = {
  title: "Transactions | Portfolio Storyteller",
  description: "View your transaction history",
}

export default function TransactionsPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Transactions</h2>
      </div>
      <TransactionsTable />
    </div>
  )
}

