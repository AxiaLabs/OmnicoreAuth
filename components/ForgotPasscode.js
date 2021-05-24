import React from "react";
import LoadingButton from "components/LoadingButton";
import ForgotPasscodeRequest from "api/auth/ForgotPasscode";
import { useLayoutContext, setToast } from "context/layout/LayoutContext";

const ForgotPasscode = ({ setRoute, isLoading, setIsLoading, email, setEmail }) => {
  const { layoutDispatch } = useLayoutContext();

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const response = await ForgotPasscodeRequest(email);
      layoutDispatch(setToast(
        response.DisplayMessage ? response.DisplayMessage : "Please Enter 6 digit code.",
        "green",
        10000
      ));
      setRoute("Validate2FACode")
    } catch (err) {
      layoutDispatch(setToast(
        err.DisplayMessage ? err.DisplayMessage : "There was an error. Please contact us if this problem persists",
        "red",
        7000
      ));
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="container-primary">
      <h4 className="mb-4 text-center">Forgot Password</h4>
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email address
          </label>
          <div className="mt-1">
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
        </div>

        <div>
          <LoadingButton isLoading={isLoading} text="Request Password Reset" className="w-full" />
        </div>
      </form>

      <div className="mt-6">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">
              Remembered? <button className="text-indigo-600" onClick={() => setRoute("AuthenticateUser")}>Sign in</button>
            </span>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">
              Already Have A Code? <button className="text-indigo-600" onClick={() => setRoute("Validate2FACode")}>Enter Code</button>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPasscode;