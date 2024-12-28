"use client"

import { usePortfolioStore } from "@/store/use-portfolio-store"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Brain, AlertTriangle, TrendingUp, Info } from 'lucide-react'
import { formatDistanceToNow } from "date-fns"

export function InsightsList() {
  const { insights, isLoading } = usePortfolioStore()

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <Card key={i}>
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="h-8 w-8 animate-pulse rounded bg-muted" />
                <div className="space-y-2 flex-1">
                  <div className="h-4 w-48 animate-pulse rounded bg-muted" />
                  <div className="h-16 w-full animate-pulse rounded bg-muted" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  const getInsightIcon = (type: string) => {
    switch (type) {
      case "warning":
        return <AlertTriangle className="h-6 w-6 text-yellow-500" />
      case "opportunity":
        return <TrendingUp className="h-6 w-6 text-green-500" />
      default:
        return <Info className="h-6 w-6 text-blue-500" />
    }
  }

  const getImportanceBadge = (importance: number) => {
    if (importance >= 8) return "High"
    if (importance >= 5) return "Medium"
    return "Low"
  }

  const getImportanceColor = (importance: number) => {
    if (importance >= 8) return "destructive"
    if (importance >= 5) return "warning"
    return "secondary"
  }

  return (
    <ScrollArea className="h-[calc(100vh-12rem)]">
      <div className="space-y-4 pr-4">
        {insights.map((insight) => (
          <Card key={insight.id}>
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                {getInsightIcon(insight.type)}
                <div className="space-y-2 flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold">{insight.title}</h3>
                    <Badge variant={getImportanceColor(insight.importance)}>
                      {getImportanceBadge(insight.importance)}
                    </Badge>
                  </div>
                  <p className="text-muted-foreground">{insight.description}</p>
                  {insight.relatedAssets && (
                    <div className="flex gap-2 mt-2">
                      {insight.relatedAssets.map((asset) => (
                        <Badge key={asset} variant="outline">
                          {asset}
                        </Badge>
                      ))}
                    </div>
                  )}
                  <p className="text-sm text-muted-foreground">
                    {formatDistanceToNow(new Date(insight.timestamp), {
                      addSuffix: true,
                    })}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </ScrollArea>
  )
}

