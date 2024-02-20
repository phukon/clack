const apiKey = '';
const documentId = '1fK1zbSNw7jZuEB14iS8n6t9p7PV4tFQW8fJpnJMpFWA';

// Construct the API URL
const url = `https://docs.googleapis.com/v1/documents/${documentId}?key=${apiKey}`;

// Make the GET request
fetch(url)
  .then(response => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  })
  .then(documentData => {
    // Extract the text from the document
    const text = documentData.body.content
      .filter(element => element.paragraph)
      .map(element => element.paragraph.elements[0].textRun.content)
      .join('');
    console.log(text);
  })
  .catch(error => {
    console.error('Error fetching document:', error);
  });
