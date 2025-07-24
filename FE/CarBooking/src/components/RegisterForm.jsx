import React from "react";

const RegisterForm = ({ setState }) => {
  const [registerData, setRegisterData] = React.useState({
    fullname: "",
    gender: "",
    birthdate: "",
    phone: "",
    email: "",
    address: "",
    password: "",
    confirmPassword: "",
  });
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col w-full items-center justify-center min-h-[720px]"
    >
      <div className="w-full flex flex-col items-center">
        <h2 className="text-3xl font-bold text-primary text-center mb-2">
          Sign up
        </h2>
        <p className="text-sm text-gray-500 text-center mb-2">
          Create an account to enjoy our services
        </p>
        <div className="flex items-center gap-4 w-full my-6">
          <div className="flex-1 h-px bg-gray-300"></div>
          <p className="text-sm text-gray-500 whitespace-nowrap">
            Fill in form
          </p>
          <div className="flex-1 h-px bg-gray-300"></div>
        </div>
        <div className="space-y-4 w-full">
          {/* name & gender */}
          <div className="w-full flex gap-4">
            <div className="flex-2">
              <label className="block text-sm font-medium text-gray-500 mb-2">
                Full Name
              </label>
              <input
                onChange={(e) =>
                  setRegisterData({
                    ...registerData,
                    fullname: e.target.value,
                  })
                }
                value={registerData.fullname}
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
              <div className="flex gap-4 mt-5">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="gender"
                    value="MALE"
                    checked={registerData.gender === "MALE"}
                    onChange={(e) =>
                      setRegisterData({
                        ...registerData,
                        gender: e.target.value,
                      })
                    }
                    className="w-4 h-4 text-primary focus:ring-primary  border-gray-300"
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
                    checked={registerData.gender === "FEMALE"}
                    onChange={(e) =>
                      setRegisterData({
                        ...registerData,
                        gender: e.target.value,
                      })
                    }
                    className="w-4 h-4 text-primary focus:ring-primary  border-gray-300"
                  />
                  <span className="ml-2 text-sm font-medium text-gray-700">
                    Female
                  </span>
                </label>
              </div>
            </div>
          </div>
          {/* birthday & phone */}
          <div className="w-full flex gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Birthday
              </label>
              <input
                onChange={(e) =>
                  setRegisterData({
                    ...registerData,
                    birthdate: e.target.value,
                  })
                }
                value={registerData.birthdate}
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
                  setRegisterData({
                    ...registerData,
                    phone: e.target.value,
                  })
                }
                value={registerData.phone}
                placeholder="Enter phone number"
                className="w-full px-4 py-3 border border-borderColor rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all duration-200 bg-gray-50 hover:bg-white"
                type="text"
                required
              />
            </div>
          </div>
          {/* Row 3: Address */}
          <div className="w-full">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Address
            </label>
            <input
              onChange={(e) =>
                setRegisterData({
                  ...registerData,
                  address: e.target.value,
                })
              }
              value={registerData.address}
              placeholder="Enter your full address"
              className="w-full px-4 py-3 border border-borderColor rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all duration-200 bg-gray-50 hover:bg-white"
              type="text"
              required
            />
          </div>
          {/* Row 3: Email */}
          <div className="w-full">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              onChange={(e) =>
                setRegisterData({
                  ...registerData,
                  email: e.target.value,
                })
              }
              value={registerData.email}
              placeholder="Enter email address"
              className="w-full px-4 py-3 border border-borderColor rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all duration-200 bg-gray-50 hover:bg-white"
              type="email"
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
                  setRegisterData({
                    ...registerData,
                    password: e.target.value,
                  })
                }
                value={registerData.password}
                placeholder="Enter password"
                className="w-full px-4 py-3 border border-borderColor rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all duration-200 bg-gray-50 hover:bg-white"
                type="password"
                required
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Confirm Password
              </label>
              <input
                onChange={(e) =>
                  setRegisterData({
                    ...registerData,
                    confirmPassword: e.target.value,
                  })
                }
                value={registerData.confirmPassword}
                placeholder="Confirm password"
                className="w-full px-4 py-3 border border-borderColor rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all duration-200 bg-gray-50 hover:bg-white"
                type="password"
                required
              />
            </div>
          </div>
        </div>
      </div>
      <button
        type="submit"
        className="mt-8 w-full h-12 rounded-lg text-white bg-gradient-to-r from-primary to-primary-dull hover:from-primary-dull hover:to-primary focus:ring-4 focus:ring-indigo-200 transition-all duration-300 font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 cursor-pointer"
      >
        Sign Up
      </button>
      <p className="text-gray-600 text-sm mt-6 text-center">
        Already have an account?{" "}
        <span
          onClick={() => setState("login")}
          className="text-primary hover:text-primary-dull hover:underline cursor-pointer font-medium transition-colors duration-200"
        >
          Sign in
        </span>
      </p>
    </form>
  );
};

export default RegisterForm;
