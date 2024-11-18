import { Link } from "react-router-dom";
import { User } from "../../App";
import { auth } from "../../services/firebaseConfig";


type HeaderProps = {
  user: User | null;
};

export default function Header({ user }: HeaderProps) {
  return (
    <header className="bg-white shadow">
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-indigo-600">
          SocialApp
        </Link>
        {user ? (
          <div className="flex items-center space-x-4">
            <Link
              to="/create-post"
              className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition"
            >
              Create Post
            </Link>
            <Link
              to={`/profile/${user.id}`}
              className="text-gray-600 hover:text-indigo-600 transition"
            >
              {user.displayName || user.email}
            </Link>
            <button
              onClick={() => auth.signOut()}
              className="text-red-600 hover:text-red-700 transition"
            >
              Sign Out
            </button>
          </div>
        ) : (
          <div className="space-x-4">
            <Link
              to="/login"
              className="text-gray-600 hover:text-indigo-600 transition"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition"
            >
              Sign Up
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
}
