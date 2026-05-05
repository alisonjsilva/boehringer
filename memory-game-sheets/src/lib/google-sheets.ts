import { google, sheets_v4 } from 'googleapis'

const SCOPES = ['https://www.googleapis.com/auth/spreadsheets']

function getAuth() {
  const auth = new google.auth.JWT({
    email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    scopes: SCOPES,
  })
  return auth
}

export function getSheets(): sheets_v4.Sheets {
  const auth = getAuth()
  return google.sheets({ version: 'v4', auth })
}

export const SPREADSHEET_ID = process.env.GOOGLE_SPREADSHEET_ID!

// Sheet names (tabs in the spreadsheet)
export const SHEETS = {
  USERS: 'users',
  RANKING: 'ranking',
  LEGAL_TEXTS: 'legal_texts',
} as const

// Helper to get all rows from a sheet
export async function getRows(sheetName: string): Promise<any[][]> {
  const sheets = getSheets()
  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: SPREADSHEET_ID,
    range: `${sheetName}!A:Z`,
  })
  return response.data.values || []
}

// Helper to append a row to a sheet
export async function appendRow(sheetName: string, values: any[]): Promise<void> {
  const sheets = getSheets()
  await sheets.spreadsheets.values.append({
    spreadsheetId: SPREADSHEET_ID,
    range: `${sheetName}!A:Z`,
    valueInputOption: 'USER_ENTERED',
    requestBody: {
      values: [values],
    },
  })
}

// Helper to delete rows by condition
export async function deleteRowsByCondition(
  sheetName: string,
  columnIndex: number,
  value: string
): Promise<number> {
  const sheets = getSheets()
  const rows = await getRows(sheetName)

  if (rows.length <= 1) return 0 // Only header or empty

  // Find rows to delete (skip header row at index 0)
  const rowIndicesToDelete: number[] = []
  for (let i = 1; i < rows.length; i++) {
    if (rows[i][columnIndex] === value) {
      rowIndicesToDelete.push(i)
    }
  }

  if (rowIndicesToDelete.length === 0) return 0

  // Get the sheetId for the batch update
  const spreadsheet = await sheets.spreadsheets.get({
    spreadsheetId: SPREADSHEET_ID,
  })

  const sheet = spreadsheet.data.sheets?.find(
    (s) => s.properties?.title === sheetName
  )
  const sheetId = sheet?.properties?.sheetId

  if (sheetId === undefined) return 0

  // Delete rows in reverse order to maintain correct indices
  const requests = rowIndicesToDelete
    .sort((a, b) => b - a)
    .map((rowIndex) => ({
      deleteDimension: {
        range: {
          sheetId,
          dimension: 'ROWS' as const,
          startIndex: rowIndex,
          endIndex: rowIndex + 1,
        },
      },
    }))

  await sheets.spreadsheets.batchUpdate({
    spreadsheetId: SPREADSHEET_ID,
    requestBody: { requests },
  })

  return rowIndicesToDelete.length
}

// Generate a simple unique ID
export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substr(2, 9)
}
