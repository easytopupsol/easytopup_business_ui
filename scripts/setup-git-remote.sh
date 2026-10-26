#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/.."
REMOTE_URL='https://github.com/easytopupsol/easytopup_business_ui.git'
command -v git >/dev/null || { echo 'Git not installed'; exit 1; }
if [ ! -d .git ]; then git init; fi
if git remote get-url origin >/dev/null 2>&1; then
  git remote set-url origin "$REMOTE_URL"
else
  git remote add origin "$REMOTE_URL"
fi
git branch -M main
printf '\nGit remote configured. Nothing has been pushed.\n'
git remote -v
