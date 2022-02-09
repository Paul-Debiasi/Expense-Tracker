import { createContext, useState, useEffect } from "react";



export const ExpenseContext = createContext();

export default function ExpenseContextProvider({ children }) {
	const initialExpenses = JSON.parse(
		// window.localStorage.getItem("expense") || "[]",
		window.localStorage.getItem("expense") 
	);

	const [expense, setExpense] = useState(initialExpenses);

	//TODO To set the selected data to the storage
	const [addData, setAddData] = useState()
	useEffect(() => {
		window.localStorage.setItem("expense", JSON.stringify(expense));


	}, [expense]);

	return (
		<ExpenseContext.Provider value={ {expense, setExpense, addData, setAddData} }>
			{children}
		</ExpenseContext.Provider>
	);
}
