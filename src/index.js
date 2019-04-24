import React from "react";
import ReactDOM from "react-dom";
import App from "./components/app";
import { ApiServiceProvider } from "./components/api-service-context";
import { MohomeApiService, TestService } from "./services";

const apiService = new TestService();
ReactDOM.render(
    <ApiServiceProvider value={apiService}>
        <App />
    </ApiServiceProvider>,
    document.getElementById("root")
);
