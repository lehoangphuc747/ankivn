import { z, defineCollection } from 'astro:content';

const categoryEnum = z.enum([
  'Tất cả','Ngoại ngữ','Giáo dục','Chuyên ngành','Y Dược','Mẫu thẻ','Add-ons','Khác'
]);

const subCategoryEnum = z.enum([
  // Ngoại ngữ
  'Tiếng Anh','Tiếng Nhật','Tiếng Trung','Tiếng Hàn','Tiếng Pháp','Tiếng Đức','Tiếng Nga',
  // Giáo dục
  'THCS','THPT','Đại học',
  // Chuyên ngành
  'Công nghệ thông tin','Kinh tế'
]);

const previewKindEnum = z.enum(['front','back','config','overview','other']);

const decks = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    slug: z.string().optional(),
    category: categoryEnum,
    subCategory: subCategoryEnum.optional(),
    date: z.string(),
    author: z.string().optional(),
    authorLink: z.string().url().optional(),
    tags: z.array(z.string()).default([]),
    description: z.string().optional(),
    cover: z.string().optional(),
    previews: z.array(z.object({
      src: z.string(),
      alt: z.string().optional(),
      caption: z.string().optional(),
      credit: z.string().optional(),
      kind: previewKindEnum.optional(),
      priority: z.number().optional(),
    })).optional(),
    previewImages: z.array(z.object({
      src: z.string(),
      alt: z.string(),
    })).optional(),
    downloads: z.array(z.object({
      name: z.string(),
      url: z.string().url(),
      description: z.string().optional(),
      type: z.enum(['author', 'ankivn', 'gdrive', 'onedrive', 'r2', 'firebase', 'other']).optional()
    })).min(1)
  })
});

const guides = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    level: z.string().optional(),
    duration: z.string().optional(),
    category: z.string().optional(),
    author: z.string().optional(),
    publishDate: z.union([z.date(), z.string()]).optional(),
    tags: z.array(z.string()).default([]),
    thumbnail: z.string().optional(),
    guideType: z.enum(['Cơ bản','Nâng cao','Tips']).optional(),
    cover: z.string().optional(),
    students: z.number().optional(),
    rating: z.number().optional(),
    modules: z.array(z.object({
      id: z.string(),
      title: z.string(),
      duration: z.string(),
      description: z.string(),
      lessons: z.array(z.object({
        title: z.string(),
        slug: z.string(),
        duration: z.string()
      }))
    })).optional()
  })
});

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.string(),
    author: z.string().optional(),
    tags: z.array(z.string()).default([]),
    summary: z.string().optional(),
    cover: z.string().optional(),
    source: z.string().optional()
  })
});

export const collections = { decks, guides, blog };
