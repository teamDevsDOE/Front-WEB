import React from "react";
import ReactDOM from "react-dom";
import Routes from "./routes/routes";
import GlobalStyles from "./styles/globalStyles";

import { ToastContainer } from 'react-toastify';
import { UserProvider } from "./hooks/UserContext";


ReactDOM.render(

  <>
    <UserProvider>
      <Routes />
    </UserProvider>
    <GlobalStyles autoClose={2000} />
    <ToastContainer />
  </>,


  document.getElementById('root')


)