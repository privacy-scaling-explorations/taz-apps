POST https://pretix.eu/api/v1/organizers/taz-zuzalu/events/event-series/orders/ 
Host: pretix.eu
Accept: application/json, text/javascript
Authorization: Token o2ltc6m7kyexvqls1gr0d4whb16f8j9z1f56xppwspjiz7nlki4ej4jtwoykj8o4
Content-Type: application/json
{
  "email": "test@email.com",
  "locale": "en",
  "positions": [
    {
      "positionid": 1,
      "item": 318781,
      "price": "0",
      "attendee_name_parts": {
        "first_name": "Peter",
        "last_name": "Kim",
        "semaphoreID": "123456"
      },
      "attendee_email": "test@email.com",
      "subevent": 3871434
    }
  ],
  "send_email": true
}