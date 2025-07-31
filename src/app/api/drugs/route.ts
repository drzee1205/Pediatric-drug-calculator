import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const systemId = searchParams.get('systemId')

    if (!systemId) {
      return NextResponse.json(
        { error: 'System ID is required' },
        { status: 400 }
      )
    }

    const drugs = await db.drug.findMany({
      where: {
        medicalSystemId: systemId
      },
      orderBy: {
        name: 'asc'
      }
    })

    return NextResponse.json(drugs)
  } catch (error) {
    console.error('Error fetching drugs:', error)
    return NextResponse.json(
      { error: 'Failed to fetch drugs' },
      { status: 500 }
    )
  }
}