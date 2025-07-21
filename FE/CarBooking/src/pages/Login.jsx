import React from "react";

const Login = () => {
  const [state, setState] = React.useState("login");
  const [userRegister, setUserRegister] = React.useState({
    fullname: "",
    gender: "",
    birthdate: "",
    phone: "",
    email: "",
    address: "",
    password: "",
    confirmPassword: "",
  });
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex justify-center items-center p-4">
      <div className="flex bg-white border border-borderColor rounded-2xl shadow-xl overflow-hidden max-w-5xl w-full ">
        <div className="w-full hidden md:flex md:w-1/2 relative">
          <img
            className="absolute inset-0 h-full w-full object-cover object-center"
            src="src/assets/car_image2.png"
            alt="leftSideImage"
          />

          <div className="absolute bottom-8 left-8 text-white z-10">
            <h3 className="text-2xl font-bold mb-2">Welcome to CarBooking</h3>
            <p className="text-white/90 text-sm max-w-xs">
              Experience the best car rental service with premium vehicles and
              excellent customer support.
            </p>
          </div>
        </div>
        <form className="w-full md:w-1/2 flex flex-col items-center justify-center pt-8 pb-8 bg-white">
          <div className="w-full max-w-sm">
            {state === "login" ? (
              <div>
                <h2 className="text-3xl font-bold text-gray-900 text-center mb-2">
                  Sign in
                </h2>
                <p className="text-sm text-gray-600 text-center mb-8">
                  Welcome back! Please sign in to continue
                </p>

                <div className="flex items-center gap-4 w-full my-6">
                  <div className="flex-1 h-px bg-gray-300"></div>
                  <p className="text-sm text-gray-500 whitespace-nowrap">
                    Sign in with email
                  </p>
                  <div className="flex-1 h-px bg-gray-300"></div>
                </div>

                <div className="space-y-4">
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <svg
                        width="16"
                        height="11"
                        viewBox="0 0 16 11"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M0 .55.571 0H15.43l.57.55v9.9l-.571.55H.57L0 10.45zm1.143 1.138V9.9h13.714V1.69l-6.503 4.8h-.697zM13.749 1.1H2.25L8 5.356z"
                          fill="#6B7280"
                        />
                      </svg>
                    </div>
                    <input
                      type="email"
                      placeholder="Email address"
                      className="w-full pl-12 pr-4 py-3 border border-borderColor rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-colors duration-200"
                      required
                    />
                  </div>

                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <svg
                        width="13"
                        height="17"
                        viewBox="0 0 13 17"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M13 8.5c0-.938-.729-1.7-1.625-1.7h-.812V4.25C10.563 1.907 8.74 0 6.5 0S2.438 1.907 2.438 4.25V6.8h-.813C.729 6.8 0 7.562 0 8.5v6.8c0 .938.729 1.7 1.625 1.7h9.75c.896 0 1.625-.762 1.625-1.7zM4.063 4.25c0-1.406 1.093-2.55 2.437-2.55s2.438 1.144 2.438 2.55V6.8H4.061z"
                          fill="#6B7280"
                        />
                      </svg>
                    </div>
                    <input
                      type="password"
                      placeholder="Password"
                      className="w-full pl-12 pr-4 py-3 border border-borderColor rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-colors duration-200"
                      required
                    />
                  </div>
                </div>

                <div className="w-full flex items-center justify-between mt-6 text-sm">
                  <div className="flex items-center gap-2">
                    <input
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-borderColor rounded"
                      type="checkbox"
                      id="checkbox"
                    />
                    <label className="text-gray-600" htmlFor="checkbox">
                      Remember me
                    </label>
                  </div>
                </div>
              </div>
            ) : (
              <>
                <div className="mb-6">
                  <h2 className="text-3xl font-bold text-gray-900 text-center mb-2">
                    Sign up
                  </h2>
                  <p className="text-sm text-gray-600 text-center mb-8">
                    Join us today! Please fill in your details
                  </p>
                </div>

                <div className="space-y-2 w-full   ">
                  {/* Row 1: Fullname and Gender */}

                  <div className="w-full flex gap-4">
                    <div className="flex-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name
                      </label>
                      <input
                        onChange={(e) =>
                          setUserRegister({
                            ...userRegister,
                            fullname: e.target.value,
                          })
                        }
                        value={userRegister.fullname}
                        placeholder="Enter your full name"
                        className="w-full px-4 py-3 border border-borderColor rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all duration-200 bg-gray-50 hover:bg-white"
                        type="text"
                        required
                      />
                    </div>
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Gender
                      </label>
                      <div className="flex gap-4 mt-4">
                        <label className="flex items-center cursor-pointer">
                          <input
                            type="radio"
                            name="gender"
                            value="MALE"
                            checked={userRegister.gender === "MALE"}
                            onChange={(e) =>
                              setUserRegister({
                                ...userRegister,
                                gender: e.target.value,
                              })
                            }
                            className="w-4 h-4 text-primary focus:ring-primary focus:ring-2 border-gray-300"
                            required
                          />
                          <span className="ml-2 text-sm font-medium text-gray-700">
                            Male
                          </span>
                        </label>
                        <label className="flex items-center cursor-pointer">
                          <input
                            type="radio"
                            name="gender"
                            value="FEMALE"
                            checked={userRegister.gender === "FEMALE"}
                            onChange={(e) =>
                              setUserRegister({
                                ...userRegister,
                                gender: e.target.value,
                              })
                            }
                            className="w-4 h-4 text-primary focus:ring-primary focus:ring-2 border-gray-300"
                          />
                          <span className="ml-2 text-sm font-medium text-gray-700">
                            Female
                          </span>
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* Row 2: Birthday and Phone */}
                  <div className="w-full flex gap-4">
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Birthday
                      </label>
                      <input
                        onChange={(e) =>
                          setUserRegister({
                            ...userRegister,
                            birthdate: e.target.value,
                          })
                        }
                        value={userRegister.birthdate}
                        className="w-full px-4 py-3 border border-borderColor rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all duration-200 bg-gray-50 hover:bg-white"
                        type="date"
                        required
                      />
                    </div>
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number
                      </label>
                      <input
                        onChange={(e) =>
                          setUserRegister({
                            ...userRegister,
                            phone: e.target.value,
                          })
                        }
                        value={userRegister.phone}
                        placeholder="Enter phone number"
                        className="w-full px-4 py-3 border border-borderColor rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all duration-200 bg-gray-50 hover:bg-white"
                        type="tel"
                        required
                      />
                    </div>
                  </div>

                  {/* Row 3: Email */}
                  <div className="w-full">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email
                    </label>
                    <input
                      onChange={(e) =>
                        setUserRegister({
                          ...userRegister,
                          email: e.target.value,
                        })
                      }
                      value={userRegister.email}
                      placeholder="Enter email address"
                      className="w-full px-4 py-3 border border-borderColor rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all duration-200 bg-gray-50 hover:bg-white"
                      type="tel"
                      required
                    />
                  </div>

                  {/* Row 4: Address */}
                  <div className="w-full">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Address
                    </label>
                    <input
                      onChange={(e) =>
                        setUserRegister({
                          ...userRegister,
                          address: e.target.value,
                        })
                      }
                      value={userRegister.address}
                      placeholder="Enter your full address"
                      className="w-full px-4 py-3 border border-borderColor rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all duration-200 bg-gray-50 hover:bg-white"
                      type="text"
                      required
                    />
                  </div>

                  {/* Row 5: Password and Confirm Password */}
                  <div className="w-full flex gap-4">
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Password
                      </label>
                      <input
                        onChange={(e) =>
                          setUserRegister({
                            ...userRegister,
                            password: e.target.value,
                          })
                        }
                        value={userRegister.password}
                        placeholder="Enter password"
                        className="w-full px-4 py-3 border border-borderColor rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all duration-200 bg-gray-50 hover:bg-white"
                        type="tel"
                        required
                      />
                    </div>
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Confirm Password
                      </label>
                      <input
                        onChange={(e) =>
                          setUserRegister({
                            ...userRegister,
                            confirmPassword: e.target.value,
                          })
                        }
                        value={userRegister.confirmPassword}
                        placeholder="Confirm password"
                        className="w-full px-4 py-3 border border-borderColor rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all duration-200 bg-gray-50 hover:bg-white"
                        type="tel"
                        required
                      />
                    </div>
                  </div>
                </div>
              </>
            )}

            <button
              type="submit"
              className="mt-8 w-full h-12 rounded-lg text-white bg-gradient-to-r from-primary to-primary-dull hover:from-primary-dull hover:to-primary focus:ring-4 focus:ring-indigo-200 transition-all duration-300 font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              {state === "register" ? "Sign up" : "Sign in"}
            </button>

            <p className="text-gray-600 text-sm mt-6 text-center">
              {state === "register" ? (
                <>
                  Already have an account?{" "}
                  <span
                    onClick={() => setState("login")}
                    className="text-primary hover:text-primary-dull hover:underline cursor-pointer font-medium transition-colors duration-200"
                  >
                    Sign in
                  </span>
                </>
              ) : (
                <>
                  Don't have an account?{" "}
                  <span
                    onClick={() => setState("register")}
                    className="text-primary hover:text-primary-dull hover:underline cursor-pointer font-medium transition-colors duration-200"
                  >
                    Sign up
                  </span>
                </>
              )}
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
