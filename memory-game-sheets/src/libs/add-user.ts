export const addUser = async (name: string): Promise<any> => {
  const response = await fetch(
    '/api/add-user',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
      }),
    }
  )

  return await response.json()
}