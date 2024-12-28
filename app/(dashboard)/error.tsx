"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { BadgeInfo } from "lucide-react"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="flex h-[calc(100vh-4rem)] flex-col items-center justify-center gap-4">
      <BadgeInfo className="h-8 w-8 text-destructive" />
      <h2 className="text-2xl font-bold">Something went wrong!</h2>
      <p className="text-muted-foreground">
        An error occurred while loading this page.
      </p>
      <Button
        variant="outline"
        onClick={() => reset()}
      >
        Try again
      </Button>
    </div>
  )
}

