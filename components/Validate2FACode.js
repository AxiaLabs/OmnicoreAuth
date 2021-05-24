import React, { useState } from "react";
import Validate2FACodeRequest from "api/auth/Validate2FACode";
import { useLayoutContext, setToast } from "context/layout/LayoutContext";
import LoadingButton from "components/LoadingButton";


const Validate2FACode = ({ setRoute, isLoading, setIsLoading, setEmail, email, setAuthToken }) => {
  const { layoutDispatch } = useLayoutContext();

  const [code, setCode] = useState("");

  const handleConfirm = async (e, code ,message) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const response = await Validate2FACodeRequest(email, code);
      layoutDispatch(setToast(
        response.DisplayMessage ? response.DisplayMessage : `Success. Please Set Your Password`,
        "green",
        5000
      ))
      setAuthToken(response.TRMKey);
      setRoute("ResetPasscode");
    } catch (err) {
      layoutDispatch(setToast(
        message ? message : err.DisplayMessage ? err.DisplayMessage : "Invalid Code. Please contact us at if this problem persists",
        message ? "green" : "red",
        10000
      ))
    } finally {
      setIsLoading(false);
    }
  };

  const getNewCode = e => {
    handleConfirm(e, code, "We have resent you a new code.")
    setCode("");
  }

  return (
    <div className="container-primary">
      <h4 className="text-center">Enter 2 Factor Authentication Code</h4>
      <div className="text-xs text-gray-400 text-center mb-4">This code can take up to 5 minutes to arrive. 
          <button className="text-indigo-700" type="button" onClick={getNewCode}>&nbsp;Get a new code</button>
      </div>
      <form className="space-y-6" onSubmit={e => handleConfirm(e, code)}>
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >Email</label>
          <input
            required
            type="email"
            name="email"
            onChange={e => setEmail(e.target.value)}
            value={email}
            className="input-primary"
          />
        </div>
        <div className="">
          <label
            htmlFor="2FA"
            className="block text-sm font-medium text-gray-700"
          >6 Digit Code</label>
          <input
            required
            type="text"
            name="2FA"
            pattern="^[0-9]{6,6}$"
            onChange={e => setCode(e.target.value)}
            value={code}
            className="input-primary"
          />
        </div>
        <div>
          <LoadingButton isLoading={isLoading} text="Confirm Account" className="w-full" />
        </div>
        <div className="text-xs text-gray-400 text-center"> 
          <button className="text-indigo-700" type="button" onClick={() => setRoute("AuthenticateUser")}>Back to sign In</button>
        </div>
      </form>
    </div>
  );
};

export default Validate2FACode;
