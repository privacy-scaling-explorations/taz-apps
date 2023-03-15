// pages/api/pretix-event.js

export default async function handler(req, res) {
    const auth = process.env.NEXT_PUBLIC_PRETIX_API;
    const headers = {
      'Accept': 'application/json, text/javascript',
      'Authorization': `Token ${auth}`
    };
  
    try {
      // TODO: use event name as input, currently using "sampleconf"
      const response = await fetch('https://pretix.eu/api/v1/organizers/taz-zuzalu/events/test100/', { headers });
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
  