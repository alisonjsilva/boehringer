export const addUser = async (name: string, email: string, phone: string): Promise<any> => {
  const response = await fetch(
    '/api/add-user',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        email,
        phone
      }),
    }
  )

  return await response.json()
}