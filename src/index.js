import { StrictMode } from "react";
import ReactDOM from "react-dom";

import App from "./App";
import './index.css';
const root = ReactDOM.createRoot(document.getElementById('root'));
const rootElement = document.getElementById("root");
root.render(
  <StrictMode>
    <App />
  </StrictMode>,
  rootElement
);

