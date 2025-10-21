# AnkiVN — Website chia sẻ deck Anki

Astro + Tailwind CSS. Hệ thống static pages với TypeScript. Triển khai Cloudflare Pages (tạm thời dùng `*.pages.dev`).

## 🧞 Lệnh

| Lệnh | Tác dụng |
| --- | --- |
| `npm install` | Cài phụ thuộc |
| `npm run dev` | Chạy dev tại http://localhost:4326 |
| `npm run build` | Build ra `dist/` |
| `npm run preview` | Xem thử bản build |

## � Cấu trúc nội dung

### Pages
- `src/pages/decks/*.astro` - Các trang deck Anki
- `src/pages/guides/*.astro` - Hệ thống khóa học và bài học
- `src/pages/blog/*.astro` - Bài viết blog

### Components
- `src/components/` - Các component Astro tái sử dụng
- `src/layouts/` - Layout components (BaseLayout, CourseLayout, etc.)

### Data
- `src/lib/course-data/` - Dữ liệu khóa học tập trung
- `src/utils/` - Utilities và helpers

Xem chi tiết tại `docs/guide-template.md`.

## ☁️ Deploy Cloudflare Pages

1) Tạo project mới, kết nối repo GitHub.
2) Cấu hình:
- Build command: `npm run build`
- Output directory: `dist`
- Node: 18+
- Environment vars (optional): `SITE_URL` nếu muốn bật sitemap.
3) Deploy. Dùng URL `*.pages.dev` để QA (chưa gắn domain).

Headers/redirects đã cấu hình ở `_headers` và `_redirects`.

## 🔎 QA checklist

- [ ] Lighthouse mobile ≥ 90 (Performance/SEO/Best Practices)
- [ ] A11y: focus ring, alt cho ảnh, keyboard nav
- [ ] `/decks` lọc + query sync hoạt động
- [ ] Trang deck hiển thị đủ ảnh body + modal ImageViewer
- [ ] Copy link hoạt động, đúng UTM
- [ ] OG fallback hiển thị khi thiếu cover
- [ ] `_headers` và `_redirects` có hiệu lực

