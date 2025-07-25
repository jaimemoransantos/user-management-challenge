import "./App.css";
import UsersList from "./components/UsersList";
import UsersMap from "./components/UsersMap";

function App() {
  return (
    // This page distribution is set for desktop as project will run on desktop
    // Will need to adjust for mobile

    <div className="h-screen flex overflow-hidden ">
      <div className="flex-1 w-full relative bg-gray-100 h-full ">
        <UsersMap />
      </div>
      <div className="p-4 w-1/3 bg-white border-l border-gray-200 flex flex-col min-w-0 gap-3">
        <UsersList />
      </div>
    </div>
  );
}

export default App;
