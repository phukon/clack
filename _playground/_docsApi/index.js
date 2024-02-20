'use strict';

const path = require('path');
const util = require('util');
const {google} = require('googleapis');
const {authenticate} = require('@google-cloud/local-auth');

const docs = google.docs('v1');

async function runSample() {
  // Obtain user credentials to use for the request
  const auth = await authenticate({
    keyfilePath: path.join(__dirname, './oauth2.keys.json'),
    scopes: 'https://www.googleapis.com/auth/documents',
  });
  google.options({auth});

  const res = await docs.documents.get({
    documentId: '1XPbMENiP5bWP_cbqc0bEWbq78vmUf-rWQ6aB6FVZJyc',
  });
  console.log(util.inspect(res.data, false, 17));
  return res.data;
}

if (module === require.main) {
  runSample().catch(console.error);
}
module.exports = runSample;