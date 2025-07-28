import type { User } from "../../types/User";
import { formatUtcOffset } from "../../utils/formatUtcOffset";

const ListItem = ({
  user,
  setSelectedUser,
  setIsEditModalOpen,
}: {
  user: User | null;
  setSelectedUser: (user: User) => void;
  setIsEditModalOpen: (isOpen: boolean) => void;
}) => {
  if (!user) return null;

  const handleClick = (user: User) => {
    setSelectedUser(user);
    setIsEditModalOpen(true);
  };

  return (
    <div
      className="flex border p-2 border-gray-200 rounded-lg hover:bg-gray-100 cursor-pointer"
      onClick={() => handleClick(user)}
    >
      <div className="flex gap-4 w-full justify-between">
        <div className="flex flex-col justify-between">
          <div>
            <span className="text-gray-500 text-sm">Name</span>
            <p className="text-base">{user.name}</p>
          </div>
          <div>
            <span className="text-gray-500 text-sm">ZIP Code</span>
            <p className="text-base">{user.zipCode}</p>
          </div>
        </div>
        <div className="flex flex-col justify-between items-end text-right">
          <div>
            <span className="text-gray-500 text-sm">Timezone</span>
            <p className="text-base">{formatUtcOffset(user.timezone)}</p>
          </div>
          <div>
            <span className="text-gray-500 text-sm">Coordinates</span>
            <p className="text-base">
              {user.latitude}, {user.longitude}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListItem;
