import { useState } from "react";
import type { User } from "../types/User";
import ListItem from "./ui/ListItem";
import EditUserModal from "./EditUserModal";
import { useSelector } from "react-redux";
import type { RootState } from "../store";

const UsersList = () => {
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const { users, loading, error } = useSelector(
    (state: RootState) => state.users
  );

  return (
    <>
      <section className="bg-white ">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
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
      </section>
      <section className="flex flex-col gap-2 h-full flex-grow min-h-0">
        <h2 className="text-xl font-bold text-gray-800 mb-2">
          List of Users:{" "}
          <span className="p-1 bg-gray-100 rounded-md text-gray-500">
            {users.length}
          </span>
        </h2>
        <ul className="flex flex-col gap-2 overflow-y-auto h-full pb-4">
          {error && <p>{error}</p>}
          {loading ? (
            <p className="text-gray-500 text-center">Loading...</p>
          ) : users.length > 0 ? (
            users.map((user: User) => {
              return (
                <li key={user.id}>
                  <ListItem
                    user={user}
                    setSelectedUser={setSelectedUser}
                    setIsEditModalOpen={setIsEditModalOpen}
                  />
                </li>
              );
            })
          ) : (
            <p className="text-gray-500 text-center">No users found!</p>
          )}
        </ul>
      </section>
      <EditUserModal
        isOpen={isEditModalOpen}
        setIsOpen={setIsEditModalOpen}
        user={selectedUser}
      />
    </>
  );
};

export default UsersList;
