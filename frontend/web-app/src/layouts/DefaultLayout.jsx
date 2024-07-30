import { Outlet } from "react-router-dom";
import NavigationBar from "../components/navbar";

function DefaultLayout() {
  return (
    <div className="app">
      <NavigationBar />
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
}

export default DefaultLayout;
