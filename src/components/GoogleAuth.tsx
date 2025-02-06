import { FcGoogle } from "react-icons/fc";

const GoogleAuth = () => {
  return (
    <>
      <div className="flex items-center mb-4">
        <hr className="flex-grow border-t border-gray-300" />
        <span className="mx-4 text-gray-600">Or continue with</span>
        <hr className="flex-grow border-t border-gray-300" />
      </div>
      <div className="mt-4">
        <button
          type="button"
          className="w-full flex justify-center items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 active:bg-gray-200"
        >
          <FcGoogle className="w-5 h-5 mr-2" />
          Sign up with Google
        </button>
      </div>
    </>
  );
};

export default GoogleAuth;
