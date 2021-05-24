import CreateCustomerRequest from "api/auth/CreateCustomer";
import React from "react";
import { useLayoutContext, setToast } from "context/layout/LayoutContext";
import LoadingButton from "components/LoadingButton";

const CreateCustomer = ({ setRoute, isLoading, setIsLoading, email, setEmail, firstName, setFirstName, lastName, setLastName, phone, setPhone, setCustomerID, setAuthToken }) => {
  const { layoutDispatch } = useLayoutContext();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await CreateCustomerRequest(firstName, lastName, email, phone);
      setCustomerID(response.CustomerID);
      setAuthToken(response.TRMKey)
      layoutDispatch(
        setToast(
          response.DisplayMessage
            ? response.DisplayMessage
            : `Success`,
          "green",
          5000
        )
      );
      setRoute("Validate2FACode");
    } catch (err) {
      layoutDispatch(
        setToast(
          err.DisplayMessage
            ? err.DisplayMessage
            : "Could not create account. Please contact us at support@siliconslopes.com if this problem persists",
          "red",
          10000
        )
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container-primary">
      <h4 className="mb-4 text-center">Create Account</h4>
      <form
        className=" gap-4 grid grid-cols-2"
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
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email Address
          </label>
          <div className="mt-1">
            <input
              id="email"
              name="email"
              type="email"
              required
              disabled={isLoading}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="disabled:bg-gray-200 disabled:cursor-wait appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="text-xs text-gray-500 pl-2">Personal email recommended</div>
        </div>
        <div className="">
          <label
            htmlFor="phone"
            className="block text-sm font-medium text-gray-700"
          >
            Mobile Number
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
              className="input-primary"
            />
          </div>
          <div className="text-xs text-gray-500 pl-2">Format: 1234567890</div>
        </div>
        <div className="items-center justify-between col-span-2">
          {/* <div className="flex items-center w-full mb-2">
            <input
              id="remember_me"
              name="remember_me"
              type="checkbox"
              className="cursor-pointer h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            <label
              htmlFor="remember_me"
              className="ml-2 block text-sm text-gray-900"
            >
              Yes, I want to receive emails from{" "}
              <Link to="/">Silicon Slopes</Link>
            </label>
          </div> */}
          <div className="flex items-center">
            <input
              required
              id="agree"
              name="agree"
              type="checkbox"
              className="cursor-pointer h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            <label htmlFor="agree" className="ml-2 block text-sm text-gray-900">
              I understand and agree to the{" "}
              {/* <a href="/termsandconditions" target="_blank">
                Terms & Condition
              </a>{" "}
              and our{" "} */}
              <a href="/datapolicy" target="_blank">
                Data Policy
              </a>
            </label>
          </div>
        </div>

        <div className=" col-span-2">
          <LoadingButton isLoading={isLoading} text="Create Account"  className="w-full"/>
        </div>
      </form>

      <div className="mt-6">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">
              Already have an account?{" "}
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

export default CreateCustomer;
