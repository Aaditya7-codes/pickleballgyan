# Venue data standard

This directory is the working data layer behind Pickleball Gyan’s Places to Play pages. `venues.json` is the single canonical public dataset. No venue should appear there until its fields are sourced, dated and visibly labelled.

Each record must follow `schema.json` and include a stable ID, city, state, locality, status, source, source type, date checked, refresh date, verification label, court definition, geocode status and editor notes. Prices, availability, coordinates and court counts must not be carried forward without a date checked and source.

## Verification labels

- verified: checked against a publicly available primary venue or operator source, or directly confirmed. It is not an endorsement, visit or guarantee of availability.
- reported: attributed to a current identifiable third-party source, such as a booking platform, but not independently confirmed by Pickleball Gyan.
- estimated: calculated from disclosed assumptions or incomplete evidence.
- unverified: a research lead only; never publish as a directory listing.

The public directory must distinguish dedicated pickleball courts, multi-use courts with permanent lines and temporary pickleball set-ups.

## Current dataset

The canonical dataset contains published records only. A `null` court count, price or coordinate means the field is unknown; it must not be interpreted as zero or unavailable. `not_geocoded` records deliberately use a text map query instead of unverified coordinates.

Platform-reported records are refreshed on a shorter cycle than direct-source records. A stale record should be removed from public display or relabelled before its next refresh date.

## Pilot archives

The earlier Hyderabad files are retained as research snapshots. They are not the source of truth for public counts. During the 2026-08-16 reconciliation, a duplicate primary-source lead and five blog-only leads were excluded from the canonical public dataset; current individual platform or operator pages were retained where available.
