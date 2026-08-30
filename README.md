<div align="center">

<img src="assets/img/icon-192.png" width="96" alt="KenjaBrowser app icon">

# KenjaBrowser

**Real-time bilingual captions for any web video — 100% on-device, on your Mac.**

[Website](https://kenjabrowser.kofukuai.com) · [Features](https://kenjabrowser.kofukuai.com/#features) · [Privacy Policy](https://kenjabrowser.kofukuai.com/privacy/)

<img src="assets/img/shot-1.jpg" width="800" alt="KenjaBrowser showing a YouTube video with live bilingual captions">

</div>

## About

KenjaBrowser is a secondary browser for **macOS 26+** that adds real-time bilingual
subtitles to any online video — YouTube, news sites, online courses, live streams.
Speech recognition and translation run entirely on the device:

- Real-time bilingual captions (original speech + translation, side by side)
- 100% on-device AI — no uploads, no cloud, no tracking
- Built-in ad & tracker blocker
- Touch ID app lock and encrypted bookmark vault
- 14 recognition languages, 25 translation languages

Free to download on the Mac App Store.

## This repository

This repo hosts the **product website**, served by GitHub Pages at
**[kenjabrowser.kofukuai.com](https://kenjabrowser.kofukuai.com)** — a fully static,
dependency-free landing page: plain HTML + CSS + vanilla JS, self-hosted WebP/JPG
images and woff2 fonts, JSON-LD structured data, sitemap and robots.txt.

<details>
<summary><b>Repository guide</b></summary>

### Structure

```
kenjabrowser-site/
├── index.html            # landing page (main SEO page)
├── privacy/index.html    # privacy policy (App Store Connect Privacy Policy URL)
├── 404.html
├── assets/
│   ├── css/styles.css    # site styles
│   ├── js/main.js        # caption simulator, reveal animations, store link
│   ├── img/              # screenshots (WebP + JPG), OG cover, favicons
│   └── fonts/            # Bricolage Grotesque / IBM Plex (woff2, latin)
├── CNAME                 # kenjabrowser.kofukuai.com — do not delete
├── robots.txt
├── sitemap.xml
└── manifest.webmanifest
```

### Pointing buttons at the App Store

Once the app is approved, set the constant at the top of `assets/js/main.js`:

```js
var APP_STORE_URL = "https://apps.apple.com/app/idXXXXXXXXX";
```

Every element with `data-store-link` picks it up automatically. Until then the
buttons fall back to the `#download` section (no dead links).

Also set the App Store Connect **Privacy Policy URL** to
`https://kenjabrowser.kofukuai.com/privacy/`.

### Replacing screenshots

Source images live in `~/Documents/KenjaBrowser/KenjaBrowser-keynote-img/KenjaBrowser/`
(`KenjaBrowser.001.png` … `006.png`, 2560×1600). Regenerate with:

```bash
python3 - <<'EOF'
from PIL import Image
im = Image.open('KenjaBrowser.001.png').convert('RGB')
im.resize((2048, 1280), Image.LANCZOS).save('assets/img/shot-1.webp', quality=82, method=6)
EOF
ffmpeg -i KenjaBrowser.001.png -vf scale=1600:-2 -q:v 6 assets/img/shot-1.jpg
```

Update the matching `<picture>` alt text after replacing.

### Local preview

```bash
python3 -m http.server 4173   # then open http://localhost:4173
```

</details>
