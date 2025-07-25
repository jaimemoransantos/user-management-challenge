import { useState } from "react";
import Modal from "./ui/Modal";

const UserAddModal = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}) => {
  const [name, setName] = useState<string>("");
  const [zipCode, setZipCode] = useState<string>("");
  const [creatingUser, setCreatingUser] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const validateZipCode = (zipCode: string) => {
    if (/^\d{0,5}$/.test(zipCode)) {
      setZipCode(zipCode);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setCreatingUser(true);
    try {
      const response = await fetch(
        "http://localhost:5001/user-management-challenge/us-central1/api/users",
        {
          method: "POST",
          body: JSON.stringify({ name, zipCode }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to add user");
      }
      const data = await response.json();
      console.log(data);
      setIsOpen(false);
      setName("");
      setZipCode("");
      setError("");
    } catch (error) {
      console.error(error);
      setError("Failed to add user");
    } finally {
      setCreatingUser(false);
    }
  };

  return (
    isOpen && (
      <Modal>
        <div className="flex flex-col gap-3">
          <div className="flex justify-between">
            <h2 className="text-2xl font-bold">Add User</h2>
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
            <button
              type="submit"
              className="mt-4 bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-md"
              disabled={creatingUser}
            >
              {creatingUser ? "Adding..." : "Add User"}
            </button>
          </form>
        </div>
      </Modal>
    )
  );
};

export default UserAddModal;
