import { createContext, useState, useEffect } from "react";



export const ExpenseContext = createContext();

export default function ExpenseContextProvider({ children }) {
	const initialExpenses = JSON.parse(
		window.localStorage.getItem("expense") 
	);

	const [expense, setExpense] = useState(initialExpenses);
	const [show, setShow] = useState(false);


	const [addData, setAddData] = useState()
	useEffect(() => {
		window.localStorage.setItem("expense", JSON.stringify(expense));


	}, [expense]);

	return (

		<ExpenseContext.Provider value={{ expense, setExpense, show, setShow, addData, setAddData }}>
			{children}
		</ExpenseContext.Provider>
	);
}
