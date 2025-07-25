import { useState, useEffect } from "react";
import type { User } from "../types/User";
import { formatUtcOffset } from "../utils/formatUtcOffset";

const UsersList = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(
          "http://localhost:5001/user-management-challenge/us-central1/api/users"
        );
        console.log("response", response);
        const data = await response.json();
        setUsers(data.users);
        setLoading(false);
      } catch (error) {
        setError(
          error instanceof Error ? error.message : "Unknown error occurred"
        );
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  return (
    <>
      <div className="bg-white ">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          User Management System
        </h1>
        <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
          <li>
            Click on a user <strong>on the map</strong> to see their details
          </li>
          <li>
            Click on a user <strong>on the list</strong> to edit their data
          </li>
        </ul>
      </div>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <div className="flex flex-col gap-2 overflow-y-auto">
        {users.map((user: User) => (
          <div
            key={user.id}
            className="flex border p-2 border-gray-200 rounded-lg hover:bg-gray-100 cursor-pointer"
          >
            <div className="flex gap-2 w-full justify-between">
              <div className="flex flex-col justify-between">
                <p>{user.name}</p>
                <p>Zip Code: {user.zipCode}</p>
              </div>
              <div className="flex flex-col gap-2 justify-between">
                <p className="self-end">{formatUtcOffset(user.timezone)}</p>
                <p className="self-end">
                  {user.latitude},{user.longitude}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default UsersList;
