// pages/api/create-event.js
import fetch from 'node-fetch';

export default async function handler(req, res) {
  const auth = process.env.NEXT_PUBLIC_PRETIX_API;
  const headers = {
    'Accept': 'application/json, text/javascript',
    'Authorization': `Token ${auth}`,
    'Content-Type': 'application/json'
  };
  const body = JSON.stringify(req.body);
  console.log(auth, body)
  try {
    const response = await fetch('https://pretix.eu/api/v1/organizers/taz-zuzalu/events/test1001/subevents/', {
      method: 'POST',
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
    res.status(500).json({ message: error });
  }
}
