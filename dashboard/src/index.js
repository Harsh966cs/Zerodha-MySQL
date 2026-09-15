import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./index.css";
import Home from "./components/Home";
import { ClerkProvider, useAuth } from "@clerk/clerk-react";

const root = ReactDOM.createRoot(document.getElementById("root"));

const clerkPublishableKey = process.env.REACT_APP_CLERK_PUBLISHABLE_KEY;
const afterSignUpUrl = process.env.REACT_APP_AFTER_SIGN_UP_URL || "/";
const frontendUrl = process.env.REACT_APP_FRONTEND_URL || "http://localhost:3000";

function AuthGate({ children }) {
  const { isSignedIn } = useAuth();

  useEffect(() => {
    if (isSignedIn === false) {
      window.location.assign(frontendUrl);
    }
  }, [isSignedIn]);

  if (!isSignedIn) {
    // covers both isSignedIn === undefined (still loading)
    // and isSignedIn === false (not signed in, redirect in flight)
    return null;
  }

  return children;
}

root.render(
  <React.StrictMode>
    <ClerkProvider
      publishableKey={clerkPublishableKey}
      signUpFallbackRedirectUrl={afterSignUpUrl}
      signInFallbackRedirectUrl={afterSignUpUrl}
    >
      <AuthGate>
        <BrowserRouter>
          <Routes>
            <Route path="/*" element={<Home />} />
          </Routes>
        </BrowserRouter>
      </AuthGate>
    </ClerkProvider>
  </React.StrictMode>
);