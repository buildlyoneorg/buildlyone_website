/**
 * Content gates. Run with `npm run check:content`.
 *
 * These assert the things the site's credibility depends on, so they
 * cannot rot silently: no unresolved placeholders, no story without its
 * disclosure, no dangling method reference, no retired positioning
 * vocabulary.
 */
import { problems } from '../src/content/problems.js';
import { method } from '../src/content/method.js';
import { intake } from '../src/content/intake.js';
import { nav } from '../src/content/nav.js';
import { readdirSync, readFileSync } from 'node:fs';

let failed = 0;
const check = (ok, msg) => {
  console.log(`${ok ? '  ok  ' : '  FAIL'} ${msg}`);
  if (!ok) failed++;
};

// 1. No unresolved placeholders anywhere in the content module.
const files = readdirSync('src/content').filter((f) => f.endsWith('.js'));
const withTK = files.filter((f) =>
  /\bTK\b/.test(readFileSync(`src/content/${f}`, 'utf8').replace(/^\s*(\/\/|\*).*$/gm, '')),
);
check(withTK.length === 0, `no unresolved TK placeholders (found in: ${withTK.join(', ') || 'none'})`);

// 2. The honesty gate: an illustrative story must carry its disclosure.
check(
  problems.every((p) => p.story.kind === 'illustrative' && p.story.disclosure?.trim()),
  'every story is labelled illustrative and carries a disclosure',
);

// 3. Problem numbering is unique and sequential.
const nums = problems.map((p) => p.number);
check(
  new Set(nums).size === nums.length && nums.every((n, i) => n === String(i + 1).padStart(2, '0')),
  `problem numbers unique and sequential (${nums.join(', ')})`,
);

// 4. Every cross-reference into the method resolves.
const stepIds = new Set(method.steps.map((s) => s.id));
const dangling = problems.flatMap((p) => p.relatedMethodSteps.filter((s) => !stepIds.has(s)));
check(dangling.length === 0, `all relatedMethodSteps resolve${dangling.length ? `: ${dangling}` : ''}`);

// 5. Every claimed number is derived, not typed.
const claimed = method.stats.map((s) => Number(s.value));
const actualQ =
  problems.reduce((n, p) => n + p.investigationQuestions.length, 0) +
  method.steps.reduce((n, s) => n + (s.questions?.length ?? 0), 0);
check(claimed[0] === actualQ, `stat "questions" (${claimed[0]}) equals the real count (${actualQ})`);

// 6. Retired positioning vocabulary must not reappear in content.
const RETIRED = /\b(institution|world-class|cutting-edge|innovative|synergy|best-in-class|one-stop|selective by design)\w*/i;
const offenders = files.filter((f) => RETIRED.test(readFileSync(`src/content/${f}`, 'utf8')));
check(offenders.length === 0, `no retired positioning vocabulary (${offenders.join(', ') || 'clean'})`);

// 7. Wire contract: form field names must match what api/send.js reads.
const api = readFileSync('api/send.js', 'utf8');
const missing = intake.fields.map((f) => f.name).filter((n) => !api.includes(n));
check(missing.length === 0, `every form field is read by api/send.js${missing.length ? `: missing ${missing}` : ''}`);

// 8. Every named person has a role. A blank role is worse than no name.
const { team } = await import('../src/content/team.js');
check(
  team.people.length > 0 && team.people.every((p) => p.name?.trim() && p.role?.trim()),
  `every listed person has a name and a role (${team.people.length} listed)`,
);

// 9. Nav derives from problems.
check(nav.problemLinks.length === problems.length, 'nav problem links match the problems array');

console.log(failed ? `\n${failed} content check(s) failed.` : '\nAll content checks passed.');
process.exit(failed ? 1 : 0);
