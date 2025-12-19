import { type FC } from 'react';
import { Calendar, User, Tag } from 'lucide-react';
import { Card } from '../../../../shared/ui/Card/Card';
import type { PostDetailProps } from '../../../../shared/lib/types';
import { cn, formatDate } from '../../../../shared/lib/utils';

export const PostDetail: FC<PostDetailProps> = ({
    title,
    content,
    author,
    date,
    tags,
    className
}) => {
    return (
        <article className={cn("max-w-4xl mx-auto", className)}>
            <header className="mb-12 text-center">
                <h1 className="text-4xl md:text-6xl font-black text-primary mb-8 leading-[1.1] tracking-tight font-sora">
                    {title}
                </h1>
                
                <div className="flex flex-wrap items-center justify-center gap-8 text-slate-500 font-medium tracking-wide">
                    <div className="flex items-center gap-2 px-4 py-1.5 bg-slate-50 rounded-full border border-slate-100">
                        <User className="w-4 h-4 text-accent" />
                        <span className="text-sm font-bold text-primary">{author}</span>
                    </div>
                    <div className="flex items-center gap-2 px-4 py-1.5 bg-slate-50 rounded-full border border-slate-100">
                        <Calendar className="w-4 h-4 text-accent" />
                        <span className="text-sm">{formatDate(date)}</span>
                    </div>
                </div>

                {tags && tags.length > 0 && (
                    <div className="flex flex-wrap justify-center gap-2 mt-8">
                        {tags.map((tag) => (
                            <span 
                                key={tag} 
                                className="inline-flex items-center px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest bg-slate-100 text-slate-500 hover:bg-primary hover:text-white transition-all cursor-default"
                            >
                                <Tag className="w-3 h-3 mr-1.5" />
                                {tag}
                            </span>
                        ))}
                    </div>
                )}
            </header>

            <Card className="p-10 md:p-16 border-slate-100 shadow-2xl shadow-slate-200/50 rounded-[2.5rem]">
                <div className="prose prose-slate prose-lg max-w-none">
                    {content.split('\n').filter(p => p.trim()).map((paragraph, index) => (
                        <p key={index} className="mb-8 leading-[1.8] text-slate-700 font-inter text-lg last:mb-0">
                            {paragraph}
                        </p>
                    ))}
                </div>
            </Card>
        </article>
    );
};

export const PostDetailSkeleton: FC = () => {
    return (
        <div className="max-w-4xl mx-auto animate-pulse px-6">
            <header className="mb-12 text-center">
                <div className="h-16 bg-slate-100 rounded-2xl w-3/4 mx-auto mb-10"></div>
                
                <div className="flex flex-wrap items-center justify-center gap-8">
                    <div className="h-8 w-40 bg-slate-50 rounded-full border border-slate-100"></div>
                    <div className="h-8 w-40 bg-slate-50 rounded-full border border-slate-100"></div>
                </div>

                <div className="flex justify-center gap-2 mt-8">
                    <div className="h-4 w-24 bg-slate-50 rounded-xl"></div>
                    <div className="h-4 w-32 bg-slate-50 rounded-xl"></div>
                </div>
            </header>

            <div className="h-[500px] bg-white rounded-[2.5rem] border border-slate-100 shadow-sm p-16">
                <div className="space-y-6">
                    <div className="h-4 bg-slate-50 rounded w-full"></div>
                    <div className="h-4 bg-slate-50 rounded w-full"></div>
                    <div className="h-4 bg-slate-50 rounded w-5/6"></div>
                    <div className="h-4 bg-slate-50 rounded w-full"></div>
                    <div className="h-4 bg-slate-50 rounded w-4/5"></div>
                    <div className="h-40 bg-slate-50/50 rounded-2xl w-full mt-10"></div>
                </div>
            </div>
        </div>
    );
};
