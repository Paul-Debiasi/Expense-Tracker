import "./App.scss";
import { useContext, useEffect } from "react";
import { ExpenseContext } from "./components/Context";
import { v4 as uuidv4 } from "uuid";
import moment from "moment";
import Expenses from "./components/Expenses";

function App() {
	const timing = moment().format("LLLL");
	const { expense, setExpense } = useContext(ExpenseContext);
	useEffect(() => {
		setExpense([
			{
				id: uuidv4(),
				timing: timing,
				category: "House",
				amount: 800,
				expenses: true,
			},
			{
				id: uuidv4(),
				timing: timing,
				category: "Car",
				amount: 70,
				expenses: true,
			},
			{
				id: uuidv4(),
				timing: timing,
				category: "Car",
				amount: 200,
				expenses: true,
			},
			{
				id: uuidv4(),
				timing: timing,
				category: "Other",
				amount: 250,
				expenses: true,
			},
			{
				id: uuidv4(),
				timing: timing,
				category: "Leisure Time",
				amount: 100,
				expenses: true,
			},
			{
				id: uuidv4(),
				timing: timing,
				category: "Groceries",
				amount: 300,
				expenses: true,
			},
			{
				id: uuidv4(),
				timing: timing,
				category: "Salary",
				amount: 2500,
				expenses: false,
			},
			{
				id: uuidv4(),
				timing: timing,
				category: "Groceries",
				amount: 80,
				expenses: true,
			},
			{
				id: uuidv4(),
				timing: timing,
				category: "Other",
				amount: 80,
				expenses: false,
			},

			{
				id: uuidv4(),
				timing: timing,
				category: "Other",
				amount: 1000,
				expenses: true,
			},
		]);
	}, []);
	console.log("Expenses", expense);
	return (
		<div className='App'>
			<Expenses />
		</div>
	);
}

export default App;
