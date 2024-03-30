// React
import React from "react";
import ReactDOM from "react-dom/client";

// Styles
import "./index.css";

// Components
import App from "./App.jsx";

// Providers
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "react-query";

// Store
import store from "./redux/store.js";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <App />
      </Provider>
    </QueryClientProvider>
  </React.StrictMode>
);
