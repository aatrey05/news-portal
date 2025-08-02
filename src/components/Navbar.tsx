import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-base-200 p-4 flex justify-between items-center shadow-md">
      <div className="text-xl font-bold text-primary">NewsPortal</div>
      <ul className="flex space-x-4">
        <li>
          <Link className="btn btn-ghost btn-sm" to="/feed">
            Feed
          </Link>
        </li>
        <li>
          <Link className="btn btn-ghost btn-sm" to="/profile">
            Profile
          </Link>
        </li>
        <li>
          <Link className="btn btn-ghost btn-sm" to="/login">
            Login
          </Link>
        </li>
      </ul>
    </nav>
  );
}
