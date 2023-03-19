POST https://pretix.eu/api/v1/organizers/taz-zuzalu/events/test-correct-dates/clone/
Host: pretix.eu
Authorization: Token tf0ba4h6m3tom6as5h86wfoutnby9me04vzz47bxz58f65ucv5zpt6q56jh8u6gg
Accept: application/json, text/javascript
Content-Type: application/json

{
  "name": {"en": "Zuzalu F"},
  "slug": "zuzalu-f",
  "live": false,
  "testmode": true,
  "currency": "EUR",
  "date_from": "2023-03-27T10:00:00Z",
  "date_to": "2023-05-27T10:00:00Z",
  "date_admission": null,
  "is_public": true,
  "presale_start": null,
  "presale_end": null,
  "location": null,
  "geo_lat": null,
  "geo_lon": null,
  "seating_plan": null,
  "seat_category_mapping": {},
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