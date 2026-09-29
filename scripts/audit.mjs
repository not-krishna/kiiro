import { ALL_OFFERINGS } from '../web/src/content/offeringsData.ts';

const fields = [
  'title',
  'definition',
  'origin',
  'age',
  'impact',
  'whyLearn',
  'keyProcess',
  'learningDuration',
];

console.log('Auditing', ALL_OFFERINGS.length, 'offerings...');
let errCount = 0;

ALL_OFFERINGS.forEach((item, i) => {
  const missing = [];
  fields.forEach((f) => {
    const val = item[f];
    if (!val) {
      missing.push(`MISSING:${f}`);
      errCount++;
    } else if (Array.isArray(val)) {
      if (val.length < 3) {
        missing.push(`SHORT_KEYPROCESS(${val.length})`);
        errCount++;
      }
    } else if (typeof val === 'string' && val.trim().length < 15) {
      missing.push(`TOO_SHORT:${f}("${val}")`);
      errCount++;
    }
  });

  if (missing.length > 0) {
    console.log(`[${i + 1}/36] ❌ ${item.slug}:`, missing.join(', '));
  } else {
    console.log(`[${i + 1}/36] ✓ ${item.slug} (${item.title}) - all 8 fields present and detailed`);
  }
});

console.log('\nAudit complete. Total issues:', errCount);
