#!/bin/bash
# Render App Store slides (2560×1600 PNG) with headless Chrome.
# Usage: ./export.sh [slide numbers, e.g. "1 2 3" — default: all]
set -euo pipefail
cd "$(dirname "$0")"

CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
OUT="png"
mkdir -p "$OUT"

slides="${*:-1 2 3 4 5 6 7}"

for n in $slides; do
  src="src/slide-${n}.html"
  dst="$OUT/KenjaBrowser.00${n}.png"
  echo "→ $dst"
  "$CHROME" \
    --headless=new \
    --disable-gpu \
    --hide-scrollbars \
    --force-device-scale-factor=1 \
    --window-size=2560,1600 \
    --virtual-time-budget=6000 \
    --screenshot="$dst" \
    "file://$PWD/$src" >/dev/null 2>&1
done

echo "done."
sips -g pixelWidth -g pixelHeight "$OUT"/*.png | grep -E 'png|pixel'
