import React, { useState } from "react";
import { useLayoutContext, setToast } from "context/layout/LayoutContext";
import { useUserContext, signIn } from "context/user/UserContext";
import ResetPasscodeRequest from "api/auth/ResetPasscode";
import LoadingButton from "components/LoadingButton";

const ResetPasscode = ({ setRoute, isLoading, setIsLoading, email, firstName, lastName, phone, customerID, authToken }) => {
  const { layoutDispatch } = useLayoutContext();
  const { userDispatch } = useUserContext();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      setIsLoading(true);
      if (password === confirmPassword) {
        setError(false);
        const response = await ResetPasscodeRequest(email, password, authToken);
        handleSuccess()
        layoutDispatch(setToast(
          response.DisplayMessage ? response.DisplayMessage : `Success. New Password set.`,
          "green",
          5000
        ))
      } else {
        setError(true);
      }
    } catch (err) {
      layoutDispatch(setToast(
        err.DisplayMessage ? err.DisplayMessage : "Could Not Set Password. Please contact us at support@siliconslopes.com if this problem persists",
        "red",
        5000
      ))
    } finally {
      setIsLoading(false);
    }
  }

  const handleSuccess = () => {
    if (email && customerID && authToken) {
      userDispatch(signIn({
          CustomerID: customerID,
          CustomerFirstName: firstName,
          CustomerLastName: lastName,
          CustomerEmailAddress1: email,
          CustomerTelephone1: phone
        },
        authToken
      ));
    } else {
      setRoute("AuthenticateUser");
    };
  };

  return (
    <div className="container-primary">
      <h4 className="mb-4 text-center">Set Password</h4>
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <div className="mt-1">
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="new-password"
              required
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              className="no-arrows appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
        </div>
        <div>
          <label
            htmlFor="new-password"
            className="block text-sm font-medium text-gray-700"
          >
            Confirm Password
          </label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <input
              id="confirmPassword"
              name="new-password"
              type="password"
              autoComplete="new-password"
              required
              onChange={(e) => setConfirmPassword(e.target.value)}
              value={confirmPassword}
              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />

            <div className={`${error ? "flex" : "hidden"} absolute inset-y-0 right-0 pr-3 items-center pointer-events-none error`}>
              <svg
                className="h-5 w-5 text-red-500"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
          <p className={`${error ? "" : "hidden"} mt-2 text-sm text-red-600`} id="email-error">
            Passwords do not match
          </p>
        </div>

        <div>
          <LoadingButton isLoading={isLoading} text="Reset Password" className="w-full" />
        </div>
      </form>
    </div>
  );
};

export default ResetPasscode;
