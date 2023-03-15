import { random } from 'nanoid';
import { v4 as uuidv4 } from 'uuid';

export const pretixFetchOrganizers = async () => {
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

export const pretixFetchEvents = async () => {
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
  export const pretixFetchEvent = async () => {
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

  export const pretixFetchSubEvents = async () => {
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


  export async function pretixCreateEvent() {
    // TODO: transform event data into input
    const eventData = {
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
      };

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

  export async function pretixCreateSubEvent() {
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
    return data;
  }



  export const pretixFetchItems = async () => {
    try {
      const response = await fetch('/api/pretix-get-items');
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

  export const PretixFetchTeams = async () => {
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

  export const pretixCreateItem = async () => {

    const itemData = {
      "id": Math.random(),
      "name": {"en": "Standard ticket"},
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
      "personalized": false,
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

  export const pretixFetchTeamMembers = async () => {
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