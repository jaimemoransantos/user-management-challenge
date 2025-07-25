import { useState, useEffect } from "react";
import type { User } from "../types/User";
import ListItem from "./ui/ListItem";
import EditUserModal from "./EditUserModal";

const UsersList = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

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
        {users.map((user: User) => {
          return (
            <div key={user.id}>
              <ListItem
                user={user}
                setSelectedUser={setSelectedUser}
                setIsEditModalOpen={setIsEditModalOpen}
              />
            </div>
          );
        })}
      </div>
      <EditUserModal
        isOpen={isEditModalOpen}
        setIsOpen={setIsEditModalOpen}
        user={selectedUser}
      />
    </>
  );
};

export default UsersList;
