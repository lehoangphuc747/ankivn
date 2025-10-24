export interface Lesson {
  title: string;
  slug: string;
  duration: string;
}

export interface Module {
  id: string;
  title: string;
  duration: string;
  description: string;
  lessons: Lesson[];
}

export interface Course {
  id: string;
  title: string;
  level: string;
  description: string;
  duration: string;
  students: number;
  rating: number;
  modules: Module[];
}

export const basicCourse: Course = {
  id: 'co-ban',
  title: 'Khóa học Anki Cơ bản',
  level: 'Cơ bản',
  description: 'Nắm vững các nguyên tắc khoa học về trí nhớ và cách sử dụng Anki để học tập hiệu quả, từ cơ bản đến các kỹ thuật nâng cao.',
  duration: '5 giờ', // Tổng cộng: 285 phút = 4 giờ 45 phút, làm tròn 5 giờ
  students: 5420,
  rating: 4.8,
  modules: [
    {
      id: 'module-1',
      title: 'Module 01. Nền Tảng Ghi Nhớ Siêu Việt: Tại Sao Chúng Ta Quên và Làm Cách Nào Để Chống Lại?',
      duration: '35 phút', // 15 + 20
      description: 'Nền tảng của mọi nỗ lực học tập hiệu quả đều bắt nguồn từ việc thấu hiểu một kẻ thù chung, phổ quát và không ngừng nghỉ: sự lãng quên.',
      lessons: [
        { title: 'Diễn giải Đường cong Lãng quên của Ebbinghaus', slug: 'Lesson-01-duong-cong-lang-quen-ebbinghaus', duration: '15 phút' },
        { title: 'Spaced Repetition (SRS) - Giải pháp "Vá Lỗ Hổng"', slug: 'Lesson-02-spaced-repetition-srs-giai-phap-va-lo-hong', duration: '20 phút' }
      ]
    },
    {
      id: 'module-2',
      title: 'Module 02. Kích Hoạt Sức Mạnh Não Bộ: Học Chủ Động với Active Recall',
      duration: '75 phút', // 25 + 20 + 30
      description: 'Sau khi đã xác định được khi nào nên ôn tập thông qua Spaced Repetition, câu hỏi tiếp theo và cũng quan trọng không kém là làm thế nào để ôn tập một cách hiệu quả nhất.',
      lessons: [
        { title: 'Định nghĩa Active Recall - Sự khác biệt giữa Nhận dạng và Gợi nhớ', slug: 'Lesson-03-dinh-nghia-active-recall', duration: '25 phút' },
        { title: 'Cơ sở Khoa học: "Testing Effect" và "Generation Effect"', slug: 'Lesson-04-co-so-khoa-hoc-active-recall', duration: '20 phút' },
        { title: 'Các Kỹ thuật Active Recall Thực tế', slug: 'Lesson-05-cac-ky-thuat-active-recall', duration: '30 phút' }
      ]
    },
    {
      id: 'module-3',
      title: 'Module 03. Anki - Phòng Tập Gym Tối Ưu cho Trí Nhớ',
      duration: '60 phút', // 15 + 25 + 20
      description: 'Nếu Spaced Repetition và Active Recall là các nguyên tắc khoa học nền tảng cho việc học hiệu quả, thì Anki chính là công cụ mạnh mẽ nhất để hiện thực hóa các nguyên tắc đó một cách có hệ thống.',
      lessons: [
        { title: 'Anki là gì? Triết lý cốt lõi', slug: 'Lesson-06-anki-la-gi-triet-ly-cot-loi', duration: '15 phút' },
        { title: 'Tại sao Anki là lựa chọn cho người học chuyên sâu?', slug: 'Lesson-07-tai-sao-anki-cho-nguoi-hoc-chuyen-sau', duration: '25 phút' },
        { title: 'So sánh Anki với các lựa chọn khác (Quizlet, Memrise)', slug: 'Lesson-08-so-sanh-anki-quizlet-memrise', duration: '20 phút' }
      ]
    },
    {
      id: 'module-4',
      title: 'Module 04. FSRS - Bộ Não Thông Minh Đằng Sau Anki',
      duration: '65 phút', // 15 + 30 + 20
      description: 'Trong nhiều năm, Anki đã là công cụ hàng đầu cho những người học chuyên sâu nhờ vào khả năng tùy biến và hệ sinh thái add-on mạnh mẽ. Tuy nhiên, một cuộc cách mạng thực sự đã diễn ra gần đây với sự tích hợp của một thuật toán lặp lại ngắt quãng mới có tên là FSRS.',
      lessons: [
        { title: 'SM-2: Thuật toán Mặc định "Tốt nhưng Chưa Đủ"', slug: 'Lesson-09-sm2-thuat-toan-mac-dinh', duration: '15 phút' },
        { title: 'FSRS (Free Spaced Repetition Scheduler) - Một Cuộc Cách Mạng', slug: 'Lesson-10-fsrs-mot-cuoc-cach-mang', duration: '30 phút' },
        { title: 'So sánh trực tiếp FSRS vs. SM-2', slug: 'Lesson-11-so-sanh-fsrs-vs-sm2', duration: '20 phút' }
      ]
    },
    {
      id: 'module-5',
      title: 'Module 05. Minh Chứng Thực Tế: Những Câu Chuyện Thành Công với Anki',
      duration: '50 phút', // 15 + 15 + 20
      description: 'Lý thuyết về khoa học nhận thức và các thuật toán phức tạp sẽ trở nên vô nghĩa nếu chúng không tạo ra kết quả thực tế. Sức mạnh thực sự của hệ thống Anki-FSRS được minh chứng rõ ràng nhất qua vô số câu chuyện thành công.',
      lessons: [
        { title: 'Case Study 1: Vượt qua các Kỳ thi Cam go (USMLE Step 1/2, Board Exams)', slug: 'Lesson-12-case-study-ky-thi-cam-go', duration: '15 phút' },
        { title: 'Case Study 2: Cải thiện Điểm số và Hiệu quả Học tập Rõ rệt', slug: 'Lesson-13-case-study-cai-thien-diem-so', duration: '15 phút' },
        { title: 'Case Study 3: Học tập Bền vững và Xây dựng Kiến thức Nền tảng', slug: 'Lesson-14-case-study-hoc-tap-ben-vung', duration: '20 phút' }
      ]
    }
  ]
};