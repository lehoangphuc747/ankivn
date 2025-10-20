# 📝 Template cho Deck Content

Đây là template chi tiết để tạo nội dung deck cho AnkiVN. File này bao gồm tất cả các trường frontmatter có thể sử dụng và hướng dẫn cách viết nội dung.

## ⚠️ YÊU CẦU STRICT - KHÔNG ĐƯỢC VI PHẠM

### 🔒 **Quy tắc nội dung:**
1. **GIỮ NGUYÊN 100%** nội dung gốc của tác giả
2. **KHÔNG THÊM** bất kỳ thông tin ngoài lề nào
3. **KHÔNG CẮT BỚT** bất kỳ thông tin nào của tác giả
4. **KHÔNG SỬA ĐỔI** văn phong, cách diễn đạt gốc
5. **CHỈ FORMAT** theo cấu trúc frontmatter + markdown

### 📋 **Workflow bắt buộc:**
1. Nhận nội dung gốc từ tác giả
2. Tạo frontmatter phù hợp với schema
3. Copy 100% nội dung gốc vào markdown body
4. **KHÔNG** chỉnh sửa gì thêm

---

## 🔧 Frontmatter Template

```markdown
---
# ===== THÔNG TIN CƠ BẢN =====
title: "Tiêu đề bộ thẻ"                    # REQUIRED - Tên hiển thị của deck
category: "Ngoại ngữ"                      # REQUIRED - Danh mục chính
subCategory: "Tiếng Anh"                   # OPTIONAL - Danh mục con
date: "2024-09-01"                         # REQUIRED - Ngày tạo (YYYY-MM-DD)
author: "AnkiVN"                           # OPTIONAL - Tác giả
authorLink: "https://ankivn.com/about"     # OPTIONAL - Link đến trang tác giả
tags: ["vocabulary", "A1", "A2"]          # REQUIRED - Mảng tags (tối thiểu 1)

# ===== HÌNH ẢNH =====
cover: "/images/decks/deck-name.webp"     # OPTIONAL - Cover cho deck card (khuyến nghị nếu có thì mới thêm, chứ đừng cố :)))))
previewImages:                             # OPTIONAL - Ảnh preview trong trang chi tiết
  - src: "/images/decks/deck-name-front-01.webp"
    alt: "Mặt trước thẻ từ vựng"
  - src: "/images/decks/deck-name-back-01.webp"
    alt: "Mặt sau thẻ với nghĩa tiếng Việt"
  - src: "/images/decks/deck-name-overview.webp"
    alt: "Tổng quan giao diện deck"

# ===== DOWNLOAD LINKS =====
downloads:                                 # REQUIRED - Ít nhất 1 link download
  - name: "AnkiVN"                         # REQUIRED - Tên hiển thị của link
    url: "https://drive.google.com/uc?id=DEMO_ID"  # REQUIRED - URL download
    description: "Link chính từ AnkiVN"     # OPTIONAL - Mô tả ngắn
    type: "ankivn"                          # OPTIONAL - Loại link (ankivn, author, gdrive, r2, firebase, onedrive, other)
  - name: "Tác giả gốc"
    url: "https://example.com/original-deck"
    description: "Link từ tác giả ban đầu"
    type: "author"
  - name: "Google Drive Mirror"
    url: "https://drive.google.com/file/d/1ABC123/view"
    description: "Backup trên Google Drive"
    type: "gdrive"
---

<!-- 
  ⚠️ LƯU Ý VỀ SLUG:
  
  KHÔNG CẦN field 'slug' trong frontmatter!
  
  Astro Content Collections tự động tạo slug từ tên file:
  - File: my-english-deck.mdx -> Slug: "my-english-deck"  
  - File: 100-phrasal-verbs.mdx -> Slug: "100-phrasal-verbs"
  
  URL cuối cùng sẽ là: /decks/my-english-deck
  
  Quy tắc đặt tên file:
  ✅ kebab-case (dấu gạch ngang)
  ✅ chỉ dùng chữ cái, số, gạch ngang
  ✅ không dấu tiếng Việt
  ✅ không space, ký tự đặc biệt
  
  Ví dụ tên file tốt:
  - english-business-vocabulary.mdx
  - jlpt-n5-kanji.mdx
  - ielts-listening-practice.mdx
-->

```

# 📖 Mô tả ngắn (bắt buộc)

Viết 1-2 câu mô tả ngắn gọn về bộ thẻ. Phần này sẽ hiển thị ngay sau tiêu đề.

**💡 Nếu có video YouTube hướng dẫn, thêm ngay đây:**
```markdown
import YouTubeEmbed from '@/components/common/YouTubeEmbed.astro';
<YouTubeEmbed videoId="VIDEO_ID" />
```

**💡 Nếu có PDF từ Google Drive, thêm như sau:**
```markdown
import PDFEmbed from '../../components/mdx/PDFEmbed.astro';

<PDFEmbed 
  driveId="GOOGLE_DRIVE_FILE_ID"
  title="Tiêu đề PDF"
  description="Mô tả ngắn về PDF"
/>
```

## 📚 Hướng Dẫn Chi Tiết

### 🔗 Slug và URL Generation

#### **Tại sao không cần field `slug`?**

Astro Content Collections **tự động tạo slug từ tên file**, không cần khai báo trong frontmatter:

```
File: english-business-vocabulary.mdx
→ Slug: "english-business-vocabulary" 
→ URL: /decks/english-business-vocabulary
```

#### **Quy tắc đặt tên file:**
- ✅ **kebab-case**: `my-deck-name.mdx`
- ✅ **Chỉ dùng**: chữ cái (a-z), số (0-9), gạch ngang (-)
- ❌ **Tránh**: space, dấu tiếng Việt, ký tự đặc biệt

#### **Ví dụ tên file:**
```
✅ Tốt:
- english-business-vocabulary.mdx
- jlpt-n5-kanji-deck.mdx
- ielts-listening-practice.mdx
- medical-terminology-basic.mdx

❌ Tránh:
- English Business Vocabulary.mdx    (có space)
- từ-vựng-tiếng-anh.mdx             (có dấu)
- deck#1@special.mdx                (ký tự đặc biệt)
```

#### **Trong code Astro:**
```typescript
// src/pages/decks/[slug].astro
const decks = await getCollection('decks');
return decks.map((d) => ({ 
  params: { slug: d.slug }  // ← d.slug tự động từ filename
}));
```

### 🏷️ Categories và SubCategories

#### **Categories chính:**
- `Tất cả` - Danh mục tổng hợp
- `Ngoại ngữ` - Các ngôn ngữ nước ngoài
- `Giáo dục` - Kiến thức phổ thông
- `Chuyên ngành` - Kiến thức chuyên môn
- `Mẫu thẻ` - Templates và formatting
- `Add-ons` - Tiện ích mở rộng
- `Khác` - Các chủ đề khác

#### **⚠️ LƯU Ý QUAN TRỌNG VỀ CATEGORY:**
- **Đối với deck ngôn ngữ**: Luôn dùng `category: "Ngoại ngữ"` và `subCategory: "Tiếng [Ngôn ngữ]"`
- **Ví dụ đúng:**
  - Tiếng Trung: `category: "Ngoại ngữ"`, `subCategory: "Tiếng Trung"`
  - Tiếng Anh: `category: "Ngoại ngữ"`, `subCategory: "Tiếng Anh"`
  - Tiếng Nhật: `category: "Ngoại ngữ"`, `subCategory: "Tiếng Nhật"`
- **KHÔNG dùng**: `category: "Tiếng Trung"` (sai, phải dùng subCategory)

#### **SubCategories cho Ngoại ngữ:**
- `Tiếng Anh`, `Tiếng Nhật`, `Tiếng Trung`, `Tiếng Hàn`
- `Tiếng Pháp`, `Tiếng Đức`, `Tiếng Nga`

#### **SubCategories cho Giáo dục:**
- `THCS`, `THPT`, `Đại học`

#### **SubCategories cho Chuyên ngành:**
- `Y Dược`, `Công nghệ thông tin`, `Kinh tế`

### 🖼️ Quản Lý Hình Ảnh

#### **Cover Image:**
- **Định dạng**: `.webp` (khuyến nghị) hoặc `.jpg/.png`
- **Kích thước**: 1200x630px (tỷ lệ 1.91:1)
- **Dung lượng**: < 500KB
- **Đường dẫn**: `/images/decks/deck-name.webp`

#### **Preview Images:**
- **Định dạng**: `.webp` (khuyến nghị)
- **Kích thước**: Tối thiểu 800px chiều rộng
- **Số lượng**: Không giới hạn, khuyến nghị 3-5 ảnh
- **Đường dẫn**: `/images/decks/deck-name/`
- **Đường dẫn**: `/images/decks/`

#### **Cấu trúc thư mục:**
```
public/
└── images/
    └── decks/
        ├── front-01.webp
        ├── back-01.webp
        └── overview.webp
        ├── hiragana-front.webp
        └── kanji-back.webp
```

### � YouTube Video (Tùy chọn)

#### **Cách thêm YouTube video trong MDX:**

**Sử dụng YouTubeEmbed component (khuyến nghị)**
```markdown
---
[frontmatter metadata]
---

import YouTubeEmbed from '@/components/common/YouTubeEmbed.astro';

<YouTubeEmbed videoId="VIDEO_ID" />

## Nội dung chính...
```

#### **YouTubeEmbed Component Props:**
- `videoId`: ID của video YouTube (bắt buộc)
- `title`: Tiêu đề video (tùy chọn, mặc định "YouTube video")
- `width`: Chiều rộng (tùy chọn, mặc định "100%")
- `height`: Chiều cao (tùy chọn, mặc định "315")

#### **Lấy Video ID từ YouTube URL:**
```
https://www.youtube.com/watch?v=GpFwGoKSs3M
                                ↑
                            Video ID
```

#### **Ví dụ thực tế:**
```markdown
---
title: "30 Chủ đề từ vựng tiếng Anh"
# ... frontmatter khác
---

import YouTubeEmbed from '@/components/common/YouTubeEmbed.astro';

<YouTubeEmbed videoId="GpFwGoKSs3M" />
```

### 📄 PDF Embed (Tùy chọn)

#### **Cách thêm PDF embed từ Google Drive:**

```markdown
---
[frontmatter metadata]
---

import PDFEmbed from '../../components/mdx/PDFEmbed.astro';

<PDFEmbed 
  driveId="GOOGLE_DRIVE_FILE_ID"
  title="Tiêu đề PDF"
  description="Mô tả ngắn về PDF"
/>

## Nội dung chính...
```

#### **PDFEmbed Component Props:**
- `driveId`: ID file từ Google Drive (bắt buộc nếu không có src)
- `src`: URL trực tiếp đến PDF (thay thế driveId)
- `title`: Tiêu đề hiển thị (tùy chọn)
- `description`: Mô tả PDF (tùy chọn)
- `width`: Chiều rộng (mặc định "100%")
- `height`: Chiều cao (mặc định "600px")
- `allowFullscreen`: Cho phép toàn màn hình (mặc định true)
- `showDownload`: Hiện nút tải xuống (mặc định true)

#### **Lấy Drive ID từ Google Drive URL:**
```
https://drive.google.com/file/d/1oPwDEQpqa_e8Il8yxvsAE03p4222_CNO/view
                                ↑
                          Google Drive ID
```

### �🔗 Download Links

#### **Cấu trúc mới - Array với tên tự do:**
```yaml
downloads:
  - name: "Tên hiển thị tự do"
    url: "https://example.com/download-link"
    description: "Mô tả ngắn (tùy chọn)"
    type: "ankivn" # ankivn, author, gdrive, r2, firebase, onedrive, other
```

#### **Ưu điểm:**
- **Linh hoạt**: Có thể thêm bao nhiêu link tùy ý
- **Tên tự do**: Đặt tên link theo ý muốn (VD: "Google Drive (Remake)", "Version 2.0")
- **Mô tả**: Giải thích chi tiết từng link
- **Phân loại**: Type giúp hiển thị icon phù hợp

#### **Quy tắc URL:**
- Tất cả link phải là HTTPS
- Google Drive: Dùng direct download link
- Đảm bảo file .apkg có thể tải trực tiếp

### 🏷️ Tags System

#### **Tags phổ biến:**
- **Cấp độ**: `beginner`, `intermediate`, `advanced`, `A1`, `A2`, `B1`, `B2`, `C1`, `C2`
- **Kỹ năng**: `vocabulary`, `grammar`, `listening`, `speaking`, `reading`, `writing`
- **Chủ đề**: `business`, `travel`, `daily-life`, `academic`, `medical`, `technology`
- **Định dạng**: `audio`, `images`, `cloze`, `basic`, `reverse`

#### **Quy tắc đặt tags:**
- Viết thường, không dấu
- Dùng dấu gạch ngang thay space
- Tối thiểu 1 tag, tối đa 10 tags
- Ưu tiên tags phổ biến để dễ tìm kiếm

### 📝 Content Guidelines

#### **YÊU CẦU NỘI DUNG - TUÂN THỦ NGHIÊM NGẶT:**

##### ✅ **ĐƯỢC PHÉP:**
- Tạo frontmatter metadata
- Format theo cấu trúc Markdown chuẩn
- Sửa lỗi chính tả rõ ràng (nếu tác giả đồng ý)

##### ❌ **NGHIÊM CẤM:**
- Thêm thông tin không có trong nội dung gốc
- Cắt bớt, rút gọn nội dung tác giả
- Thay đổi ý nghĩa, ngữ điệu gốc
- Thêm comment, ghi chú cá nhân
- Sửa đổi cách diễn đạt của tác giả
- Thêm section không có trong bản gốc

##### ⚠️ **LƯU Ý MDX SYNTAX:**
- **KHÔNG dùng** `<!--truncate-->` (lỗi MDX)
- **KHÔNG dùng** `:::info` directives (không support)
- **KHÔNG dùng** JSX với `style={{}}` (syntax error)
- **SỬA** `<button class="">` thành markdown link
- **ĐỔI** đường dẫn `static/images/` thành `/images/`
- **DÙNG** markdown chuẩn thay vì HTML/JSX
- **YOUTUBE**: Dùng `<YouTubeEmbed videoId="..." />` với import statement
- **PDF**: Dùng `<PDFEmbed driveId="..." />` với import statement
- Nếu nội dung của người dùng không có hình ảnh nào thì đừng cố gắng thêm nhé. Tuyệt đối không được thêm nếu không có ảnh trong nội dung người dùng gửi.

#### **Cấu trúc bài viết chuẩn:**
```markdown
---
[FRONTMATTER - metadata only]
---

[100% NỘI DUNG GỐC CỦA TÁC GIẢ - KHÔNG THAY ĐỔI]
```

#### **Style guide:**
- **KHÔNG** thay đổi style gốc của tác giả
- **KHÔNG** thêm emoji nếu tác giả không dùng
- **KHÔNG** format lại cấu trúc heading nếu tác giả đã có
- **CHỈ** đảm bảo Markdown syntax đúng

### 🔍 SEO Best Practices

#### **Title:**
- Độ dài: 50-60 ký tự
- Bao gồm từ khóa chính
- Tránh từ khóa spam

#### **Tags:**
- Sử dụng từ khóa người dùng hay tìm
- Cân bằng giữa general và specific tags
- Kiểm tra tags đã có trong hệ thống

#### **Content:**
- Heading hierarchy rõ ràng (H2, H3)
- Sử dụng internal links
- Alt text cho tất cả hình ảnh

---

## 🚀 Workflow Tạo Deck Mới

1. **Chuẩn bị nội dung:**
   - Xác định category/subcategory
   - Chuẩn bị hình ảnh cover và preview
   - Upload files .apkg lên storage

2. **Tạo file MDX:**
   - Copy template này
   - Đặt tên file: `ten-bo-the.mdx` (slug sẽ tự động generate từ filename)
   - Điền đầy đủ frontmatter theo schema
   - **COPY 100% nội dung gốc** của tác giả vào markdown body

3. **Lưu file vào:**
   ```
   src/content/decks/ten-bo-the.mdx
   ```

### ⚠️ **CHECKLIST TRƯỚC KHI DEPLOY:**
- [ ] Frontmatter đầy đủ và đúng schema
- [ ] Nội dung gốc được giữ 100% không thay đổi
- [ ] Không có thông tin ngoài lề được thêm vào
- [ ] Markdown syntax đúng chuẩn
- [ ] Download links đã test thành công
- [ ] Preview images hiển thị chính xác
- [ ] YouTube video (nếu có) sử dụng YouTubeEmbed component với import statement
- [ ] PDF embed (nếu có) sử dụng PDFEmbed component với import statement

## ❓ Troubleshooting

### **Lỗi thường gặp:**

1. **Build failed:**
   - Kiểm tra format date (YYYY-MM-DD)
   - Đảm bảo category/subCategory đúng enum
   - Validate frontmatter syntax (đặc biệt YAML indentation)

2. **Hình ảnh không hiển thị:**
   - Kiểm tra đường dẫn file (phải bắt đầu bằng `/`)
   - Đảm bảo file tồn tại trong `public/`
   - Verify image format (.webp khuyến nghị)

3. **Download link lỗi:**
   - Test tất cả links thủ công
   - Đảm bảo links trả về file .apkg
   - Kiểm tra CORS headers

4. **Schema validation error:**
   - Kiểm tra required fields: `title`, `category`, `date`, `tags`, `downloads`
   - Đảm bảo `downloads` object có ít nhất 1 link
   - Validate URL format cho `authorLink` và các download links

5. **MDX Syntax error:**
   - Loại bỏ `<!--truncate-->` comments (không hợp lệ trong MDX)
   - Thay `:::info` directives bằng markdown blockquote `>`
   - Đổi JSX components thành markdown chuẩn
   - Sửa đường dẫn hình ảnh từ `static/` thành `/`
   - Tránh dùng `style={{}}` inline styles
   - **YouTube**: Dùng `<YouTubeEmbed videoId="..." />` với import statement
   - **PDF**: Dùng `<PDFEmbed driveId="..." />` với import statement

### **Support:**
Nếu cần hỗ trợ, tạo issue trên GitHub hoặc liên hệ team AnkiVN.


## 📄 Ví Dụ Thực Tế

**⚠️ Lưu ý quan trọng về Categories:**

- **category**: Luôn là "Ngoại ngữ" cho các deck ngôn ngữ
- **subCategory**: Ngôn ngữ cụ thể (Tiếng Anh, Tiếng Trung, Tiếng Nhật, v.v.)
- **KHÔNG** đặt tên ngôn ngữ vào category!

Ví dụ: `category: "Ngoại ngữ"` + `subCategory: "Tiếng Trung"` ✅  
Sai: `category: "Tiếng Trung"` ❌
```