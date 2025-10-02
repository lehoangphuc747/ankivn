Có thể sử dụng MCP Context7.

# 🎯 Mục tiêu & vai trò

* **Mục tiêu**: Website chia sẻ deck Anki (*.apkg), hướng dẫn sử dụng, bài viết học tập; tải nhanh, dễ tìm deck theo chủ đề/ngôn ngữ/cấp độ.
* **Nhóm người dùng**: Người Việt Nam.
* **Vai trò nhóm**:

  * **Bạn (PM/Content)**: mô tả tính năng, nội dung, quy tắc.
  * **Mình (Planner)**: kiến trúc thông tin, backlog, thông số kỹ thuật.
  * **VSCode Copilot (Thi công)**: scaffold code theo prompt.

---

# 🗺️ Kiến trúc thông tin (IA)

**Đường dẫn chính**

* `/` Trang chủ
* `/decks` Danh mục deck (lọc, tìm kiếm)
* `/decks/[slug]` Trang chi tiết deck (mô tả, ảnh, nút tải)
* `/guides` Hướng dẫn (bài viết MDX)
* `/blog` Bài viết cập nhật
* `/submit` Gửi deck (form - giai đoạn 2) - Dự định dùng Google Form
* `/about` Giới thiệu / liên hệ

**Điều hướng**

* Header: Logo • Bộ thẻ • Hướng dẫn • Blog • Upload • Giới thiệu
* Footer: Liên hệ, License, RSS, Sitemap, Social

---

# 🧱 Công nghệ & Integration

* **Astro minimal** (hiện có)
* **Tailwind**: `npx astro add tailwind`
* **MDX**: `npx astro add mdx`
* **Collections (astro****:content****)** cho deck/guides/blog
* **SEO**: `@astrojs/sitemap`, robots.txt, OpenGraph, JSON-LD
* **Icon**: `astro-icon` hoặc `@iconify-json` (tùy)
* **Search/Filter**: Island (Astro + nhỏ React/Vue optional)
* **Ảnh**: `@astrojs/image` (tùy chọn)
* **Triển khai**: **Cloudflare Pages** (ưu tiên). *TẠM THỜI không dùng `ankivn.com` hay subdomain; chỉ chạy bằng URL `*.pages.dev` cho đến khi bạn cắt khỏi GH Pages.*
* **Phân tích**: Simple Analytics/Umami + Google Analytics(tùy)

---

# 📦 Mô hình nội dung (Content Collections)

## 1) Decks (`src/content/decks/`)

**File**: `*.md` hoặc `*.mdx`

**Frontmatter schema (ý nghĩa)**:

* `title`, `slug`
* `category`: một trong các nhóm chính:

  * `Tất cả` | `Ngoại ngữ` | `Giáo dục` | `Chuyên ngành` | `Mẫu thẻ` | `Add-ons` | `Khác`
* `subCategory`: theo `category` (xem bảng taxonomy bên dưới)
* `size`: số thẻ (notes)
* `date`: ISO date (thay cho `version`/`updated`)
* `author`: tên tác giả/nhóm
* `tags`: mảng string
* `cover`: ảnh cover (1 ảnh đại diện)
* `previews`: mảng ảnh preview (0..n ảnh minh họa; có thể là ảnh của tác giả hoặc ảnh chụp màn hình từ AnkiVN)
* `downloads`: **2 loại link chính** + mirror tùy chọn

  * `author`: link gốc của tác giả
  * `ankivn`: link reup của AnkiVN
  * `r2` | `gdrive` | `firebase` | `onedrive`: mirror thêm (nếu có)

**Nội dung thân**: mô tả deck, cấu trúc note, hướng dẫn import, nguồn.

**Taxonomy chi tiết**:

* `Ngoại ngữ` → `Tiếng Anh`, `Tiếng Nhật`, `Tiếng Trung`, `Tiếng Hàn`, `Tiếng Pháp`, `Tiếng Đức`, `Tiếng Nga`
* `Giáo dục` → `THCS`, `THPT`, `Đại học`
* `Chuyên ngành` → `Y Dược`, `Công nghệ thông tin`, `Kinh tế`
* `Mẫu thẻ` → (tùy chọn sau)
* `Add-ons` → (tùy chọn sau)
* `Khác` → (tổng hợp)

## 2) Guides (`src/content/guides/`)

* **Khuyến nghị định dạng**: **MDX** (dễ viết nội dung dài, chèn ảnh/code; có thể import component Astro khi cần). Chỉ dùng `.astro` nếu guide cần bố cục động/logic đặc thù trên trang.
* **Frontmatter**: `title`, `slug`, `tags`, `guideType` (`Cơ bản` | `Nâng cao` | `Tips`)
* **Thân**: MDX (chèn code, hình)

## 3) Blog (`src/content/blog/`)  (`src/content/blog/`)

* **Frontmatter**: `title`, `slug`, `date`, `tags`, `summary`, `cover`
* **Tìm kiếm**: thêm `BlogSearch.jsx` (island) để tìm theo `title`/`tags`/`summary`

---

# 🗂️ Cấu trúc thư mục đề xuất

```
.
├── public/
│   ├── images/
│   │   └── covers/
│   └── favicon.svg
├── src/
│   ├── content/
│   │   ├── decks/
│   │   ├── guides/
│   │   └── blog/
│   ├── layouts/
│   │   ├── BaseLayout.astro
│   │   ├── PostLayout.astro
│   │   └── DeckLayout.astro
│   ├── components/
│   │   ├── common/
│   │   │   ├── Nav.astro
│   │   │   ├── Footer.astro
│   │   │   ├── TagCloud.astro
│   │   │   └── SearchInput.jsx      // island
│   │   ├── decks/
│   │   │   ├── DeckCard.astro
│   │   │   ├── DeckFilters.jsx      // island
│   │   │   └── DownloadButton.astro
│   │   ├── guides/
│   │   │   └── GuideCard.astro
│   │   ├── blog/
│   │   │   └── BlogCard.astro
│   │   └── etc/
│   └── pages/
│       ├── index.astro
│       ├── decks.astro
│       ├── decks/[slug].astro
│       ├── guides.astro
│       ├── blog.astro
│       ├── submit.astro
│       └── about.astro
├── astro.config.mjs
└── package.json
```

---

# 🧩 Thành phần (Components)

* **common/**: `Nav`, `Footer`, `TagCloud`, `SearchInput`, `CopyLinkButton.astro`
* **decks/**: `DeckCard`, `DeckFilters` (island), `DownloadButton`, `ImageViewer.jsx`
* **guides/**: `GuideCard`
* **blog/**: `BlogCard`, `BlogSearch.jsx` (island)
* **etc/**: thành phần chưa phân loại (di chuyển dần vào các nhóm trên)

---

# 🔎 Tìm kiếm & lọc (Giai đoạn 1 — client side)

* Nạp tất cả meta deck từ `astro:content`
* Filter client bằng JS (island) theo: `q` (title+tags), `category`, `subCategory`, `tags`; sort `date` (mới→cũ) hoặc `size`
* Hỗ trợ query param: `?q=...&category=Ngoại ngữ&sub=Tiếng Hàn&sort=date`

> Giai đoạn 2: chuyển sang tìm kiếm server (Edge) nếu số deck lớn.

---

# ☁️ Lưu trữ file .apkg

* **Ban đầu**: Google Drive (nhanh triển khai)
* **Sau**: R2/BunnyCDN/OneDrive mirror để tối ưu băng thông
* **Quy ước link tải**:

  * `downloads.author` → link gốc của tác giả
  * `downloads.ankivn` → link reup do AnkiVN lưu trữ
  * `downloads.r2`/`downloads.gdrive`/`downloads.firebase`/`downloads.onedrive` → mirror phụ (tùy chọn)

---

# 🖼️ Hình ảnh deck: nguồn & quy tắc

**Mục tiêu**: luôn có **cover** đẹp (1 ảnh) và **hiển thị đầy đủ** ảnh trong body để người dùng hình dung trước khi tải.

**Nguồn ảnh (ưu tiên theo thứ tự)**

1. **Tác giả cung cấp**: sử dụng ảnh gốc nếu rõ nét.
2. **AnkiVN tự chụp**: chụp màn hình nhiều thẻ tiêu biểu (front/back, cấu trúc, mobile/desktop).
3. **Cover tự sinh** (fallback): render ảnh bìa bằng template (SVG/Canvas).

**Khai báo ảnh**

* **Dùng Markdown trong phần body** và **link tuyệt đối** tới ảnh (CDN hoặc nguồn ngoài). Ví dụ:

  `![Front card](https://cdn.ankivn.vn/decks/{slug}/previews/full/front-01.webp)`

* Không giới hạn số ảnh. Thứ tự hiển thị = thứ tự Markdown.

* `cover` trong frontmatter chỉ phục vụ thumbnail ở danh sách.

**Lưu trữ & quy ước**

* Khuyến nghị CDN: `https://cdn.ankivn.vn/decks/{slug}/...`
* Cấu trúc gợi ý: `previews/full/*.webp`

**Trải nghiệm xem ảnh**

* Trang chi tiết dùng **ImageViewer**:

  * Mở ảnh toàn màn hình, **zoom/pan**, **phím ←/→**, **esc** để đóng.
  * Lazy-load ảnh theo thứ tự Markdown.
  * Hiển thị **caption** từ alt text nếu có.

**Pháp lý & ghi nguồn**

* Nếu ảnh của **tác giả**: ghi nguồn trong body/footnote.
* Nếu ảnh **AnkiVN chụp**: ghi “Screenshots © AnkiVN”.

---

# 🧾 SEO & Metadata

* **Site URL**: **tạm thời để trống** (build bằng `*.pages.dev`). Khi cắt khỏi GH Pages sẽ đặt `site` là domain chính.
* Sitemap, robots, canonical
* OG tags: `og:title`, `og:description`, `og:image`
* JSON-LD cho Deck: `@type: CreativeWork` hoặc `Dataset`
* Thẻ meta i18n (sau): `hreflang`

---

# 🧪 Chất lượng & A11y

* Kiểm tra Lighthouse ≥ 90
* Text tương phản, tab order, alt cho ảnh
* Kiểm thử mobile (<= 360px)

---

# 🧭 Wireframe nhanh

## / (Home)

```
[Logo]  Bộ thẻ | Hướng dẫn | Blog | Upload | Giới thiệu
-------------------------------------------------
Hero: "Anki Việt Nam"
[SearchInput]
[decks] [guides] [blog] [upload]
Footer
```

## /decks

```
Title + mô tả ngắn
[DeckFilters]
[DeckCard]*
Pagination (nếu cần)
```

## /decks/[slug]

```
Breadcrumb
Title + Date
Cover (gallery)
Mô tả deck (MDX)
Thông tin: size, notes 
[DownloadButton]
Liên quan: DeckCard*
```

---

# 📝 Schema Zod cho Collections (mẫu)

```ts
// src/content/config.ts
import { z, defineCollection } from 'astro:content';

const categoryEnum = z.enum([
  'Tất cả','Ngoại ngữ','Giáo dục','Chuyên ngành','Mẫu thẻ','Add-ons','Khác'
]);

const subCategoryEnum = z.enum([
  // Ngoại ngữ
  'Tiếng Anh','Tiếng Nhật','Tiếng Trung','Tiếng Hàn','Tiếng Pháp','Tiếng Đức','Tiếng Nga',
  // Giáo dục
  'THCS','THPT','Đại học',
  // Chuyên ngành
  'Y Dược','Công nghệ thông tin','Kinh tế'
]);

const previewKindEnum = z.enum(['front','back','config','overview','other']);

const decks = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    category: categoryEnum,
    subCategory: subCategoryEnum.optional(),
    size: z.number(),
    date: z.string(),
    author: z.string().optional(),
    tags: z.array(z.string()).default([]),
    cover: z.string().optional(),
    // `previews` giữ optional (không khuyến nghị dùng khi ảnh đã đặt trong body bằng Markdown)
    previews: z.array(z.object({
      src: z.string(),
      alt: z.string().optional(),
      caption: z.string().optional(),
      credit: z.string().optional(),
      kind: previewKindEnum.optional(),
      priority: z.number().optional(),
    })).optional(),
    downloads: z.object({
      author: z.string().url().optional(),
      ankivn: z.string().url().optional(),
      r2: z.string().url().optional(),
      gdrive: z.string().url().optional(),
      firebase: z.string().url().optional(),
      onedrive: z.string().url().optional(),
    }).partial()
  })
});

const guides = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    tags: z.array(z.string()).default([]),
    guideType: z.enum(['Cơ bản','Nâng cao','Tips'])
  })
});

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    date: z.string(),
    tags: z.array(z.string()).default([]),
    summary: z.string().optional(),
    cover: z.string().optional()
  })
});

export const collections = { decks, guides, blog };
```

---

# 🧰 Backlog triển khai (Phase 1)

1. **Cài đặt**

   * `npx astro add tailwind`
   * `npx astro add mdx`
   * `npm i @astrojs/sitemap`
   * Tạo `src/content/config.ts` như trên

2. **Layouts**

   * `BaseLayout.astro`: head (meta), Nav, Footer, slot
   * `PostLayout.astro`: cho guides/blog, hiển thị ngày, TOC (tuỳ chọn)
   * `DeckLayout.astro`: bóc ảnh từ **Markdown body** → truyền cho `ImageViewer`, vẫn hỗ trợ `cover`

3. **Components**

   * `Nav.astro`, `Footer.astro`
   * `DeckCard.astro`
   * `DownloadButton.astro`
   * `DeckFilters.jsx` + `SearchInput.jsx` (island)
   * `ImageViewer.jsx` (new): full-screen, zoom/pan, keyboard nav; nhận `images: {src,alt}[]`
   * `CopyLinkButton.astro` (new): copy canonical URL + UTM vào clipboard

4. **Pages**

   * `index.astro`: Hero + deck mới + tag cloud
   * `decks.astro`: list + filters
   * `decks/[slug].astro`: chi tiết deck (đọc ảnh từ body + ImageViewer)

5. **Nội dung mẫu**

   * Tạo 3 deck mẫu ở `src/content/decks/*.md`
   * 1 guide: “Cách import deck .apkg trên AnkiDroid”

6. **SEO/Build**

   * sitemap, robots
   * OG default images

7. **Deploy**

   * **Cloudflare Pages**: Kết nối repo GitHub → build `npm run build`, output `dist/` → dùng URL `*.pages.dev` để QA và chạy tạm thời.
   * **Không cấu hình domain `ankivn.com` và không tạo subdomain** ở giai đoạn này.

---

# 💬 Prompt gợi ý cho Copilot (copy dùng ngay)

**Tạo DeckLayout bóc ảnh từ Markdown**

```
Create `src/layouts/DeckLayout.astro` that:
- Receives `content` (Markdown/MDX) and frontmatter (`title`, `date`, `cover`, etc.).
- Parses rendered HTML of `content` to collect all `<img>` elements (absolute URLs required).
- Builds an `images` array: `{ src, alt }[]` in DOM order.
- Renders the content normally.
- Renders <ImageViewer images={images}/> under the content.
```

**Tạo ImageViewer.jsx**

```
Create `src/components/decks/ImageViewer.jsx` (island) that accepts `images: {src:string, alt?:string}[]` and renders:
- All images as a grid (no limit) with lazy-loading.
- On click, open a full-screen modal with zoom (wheel/pinch), pan (drag), next/prev (←/→), close (Esc/click overlay).
- Keep URL hash like `#image-5` for deep-linking.
```

**Tạo CopyLinkButton.astro (common)**

```
Create `src/components/common/CopyLinkButton.astro` with a single button that copies the canonical page URL (plus optional `utm` query) to clipboard using the Clipboard API. Show success toast. Props: `url:string`, `utm?:string`, `label?:string` (default: "Copy link").
```

**Trang /decks/[slug]**

```
Update deck detail to place <CopyLinkButton url={canonicalUrl} utm="?utm_source=copy&utm_medium=deck&utm_campaign=ankivn"/> near title.
```

**Gợi ý Markdown cho ảnh của tác giả**

```
Trong file `src/content/decks/{slug}.mdx`, chèn ảnh bằng link tuyệt đối:

![Front 1](https://cdn.ankivn.vn/decks/{slug}/previews/full/front-01.webp)
![Back 1](https://cdn.ankivn.vn/decks/{slug}/previews/full/back-01.webp)
![Config](https://cdn.ankivn.vn/decks/{slug}/previews/full/config-01.webp)
```

---

# ✅ To‑Do (gộp 1 mạch: **Tổng quan → Chi tiết → Cụ thể hoá**)

> Chỉ còn **một** khu vực To‑Do duy nhất. Đi theo thứ tự từ trên xuống. Copy các prompt dán vào Copilot/Copilot Agents.

---

## I) **Tổng quan (Milestones)**

1. **A. Khởi tạo & Cấu hình** — Tailwind, MDX, sitemap, schemas.
2. **B. Layouts cốt lõi** — BaseLayout, PostLayout, DeckLayout (trích <img> từ body).
3. **C. Components chức năng** — Nav/Footer, DeckCard, DeckFilters, DownloadButton, ImageViewer, CopyLinkButton, BlogSearch.
4. **D. Pages** — `/`, `/decks`, `/decks/[slug]`, `/guides`, `/blog`.
5. **E. Nội dung mẫu** — 3 deck mẫu (ảnh tuyệt đối trong body), 1 guide + 1 blog.
6. **F. SEO/Build/Deploy** — sitemap, robots, canonical, OG fallback, **Cloudflare Pages**.
7. **G. QA** — Lighthouse ≥ 90, A11y & mobile.

---

## II) **Chi tiết (Epics → Tasks)**

### A — Khởi tạo & Cấu hình

* A1. Cài Tailwind + MDX + `@astrojs/sitemap` (site URL).
* A2. Tạo `src/content/config.ts` (Decks/Guides/Blog) đúng spec.
* A3. Sửa `astro.config.mjs` (markdown, aliases, sitemap).

### B — Layouts cốt lõi

* B1. BaseLayout: meta/OG, skip-link, container, Nav/Footer.
* B2. PostLayout: title/date, optional TOC.
* B3. DeckLayout: render body, **thu thập TẤT CẢ `<img>`** theo thứ tự Markdown → `ImageViewer`.

### C — Components chức năng

* C1. Nav/Footer: responsive + a11y.
* C2. DeckCard: title/cover/date/size/category/subCategory.
* C3. DeckFilters (island): q + category/subCategory + tags; sort date/size; sync URL.
* C4. DownloadButton: author/ankivn/r2/gdrive/firebase/onedrive.
* C5. ImageViewer (island): grid + modal full-screen; zoom/pan; ←/→; Esc; lazy; hash deep‑link.
* C6. CopyLinkButton: copy canonical URL (+utm) với toast.
* C7. BlogSearch (island): search title/summary/tags; query sync.

### D — Pages

* D1. `/` (Home): hero + lối tắt.
* D2. `/decks`: tải meta → DeckFilters → DeckCard list.
* D3. `/decks/[slug]`: DeckLayout + DownloadButton + CopyLinkButton.
* D4. `/guides` + `/blog`: list + detail với PostLayout; gắn BlogSearch ở `/blog`.

### E — Nội dung mẫu

* E1. 3 deck mẫu (ảnh **absolute** trong body, nhiều ảnh thoải mái).
* E2. 1 guide (Cơ bản) + 1 blog (cover + summary).

### F — SEO/Build/Deploy

* F1. Sitemap/robots/canonical (**chưa set `site`**; cập nhật sau khi có domain chính hoặc pages.dev ổn định).
* F2. `/api/og/[slug].ts` — OG fallback khi thiếu cover.
* F3. **Deploy Cloudflare Pages** (kết nối GitHub, build, dùng `*.pages.dev`, **không gắn domain**).
* F4. **_headers & _redirects** (SPA rewrite; **không** thêm redirect domain lúc này).

### G — QA

* G1. Lighthouse mobile ≥ 90.
* G2. A11y & mobile (keyboard, focus, alt, ≤360px).

---

## III) **Cụ thể hoá (Prompts để Copilot làm việc)**

> Dán trực tiếp các đoạn dưới đây cho Copilot. Mỗi đoạn hoàn thành in ra: `[DONE <ID>]` + files changed.

### A — Khởi tạo & Cấu hình

**A1.**

```
Run: npx astro add tailwind && npx astro add mdx && npm i @astrojs/sitemap
Then set Tailwind content paths to src/**/*.{astro,jsx,tsx,md,mdx}. Create tailwind.config.mjs and postcss.config.cjs.
```

**A2.**

```
Create src/content/config.ts with Decks/Guides/Blog schemas exactly as in the plan (category, subCategory, size, date, cover, downloads...). Run `astro check` and report diagnostics.
```

**A3.**

```
Update astro.config.mjs: enable sitemap plugin but read `site` from env (e.g., process.env.SITE_URL). For now, DO NOT set SITE_URL; optionally disable sitemap generation if SITE_URL is missing. Add path aliases (@/components, @/content).
```

Update astro.config.mjs: set `site` to [https://ankivn.com](https://ankivn.com), enable sitemap, tune markdown/MDX options, add path aliases (@/components, @/content).

```

### B — Layouts cốt lõi
**B1.**
```

Create src/layouts/BaseLayout.astro with <Nav/> <Footer/> <slot/>, meta/OG defaults, skip-link a11y, responsive container.

```
**B2.**
```

Create src/layouts/PostLayout.astro for guides/blog with title, date, optional TOC.

```
**B3.**
```

Implement src/layouts/DeckLayout.astro: render MDX body, parse ALL <img> elements in DOM order, build images[] = {src,alt}, pass to <ImageViewer images={images}/>; no image limit.

```

### C — Components chức năng
**C1.**
```

Create src/components/common/Nav.astro and Footer.astro (responsive, accessible, active states, footer links incl. RSS/sitemap/contact).

```
**C2.**
```

Create src/components/decks/DeckCard.astro with props {title, cover, date, size, category, subCategory, href}. Fallback cover `/api/og/{slug}` when missing.

```
**C3.**
```

Create src/components/decks/DeckFilters.jsx: search title+tags, filter category/subCategory/tags, sort date/size; sync state↔query params. Debounce typing.

```
**C4.**
```

Create src/components/decks/DownloadButton.astro supporting links: author, ankivn, r2, gdrive, firebase, onedrive. target=_blank rel=noopener.

```
**C5.**
```

Create src/components/decks/ImageViewer.jsx (island): grid all images; modal full-screen with zoom/pan, ←/→, Esc; lazy-load; maintain hash `#image-i` for deep-link.

```
**C6.**
```

Create src/components/common/CopyLinkButton.astro: copy canonical URL (+optional utm) using Clipboard API; show toast on success.

```
**C7.**
```

Create src/components/blog/BlogSearch.jsx: filter posts by title/summary/tags; sync `?q=&tags=`; show result count; debounce.

```

### D — Pages
**D1.**
```

Create src/pages/index.astro with hero and quick links to decks/guides/blog/upload.

```
**D2.**
```

Create src/pages/decks.astro that loads Decks collection, feeds <DeckFilters/>, and renders <DeckCard/> list. Keep URL query in sync.

```
**D3.**
```

Create src/pages/decks/[slug].astro using <DeckLayout/>, show title/date/size/category/subCategory/tags, <DownloadButton downloads={...}/>, and <CopyLinkButton url={canonicalUrl} utm="?utm_source=copy&utm_medium=deck&utm_campaign=ankivn"/>.

```
**D4.**
```

Create /guides and /blog list pages loading from collections; detail pages use <PostLayout/>; attach <BlogSearch/> to /blog.

```

### E — Nội dung mẫu
**E1.**
```

Create three sample deck MDX files under src/content/decks with absolute image URLs in body (several images) and realistic downloads.

```
**E2.**
```

Create one sample guide (guideType="Cơ bản") and one blog post (summary + cover).

```

### F — SEO/Build/Deploy (**Cloudflare Pages**)
**F1.**
```

Configure sitemap and add a static robots.txt; ensure canonical tags per page.

```
**F2.**
```

Create /api/og/[slug].ts that renders OG image when a deck has no cover.

```
**F3.**
```

Create a new Cloudflare Pages project connected to this GitHub repo.
Settings:

* Build: npm run build
* Output: dist
* Node: 18+
* Custom domain: SKIP (do not attach ankivn.com yet)
  After deployment, print the assigned *.pages.dev URL.

```
Create a new Cloudflare Pages project connected to this GitHub repo.
Settings:
- Build: npm run build
- Output: dist
- Node: 18+
- Custom domain: ankivn.com (301 www→apex)
- SSL/TLS: Full (Strict if possible)
- Always Use HTTPS: ON
After deployment, print the *.pages.dev URL.
```

**F4.**

```
Add `_headers` and `_redirects` at repo root for SPA only (no domain redirects yet):

_redirects
/*  /index.html  200

_headers
/*
  X-Frame-Options: DENY
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: geolocation=(), microphone=(), camera=()
  Strict-Transport-Security: max-age=31536000
  Cache-Control: public, max-age=600

/assets/*
  Cache-Control: public, max-age=31536000, immutable

/images/*
  Cache-Control: public, max-age=31536000, immutable
```

Add `_headers` and `_redirects` at repo root:

_redirects
/*  /index.html  200
[https://www.ankivn.com/](https://www.ankivn.com/)*  [https://ankivn.com/:splat](https://ankivn.com/:splat)  301

_headers
/*
X-Frame-Options: DENY
X-Content-Type-Options: nosniff
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: geolocation=(), microphone=(), camera=()
Strict-Transport-Security: max-age=31536000; includeSubDomains; preload
Cache-Control: public, max-age=600

/assets/*
Cache-Control: public, max-age=31536000, immutable

/images/*
Cache-Control: public, max-age=31536000, immutable

```

### G — QA
**G1.**
```

Run Lighthouse on mobile and optimize until Performance/SEO/Best Practices ≥ 90.

```
**G2.**
```

Run a11y checks (keyboard nav, focus ring, alt text). Verify small-screen (≤360px) layout.

```

---

## 🧭 Macro‑Prompt (chạy tuần tự toàn bộ)
```

You are Copilot Agent. Execute milestones in order: A→B→C→D→E→F→G and within each milestone follow numbered tasks. After each task, print: [DONE <ID>] and list files changed. If a dependency is missing, pause and ask.

```

## 🔁 Kế hoạch triển khai hiện tại (chỉ `*.pages.dev`)
1) Deploy Cloudflare Pages → dùng URL `*.pages.dev` để QA và chạy thực tế.
2) **KHÔNG** cấu hình `ankivn.com` lúc này; **KHÔNG** tạo bất kỳ subdomain nào.
3) Khi bạn quyết định ngắt GH Pages, sẽ bổ sung checklist cutover domain riêng.

## 🧭 Macro‑Prompt (chạy tuần tự toàn bộ)
```

You are Copilot Agent. Execute milestones in order: A→B→C→D→E→F→G and within each milestone follow numbered tasks. After each task, print: [DONE <ID>] and list files changed. If a dependency is missing, pause and ask.

```

## ✅ Definition of Done & Checklist phát hành
- DoD: build ok (`npm run dev`), không lỗi; deck images hiển thị **tất cả**; filters & URL sync; copy link ok; SEO (sitemap/robots/canonical/OG) ok; Lighthouse mobile ≥ 90.
- Checklist:
  - [ ] 3 deck sample hiển thị đủ ảnh body.
  - [ ] Tất cả link download 200 OK.
  - [ ] Canonical + OG hợp lệ (cover hoặc OG fallback).
  - [ ] **Cloudflare Pages** hoạt động tốt trên URL `*.pages.dev` (không domain).
  - [ ] `_headers` & `_redirects` có hiệu lực (kiểm tra response headers).
  - [ ] Re-run Lighthouse, ghi lại chỉ số.

```
