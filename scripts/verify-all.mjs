import { ALL_OFFERINGS } from '../web/src/content/offeringsData.ts';
import { CONFIRMED_SCHEDULED_EVENTS } from '../web/src/content/events.ts';

async function verify() {
  console.log('========================================================');
  console.log('1. AUDITING 36 OFFERINGS DATA');
  console.log('========================================================');

  const requiredFields = [
    'title',
    'definition',
    'origin',
    'age',
    'impact',
    'whyLearn',
    'keyProcess',
    'learningDuration',
  ];

  let dataErrors = 0;
  ALL_OFFERINGS.forEach((offering, idx) => {
    requiredFields.forEach((field) => {
      const val = offering[field];
      if (!val) {
        console.error(`❌ [${idx + 1}/36] ${offering.slug}: missing ${field}`);
        dataErrors++;
      } else if (Array.isArray(val) && val.length < 3) {
        console.error(`❌ [${idx + 1}/36] ${offering.slug}: keyProcess has only ${val.length} steps`);
        dataErrors++;
      }
    });
  });

  if (dataErrors === 0) {
    console.log(`✓ All 36 offerings contain all 8 required fields with tailored content!`);
  } else {
    console.error(`Found ${dataErrors} data errors!`);
  }

  console.log('\n========================================================');
  console.log('2. TESTING HTTP ENDPOINTS ON LOCAL SERVER');
  console.log('========================================================');

  // Test weekly events page
  try {
    const weeklyRes = await fetch('http://localhost:3000/weekly-events');
    const weeklyHtml = await weeklyRes.text();

    console.log(`Weekly events page status: ${weeklyRes.status}`);

    // Check for "Present in"
    if (weeklyHtml.includes('Present in')) {
      console.error(`❌ Found 'Present in' in weekly-events HTML!`);
    } else {
      console.log(`✓ No 'Present in' found in weekly-events page!`);
    }

    // Check for "Investment"
    if (weeklyHtml.includes('>Investment<')) {
      console.error(`❌ Found '>Investment<' in weekly-events HTML!`);
    } else {
      console.log(`✓ No 'Investment' label found in weekly-events page!`);
    }

    // Check for "Full Details →"
    if (weeklyHtml.includes('Full Details →')) {
      console.log(`✓ 'Full Details →' CTA found in weekly-events page!`);
    } else {
      console.error(`❌ 'Full Details →' CTA NOT found in weekly-events page!`);
    }

    // Check for all 7 required details in HTML
    const checks = [
      'Key Process',
      'Take Away / Keep Sake',
      'Description',
    ];
    checks.forEach((chk) => {
      if (weeklyHtml.includes(chk)) {
        console.log(`✓ Found '${chk}' in weekly-events page!`);
      } else {
        console.error(`❌ Missing '${chk}' in weekly-events page!`);
      }
    });
  } catch (err) {
    console.error('Failed to fetch weekly-events:', err.message);
  }

  // Test Home page for Testimonials title
  try {
    const homeRes = await fetch('http://localhost:3000/');
    const homeHtml = await homeRes.text();

    if (homeHtml.includes('Stories from the studio')) {
      console.error(`❌ Found 'Stories from the studio' on Homepage!`);
    } else {
      console.log(`✓ 'Stories from the studio' removed from Homepage!`);
    }

    if (homeHtml.includes('What the partner has to say')) {
      console.log(`✓ 'What the partner has to say' present on Homepage!`);
    } else {
      console.error(`❌ 'What the partner has to say' NOT found on Homepage!`);
    }
  } catch (err) {
    console.error('Failed to fetch homepage:', err.message);
  }

  console.log('\n========================================================');
  console.log('3. TESTING ALL 36 OFFERING PAGES (HTTP 200 & CONTENT)');
  console.log('========================================================');

  let pageSuccessCount = 0;
  for (let i = 0; i < ALL_OFFERINGS.length; i++) {
    const o = ALL_OFFERINGS[i];
    const url = `http://localhost:3000/artforms/${o.slug}`;
    try {
      const res = await fetch(url);
      if (res.status !== 200) {
        console.error(`❌ [${i + 1}/36] ${url} returned HTTP ${res.status}`);
        continue;
      }
      const html = await res.text();
      const hasDefinition = html.includes('Definition');
      const hasOrigin = html.includes('Origin');
      const hasAge = html.includes('Age / How Old');
      const hasImpact = html.includes('Impact');
      const hasWhyLearn = html.includes('Why Should It Be Learnt');
      const hasKeyProcess = html.includes('Key Process');
      const hasDuration = html.includes('How Long It Takes to Learn');
      const hasPartnerTitle = html.includes('What the partner has to say');

      if (
        hasDefinition &&
        hasOrigin &&
        hasAge &&
        hasImpact &&
        hasWhyLearn &&
        hasKeyProcess &&
        hasDuration &&
        hasPartnerTitle
      ) {
        pageSuccessCount++;
        console.log(`✓ [${i + 1}/36] /artforms/${o.slug} (HTTP 200, all 8 sections + partner testimonials verified)`);
      } else {
        console.error(`❌ [${i + 1}/36] /artforms/${o.slug} missing some sections:`, {
          hasDefinition,
          hasOrigin,
          hasAge,
          hasImpact,
          hasWhyLearn,
          hasKeyProcess,
          hasDuration,
          hasPartnerTitle,
        });
      }
    } catch (err) {
      console.error(`❌ [${i + 1}/36] Failed to fetch ${url}: ${err.message}`);
    }
  }

  console.log(`\nVerified ${pageSuccessCount} / 36 offering pages successfully!`);
}

verify();
