import "./App.css";
import UsersList from "./components/UsersList";
import UsersMap from "./components/UsersMap";
import useRealtimeDB from "./hooks/useRealtimeDB";

function App() {
  useRealtimeDB("users");

  return (
    // This page distribution is set for desktop as project will run on desktop
    // Will need to adjust for mobile

    <main className="h-screen flex overflow-hidden ">
      <div className="flex-1 w-full relative bg-gray-100 h-full ">
        <UsersMap />
      </div>
      <div className="p-4 w-1/3 bg-white border-l border-gray-200 flex flex-col min-w-0 gap-3 h-full overflow-y-auto">
        <UsersList />
      </div>
    </main>
  );
}

export default App;
