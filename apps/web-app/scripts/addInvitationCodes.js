const faunadb = require('faunadb')
require('dotenv').config({ path: '../.env.local' })
const fs = require('fs');

try {
  const secret = process.env.FAUNA_SECRET_KEY;
  const query = faunadb.query;
  const client = new faunadb.Client({ secret });
  
  const data = {
    codes: []
  }

  const randomStringMaker = (length) => {
    for (s = ''; s.length < length; s += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'.charAt((Math.random() * 36) | 0));
    return s
  }

  for (i = 1; i < 1001; i++) {
    let code = { svg: i + '.svg', code: randomStringMaker(6), isUsed: false }
    data.codes.push(code)
  }

  fs.writeFile('../taz-dapp-poc/data/invitationCodes.json', JSON.stringify(data, null, 4), (err) => {console.log(err)})

  const promises = data.codes.map((code) =>
    client.query(
      query.Create(query.Collection("InvitationCodes"), {
        data: {
          svg: code.svg,
          code: code.code,
          isUsed: false,
        },
      })
    )
  );

  Promise.all(promises);
} catch (error) {
  console.log(error.message)
}