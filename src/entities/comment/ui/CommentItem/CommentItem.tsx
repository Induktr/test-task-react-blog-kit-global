import { type FC } from 'react';
import { Card } from '../../../../shared/ui/Card/Card';
import { User, Clock } from 'lucide-react';
import { cn, formatDate } from '../../../../shared/lib/utils';

export interface CommentItemProps {
    author: string;
    text: string;
    timestamp: string | Date;
    className?: string;
}

export const CommentItem: FC<CommentItemProps> = ({ author, text, timestamp, className }) => {
    const initials = author
        .split(' ')
        .map(n => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);

    return (
        <Card className={cn("flex gap-4 p-5 bg-white border border-slate-100 rounded-2xl shadow-sm", className)}>
            <div className="shrink-0">
                <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center border border-slate-200 text-[#1B2A41] font-black text-xs">
                    {initials || "AN"}
                </div>
            </div>
            
            <div className="grow">
                <div className="flex items-center justify-between mb-2">
                    <h4 className="font-bold text-sm text-[#1B2A41] flex items-center gap-1.5">
                        <User size={12} className="text-slate-400" />
                        {author}
                    </h4>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1">
                        <Clock size={10} />
                        {formatDate(timestamp)}
                    </span>
                </div>
                
                <p className="text-sm text-slate-600 leading-relaxed font-medium">
                    {text}
                </p>
            </div>
        </Card>
    );
};

export const CommentItemSkeleton: FC = () => {
    return (
        <div className="flex gap-4 p-5 rounded-2xl bg-white border border-slate-100 animate-pulse">
            <div className="shrink-0">
                <div className="w-10 h-10 rounded-xl bg-slate-100"></div>
            </div>
            
            <div className="grow">
                <div className="flex items-center justify-between mb-3">
                    <div className="h-4 w-32 bg-slate-100 rounded"></div>
                    <div className="h-3 w-20 bg-slate-50 rounded"></div>
                </div>
                
                <div className="space-y-2">
                    <div className="h-3 w-full bg-slate-100 rounded"></div>
                    <div className="h-3 w-4/5 bg-slate-100 rounded"></div>
                </div>
            </div>
        </div>
    );
};
