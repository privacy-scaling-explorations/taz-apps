import { createClient } from "@supabase/supabase-js"
const supabaseUrl = "https://polcxtixgqxfuvrqgthn.supabase.co"
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey, {
    auth: {
        autoRefreshToken: false,
        persistSession: false,
        detectSessionInUrl: false
    }
})

(async function deleteUsers() {
  const { data, error } = await supabase.auth.admin.deleteUser(
    '72ba6b67-3715-4cab-96cf-dd031798e09a',
    {shouldSoftDelete: true}
  )
  print(data, error)
})()
