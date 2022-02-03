import { createContext, useState, useEffect } from "react";

export const ExpenseContext = createContext();

export default function ExpenseContextProvider({ children }) {
	const initialExpenses = JSON.parse(
		window.localStorage.getItem("expense") || "[]"
	);
	const [expense, setExpense] = useState(initialExpenses);

	useEffect(() => {
		window.localStorage.setItem("expense", JSON.stringify(expense));
	}, [expense]);

	return (
		<ExpenseContext.Provider value={{ expense, setExpense }}>
			{children}
		</ExpenseContext.Provider>
	);
}
