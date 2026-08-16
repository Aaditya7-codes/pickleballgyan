import { readFileSync } from 'node:fs';

const dataset = JSON.parse(readFileSync(new URL('./venues.json', import.meta.url)));
const required = ['id', 'name', 'city', 'state', 'locality', 'status', 'verification_status', 'publication_status', 'court_type', 'court_count', 'indoor_outdoor', 'coordinates', 'geocode_status', 'source', 'date_checked', 'refresh_due', 'map_query', 'editor_notes'];
const ids = new Set();
const errors = [];

for (const record of dataset.records) {
  for (const field of required) if (!(field in record)) errors.push(`${record.id || 'unknown'}: missing ${field}`);
  if (!/^[a-z0-9-]+$/.test(record.id || '')) errors.push(`${record.id || 'unknown'}: invalid id`);
  if (ids.has(record.id)) errors.push(`${record.id}: duplicate id`);
  ids.add(record.id);
  if (record.publication_status !== 'published') errors.push(`${record.id}: non-published record in canonical dataset`);
  if (!['verified', 'reported', 'estimated'].includes(record.verification_status)) errors.push(`${record.id}: invalid public evidence status`);
  if (!record.source?.url?.startsWith('https://')) errors.push(`${record.id}: source must be an https URL`);
  if (!['matched_named_place', 'not_geocoded', 'needs_review'].includes(record.geocode_status)) errors.push(`${record.id}: invalid geocode status`);
  if (record.coordinates !== null && (!Number.isFinite(record.coordinates.latitude) || !Number.isFinite(record.coordinates.longitude))) errors.push(`${record.id}: invalid coordinates`);
  if (record.geocode_status === 'matched_named_place' && record.coordinates === null) errors.push(`${record.id}: matched place missing coordinates`);
}

if (errors.length) {
  console.error(errors.join('\n'));
  process.exit(1);
}

const byCity = Object.groupBy(dataset.records, ({ city }) => city);
console.log(`Validated ${dataset.records.length} published records across ${Object.keys(byCity).length} cities.`);
