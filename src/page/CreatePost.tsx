import { type FC } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import {
    ArrowLeft,
    Send,
    User,
    Type,
    FileText,
} from 'lucide-react';

import { createPostSchema } from '../shared/config/schema';
import { type CreatePostFormData } from '../shared/lib/types';

import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../shared/services/firebase';
import { Button } from '../shared/ui/Button/Button';
import { cn } from '../shared/lib/utils';
import { PATHS } from '../shared/config/paths';
import { useIsSubmitting } from '../shared/store/useIsSubmitting';

export const CreatePost: FC = () => {
    const { isSubmitting, setIsSubmitting } = useIsSubmitting();
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<CreatePostFormData>({
        resolver: zodResolver(createPostSchema),
    });

    const onSubmit = async (data: CreatePostFormData) => {
        setIsSubmitting(true);
        try {
            await addDoc(collection(db, 'posts'), {
                ...data,
                date: new Date().toISOString(), // Use ISO string for consistency, Firestore serverTimestamp also works but string is easier for local formatting
                createdAt: serverTimestamp(),
            });
            navigate(PATHS.INDEX);
        } catch {
            alert("Structural failure: Unable to publish post. Please re-verify data integrity.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 py-16 px-4">
            <div className="max-w-xl mx-auto">
                <button
                    onClick={() => navigate(PATHS.INDEX)}
                    className="group flex items-center text-sm font-bold text-[#1B2A41] hover:text-[#F59E0B] transition-colors mb-10"
                >
                    <ArrowLeft className="w-5 h-5 mr-2 transition-transform group-hover:-translate-x-1" />
                    Back to Feed
                </button>

                <div className="bg-white rounded-[2rem] shadow-xl shadow-slate-200/50 border border-slate-100 p-8 sm:p-12">
                    <div className="mb-12">
                        <h1 className="text-3xl font-black text-[#1B2A41] mb-2 font-sora">Create New Post</h1>
                        <p className="text-slate-500 font-medium font-inter italic">Submit a technical report to the industrial blog archives.</p>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                        <div>
                            <label className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-[#1B2A41] mb-3">
                                <Type size={14} className="text-[#F59E0B]" />
                                Report Title
                            </label>
                            <input
                                {...register('title')}
                                disabled={isSubmitting}
                                className={cn(
                                    "w-full bg-slate-50 border border-slate-200 text-[#1B2A41] text-sm font-bold rounded-xl px-5 py-4 outline-none transition-all",
                                    "focus:bg-white focus:ring-4 focus:ring-amber-500/10 focus:border-[#F59E0B]",
                                    errors.title && "border-rose-500 bg-rose-50 focus:ring-rose-500/10 focus:border-rose-500"
                                )}
                                placeholder="E.g., Infrastructure Development Trends 2025"
                            />
                            {errors.title && (
                                <p className="mt-2 text-[10px] font-bold text-rose-500 uppercase tracking-wider pl-1">
                                    {errors.title.message}
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-[#1B2A41] mb-3">
                                <User size={14} className="text-[#F59E0B]" />
                                Lead Contributor
                            </label>
                            <input
                                {...register('author')}
                                disabled={isSubmitting}
                                className={cn(
                                    "w-full bg-slate-50 border border-slate-200 text-[#1B2A41] text-sm font-bold rounded-xl px-5 py-4 outline-none transition-all",
                                    "focus:bg-white focus:ring-4 focus:ring-amber-500/10 focus:border-[#F59E0B]",
                                    errors.author && "border-rose-500 bg-rose-50 focus:ring-rose-500/10 focus:border-rose-500"
                                )}
                                placeholder="Your professional name"
                            />
                            {errors.author && (
                                <p className="mt-2 text-[10px] font-bold text-rose-500 uppercase tracking-wider pl-1">
                                    {errors.author.message}
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-[#1B2A41] mb-3">
                                <FileText size={14} className="text-[#F59E0B]" />
                                Report Content
                            </label>
                            <textarea
                                {...register('content')}
                                rows={8}
                                disabled={isSubmitting}
                                className={cn(
                                    "w-full bg-slate-50 border border-slate-200 text-[#1B2A41] text-sm font-medium rounded-xl px-5 py-4 outline-none transition-all resize-none",
                                    "focus:bg-white focus:ring-4 focus:ring-amber-500/10 focus:border-[#F59E0B]",
                                    errors.content && "border-rose-500 bg-rose-50 focus:ring-rose-500/10 focus:border-rose-500"
                                )}
                                placeholder="Describe the technical specifications and insights..."
                            />
                            {errors.content && (
                                <p className="mt-2 text-[10px] font-bold text-rose-500 uppercase tracking-wider pl-1">
                                    {errors.content.message}
                                </p>
                            )}
                        </div>

                        <Button
                            type="submit"
                            disabled={isSubmitting}
                            variant="primary"
                            fullWidth
                            className="h-14 rounded-2xl text-base shadow-xl shadow-[#1B2A41]/20 font-black uppercase tracking-widest"
                        >
                            {isSubmitting ? (
                                <div className="flex items-center gap-3">
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    Publishing...
                                </div>
                            ) : (
                                <div className="flex items-center gap-2">
                                    <Send size={18} />
                                    Publish Report
                                </div>
                            )}
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    );
};