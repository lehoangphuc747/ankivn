# 📝 Template cho Bài Viết Blog

Đây là template chi tiết để tạo một bài viết blog mới cho AnkiVN. File này bao gồm tất cả các trường frontmatter cần thiết và hướng dẫn cách viết nội dung chuẩn MDX.

---

## 🔧 Frontmatter Template

Mỗi bài viết blog phải bắt đầu bằng một khối frontmatter YAML để cung cấp siêu dữ liệu (metadata) cho bài viết.

```markdown
---
# ===== THÔNG TIN BẮT BUỘC =====
title: "Tiêu đề bài viết - Ngắn gọn, hấp dẫn (50-60 ký tự)"
description: "Mô tả ngắn về bài viết (150-160 ký tự) - Rất quan trọng cho SEO."
date: "2024-09-01" # Định dạng YYYY-MM-DD

# ===== THÔNG TIN TÙY CHỌN (KHUYẾN KHÍCH CÓ) =====
author: "Tên tác giả" # Mặc định là "AnkiVN Team" nếu bỏ trống
authorBio: "Một đoạn giới thiệu ngắn về tác giả. Nếu bỏ trống, sẽ dùng bio mặc định của AnkiVN Team."
category: "review" # Phân loại bài viết (vd: review, tutorial, tips, news)
source: "https://example.com/source-link" # OPTIONAL - Link đến bài viết gốc
tags: ["tag1", "tag2", "tag3"] # Mảng các tags, viết thường, không dấu, nối bằng gạch ngang
cover: "/images/blog/ten-bai-viet/cover.webp" # Ảnh bìa hiển thị ở đầu bài viết và trên card
---

<!-- 
  NỘI DUNG BÀI VIẾT BẮT ĐẦU TỪ ĐÂY
  Bạn có thể sử dụng cú pháp Markdown và import các component Astro/React.
-->
```

### Giải thích các trường Frontmatter

-   **`title` (Bắt buộc):** Tiêu đề chính của bài viết. Sẽ được hiển thị trên tab trình duyệt, thẻ `<h1>`, và trong các thẻ meta SEO.
-   **`description` (Bắt buộc):** Mô tả ngắn gọn. Hiển thị dưới tiêu đề trong kết quả tìm kiếm của Google. Cực kỳ quan trọng để thu hút người đọc.
-   **`date` (Bắt buộc):** Ngày xuất bản bài viết.
-   **`author` (Tùy chọn):** Tên tác giả. Nếu có, một khung giới thiệu tác giả sẽ xuất hiện ở cuối bài viết.
-   **`authorBio` (Tùy chọn):** Tiểu sử của tác giả. Hữu ích cho các tác giả khách không thuộc AnkiVN Team.
-   **`source` (Tùy chọn):** Đường link đến bài viết gốc (ví dụ: Facebook, blog cá nhân).
-   **`category` (Tùy chọn):** Giúp phân loại bài viết. Ví dụ: `review`, `tutorial`, `tips`, `news`.
-   **`tags` (Tùy chọn):** Giúp người dùng tìm kiếm và lọc bài viết.
-   **`cover` (Tùy chọn):** Đường dẫn đến ảnh bìa. Nếu có, ảnh sẽ hiển thị rất nổi bật.

---

## 🔗 Slug và URL

Tương tự như deck, slug của bài viết được **tự động tạo từ tên file**.

-   **Tên file:** `gioi-thieu-sila-extension.mdx`

**Quy tắc đặt tên file:**
-   ✅ Dùng chữ thường, không dấu, các từ nối với nhau bằng dấu gạch ngang (`kebab-case`).
-   ❌ **KHÔNG** dùng khoảng trắng, chữ in hoa, hay ký tự đặc biệt.

---

## ✍️ Hướng Dẫn Viết Nội Dung (MDX)

Nội dung bài viết nằm ngay sau khối frontmatter. Bạn có toàn quyền tự do sáng tạo với cú pháp Markdown và có thể nhúng các component tương tác.

### Cú pháp Markdown cơ bản

```markdown
# Heading 1 (Thường là tiêu đề bài viết, không cần dùng trong body)
## Heading 2 (Dùng cho các mục lớn)
### Heading 3 (Dùng cho các mục nhỏ hơn)

Đây là một đoạn văn bản. Để xuống dòng, hãy để một dòng trống.

**Chữ in đậm** và *chữ in nghiêng*.

- Danh sách không có thứ tự
  - Mục con
- Mục khác

1. Danh sách có thứ tự
2. Mục 2

> Đây là một trích dẫn. Rất hữu ích để làm nổi bật một ý quan trọng.

Tạo một đường link: [AnkiVN](https://ankivn.com)

Chèn một ảnh vào nội dung: ![Mô tả ảnh](/images/blog/ten-bai-viet/image-01.webp)
```

### Nhúng Video YouTube

Để nhúng video, hãy import component `YouTubeEmbed` và sử dụng nó.

```markdown
---
[...frontmatter...]
---
import YouTubeEmbed from '@/components/common/YouTubeEmbed.astro';

### Xem video hướng dẫn tại đây:

<YouTubeEmbed videoId="VIDEO_ID_CUA_BAN" />
```

### Nhúng file PDF từ Google Drive

Tương tự, bạn có thể nhúng file PDF để người đọc xem trực tiếp.

```markdown
---
[...frontmatter...]
---
import PDFEmbed from '@/components/mdx/PDFEmbed.astro';

### Tài liệu tham khảo

<PDFEmbed driveId="GOOGLE_DRIVE_FILE_ID" />
```

---

## 🚀 Workflow Tạo Bài Viết Mới

1.  **Chuẩn bị nội dung & hình ảnh:**
    -   Viết nội dung bài viết.
    -   Chuẩn bị ảnh bìa (nếu có) và các ảnh minh họa khác. Đặt tên file ảnh theo `kebab-case`.
    -   Tải tất cả hình ảnh vào thư mục `public/images/blog/ten-bai-viet/`.

2.  **Tạo file MDX:**
    -   Tạo một file mới trong `src/content/blog/`.
    -   Đặt tên file theo quy tắc đã nêu (ví dụ: `cach-hoc-tu-vung-hieu-qua.mdx`).
    -   Copy và điền đầy đủ thông tin vào **Frontmatter Template**.
    -   Dán nội dung bài viết của bạn vào sau khối frontmatter.

3.  **Kiểm tra lại (Checklist):**
    -   [ ] Tiêu đề và mô tả đã tối ưu cho SEO chưa?
    -   [ ] `date` đúng định dạng `YYYY-MM-DD`?
    -   [ ] Đường dẫn ảnh bìa (`cover`) chính xác?
    -   [ ] Tất cả các link trong bài viết đều hoạt động?
    -   [ ] (Nếu có) `videoId` của YouTube hoặc `driveId` của PDF đã đúng chưa?

Sau khi hoàn tất, bạn có thể commit và đẩy file lên GitHub để xuất bản.

---

## 💡 Mẹo

-   **Cấu trúc bài viết:** Sử dụng các thẻ `<h2>` và `<h3>` để chia bài viết thành các phần logic, giúp người đọc dễ theo dõi và tốt cho SEO.
-   **Hình ảnh:** Luôn cung cấp mô tả cho ảnh (`alt text`) để cải thiện khả năng truy cập.
-   **Liên kết nội bộ:** Chèn các link đến những bài viết hoặc bộ thẻ khác trên AnkiVN để giữ chân người đọc.

```

Bạn có thể lưu file này vào thư mục `docs/` của dự án để làm tài liệu tham khảo cho việc viết blog sau này.

<!--
[PROMPT_SUGGESTION]Tạo một bài viết blog mẫu sử dụng template vừa tạo.[/PROMPT_SUGGESTION]
[PROMPT_SUGGESTION]Tối ưu hóa SEO cho trang blog bằng cách thêm sitemap và file robots.txt.[/PROMPT_SUGGESTION]
