# Project Documentation

## Product behavior

The Unit Converter works offline and supports length, mass, temperature, area, and volume. Temperature uses explicit affine transforms; all other units use a base-unit factor. Invalid numbers and incompatible units return user-readable validation errors.

## Quality gates

Every change must pass
pm run lint,
pm run test,
pm run build, and
pm run format:check. UI work must also be reviewed for keyboard operation, visible focus, responsive layout, semantic controls, and understandable feedback.
