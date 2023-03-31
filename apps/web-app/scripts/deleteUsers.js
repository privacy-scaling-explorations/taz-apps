const { createClient } = require("@supabase/supabase-js")

const supabaseUrl = "https://polcxtixgqxfuvrqgthn.supabase.co"
const supabaseKey = process.env.SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey, {
    auth: {
        autoRefreshToken: false,
        persistSession: false,
        detectSessionInUrl: false
    }
})

;(async () => {
    const { data, error } = await supabase.auth.admin.deleteUser("f739cb24-205f-41fc-b5fc-a02a06cc1814", true)
    console.log(data, error)
})()
