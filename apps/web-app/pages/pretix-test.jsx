import React, { useState, useEffect } from 'react';
import axios from 'axios';
import dynamic from 'next/dynamic';
import { v4 as uuidv4 } from 'uuid';


const PretixWidget = dynamic(() => import('../components/PretixWidget'), {
  ssr: false
});


// const API_URL = 'https://pretix.eu/api/v1';
// const ORGANIZER = 'your-organizer-slug';
// const EVENT_NAME = 'your-event-name';

const PretixTest = () => {
//   const [events, setEvents] = useState([]);
//   const [newEvent, setNewEvent] = useState({});
    // const [data,setData] = useState("String");

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

  const fetchPretixEvents = async () => {
    try {
      const response = await fetch('/api/pretix-events');
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
  // TODO: Receive event name as input
  const fetchPretixEvent = async () => {
    try {
      const response = await fetch('/api/pretix-event');
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

  const fetchSubEvents = async () => {
    try {
      const response = await fetch('/api/pretix-get-subevents');
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


  async function createEvent() {
    // TODO: transform event data into input
    const eventData =
      {
        "name": {"en": "Sample Conf"},
        "slug": uuidv4(),
        "live": false,
        "testmode": false,
        "currency": "EUR",
        "date_from": "2017-12-27T10:00:00Z",
        "date_to": null,
        "date_admission": null,
        "is_public": false,
        "presale_start": null,
        "presale_end": null,
        "seating_plan": null,
        "seat_category_mapping": {},
        "location": null,
        "geo_lat": null,
        "geo_lon": null,
        "has_subevents": false,
        "meta_data": {},
        "timezone": "Europe/Berlin",
        "item_meta_properties": {},
        "plugins": [
          "pretix.plugins.stripe",
          "pretix.plugins.paypal"
        ],
        "sales_channels": [
          "web",
          "pretixpos",
          "resellers"
        ]
      }

    const apiUrl = '/api/pretix-create-event';
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(eventData)
    });
    console.log(response)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log(data)
  }

  async function createSubEvent() {
    // TODO: transform event data into input
    const eventData = {
      "name": {"en": "test"},
      "active": false,
      "is_public": true,
      "date_from": "2017-12-27T10:00:00Z",
      "date_to": null,
      "date_admission": null,
      "presale_start": null,
      "presale_end": null,
      "location": null,
      "geo_lat": null,
      "geo_lon": null,
      "seating_plan": null,
      "seat_category_mapping": {},
      "variation_price_overrides": [],
      "meta_data": {}
    };

    const apiUrl = '/api/pretix-create-subevent';
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(eventData)
    });
    console.log(response)

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log(data);
  }


  async function createOrder() {

    const orderData = {
        "email": "dummy@example.org",
        "locale": "en",
        "sales_channel": "web",
        "fees": [
          {
            "fee_type": "payment",
            "value": "0.25",
            "description": "",
            "internal_type": "",
            "tax_rule": 2
          }
        ],
        "payment_provider": "banktransfer",
        "invoice_address": {
          "is_business": false,
          "company": "Sample company",
          "name_parts": {"full_name": "John Doe"},
          "street": "Sesam Street 12",
          "zipcode": "12345",
          "city": "Sample City",
          "country": "GB",
          "state": "",
          "internal_reference": "",
          "vat_id": ""
        },
        "positions": [
          {
            "positionid": 1,
            "item": 1,
            "variation": null,
            "price": "23.00",
            "attendee_name_parts": {
              "full_name": "Peter"
            },
            "attendee_email": null,
            "addon_to": null,
            "answers": [
              {
                "question": 1,
                "answer": "23",
                "options": []
              }
            ],
            "subevent": null
          }
        ]
      };
    const response = await fetch('/api/pretix-create-order', {
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/javascript',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(orderData)
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  }


  const fetchItems = async () => {
    try {
      const response = await fetch('/api/pretix-get-items');
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        // setData(data);

      } else {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchTeams = async () => {
    try {
      const response = await fetch('/api/pretix-get-teams');
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

  const createItem = async () => {
    const itemData = {
      "id": Math.random(),
      "name": {"en": "Standard ticket 1000"},
      "internal_name": "",
      "sales_channels": ["web"],
      "default_price": "23.00",
      "original_price": null,
      "category": null,
      "active": true,
      "description": null,
      "free_price": false,
      "tax_rate": "0.00",
      "tax_rule": null,
      "admission": false,
      "personalized": true,
      "issue_giftcard": false,
      "meta_data": {},
      "position": 0,
      "picture": null,
      "available_from": null,
      "available_until": null,
      "hidden_if_available": null,
      "require_voucher": false,
      "hide_without_voucher": false,
      "allow_cancel": true,
      "generate_tickets": null,
      "allow_waitinglist": true,
      "show_quota_left": null,
      "min_per_order": null,
      "max_per_order": null,
      "checkin_attention": false,
      "require_approval": false,
      "require_bundling": false,
      "require_membership": false,
      "require_membership_types": [],
      "grant_membership_type": null,
      "grant_membership_duration_like_event": true,
      "grant_membership_duration_days": 0,
      "grant_membership_duration_months": 0,
      "validity_fixed_from": null,
      "validity_fixed_until": null,
      "validity_dynamic_duration_minutes": null,
      "validity_dynamic_duration_hours": null,
      "validity_dynamic_duration_days": null,
      "validity_dynamic_duration_months": null,
      "validity_dynamic_start_choice": false,
      "validity_dynamic_start_choice_day_limit": null,
      "variations": [
        {
           "value": {"en": "Student"},
           "default_price": "10.00",
           "price": "10.00",
           "original_price": null,
           "active": true,
           "checkin_attention": false,
           "require_approval": false,
           "require_membership": false,
           "require_membership_types": [],
           "sales_channels": ["web"],
           "available_from": null,
           "available_until": null,
           "hide_without_voucher": false,
           "description": null,
           "meta_data": {},
           "position": 0
        },
        {
           "value": {"en": "Regular"},
           "default_price": null,
           "price": "23.00",
           "original_price": null,
           "active": true,
           "checkin_attention": false,
           "require_approval": false,
           "require_membership": false,
           "require_membership_types": [],
           "sales_channels": ["web"],
           "available_from": null,
           "available_until": null,
           "hide_without_voucher": false,
           "description": null,
           "meta_data": {},
           "position": 1
        }
      ],
      "addons": [],
      "bundles": []
    }
    try {
      const response = await fetch('/api/pretix-create-item', {
        method: 'POST',
        headers: {
          'Accept': 'application/json, text/javascript',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(itemData)
      });
      if (response.ok) {
        const data = await response.json();
        console.log(data);

      } else {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.log(error);
    }

  }

  const fetchTeamMembers = async () => {
    try {
      const response = await fetch('/api/pretix-get-team-members');
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
      <h1 className="text-3xl font-bold mb-4">Fetch Pretix Data</h1>
      <div className="flex flex-wrap">
      <button className="bg-blue-500 text-white py-2 px-4 rounded mr-4 mb-4" onClick={fetchOrganizers}>Get organizers</button>
      <button className="bg-blue-500 text-white py-2 px-4 rounded mr-4 mb-4" onClick={fetchPretixEvents}>Pretix Events</button>
      <button className="bg-blue-500 text-white py-2 px-4 rounded mr-4 mb-4" onClick={fetchPretixEvent}>Pretix Event</button>
      <button className="bg-blue-500 text-white py-2 px-4 rounded mr-4 mb-4" onClick={fetchSubEvents}>Get Subevents</button>
      <button className="bg-blue-500 text-white py-2 px-4 rounded mr-4 mb-4" onClick={fetchTeams}>Get Teams</button>
      <button className="bg-blue-500 text-white py-2 px-4 rounded mr-4 mb-4" onClick={fetchTeamMembers}>Get Team Members</button>
      <button className="bg-blue-500 text-white py-2 px-4 rounded mr-4 mb-4" onClick={fetchItems}>Get Items</button>
      



    </div>
    <h1 className="text-3xl font-bold mb-4">Create Pretix</h1>
      <div className="flex flex-wrap">
      <button className="bg-green-500 text-white py-2 px-4 rounded mr-4 mb-4" onClick={createEvent}>Create Event</button>
      <button className="bg-green-500 text-white py-2 px-4 rounded mr-4 mb-4" onClick={createSubEvent}>Create Team</button>
      <button className="bg-green-500 text-white py-2 px-4 rounded mr-4 mb-4" onClick={createSubEvent}>Invite TeamMember</button>
      <button className="bg-green-500 text-white py-2 px-4 rounded mr-4 mb-4" onClick={createSubEvent}>Create Subevent</button>
      <button className="bg-green-500 text-white py-2 px-4 rounded mr-4 mb-4" onClick={createItem}>Create Item</button>
    </div>


      <>
        <h1>Welcome to My Page!</h1>
        <PretixWidget event="https://pretix.eu/taz-zuzalu/cloned-zuzalu-event-3/" />
      </>
      {/* <div>{data}</div> */}


    </div>
  );
};

export default PretixTest;
