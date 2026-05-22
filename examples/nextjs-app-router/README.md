# Next.js App Router example

This example shows the recommended production shape: a server route creates a
generation with a durable idempotency key supplied by the caller, and a webhook
route verifies the raw signed body before processing terminal events.

Send an `Idempotency-Key` header, or persist and pass an operation id from your
own database. Do not generate a fresh key for every retry.

Required environment variables:

- `BABYSEA_API_KEY`
- `BABYSEA_WEBHOOK_SECRET`

Routes:

- `app/api/generate/route.ts` creates a generation.
- `app/api/babysea/webhook/route.ts` verifies BabySea webhooks.
