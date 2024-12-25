import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "mobx-react"; 
import App from "./App.jsx";
import wordStore from "./stores/WordStore"; 
import "./styles/index.scss";


createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider wordStore={wordStore}>
      <App />
    </Provider>
  </StrictMode>
);
