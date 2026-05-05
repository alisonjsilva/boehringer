import { shuffleArray } from '@/libs/utils'
import { NextResponse } from 'next/server'

export async function POST( request: Request ): Promise<NextResponse<string[]>> {
  const { query, num, day } = await request.json()

  const randomResults = [
    `/v3/icons/${day}/01.png`,
    `/v3/icons/${day}/02.png`,
    `/v3/icons/${day}/03.png`,
    `/v3/icons/${day}/04.png`,
    `/v3/icons/${day}/05.png`,
    `/v3/icons/${day}/06.png`,
    `/v3/icons/${day}/07.png`,
    `/v3/icons/${day}/08.png`,
  ]

  return NextResponse.json(randomResults)
}