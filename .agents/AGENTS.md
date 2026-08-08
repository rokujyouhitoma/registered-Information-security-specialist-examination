# Custom Agent Rules for registered-Information-security-specialist-examination

This file contains project-scoped rules and instructions for all AI agents working in this workspace.

---

## Development & Documentation Workflow Rules

You MUST follow this structured, issue-driven development lifecycle for all modifications, documentations, and new features:

1. **Issue Creation (`create-issue`)**:
   - Every task, documentation addition, refactoring, or feature MUST start with an issue file under the `issues/` directory.
   - Use the `create-issue` skill to initialize a new issue and register it in [issues/README.md](../issues/README.md).

2. **Issue Refinement (`polish-issue`)**:
   - Before writing any code, modifying documents, or making source changes, the issue MUST be refined.
   - Use the `polish-issue` skill to refine requirements, map dependencies, outline implementation steps, define target files, choose a branch name, and establish verification criteria (DoD).
   - Update the issue status to `In Progress` in both the issue header and [issues/README.md](../issues/README.md).

3. **Implementation**:
   - Create a feature branch following the branch naming convention (`feat/<issue-id>-<desc>`, `docs/<issue-id>-<desc>`, `refactor/<issue-id>-<desc>`).
   - Follow the detailed plan outlined in the polished issue.
   - **Mandatory Closure Compiler Build for JS Modifications**:
     - Whenever any JavaScript file under `src/js/` (or subdirectories) is created, modified, or refactored, you MUST run Closure Compiler (`make build` or `npm run build:js`) with the strictest optimization options (`ADVANCED_OPTIMIZATIONS`).
     - The updated compiled artifact (`site/fm_index_engine.min.js`) MUST be included in the same commit and pull request.
   - Run tests, check path validity, and verify document integrity.

4. **Issue Closing & Git Workflow (`git-workflow`)**:
   - Upon completion, update the issue status to `Closed` and check all DoD criteria.
   - Move the issue file to `issues/closed/<issue-id>-<desc>.md`.
   - Update the status in [issues/README.md](../issues/README.md) to record the issue under "2. 完了済み Issue 一覧".
   - Use `git-workflow` to commit changes with Conventional Commit format referencing the Issue ID, then merge back to `main`.

---

## Documentation & Link Rules

- **Relative Paths Only**:
  - You MUST strictly use relative paths (never absolute paths like `file:///workspace/...` or `file:///root/...`) for all internal links across all `.md` files to ensure compatibility across different environments (Git, GitHub, GitHub Pages, local IDE).
- **IPA Syllabus & Official Terminology Compliance**:
  - All exam learning materials in `docs/` MUST strictly comply with official IPA terminology (Syllabus Ver.2.1 and Subject A-2 Supplement Ver.4.0).
- **Primary Source References (`references/`)**:
  - Primary reference PDF materials (IPA syllabi, ITSS V3 2011, NIST SP 800) MUST be placed under `references/` and cataloged in [references/README.md](../references/README.md).

---

## Threat Modeling & Security Review Rules

- Threat modeling results MUST be outputted under the `project-docs/` or `issues/` directory when analyzing system security features.
- For any identified vulnerabilities or threats addressed, include links to corresponding closed issue files under `issues/closed/`.

---

## User Centricity & Persona Alignment Rules

- **Persona Value Mapping ([REQ-02](../project-docs/requirements/REQ-02-user_personas_and_scenarios.md))**:
  - All new features, UI controls, and study materials MUST explicitly map to and enhance the learning experience of the 4 defined user personas:
    1. **Persona 1 (Yuta Sasaki - Beginner)**: Visual aids, cheat sheet navigation, quick glossary lookup.
    2. **Persona 2 (Kenichi Takahashi - Practical Afternoon Essay Taker)**: Precise 30-50 char essay answers, EDR/XDR/Zero Trust deep-dives.
    3. **Persona 3 (Misaki Nakamura - SysAdmin / ISMS Admin)**: ISMS 2022 controls, CASB/CSPM, audit checklists.
    4. **Persona 4 (Daisuke Suzuki - Last-minute Reviewer)**: Exam cheatsheet, high-speed full-text search, randomized quiz drill, PWA offline support.

---

## Subject B Essay Answer Rules

- **IPA Character Count & Keyword Compliance**:
  - All Subject B essay practice answers MUST strictly conform to IPA exam character length limits (typically 30–50 Japanese characters) and include explicit character length badges (e.g., `[48字 / 45-50字制限適合]`).
  - Model answers MUST use official IPA terminology (Syllabus Ver.2.1 & Supplement Ver.4.0) without ambiguous jargon.

---

## UI/UX & Responsive Dark Mode Rules

- **Design System Aesthetics**:
  - All web interactive components (Full-text search, Quiz engine, Blast Radius visualizers) MUST adhere to high-contrast modern dark mode design tokens (`#0f172a`, `#1e293b`, `#6366f1`, `#10b981`).
  - Interactive elements MUST include dynamic hover effects, pulse animations for critical states, and responsive flex/grid layouts compatible with both desktop and mobile viewports.

---

## Static Build & Asset Synchronization Rules

- **Mandatory HTML & Search Index Rebuild**:
  - Whenever Markdown sources in `docs/` or data files under `src/data/` are modified, `make build` MUST be executed to regenerate static HTML documents under `site/`, update `search_index.json`, and sync PWA Service Worker (`sw.js`) precache lists.
