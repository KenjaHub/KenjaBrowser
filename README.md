# KenjaBrowser — 官网 / SEO 落地页（GitHub Pages）

本仓库是 [KenjaBrowser](https://github.com/KenjaHub/KenjaBrowser)（macOS 实时双语字幕浏览器）的
产品官网，托管在 **GitHub Pages**，自定义域名 **https://kenjabrowser.kofukuai.com**。

纯静态、零依赖、零构建：HTML + CSS + 原生 JS，图片为自托管 WebP/JPG，字体为自托管 woff2。

## 站点结构

```
├── index.html            # 英文主页（SEO 主页面）
├── privacy.html          # 隐私政策（EN）——可填入 App Store Connect 的 Privacy Policy URL
├── 404.html              # 404 页
├── zh/
│   ├── index.html        # 中文主页（hreflang 互指）
│   └── privacy.html      # 隐私政策（中文）
├── assets/
│   ├── css/styles.css    # 全站样式
│   ├── js/main.js        # 字幕模拟动画 / reveal / 商店链接
│   ├── img/              # 截图(WebP+JPG)、OG 封面、favicon
│   └── fonts/            # Bricolage Grotesque / IBM Plex (woff2, latin)
├── CNAME                 # kenjabrowser.kofukuai.com（勿删）
├── robots.txt
├── sitemap.xml
└── manifest.webmanifest
```

## 首次启用（只做一次）

1. **开启 Pages**：仓库 **Settings → Pages → Build and deployment → Source**
   选 *Deploy from a branch*，Branch 选 `main` / `/ (root)`，保存。
2. **DNS 解析**（在 kofukuai.com 的 DNS 服务商处添加）：

   | 类型  | 主机名          | 值                      | TTL  |
   |------|-----------------|-------------------------|------|
   | CNAME | `kenjabrowser` | `kenjahub.github.io` | 600 |

3. **绑定域名**：Settings → Pages → Custom domain 填 `kenjabrowser.kofukuai.com`，
   等检查通过后勾选 **Enforce HTTPS**。
   （仓库根目录的 `CNAME` 文件已包含该域名，推送后 GitHub 会自动识别。）

## App Store 上架后（上线链接）

应用过审后，打开 `assets/js/main.js`，把顶部常量改成真实 App Store 链接并推送：

```js
var APP_STORE_URL = "https://apps.apple.com/app/idXXXXXXXXX";
```

页面上所有带 `data-store-link` 的按钮会自动指向该链接。在此之前按钮回落到
`#download` 下载区（不产生死链）。

同时建议把 App Store Connect 里的 **Privacy Policy URL** 填为：
`https://kenjabrowser.kofukuai.com/privacy/`

## 已内置的 SEO 要点

- EN + zh-CN 双语页面，`hreflang`（含 `x-default`）互指
- JSON-LD 结构化数据：`SoftwareApplication`（含四档价格 offers）、`FAQPage`、`Organization`、`WebSite`
- Open Graph / Twitter Card（1200×630 封面 `assets/img/og-cover.jpg`）
- `sitemap.xml`（含 hreflang alternates）+ `robots.txt`，均使用自定义域名绝对地址
- 语义化 HTML、单 H1、图片含关键词 alt、懒加载 + 固定宽高（CLS≈0）
- 自托管字体（font-display: swap），页面总重 < 1MB，无第三方请求
- 相对路径资源引用：自定义域名 / `kenjahub.github.io/KenjaBrowser/` / 本地预览均可正常加载

## 更换截图 / 图片

源图在 `~/Documents/KenjaBrowser/KenjaBrowser-keynote-img/KenjaBrowser/`
（`KenjaBrowser.001.png` ~ `006.png`，2560×1600）。重新生成：

```bash
# WebP（PIL）
python3 - <<'EOF'
from PIL import Image
im = Image.open('KenjaBrowser.001.png').convert('RGB')
im.resize((2048, 1280), Image.LANCZOS).save('assets/img/shot-1.webp', quality=82, method=6)
EOF
# JPG
ffmpeg -i KenjaBrowser.001.png -vf scale=1600:-2 -q:v 6 assets/img/shot-1.jpg
```

替换后同时更新对应 `<picture>` 里的 alt 文案即可。

## 本地预览

```bash
cd KenjaBrowser && python3 -m http.server 4173
# 打开 http://localhost:4173
```
