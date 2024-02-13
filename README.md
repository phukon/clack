> TODO: Write high level flow of the data and logic

## Verification
- User registers
- Generate a new verification token using the email they used to register
- Send verification token to that email
- Inside the email send the route '/auth/new-verification'
- Add that route to the public route
- That route renders the new verification form
- Inside that page, use the search params to fetch the token