import anthropic
import sys
import os
import glob
from datetime import datetime

# ── config ──────────────────────────────────────────────────────────────────
PHASE1_MODEL = "claude-opus-4-5"
PHASE2_MODEL = "claude-sonnet-4-5"
MAX_TOKENS = 8000
PROMPTS_DIR = "prompts"
ISSUES_DIR = "issues"
METHODOLOGY_VERSION = "1.4"  # Update this when the methodology changes

# ── helpers ──────────────────────────────────────────────────────────────────
def load_prompt(filename):
    path = os.path.join(PROMPTS_DIR, filename)
    with open(path, "r") as f:
        return f.read()

def save_output(company_slug, phase, content):
    folder = os.path.join(ISSUES_DIR, company_slug)
    os.makedirs(folder, exist_ok=True)
    date = datetime.today().strftime("%Y-%m-%d")
    time = datetime.today().strftime("%H%M")
    filename = f"{date}-{time}-phase{phase}.md"
    path = os.path.join(folder, filename)
    with open(path, "w") as f:
        f.write(content)
    print(f"\n✓ Saved to {path}")
    return path

def load_latest_phase1(company_slug):
    folder = os.path.join(ISSUES_DIR, company_slug)
    pattern = os.path.join(folder, "*-phase1.md")
    files = sorted(glob.glob(pattern))
    if not files:
        print(f"Error: no Phase 1 file found for '{company_slug}' in {folder}")
        sys.exit(1)
    path = files[-1]
    print(f"Loading Phase 1 from: {path}")
    with open(path, "r") as f:
        return f.read(), path

def run_phase1(company, company_slug, seed_urls=None):
    print(f"\n── Phase 1: Research ({company}) ──────────────────────────────")
    print("Running with live web search. This may take a few minutes...\n")

    if seed_urls:
        print(f"Seed URLs: {len(seed_urls)} provided")
        for url in seed_urls:
            print(f"  {url}")
        print()

    client = anthropic.Anthropic()
    system_prompt = load_prompt("phase1-collection.md")

    user_message = f"METHODOLOGY VERSION: {METHODOLOGY_VERSION}\n\n"

    if seed_urls:
        user_message += "SEED URLS:\n"
        for url in seed_urls:
            user_message += f"  {url}\n"
        user_message += "\n"

    user_message += f"Research company: {company}"

    response = client.messages.create(
        model=PHASE1_MODEL,
        max_tokens=MAX_TOKENS,
        system=system_prompt,
        tools=[{"type": "web_search_20250305", "name": "web_search"}],
        messages=[{
            "role": "user",
            "content": user_message
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
        model=PHASE2_MODEL,
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
        print("Usage: python3 rake.py <company name> [--seeds URL1 URL2 ...]")
        print("       python3 rake.py <company name> --phase2")
        print("Example: python3 rake.py substack")
        print("Example: python3 rake.py substack --seeds https://leavesubstack.com")
        print("Example: python3 rake.py substack --phase2")
        sys.exit(1)

    args = sys.argv[1:]

    # Check for --phase2 flag
    phase2_only = "--phase2" in args
    if phase2_only:
        args = [a for a in args if a != "--phase2"]

    # Check for --seeds flag
    if "--seeds" in args:
        seed_index = args.index("--seeds")
        company_parts = args[:seed_index]
        seed_urls = args[seed_index + 1:]
    else:
        company_parts = args
        seed_urls = []

    if not company_parts:
        print("Error: company name required")
        sys.exit(1)

    company = " ".join(company_parts)
    company_slug = company.lower().replace(" ", "-")

    print(f"\n🔍 The Rake — running report for: {company}")
    print(f"   Methodology version: {METHODOLOGY_VERSION}")
    if seed_urls:
        print(f"   Seed URLs: {len(seed_urls)}")
    print("=" * 55)

    if phase2_only:
        # Load the most recent Phase 1 file for this company
        print("\n── Skipping Phase 1 — loading existing research ─────────")
        phase1_output, phase1_path = load_latest_phase1(company_slug)
    else:
        # Run Phase 1
        phase1_output, phase1_path = run_phase1(company, company_slug, seed_urls)
        print("\n── Phase 1 complete ──────────────────────────────────────")
        print(f"Review the output at: {phase1_path}")
        print("\nPress Enter to continue to Phase 2, or Ctrl+C to stop and review first.")
        input()

    # Phase 2
    phase2_output, phase2_path = run_phase2(company, company_slug, phase1_output)

    print("\n── Phase 2 complete ──────────────────────────────────────")
    print(f"Scorecard saved to: {phase2_path}")
    print("\nPhase 3 is human-written. Open the Phase 2 scorecard and write your narrative.")
    print("Good luck.\n")

if __name__ == "__main__":
    main()
