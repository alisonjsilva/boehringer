import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

const supabase = createClient(supabaseUrl, supabaseServiceKey)

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const day = searchParams.get('day') || '1'

  try {
    const { data, error } = await supabase
      .from('legal_texts')
      .select('text')
      .eq('day', parseInt(day))
      .single()

    if (error) {
      console.error('Error fetching legal text:', error)
      return NextResponse.json({ error: 'Failed to fetch legal text' }, { status: 500 })
    }

    return NextResponse.json({ text: data?.text || '' })
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
} 