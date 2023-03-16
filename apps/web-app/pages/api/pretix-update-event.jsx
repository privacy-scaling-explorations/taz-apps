import { createClient } from "@supabase/supabase-js"
import fetch from 'node-fetch';
const supabaseUrl = "https://polcxtixgqxfuvrqgthn.supabase.co"
const supabaseKey = process.env.SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)
import axios from 'axios'

export default async function handler(req, res) {

  const auth = process.env.NEXT_PUBLIC_PRETIX_API;
  const headers = {
    'Accept': 'application/json, text/javascript',
    'Authorization': `Token ${auth}`,
    'Content-Type': 'application/json'
  };
  const body = JSON.stringify(req.body.data);

  try {
    const { data, error } = await supabase
            .from("events")
            .select('slug')
            .eq("id", req.body.id)

    const response = await axios.patch(`https://pretix.eu/api/v1/organizers/taz-zuzalu/events/${data[0].slug}/`,
      req.body.data,
      {headers}
  )
    console.log(response)
    if (response.status === 200) {
      res.status(200).json(response.data);
    } else {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
