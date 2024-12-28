import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const { address } = await req.json()
    
    // Fetch portfolio data
    const portfolioData = await getPortfolioData(address)
    
    // Generate AI insights
    const insights = await generateInsights(portfolioData)
    
    return NextResponse.json({
      portfolioData,
      insights,
    })
  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch portfolio data' },
      { status: 500 }
    )
  }
}

