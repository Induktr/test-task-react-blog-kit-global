import type { FC } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { ArrowLeft, Calendar, User, Clock, Share2, Bookmark, Trash2, Edit3 } from "lucide-react";
import { usePostById } from "../shared/hooks/usePost";
import { Loader } from "../shared/ui/Loader/Loader";
import { NotFound } from "../shared/ui/NotFound/NotFound";
import { Button } from "../shared/ui/Button/Button";
import { PATHS } from "../shared/config/paths";
import { formatDate } from "../shared/lib/utils";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../shared/services/firebase";
import type { Post as PostType } from "../shared/lib/types";

export const Post: FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data, error, isLoading } = usePostById(id);
  const post = data as PostType | null;

  const handleDelete = async () => {
    if (!id) return;
    if (!window.confirm("Are you sure you want to decommission this architectural document? This action is irreversible.")) return;
    
    try {
      await deleteDoc(doc(db, "posts", id));
      navigate(PATHS.INDEX);
    } catch {
      alert("Failed to delete the post. Please try again.");
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white">
        <Loader size={64} />
      </div>
    );
  }

  if (error || !post) {
    return (
      <NotFound
        type={error ? "error" : "page"}
        message={error ? "Critical error retrieving post document." : "Specified architectural document not found."}
      />
    );
  }

  return (
    <div className="min-h-screen bg-white pb-24">
      <nav className="sticky top-0 z-50 glass-header px-6 py-4 mb-12">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <button
            onClick={() => navigate(PATHS.INDEX)}
            className="group flex items-center text-sm font-bold text-[#1B2A41] hover:text-[#F59E0B] transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2 transition-transform group-hover:-translate-x-1" />
            <span className="hidden sm:inline uppercase tracking-widest text-xs">Back to Archives</span>
          </button>
          
          <div className="flex items-center gap-6">
            <Link 
              to={PATHS.EDIT.replace(':id', id || '')}
              className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-400 hover:text-emerald-600 transition-colors"
            >
              <Edit3 size={18} />
              <span className="hidden sm:inline">Modify</span>
            </Link>
            <button 
              onClick={handleDelete}
              className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-400 hover:text-rose-600 transition-colors"
            >
              <Trash2 size={18} />
              <span className="hidden sm:inline">Decommission</span>
            </button>
            <div className="w-px h-6 bg-slate-100 hidden sm:block"></div>
            <button className="p-2 text-slate-400 hover:text-[#1B2A41] transition-colors"><Share2 size={20} /></button>
            <button className="p-2 text-slate-400 hover:text-[#1B2A41] transition-colors"><Bookmark size={20} /></button>
          </div>
        </div>
      </nav>

      <article className="max-w-3xl mx-auto px-6">
        <header className="mb-16">
          <div className="flex items-center gap-3 text-[#F59E0B] font-bold uppercase tracking-[0.2em] text-[10px] mb-6">
            <span className="w-8 h-px bg-[#F59E0B]"></span>
            <span>Technical Report</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black text-[#1B2A41] leading-[1.1] tracking-tight mb-10 font-sora">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-y-4 gap-x-8 pt-8 border-t border-slate-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-[#1B2A41]">
                <User size={20} />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">Contributor</span>
                <span className="text-sm font-bold text-[#1B2A41]">{post.author || "Induktr"}</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400">
                <Calendar size={20} />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">Published</span>
                <span className="text-sm font-semibold text-slate-600">{formatDate(post.date)}</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400">
                <Clock size={20} />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">Read-time</span>
                <span className="text-sm font-semibold text-slate-600">4 min</span>
              </div>
            </div>
          </div>
        </header>

        <section className="prose prose-slate max-w-none">
          <div className="text-slate-700 text-lg leading-[1.8] font-inter space-y-8">
            {post.content && post.content.split('\n').filter((p: string) => p.trim()).map((paragraph: string, idx: number) => (
              <p key={idx} className="first-letter:text-5xl first-letter:font-black first-letter:text-[#1B2A41] first-letter:mr-3 first-letter:float-left first-letter:leading-none">
                {paragraph}
              </p>
            ))}
          </div>
        </section>

        <footer className="mt-20 pt-10 border-t-4 border-[#1B2A41]">
          <div className="bg-slate-50 rounded-3xl p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <h4 className="font-bold text-[#1B2A41] mb-1">Found this insight valuable?</h4>
              <p className="text-slate-500 text-sm">Join the industrial blog network for more technical depth.</p>
            </div>
            <Button 
                variant="primary" 
                onClick={() => navigate(PATHS.INDEX)}
                className="rounded-xl shadow-xl shadow-[#1B2A41]/20 whitespace-nowrap"
            >
              Back to Fleet
            </Button>
          </div>
        </footer>
      </article>
    </div>
  );
};