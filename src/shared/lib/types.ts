import type { ButtonHTMLAttributes } from 'react';
import z from 'zod';
import {
    commentFormDataSchema,
    commentSchema,
    createPostSchema,
    FirebaseConfigSchema,
    postCardSchema,
    postSchema,
    sizesSchema,
    variantsSchema,
} from '../config/schema';

export type FirebaseConfig = z.infer<typeof FirebaseConfigSchema>;

export type CreatePostFormData = z.infer<typeof createPostSchema>;

export type Variants = z.infer<typeof variantsSchema>;

export type Sizes = z.infer<typeof sizesSchema>;

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: "default" | "primary" | "secondary" | "success" | "error" | "icon" | "ghost";
    size?: "default" | "sm" | "lg";
    className?: string;
    fullWidth?: boolean;
}

export type Post = z.infer<typeof postSchema>;

export type PostCardProps = z.infer<typeof postCardSchema>;

export interface PostDetailProps {
    id?: string;
    title: string;
    content: string;
    author: string;
    date: Date;
    excerpt?: string;
    tags?: string[];
    className?: string;
}

export type CommentFormData = z.infer<typeof commentFormDataSchema>;

export type Comment = z.infer<typeof commentSchema>;

