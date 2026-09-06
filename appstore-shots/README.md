# App Store Screenshots — KenjaBrowser (macOS)

Redesigned store screenshots, built as HTML slides and exported to
2560×1600 PNG (macOS App Store spec). Visual system is shared with the
website (Bricolage Grotesque, IBM Plex Sans, accent `#f09a40`, grain overlay),
so store listings and the site read as one product.

> **Shipping PNGs:** slides 001 and 003–007 are the Keynote-exported masters
> (same copy, rebuilt visuals) — they are the source of truth for upload.
> Slide 002 (family shot) is an HTML render (`./export.sh 2`). The other HTML
> slides in `src/` are the original design drafts; a full `./export.sh` run
> will OVERWRITE the masters — only ever export slide 2.

## Screenshot lineup

| # | File | Headline | Message |
|---|------|----------|---------|
| 1 | `KenjaBrowser.001.png` | Real-Time Bilingual Captions | Hero. Keynote master. |
| 2 | `KenjaBrowser.002.png` | One Browser. Every Apple Device. | Family shot (HTML render): real app screenshots — Mac (live captions), iPad + iPhone (Google search, `02-search-google`) — in device frames. iOS = private browser, captions stay Mac-only. |
| 3 | `KenjaBrowser.003.png` | 14 Languages In → 25 Out | Keynote master. |
| 4 | `KenjaBrowser.004.png` | 100% On-Device AI | Keynote master. |
| 5 | `KenjaBrowser.005.png` | Works With Any Website | Keynote master. |
| 6 | `KenjaBrowser.006.png` | One Toolbar. Total Control. | Keynote master. |
| 7 | `KenjaBrowser.007.png` | Private by Design | Keynote master. |

> Device screenshots for slide 2 live in `src/assets/` (copied from the app
> repo's `AppStoreScreenshots/` raw captures and the site's `shot-1.jpg`).
> If the app UI changes, refresh those copies.

## Structure

```
appstore-shots/
├── src/
│   ├── shared.css      # tokens, window mockup, caption bar, chips
│   ├── slide-{1..7}.html
│   ├── assets/         # real iPhone/iPad app screenshots for the family slide
│   └── audit.js        # layout audit (runs only with ?audit=1)
├── export.sh           # render PNGs via headless Chrome
└── png/                # exported KenjaBrowser.00{1..6}.png
```

## Re-export after editing

```sh
./export.sh          # all slides
./export.sh 3 6      # just slides 3 and 6
```

Requires Google Chrome at the default path.

## Layout audit (catch overflow / clipped text)

Each slide includes `audit.js`. Open `src/slide-N.html?audit=1` with
headless Chrome and read the `<title>`:

```sh
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
  --headless=new --window-size=2560,1600 --force-device-scale-factor=1 \
  --virtual-time-budget=8000 \
  --dump-dom "file://$PWD/src/slide-1.html?audit=1" | grep -o '<title>[^<]*'
```

`AUDIT CLEAN` = nothing overflows the canvas and no text is clipped.

## Copy notes

- Headline language is English (matches the English-only listing/site);
  Japanese subheads double as a live demo of the EN→JA caption feature.
- Slide 1's headline intentionally mirrors the site `<title>`/H1 wording
  ("Real-Time Bilingual Captions") for SERP ↔ store consistency.
- Before uploading, check every string against the app's real capabilities
  (language counts, feature names) in case they changed.
