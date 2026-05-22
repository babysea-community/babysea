# Backend generate-only scoped key example

Use a `generate_only` key for routes that only create and read generations. Keep `full_access` keys for internal admin tooling.

Send an `Idempotency-Key` header, or persist and pass an operation id from your
own database. Do not generate a fresh key for every retry.

Required environment variable:

- `BABYSEA_GENERATE_ONLY_KEY`
