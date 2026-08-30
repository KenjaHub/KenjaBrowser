# Maintaining the site

Ops guide for the KenjaBrowser website repo
([kenjabrowser.kofukuai.com](https://kenjabrowser.kofukuai.com), hosted on GitHub Pages).

## Structure

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

## Pointing buttons at the App Store

Once the app is approved, set the constant at the top of `assets/js/main.js`:

```js
var APP_STORE_URL = "https://apps.apple.com/app/idXXXXXXXXX";
```

Every element with `data-store-link` picks it up automatically. Until then the
buttons fall back to the `#download` section (no dead links).

Also set the App Store Connect **Privacy Policy URL** to
`https://kenjabrowser.kofukuai.com/privacy/`.

## Replacing screenshots

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

## Local preview

```bash
python3 -m http.server 4173   # then open http://localhost:4173
```

## Notes

- The `CNAME` file binds the custom domain `kenjabrowser.kofukuai.com` — keep it.
- Avoid toggling the custom domain on/off in the repo's Settings → Pages: each
  change creates a commit authored by the account used in the web UI.
- Git identity for this repo is `KenjaHub <noreply@kofukuai.com>` (not mapped to
  any GitHub account, so commits are not attributed to a personal profile).
