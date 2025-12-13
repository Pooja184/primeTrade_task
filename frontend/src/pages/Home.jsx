import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4">
      <div className="text-center bg-white shadow-lg p-10 rounded-xl max-w-lg w-full">

        <h1 className="text-4xl font-bold mb-4 text-blue-600">
          PrimeTrade Blog App
        </h1>

        <p className="text-gray-600 mb-8">
          A simple and secure blog application with authentication, dashboard,
          and content management.
        </p>

        <div className="flex gap-4 justify-center">
          <Link
            to="/login"
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Login
          </Link>

          <Link
            to="/register"
            className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition"
          >
            Register
          </Link>
        </div>

      </div>
    </div>
  );
};

export default Home;
