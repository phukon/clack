

## Contribution logic
- Missing contributions are showed as blank on the canvas. No need to add black contribution data to keep contributions array filled with consecutive dates.
- Works only if the day comes before the current system date.
- Non-consecutive dates after the current system date are not rendered. 

# ⚠ Documents
- Added specific error handling for Prisma's known request errors
- Checked for error code 'P2002' to identify unique constraint violations
- Checked if the 'url' field was involved in the constraint violation
- Provided a custom error message for duplicate URL scenarios
- Added checks for unauthorized request on another User's documents.

This change enhances the reliability and user experience of the addDocument function by ensuring that duplicate URLs are handled in a more informative and user-friendly manner.

### Prisma
- After schema changes run `npx prisma migrate dev` 
- Reset KV store by sending a GET request on the KV worker url with the param `?sayonara` and a populated `X-Custom-Auth-Key` header.

<!-- > TODO: Write high level flow of the data and logic -->

<!-- ## Verification
- User registers
- Generate a new verification token using the email they used to register
- Send verification token to that email
- Inside the email send the route '/auth/new-verification'
- Add that route to the public route
- That route renders the new verification form
- Inside that page, use the search params to fetch the token -->