import z from 'zod';

export const FirebaseConfigSchema = z.object({
  apiKey: z.string().min(1, 'API Key is required'),
  authDomain: z.string().min(1, 'Auth Domain is required'),
  projectId: z.string().min(1, 'Project ID is required'),
  storageBucket: z.string().min(1, 'Storage Bucket is required'),
  messagingSenderId: z.string().min(1, 'Messaging Sender ID is required'),
  appId: z.string().min(1, 'App ID is required'),
  measurementId: z.string().min(1, 'Measurement ID is required'),
});

export const createPostSchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters'),
  content: z.string().min(10, 'Content must be at least 10 characters'),
  author: z.string().min(2, 'Author name must be at least 2 characters'),
});

export const variantsSchema = z.record(z.string(), z.string());

export const sizesSchema = z.record(z.string(), z.string());

export const postSchema = z.object({
  id: z.string(),
  title: z.string(),
  content: z.string(),
  author: z.string(),
  date: z.string().min(1, 'Date is required'),
  excerpt: z.string().optional(),
  tags: z.array(z.string()).optional(),
});

export const postCardSchema = z.object({
  id: z.string().optional(),
  title: z.string().optional(),
  excerpt: z.string().optional(),
  author: z.string().optional(),
  date: z.string().min(1, 'Date is required').optional(),
  className: z.string().optional(),
});

export const commentSchema = z.object({
  id: z.string(),
  postId: z.string(),
  author: z.string(),
  text: z.string(),
  createdAt: z.string().min(1, 'Date is required'),
});

export const commentFormDataSchema = z.object({
  author: z.string().min(2, 'Name must be at least 2 characters'),
  text: z.string().min(3, 'Comment must be at least 3 characters'),
});
