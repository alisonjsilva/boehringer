export const getRandomImages = async (query: string, num: number, day: number = 1): Promise<string[]> => {
  const response = await fetch(
    '/api/images-generator',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query,
        num,
        day
      }),
    }
  )

  return await response.json()
}