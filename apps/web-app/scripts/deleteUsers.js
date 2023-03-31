const { createClient } = require("@supabase/supabase-js");
const supabaseUrl = "https://polcxtixgqxfuvrqgthn.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBvbGN4dGl4Z3F4ZnV2cnFndGhuIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY3ODM0MzYwMywiZXhwIjoxOTkzOTE5NjAzfQ.6_AnKSHkt5kARd6tK5JVnLCNm8ATQFHiuXjnGtOBCcc";
const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
    detectSessionInUrl: false,
  },
});

(async () => {
  const { data, error } = await supabase.auth.admin.deleteUser(
    "f739cb24-205f-41fc-b5fc-a02a06cc1814",
    true
  );
  console.log(data, error);
})();
