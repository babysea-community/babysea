# Cloudflare Workers example

This Worker uses the platform `fetch` and `crypto.subtle` APIs already available in Cloudflare Workers. No provider SDKs are required.

Send an `Idempotency-Key` header, or persist and pass an operation id from your
own database. Do not generate a fresh key for every retry.

Required secret:

- `BABYSEA_API_KEY`
