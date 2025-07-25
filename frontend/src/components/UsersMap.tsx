import { useEffect, useState } from "react";
import type { User } from "../types/User";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import type { LatLngBoundsExpression } from "leaflet";
import { formatUtcOffset } from "../utils/formatUtcOffset";
import UserAddModal from "./AddUserModal";
import useUsersFromRealtimeDB from "../hooks/useRealtimeDB";

// const UsersMap = ({ users }: { users: User[] }) => {
const UsersMap = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { users, loading, error } = useUsersFromRealtimeDB("users");

  const Bounds = () => {
    const map = useMap();
    useEffect(() => {
      if (!users.length) return;
      const bounds = users.map((user: User) => [user.latitude, user.longitude]);
      map.fitBounds(bounds as LatLngBoundsExpression, { padding: [100, 100] });
    }, [users, map]);
    return null;
  };

  return (
    <>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <div className="h-full w-full relative">
        <button
          onClick={() => setIsOpen(true)}
          className="absolute top-6 right-6 p-3 font-bold rounded-full bg-blue-500 hover:bg-blue-600 text-white z-[1000]"
        >
          + Add User
        </button>
        <MapContainer
          center={[39.8283, -98.5795]}
          zoom={5}
          scrollWheelZoom={true}
          boundsOptions={{ padding: [100, 100] }}
          className="h-full w-full"
        >
          <Bounds />
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {users.map((user: User) => {
            return (
              <Marker key={user.id} position={[user.latitude, user.longitude]}>
                <Popup>
                  <div className="flex flex-col gap-2">
                    <div className="font-bold m-0 p-0"> {user.name}</div>
                    <div className="m-0 p-0">Zip Code: {user.zipCode}</div>
                    <div className="m-0 p-0">
                      Timezone: {formatUtcOffset(user.timezone)}
                    </div>
                    <div className="m-0 p-0">
                      Latitude: {user.latitude}, Longitude: {user.longitude}
                    </div>
                  </div>
                </Popup>
              </Marker>
            );
          })}
        </MapContainer>
      </div>
      <UserAddModal isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
};

export default UsersMap;
