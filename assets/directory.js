(() => {
  const datasetUrl = '/data/venues/venues.json';
  const escape = (value) => String(value ?? '').replace(/[&<>'"]/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' })[char]);
  const label = status => status === 'verified' ? 'Venue checked' : 'Listed on platform';
  const mapUrl = query => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;

  function card(record) {
    const evidence = label(record.verification_status);
    const freshness = record.verification_status === 'verified' ? 'Venue source' : escape(record.source.publisher);
    const count = record.court_count === null ? 'Not stated' : `${record.court_count} (source-stated)`;
    const location = record.address || record.locality;
    const note = record.verification_status === 'verified' ? record.editor_notes : 'Check the latest listing before you travel or book.';
    return `<article class="directory-record"><div class="directory-record__top"><div><p class="eyebrow">${evidence}</p><h2>${escape(record.name)}</h2></div><span class="directory-date">Checked ${escape(record.date_checked)}</span></div><dl><div><dt>Location</dt><dd>${escape(location)}</dd></div><div><dt>Courts</dt><dd>${count}</dd></div><div><dt>More details</dt><dd>${freshness}</dd></div></dl><p class="directory-note">${escape(note)}</p><div class="directory-actions"><a href="${escape(record.source.url)}" rel="noopener noreferrer">View details ↗</a><a href="${mapUrl(record.map_query)}" rel="noopener noreferrer">Map search ↗</a></div></article>`;
  }

  function showSummary(records, target) {
    if (!target) return;
    const verified = records.filter(record => record.verification_status === 'verified').length;
    const reported = records.filter(record => record.verification_status === 'reported').length;
    target.innerHTML = `<div><strong>${records.length}</strong><span>places to explore</span></div><div><strong>${verified}</strong><span>venue-checked</span></div><div><strong>${reported}</strong><span>platform listings</span></div>`;
  }

  async function initialise() {
    const response = await fetch(datasetUrl);
    if (!response.ok) throw new Error('Directory data is unavailable');
    const dataset = await response.json();
    const allRecords = dataset.records.filter(record => record.publication_status === 'published');
    const page = document.querySelector('[data-directory]');
    if (!page) return;
    const target = page.querySelector('[data-directory-results]');
    const summary = page.querySelector('[data-directory-summary]');
    const city = page.dataset.city;
    const cityFilter = page.querySelector('[data-directory-city]');
    const evidenceFilter = page.querySelector('[data-directory-evidence]');
    const queryInput = page.querySelector('[data-directory-query]');

    if (cityFilter) {
      const cities = [...new Set(allRecords.map(record => record.city))].sort();
      cityFilter.innerHTML = `<option value="">All covered cities</option>${cities.map(value => `<option value="${escape(value)}">${escape(value)}</option>`).join('')}`;
    }

    function render() {
      const query = queryInput?.value.trim().toLowerCase() ?? '';
      const selectedCity = city || cityFilter?.value || '';
      const evidence = evidenceFilter?.value || '';
      const records = allRecords.filter(record => {
        const matchesCity = !selectedCity || record.city === selectedCity;
        const matchesEvidence = !evidence || record.verification_status === evidence;
        const haystack = `${record.name} ${record.city} ${record.locality}`.toLowerCase();
        return matchesCity && matchesEvidence && (!query || haystack.includes(query));
      });
      if (target) target.innerHTML = records.length ? records.map(card).join('') : '<p class="directory-empty">No published records match those filters. This is a partial index, not evidence that a city has no courts.</p>';
      showSummary(records, summary);
    }

    [cityFilter, evidenceFilter, queryInput].filter(Boolean).forEach(input => input.addEventListener('input', render));
    render();
  }

  initialise().catch(() => {
    document.querySelectorAll('[data-directory-results]').forEach(target => {
      target.innerHTML = '<p class="directory-empty">The directory data could not be loaded. Please try again shortly.</p>';
    });
  });
})();
