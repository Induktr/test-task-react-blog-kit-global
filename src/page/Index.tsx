import type { FC } from "react";
import { useNavigate } from "react-router-dom";
import { PlusIcon } from "lucide-react";

import { Header } from "../widget/Header/Header";
import { Button } from "../shared/ui/Button/Button";
import { Input } from "../shared/ui/Input/Input";
import { NotFound } from "../shared/ui/NotFound/NotFound";
import { PostCard } from "../entities/post/ui/PostCard/PostCard";
import { usePost } from "../shared/hooks/usePost";
import { useSearch } from "../shared/store/useSearch";
import { PATHS } from "../shared/config/paths";
import type { Post } from "../shared/lib/types";

export const Index: FC = () => {
  const navigate = useNavigate();
  const { data: posts, error, isLoading } = usePost();
  const { search, setSearch } = useSearch();

  // Integrated Real-time Filtering Logic (Title, Excerpt, Author)
  const filteredPosts = posts?.filter((post: Post) => {
    const query = search.toLowerCase();
    return (
      post.title?.toLowerCase().includes(query) ||
      post.author?.toLowerCase().includes(query) ||
      post.excerpt?.toLowerCase().includes(query)
    );
  }) || [];

  return (
    <div className="min-h-screen bg-[#F1F5F9]/30">
      <Header className="max-w-[1440px] mx-auto px-4 sm:px-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#1B2A41] rounded-xl flex items-center justify-center text-white font-black text-xl shadow-lg">
            RB
          </div>
          <span className="hidden sm:block text-xl font-black text-[#1B2A41] uppercase tracking-tighter font-sora">
            React<span className="text-[#F59E0B]">Blog</span>
          </span>
        </div>

        <div className="hidden md:block flex-1 max-w-xl mx-8">
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search architectural insights..."
            variant="search"
            className="w-full"
          />
        </div>

        <Button
          variant="primary"
          className="rounded-xl shadow-lg shadow-[#1B2A41]/20"
          onClick={() => navigate(PATHS.CREATE)}
        >
          <span className="hidden sm:inline">Create Post</span>
          <PlusIcon className="w-5 h-5 sm:ml-1" />
        </Button>
      </Header>

      <main className="max-w-[1440px] mx-auto px-4 sm:px-8 py-10">
        {/* Mobile Search */}
        <div className="md:hidden mb-8">
          <Input 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search posts..."
            variant="search"
          />
        </div>

        <div className="flex items-center justify-between mb-10 border-b border-slate-200 pb-6">
          <div>
            <h2 className="text-3xl font-extrabold text-[#1B2A41] mb-2 font-sora">
              Industrial Feed
            </h2>
            <p className="text-slate-500 font-medium font-inter">
              {isLoading ? "Fetching latest insights..." : `Discovered ${filteredPosts.length} professional entries`}
            </p>
          </div>
        </div>

        {isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <div key={n} className="h-64 bg-white rounded-2xl animate-pulse border border-slate-100 shadow-sm" />
            ))}
          </div>
        )}

        {error && (
          <NotFound
            type="error"
            message="Structural failure while loading data. Please re-verify connection."
          />
        )}

        {!isLoading && !error && filteredPosts.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post: Post) => (
              <PostCard
                key={post.id}
                id={post.id}
                title={post.title}
                author={post.author}
                date={post.date}
                excerpt={post.excerpt || post.content.slice(0, 150) + "..."}
              />
            ))}
          </div>
        )}

        {!isLoading && !error && filteredPosts.length === 0 && (
          <NotFound
            type="empty"
            message={search ? `No architectural insights found matching "${search}"` : "The archive is currently empty."}
            actionText="Start Building"
            onAction={() => navigate(PATHS.CREATE)}
          />
        )}
      </main>
    </div>
  );
};
