import { useEffect, useState } from "react";
import { database } from "../lib/firebase";
import { ref, onValue, off } from "firebase/database";
import type { User } from "../types/User";

const useRealtimeDB = (entryPoint: string) => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const usersRef = ref(database, entryPoint);

    onValue(
      usersRef,
      async (snapshot) => {
        const data = snapshot.val();
        if (!data) {
          setUsers([]);
          setLoading(false);
          return;
        }
        const parsedUsers = Object.entries(data).map(
          ([key, value]: [string, any]) => ({
            id: key,
            ...value,
          })
        );
        setUsers(parsedUsers as User[]);
        setLoading(false);
      },
      (error) => {
        setError(error.message);
        setLoading(false);
      }
    );

    return () => off(usersRef);
  }, [entryPoint]);

  return { users, loading, error };
};

export default useRealtimeDB;
