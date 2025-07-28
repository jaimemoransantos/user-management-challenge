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
        const data = await response.json();
        setError(data?.error || "Failed to update user");
        return;
      }

      setIsOpen(false);
      setName("");
      setZipCode("");
      setError("");
    } catch (error) {
      setError("An unexpected error occurred");
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

  const handleClose = () => {
    setIsOpen(false);
    setName("");
    setZipCode("");
    setError("");
  };

  useEffect(() => {
    if (user && isOpen) {
      setName(user.name);
      setZipCode(user.zipCode);
    }
  }, [user, isOpen]);

  return (
    isOpen && (
      <Modal>
        <div className="flex flex-col gap-3">
          <header className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Edit User</h2>
            <button
              onClick={handleClose}
              type="button"
              className="text-gray-500 hover:text-gray-700"
            >
              Close X
            </button>
          </header>
          <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-2">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={name}
                placeholder="Enter name"
                required
                onChange={(e) => setName(e.target.value)}
                className="border border-gray-300 rounded-md p-2"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="zipCode">ZIP Code</label>
              <input
                type="text"
                id="zipCode"
                name="zipCode"
                value={zipCode}
                placeholder="Enter ZIP code (99999)"
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
                className="mt-4 bg-red-500 hover:bg-red-600 text-white p-2 rounded-md disabled:opacity-50 flex items-center justify-center gap-2"
                disabled={deletingUser}
                onClick={deleteUser}
              >
                {deletingUser && (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                )}
                {deletingUser ? "Deleting..." : "Delete User"}
              </button>
              <button
                type="submit"
                className="mt-4 bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-md disabled:opacity-50 flex items-center justify-center gap-2"
                disabled={updatingUser}
              >
                {updatingUser && (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                )}
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
