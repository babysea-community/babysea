# Browser read-only/status example

Prefer a backend status proxy for browser dashboards. If you must call BabySea
directly from browser code, issue a short-lived custom key that only has
`generation:read`; do not expose `full_access`, `generate_only`, `read_only`,
or account/billing-capable keys in browser code.

This example fetches generation status from a browser page.
