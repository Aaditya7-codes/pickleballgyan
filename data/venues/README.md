# Venue data standard

This directory is the working data layer behind Pickleball Gyan’s Places to Play pages. No venue should appear in a public dataset until its fields are sourced, dated and visibly labelled.

Each record must follow schema.json and include the city, state, status, source, source type, date checked, verification label, court definition and editor notes. Prices, availability and court counts must not be carried forward without a date checked.

## Verification labels

- verified: checked against a publicly available primary venue or operator source, or directly confirmed. It is not an endorsement, visit or guarantee of availability.
- reported: attributed to a current identifiable third-party source, such as a booking platform, but not independently confirmed by Pickleball Gyan.
- estimated: calculated from disclosed assumptions or incomplete evidence.
- unverified: a research lead only; never publish as a directory listing.

The public directory must distinguish dedicated pickleball courts, multi-use courts with permanent lines and temporary pickleball set-ups.

## Public-source pilot

The Hyderabad pilot is split deliberately: `hyderabad-verified.json` contains records supported by direct operator pages; `hyderabad-platform-reported.csv` contains current platform listings whose fields are not independently confirmed. `hyderabad-research.json` and any `unverified` records are research material only and must not be displayed as public listings.
