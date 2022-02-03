import "./App.scss";
import { useContext } from "react";
import { ExpenseContext } from "./components/Context";
function App() {
	const { expense } = useContext(ExpenseContext);
	console.log("Expenses", expense);
	return <div className='App'></div>;
}

export default App;
