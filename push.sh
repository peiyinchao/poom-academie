#!/usr/bin/env bash
#
# push.sh - one-command publish for Poom Academy (solo workflow).
#
# It does three things:
#   1. bumps the service-worker cache version in sw.js, so phones/browsers
#      fetch the fresh files instead of an old cached copy;
#   2. commits everything you changed;
#   3. pushes straight to `main`, which GitHub Pages redeploys automatically.
#
# About a minute after it finishes, the newest build is live at:
#   https://peiyinchao.github.io/poom-academie/concept-coach.html
# (open that on your iPhone; add it to the Home Screen for the app feel)
#
# Usage:
#   ./push.sh                      # commit message defaults to a timestamp
#   ./push.sh "wider hit areas"    # or pass your own message
#
set -euo pipefail
cd "$(dirname "$0")"

# 0) Nothing changed since the last publish? Stop here.
if [ -z "$(git status --porcelain)" ]; then
  echo "Nothing to publish - no edits since the last push."
  exit 0
fi

# 1) Bump the service-worker cache: poom-vNN -> poom-v(NN+1)
if grep -qE "poom-v[0-9]+" sw.js; then
  cur="$(grep -oE "poom-v[0-9]+" sw.js | head -1)"
  n="${cur#poom-v}"
  sed -i.bak "s/poom-v${n}/poom-v$((n + 1))/g" sw.js && rm -f sw.js.bak
  echo "cache:  ${cur} -> poom-v$((n + 1))"
fi

# 2) Commit everything (your message, or a timestamp)
git add -A
msg="${*:-publish $(date '+%Y-%m-%d %H:%M')}"
git commit -q -m "$msg"
echo "commit: ${msg}"

# 3) Publish to main -> GitHub Pages redeploys
git push -q origin HEAD:main
echo "pushed to main. Live in ~1 min at:"
echo "  https://peiyinchao.github.io/poom-academie/concept-coach.html"
