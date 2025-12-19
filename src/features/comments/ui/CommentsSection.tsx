import type { FC } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import useSWR, { useSWRConfig } from "swr";
import { 
  collection, 
  query, 
  getDocs, 
  addDoc, 
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../../../shared/services/firebase";
import { commentFormDataSchema } from "../../../shared/config/schema";
import type { Comment, CommentFormData } from "../../../shared/lib/types";
import { CommentItem, CommentItemSkeleton } from "../../../entities/comment/ui/CommentItem/CommentItem";
import { Button } from "../../../shared/ui/Button/Button";
import { Input } from "../../../shared/ui/Input/Input";
import { MessageSquare, Send } from "lucide-react";

interface CommentsSectionProps {
  postId: string;
}

export const CommentsSection: FC<CommentsSectionProps> = ({ postId }) => {
  const { mutate } = useSWRConfig();
  
  const fetchComments = async (id: string): Promise<Comment[]> => {
    try {
      console.log("Attempting to fetch comments for postId:", id);
      const q = query(collection(db, "comments"));
      const querySnapshot = await getDocs(q);
      
      const allComments = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Comment[];

      console.log("Successfully fetched all comments:", allComments);
      
      return allComments.filter(c => c.postId === id);
    } catch (err) {
      console.error("CRITICAL FIREBASE ERROR:", err);
      throw err;
    }
  };

  const { data: comments, isLoading, error } = useSWR<Comment[]>(
    postId ? `comments/${postId}` : null,
    () => fetchComments(postId)
  );

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CommentFormData>({
    resolver: zodResolver(commentFormDataSchema),
  });

  const onSubmit = async (data: CommentFormData) => {
    try {
      await addDoc(collection(db, "comments"), {
        postId,
        author: data.author,
        text: data.text,
        createdAt: serverTimestamp(),
      });
      reset();
      mutate(`comments/${postId}`);
    } catch (err) {
      if (err instanceof Error) {
        console.error("Error adding comment: ", err.message);
      }
      alert("Failed to post comment. Please try again.");
    }
  };

  return (
    <div className="mt-16 pt-12 border-t border-slate-100">
      <div className="flex items-center gap-3 mb-10">
        <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center text-amber-500">
          <MessageSquare size={20} />
        </div>
        <div>
          <h3 className="text-xl font-black text-[#1B2A41]">Discussions</h3>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
            {comments?.length || 0} Responses
          </p>
        </div>
      </div>

      <form 
        onSubmit={handleSubmit(onSubmit)} 
        className="bg-slate-50 rounded-2xl p-6 mb-12 border border-slate-100 shadow-sm"
      >
        <div className="grid grid-cols-1 gap-4 mb-4">
          <div>
            <Input
              {...register("author")}
              placeholder="Your Name"
              className={errors.author ? "border-rose-500" : ""}
            />
            {errors.author && (
              <span className="text-[10px] text-rose-500 font-bold uppercase mt-1 block px-1">
                {errors.author.message}
              </span>
            )}
          </div>
          <div>
            <textarea
              {...register("text")}
              placeholder="Join the discussion..."
              className={`w-full bg-white border border-slate-200 text-slate-900 text-sm rounded-xl p-4 min-h-[100px] focus:ring-4 focus:ring-amber-500/10 focus:border-amber-500 outline-none transition-all resize-none font-medium placeholder:text-slate-400 ${
                errors.text ? "border-rose-500" : ""
              }`}
            />
            {errors.text && (
              <span className="text-[10px] text-rose-500 font-bold uppercase mt-1 block px-1">
                {errors.text.message}
              </span>
            )}
          </div>
        </div>
        <div className="flex justify-end">
          <Button
            type="submit"
            variant="secondary"
            disabled={isSubmitting}
            className="rounded-xl px-8"
          >
            {isSubmitting ? "Posting..." : (
              <>
                Post Comment
                <Send size={16} className="ml-2" />
              </>
            )}
          </Button>
        </div>
      </form>

      <div className="space-y-6">
        {isLoading ? (
          Array.from({ length: 3 }).map((_, i) => <CommentItemSkeleton key={i} />)
        ) : error ? (
          <div className="text-center py-10 text-rose-500 font-bold uppercase text-xs tracking-widest bg-rose-50 rounded-2xl border border-rose-100">
            Error loading comments
          </div>
        ) : comments?.length === 0 ? (
          <div className="text-center py-12 px-6 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
            <p className="text-slate-400 font-bold text-sm">
              No comments yet. Be the first!
            </p>
          </div>
        ) : (
          comments?.map((comment) => (
            <CommentItem
              key={comment.id}
              author={comment.author}
              text={comment.text}
              timestamp={comment.createdAt}
            />
          ))
        )}
      </div>
    </div>
  );
};
