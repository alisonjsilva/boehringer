import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// For server-side operations
export const createServerSupabaseClient = () => {
  return createClient(supabaseUrl, supabaseAnonKey)
}

// For administrative operations (DELETE, UPDATE with RLS bypassing)
export const createAdminSupabaseClient = () => {
  return createClient(supabaseUrl, supabaseServiceRoleKey)
} 