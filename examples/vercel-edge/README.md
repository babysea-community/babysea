# Vercel Edge example

This route runs on the Edge runtime and starts a generation from a server-side scoped key. Keep full-access keys out of browser code.

Send an `Idempotency-Key` header, or persist and pass an operation id from your
own database. Do not generate a fresh key for every retry.

Required environment variable:

- `BABYSEA_API_KEY`
