import { createClient } from "@supabase/supabase-js"
import fetch from 'node-fetch';
const supabaseUrl = "https://polcxtixgqxfuvrqgthn.supabase.co"
const supabaseKey = process.env.SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

export default async function handler(req, res) {

  const auth = process.env.NEXT_PUBLIC_PRETIX_API;
  const headers = {
    'Accept': 'application/json, text/javascript',
    'Authorization': `Token ${auth}`,
    'Content-Type': 'application/json'
  };
  // const body = JSON.stringify(req.body);
  const body = {"name":{"en":"Hackathon 3"}}
  try {
    const { data, error } = await supabase
            .from("events")
            .select('slug')
            .eq("name", req.body.name)
    console.log(body, data[0].slug)
    const response = await fetch(`https://pretix.eu/api/v1/organizers/taz-zuzalu/events/${data[0].slug}/`, {
      method: 'PATCH',
      headers,
      body
    });
    console.log(response)
    if (response.ok) {
      const data = await response.json();
      res.status(200).json(data);
    } else {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
