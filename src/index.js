import ReactDOM from "react-dom";
import React from "react";
import Routes from "./routes/routes";
import GlobalStyles from "./styles/globalStyles";
import { ToastContainer } from 'react-toastify';
import { UserProvider } from "./hooks/UserContext";

const rootElement = document.getElementById('root');

ReactDOM.render(
  <>
    <UserProvider>
      <Routes />
    </UserProvider>
    <GlobalStyles autoClose={2000} />
    <ToastContainer />
  </>,
  rootElement
);
