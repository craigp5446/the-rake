import type { APIRoute } from 'astro';

export const GET: APIRoute = () => {
  const body = `# The Rake — Methodology

Current version: 1.7 (June 2026)

## Overview

Every company is scored across seven dimensions, each rated 1–3. The composite score (0–100) maps to one of five alignment labels: Adversarial (0–20), Extractive (20–40), Compromised (40–60), Aligned (60–80), Principled (80–100).

## Dimensions

1. **Revenue clarity** — Can a user immediately understand how this company makes money?
   - 1 = Misleading. Revenue streams actively disguised.
   - 2 = Partial. Primary model findable, secondary streams not surfaced.
   - 3 = Clear. Full revenue picture stated plainly.

2. **Incentive alignment** — Does the company make more money when users succeed, or when they stay confused?
   - 1 = Opposed. Business model requires user failure or dependency.
   - 2 = Neutral. Revenue not tied to user failure, but company doesn't benefit from success.
   - 3 = Aligned. Company makes more when users achieve outcomes.

3. **Captivity** — How easy is it to leave? Is data portable?
   - 1 = Deliberately trapped. Lock-in engineered by design.
   - 2 = Friction. Leaving possible but inconvenient.
   - 3 = Portable. Data exportable; cancellation self-serve and immediate.

4. **Engagement extraction** — Is engagement driven by genuine value or exploitation?
   - 1 = Weaponised. Product engineered to defeat user's ability to disengage.
   - 2 = Extractive. Engagement mechanics tied to revenue; short of deliberate exploitation.
   - 3 = Value-driven. Engagement reflects genuine user value.

5. **Multi-sided tension** — When the company serves multiple parties, whose interests win?
   - 1 = Users subordinated. Primary commercial relationship is with a third party.
   - 2 = Interests unresolved. Track record when interests conflict is ambiguous.
   - 3 = Users defended. Documented track record of siding with users, including at commercial cost.

6. **Algorithmic accountability** — Does the company take responsibility for what its systems surface?
   - 1 = Unaccountable. Harmful content amplified; company chose not to intervene.
   - 2 = Partial. Responsibility acknowledged but inconsistently applied.
   - 3 = Accountable. Clear responsibility; ranking signals disclosed; moderation consistent.

7. **Ownership pressure** — How much pressure exists to extract short-term value?
   - 1 = Maximum. PE-owned or under strong quarterly earnings pressure.
   - 2 = Moderate. Public company (subscription/mixed model) or mid-stage VC.
   - 3 = Low. Bootstrapped; co-op; nonprofit or mission-locked structure.

## Scoring

Each dimension score (1–3) is weighted by the degree of evidence. The composite score is rescaled to 0–100. Confidence (High/Medium/Low) reflects the proportion of assessed (vs. inferred) sources.

## Source types

- **Assessed** — directly read and evaluated for this report
- **Inferred** — cited as context but not individually verified

## Links

- [Full methodology](https://therake.co/methodology/)
- [All reports](https://therake.co/)
`.trim();

  return new Response(body, {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      'Vary': 'Accept, Accept-Encoding',
      'Cache-Control': 'public, max-age=86400',
    },
  });
};
