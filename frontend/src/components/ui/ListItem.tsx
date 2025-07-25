import type { User } from "../../types/User";
import { formatUtcOffset } from "../../utils/formatUtcOffset";

const ListItem = ({
  user,
  setSelectedUser,
  setIsEditModalOpen,
}: {
  user: User | null;
  setSelectedUser: (user: User | null) => void;
  setIsEditModalOpen: (isOpen: boolean) => void;
}) => {
  const handleClick = (user: User | null) => {
    console.log("user", user);
    if (user) {
      console.log("user2", user);
      setSelectedUser(user);
      setIsEditModalOpen(true);
    }
  };

  return (
    <div
      className="flex border p-2 border-gray-200 rounded-lg hover:bg-gray-100 cursor-pointer"
      onClick={() => handleClick(user as User)}
    >
      <div className="flex gap-2 w-full justify-between">
        <div className="flex flex-col justify-between">
          <p>{user?.name}</p>
          <p>Zip Code: {user?.zipCode}</p>
        </div>
        <div className="flex flex-col gap-2 justify-between">
          <p className="self-end">{formatUtcOffset(user?.timezone || 0)}</p>
          <p className="self-end">
            {user?.latitude},{user?.longitude}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ListItem;
