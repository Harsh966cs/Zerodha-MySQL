import React from "react";
import { SignIn } from "@clerk/clerk-react";

const Signin = () => (
  <div className="container p-5 d-flex justify-content-center">
    <SignIn
      routing="path"
      path="/sign-in"
      fallbackRedirectUrl={process.env.REACT_APP_AFTER_SIGN_UP_URL || "/"}
      signUpUrl="/singup"
    />
  </div>
);

export default Signin;
