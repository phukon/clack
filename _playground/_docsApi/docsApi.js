const {google} = require('googleapis');
const docs = google.docs({
  version: 'v1',
  auth: '' // specify your API key here
});

async function main() {
  const res = await docs.documents.get({
            // documentId: '1f7JaqtN8fBjavOoUh45xX3CMe_AuUh5IR0MbVMbGcAg',
            documentId: '1fK1zbSNw7jZuEB14iS8n6t9p7PV4tFQW8fJpnJMpFWA', // from another account
          });
  console.log(`${res.data.name} has ${res.data.posts.totalItems} posts! The blog url is ${res.data.url}`)
};

main().catch(console.error);