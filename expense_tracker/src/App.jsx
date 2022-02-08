import React from 'react';
import "./App.scss";
import { useContext } from "react";
import { ExpenseContext } from "./components/Context";
import EntryList from "./components/EntryList";
import { v4 as uuidv4 } from "uuid";
import moment from "moment";
import { useEffect } from 'react';

function App() {

	const timing = moment().format('L');
	const { setExpense, expense } = useContext(ExpenseContext);

useEffect(() => {

	setExpense( [
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
		}])}, [])

	console.log("Expenses", expense);
	return <div className='App'><EntryList /></div>;
}

export default App;
