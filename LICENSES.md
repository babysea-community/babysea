# License Compliance

BabySea SDK is Apache-2.0. Dependency license review is part of the public supply-chain posture for the standalone SDK repository.

## Allowed Licenses

The following licenses are acceptable for normal runtime, development, and CI dependencies:

- Apache-2.0
- MIT
- BSD-2-Clause
- BSD-3-Clause
- BSD-0-Clause
- ISC
- MPL-2.0
- CC0-1.0
- BlueOak-1.0.0

## Review Required

The following findings require maintainer review before they are accepted into a release branch:

- Unknown or unclassified license metadata.
- LGPL-3.0-or-later or other weak-copyleft dependencies.
- CC-BY-4.0 or other attribution-focused content licenses.
- Any dependency that bundles native binaries, generated assets, model data, or redistributed third-party content.

## Denied By Default

The following licenses or terms are denied unless maintainers explicitly approve a documented exception:

- AGPL, GPL, SSPL, or network-copyleft runtime dependencies.
- Proprietary, commercial-only, non-redistributable, source-unavailable, or field-of-use restricted dependencies.
- Dependencies that require undisclosed attribution, tracking, telemetry, or data sharing.

## Public GitLab Signals

The GitLab pipeline runs SAST, Advanced SAST, IaC scanning, Dependency Scanning, Secret Detection, Code Quality, guarded Container Scanning, package audit, and redacted Gitleaks checks. GitLab Dependency Scanning provides the dependency and license inventory that maintainers use for license triage.

Merge request approval policies are not enforced until the GitLab group has at least two eligible reviewers. Until then, license findings are documented and reviewed through normal maintainer review.
