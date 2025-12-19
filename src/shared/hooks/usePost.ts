import { getDocs, collection, getDoc, doc } from "firebase/firestore";
import { db } from "../services/firebase";
import useSWR from "swr";
import type { Post } from "../lib/types";

export const usePost = () => {
    const fetchPost = async (): Promise<Post[]> => {
      const postSnap = await getDocs(collection(db, "posts"));
      return postSnap.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          date: data.date || data.createdAt || null,
        } as Post;
      });
    };
    return useSWR<Post[]>("posts", fetchPost);
}

export const usePostById = (id: string | undefined) => {
  const fetchSinglePost = async (): Promise<Post | null> => {
    if (!id) return null;
    const docRef = doc(db, "posts", id);
    const docSnap = await getDoc(docRef);
    
    if (!docSnap.exists()) {
      return null;
    }
    
    const data = docSnap.data();
    return {
      id: docSnap.id,
      ...data,
      date: data.date || data.createdAt || null,
    } as Post;
  };

  return useSWR<Post | null>(id ? `post/${id}` : null, fetchSinglePost);
};