import type { FC } from 'react';
import { Card } from '../../../../shared/ui/Card/Card';
import { Link } from 'react-router-dom';
import { Calendar, User, ArrowRight } from 'lucide-react';
import { cn, formatDate } from '../../../../shared/lib/utils';
import type { PostCardProps } from '../../../../shared/lib/types';

export const PostCard: FC<PostCardProps> = ({
    id,
    title,
    excerpt,
    author,
    date,
    className,
}) => {
    return (
        <Card 
            className={cn(
                "group flex flex-col h-full bg-white border border-slate-200 rounded-2xl overflow-hidden transition-all duration-300",
                "hover:-translate-y-1 hover:shadow-xl hover:border-b-4 hover:border-b-[#F59E0B]",
                className
            )}
        >
            <div className="p-6 flex flex-col h-full">
                <div className="flex items-center gap-4 text-xs font-semibold uppercase tracking-wider text-[#F59E0B] mb-4">
                    <span>Industrial Blog</span>
                </div>

                <Link to={`/post/${id}`} className="block group/title">
                    <h3 className="text-xl font-bold text-[#1B2A41] leading-snug group-hover/title:text-[#F59E0B] transition-colors line-clamp-2 mb-3">
                        {title}
                    </h3>
                </Link>

                <p className="text-slate-500 text-sm leading-relaxed line-clamp-3 mb-6 flex-grow">
                    {excerpt}
                </p>

                <div className="flex items-center justify-between pt-6 border-t border-slate-100">
                    <div className="flex flex-col gap-1.5">
                        <div className="flex items-center gap-2 text-xs font-medium text-slate-800">
                            <User className="w-3.5 h-3.5 text-slate-400" />
                            <span>{author || "Anonymous"}</span>
                        </div>
                        <div className="flex items-center gap-2 text-[11px] text-slate-400 font-medium">
                            <Calendar className="w-3.5 h-3.5" />
                            <span>{formatDate(date)}</span>
                        </div>
                    </div>
                    
                    <Link 
                        to={`/post/${id}`}
                        className="p-2.5 bg-slate-50 text-[#1B2A41] rounded-xl hover:bg-[#1B2A41] hover:text-white transition-all duration-200"
                    >
                        <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            </div>
        </Card>
    );
};
