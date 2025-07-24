import React from "react";
import { assets } from "../assets/assets.js";
const LoginForm = ({ setState }) => {
  const [loginData, setLoginData] = React.useState({
    username: "",
    password: "",
  });
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className=" w-full flex flex-col items-center justify-center min-h-[720px]"
      >
        <div className="w-full flex flex-col items-center">
          <h2 className="text-3xl font-bold text-primary text-center mb-2">
            Sign in
          </h2>

          <p className="text-sm text-gray-500 text-center mb-2">
            Welcome back! Please sign in to continue
          </p>

          <div className="flex items-center gap-4 w-full my-6">
            <div className="flex-1 h-px bg-gray-300"></div>
            <p className="text-sm text-gray-500 whitespace-nowrap">
              Sign in with email
            </p>
            <div className="flex-1 h-px bg-gray-300"></div>
          </div>
          <div className="space-y-4 w-full">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <img
                  src={assets.gmail_logo}
                  alt="Email Icon"
                  className="w-5 h-5"
                />
              </div>
              <input
                type="email"
                placeholder="Email or Username"
                className="w-full pl-12 pr-4 py-3 border border-borderColor rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-colors duration-200"
                required
                onChange={(e) =>
                  setLoginData({
                    ...loginData,
                    username: e.target.value,
                  })
                }
                value={loginData.username}
              />
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <img
                  src={assets.lock_icon}
                  alt="Password Icon"
                  className="w-5 h-5"
                />
              </div>
              <input
                type="password"
                placeholder="Password"
                className="w-full pl-12 pr-4 py-3 border border-borderColor rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-colors duration-200"
                required
                onChange={(e) =>
                  setLoginData({
                    ...loginData,
                    password: e.target.value,
                  })
                }
                value={loginData.password}
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="mt-8 w-full h-12 rounded-lg text-white bg-gradient-to-r from-primary to-primary-dull hover:from-primary-dull hover:to-primary focus:ring-4 focus:ring-indigo-200 transition-all duration-300 font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 cursor-pointer"
        >
          Sign In
        </button>
        <p className="text-gray-600 text-sm mt-6 text-center">
          Don't have an account?{" "}
          <span
            onClick={() => setState("register")}
            className="text-primary hover:text-primary-dull hover:underline cursor-pointer font-medium transition-colors duration-200"
          >
            Sign up
          </span>
        </p>
      </form>
    </>
  );
};

export default LoginForm;
