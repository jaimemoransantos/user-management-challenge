import type { User } from "../../types/User";
import { formatUtcOffset } from "../../utils/formatUtcOffset";

const ListItem = ({ user }: { user: User }) => {
  return (
    <div className="flex border p-2 border-gray-200 rounded-lg hover:bg-gray-100 cursor-pointer">
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
  );
};

export default ListItem;
