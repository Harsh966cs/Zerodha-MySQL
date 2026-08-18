import React, { useEffect } from "react";
import Dashboard from "./Dashboard";
import TopBar from "./TopBar";
import {  useAuth } from "@clerk/clerk-react";


const Home = () => {
  
  return (
    <>
       
      <TopBar />
      <Dashboard />

    </>
  );
};

export default Home;
