"use client"

import { usePortfolioStore } from "@/store/use-portfolio-store"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"

export function AssetsList() {
  const { assets, isLoading } = usePortfolioStore()

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Assets</CardTitle>
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
        <CardTitle>Assets</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[300px]">
          <div className="space-y-4">
            {assets.map((asset) => (
              <div
                key={asset.symbol}
                className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/50"
              >
                <div className="flex items-center gap-2">
                  <div className="font-medium">{asset.symbol}</div>
                  <div className="text-sm text-muted-foreground">
                    {asset.amount.toFixed(4)}
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="font-medium">
                    ${asset.value.toLocaleString()}
                  </div>
                  <div
                    className={cn(
                      "text-sm",
                      asset.change24h >= 0 ? "text-green-500" : "text-red-500"
                    )}
                  >
                    {asset.change24h >= 0 ? "+" : ""}
                    {asset.change24h.toFixed(2)}%
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}

