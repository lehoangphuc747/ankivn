# Hệ thống Hướng dẫn (Guides) - Cấu trúc với Astro Static Pages# Hệ thống Hướng dẫn (Guides) - Cấu trúc MỚI với Astro Static Pages



## 📁 Cấu trúc thư mục hiện tại## 📁 Cấu trúc thư mục hiện tại



``````

src/pages/guides/src/pages/guides/

├── guides.astro              # Trang chủ Anki Academy├── guides.astro              # Trang chủ Anki Academy

├── co-ban.astro              # Trang tổng quan khóa học Cơ bản├── co-ban.astro              # Trang tổng quan khóa học Cơ bản

├── nang-cao.astro            # Trang tổng quan khóa học Nâng cao├── nang-cao.astro            # Trang tổng quan khóa học Nâng cao

├── co-ban/                   # Thư mục chứa lessons của khóa Cơ bản├── co-ban/                   # Thư mục chứa lessons của khóa Cơ bản

│   ├── Lesson-01-nen-mong-anki.astro│   ├── Lesson-01-nen-mong-anki.astro

│   ├── Lesson-02-lam-quen-anki.astro│   ├── Lesson-02-lam-quen-anki.astro

│   └── Lesson-03-tao-the-hieu-qua-co-ban.astro│   └── Lesson-03-tao-the-hieu-qua-co-ban.astro

└── nang-cao/                 # Thư mục chứa lessons của khóa Nâng cao (sẵn sàng)└── nang-cao/                 # Thư mục chứa lessons của khóa Nâng cao (sẵn sàng)

``````



## 🔗 URL Structure## 🔗 URL Structure



- `/guides` - Trang chủ Anki Academy- `/guides` - Trang chủ Anki Academy

- `/guides/co-ban` - Khóa học Cơ bản- `/guides/co-ban` - Khóa học Cơ bản  

- `/guides/co-ban/Lesson-01-nen-mong-anki` - Lesson 1.1- `/guides/co-ban/Lesson-01-nen-mong-anki` - Lesson 1.1

- `/guides/co-ban/Lesson-02-lam-quen-anki` - Lesson 2.1- `/guides/co-ban/Lesson-02-lam-quen-anki` - Lesson 2.1

- `/guides/co-ban/Lesson-03-tao-the-hieu-qua-co-ban` - Lesson 3.1- `/guides/co-ban/Lesson-03-tao-the-hieu-qua-co-ban` - Lesson 3.1



## 🔄 Luồng hoạt động## 🔄 Luồng hoạt động mới



1. **Trang chủ**: `guides.astro` → Hiển thị danh sách khóa học1. **Trang chủ**: `guides.astro` → Hiển thị danh sách khóa học

2. **Khóa học**: `co-ban.astro` → Trang tổng quan với CourseLayout2. **Khóa học**: `co-ban.astro` → Trang tổng quan với CourseLayout

3. **Bài học**: `co-ban/Lesson-01-nen-mong-anki.astro` → Trang lesson với SimpleLessonLayout3. **Bài học**: `co-ban/nen-mong-anki.astro` → Trang lesson với SimpleLessonLayout



## 📝 Quy tắc đặt tên file## 📝 Quy tắc đặt tên file



### **Cho Course pages (trang tổng quan):**### **Cho Course pages (trang tổng quan):**

- `co-ban.astro` - Khóa học Cơ bản- `co-ban.astro` - Khóa học Cơ bản

- `nang-cao.astro` - Khóa học Nâng cao- `nang-cao.astro` - Khóa học Nâng cao

- `tips.astro` - Khóa học Tips (tương lai)- `tips.astro` - Khóa học Tips (tương lai)



### **Cho Lesson pages (trang bài học):**### **Cho Lesson pages (trang bài học):**

- `src/pages/guides/{course-name}/Lesson-{number}-{lesson-slug}.astro`- `src/pages/guides/{course-name}/Lesson-{number}-{lesson-slug}.astro`

- Ví dụ:- Ví dụ: 

  - `co-ban/Lesson-01-nen-mong-anki.astro`  - `co-ban/Lesson-01-nen-mong-anki.astro`

  - `co-ban/Lesson-02-lam-quen-anki.astro`  - `co-ban/Lesson-02-lam-quen-anki.astro`

  - `nang-cao/Lesson-01-cau-hinh-nang-cao.astro`  - `nang-cao/Lesson-01-cau-hinh-nang-cao.astro`



## 🏗️ Cấu trúc dữ liệu trong Astro Pages## 🏗️ Cấu trúc dữ liệu trong Astro Pages



### **1. Course Page Structure (co-ban.astro, nang-cao.astro)**### **1. Course Page Structure (co-ban.astro, nang-cao.astro)**

```astro```astro

------

// Frontmatter// Frontmatter

import CourseLayout from '../../layouts/CourseLayout.astro';const courseData = {

import { basicCourse } from '../../lib/course-data/course-data';  id: 'co-ban', // ID khóa học

  title: 'Khóa học Anki Cơ bản',

const theme = {  level: 'Cơ bản',

  emoji: '🌱',  description: 'Khóa học nền tảng về Anki...',

  colors: {  duration: '3 giờ',

    primary: 'green',  students: 1500,

    secondary: 'emerald',  rating: 4.9,

    badge: 'green',  modules: [

    hover: { primary: 'green', secondary: 'emerald' }    {

  }      id: 'module-1',

};      title: 'Module 1: Giới thiệu Anki',

---      duration: '1 giờ',

      description: 'Tìm hiểu về Anki và spaced repetition',

<CourseLayout course={basicCourse} theme={theme}>      lessons: [

  <!-- Nội dung bổ sung (optional) -->        { title: 'Nền móng Anki', slug: 'Lesson-01-nen-mong-anki', duration: '20 phút' },

  <p class="text-center text-gray-600 mb-8">        { title: 'Làm quen với Anki', slug: 'Lesson-02-lam-quen-anki', duration: '25 phút' },

    Khóa học này sẽ giúp bạn nắm vững các kiến thức cơ bản về Anki        { title: 'Tạo thẻ hiệu quả', slug: 'Lesson-03-tao-the-hieu-qua-co-ban', duration: '30 phút' }

    và áp dụng hiệu quả vào việc học tập hàng ngày.      ]

  </p>    }

</CourseLayout>  ]

```};



### **2. Lesson Page Structure (Lesson-XX-{slug}.astro)**const theme = {

```astro  emoji: '🌱',

---  colors: {

// Frontmatter    primary: 'green',

import SimpleLessonLayout from '../../layouts/SimpleLessonLayout.astro';    secondary: 'emerald',

    badge: 'green',

const lessonData = {    hover: { primary: 'green', secondary: 'emerald' }

  title: "Nền móng Anki: Spaced Repetition",  }

  description: "Hiểu về hệ thống lặp lại ngắt quãng",};

  level: "Cơ bản",---

  duration: "20 phút",

  author: "AnkiVN Team",<CourseLayout course={courseData} theme={theme}>

  publishDate: "2024-01-15",  <!-- Nội dung bổ sung (optional) -->

  tags: ["anki", "spaced-repetition", "học tập"]</CourseLayout>

};```



// Course structure for navigation### **2. Lesson Page Structure (Lesson-XX-{slug}.astro)**

const courseStructure = {```astro

  modules: [---

    {// Frontmatter

      id: 'module-1',const lessonData = {

      title: 'Module 1: Giới thiệu Anki',  title: "Nền móng Anki: Spaced Repetition",

      lessons: [  description: "Hiểu về hệ thống lặp lại ngắt quãng",

        { title: 'Nền móng Anki', slug: 'Lesson-01-nen-mong-anki' },  level: "Cơ bản",

        { title: 'Làm quen với Anki', slug: 'Lesson-02-lam-quen-anki' },  duration: "20 phút",

        { title: 'Tạo thẻ hiệu quả', slug: 'Lesson-03-tao-the-hieu-qua-co-ban' }  author: "AnkiVN Team",

      ]  publishDate: "2024-01-15",

    }  tags: ["anki", "spaced-repetition", "học tập"]

  ]};

};

// Course structure for navigation

// Navigation logicconst courseStructure = {

const allLessons = courseStructure.modules.flatMap(m => m.lessons);  modules: [

const currentIndex = allLessons.findIndex(l => l.slug === 'Lesson-01-nen-mong-anki');    // Copy từ course page tương ứng

let prevLesson, nextLesson;  ]

if (currentIndex !== -1) {};

  if (currentIndex > 0) prevLesson = allLessons[currentIndex - 1];

  if (currentIndex < allLessons.length - 1) nextLesson = allLessons[currentIndex + 1];// Navigation logic

}const allLessons = courseStructure.modules.flatMap(m => m.lessons);

---const currentIndex = allLessons.findIndex(l => l.slug === 'Lesson-01-nen-mong-anki');

let prevLesson, nextLesson;

<SimpleLessonLayoutif (currentIndex !== -1) {

  title={lessonData.title}  if (currentIndex > 0) prevLesson = allLessons[currentIndex - 1];

  description={lessonData.description}  if (currentIndex < allLessons.length - 1) nextLesson = allLessons[currentIndex + 1];

  author={lessonData.author}}

  date={lessonData.publishDate}---

  duration={lessonData.duration}

  level={lessonData.level}<SimpleLessonLayout

  tags={lessonData.tags}  title={lessonData.title}

  prevLesson={prevLesson}  description={lessonData.description}

  nextLesson={nextLesson}  author={lessonData.author}

>  date={lessonData.publishDate}

  <div class="prose prose-lg max-w-none">  duration={lessonData.duration}

    <!-- Nội dung lesson -->  level={lessonData.level}

    <h2>Giới thiệu về Spaced Repetition</h2>  tags={lessonData.tags}

    <p>Spaced repetition là kỹ thuật học tập...</p>  prevLesson={prevLesson}

  nextLesson={nextLesson}

    <h3>Cách hoạt động</h3>>

    <p>Hệ thống spaced repetition...</p>  <div class="prose prose-lg max-w-none">

    <!-- Nội dung lesson -->

    <!-- Có thể sử dụng các component Astro khác -->    <h2>Giới thiệu về Spaced Repetition</h2>

    <!-- <VideoEmbed videoId="..." /> -->    <p>Spaced repetition là kỹ thuật học tập...</p>

    <!-- <PDFEmbed src="..." /> -->  </div>

  </div></SimpleLessonLayout>

</SimpleLessonLayout>```

```

---

## 📊 Dữ liệu tập trung

# 📝 Template Hướng dẫn Tạo Nội dung cho Anki Academy (Guides)

### **Course Data Structure**7.  **`src/components/guides/GuideCard.astro`**: Component hiển thị một "card" (thẻ) đại diện cho mỗi Khóa học/Hướng dẫn trên các trang liệt kê (ví dụ: `guides.astro`).

Tất cả dữ liệu khóa học được lưu trong `src/lib/course-data/course-data.ts`:

    *   **Cách hoạt động:** Component này nhận vào các `props` (thuộc tính) từ một guide và render ra một thẻ giao diện hoàn chỉnh.

```typescript    *   **Các `props` chính:**

export interface Course {        *   `href` (bắt buộc): Đường dẫn đến trang chi tiết của khóa học (ví dụ: `/guides/anki-co-ban`).

  id: string;        *   `title` (bắt buộc): Tiêu đề của khóa học.

  title: string;        *   `cover` (tùy chọn): Đường dẫn đến ảnh bìa. Nếu không có, nó sẽ sử dụng ảnh mặc định (`/default-thumbnail.webp`).

  level: string;        *   `guideType` (tùy chọn): Loại hướng dẫn ('Cơ bản', 'Nâng cao', 'Tips'). Dùng để hiển thị một "badge" (nhãn) với màu sắc tương ứng.

  description: string;        *   `tags` (tùy chọn): Một mảng các tag. Component sẽ hiển thị 3 tag đầu tiên.

  duration: string;    *   **Cách sử dụng:** Trong một trang Astro (ví dụ `guides.astro`), bạn sẽ lặp qua danh sách các khóa học và truyền dữ liệu của mỗi khóa học vào component này.

  students: number;        ```astro

  rating: number;        ---

  modules: Module[];        // Lấy danh sách các khóa học

}        const allCourses = await getCollection('guides');

        ---

export interface Module {        <!-- Trong phần HTML -->

  id: string;        <div class="grid">

  title: string;          {allCourses.map(course => (

  duration: string;            <GuideCard

  description: string;              href={`/guides/${course.slug}`}

  lessons: Lesson[];              title={course.data.title}

}              cover={course.data.cover}

              guideType={course.data.guideType}

export interface Lesson {              tags={course.data.tags}

  title: string;            />

  slug: string;          ))}

  duration: string;        </div>

}        ```

    *   **Cách chỉnh sửa/tùy biến:**

export const basicCourse: Course = {        *   **Màu sắc của Badge:** Mở file `GuideCard.astro`, bạn sẽ thấy một đối tượng `typeColors`. Bạn có thể thay đổi các class Tailwind CSS tại đây để đổi màu cho từng loại hướng dẫn.

  id: 'co-ban',            ```javascript

  title: 'Khóa học Anki Cơ bản',            const typeColors = {

  level: 'Cơ bản',              'Cơ bản': 'bg-green-100 text-green-700', // Thay đổi ở đây

  description: 'Khóa học nền tảng về Anki...',              'Nâng cao': 'bg-blue-100 text-blue-700',   // và ở đây

  duration: '3 giờ',            };

  students: 1500,            ```

  rating: 4.9,        *   **Giao diện:** Toàn bộ cấu trúc HTML và các class Tailwind CSS của thẻ nằm trong file này. Bạn có thể chỉnh sửa trực tiếp để thay đổi bố cục, font chữ, hiệu ứng hover, v.v.

  modules: [

    {---

      id: 'module-1',## IX. Nâng cấp và Tùy chỉnh Giao diện (UI/UX)

      title: 'Module 1: Giới thiệu Anki',

      duration: '1 giờ',Phần này hướng dẫn cách bạn có thể nâng cấp và tùy chỉnh giao diện cho các trang Guides, Course và Lesson, tận dụng sức mạnh của Astro và Tailwind CSS.

      description: 'Tìm hiểu về Anki và spaced repetition',

      lessons: [### 1. Nguyên tắc chung khi tùy chỉnh giao diện

        { title: 'Nền móng Anki', slug: 'Lesson-01-nen-mong-anki', duration: '20 phút' },

        { title: 'Làm quen với Anki', slug: 'Lesson-02-lam-quen-anki', duration: '25 phút' },*   **Tailwind CSS**: Hầu hết styling được thực hiện bằng các class Tailwind CSS. Hãy ưu tiên sử dụng chúng.

        { title: 'Tạo thẻ hiệu quả', slug: 'Lesson-03-tao-the-hieu-qua-co-ban', duration: '30 phút' }*   **Astro Components**: Tái sử dụng các component nhỏ (như `GuideCard`) để đảm bảo tính nhất quán và dễ bảo trì.

      ]*   **Slots**: Sử dụng `<slot />` để inject nội dung MDX vào layout mà không cần chỉnh sửa logic hiển thị.

    }*   **Props**: Truyền dữ liệu động vào layout/component thông qua `Astro.props`.

  ]*   **Client-side JS**: Đối với các tính năng tương tác (timers, progress tracking, toggles), sử dụng `<script>` tag trong Astro component/layout.

};

```### 2. Tùy chỉnh Trang chủ Guides (`src/pages/guides.astro`)



## 🎨 Layouts và ComponentsTrang này là nơi tổng hợp các khóa học.



### **CourseLayout.astro***   **Hero Section**:

- Layout chính cho các trang tổng quan khóa học    *   **Màu sắc/Gradient**: Chỉnh sửa `bg-gradient-to-br from-slate-50 via-blue-50/30 to-green-50/20` và các màu sắc trong `bg-gradient-to-br from-blue-500 to-green-500` cho icon.

- Hiển thị hero section, stats bar, modules với accordion    *   **Text**: Thay đổi `h1`, `p` text styles (font size, color, weight).

- Nhận props: `course`, `theme`, `gradients`, `prerequisiteSection`, `nextCourseSection`    *   **Icon**: Thay đổi emoji `📚` hoặc thay thế bằng SVG/image.

*   **Stats Section**:

### **SimpleLessonLayout.astro**    *   **Layout**: Chỉnh sửa `grid grid-cols-1 md:grid-cols-3` để thay đổi bố cục các chỉ số.

- Layout cho các trang bài học    *   **Màu sắc**: Thay đổi `bg-gradient-to-r from-blue-600 to-green-600` cho text gradient.

- Hiển thị navigation (prev/next), progress, nội dung bài học    *   **Card Style**: Chỉnh sửa `bg-white/80 backdrop-blur-sm rounded-3xl p-8 border border-white/40 shadow-xl` cho các thẻ thống kê.

- Nhận props: `title`, `description`, `author`, `date`, `duration`, `level`, `tags`, `prevLesson`, `nextLesson`*   **Learning Paths (Cơ bản/Nâng cao)**:

    *   **Card Style**: Các thẻ này sử dụng các class như `group relative bg-white/80 backdrop-blur-sm border border-green-100 rounded-3xl p-10 hover:bg-green-50`. Bạn có thể thay đổi màu sắc, border, shadow, hiệu ứng hover (`hover:scale-[1.02]`, `group-hover:rotate-3`).

### **BaseLayout.astro**    *   **Background Pattern**: Chỉnh sửa `absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-green-100/50` để thay đổi hình dạng, kích thước, màu sắc của các họa tiết trang trí.

- Layout cơ sở cho toàn bộ site    *   **Icons**: Thay đổi emoji `🌱`, `🚀`.

- Bao gồm header, footer, SEO, analytics

### 3. Tùy chỉnh Layout Tổng quan Khóa học (`src/layouts/CourseLayout.astro`)

## 🔧 Quy trình tạo nội dung mới

Layout này hiển thị trang giới thiệu cho một khóa học cụ thể.

### **Bước 1: Tạo Course Data**

1. Thêm dữ liệu khóa học vào `src/lib/course-data/course-data.ts`*   **Hero Section**:

2. Định nghĩa `modules` và `lessons` với slug phù hợp    *   **Gradient**: Chỉnh sửa `heroGradientClass` được tạo từ `courseGradients.hero` (được định nghĩa trong `src/utils/gradients.ts` và truyền từ `src/pages/guides/co-ban.astro` hoặc `nang-cao.astro`). Bạn có thể thay đổi `from`, `to` colors.

    *   **Text & Buttons**: Thay đổi font size, color, padding, border-radius của `h1`, `p` và các nút "Bắt đầu học ngay", "Xem tất cả khóa học".

### **Bước 2: Tạo Course Page***   **Course Stats**:

1. Tạo file `src/pages/guides/{course-id}.astro`    *   **Styling**: Chỉnh sửa các class Tailwind CSS cho `div` chứa số liệu (`text-2xl font-bold text-${theme.colors.primary}-600`). `theme.colors` được truyền từ trang Astro gọi layout.

2. Import course data và theme*   **Prerequisite/Next Course Sections**:

3. Sử dụng `CourseLayout`    *   **Nội dung**: Các section này được inject HTML thông qua `Fragment set:html={prerequisiteSection.content}`. Để thay đổi nội dung hoặc styling, bạn cần chỉnh sửa chuỗi HTML trong các file `src/pages/guides/co-ban.astro` hoặc `src/pages/guides/nang-cao.astro`.

    *   **Background**: Chỉnh sửa `bg-green-50 border-l-4 border-green-400` cho background và border.

### **Bước 3: Tạo Lesson Pages***   **Modules List**:

1. Tạo thư mục `src/pages/guides/{course-id}/`    *   **Module Header**: `moduleHeaderGradientClass` (từ `src/utils/gradients.ts`) kiểm soát gradient của tiêu đề module.

2. Tạo file `Lesson-{number}-{slug}.astro` cho mỗi lesson    *   **Lesson Links**: Chỉnh sửa `block p-4 hover:bg-gray-50` và các class cho icon, text để thay đổi giao diện từng bài học trong danh sách.

3. Copy course structure để tạo navigation    *   **JavaScript**: Logic thu gọn/mở rộng module nằm trong thẻ `<script>` ở cuối file.

4. Viết nội dung trong slot*   **Styling nội dung MDX**: Nội dung MDX của khóa học được render thông qua `<slot />`. Styling cho các thẻ HTML bên trong (h1, p, ul, etc.) sẽ được kế thừa từ `BaseLayout.astro` hoặc các style global.



### **Bước 4: Cập nhật Navigation**### 4. Tùy chỉnh Layout Bài học Đơn giản (`src/layouts/SimpleLessonLayout.astro`)

1. Thêm link trong `guides.astro` nếu cần

2. Test các liên kết prev/nextLayout này tập trung hiển thị nội dung một bài học.



## 🎯 Best Practices*   **Hero Section**:

    *   **Gradient**: Chỉnh sửa `bg-gradient-to-br from-blue-50 to-purple-50`.

### **Đặt tên file:**    *   **Text & Badges**: Thay đổi `h1`, `p`, `span` cho tiêu đề, mô tả, cấp độ. `levelColors` object định nghĩa màu sắc cho badge cấp độ.

- Course ID: `co-ban`, `nang-cao`, `tips`*   **Meta Info & Tags**:

- Lesson slug: `Lesson-01-nen-mong-anki` (không dùng dấu tiếng Việt)    *   **Icons**: Thay đổi SVG icons.

    *   **Text**: Chỉnh sửa `text-gray-600`, `text-sm`.

### **Cấu trúc dữ liệu:***   **Content Area**:

- Giữ consistency giữa course data và lesson files    *   **Card Style**: `bg-white rounded-xl shadow-lg p-8 md:p-12`.

- Sử dụng TypeScript interfaces để type safety    *   **Markdown Styling**: **QUAN TRỌNG**: Các style cho nội dung Markdown (h1, h2, p, ul, code, blockquote, img, table...) được định nghĩa trong thẻ `<style>` của `SimpleLessonLayout.astro` (ví dụ: `.lesson-content h1 { font-size: 2rem; }`). Bạn có thể chỉnh sửa trực tiếp các quy tắc CSS này để thay đổi giao diện của nội dung bài học.

*   **Navigation Section**:

### **Navigation:**    *   **Gradient**: `bg-gradient-to-r from-blue-50 to-indigo-50`.

- Luôn có prev/next links trong lessons    *   **Buttons**: Chỉnh sửa các class Tailwind CSS cho các nút "Bài trước", "Quay lại khóa học", "Bài tiếp theo" (màu sắc, hover effects, shadow, icons).

- Course structure phải khớp với file names

### 5. Tùy chỉnh Layout Toàn diện (`src/layouts/GuideLayout.astro`)

### **Styling:**

- Sử dụng Tailwind CSS classesLayout này cung cấp trải nghiệm học tập giống LMS với sidebar và nhiều tính năng tương tác.

- Tận dụng theme colors từ course data

- Responsive design cho mobile*   **Course Header**:

    *   **Styling**: Chỉnh sửa `bg-white border-b border-gray-200`, `h1`, `div` cho thông tin khóa học.

## 🚀 Deployment*   **Sidebar**:

    *   **Container**: `bg-white rounded-xl border border-gray-200 shadow-sm sticky top-8`.

- Sử dụng Astro static generation    *   **Progress Bar**: `w-full bg-gray-200 rounded-full h-2`. Gradient của thanh tiến độ là `bg-gradient-to-r from-blue-500 to-purple-500`.

- Tất cả pages được build thành static HTML    *   **Module/Lesson List**: Chỉnh sửa `button.module-toggle`, `a.lesson-link` và các class cho icon, text, màu sắc highlight bài học hiện tại (`bg-blue-50 text-blue-800 font-medium border-blue-500`).

- Deploy lên Cloudflare Pages hoặc bất kỳ static hosting nào</content>    *   **Course Actions**: Các nút "Lưu tiến độ", "Chia sẻ khóa học" (`bg-blue-500`, `bg-gray-100`).

<parameter name="filePath">d:\A Web\ankivn.com\docs\guide-template.md    *   **JavaScript**: Logic tương tác (module toggle, cập nhật tiến độ) nằm trong `<script>` tag.
*   **Lesson Header Navigation (Main Content)**:
    *   **Gradient**: `bg-gradient-to-r from-blue-500 to-purple-600`.
    *   **Progress Bar**: `w-full bg-white/20 rounded-full h-2`.
    *   **Buttons**: Các nút hành động nhanh (bookmark, settings) và điều hướng (prev/next).
    *   **JavaScript**: Logic cho các nút này nằm trong `<script>` tag.
*   **Content Body**:
    *   **Markdown Styling**: **QUAN TRỌNG**: Tương tự `SimpleLessonLayout`, các style cho nội dung Markdown (h1, h2, p, ul, code, blockquote, img, table...) được định nghĩa trong thẻ `<style>` của `GuideLayout.astro` (ví dụ: `.lesson-content h1 { font-size: 2rem; }`). Bạn có thể chỉnh sửa trực tiếp các quy tắc CSS này.
*   **Enhanced Footer Actions**:
    *   **Rating System**: `button.star-rating` và logic JavaScript để thay đổi màu sao.
    *   **Study Time Tracker**: `div#study-timer` và logic JavaScript để cập nhật thời gian.
    *   **Quick Actions**: Các nút "Hoàn thành", "Ghi chú" (`bg-green-100`, `bg-blue-100`) và logic JavaScript.
    *   **Social Actions**: Các nút chia sẻ (`share-btn`) và logic JavaScript.
*   **Interactivity (JavaScript)**: Toàn bộ các tính năng động (module toggle, timer, rating, mark complete, share, bookmark, progress tracking, notifications, keyboard shortcuts) được quản lý trong thẻ `<script>`. Bạn có thể chỉnh sửa các hàm này để thay đổi hành vi hoặc thêm tính năng mới.

### 6. Tùy chỉnh Component GuideCard (`src/components/guides/GuideCard.astro`)

Component này được sử dụng trên trang chủ Guides để hiển thị từng khóa học.

*   **Card Container**: `article` với `group relative bg-white/80 backdrop-blur-sm rounded-3xl border border-white/20 overflow-hidden hover:shadow-2xl hover:border-white/40 transition-all duration-500 hover:-translate-y-2`. Bạn có thể thay đổi màu nền, border, shadow, hiệu ứng hover.
*   **Cover Image**: `img` với `group-hover:scale-110 transition-transform duration-500`.
*   **Guide Type Badge**: `span` với `typeColors[guideType]`. Bạn có thể thay đổi màu sắc của badge bằng cách chỉnh sửa object `typeColors` trong file này.
*   **Title**: `h3` với `group-hover:text-blue-600 transition-colors`.
*   **Tags**: `span` với `bg-gray-100 text-gray-700`.
*   **Read Guide Arrow**: `svg` với `group-hover:translate-x-1`.

### 7. Các lưu ý chung khi chỉnh sửa giao diện

*   **Sử dụng Tailwind CSS**: Ưu tiên các class tiện ích của Tailwind. Nếu cần CSS tùy chỉnh, hãy đặt nó trong thẻ `<style>` của component/layout đó.
*   **Đảm bảo Responsive**: Luôn kiểm tra giao diện trên các kích thước màn hình khác nhau (mobile, tablet, desktop).
*   **Hiệu suất**: Tránh thêm quá nhiều hiệu ứng hoặc JavaScript không cần thiết có thể làm chậm trang. Tối ưu hóa hình ảnh.
*   **Tính nhất quán**: Cố gắng duy trì một phong cách thiết kế nhất quán trên toàn bộ trang web.
*   **Kiểm tra Accessibility**: Đảm bảo các thay đổi giao diện không làm giảm khả năng truy cập của người dùng (ví dụ: đủ độ tương phản màu sắc, `alt text` cho hình ảnh).
*   **Version Control**: Luôn làm việc trên một branch riêng và commit các thay đổi của bạn thường xuyên.

---

## X. Hiểu và Tùy chỉnh CSS Global (`src/styles/global.css`)

File `global.css` là nơi định nghĩa các style nền tảng cho toàn bộ website, bao gồm cả việc định dạng nội dung được render từ các file Markdown/MDX. Hiểu rõ file này là chìa khóa để tùy chỉnh giao diện một cách nhất quán.

### 1. Vai trò và Cấu trúc

*   **Nền tảng Tailwind CSS**: Dòng đầu tiên `@import "tailwindcss";` cho thấy toàn bộ hệ thống sử dụng Tailwind CSS làm nền tảng.
*   **Styles Cơ bản**: Định nghĩa các style mặc định cho `html`, `body` (font chữ, scroll-behavior).
*   **Accessibility**: Cung cấp các style rõ ràng cho trạng thái `:focus-visible` để cải thiện khả năng truy cập cho người dùng bàn phím.
*   **Utilities & Animations**: Chứa các class tiện ích tùy chỉnh như `.line-clamp-*`, `.animate-gradient`, và các animation như `fadeInUp`.
*   **Định dạng Markdown (Quan trọng nhất)**: Phần lớn file này dành để định dạng các thẻ HTML (h1, h2, p, code, pre, ul, ol, table...) được sinh ra từ nội dung Markdown.

### 2. Cách Định dạng Nội dung Markdown Hoạt động

Trong các layout như `SimpleLessonLayout.astro` và `GuideLayout.astro`, nội dung từ file MDX của bạn được đặt bên trong một thẻ `<div>` hoặc `<article>` có class đặc biệt. File `global.css` sử dụng các class này để áp dụng style.

*   **Selector chính**: `.content-article .markdown-content`

Tất cả các quy tắc CSS cho nội dung Markdown trong `global.css` đều bắt đầu bằng selector này. Ví dụ:

```css
/* global.css */
.content-article .markdown-content h1 {
  font-size: 2.25rem !important;
  /* ... các style khác ... */
}

.content-article .markdown-content pre {
  background-color: #1e293b !important;
  /* ... các style khác ... */
}
```

Điều này có nghĩa là, bất cứ khi nào bạn viết Markdown, các thẻ HTML tương ứng sẽ được định dạng theo các quy tắc trong `global.css`, miễn là chúng nằm trong một container có class `.content-article .markdown-content`.

**Lưu ý**: `SimpleLessonLayout.astro` sử dụng cấu trúc này. Tuy nhiên, `GuideLayout.astro` lại định nghĩa style riêng trong thẻ `<style>` của nó cho class `.lesson-content`. Đây là một điểm không nhất quán. Để thống nhất, bạn có thể thay class `.lesson-content` trong `GuideLayout.astro` thành `.content-article` và class con thành `.markdown-content` để nó cũng sử dụng style từ `global.css`.

### 3. Hướng dẫn Tùy chỉnh Giao diện Markdown

Để thay đổi giao diện của các bài học, bạn nên chỉnh sửa trực tiếp trong `src/styles/global.css`.

*   **Thay đổi Font chữ, Cỡ chữ, Màu sắc cho Tiêu đề (`h1` - `h6`):**
    *   Tìm đến các khối `.content-article .markdown-content h1`, `h2`, v.v.
    *   Thay đổi các thuộc tính `font-size`, `font-weight`, `color`, `margin`, `border-bottom`.
    *   Ví dụ, để thay đổi màu của `h2`:
        ```css
        .content-article .markdown-content h2 {
          color: #1d4ed8 !important; /* Thay đổi màu ở đây */
          /* ... */
        }
        ```

*   **Tùy chỉnh Khối Code (`pre` và `code`):**
    *   **Khối code lớn (`pre`):** Tìm `.content-article .markdown-content pre`. Bạn có thể thay đổi `background-color`, `color` (màu chữ), `padding`, `border-radius`, `font-family`.
    *   **Code inline (`code` không nằm trong `pre`):** Tìm `.content-article .markdown-content code:not(pre code)`. Thay đổi `background-color`, `color`, `padding` tại đây.

*   **Tùy chỉnh Danh sách (`ul`, `ol`, `li`):**
    *   File `global.css` có một khu vực `/* ===== OPTIMIZED LIST STYLES ===== */` rất chi tiết.
    *   Bạn có thể thay đổi `list-style-type` (disc, circle, decimal, lower-alpha...).
    *   Màu của dấu đầu dòng (`::marker`) được định nghĩa cho từng cấp độ danh sách. Bạn có thể thay đổi các giá trị `color` tại đây.
        ```css
        /* global.css */
        ul > li::marker {
          color: #1d6aff; /* Thay đổi màu dấu đầu dòng cấp 1 */
        }
        ul ul > li::marker {
          color: #4f46e5; /* Thay đổi màu dấu đầu dòng cấp 2 */
        }
        ```

*   **Tùy chỉnh Trích dẫn (`blockquote`):**
    *   `GuideLayout.astro` và `SimpleLessonLayout.astro` có style riêng cho `blockquote` trong thẻ `<style>` của chúng. Bạn cần chỉnh sửa ở đó.
    *   Để thống nhất, bạn có thể chuyển style của `blockquote` vào `global.css` dưới selector `.content-article .markdown-content blockquote`.

*   **Tùy chỉnh Link (`a`):**
    *   Tìm đến `.markdown-content a`.
    *   Thay đổi `color`, `text-decoration`, `font-weight` và các hiệu ứng `:hover`.

### 4. Lưu ý quan trọng

*   **`!important`**: Rất nhiều quy tắc trong `global.css` sử dụng `!important`. Điều này là để đảm bảo các style này ghi đè lên style mặc định của Tailwind CSS. Khi chỉnh sửa, bạn cũng cần giữ lại `!important` để thay đổi có hiệu lực.
*   **Tính nhất quán**: Việc tập trung styling cho Markdown vào `global.css` giúp tất cả các bài học có giao diện nhất quán, dễ bảo trì và nâng cấp. Hãy cố gắng đưa các style riêng lẻ từ các layout vào file global này.
*   **Responsive**: Các quy tắc `@media (max-width: 768px)` trong file này giúp điều chỉnh font chữ và khoảng cách trên thiết bị di động. Hãy kiểm tra các thay đổi của bạn trên nhiều kích thước màn hình.

---



### 1. Mục đích
Trang này đóng vai trò là trang giới thiệu và mục lục cho một khóa học cụ thể (ví dụ: "Anki Cơ bản"). Nó hiển thị thông tin tổng quan về khóa học, các module và danh sách các bài học bên trong mỗi module.

### 2. Vị trí và Quy tắc đặt tên file
*   **Vị trí:** `src/content/guides/ten-khoa-hoc.mdx`
*   **Quy tắc đặt tên (Slug):**
    *   Sử dụng `kebab-case` (chữ thường, các từ nối bằng dấu gạch ngang).
    *   Không dấu tiếng Việt, không khoảng trắng, không ký tự đặc biệt.
    *   Ví dụ: `anki-co-ban.mdx`, `anki-nang-cao.mdx`.
    *   Slug này sẽ trở thành một phần của URL (ví dụ: `/guides/anki-co-ban`).

### 3. Cấu trúc Frontmatter (Dựa trên `src/content/config.ts`)
Đây là các trường dữ liệu cần có trong khối frontmatter của file MDX Khóa học tổng quan.

#### **Trường BẮT BUỘC**
```yaml
---
title: "Tên Khóa học của bạn" # Ví dụ: "Khóa học Anki Cơ bản"
modules:
  - id: "module-1-gioi-thieu" # ID duy nhất cho module này (kebab-case)
    title: "Module 1: Giới thiệu Anki"
    duration: "1 giờ 15 phút" # Tổng thời lượng của các bài học trong module này
    description: "Tổng quan về Anki và cách nó hoạt động."
    lessons:
      - title: "Làm quen với Anki"
        slug: "lam-quen-anki" # CỰC KỲ QUAN TRỌNG: Phải khớp với filename (slug) của file MDX bài học "lam-quen-anki.mdx"
        duration: "15 phút"
      - title: "Nền móng Anki: Spaced Repetition"
        slug: "nen-mong-anki" # Phải khớp với "nen-mong-anki.mdx"
        duration: "30 phút"
      - title: "Cài đặt và cấu hình cơ bản"
        slug: "cai-dat-cau-hinh-co-ban" # Phải khớp với "cai-dat-cau-hinh-co-ban.mdx"
        duration: "30 phút"
  - id: "module-2-tao-the"
    title: "Module 2: Tạo thẻ hiệu quả"
    duration: "1 giờ 30 phút"
    description: "Hướng dẫn chi tiết cách tạo các loại thẻ khác nhau."
    lessons:
      - title: "Tạo thẻ từ vựng cơ bản"
        slug: "tao-the-tu-vung-co-ban"
        duration: "45 phút"
      - title: "Tạo thẻ Cloze Deletion"
        slug: "tao-the-cloze-deletion"
        duration: "45 phút"
# ... Thêm các module khác nếu có
---
```

#### **Trường KHUYẾN NGHỊ (Tùy chọn)**
Các trường này giúp làm phong phú thêm thông tin hiển thị trên trang Khóa học tổng quan:

```yaml
description: "Mô tả ngắn gọn về khóa học, mục tiêu và đối tượng."
guideType: "Cơ bản" # Hoặc "Nâng cao", "Tips". Dùng để phân loại trên trang chủ Guides.
author: "Tên Giảng viên / AnkiVN Team"
publishDate: "2024-07-20" # Định dạng YYYY-MM-DD hoặc Date object
tags: ["anki", "cơ bản", "học tập", "ghi nhớ"] # Mảng các tag liên quan
cover: "/images/guides/anki-co-ban/cover.webp" # Ảnh bìa cho khóa học
students: 1250 # Số lượng học viên đã tham gia
rating: 4.8 # Đánh giá trung bình (từ 1.0 đến 5.0)
```

### 4. Nội dung MDX (Body)
Phần nội dung chính của file MDX Khóa học tổng quan sẽ hiển thị ở đầu trang khóa học, trước danh sách các module. Bạn có thể sử dụng Markdown để viết phần giới thiệu, mục tiêu khóa học, hoặc bất kỳ thông tin bổ sung nào.

```markdown
# Giới thiệu Khóa học Anki Cơ bản

Chào mừng bạn đến với khóa học Anki Cơ bản! Khóa học này được thiết kế dành cho những người mới bắt đầu sử dụng Anki, hoặc những ai muốn củng cố kiến thức nền tảng về công cụ học tập mạnh mẽ này.

## Bạn sẽ học được gì?
*   Hiểu rõ nguyên lý hoạt động của Anki.
*   Cài đặt và cấu hình Anki lần đầu.
*   Tạo các loại thẻ cơ bản và nâng cao.

Hãy bắt đầu hành trình chinh phục Anki ngay hôm nay!
```

---

## XII. Hướng dẫn tạo Bài học (Lesson MDX)

Một Bài học đơn lẻ là một file MDX trong `src/content/guides/` mà trong frontmatter của nó **không** có định nghĩa cấu trúc `modules`.

### 1. Mục đích
Cung cấp nội dung chi tiết cho một chủ đề cụ thể. Đây là nơi bạn viết toàn bộ bài giảng, hướng dẫn, ví dụ, v.v.

### 2. Vị trí và Quy tắc đặt tên file
*   **Vị trí:** `src/content/guides/ten-bai-hoc.mdx`
*   **Quy tắc đặt tên (Slug):**
    *   Sử dụng `kebab-case` (chữ thường, các từ nối bằng dấu gạch ngang).
    *   Không dấu tiếng Việt, không khoảng trắng, không ký tự đặc biệt.
    *   **CỰC KỲ QUAN TRỌNG:** Tên file này (ví dụ: `lam-quen-anki.mdx`) phải khớp chính xác với `slug` đã khai báo trong mảng `lessons` của Khóa học tổng quan tương ứng.
    *   Ví dụ: `lam-quen-anki.mdx`, `nen-mong-anki.mdx`.
    *   Slug này sẽ trở thành một phần của URL (ví dụ: `/guides/lam-quen-anki`).

### 3. Cấu trúc Frontmatter (Dựa trên `src/content/config.ts`)

#### **Trường BẮT BUỘC**
```yaml
---
title: "Tên Bài học của bạn" # Ví dụ: "Làm quen với Anki"
---
```

#### **Trường KHUYẾN NGHỊ (Tùy chọn)**
Các trường này giúp hiển thị thông tin chi tiết trên trang bài học:

```yaml
description: "Mô tả ngắn gọn về nội dung bài học này."
level: "Cơ bản" # Hoặc "Trung bình", "Nâng cao". Dùng cho badge cấp độ.
duration: "15 phút" # Thời lượng ước tính để hoàn thành bài học
author: "Tên Giảng viên / AnkiVN Team"
publishDate: "2024-07-20" # Ngày cập nhật bài học (YYYY-MM-DD)
tags: ["anki", "bắt đầu", "cài đặt"] # Mảng các tag liên quan
cover: "/images/guides/lam-quen-anki/thumbnail.webp" # Ảnh bìa cho bài học (có thể dùng thumbnail)
```

### 4. Nội dung MDX (Body)
Đây là nơi bạn viết toàn bộ nội dung của bài học. Bạn có thể sử dụng cú pháp Markdown và các component MDX hỗ trợ.

```markdown
# Làm quen với Anki: Bước đầu tiên

Chào mừng bạn đến với bài học đầu tiên! Trong bài này, chúng ta sẽ cùng nhau tìm hiểu Anki là gì, tại sao nó lại hiệu quả, và cách cài đặt Anki trên máy tính của bạn.

## Anki là gì?

Anki là một phần mềm flashcard mã nguồn mở, miễn phí, sử dụng hệ thống lặp lại ngắt quãng (Spaced Repetition System - SRS) để giúp bạn ghi nhớ thông tin hiệu quả.

## Cài đặt Anki

Để bắt đầu, bạn cần tải và cài đặt Anki.

1.  Truy cập trang web chính thức của Anki: [apps.ankiweb.net](https://apps.ankiweb.net/)
2.  Chọn phiên bản phù hợp với hệ điều hành của bạn.
3.  Tải về và làm theo hướng dẫn cài đặt.

> **Mẹo:** Sau khi cài đặt, hãy dành chút thời gian khám phá giao diện Anki.

## Video hướng dẫn cài đặt

import YouTubeEmbed from '@/components/common/YouTubeEmbed.astro';

<YouTubeEmbed videoId="VIDEO_ID_CUA_BAN" title="Hướng dẫn cài đặt Anki" />
```

---

## XIII. Cấu trúc nội dung MDX (Markdown/MDX) và các Component hỗ trợ

Bạn có thể sử dụng cú pháp Markdown tiêu chuẩn để định dạng nội dung của mình.

### 1. Cú pháp Markdown cơ bản

```markdown
# Heading 1 (Chỉ dùng 1 lần cho tiêu đề chính, thường là tự động)
## Heading 2 (Dùng cho các phần lớn trong bài)
### Heading 3 (Dùng cho các phần nhỏ hơn)

Đây là một đoạn văn bản thông thường. Để xuống dòng, hãy để một dòng trống.

**Chữ in đậm** và *chữ in nghiêng*.

- Danh sách không có thứ tự
  - Mục con
- Mục khác

1. Danh sách có thứ tự
2. Mục 2

> Đây là một trích dẫn (blockquote). Rất hữu ích để làm nổi bật một ý quan trọng hoặc một lời khuyên.

`Đây là đoạn code inline.`

```javascript
// Đây là một khối code (code block)
const greeting = "Hello, Anki!";
console.log(greeting);
```

Tạo một đường link: AnkiVN Website

Chèn một hình ảnh: !Mô tả ảnh
```

### 2. Hình ảnh
*   **Vị trí:** Lưu tất cả hình ảnh minh họa vào thư mục `public/images/guides/ten-bai-hoc/` (thay `ten-bai-hoc` bằng slug của bài học).
*   **Đường dẫn:** Luôn bắt đầu bằng `/images/`.
*   **Alt Text:** Luôn cung cấp `alt text` (`Mô tả ảnh`) để cải thiện SEO và khả năng tiếp cận.
*   **Định dạng:** Khuyến nghị `.webp` để tối ưu hiệu suất.

### 3. Nhúng Video YouTube
Để nhúng video YouTube trong Astro page:

```astro
---
// Trong frontmatter
import YouTubeEmbed from '../../../components/common/YouTubeEmbed.astro';
---

## Video minh họa

<YouTubeEmbed videoId="VIDEO_ID_CUA_BAN" title="Tiêu đề video (tùy chọn)" />
```
*   **`videoId`**: Là phần ID duy nhất của video YouTube (ví dụ: `GpFwGoKSs3M` từ URL `https://www.youtube.com/watch?v=GpFwGoKSs3M`).

### 4. Nhúng file PDF từ Google Drive
Để nhúng file PDF từ Google Drive:

```astro
---
// Trong frontmatter
import PDFEmbed from '../../../components/common/PDFEmbed.astro';
---

## Tài liệu tham khảo

<PDFEmbed driveId="GOOGLE_DRIVE_FILE_ID" title="Tiêu đề PDF (tùy chọn)" description="Mô tả ngắn về tài liệu (tùy chọn)" />
```
*   **`driveId`**: Là ID của file trên Google Drive (ví dụ: `1oPwDEQpqa_e8Il8yxvsAE03p4222_CNO` từ URL `https://drive.google.com/file/d/1oPwDEQpqa_e8Il8yxvsAE03p4222_CNO/view`).

### 5. LƯU Ý QUAN TRỌNG về Astro Syntax
*   **Import components:** Luôn import các component cần thiết trong frontmatter
*   **Đường dẫn tương đối:** Sử dụng đường dẫn tương đối từ file hiện tại (ví dụ: `../../../components/`)
*   **Tailwind CSS:** Ưu tiên sử dụng Tailwind classes thay vì inline styles
*   **Đường dẫn ảnh:** Luôn đảm bảo đường dẫn ảnh bắt đầu bằng `/images/` (ví dụ: `/images/guides/my-lesson/image.webp`).

---

## XIV. Workflow tạo nội dung Guides mới

Thực hiện theo các bước sau để tạo một khóa học hoặc bài học mới:

### Bước 1: Lập kế hoạch Khóa học và Bài học
*   **Xác định chủ đề:** Khóa học này sẽ nói về điều gì?
*   **Mục tiêu:** Người học sẽ đạt được gì sau khóa học/bài học này?
*   **Đối tượng:** Ai là người học mục tiêu?
*   **Phác thảo cấu trúc:** Chia khóa học thành các module, và mỗi module thành các bài học. Ghi lại tên và slug dự kiến cho từng bài học.

### Bước 2: Tạo Course page (Trang tổng quan khóa học)
*   Tạo file Astro mới trong `src/pages/guides/` (ví dụ: `nang-cao.astro`).
*   Copy cấu trúc từ `co-ban.astro` và chỉnh sửa:
    - `courseData`: Thông tin khóa học
    - `theme`: Màu sắc và emoji
    - `modules`: Danh sách module và lessons với slug đúng format `Lesson-XX-{slug}`
*   Viết phần giới thiệu chung về khóa học.

### Bước 3: Tạo thư mục cho course và các Lesson pages
*   Tạo thư mục: `mkdir src/pages/guides/{course-name}`
*   Với mỗi lesson, tạo file: `Lesson-XX-{slug}.astro`
*   Copy cấu trúc từ các lesson hiện có và chỉnh sửa:
    - `lessonData`: Thông tin lesson
    - `courseStructure`: Copy từ course page
    - Logic tìm prev/next lesson
    - Nội dung lesson trong `<div class="prose">`

### Bước 4: Kiểm tra lại (Checklist)
Trước khi hoàn tất, hãy kiểm tra kỹ các điểm sau:

*   [ ] **Slug khớp nhau:** Tất cả `slug` trong `modules.lessons` của course page có khớp chính xác với filename của các lesson pages không?
*   [ ] **Navigation hoạt động:** Prev/Next lesson links có hoạt động đúng không?
*   [ ] **Đường dẫn chính xác:** Đường dẫn ảnh, video, PDF đã được kiểm tra?
*   [ ] **Cấu trúc rõ ràng:** Nội dung có được định dạng rõ ràng không?
*   [ ] **Hình ảnh có `alt text`:** Tất cả hình ảnh đều có mô tả?
*   [ ] **Responsive:** Giao diện có hiển thị tốt trên mobile không?

---

## XV. Chỉnh sửa và Bảo trì

### Chỉnh sửa một Khóa học hoặc Bài học
1.  Mở file Astro tương ứng trong `src/pages/guides/`.
2.  Chỉnh sửa nội dung hoặc dữ liệu.
3.  Lưu file và xem lại thay đổi trên môi trường local.

### Thêm/Xóa một Bài học khỏi Khóa học
1.  **Để thêm:**
    *   Tạo file lesson mới: `Lesson-XX-{slug}.astro`
    *   Mở course page và thêm lesson vào `modules.lessons`
    *   Cập nhật logic prev/next trong các lesson liên quan
2.  **Để xóa:**
    *   Xóa file lesson
    *   Xóa lesson khỏi `modules.lessons` trong course page
    *   Cập nhật logic prev/next trong các lesson còn lại

### Thay đổi cấu trúc dữ liệu
Nếu bạn muốn thêm trường dữ liệu mới:
1.  Cập nhật `lessonData` object trong lesson pages
2.  Cập nhật `courseStructure` trong course page
3.  Chỉnh sửa layouts nếu cần hiển thị dữ liệu mới

---

Bằng cách tuân thủ hướng dẫn này, bạn sẽ có thể tạo ra các khóa học và bài học chất lượng cao, có cấu trúc rõ ràng và dễ dàng quản lý trên AnkiVN.