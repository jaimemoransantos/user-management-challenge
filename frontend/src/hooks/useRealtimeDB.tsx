import { useEffect, useState } from "react";
import { database } from "../lib/firebase";
import { ref, onValue, off } from "firebase/database";
import type { User } from "../types/User";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../store";
import { setUsers } from "../store/userSlice";

const useRealtimeDB = (entryPoint: string) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const dispatch = useDispatch();
  const users = useSelector((state: RootState) => state.users);

  useEffect(() => {
    const usersRef = ref(database, entryPoint);

    onValue(
      usersRef,
      async (snapshot) => {
        const data = snapshot.val();
        if (!data) {
          dispatch(setUsers([]));
          setLoading(false);
          return;
        }
        const parsedUsers = Object.entries(data).map(
          ([key, value]: [string, any]) => ({
            id: key,
            ...value,
          })
        );
        dispatch(setUsers(parsedUsers as User[]));
        setLoading(false);
      },
      (error) => {
        setError(error.message);
        setLoading(false);
      }
    );

    return () => off(usersRef);
  }, [entryPoint, dispatch]);

  return { users, loading, error };
};

export default useRealtimeDB;
