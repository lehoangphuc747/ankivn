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
  description: 'Học cách sử dụng Anki từ những bước đầu tiên. Khóa học này sẽ giúp bạn nắm vững các tính năng cơ bản và bắt đầu hành trình học tập hiệu quả.',
  duration: '6 giờ',
  students: 5420,
  rating: 4.8,
  modules: [
    {
      id: 'module-1',
      title: 'Module 1: Nền móng Anki',
      duration: '45 phút',
      description: 'Hiểu bản chất ghi nhớ và tại sao Anki hiệu quả',
      lessons: [
        { title: 'Nền móng Anki - Hiểu bản chất của việc ghi nhớ', slug: 'Lesson-01-nen-mong-anki', duration: '45 phút' }
      ]
    },
    {
      id: 'module-2',
      title: 'Module 2: Làm quen với Anki',
      duration: '60 phút',
      description: 'Từ tải về đến tạo deck và thẻ đầu tiên',
      lessons: [
        { title: 'Làm quen với Anki', slug: 'Lesson-02-lam-quen-anki', duration: '60 phút' }
      ]
    },
    {
      id: 'module-3',
      title: 'Module 3: Tạo thẻ hiệu quả cơ bản',
      duration: '75 phút',
      description: 'Nguyên tắc vàng và kỹ thuật tạo thẻ chất lượng',
      lessons: [
        { title: 'Tạo thẻ hiệu quả cơ bản', slug: 'Lesson-03-tao-the-hieu-qua-co-ban', duration: '75 phút' }
      ]
    }
  ]
};