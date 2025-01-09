import { Link } from "react-router";
import { logOut } from "../utilities/users-services.js";

function Nav() {
  function handleLogOut() {
    //delegate this functionality to users-services
    logOut();
    //Update state will also cause a rerender
    setUser(null);
  }

  return (
    <nav>
      <div className="navContainer">
        <Link to="/">Home</Link>
        &nbsp; | &nbsp;
        <Link to="/calendar">Calendar</Link>
        &nbsp; | &nbsp;
        <Link to="/braindump">Brain Dump</Link>
        &nbsp; | &nbsp;
        <Link to="/todo">To Do List</Link>
        &nbsp; | &nbsp;
      </div>
      <div>
        <Link to="" onClick={handleLogOut}>
          Sign Out
        </Link>
      </div>
    </nav>
  );
}

export default Nav;
