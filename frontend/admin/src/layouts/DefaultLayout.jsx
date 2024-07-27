import { Outlet } from "react-router-dom";
import SideBar from "../components/sidebar";

function DefaultLayout() {
  return (
    <div className="d-flex col-12">
      <div className="col-2">
        <SideBar />
      </div>
      <div className="content col-10">
        <Outlet />
      </div>
    </div>
  );
}

export default DefaultLayout;
