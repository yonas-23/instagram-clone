import { create } from "zustand";

const useUserProfileStore = create((set) => ({
  userProfile: "",
  setUserProfile: (userProfile) => {
    set({ userProfile });
  },
  addPost: (post) =>
    set((state) => ({
      userProfile: {
        ...state.userProfile,
        posts: [...state.userProfile.posts, post.id],
      },
    })),
  deletePost: (postId) =>
    set((state) => ({
      userProfile: {
        ...state.userProfile,
        posts: state.userProfile.posts.filter((id) => id !== postId),
      },
    })),
}));

export default useUserProfileStore;
