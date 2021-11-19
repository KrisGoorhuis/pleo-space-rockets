import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { ChakraProvider, CSSReset } from "@chakra-ui/react";
import { Provider } from 'react-redux'

import store from './redux'
import App from "./components/app";


const { ApolloServer } = require('apollo-server');
const typeDefs = require('./schema');

const server = new ApolloServer({ typeDefs });

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Provider store={store}>
        <ChakraProvider>
          <CSSReset />
          <App />
        </ChakraProvider>
      </Provider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
