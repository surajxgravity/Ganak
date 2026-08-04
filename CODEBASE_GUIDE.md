# Codebase Guide

GanakApp.tsx owns shell-level navigation and discovery. ools/registry.ts is the source of truth for tools. In the Unit Converter feature, catalog.ts defines unit transforms, ngine.ts provides deterministic business logic, UnitConverter.tsx owns interaction state, and ngine.test.ts protects conversion behavior.

Avoid importing feature internals into unrelated features. Promote only proven concepts to src/domain.
