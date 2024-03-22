export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  const state = searchParams.get("state");

  const options = {
    method: 'POST',
    headers: {accept: 'application/json', 'content-type': 'application/json'},
    body: JSON.stringify({code: code, grant_type: '"authorization_code"', redirect_uri: 'string'})
  };
  
  fetch('https://api.notion.com/v1/oauth/token', options)
    .then(response => response.json())
    .then(response => console.log(response))
    .catch(err => console.error(err));
}
