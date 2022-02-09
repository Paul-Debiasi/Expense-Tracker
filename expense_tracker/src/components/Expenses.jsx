import { useContext } from "react";
import ExpenseContextProvider from "./Context";
import PieChart from "./PieChart";
import BarChart from "./BarChart";
import { ExpenseContext } from "./Context";
import "./Expenses.scss";
import { Switch, Route } from "react-router-dom";

export default function Expenses() {
	const { expense } = useContext(ExpenseContext);

	const calcBudget = expense?.reduce((acc, item) => {
		if (item.expenses === true) {
			return (acc -= item.amount);
		} else if (item.expenses === false) {
			return (acc += item.amount);
		}
		return acc;
	}, 0);

	console.log(calcBudget);

	const calExpenses = expense.reduce((acc, item) => {
		if (item.expenses) {
			return (acc += item.amount);
		}
		return acc;
	}, 0);

	const calEntries = expense.reduce((acc, item) => {
		if (!item.expenses) {
			return (acc += item.amount);
		}
		return acc;
	}, 0);
	const house = expense.filter((item) => item.category === "House");

	const houseExpenses = house.reduce((acc, item) => {
		if (item.expenses) {
			return (acc += item.amount);
		}
		return acc;
	}, 0);

	const car = expense.filter((item) => item.category === "Car");

	const carExpenses = car.reduce((acc, item) => {
		if (item.expenses) {
			return (acc += item.amount);
		}
		return acc;
	}, 0);

	const groceries = expense.filter((item) => item.category === "Groceries");

	const groceriesExpenses = groceries.reduce((acc, item) => {
		if (item.expenses) {
			return (acc += item.amount);
		}
		return acc;
	}, 0);

	const leisure = expense.filter((item) => item.category === "Leisure Time");

	const leisureExpenses = leisure.reduce((acc, item) => {
		if (item.expenses) {
			return (acc += item.amount);
		}
		return acc;
	}, 0);

	const other = expense.filter((item) => item.category === "Other");

	const otherExpenses = other.reduce((acc, item) => {
		if (item.expenses) {
			return (acc += item.amount);
		}
		return acc;
	}, 0);
	return (
		<div className='Expenses'>
			<div className='ExpensesContainer'>
				<h2>Expenses</h2>
				<div className='ExpenseReview'>
					<h3>
						Tot Budget :
						<span style={{ color: calcBudget > 0 ? "#198754" : "#dc3545 " }}>
							{calcBudget} €
						</span>{" "}
					</h3>

					<h3>
						Tot Expenses :
						<span style={{ color: calExpenses > 0 ? "#198754" : "#dc3545 " }}>
							{calExpenses} €
						</span>{" "}
					</h3>
					<h3>
						Tot Entries :
						<span style={{ color: calEntries > 0 ? "#198754" : "#dc3545 " }}>
							{calEntries} €
						</span>{" "}
					</h3>
				</div>

				<div className='ExpensesChart'></div>
				{/* <ExpenseContextProvider> */}

				<PieChart
					tot={calExpenses}
					car={carExpenses}
					house={houseExpenses}
					groceries={groceriesExpenses}
					leisure={leisureExpenses}
					other={otherExpenses}
				/>

				<Switch>
					<Route exact path='/expenses/bar'>
						<BarChart
							entries={calEntries}
							tot={calExpenses}
							car={carExpenses}
							house={houseExpenses}
							groceries={groceriesExpenses}
							leisure={leisureExpenses}
							other={otherExpenses}
						/>
					</Route>
				</Switch>
			</div>
		</div>
	);
}
