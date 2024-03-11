// Gets the document id from the `id` param and returns the wordcount and title as a JSON response.

function getDocumentInfo(docId) {
  const doc = DocumentApp.openById(docId);
  const title = doc.getName();
  const body = doc.getBody();
  const text = body.getText();
  const wordCount = text.split(/\s+/).length;
  return { title, wordCount };
}

function doGet(e){
  if (!e.parameter.id) {
    return ContentService.createTextOutput(JSON.stringify({ error: "No document ID provided." }))
      .setMimeType(ContentService.MimeType.JSON);
  }
  
  const docId = e.parameter.id;
  const { title, wordCount } = getDocumentInfo(docId);
  
  const response = {
    title: title,
    wordCount: wordCount
  };
  
  return ContentService.createTextOutput(JSON.stringify(response))
    .setMimeType(ContentService.MimeType.JSON);
}
