import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const drugId = searchParams.get('drugId')

    if (!drugId) {
      return NextResponse.json(
        { error: 'Drug ID is required' },
        { status: 400 }
      )
    }

    const dosages = await db.dosage.findMany({
      where: {
        drugId: drugId
      },
      orderBy: {
        ageGroup: 'asc'
      }
    })

    return NextResponse.json(dosages)
  } catch (error) {
    console.error('Error fetching dosages:', error)
    return NextResponse.json(
      { error: 'Failed to fetch dosages' },
      { status: 500 }
    )
  }
}