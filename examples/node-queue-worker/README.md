# Node queue worker example

Use this shape when your web app enqueues work and a backend worker creates generations. The idempotency key should come from the durable job id so retries remain exactly-once.

Required environment variable:

- `BABYSEA_API_KEY`
