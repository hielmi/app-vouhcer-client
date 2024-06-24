import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import VoucherProvider from "./context/VoucherContext.tsx";
import UserProvider from "./context/UserContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <head>
      <script src="https://unpkg.com/boxicons@2.1.4/dist/boxicons.js"></script>
    </head>
    <UserProvider>
      <VoucherProvider>
        <App />
      </VoucherProvider>
    </UserProvider>
  </React.StrictMode>
);
