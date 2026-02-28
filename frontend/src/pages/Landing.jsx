import { Link } from "react-router-dom";
import homeimg from "../assets/homeimg.avif";
import logo from "../assets/icon.png";
function Landing() {
  return(
    <div className="min-h-screen bg-gray-100">
      {/* navbar */}
      <nav className="flex justify-between items-center px-8 py-4 bg-white shadow">
        <div className="flex items-center gap-3 mb-6">
          <h1 className="text-4xl font-bold text-violet-800">
            Notes and Task Manager
          </h1>
          <img src={logo} alt="App Logo" className="w-10 h-10"/>
        </div>
        <div className="space-x-4">
          <Link to="/login"
            className="px-4 py-2 border rounded hover:bg-gray-200">
            Login
          </Link>
          <Link to="/register"
            className="px-4 py-2 bg-violet-600 text-white rounded hover:bg-violet-800">
            Register
          </Link>
        </div>
      </nav>

      {/* main section */}
      <div className="flex flex-col md:flex-row items-center justify-between px-10 py-16">
        {/* text on left */}
        <div className="md:w-1/2 space-y-6">
          <h2 className="text-4xl font-bold">
            Organize Your Life Efficiently
          </h2>
          <p className="text-gray-600 text-lg">
            Manage your daily tasks and notes in one efficient and powerful platform.
            Stay productive, focused, and never forget important work again.
          </p>
          <div className="space-x-4">
            <Link to="/register"
              className="bg-violet-600 text-white px-6 py-3 rounded-lg hover:bg-violet-800">
              Get Started
            </Link>

            <Link to="/login"
              className="border px-6 py-3 rounded-lg hover:bg-gray-200">
              Login
            </Link>
          </div>
        </div>

        {/* image on right */}
        <div className="md:w-1/2 mt-10 md:mt-0">
          <img
            src={homeimg}
            alt="productivity"
            className="rounded-xl shadow-lg"/>
        </div>
      </div>

      {/* features section */}
      <div className="bg-white py-16 px-10">
        <h2 className="text-3xl font-bold text-center mb-12">
          FEATURES
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {/* feature 1 */}
          <div className="p-6 shadow rounded-lg text-center">
            <h3 className="text-xl font-semibold mb-3">
              ✅ Task Management
            </h3>
            <p className="text-gray-700">
              Create, update, and track daily tasks with an easy-to-use interface.
            </p>
          </div>
          {/* feature 2 */}
          <div className="p-6 shadow rounded-lg text-center">
            <h3 className="text-xl font-semibold mb-3">
              📝 Smart Notes
            </h3>
            <p className="text-gray-700">
              Save ideas, study materials, or reminders and edit anytime.
            </p>
          </div>
          {/* feature 3 */}
          <div className="p-6 shadow rounded-lg text-center">
            <h3 className="text-xl font-semibold mb-3">
              🔐 Secure Access
            </h3>
            <p className="text-gray-700">
              Authentication-based system keeps your data safe and private.
            </p>
          </div>

        </div>
      </div>

      {/* footer */}
      <footer className="text-center py-6 bg-gray-200">
        <p className="text-gray-800">
          © 2026 Notes and Task Manager — Built with MERN Stack
        </p>
      </footer>
    </div>
  );
}

export default Landing;