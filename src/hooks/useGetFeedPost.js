import { useEffect, useState } from "react";
import useAuthStore from "../store/authStore";
import usePostStore from "../store/postStore";
import useShowToast from "./useShowToast";
import useUserProfileStore from "../store/userProfileStore";
import { collection, getDocs, query, where } from "firebase/firestore";
import { firestore } from "../firebase/firebase";

const useGetFeedPost = () => {
  const [isLoading, setIsLoading] = useState(false);
  const authUser = useAuthStore((state) => state.user);
  const { posts, setPosts } = usePostStore();
  const showToast = useShowToast();
  const { setUserProfile } = useUserProfileStore();

  useEffect(() => {
    const getFeedPosts = async () => {
      setIsLoading(true);

      if (authUser.following.length === 0) {
        setIsLoading(false);
        setPosts([]);
        return;
      }

      const q = query(
        collection(firestore, "posts"),
        where("createdBy", "in", authUser.following)
      );

      try {
        const queryShot = await getDocs(q);
        const feedPosts = [];

        queryShot.forEach((doc) => {
          feedPosts.push({ id: doc.id, ...doc.data() });
        });
        feedPosts.sort((a, b) => b.createdAt - a.createdAt);
        setPosts(feedPosts);
      } catch (error) {
        showToast("Error", error.message, "error");
      } finally {
        setIsLoading(false);
      }
    };

    if (authUser) getFeedPosts();
  }, [authUser, setUserProfile, setPosts, showToast]);

  return { isLoading, posts };
};

export default useGetFeedPost;
