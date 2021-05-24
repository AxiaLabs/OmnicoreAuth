import React, { useState } from "react";
import { useUserContext, signIn } from "context/user/UserContext";
import { useLayoutContext, setToast } from "context/layout/LayoutContext";
import AuthenticateUserRequest from "api/auth/AuthenticateUser";
import LoadingButton from "components/LoadingButton";

const AuthenticateUser = ({ setRoute, isLoading, setIsLoading, email, setEmail }) => {
  const { userDispatch } = useUserContext();
  const { layoutDispatch } = useLayoutContext();

  const [passcode, setPasscode] = useState("");
  const [keepSignedIn, setKeepSignedIn] = useState(true);

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {  
      setIsLoading(true);
      const response = await AuthenticateUserRequest(email, passcode);
      userDispatch(signIn(response, response.TRMKey, keepSignedIn ));
      layoutDispatch(setToast(
        `Successfully logged In as ${email}`,
        "green",
        2000
      ));
    } catch (err) {
      layoutDispatch(setToast(
        err.DisplayMessage ? err.DisplayMessage : "Could Not Log You In.",
        "red",
        7000
      ))
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container-primary">
      <h4 className="mb-4 text-center">Sign In</h4>
      <form className="space-y-6" onSubmit={handleSignIn}>
        <div>
          <label
            htmlFor="username"
            className="block text-sm font-medium text-gray-700"
          >
            Email address
          </label>
          <div className="mt-1">
            <input
              required
              name="username"
              type="email"
              autoComplete="username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <div className="mt-1">
            <input
              required
              name="password"
              type="password"
              autoComplete="password"
              value={passcode}
              onChange={(e) => setPasscode(e.target.value)}
              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input
              id="remember_me"
              name="remember_me"
              type="checkbox"
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              defaultChecked={keepSignedIn}
              onClick={() => setKeepSignedIn(!keepSignedIn)}
            />
            <label
              htmlFor="remember_me"
              className="ml-2 block text-sm text-gray-900"
            >
              Keep me signed in
            </label>
          </div>

          <div className="text-sm">
            {/* Forgot&nbsp; */}
            {/* <button type="button" className="text-indigo-500" onClick={() => setRoute("ForgotUserID")}>Email</button>
            &nbsp;/&nbsp; */}
            <button type="button" className="text-indigo-500" onClick={() => setRoute("ForgotPasscode")}>Forgot Password</button>
            &nbsp;?
          </div>
        </div>

        <div>
          <LoadingButton isLoading={isLoading} text="Sign In" className="w-full" />
        </div>
      </form>

      <div className="mt-6">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">
              Don't have an account?{" "}
              <button
                className="text-indigo-600"
                onClick={() => setRoute("CreateAccount")}
              >
                Register For Account
              </button>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthenticateUser 