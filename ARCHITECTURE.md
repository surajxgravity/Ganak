# Architecture

## Client structure

- src/domain: stable, cross-feature types.
- src/tools: tool registry and category metadata.
- src/features/<tool>: feature-owned UI, catalog, validation, and calculation logic.
- src/styles: application-level presentation.

The registry exposes each tool's identity, route, category, search keywords, and availability. Adding a tool starts with a registry entry and a self-contained feature directory.

## Calculation boundary

Conversion definitions are data plus explicit base-unit transforms. The engine validates finite input, resolves units, enforces category compatibility, and returns a discriminated result rather than throwing. Future external services belong behind narrow interfaces.
