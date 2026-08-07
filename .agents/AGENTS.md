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
