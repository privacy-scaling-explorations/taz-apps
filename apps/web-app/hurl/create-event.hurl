POST https://pretix.eu/api/v1/organizers/taz-zuzalu/events/
Host: pretix.eu
Authorization: Token h074quiq51d5xwk55tax7t7an12v3bb1rbdvk16209fsf4d1tqqtg9o68yy5jgmz
Accept: application/json, text/javascript
Content-Type: application/json

{
  "name": {"en": "Zuzalu Template"},
  "slug": "zuzalu-template",
  "live": true,
  "testmode": true,
  "currency": "EUR",
  "date_from": "2023-03-27T10:00:00Z",
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