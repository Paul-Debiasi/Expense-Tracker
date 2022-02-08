import "./App.scss";
import { useContext } from "react";
import { ExpenseContext } from "./components/Context";
import Overview from "./components/Overview";
import ExpenseContextProvider from "./components/Context.jsx";
import Test from './components/test'


function App() {
  const { expense } = useContext(ExpenseContext);
//   console.log("Expenses", expense);
  return (
    <div className="App">
	 
      <Overview />
      <ExpenseContextProvider />
    </div>
  );
}

export default App;
