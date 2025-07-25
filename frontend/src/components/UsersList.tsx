import { useState } from "react";
import type { User } from "../types/User";
import ListItem from "./ui/ListItem";
import EditUserModal from "./EditUserModal";
import useUsersFromRealtimeDB from "../hooks/useRealtimeDB";

const UsersList = () => {
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const { users, loading, error } = useUsersFromRealtimeDB("users");

  return (
    <>
      <div className="bg-white ">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          User Management System
        </h1>
        <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
          <li>
            Click on the <strong>+ Add User</strong> button to add a new user
          </li>
          <li>
            Click on a <strong>pinpoint on the map</strong> to see user
            information
          </li>
          <li>
            Click on a user <strong>on the list</strong> to edit their data
          </li>
        </ul>
      </div>
      {error && <p>{error}</p>}
      <div className="flex flex-col gap-2">
        <h2 className="text-xl font-bold text-gray-800 mb-2">List of Users</h2>
        <div className="flex flex-col gap-2 overflow-y-auto">
          {loading ? (
            <p className="text-gray-500 text-center">Loading...</p>
          ) : users.length > 0 ? (
            users.map((user: User) => {
              return (
                <div key={user.id}>
                  <ListItem
                    user={user}
                    setSelectedUser={setSelectedUser}
                    setIsEditModalOpen={setIsEditModalOpen}
                  />
                </div>
              );
            })
          ) : (
            <p className="text-gray-500 text-center">No users found!</p>
          )}
        </div>
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
