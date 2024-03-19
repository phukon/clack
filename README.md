### Nuances
- Always use `finally` in async worksloads if a UI state depends on it!!. Otherwise, the UI will forever be stuck and never update after the async work is done.


### Cron Job
- A vercel cronjob triggers at 0000hrs UTC to set the word-count reference.
- A second cronjob from an EC2 instance triggers at 0530hrs IST or 0000hrs UTC for redundancy.

## Encryption
**Type** : `AES-256-CBC`
- The key should be **32 bytes** or **256 bits** in length!!
- Initialization Vector should be **16 bytes** or **128 bits**.

## Contribution logic
- Update wordcount Ref if a document is removed.
- Missing contributions are showed as blank on the canvas. No need to add blank contribution data to keep contributions array filled with consecutive dates.
- Works only if the day comes before the current system date.
- Non-consecutive dates after the current system date are not rendered. 

## ⚠ Documents
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