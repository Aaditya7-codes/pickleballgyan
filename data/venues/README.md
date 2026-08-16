# Venue data standard

This directory is the working data layer behind Pickleball Gyan’s Places to Play pages. It is deliberately empty at launch: no venue should appear in a public dataset until its fields are sourced and dated.

Each record must follow schema.json and include the city, state, status, source, source type, date checked, verification label, court definition and editor notes. Prices, availability and court counts must not be carried forward without a date checked.

## Verification labels

- verified: checked against a primary venue source or directly confirmed.
- reported: attributed to an identifiable source but not independently confirmed.
- estimated: calculated from disclosed assumptions or incomplete evidence.
- unverified: a research lead only; never publish as a directory listing.

The public directory must distinguish dedicated pickleball courts, multi-use courts with permanent lines and temporary pickleball set-ups.
