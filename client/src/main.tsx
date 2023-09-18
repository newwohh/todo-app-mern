import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";

const query = new QueryClient();
ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <QueryClientProvider client={query}>
      <App />
    </QueryClientProvider>
  </BrowserRouter>
);
