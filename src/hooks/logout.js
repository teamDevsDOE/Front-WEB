import React from "react";
import { Redirect } from "react-router-dom";


const Logout = () => {
  localStorage.removeItem("hemocentro:userData");

  return <Redirect to="/login" />;
};

export default Logout;
