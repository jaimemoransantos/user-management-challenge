import { useState, useEffect } from "react";
import Modal from "./ui/Modal";
import type { User } from "../types/User";

const EditUserModal = ({
  isOpen,
  setIsOpen,
  user,
}: {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  user: User | null;
}) => {
  const [name, setName] = useState<string>(user?.name || "");
  const [zipCode, setZipCode] = useState<string>(user?.zipCode || "");
  const [updatingUser, setUpdatingUser] = useState<boolean>(false);
  const [deletingUser, setDeletingUser] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const validateZipCode = (zipCode: string) => {
    if (/^\d{0,5}$/.test(zipCode)) {
      setZipCode(zipCode);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setUpdatingUser(true);
    try {
      const response = await fetch(
        `http://localhost:5001/user-management-challenge/us-central1/api/users/${user?.id}`,
        {
          method: "PUT",
          body: JSON.stringify({ name, zipCode }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to update user");
      }
      const data = await response.json();
      console.log(data);
      setIsOpen(false);
      setName("");
      setZipCode("");
      setError("");
    } catch (error) {
      setError("Failed to update user");
    } finally {
      setUpdatingUser(false);
    }
  };

  const deleteUser = async () => {
    setDeletingUser(true);
    try {
      const response = await fetch(
        `http://localhost:5001/user-management-challenge/us-central1/api/users/${user?.id}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error("Failed to delete user");
      }
      setIsOpen(false);
      setName("");
      setZipCode("");
      setError("");
    } catch (error) {
      setError("Failed to delete user");
    } finally {
      setDeletingUser(false);
    }
  };

  useEffect(() => {
    if (user) {
      setName(user.name);
      setZipCode(user.zipCode);
    }
  }, [user]);

  return (
    isOpen && (
      <Modal>
        <div className="flex flex-col gap-3">
          <div className="flex justify-between">
            <h2 className="text-2xl font-bold">Edit User</h2>
            <button onClick={() => setIsOpen(false)}>Close X</button>
          </div>
          <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-2">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                value={name}
                placeholder="Enter name"
                required
                onChange={(e) => setName(e.target.value)}
                className="border border-gray-300 rounded-md p-2"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="zipCode">Zip Code</label>
              <input
                type="text"
                id="zipCode"
                value={zipCode}
                placeholder="Enter zip code (99999)"
                maxLength={5}
                required
                pattern="^\d{5}$"
                onChange={(e) => validateZipCode(e.target.value)}
                className="border border-gray-300 rounded-md p-2"
              />
            </div>
            {error && <p className="text-red-500">{error}</p>}
            <div className="flex gap-2 justify-between">
              <button
                type="button"
                className="mt-4 bg-red-500 hover:bg-red-600 text-white p-2 rounded-md"
                disabled={deletingUser}
                onClick={deleteUser}
              >
                {deletingUser ? "Deleting..." : "Delete User"}
              </button>
              <button
                type="submit"
                className="mt-4 bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-md"
                disabled={updatingUser}
              >
                {updatingUser ? "Updating..." : "Update User"}
              </button>
            </div>
          </form>
        </div>
      </Modal>
    )
  );
};

export default EditUserModal;
