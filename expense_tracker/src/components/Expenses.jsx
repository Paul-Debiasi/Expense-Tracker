import { useContext } from "react";
import PieChart from "./PieChart";
import BarChart from "./BarChart";
import { ExpenseContext } from "./Context";
import { BsFillHouseFill } from "react-icons/bs";
import { AiFillCar } from "react-icons/ai";
import { MdLocalGroceryStore } from "react-icons/md";
import { FaUmbrellaBeach } from "react-icons/fa";
import { Switch, Route, useLocation, Link } from "react-router-dom";

export default function Expenses() {
	const { expense } = useContext(ExpenseContext);

	const calcBudget = expense?.reduce((acc, item) => {
		if (item.expenses) {
			return (acc -= item.amount);
		} else if (!item.expenses) {
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
			<h2>Expenses</h2>
			<div className='ExpenseReview'>
				<h3>
					Budget <span>{calcBudget} $</span>{" "}
				</h3>

				<h3>
					Tot Expenses <span>{calExpenses} $</span>{" "}
				</h3>
				<h3>
					Tot Entries <span>{calEntries} $</span>{" "}
				</h3>
			</div>

			<div className='ExpensesChart'></div>
			<Switch>
				<Route exact path='/'>
					<PieChart tot={calExpenses} />
				</Route>
				<Route exact path='/bar'>
					<BarChart entries={calEntries} />
				</Route>
			</Switch>

			<div className='detailsReview'>
				<ul>
					<li>
						<AiFillCar />
						{carExpenses} $
					</li>
					<li>
						{" "}
						<BsFillHouseFill />
						{houseExpenses} $
					</li>
					<li>
						<MdLocalGroceryStore />
						{groceriesExpenses} $
					</li>
					<li>
						<FaUmbrellaBeach />
						{leisureExpenses} $
					</li>
					<li>{`Other ${otherExpenses} $`}</li>
				</ul>
			</div>
		</div>
	);
}
