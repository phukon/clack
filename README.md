<!--
<div
  style={{
    display: 'flex',
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    backgroundImage: 'linear-gradient(to bottom, #dbf4ff, #fff1f1)',
    fontSize: 60,
    letterSpacing: -2,
    fontWeight: 700,
    textAlign: 'center',
  }}
>
  <img style={{ maxWidth: '100%', maxHeight: '120px' }}
    alt="Clack Logo" src="https://clack.rkph.me/_next/image?url=%2Flogo.png&w=750&q=100" />
  <div
  >
    Clack
  </div>

</div>
-->
<a href="https://clack.rkph.me">
  <img alt="Clack is an open-source writing activity tracker with a Notion-style rich text editor." src="https://github.com/phukon/clack/assets/60285613/53a92208-e160-47b5-a442-71c802c6a7f7">
</a>


<h3 align="center">Clack</h3>

<p align="center">
    Track your
writing progress effortlessly
    <br />
    <a href="https://clack.rkph.me"><strong>Learn more »</strong></a>
    <br />
    <br />
    <a href="#introduction"><strong>Introduction</strong></a> ·
    <a href="#features"><strong>Features</strong></a> ·
    <a href="#tech-stack"><strong>Tech Stack</strong></a> ·
    <a href="#author"><strong>Author</strong></a>
</p>

<p align="center">
  <a href="https://twitter.com/kungfukon">
   <img alt="X (formerly Twitter) Follow" src="https://img.shields.io/twitter/follow/kungukon">
  </a>
  <a href="https://github.com/phukon/clack/blob/main/LICENSE">
   <img alt="GitHub License" src="https://img.shields.io/github/license/phukon/clack">
  </a>
</p>

<br/>

## Introduction

Clack syncs your writing activity from Notion and Google Docs, and comes with an AI assistant and a Notion-style WYSIWYG editor.

## Features

- Encrypted Notes
- Google Integration
- Notion Integration
- Notion Widget
- AI Writing Assistant
- Notion-style WYSIWYG editor
- 14 Heatmap Themes

## Tech Stack

- [Next.js](https://nextjs.org/) – framework
- [TypeScript](https://www.typescriptlang.org/) – language
- [Tailwind](https://tailwindcss.com/) – CSS
- [Vercel KV](https://vercel.com/docs/storage/vercel-kv) – redis
- [Cloudflare Workers KV](https://www.cloudflare.com/en-in/developer-platform/workers-kv/) – Low latency KV data store
- [Prisma](https://www.prisma.io/) - orm
- [Neon](https://neon.tech/) – database
- [NextAuth.js](https://next-auth.js.org/) – auth
- [Stripe](https://stripe.com/) – payments
- [Resend](https://resend.com/) – emails
- [Vercel](https://vercel.com/) – deployments

## Author

- Riki Phukon ([@kungfukon](https://twitter.com/kungfukon))





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


- User registers
- Generate a new verification token using the email they used to register
- Send verification token to that email
- Inside the email send the route '/auth/new-verification'
- Add that route to the public route
- That route renders the new verification form
- Inside that page, use the search params to fetch the token -->
