import { useContext, useEffect, useState, useRef } from "react";
import { ExpenseContext } from "./Context";
import "./BarChart.scss";
import * as d3 from "d3";
import { Link } from "react-router-dom";

const useResizeObserver = (ref) => {
	const [dimensions, setDimensions] = useState(null);

	useEffect(() => {
		const observeTarget = ref.current;
		const resizeObserver = new ResizeObserver((entries) => {
			entries.forEach((entry) => {
				setDimensions(entry.contentRect);
			});
		});
		resizeObserver.observe(observeTarget);
		return () => {
			resizeObserver.unobserve(observeTarget);
		};
	}, [ref]);
	return dimensions;
};

const createDebouncer = () => {
	let timeout = null;
	return (callback) => {
		if (timeout) clearTimeout(timeout);
		timeout = setTimeout(() => {
			callback();
			clearTimeout(timeout);
		}, 500);
	};
};
const debounce = createDebouncer();

export default function BarChart({ entries }) {
	const [chartData, setChartData] = useState([]);
	const svgRef = useRef();
	const { expense } = useContext(ExpenseContext);

	const chartExpenses = expense.map((item) => {
		return item.expenses
			? { category: item?.category, amount: item?.amount }
			: "";
	});

	const filteredChart = chartExpenses.filter((item) => item && true);

	const amountCount = filteredChart.reduce((amCount, item) => {
		const countedAmount = amCount.find(
			(amount) => amount.category === item.category
		);
		if (countedAmount) {
			countedAmount.amount += item.amount;
		} else amCount.push({ category: item.category, amount: item.amount });
		return amCount;
	}, []);

	console.log(amountCount);
	const w = 600;
	const h = 300;
	useEffect(() => {
		const DrawChart = async () => {
			setChartData([...amountCount]);
			const svg = d3.select(svgRef.current);
			const findMax = chartData.map((item) => item.amount);
			let max = Math.max(...findMax);
			const xScale = d3
				.scaleBand()
				.domain(chartData.map((item, index) => index))
				.range([0, w])
				.padding(0.5);
			const yScale = d3
				.scaleLinear()
				.domain([max + 100, 0])
				.range([0, h]);
			const xAxis = d3.axisBottom(xScale).ticks((d) => d.category);
			const color = d3.scaleOrdinal().range([d3.schemeSet2])();
			const yAxis = d3.axisLeft(yScale);
			svg
				.select(".x-axis")
				.style("transform", "translateY(300px)")
				.call(xAxis)
				.style("font", "16px times");
			svg
				.select(".y-axis")
				.style("transform", "translateX(0px)")
				.call(yAxis)
				.style("font", "16px times");
			svg
				.append("g")
				.attr("class", "grid1")
				.attr("transform", `translate(0,${h})`)
				.call(d3.axisBottom(xScale).tickSize(-h).tickFormat(""));
			svg
				.append("g")
				.attr("class", "grid1")
				.call(d3.axisRight(yScale).tickSize(w).tickFormat(""));
			svg
				.selectAll(".bar")
				.data(chartData.map((item) => item.amount))
				.join("rect")
				.attr("class", "bar")
				.attr("x", (item, indx) => xScale(indx))
				.attr("y", yScale)
				.attr("width", xScale.bandwidth())
				.attr("height", (val) => h - yScale(val))
				.attr("fill", (d, i) => color[i]);
		};

		// debounce(DrawChart);
		DrawChart();
	}, [expense]);
	return (
		<div className='BarChart'>
			Bar Chart
			<Link to={"/"}> Pie chart</Link>
			<svg ref={svgRef}>
				<g className='x-axis' />
				<g className='y-axis' />
			</svg>
		</div>
	);
}
