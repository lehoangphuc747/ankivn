# PDFEmbed Component Documentation

## Overview
Component `PDFEmbed` cho phép embed file PDF trực tiếp vào trong nội dung Astro pages với nhiều tính năng tương tác.

## Features
- ✅ **Responsive design** - Tự động điều chỉnh trên mobile
- ✅ **Fullscreen mode** - Xem PDF toàn màn hình
- ✅ **Download button** - Tải xuống PDF
- ✅ **Loading indicator** - Hiển thị khi đang tải
- ✅ **Fallback support** - Hỗ trợ trình duyệt không tương thích
- ✅ **Accessibility** - Hỗ trợ screen reader

## Usage in Astro

### Basic Usage
```astro
---
import { PDFEmbed } from '../components/common/PDFEmbed.astro';
---

<PDFEmbed
  src="/documents/anki-guide.pdf"
  title="Hướng dẫn sử dụng Anki"
/>
```

### Advanced Usage
```astro
---
import { PDFEmbed } from '../components/common/PDFEmbed.astro';
---

<PDFEmbed 
  src="/documents/lesson-1.pdf"
  title="Bài 1: Nền móng Anki" 
  height="800px"
  allowFullscreen={true}
  showDownload={true}
  className="my-8"
/>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `src` | `string` | **Required** | Đường dẫn đến file PDF |
| `title` | `string` | `"PDF Document"` | Tiêu đề hiển thị |
| `width` | `string` | `"100%"` | Chiều rộng của viewer |
| `height` | `string` | `"600px"` | Chiều cao của viewer |
| `allowFullscreen` | `boolean` | `true` | Cho phép xem toàn màn hình |
| `showDownload` | `boolean` | `true` | Hiển thị nút tải xuống |
| `className` | `string` | `""` | CSS class tùy chỉnh |

## Examples

### 1. Simple PDF Embed
```mdx
<PDFEmbed src="/pdfs/basic-guide.pdf" />
```

### 2. Custom Height and Title
```mdx
<PDFEmbed 
  src="/pdfs/advanced-tutorial.pdf"
  title="Tutorial Nâng cao"
  height="500px"
/>
```

### 3. No Download Button
```mdx
<PDFEmbed 
  src="/pdfs/preview-only.pdf"
  title="Xem trước"
  showDownload={false}
/>
```

### 4. Mobile Optimized
```mdx
<PDFEmbed 
  src="/pdfs/mobile-content.pdf"
  height="400px"
  className="md:h-96"
/>
```

## File Organization

Recommended structure for PDF files:
```
public/
├── pdfs/
│   ├── courses/
│   │   ├── basic/
│   │   │   ├── lesson-1.pdf
│   │   │   ├── lesson-2.pdf
│   │   │   └── exercises.pdf
│   │   └── advanced/
│   │       ├── module-1.pdf
│   │       └── module-2.pdf
│   ├── guides/
│   │   ├── installation.pdf
│   │   └── troubleshooting.pdf
│   └── downloads/
│       ├── anki-templates.pdf
│       └── cheat-sheet.pdf
```

## Browser Support

| Browser | Support | Notes |
|---------|---------|--------|
| Chrome | ✅ Full | Native PDF viewer |
| Firefox | ✅ Full | Native PDF viewer |
| Safari | ✅ Full | Native PDF viewer |
| Edge | ✅ Full | Native PDF viewer |
| Mobile Safari | ⚠️ Limited | May open in new tab |
| Mobile Chrome | ✅ Full | Good support |

## Accessibility

- PDF viewer có proper ARIA labels
- Keyboard navigation support với Tab/Shift+Tab
- Screen reader friendly
- High contrast mode support

## Performance Tips

1. **Optimize PDF size** - Nén PDF trước khi upload
2. **Use lazy loading** - Component tự động lazy load
3. **Preload important PDFs** - Có thể preload PDF quan trọng
4. **Mobile considerations** - Test trên mobile devices

## Troubleshooting

### PDF không hiển thị
- Kiểm tra đường dẫn file có đúng không
- Đảm bảo file PDF không bị corrupted
- Kiểm tra MIME type của server

### Mobile issues
- Một số mobile browser có thể mở PDF trong tab mới
- Sử dụng height nhỏ hơn cho mobile
- Test trên nhiều devices khác nhau

## Security Notes

- Chỉ embed PDF từ domain tin cậy
- Tránh embed PDF từ external sources
- Scan PDF files for malware trước khi upload