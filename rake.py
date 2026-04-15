import anthropic
import sys
import os
from datetime import datetime

# ── config ──────────────────────────────────────────────────────────────────
MODEL = "claude-opus-4-5"
MAX_TOKENS = 8000
PROMPTS_DIR = "prompts"
ISSUES_DIR = "issues"
METHODOLOGY_VERSION = "1.1"  # Update this when the methodology changes

# ── helpers ──────────────────────────────────────────────────────────────────
def load_prompt(filename):
    path = os.path.join(PROMPTS_DIR, filename)
    with open(path, "r") as f:
        return f.read()

def save_output(company_slug, phase, content):
    folder = os.path.join(ISSUES_DIR, company_slug)
    os.makedirs(folder, exist_ok=True)
    date = datetime.today().strftime("%Y-%m-%d")
    filename = f"{date}-phase{phase}.md"
    path = os.path.join(folder, filename)
    with open(path, "w") as f:
        f.write(content)
    print(f"\n✓ Saved to {path}")
    return path

def run_phase1(company, company_slug):
    print(f"\n── Phase 1: Research ({company}) ──────────────────────────────")
    print("Running with live web search. This may take a few minutes...\n")

    client = anthropic.Anthropic()
    system_prompt = load_prompt("phase1-collection.md")

    response = client.messages.create(
        model=MODEL,
        max_tokens=MAX_TOKENS,
        system=system_prompt,
        tools=[{"type": "web_search_20250305", "name": "web_search"}],
        messages=[{
            "role": "user",
            "content": (
                f"METHODOLOGY VERSION: {METHODOLOGY_VERSION}\n\n"
                f"Research company: {company}"
            )
        }]
    )

    output_parts = []
    for block in response.content:
        if block.type == "text":
            output_parts.append(block.text)

    output = "\n\n".join(output_parts)
    path = save_output(company_slug, 1, output)
    return output, path

def run_phase2(company, company_slug, phase1_output):
    print(f"\n── Phase 2: Scoring ({company}) ──────────────────────────────")
    print("Applying scoring framework...\n")

    client = anthropic.Anthropic()
    system_prompt = load_prompt("phase2-scoring.md")

    response = client.messages.create(
        model=MODEL,
        max_tokens=MAX_TOKENS,
        system=system_prompt,
        messages=[{
            "role": "user",
            "content": (
                f"METHODOLOGY VERSION: {METHODOLOGY_VERSION}\n\n"
                f"Here is the Phase 1 research document:\n\n{phase1_output}"
            )
        }]
    )

    output = response.content[0].text
    path = save_output(company_slug, 2, output)
    return output, path

# ── main ─────────────────────────────────────────────────────────────────────
def main():
    if len(sys.argv) < 2:
        print("Usage: python3 rake.py <company name>")
        print("Example: python3 rake.py substack")
        sys.exit(1)

    company = " ".join(sys.argv[1:])
    company_slug = company.lower().replace(" ", "-")

    print(f"\n🔍 The Rake — running report for: {company}")
    print(f"   Methodology version: {METHODOLOGY_VERSION}")
    print("=" * 55)

    phase1_output, phase1_path = run_phase1(company, company_slug)

    print("\n── Phase 1 complete ──────────────────────────────────────")
    print(f"Review the output at: {phase1_path}")
    print("\nPress Enter to continue to Phase 2, or Ctrl+C to stop and review first.")
    input()

    phase2_output, phase2_path = run_phase2(company, company_slug, phase1_output)

    print("\n── Phase 2 complete ──────────────────────────────────────")
    print(f"Scorecard saved to: {phase2_path}")
    print("\nPhase 3 is human-written. Open the Phase 2 scorecard and write your narrative.")
    print("Good luck.\n")

if __name__ == "__main__":
    main()