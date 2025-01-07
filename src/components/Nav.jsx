import { Link } from "react-router";

function Nav() {
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
      <div>Sign Out</div>
    </nav>
  );
}

export default Nav;
