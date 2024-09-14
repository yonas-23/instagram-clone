import { deleteDoc, doc } from "firebase/firestore";
import { firestore } from "../firebase/firebase";
import { useEffect, useState } from "react";
import useShowToast from "./useShowToast";

const useDeletePost = () => {
  const showToast = useShowToast();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    const deletePost = async (postId) => {
      try {
        await deleteDoc(doc(firestore, "posts", postId));

        showToast("Success", "Post deleted successfully", "success");
      } catch (error) {
        showToast("Error", error.message, "error");
      } finally {
        setIsLoading(false);
      }
    };

    deletePost();
  }, [showToast]);

  return { isLoading };
};

export default useDeletePost;
