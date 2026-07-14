#!/bin/bash
set -euo pipefail

# Only run in Claude Code on the web (remote) sessions
if [ "${CLAUDE_CODE_REMOTE:-}" != "true" ]; then
  exit 0
fi

cd "$CLAUDE_PROJECT_DIR"

# Matches this project's Vercel installCommand (vercel.json) — peer deps
# in this dependency tree require --legacy-peer-deps to install cleanly.
npm install --legacy-peer-deps
