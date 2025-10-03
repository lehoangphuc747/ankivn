# 📝 Template cho Deck Content

Đây là template chi tiết để tạo nội dung deck cho AnkiVN. File này bao gồm tất cả các trường frontmatter có thể sử dụng và hướng dẫn cách viết nội dung.

## 🔧 Frontmatter Template

```markdown
---
# ===== THÔNG TIN CƠ BẢN =====
title: "Tiêu đề bộ thẻ"                    # REQUIRED - Tên hiển thị của deck
slug: "ten-bo-the-khong-dau"               # REQUIRED - URL slug (kebab-case)
category: "Ngoại ngữ"                      # REQUIRED - Danh mục chính
subCategory: "Tiếng Anh"                   # OPTIONAL - Danh mục con
date: "2024-09-01"                         # REQUIRED - Ngày tạo (YYYY-MM-DD)
author: "AnkiVN"                           # OPTIONAL - Tác giả
authorLink: "https://ankivn.com/about"     # OPTIONAL - Link đến trang tác giả
tags: ["vocabulary", "A1", "A2"]          # REQUIRED - Mảng tags (tối thiểu 1)

# ===== HÌNH ẢNH =====
cover: "/images/covers/deck-name.webp"     # OPTIONAL - Cover cho deck card (khuyến nghị)
previewImages:                             # OPTIONAL - Ảnh preview trong trang chi tiết
  - src: "/images/decks/deck-name/front-01.webp"
    alt: "Mặt trước thẻ từ vựng"
  - src: "/images/decks/deck-name/back-01.webp"
    alt: "Mặt sau thẻ với nghĩa tiếng Việt"
  - src: "/images/decks/deck-name/overview.webp"
    alt: "Tổng quan giao diện deck"

# ===== DOWNLOAD LINKS =====
downloads:                                 # REQUIRED - Ít nhất 1 link download
  ankivn: "https://drive.google.com/uc?id=DEMO_ID"           # OPTIONAL - Link AnkiVN
  author: "https://example.com/original-deck"                # OPTIONAL - Link tác giả gốc
  gdrive: "https://drive.google.com/file/d/1ABC123/view"     # OPTIONAL - Google Drive
  r2: "https://cdn.ankivn.vn/downloads/deck-name.apkg"      # OPTIONAL - R2 CDN
  firebase: "https://firebasestorage.googleapis.com/..."    # OPTIONAL - Firebase
  onedrive: "https://1drv.ms/u/s!ABC123"                     # OPTIONAL - OneDrive
---

# 📖 Mô tả ngắn (bắt buộc)

Viết 1-2 câu mô tả ngắn gọn về bộ thẻ. Phần này sẽ hiển thị ngay sau tiêu đề.

## ✨ Tính năng chính

- **Đặc điểm 1**: Mô tả chi tiết tính năng
- **Đặc điểm 2**: Mô tả chi tiết tính năng
- **Đặc điểm 3**: Mô tả chi tiết tính năng

## 📋 Nội dung bộ thẻ

### Cấu trúc thẻ
- **Mặt trước**: Mô tả nội dung mặt trước
- **Mặt sau**: Mô tả nội dung mặt sau

### Phân loại
1. **Nhóm 1** (số lượng thẻ): Mô tả
2. **Nhóm 2** (số lượng thẻ): Mô tả

## 🎯 Đối tượng phù hợp

- Người học cấp độ X
- Đang chuẩn bị cho kỳ thi Y
- Muốn cải thiện kỹ năng Z

## 📱 Hướng dẫn sử dụng

### Bước 1: Tải xuống
1. Chọn một trong các link tải xuống ở trên
2. Lưu file .apkg về máy

### Bước 2: Import vào Anki
1. Mở Anki trên máy tính hoặc điện thoại
2. Chọn File > Import (trên máy tính) hoặc Import (trên điện thoại)
3. Chọn file .apkg vừa tải

### Bước 3: Học hiệu quả
- Học 20-30 thẻ mới mỗi ngày
- Review đầy đủ các thẻ đã học
- Sử dụng tính năng cloze deletion nếu có

## 💡 Tips học tập

1. **Consistency**: Học đều đặn mỗi ngày
2. **Context**: Đặt từ vào câu để dễ nhớ
3. **Practice**: Thực hành nói, viết từ đã học

## 🔗 Tài liệu liên quan

- [Hướng dẫn import deck](/guides/import-ankidroid)
- [Cách tối ưu hóa việc học với Anki](/guides/anki-optimization)

---

*Nếu bạn gặp vấn đề với bộ thẻ này, vui lòng [liên hệ với chúng tôi](/about).*
```

---

## 📚 Hướng Dẫn Chi Tiết

### 🏷️ Categories và SubCategories

#### **Categories chính:**
- `Tất cả` - Danh mục tổng hợp
- `Ngoại ngữ` - Các ngôn ngữ nước ngoài
- `Giáo dục` - Kiến thức phổ thông
- `Chuyên ngành` - Kiến thức chuyên môn
- `Mẫu thẻ` - Templates và formatting
- `Add-ons` - Tiện ích mở rộng
- `Khác` - Các chủ đề khác

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
- **Đường dẫn**: `/images/covers/deck-name.webp`

#### **Preview Images:**
- **Định dạng**: `.webp` (khuyến nghị)
- **Kích thước**: Tối thiểu 800px chiều rộng
- **Số lượng**: Không giới hạn, khuyến nghị 3-5 ảnh
- **Đường dẫn**: `/images/decks/deck-name/`

#### **Cấu trúc thư mục:**
```
public/
└── images/
    ├── covers/
    │   ├── english-basic.webp
    │   ├── jlpt-n5.webp
    │   └── it-terms.webp
    └── decks/
        ├── english-basic/
        │   ├── front-01.webp
        │   ├── back-01.webp
        │   └── overview.webp
        └── jlpt-n5/
            ├── hiragana-front.webp
            └── kanji-back.webp
```

### 🔗 Download Links

#### **Ưu tiên sắp xếp:**
1. `ankivn` - Link chính thức AnkiVN
2. `author` - Link từ tác giả gốc
3. `gdrive` - Google Drive backup
4. `r2` - CDN tốc độ cao
5. `firebase` - Firebase hosting
6. `onedrive` - Microsoft OneDrive

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

#### **Cấu trúc nội dung:**
1. **Mô tả ngắn** (1-2 câu)
2. **Tính năng chính** (3-5 bullet points)
3. **Nội dung bộ thẻ** (chi tiết cấu trúc)
4. **Đối tượng phù hợp**
5. **Hướng dẫn sử dụng**
6. **Tips học tập**
7. **Tài liệu liên quan**

#### **Style guide:**
- Dùng emoji để làm nổi bật tiêu đề
- Viết câu ngắn gọn, dễ hiểu
- Sử dụng bullet points và numbered lists
- Tránh viết quá dài dòng

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
   - Chụp/chuẩn bị hình ảnh preview
   - Upload files .apkg lên storage

2. **Tạo file MDX:**
   - Copy template này
   - Điền đầy đủ frontmatter
   - Viết nội dung markdown

3. **Test local:**
   - `npm run dev`
   - Kiểm tra hiển thị
   - Test download links

4. **Deploy:**
   - Commit và push lên Git
   - Verify trên production

---

## ❓ Troubleshooting

### **Lỗi thường gặp:**

1. **Build failed:**
   - Kiểm tra format date (YYYY-MM-DD)
   - Đảm bảo category/subCategory đúng enum
   - Validate frontmatter syntax

2. **Hình ảnh không hiển thị:**
   - Kiểm tra đường dẫn file
   - Đảm bảo file tồn tại trong public/
   - Verify image format

3. **Download link lỗi:**
   - Test tất cả links thủ công
   - Đảm bảo links trả về file .apkg
   - Kiểm tra CORS headers

### **Support:**
Nếu cần hỗ trợ, tạo issue trên GitHub hoặc liên hệ team AnkiVN.
