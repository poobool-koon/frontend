import { Link, Outlet } from "react-router-dom";
import Head from "./Head";

function Root() {
  return (
    <div>
      <Head />
      <Outlet />
    </div>
  );
}

export default Root;
