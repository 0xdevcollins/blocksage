"use client"

import { usePortfolioStore } from "@/store/use-portfolio-store"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { formatDistanceToNow } from "date-fns"

export function RecentTransactions() {
  const { transactions, isLoading } = usePortfolioStore()
  const recentTransactions = transactions.slice(0, 5)

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="flex items-center justify-between p-2 rounded-lg animate-pulse bg-muted"
              >
                <div className="w-32 h-4 bg-muted-foreground/20 rounded" />
                <div className="w-24 h-4 bg-muted-foreground/20 rounded" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Transactions</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[300px]">
          <div className="space-y-4">
            {recentTransactions.map((tx) => (
              <div
                key={tx.hash}
                className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/50"
              >
                <div className="flex flex-col gap-1">
                  <div className="font-medium">
                    {tx.type} {tx.symbol}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {formatDistanceToNow(new Date(tx.timestamp), {
                      addSuffix: true,
                    })}
                  </div>
                </div>
                <div className="font-medium">
                  {tx.type === "buy" ? "+" : "-"}
                  {tx.amount.toFixed(4)} {tx.symbol}
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}

