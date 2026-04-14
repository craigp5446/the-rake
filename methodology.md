# How The Rake scores companies

**Version 1.1 — April 2026 — Open methodology**

---

The Rake scores tech companies on how their revenue models relate to the interests of the people who use them. Every score is derived from public information, applied through a consistent framework, with sources cited and confidence levels shown. We are not publishing legal findings or making accusations — we are applying a transparent system to public facts.

This document describes that system in full. If you disagree with a score, the methodology is your starting point.

---

## The five profile labels

Every company receives a spectrum position from 0–100 and a corresponding profile label. The label is editorial, not mechanical — it reflects a judgment about the full picture, weighted toward incentive alignment as the core question. The spectrum position conveys where within a band a company sits; two companies with the same label can occupy meaningfully different positions.

| Band | Label | Definition |
|---|---|---|
| 0–20 | **Adversarial** | This product is designed to work against you — it makes more money when you fail, stay confused, or can't leave. |
| 21–40 | **Extractive** | This product takes more value from you than it delivers — engagement, data, or money are harvested in ways that don't serve your interests. |
| 41–60 | **Compromised** | This product has genuine value but isn't fully on your side — trade-offs exist between what's good for you and what's good for the business. |
| 61–80 | **Aligned** | This product makes money when you get value — its incentives and your interests point in the same direction. |
| 81–100 | **Principled** | This product actively prioritises your interests, sometimes at cost to itself — the way it's built reflects values, not just incentives. |

Profiles are always displayed with their spectrum position: e.g. **Compromised (43)** and **Compromised (58)** are both Compromised, but the number makes the difference visible.

---

## The seven dimensions

Each company is scored across seven dimensions on a 1–3 scale. The scores are the starting point — the evidence and confidence levels behind each score carry as much weight as the number itself.

| Dimension | The question it answers |
|---|---|
| Revenue clarity | Can a user immediately understand how this company makes money? |
| Incentive alignment | Does the company make more money when users succeed, or when they stay longer, spend more, or remain confused? |
| Captivity | How easy is it to leave? Is data portable? Is cancellation straightforward? |
| Engagement extraction | Does the product benefit from maximising time spent regardless of whether that time serves the user? |
| Multi-sided tension | When the interests of different customer groups conflict, whose side does the company take? |
| Algorithmic transparency | Does the product show you what it says it shows you, or is the feed, search, or recommendation surface shaped by undisclosed forces? |
| Ownership pressure | Who owns this company, and what are they optimising for? *(Trajectory dimension — see below)* |

**Ownership pressure** is treated differently from the other six dimensions. It describes what a product is *becoming*, not what it currently is. It functions as a trajectory modifier and informs flags rather than driving the profile label on its own. See [Flags](#flags) below.

**Algorithmic transparency** applies primarily to platforms where a feed, search result, or recommendation surface is the core product. For tools with no algorithmic content layer, this dimension scores 3 by default.

If insufficient public data exists to score a dimension, it is left blank rather than guessed. Opacity is itself a signal and is noted in the writeup.

---

## The scoring rubric

Each dimension is scored 1, 2, or 3. There are no half-points.

A score of 1 means the product is **actively working against the user on this dimension** — a present-tense harm, not a missed opportunity or a future risk. Future risks belong in flags.

### 1. Revenue clarity
*Can a user immediately understand how this company makes money?*

- **1 — Misleading.** Revenue streams are actively disguised. Hidden fees surface at checkout; data monetisation is structurally concealed; "free" positioning deliberately obscures what is actually being sold.
- **2 — Partial.** Primary model is broadly known or findable, but secondary streams (data licensing, affiliate revenue, upsell mechanics) are not surfaced to users.
- **3 — Clear.** Revenue model stated plainly, including any secondary streams. A user can understand the full picture without research.

### 2. Incentive alignment
*Does the company make more money when users succeed, or when they stay longer, spend more, or remain confused?*

- **1 — Opposed.** The business model structurally requires user failure or dependency. Revenue grows when users don't achieve their goal — staying single on a dating app, remaining addicted on a gambling platform, staying confused on a deliberately degraded free tier.
- **2 — Neutral.** Revenue is not tied to user failure, but the company doesn't benefit from user success either. Flat subscriptions are the clearest example — the company gets paid whether the product delivers value or not.
- **3 — Aligned.** The company makes more money when users achieve outcomes. Commission on successful transactions, outcomes-based pricing, or direct-purchase models where sales only happen when users find value.

### 3. Captivity
*How easy is it to leave? Is data portable? Is cancellation straightforward?*

- **1 — Deliberately trapped.** Lock-in is engineered by design. Cancellation flows use dark patterns; data is locked in proprietary formats by deliberate choice; deletion requests don't result in actual deletion; subscriptions auto-renew without clear notice and are difficult to cancel.
- **2 — Friction.** Leaving is possible but inconvenient. Data export exists but is incomplete; cancellation is accessible but not prominent; some lock-in exists, though not necessarily by deliberate design.
- **3 — Portable.** Data is exportable in usable formats; cancellation is self-serve and immediate; clear renewal notice; no meaningful penalty for leaving.

### 4. Engagement extraction
*Does the product benefit from maximising time-in-app regardless of whether that time serves the user?*

- **1 — Exploitative.** Mechanics are borrowed directly from addiction and gambling design: variable reward schedules, streak anxiety with real loss aversion, notifications calibrated to pull users back when they're disengaging, infinite scroll with no natural stopping point. The product is exploiting psychological vulnerabilities, not just encouraging use.
- **2 — Present.** Engagement mechanics exist and are tied to revenue, but fall short of exploitative. The product benefits from time spent regardless of user outcome, but does not actively exploit psychological vulnerabilities to achieve it.
- **3 — Restrained.** Product is primarily task-focused. Limited push notifications. No streak or guilt mechanics. The product is designed to get out of the user's way.

### 5. Multi-sided tension
*When the interests of different customer groups conflict, whose side does the company take?*

- **1 — Users are the product.** Users are actively sold to the paying party. Recommendations are driven by advertiser spend or employer payment; user data is sold or shared with third parties in ways users cannot see or contest; there is no meaningful recourse when interests conflict.
- **2 — Mixed record.** Nominal user protections exist but the company's track record when interests conflict is ambiguous or unresolved. Stated policies exist but have not been meaningfully tested.
- **3 — Users defended.** No advertiser relationship, or clear structural protections when interests conflict. Track record of siding with users when it costs the company something.

> If a company is not multi-sided (serves only users), this dimension scores 3 by default, as there is no structural conflict to resolve.

### 6. Algorithmic transparency
*Does the product show you what it says it shows you, or is the feed, search, or recommendation surface shaped by undisclosed forces?*

- **1 — Opaque and compromised.** Algorithmic ranking is actively shaped by paid placement, platform commercial preferences, or deliberate suppression of disfavoured content — none of which is disclosed to users. What users see is materially different from what the system claims to surface.
- **2 — Partially disclosed.** Algorithmic shaping exists and is broadly known, but specific signals, paid influences, or suppression criteria are not transparent. Users know something is happening but cannot see what.
- **3 — Honest.** Ranking signals are disclosed; paid placement is clearly labelled; the platform does not suppress content beyond stated and consistently applied community guidelines.

> For products with no algorithmic content layer (direct-purchase tools, task-focused apps, simple catalogues), this dimension scores 3 by default.

### 7. Ownership pressure *(Trajectory)*
*Who owns this company, and what structural pressures are they under to extract value from users?*

- **1 — Maximum pressure.** PE-owned; public company with ad-supported model under quarterly earnings pressure; late-stage VC with active return pressure; or parent company that has publicly redirected investment away from the product while continuing to monetise its user base.
- **2 — Moderate pressure.** Public company (subscription or mixed model); mid-stage VC; or founder-controlled public company with some insulation from pure shareholder pressure.
- **3 — Low pressure.** Bootstrapped and profitable; co-op or employee-owned; nonprofit or mission-locked structure; early-stage with genuine long runway.

> This dimension predicts trajectory, not current behaviour. A score of 1 here means the ownership situation represents a material and present risk to user interests — not just that future pressure may increase. Uncertainty about future ownership is handled through flags, not scores.

---

## Flags

Flags appear alongside the profile label when information exists that a user should know but that doesn't belong in a dimension score. Flags do not affect the score. They are informational.

All flags require a cited source and a one-line explanation. They are applied by the analyst and can be added or removed through community verification.

### Ownership & leadership

| Flag | Meaning |
|---|---|
| **Founder conduct** | Founder or CEO publicly associated with harmful investments, causes, or behaviour |
| **Unsavoury backing** | Funded by a VC or investor with a documented pattern of harmful portfolio behaviour |
| **Significant layoffs** | 10%+ workforce reduction in the past 12 months |
| **Active divestment** | Parent company has publicly deprioritised or is exiting the product |
| **Acquisition in progress** | Company is under confirmed or strongly rumoured acquisition |
| **Founder exit** | Founder has left or been removed post-acquisition |

### Business model

| Flag | Meaning |
|---|---|
| **Ads introduced** | Advertising added to a previously ad-free product |
| **Feature degraded** | Pricing increased or features removed without equivalent value added |
| **Free tier degraded** | Free tier materially worsened to pressure subscription conversion |
| **New data sharing** | Data sharing arrangements introduced or expanded post-acquisition |
| **B2B pipeline** | Consumer product functions partly as a sales pipeline for an enterprise tier |

### Legal & regulatory

| Flag | Meaning |
|---|---|
| **Active investigation** | Under regulatory investigation (privacy, antitrust, consumer protection) |
| **Settled action** | Settled class action or regulatory fine involving user harm in the past 3 years |
| **Policy violation** | Documented breach of own terms of service or privacy policy |
| **Mandated changes** | Government-required changes to practices in any major market |

### Product & labour

| Flag | Meaning |
|---|---|
| **Product sunset risk** | Shutdown announced or strongly rumoured |
| **Union dispute** | Active labour dispute or documented unfair labour practice |
| **Support degraded** | Significant reduction in customer support capacity or quality |

### Algorithmic

| Flag | Meaning |
|---|---|
| **Documented suppression** | Evidence of content suppression beyond stated community guidelines |
| **Undisclosed promotion** | Evidence of paid or preferred content promoted without clear labelling |
| **Filter bubble** | Documented algorithmic narrowing that limits user access to information |

---

## Confidence scoring

Every source used to inform a score is classified as either **assessed** or **inferred**. This classification rolls up to a confidence split shown at both dimension and profile level.

| Type | Definition |
|---|---|
| **Assessed** | Primary source: company website, SEC or regulatory filing, terms of service, pricing page, official statement, verified financial report. |
| **Inferred** | Secondary or deductive: journalism, logical deduction from business structure, pattern matching, community reports, reported but unverified claims. |

The confidence split is displayed as a ratio per dimension and as an aggregate at profile level — for example: *4 sources — 3 assessed, 1 inferred = 75% assessed.*

High inferred scores are themselves editorial information. A company that is hard to score confidently is exhibiting opacity. This is noted in the writeup.

There is no threshold below which we withhold a score — we publish with a low confidence rating and flag it for community verification. Opacity is a behaviour worth surfacing.

### Confidence thresholds

| Level | Assessed % | What it means |
|---|---|---|
| **High confidence** | 70%+ | Well-supported. Suitable for citation. |
| **Medium confidence** | 40–70% | Reasonable but has meaningful inferred components. Treat as informed analysis. |
| **Low confidence** | Below 40% | Largely structural inference. Flagged for priority community verification. |

---

## How scores are produced

### Step 1 — Agent assessment
An AI agent searches public sources, scores each dimension 1–3, tags each source as assessed or inferred, and produces a confidence split per dimension and in aggregate. This is the research and scoring input — not a final score.

### Step 2 — Analyst review
A human analyst reviews the agent's output, corrects errors, adds context, applies flags, and signs off. The signed-off version is what gets published. The analyst's judgment determines the final profile label and spectrum position.

### Step 3 — Community verification
Readers can submit new sources, contest dimension scores, and shift the confidence split over time. Community input can upgrade inferred evidence to assessed if documented sources are provided. Community members can also nominate new flags or contest existing ones.

Companies may engage directly to correct the record. If a company provides new information that changes a score, the entry is updated with a changelog. The original score and date are preserved. Company engagement is noted as a verification status on the profile.

---

## Versioning

Every score is a snapshot. Entries are dated and versioned. When a score changes — due to new information, community input, or company response — a new version is published with a changelog explaining what changed and why. The historical record is preserved.

Examples:
- `v1.0` — initial score
- `v1.1` — updated after community sources submitted
- `v1.2` — updated after company response
- `v2.0` — rescored after acquisition or major business model change

Ownership changes, acquisitions, and major business model shifts trigger a rescore review. A product that scores Aligned under one owner may score very differently under another. The trajectory flag exists precisely for situations where this risk is visible before it materialises.

---

## What The Rake is not

- It is not a legal document or regulatory filing
- It is not a claim about what companies do in private
- It is not a campaign to get companies shut down
- It is not affiliated with any company, investor, or advocacy group

It is analysis, applied consistently, in public, with sources. Scores reflect the public record at a point in time. They are not verdicts.

---

*The Rake scoring methodology v1.1 — April 2026. This document is open. Fork it, critique it, improve it.*
