# KenjaBrowser — Official Site / SEO Landing Page (GitHub Pages)

This repo hosts the product site for [KenjaBrowser](https://github.com/KenjaHub/KenjaBrowser)
(a macOS browser with real-time bilingual live captions), served by **GitHub Pages** at
**https://kenjabrowser.kofukuai.com**.

Fully static, zero dependencies, no build step: HTML + CSS + vanilla JS,
self-hosted WebP/JPG images and self-hosted woff2 fonts.

## Site structure

```
├── index.html            # English landing page (main SEO page)
├── privacy/index.html    # Privacy policy — fill into App Store Connect's Privacy Policy URL
├── 404.html              # 404 page
├── assets/
│   ├── css/styles.css    # site styles
│   ├── js/main.js        # caption simulator / reveal animations / store link
│   ├── img/              # screenshots (WebP+JPG), OG cover, favicons
│   └── fonts/            # Bricolage Grotesque / IBM Plex (woff2, latin)
├── CNAME                 # kenjabrowser.kofukuai.com (do not delete)
├── robots.txt
├── sitemap.xml
└── manifest.webmanifest
```

## After the app goes live on the App Store

Once the app is approved, open `assets/js/main.js` and set the constant at the top
to the real App Store URL, then push:

```js
var APP_STORE_URL = "https://apps.apple.com/app/idXXXXXXXXX";
```

Every element with `data-store-link` picks it up automatically. Until then the
buttons fall back to the `#download` section (no dead links).

Also set the App Store Connect **Privacy Policy URL** to:
`https://kenjabrowser.kofukuai.com/privacy/`

## Built-in SEO

- JSON-LD structured data: `SoftwareApplication`, `FAQPage`, `Organization`, `WebSite`
- Open Graph / Twitter Card (1200×630 cover at `assets/img/og-cover.jpg`)
- `sitemap.xml` + `robots.txt` using absolute custom-domain URLs
- Semantic HTML, single H1, keyword-rich alt text, lazy loading + fixed dimensions (CLS ≈ 0)
- Self-hosted fonts (`font-display: swap`), page weight < 1 MB, no third-party requests
- Relative asset paths: works under the custom domain, the project URL, and local preview

## Replacing screenshots

Source images live in `~/Documents/KenjaBrowser/KenjaBrowser-keynote-img/KenjaBrowser/`
(`KenjaBrowser.001.png` … `006.png`, 2560×1600). Regenerate:

```bash
# WebP (PIL)
python3 - <<'EOF'
from PIL import Image
im = Image.open('KenjaBrowser.001.png').convert('RGB')
im.resize((2048, 1280), Image.LANCZOS).save('assets/img/shot-1.webp', quality=82, method=6)
EOF
# JPG
ffmpeg -i KenjaBrowser.001.png -vf scale=1600:-2 -q:v 6 assets/img/shot-1.jpg
```

Update the matching `<picture>` alt text after replacing.

## Local preview

```bash
cd kenjabrowser-site && python3 -m http.server 4173
# open http://localhost:4173
```
