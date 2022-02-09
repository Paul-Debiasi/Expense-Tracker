import { useContext, useEffect, useState, useRef } from "react";
import { ExpenseContext } from "./Context";
import * as d3 from "d3";
import { Link } from "react-router-dom";

export default function PieChart({ tot }) {
	const [data, setData] = useState([]);
	const svgRef = useRef();
	const { expense } = useContext(ExpenseContext);

	const mappedExpenses = expense.map((item) => {
		return item.expenses
			? { category: item?.category, amount: item?.amount }
			: "";
	});

	const filteredExpenses = mappedExpenses.filter((item) => item && true);

	const amountCount = filteredExpenses.reduce((amCount, item) => {
		//Manipulating the data to use in the chart (new array of OBJ)
		const countedAmount = amCount.find(
			(amount) => amount.category === item.category
		);
		if (countedAmount) {
			countedAmount.amount += item.amount;
		} else amCount.push({ category: item.category, amount: item.amount });

		return amCount;
	}, []);

	useEffect(() => {
		setData([...amountCount]);
		const w = 300;
		const h = 300;
		const radius = w / 2;
		const arcGenerator = d3.arc().innerRadius(0).outerRadius(radius);
		const svg = d3

			.select(svgRef.current)
			.attr("width", w)
			.attr("height", h)
			.attr("overflow", "visible")
			.attr("margin-top", 50);
		const pieData = d3.pie().value((item) => item.amount)(amountCount);

		const color = d3.scaleOrdinal().range([d3.schemeSet2])();

		const label = d3.arc().outerRadius(radius).innerRadius(60);

		svg
			.selectAll()
			.data(pieData)
			.join("path")
			.attr("d", arcGenerator)
			.attr("class", "deviceArc")
			.attr("fill", (d, i) => color[i])
			.attr("transform", "translate(" + w / 2 + "," + h / 2 + ")")
			.attr("id", (d, i) => "deviceArc" + i) //Unique id for each slice
			.attr("stroke", "white")
			.style("stroke-width", "2px");

		svg
			.selectAll(".textDevice")
			.data(pieData)
			.enter()
			.append("text")
			.attr("transform", function (d) {
				return `translate(${
					label.centroid(d)[0] + w / 2
				}, ${label.centroid(d)[1] + h / 2}   )`;
			})
			.attr("text-anchor", "middle")
			.style("font", "16spx times")
			.attr("fill", "black")
			.text(function (d) {
				const per = `${Math.trunc((d.data.amount * 100) / tot)}%`;
				return per;
			});
		//  ;
	}, [expense]);
	return (
		<div>
			<Link to={"/bar"}> Bar chart</Link>
			<svg ref={svgRef}></svg>
		</div>
	);
}
