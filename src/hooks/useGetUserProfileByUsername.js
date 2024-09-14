import { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { firestore } from "../firebase/firebase";
import useShowToast from "./useShowToast";
import useUserProfileStore from "../store/userProfileStore";

const useGetUserProfileByUsername = (username) => {
  const [isLoading, setIsLoading] = useState(false);
  const showToast = useShowToast();
  const { userProfile, setUserProfile } = useUserProfileStore();

  useEffect(() => {
    const getUserProfile = async () => {
      setIsLoading(true);
      try {
        const q = query(
          collection(firestore, "users"),
          where("username", "==", username)
        );
        const querySnapShot = await getDocs(q);

        if (querySnapShot.empty) return setUserProfile(null);

        let userDoc;

        querySnapShot.forEach((doc) => {
          userDoc = doc.data();
        });

        setUserProfile(userDoc);
      } catch (error) {
        showToast("Error", error.message, "error");
      } finally {
        setIsLoading(false);
      }
    };
    getUserProfile();
  }, [setUserProfile, showToast, username]);

  return { isLoading, userProfile };
};

export default useGetUserProfileByUsername;
