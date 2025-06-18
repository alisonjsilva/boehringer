import { shuffleArray } from '@/libs/utils'
import { NextResponse } from 'next/server'

const API_KEY = process.env.GOOGLE_API_KEY
const CX = process.env.GOOGLE_CX

export async function POST( request: Request ): Promise<NextResponse<string[]>> {
  const { query, num, day } = await request.json()
  console.log(query, num, day)

  let allResults: string[] = []

  // while (allResults.length < num) {
  //   try {
  //     const images = await imageSearch(query, num)
  //     allResults.push(...images)
  //   } catch (error) {
  //     console.error(error)
  //     break
  //   }
  // }

  // const randomResults = shuffleArray(allResults).slice(0, num)

  // const randomResults = [
  //   'https://cdn-images.farfetch-contents.com/14/57/19/42/14571942_23871757_600.jpg',
  //   'https://news.va.gov/wp-content/uploads/sites/3/2023/01/Steve_McQueen_VOD_FB.jpg?w=1200',
  //   'https://upload.wikimedia.org/wikipedia/commons/3/3e/Steve-McQueen-1968_%28cropped%29.jpg',
  //   'https://cdn-images.farfetch-contents.com/13/16/43/54/13164354_30455537_600.jpg',
  //   'https://cdn-images.farfetch-contents.com/14/57/19/42/14571942_23871744_600.jpg',
  //   'https://downtownreno.org/wp-content/uploads/2022/04/Lightning-McQueen-Front-1-scaled.jpg',
  //   'https://www.crepslocker.com/cdn/shop/products/Alexander-Mcqueen-Raised-Sole-Black-Velvet-Trainers-Back.jpg?v=1656343605',
  //   'https://amq-mcq.dam.kering.com/m/1d367a07c0f6c2b8/Medium-553680WHGP59000_F.jpg?v=8'
  // ]

  const randomResults = [
    `/v2/icons/${day}/01.png`,
    `/v2/icons/${day}/02.png`,
    `/v2/icons/${day}/03.png`,
    `/v2/icons/${day}/04.png`,
    `/v2/icons/${day}/05.png`,
    `/v2/icons/${day}/06.png`,
    `/v2/icons/${day}/07.png`,
    `/v2/icons/${day}/08.png`,
  ]

  console.log(randomResults)

  return NextResponse.json(randomResults)
}

const imageSearch = async (query: string, num: number) => {
  const randomPage = Math.floor(Math.random() * 50) + 1

  const url = `https://www.googleapis.com/customsearch/v1?key=${API_KEY}&cx=${CX}&q=${query}&start=${randomPage}&searchType=image`

  try {
    const response = await fetch(url)
    const data = await response.json()

    if (!response.ok || !data.items || data.items.length === 0) {
      throw new Error(
        data.error?.message || 'Failed to fetch images from Google Search API.'
      )
    }

    const imageUrls = data.items
      .filter((item: any) => {
        const extensions = ['.jpg', '.png', '.jpeg', '.webp']
        return extensions.some((ext) => item.link.endsWith(ext))
      })
      .map((item: any) => item.link)

    return imageUrls
  } catch (error: any) {
    throw new Error(
      error.message || 'Failed to fetch images from Google Search API.'
    )
  }
}