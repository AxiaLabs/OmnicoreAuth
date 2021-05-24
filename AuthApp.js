import React, { useState } from "react";
import { useUserContext } from "context/user/UserContext";

// LOGOS
import { ReactComponent as SiliconSlopesLogo } from "assets/svgs/SiliconSlopesLogo.svg";
import { ReactComponent as ServesLogo } from "assets/svgs/ServesLogo.svg";
import { ReactComponent as StartFestLogo } from "assets/svgs/StartFestLogo.svg";
import { ReactComponent as SummitLogo } from "assets/svgs/SummitLogo.svg";

// ROUTES
import AuthenticateUser from "apps/auth/components/AuthenticateUser";
import CreateCustomer from "apps/auth/components/CreateCustomer";
import Validate2FACode from "apps/auth/components/Validate2FACode";
import ForgotPasscode from "apps/auth/components/ForgotPasscode";
import ForgotUserID from "apps/auth/components/ForgotUserID";
import ResetPasscode from "apps/auth/components/ResetPasscode";

const AuthApp = ({
  children,
  authLevel = "user",
  title,
  logo,
  description,
  dark = false,
}) => {

  const [ route, setRoute ] = useState("");
  const [ isLoading, setIsLoading ] = useState(false);
  const { userState } = useUserContext();

  const [email, setEmail] = useState("")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [phone, setPhone] = useState("");
  const [customerID, setCustomerID] = useState("");
  const [authToken, setAuthToken] = useState("");

  const getComponent = (route, setRoute) => {
    switch (route) {
      case "AuthenticateUser":
        return <AuthenticateUser 
          setRoute={setRoute} 
          isLoading={isLoading} 
          setIsLoading={setIsLoading} 
          email={email}
          setEmail={setEmail}
        />;
      case "CreateCustomer":
        return <CreateCustomer 
          setRoute={setRoute} 
          isLoading={isLoading} 
          setIsLoading={setIsLoading} 
          email={email}
          setEmail={setEmail}
          firstName={firstName}
          setFirstName={setFirstName}
          lastName={lastName}
          setLastName={setLastName}
          phone={phone}
          setPhone={setPhone}
          setCustomerID={setCustomerID}
          setAuthToken={setAuthToken}
        />;
      case "Validate2FACode":
        return <Validate2FACode 
          setRoute={setRoute} 
          isLoading={isLoading} 
          setIsLoading={setIsLoading}
          setEmail={setEmail}
          email={email}
          setAuthToken={setAuthToken}
        />;
      case "ResetPasscode":
        return <ResetPasscode 
          setRoute={setRoute} 
          isLoading={isLoading} 
          setIsLoading={setIsLoading} 
          email={email}
          firstName={firstName}
          lastName={lastName}
          phone={phone}
          customerID={customerID}
          authToken={authToken}
        />;
      case "ForgotPasscode":
        return <ForgotPasscode 
          setRoute={setRoute} 
          isLoading={isLoading} 
          setIsLoading={setIsLoading}
          email={email}
          setEmail={setEmail}
        />;
      case "ForgotUserID":
        return <ForgotUserID 
          setRoute={setRoute} 
          isLoading={isLoading} 
          setIsLoading={setIsLoading} 
          email={email}
          setEmail={setEmail}
          firstName={firstName}
          setFirstName={setFirstName}
          lastName={lastName}
          setLastName={setLastName}
          phone={phone}
          setPhone={setPhone}
        />;
      default:
        setRoute("CreateCustomer");
    }
    return null;
  };

  const getLogo = (logo) => {
    switch (logo) {
      case "siliconslopes":
        return (
          <SiliconSlopesLogo
            className="h-24 w-24 m-auto"
            stroke={dark ? "black" : "white"}
            fill={dark ? "black" : "white"}
          />
        );
      case "serves":
        return (
          <ServesLogo
            className="h-24 w-24 m-auto"
            stroke={dark ? "black" : "white"}
            fill={dark ? "black" : "white"}
          />
        );
      case "startfest":
        return (
          <StartFestLogo
            className="h-24 w-24 m-auto"
            fill={dark ? "black" : "white"}
          />
        );
      case "summit":
        return (
          <SummitLogo
            className="h-24 w-24 m-auto"
            stroke={dark ? "black" : "white"}
            fill={dark ? "black" : "white"}
          />
        );
      default:
        return null;
    }
  };

  // VALID REDIRECT
  if (userState.authenticated && userState.authToken) {
    return <>{children}</>;
  }

  return (
    <div className="py-8">
      {/* HEADER */}
      {getLogo(logo)}
      {title && (
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          {title}
        </h2>
      )}
      {description && <p className="mt-2 text-center">{description}</p>}

      {/* COMPONENT */}
      <div className="max-w-md m-auto py-4">
        {getComponent(route, setRoute)}
      </div>
    </div>
  );
};

export default AuthApp;

export const withAuthenticator = (
  Component,
  authLevel,
  title,
  logo,
  description,
  dark
) => {
  return class extends React.Component {
    render() {
      return (
        <AuthApp
          authLevel={authLevel}
          title={title}
          logo={logo}
          description={description}
          dark={dark}
        >
          <Component />
        </AuthApp>
      );
    }
  };
};
