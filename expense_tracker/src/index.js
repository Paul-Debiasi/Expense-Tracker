import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import App from "./App";
import ExpenseContextProvider from "./components/Context";
import { BrowserRouter } from "react-router-dom";


ReactDOM.render(
	<BrowserRouter>
		<ExpenseContextProvider>
			<App />
		</ExpenseContextProvider>
	</BrowserRouter>,
	document.getElementById("root")
);
