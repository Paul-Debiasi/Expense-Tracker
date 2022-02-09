import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import App from "./App";
import ExpenseContextProvider from "./components/Context";
import { BrowserRouter } from "react-router-dom";

ReactDOM.render(
	<ExpenseContextProvider>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</ExpenseContextProvider>,
	document.getElementById("root")
);
