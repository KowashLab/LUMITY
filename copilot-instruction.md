# Copilot Universal Project Instructions

Global rules for any repository:

1. Scope & Changes
   - Only modify files explicitly requested or currently worked on.
   - Do NOT create or modify any `.md` files unless explicitly instructed. 
     Instead, report in chat if additional documentation is needed.
   - Focus on minimal, necessary changes; do not refactor unrelated code.
   - After changes, stage, commit, and push automatically.

# 2. Commit Guidelines

- Only commit changes that are directly related to the current feature or task.
- Keep commit messages **short, clear, and descriptive** (e.g., "feat: improve Share Property dialog").
- Do not include unrelated files or changes.
- Do not include excessive detail or bullet points in commit messages.
- Do not mention Copilot or AI in the commit message.
- If multiple changes exist, stage and commit **only the relevant files or hunks**.
- Commit message should summarize **what the commit does**, not how it was done.


3. Comments in Code
   - All comments in code MUST be written in English.
   - Avoid unnecessary comments; explain only non-obvious logic.

4. Chat Behavior
   - Communicate with the user in the chat in Russian.
   - Do not perform actions outside the instructions unless explicitly requested.
   - Suggest next steps in chat if unsure instead of generating unnecessary files or changes.

5. Automation & Deployment
   - Assume deployment is handled automatically (e.g., Vercel).
   - Focus only on committing and pushing; do not handle deployment manually.

6. Efficiency & Credit Saving
   - Avoid multiple iterative prompts for minor changes.
   - Consolidate tasks into one prompt whenever possible.
   - Limit context to current folder or relevant files to save token usage.

7. Additional Best Practices
   - Highlight potential bugs or edge cases in chat, not in extra files.
   - Ensure that changes do not introduce breaking changes outside the requested scope.
   - For large projects, work module by module instead of reviewing the entire project at once.
