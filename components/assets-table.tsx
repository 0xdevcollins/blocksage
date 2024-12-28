"use client"

import { useState } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ChevronDown, ChevronUp, ChevronsUpDown, MoreHorizontal } from 'lucide-react'
import { usePortfolioStore } from "@/store/use-portfolio-store"
import { Asset } from "@/store/use-portfolio-store"

export function AssetsTable() {
  const { assets, isLoading } = usePortfolioStore()
  const [sortConfig, setSortConfig] = useState<{
    key: keyof Asset
    direction: "asc" | "desc"
  }>({ key: "value", direction: "desc" })
  const [search, setSearch] = useState("")

  const sortedAssets = [...assets].sort((a, b) => {
    if (sortConfig.direction === "asc") {
      return a[sortConfig.key] > b[sortConfig.key] ? 1 : -1
    }
    return a[sortConfig.key] < b[sortConfig.key] ? 1 : -1
  })

  const filteredAssets = sortedAssets.filter((asset) =>
    asset.symbol.toLowerCase().includes(search.toLowerCase())
  )

  const requestSort = (key: keyof Asset) => {
    setSortConfig((current) => ({
      key,
      direction:
        current.key === key && current.direction === "asc" ? "desc" : "asc",
    }))
  }

  const getSortIcon = (key: keyof Asset) => {
    if (sortConfig.key !== key) return <ChevronsUpDown className="h-4 w-4" />
    return sortConfig.direction === "asc" ? (
      <ChevronUp className="h-4 w-4" />
    ) : (
      <ChevronDown className="h-4 w-4" />
    )
  }

  if (isLoading) {
    return (
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Asset</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Value</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>24h Change</TableHead>
              <TableHead>Chain</TableHead>
              <TableHead />
            </TableRow>
          </TableHeader>
          <TableBody>
            {[...Array(5)].map((_, i) => (
              <TableRow key={i}>
                {[...Array(7)].map((_, j) => (
                  <TableCell key={j}>
                    <div className="h-4 w-24 animate-pulse rounded bg-muted" />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <Input
          placeholder="Search assets..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-sm"
        />
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>
                <Button
                  variant="ghost"
                  onClick={() => requestSort("symbol")}
                  className="flex items-center gap-1"
                >
                  Asset
                  {getSortIcon("symbol")}
                </Button>
              </TableHead>
              <TableHead>
                <Button
                  variant="ghost"
                  onClick={() => requestSort("amount")}
                  className="flex items-center gap-1"
                >
                  Amount
                  {getSortIcon("amount")}
                </Button>
              </TableHead>
              <TableHead>
                <Button
                  variant="ghost"
                  onClick={() => requestSort("value")}
                  className="flex items-center gap-1"
                >
                  Value
                  {getSortIcon("value")}
                </Button>
              </TableHead>
              <TableHead>
                <Button
                  variant="ghost"
                  onClick={() => requestSort("price")}
                  className="flex items-center gap-1"
                >
                  Price
                  {getSortIcon("price")}
                </Button>
              </TableHead>
              <TableHead>
                <Button
                  variant="ghost"
                  onClick={() => requestSort("change24h")}
                  className="flex items-center gap-1"
                >
                  24h Change
                  {getSortIcon("change24h")}
                </Button>
              </TableHead>
              <TableHead>
                <Button
                  variant="ghost"
                  onClick={() => requestSort("chain")}
                  className="flex items-center gap-1"
                >
                  Chain
                  {getSortIcon("chain")}
                </Button>
              </TableHead>
              <TableHead />
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAssets.map((asset) => (
              <TableRow key={asset.symbol}>
                <TableCell className="font-medium">{asset.symbol}</TableCell>
                <TableCell>{asset.amount.toFixed(4)}</TableCell>
                <TableCell>${asset.value.toLocaleString()}</TableCell>
                <TableCell>${asset.price.toLocaleString()}</TableCell>
                <TableCell
                  className={
                    asset.change24h >= 0 ? "text-green-500" : "text-red-500"
                  }
                >
                  {asset.change24h >= 0 ? "+" : ""}
                  {asset.change24h.toFixed(2)}%
                </TableCell>
                <TableCell>{asset.chain}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>View Details</DropdownMenuItem>
                      <DropdownMenuItem>View on Explorer</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

