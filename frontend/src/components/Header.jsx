import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/icon2.png";

function Header(){
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const logoutHandler=()=>{
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <nav className="bg-violet-600 text-white px-6 py-3 flex justify-between items-center">
      {/* left -title */}
      <div className="flex items-center gap-3">
        <h1 className="text-xl font-bold">
          Notes and Task Manager
        </h1>
        <img src={logo} alt="app logo" className="w-8 h-8 object-contain"/>
      </div>
      {/* app links */}
      <div className="flex gap-12 text-lg font-bold">
        <Link to="/todos" className="hover:text-gray-200">
          Tasks
        </Link>
        <Link to="/notes" className="hover:text-gray-200">
          Notes
        </Link>
      </div>

      {/* right text, button */}
      <div className="flex items-center gap-4">
        {user && (
          <>
            <span className="hidden md:block">
              {user.name}
            </span>

            <button onClick={logoutHandler}
              className="bg-red-500 px-3 py-1 rounded font-bold hover:bg-red-600"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Header;