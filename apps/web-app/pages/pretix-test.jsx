import React, { useState, useEffect } from 'react';
import axios from 'axios';

// const API_URL = 'https://pretix.eu/api/v1';
// const ORGANIZER = 'your-organizer-slug';
// const EVENT_NAME = 'your-event-name';

const PretixTest = () => {
//   const [events, setEvents] = useState([]);
//   const [newEvent, setNewEvent] = useState({});

//   useEffect(() => {
//     axios.get(`${API_URL}/organizers/${ORGANIZER}/events/`, {
//       headers: { 'Accept': 'application/json, text/javascript' },
//     })
//       .then((response) => {
//         setEvents(response.data.results);
//       })
//       .catch((error) => {
//         console.error(error);
//       });
//   }, []);

const fetchOrganizers = async () => {
    try {
      const response = await fetch('/api/organizers');
      if (response.ok) {
        const data = await response.json();
        console.log(data);
      } else {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.log(error);
    }
  };
  
  

  return (
    <div className="max-w-4xl mx-auto mt-8">
      <h1 className="text-3xl font-bold mb-4">Pretix Events</h1>
      <button className="bg-blue-500 text-white py-2 px-4 rounded" onClick={fetchOrganizers}>Get organizers</button>
      {/* <ul className="mt-4">
        {events.map((event) => (
          <li key={event.id} className="mb-2">{event.name.en}</li>
        ))}
      </ul>
      {Object.keys(newEvent).length !== 0 && (
        <div className="mt-8">
          <h2 className="text-xl font-bold">New Event Created</h2>
          <p className="mt-2">Name: {newEvent.name.en}</p>
          <p className="mt-2">Slug: {newEvent.slug}</p>
        </div>
      )} */}
    </div>
  );
};

export default PretixTest;
