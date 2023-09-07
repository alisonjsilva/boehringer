export const getRandomImages = async (query: string, num: number): Promise<string[]> => {
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
      }),
    }
  )

  return await response.json()
}