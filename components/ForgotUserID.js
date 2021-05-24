import React from "react";
import ForgotUserIDRequest from "api/auth/ForgotUserID";
import { useLayoutContext, setToast } from "context/layout/LayoutContext";
import LoadingButton from "components/LoadingButton";

const ForgotUserID = ({ setRoute, isLoading, setIsLoading, firstName, setFirstName, lastName, setLastName, phone, setPhone }) => {
  const { layoutDispatch } = useLayoutContext();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await ForgotUserIDRequest({ firstName, lastName, phone });
      layoutDispatch(
        setToast(
          response.DisplayMessage
            ? response.DisplayMessage
            : `Success. Your userID is`,
          "green",
          5000
        )
      );
      setRoute("AuthenticateUser");
    } catch (err) {
      layoutDispatch(
        setToast(
          err.DisplayMessage
            ? err.DisplayMessage
            : "Could not find userID. Please contact us at support@siliconslopes.com if this problem persists",
          "red",
          5000
        )
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container-primary">
      <h4 className="pb-4 text-center">Forgot Email</h4>
      <form
        className="gap-4 grid"
        onSubmit={handleSubmit}
        autoComplete="on"
      >
        <div className="">
          <label
            htmlFor="firstName"
            className="block text-sm font-medium text-gray-700"
          >
            First Name
          </label>
          <div className="mt-1">
            <input
              id="firstName"
              name="fname"
              type="string"
              required
              disabled={isLoading}
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="disabled:bg-gray-200 disabled:cursor-wait appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
        </div>

        <div className="">
          <label
            htmlFor="lastName"
            className="block text-sm font-medium text-gray-700"
          >
            Last Name
          </label>
          <div className="mt-1">
            <input
              id="lastName"
              name="lname"
              type="string"
              required
              disabled={isLoading}
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="disabled:bg-gray-200 disabled:cursor-wait appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
        </div>

        <div className="">
          <label
            htmlFor="phone"
            className="block text-sm font-medium text-gray-700"
          >
            Phone Number
          </label>
          <div className="mt-1">
            <input
              required
              disabled={isLoading}
              id="phone"
              name="phone"
              type="tel"
              pattern="[0-9]{10}"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="disabled:bg-gray-200 disabled:cursor-wait appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="text-xs text-gray-500 pl-2">Format. 1234567890</div>
        </div>

        <div className=" col-span-2">
          <LoadingButton isLoading={isLoading} text="Request Lookup" className="w-full" />
        </div>
      </form>

      <div className="mt-6">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">
              Remembered? {" "}
              <button
                className="text-indigo-600"
                onClick={() => setRoute("AuthenticateUser")}
              >
                Sign in
              </button>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotUserID;
