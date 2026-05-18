import anthropic
import sys
import os
import re
import glob
from datetime import datetime

# ── config ──────────────────────────────────────────────────────────────────
PHASE1_MODEL = "claude-opus-4-5"
PHASE2_MODEL = "claude-sonnet-4-5"
MAX_TOKENS = 12000
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

# ── master sources ────────────────────────────────────────────────────────────
def master_path(company_slug):
    return os.path.join(ISSUES_DIR, company_slug, "sources-master.md")

def parse_source_blocks(text):
    """Extract source blocks from a phase 1 output. Returns list of {url, block}."""
    sources = []
    positions = [m.start() for m in re.finditer(r'^SOURCE \d+$', text, re.MULTILINE)]
    for i, pos in enumerate(positions):
        if i + 1 < len(positions):
            block = text[pos:positions[i + 1]].strip()
        else:
            remaining = text[pos:]
            stop = re.search(r'\n---\n|\nGAPS\n|\nFLAGS OBSERVED\n|\nSEARCH LOG\n|\nTOTAL SOURCES:', remaining)
            block = remaining[:stop.start()].strip() if stop else remaining.strip()
        url_match = re.search(r'^URL:\s+(\S+)', block, re.MULTILINE)
        if url_match and block:
            sources.append({"url": url_match.group(1), "block": block})
    return sources

def extract_section(text, section_name):
    """Extract the content of a named section (GAPS, FLAGS OBSERVED, etc.)."""
    pattern = re.compile(
        rf'(?:^|\n){re.escape(section_name)}\n+(.*?)(?=\n---\n|\nGAPS\n|\nFLAGS OBSERVED\n|\nSEARCH LOG\n|\nSOURCE INDEX\n|\nTOTAL SOURCES:|\Z)',
        re.DOTALL | re.MULTILINE
    )
    match = pattern.search(text)
    return match.group(1).strip() if match else ""

def load_master(company_slug):
    """Load master sources file. Returns (content, set_of_urls) or (None, set())."""
    path = master_path(company_slug)
    if not os.path.exists(path):
        return None, set()
    with open(path, "r") as f:
        content = f.read()
    urls = set(re.findall(r'^URL:\s+(\S+)', content, re.MULTILINE))
    return content, urls

def update_master(company_slug, phase1_output):
    """Append new source blocks from a phase 1 run to the master sources file."""
    path = master_path(company_slug)

    existing_urls = set()
    existing_sources = []
    if os.path.exists(path):
        with open(path, "r") as f:
            master_content = f.read()
        existing_urls = set(re.findall(r'^URL:\s+(\S+)', master_content, re.MULTILINE))
        existing_sources = parse_source_blocks(master_content)

    new_sources = parse_source_blocks(phase1_output)
    added = 0
    for source in new_sources:
        if source["url"] not in existing_urls:
            existing_sources.append(source)
            existing_urls.add(source["url"])
            added += 1

    gaps = extract_section(phase1_output, "GAPS")
    flags = extract_section(phase1_output, "FLAGS OBSERVED")

    with open(path, "w") as f:
        f.write(f"RESEARCH DATE: {datetime.today().strftime('%d %B %Y')}\n")
        f.write(f"METHODOLOGY VERSION: {METHODOLOGY_VERSION}\n")
        f.write(f"\n---\n\n")
        for i, source in enumerate(existing_sources, 1):
            block = re.sub(r'^SOURCE \d+', f'SOURCE {i}', source["block"], count=1, flags=re.MULTILINE)
            f.write(block + "\n\n")
        f.write("---\n\n")
        if gaps:
            f.write(f"GAPS\n\n{gaps}\n\n---\n\n")
        if flags:
            f.write(f"FLAGS OBSERVED\n\n{flags}\n\n---\n\n")
        f.write(f"TOTAL SOURCES: {len(existing_sources)}\n")

    print(f"\n✓ Master sources updated: {added} new sources added ({len(existing_sources)} total)")
    print(f"  Saved to {path}")
    return added

def load_phase2_input(company_slug):
    """Load master sources if available, else fall back to latest phase 1 run."""
    path = master_path(company_slug)
    if os.path.exists(path):
        print(f"Loading master sources from: {path}")
        with open(path, "r") as f:
            return f.read(), path
    return load_latest_phase1(company_slug)

# ── phases ────────────────────────────────────────────────────────────────────
def run_phase1(company, company_slug, seed_urls=None):
    print(f"\n── Phase 1: Research ({company}) ──────────────────────────────")
    print("Running with live web search. This may take a few minutes...\n")

    master_content, existing_urls = load_master(company_slug)

    if master_content:
        print(f"Master sources found: {len(existing_urls)} URLs already sourced")

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

    if existing_urls:
        user_message += "URLS ALREADY SOURCED — do not create source blocks for these, they are already documented:\n"
        for url in sorted(existing_urls):
            user_message += f"  {url}\n"
        user_message += "\nFocus on finding sources not in the above list. Prioritise dimensions with weak coverage or explicit gaps.\n\n"
        master_gaps = extract_section(master_content, "GAPS")
        if master_gaps:
            user_message += f"GAPS FROM PREVIOUS RESEARCH — prioritise finding sources for these dimensions:\n{master_gaps}\n\n"

    user_message += f"Research company: {company}"

    response = client.messages.create(
        model=PHASE1_MODEL,
        max_tokens=MAX_TOKENS,
        system=system_prompt,
        tools=[{"type": "web_search_20250305", "name": "web_search"}],
        messages=[{"role": "user", "content": user_message}]
    )

    output_parts = []
    for block in response.content:
        if block.type == "text":
            output_parts.append(block.text)

    output = "\n\n".join(output_parts)
    path = save_output(company_slug, 1, output)
    update_master(company_slug, output)
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

    phase2_only = "--phase2" in args
    if phase2_only:
        args = [a for a in args if a != "--phase2"]

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
        print("\n── Skipping Phase 1 — loading existing research ─────────")
        phase1_output, phase1_path = load_phase2_input(company_slug)
    else:
        phase1_output, phase1_path = run_phase1(company, company_slug, seed_urls)
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
