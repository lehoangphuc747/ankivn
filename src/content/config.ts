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
    category: categoryEnum,
    subCategory: subCategoryEnum.optional(),
    size: z.number(),
    date: z.string(),
    author: z.string().optional(),
    authorLink: z.string().url().optional(),
    tags: z.array(z.string()).default([]),
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
    tags: z.array(z.string()).default([]),
    guideType: z.enum(['Cơ bản','Nâng cao','Tips']),
    cover: z.string().optional()
  })
});

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.string(),
    tags: z.array(z.string()).default([]),
    summary: z.string().optional(),
    cover: z.string().optional()
  })
});

export const collections = { decks, guides, blog };
