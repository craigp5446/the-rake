# How The Rake scores companies

**Version 1.2 — April 2026 — Open methodology**

---

The Rake scores tech companies on how their revenue models relate to the interests of the people who use them. Every score is derived from public information, applied through a consistent framework, with sources cited and confidence levels shown. We are not publishing legal findings or making accusations. We are applying a transparent system to public facts.

This document describes that system in full. If you disagree with a score, the methodology is your starting point.

---

## The five profile labels

Every company receives a spectrum position from 0–100 and a corresponding profile label. The label is editorial, not mechanical. It reflects a judgment about the full picture, weighted toward incentive alignment as the core question. The spectrum position conveys where within a band a company sits; two companies with the same label can occupy meaningfully different positions.

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

Each company is scored across seven dimensions on a 1–3 scale. Not every dimension applies to every company. Dimensions that genuinely do not apply are marked N/A and excluded from the profile calculation — see [N/A dimensions](#na-dimensions) below.

| Dimension | The question it answers |
|---|---|
| Revenue clarity | Can a user immediately understand how this company makes money? |
| Incentive alignment | Does the company make more money when users succeed, or when they stay longer, spend more, or remain confused? |
| Captivity | How easy is it to leave? Is data portable? Is cancellation straightforward? |
| Engagement extraction | Is the product engineered to defeat the user's ability to disengage, or does engagement reflect genuine user value? |
| Multi-sided tension | When the interests of different customer groups conflict — including through platform safety and content decisions — whose side does the company take? |
| Algorithmic accountability | Does the company take responsibility for what its systems surface and amplify? |
| Ownership pressure | Who owns this company, and what structural pressures are they under to extract value from users? *(Trajectory dimension — see below)* |

**Ownership pressure** describes what a product is *becoming*, not only what it currently is. It functions as a trajectory signal and informs flags as well as the score.

**Algorithmic accountability** applies primarily to platforms where a feed, search result, recommendation surface, or content moderation policy is a meaningful part of the product. For tools with no algorithmic content layer and no user-generated content, this dimension is marked N/A.

**Multi-sided tension** applies when a company serves more than one distinct customer group, or when it hosts third-party content where moderation decisions affect different user groups differently. For companies serving only a single user group with no content layer, this dimension is marked N/A.

If insufficient public data exists to score a dimension, it is left unscored rather than guessed. Opacity is itself a signal and is noted in the writeup.

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
*Is the product engineered to defeat the user's ability to disengage, or does engagement reflect genuine user value?*

- **1 — Weaponised.** The product is deliberately engineered to defeat the user's own ability to disengage. Psychological mechanisms are exploited to override user judgment — not to deliver value, but to extract time and attention regardless of user outcome. The gap between what users want to do (stop) and what they do (continue) is engineered, not incidental.
- **2 — Extractive.** Engagement mechanics exist and are tied to revenue, but stop short of deliberately exploiting psychological vulnerabilities. The product benefits from time spent regardless of user outcome, but does not systematically engineer against the user's ability to disengage.
- **3 — Value-driven.** Engagement reflects genuine user value. The product is used when it is useful and does not employ mechanics designed to extend use beyond that. Engagement that incidentally benefits the business is acceptable here provided it is not calibrated against user judgment.

> Note: this dimension asks about product design decisions, not business model structure. A company can score neutrally on incentive alignment (flat subscription) while scoring poorly on engagement extraction if its product is deliberately engineered to override user judgment. These are different questions.

### 5. Multi-sided tension
*When the interests of different customer groups conflict — including through platform safety and content decisions — whose side does the company take?*

- **1 — Users are the product.** Users are actively sold to the paying party, or the platform's content and moderation decisions consistently favour paying or high-revenue users over the safety and interests of the broader user base. Recommendations are driven by advertiser spend or platform commercial preferences; user data is sold or shared with third parties in ways users cannot see or contest; there is no meaningful recourse when interests conflict.
- **2 — Mixed record.** Nominal user protections exist but the company's track record when interests conflict is ambiguous or unresolved. This includes platforms where moderation policy exists on paper but documented incidents suggest consistent prioritisation of revenue over user safety.
- **3 — Users defended.** No advertiser relationship, or clear structural protections when interests conflict. Track record of siding with users — including enforcing content and safety standards — when it costs the company something.

> When a platform hosts third-party content, its content moderation decisions are treated as a form of taking sides between user groups. A policy of deliberate non-intervention is a scoreable stance, not a neutral one — particularly when the platform earns revenue from the content it declines to moderate.

> If a company is not multi-sided and hosts no third-party content, this dimension is marked N/A.

### 6. Algorithmic accountability
*Does the company take responsibility for what its systems surface and amplify?*

- **1 — Unaccountable.** The platform's algorithmic systems actively surface, amplify, or recommend harmful content, and the company has chosen not to intervene despite awareness. This includes deliberate non-intervention as a policy stance, paid placement that is not disclosed, and suppression of content beyond stated guidelines without explanation. Documented incidents of harm are treated as evidence of the underlying policy, not as isolated events.
- **2 — Partial accountability.** The company acknowledges responsibility for algorithmic outcomes and has moderation or ranking policies in place, but these are inconsistently applied, incompletely disclosed, or have a documented record of failing to prevent significant harm. The company is trying but the systems are not working reliably in users' interests.
- **3 — Accountable.** The company takes clear and documented responsibility for what its systems surface. Ranking signals are disclosed in meaningful detail; paid placement is clearly labelled; content moderation policies are published and consistently applied; and the company has a documented record of intervening when its systems cause harm.

> For products with no algorithmic content layer and no user-generated content, this dimension is marked N/A.

### 7. Ownership pressure *(Trajectory)*
*Who owns this company, and what structural pressures are they under to extract value from users?*

- **1 — Maximum pressure.** PE-owned; public company with ad-supported model under quarterly earnings pressure; late-stage VC with active return pressure; or parent company that has publicly redirected investment away from the product while continuing to monetise its user base.
- **2 — Moderate pressure.** Public company (subscription or mixed model); mid-stage VC; or founder-controlled public company with some insulation from pure shareholder pressure.
- **3 — Low pressure.** Bootstrapped and profitable; co-op or employee-owned; nonprofit or mission-locked structure; early-stage with genuine long runway.

> This dimension predicts trajectory, not current behaviour. A score of 1 here means the ownership situation represents a material and present risk to user interests — not just that future pressure may increase. Uncertainty about future ownership is handled through flags, not scores.

---

## N/A dimensions

Dimensions that genuinely do not apply to a company's product are marked N/A and excluded from the profile calculation and spectrum position. Every N/A must be justified with a one-sentence rationale in the scorecard. N/A is not a default — if there is reasonable doubt about whether a dimension applies, it is scored.

A company cannot receive N/A on more than three dimensions. If more than three dimensions don't apply, the company may be outside The Rake's current scope and this should be noted.

The profile summary displays all seven dimensions, showing N/A alongside scored dimensions so the full picture is visible at a glance:

```
PROFILE SUMMARY

Label: Compromised
Spectrum position: 53
Dimensions scored: 5 of 7

Revenue clarity             2
Incentive alignment         1
Captivity                   2
Engagement extraction       2
Multi-sided tension         1
Algorithmic accountability  N/A — no algorithmic content layer
Ownership pressure          3

Overall confidence: Medium (62% assessed)
```

---

## Flags

Flags surface the most significant positive and negative findings from the research — specific documented incidents or structural commitments that are important enough to affect how a dimension score should be read, but too specific or time-bound to change the score on their own.

Every flag is:
- **Tied to a specific dimension** — flags do not float free of the framework
- **Significant enough to matter** — if it is not significant enough to affect how a dimension score is read, it is not a flag
- **Grounded in a cited source** — flags require at least one source, assessed preferred
- **Specific in the report** — flag categories are defined in the methodology; flag instances in reports are always named, dated, and sourced

Flags come in two types: **negative** (a documented incident or structural problem serious enough to affect how the dimension score is read) and **positive** (a documented commitment or action that genuinely distinguishes a company from the norm). Both types are applied using the same evidence bar.

A flag does not mechanically modify the dimension score. Instead, it is the cited evidence that makes the analyst's reasoning legible — particularly when a documented incident is what justifies a score of 1 rather than 2, or a structural commitment is what earns a 3.

### Flag categories

Each category includes a trigger condition: what to look for, the threshold for application, and the dimension it maps to.

---

**Dimension 1 — Revenue clarity**

*Negative: Hidden revenue stream*
Look for: a material revenue stream — data licensing, advertising, affiliate fees, referral arrangements — that does not appear anywhere in the company's pricing page, privacy policy, onboarding, or terms of service. Threshold: the stream must be material and its absence from user-facing documentation deliberate rather than an oversight. Requires at least one assessed source confirming the stream exists and one confirming it is not disclosed to users.

*Positive: Proactive revenue disclosure*
Look for: companies that voluntarily disclose all revenue streams in plain language during onboarding or on their pricing page, including streams not legally required to be disclosed. Threshold: disclosure must go meaningfully beyond legal minimum — not a buried privacy policy clause. Must be user-facing, plain language, and unprompted by regulation. Requires assessed source.

---

**Dimension 2 — Incentive alignment**

*Negative: Documented failure dependency*
Look for: evidence that the business model structurally requires users not achieving their stated goal in order to sustain or grow revenue. Threshold: must be structural, not incidental. Requires either an assessed source demonstrating the dependency, or multiple strong inferred sources making the same case independently. A single opinion piece is not sufficient.

*Positive: Outcomes-based pricing*
Look for: pricing models where the company charges only when a user achieves a defined, user-meaningful outcome — a successful hire, a completed transaction, an achieved goal. Threshold: the outcome must be defined by user success, not company-defined engagement milestones. Must be a primary or significant revenue model. Requires assessed source.

---

**Dimension 3 — Captivity**

*Negative: Dark pattern cancellation*
Look for: cancellation flows that use documented dark patterns — confirm-shaming, hidden options, mandatory retention calls, deliberate multi-step obstruction, or cooling-off periods not required by law. Threshold: must be confirmed by a regulatory finding, a systematic user research study, or documented by a credible technology publication that has tested the flow directly. User reviews alone are not sufficient.

*Positive: Full data portability*
Look for: data export covering all material user data in open, machine-readable formats, available on demand, with no material omissions, and going beyond what GDPR or equivalent regulation requires. Threshold: must be documented on the company's own platform or help pages, and must cover data users would genuinely want to take with them — not a minimal compliance export.

---

**Dimension 4 — Engagement extraction**

*Negative: Extractive engagement mechanics confirmed*
Look for: evidence that specific engagement mechanics — streak loss anxiety, notification timing, reward schedules — are deliberately calibrated to extract time or attention beyond what serves the user's stated goal. Threshold: must be confirmed by internal documentation, academic research, or credible investigative reporting. The mechanic must be shown to be extractive in intent or outcome. Gamification that demonstrably serves user goals does not qualify.

*Positive: Usage limiting by design*
Look for: product features that actively help users reduce, cap, or become aware of their own usage — session limits, usage dashboards, disengagement prompts — built into the core product rather than buried in settings. Threshold: must be a meaningful, accessible feature the company has actively built and promoted, at some cost to engagement metrics. Requires assessed source.

---

**Dimension 5 — Multi-sided tension**

*Negative: Harmful user monetisation*
Look for: evidence that the platform directly earns revenue from users who are causing documented harm to other users — hate groups with paid subscriptions, harassment accounts with monetised content, bad actors whose presence generates platform revenue. Threshold: requires evidence both that the harmful user exists on the platform and that the platform earns revenue from them. Named examples required. Assessed source strongly preferred; journalism with named examples acceptable.

*Positive: User-side enforcement at commercial cost*
Look for: documented instances where the company enforced user protections, removed a paying customer, or sided with users against an advertiser or business customer at a measurable cost to its own revenue. Threshold: the commercial cost must be real and documented — not a PR statement about values. Requires at least one assessed or strong inferred source confirming both the decision and the cost.

---

**Dimension 6 — Algorithmic accountability**

*Negative: Documented harmful amplification*
Look for: specific documented instances where the platform's algorithm surfaced, promoted, or recommended harmful content — extremist material, health misinformation, content targeting vulnerable users — with evidence that the company was aware of the pattern and chose not to intervene. Threshold: must be a specific incident or documented pattern, not a general allegation. Requires evidence of both the amplification and the company's awareness and non-intervention. A single strong source with named examples is the minimum.

*Positive: Algorithmic criteria publicly documented*
Look for: company publications that explain in meaningful detail the primary signals shaping its recommendation, feed, or ranking systems — not marketing language, but actual criteria or principles that users and researchers can act on. Threshold: must be specific enough to be useful, current, and maintained. Requires assessed source.

---

**Dimension 7 — Ownership pressure**

*Negative: Active divestment*
Look for: evidence that a parent company has publicly deprioritised, reduced investment in, or signalled intention to exit a product while continuing to monetise its user base. Threshold: must be a specific documented signal — earnings call, shareholder letter, regulatory filing, or confirmed statement from named leadership. Speculation is not sufficient.

*Negative: Founder conduct*
Look for: personal investments, public associations, or documented behaviour by the founder or CEO that conflicts materially with the company's stated values, or that users would consider significant to their decision to use and pay for the product. Threshold: must be specific and documented — a named investment, a public statement, a confirmed association. Not rumour or inference. Requires at least one assessed source. The conflict with company values or user interests must be clearly articulable.

*Positive: Mission-lock structure*
Look for: legally binding structural commitments that constrain the company's ability to prioritise extraction over user interests — benefit corporation status, statutory mission lock, employee or cooperative ownership, endowment funding with independence conditions. Threshold: must be a legal structure, not a stated commitment or values document. Requires assessed source confirming the structure exists and what it constrains.

---

## Confidence scoring

Every source used to inform a score is classified as either **assessed** or **inferred**. This classification rolls up to a confidence split shown at both dimension and profile level.

| Type | Definition |
|---|---|
| **Assessed** | Primary source: company website, SEC or regulatory filing, terms of service, pricing page, official statement, verified financial report. |
| **Inferred** | Secondary or deductive: journalism, logical deduction from business structure, pattern matching, community reports, reported but unverified claims. |

The confidence split is displayed as a ratio per dimension and as an aggregate at profile level — for example: *4 sources — 3 assessed, 1 inferred = 75% assessed.*

High inferred ratios are themselves editorial information. A company that is hard to score confidently is exhibiting opacity. This is noted in the writeup.

There is no threshold below which we withhold a score, as opacity is a behaviour worth surfacing. However the editorial team may choose not to publish a report with a seriously low confidence rating, or may instead invest more effort in finding sources that improve it.

### Confidence thresholds

| Level | Assessed % | What it means |
|---|---|---|
| **High confidence** | 70%+ | Well-supported. Suitable for citation. |
| **Medium confidence** | 40–70% | Reasonable but has meaningful inferred components. Treat as informed analysis. |
| **Low confidence** | Below 40% | Largely structural inference. Flagged for priority community verification. |

---

## How scores are produced

### Phase 1 — Research collection
An AI agent searches public sources systematically across company websites, filings, terms of service, press, and regulatory records. It collects and organises all evidence relevant to the seven dimensions, tags each source as assessed or inferred, and produces a structured research document. The agent does not score anything — it finds and organises evidence.

### Phase 2 — Scoring
A second AI agent takes the Phase 1 research document and applies the scoring framework to it. It scores each dimension 1–3 (or marks it N/A with a rationale), writes a rationale grounded in the evidence, produces a confidence split per dimension, proposes a profile label and spectrum position, and identifies flags. The agent works only from the Phase 1 document — it does not search the web or add new information.

### Phase 3 — Human analysis and narrative
A human reviews the Phase 1 research and Phase 2 scorecard, checks sources, corrects errors, applies final judgment on the profile label and spectrum position, and writes the published narrative. This final step is completed by a human, not generated by an AI. The analyst's judgment determines what gets published.

Community and company verification are planned features for a future version of The Rake. For now, if a company provides new information that changes a score, the entry is updated with a changelog and the original score and date are preserved.

---

## Versioning

Every score is a snapshot. Entries are dated and versioned. When a score changes — due to new information, significant new coverage, community input, or company response — a new version is published with a changelog explaining what changed and why. The historical record is preserved.

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

*The Rake scoring methodology v1.2 — April 2026. This document is open. Fork it, critique it, improve it.*