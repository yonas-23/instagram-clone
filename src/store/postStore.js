import { create } from "zustand";

const usePostStore = create((set) => ({
  posts: [],
  createPost: (post) => set((state) => ({ posts: [...state.posts, post] })),
  deletePost: (postId) =>
    set((state) => ({ posts: state.posts.filter((p) => p.id !== postId) })),
  // addComments
  setPosts: (posts) => set({ posts }),
  addComment: (postId, comment) =>
    set((state) => ({
      posts: state.posts.map((post) => {
        if (post.id === postId) {
          return {
            ...post,
            comments: [...post.comments, comment],
          };
        }
        return post;
      }),
    })),
}));

export default usePostStore;
