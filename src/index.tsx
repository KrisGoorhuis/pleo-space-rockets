import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { ChakraProvider, CSSReset } from "@chakra-ui/react";

import App from "./components/app";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <ChakraProvider>
        <CSSReset />
        <App />
      </ChakraProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
