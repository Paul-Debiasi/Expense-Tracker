import React, { useContext, useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import moment from "moment";
// import context component
import { ExpenseContext } from "./Context";

// Import Bootstrap components
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";

// import MDB components
import {
  MDBBtn,
  MDBIcon,
  MDBInputGroup,
  MDBInputGroupText,
  MDBInputGroupElement,
  MDBInput,
} from "mdb-react-ui-kit";

// import kareem components
import DropDown from "./UI/dropDown";

// Import the fake data file
import fakeData from "./fakeData.json";

// Change the setExpense to "set the selected stuff"

// NOTE add button will send the selected data to other component using context

export default function Overview() {
  const { expense, setExpense } = useContext(ExpenseContext);

  // const timing = moment().format("LLLL");

  // set the user selected category from the dropDown menu
  const [categorySelected, setCategorySelected] = useState("Category");
  // set the state when the user select the category "Just to change the display name of the dropDown menu"
  const [option, setOption] = useState("Please Select Option");
  // set this isSelected to true only when the user select one of the options to activate the category
  const [isSelected, setIsSelected] = useState(false);
  // set the current date
  const [date, setDate] = useState("");
  // set amount
  const [amount, setAmount] = useState(0);

  // set the selected data an array contain one object "it might change to just object"
  const [test, setTest] = useState([]);

  const [state, setState] = useState([]);

  const expensesArray = ["House", "Car", "Leisure Time", "Groceries", "Other"];
  const incomeArray = ["Salary", "Other"];

  const [isExpenses, setIsExpenses] = useState();

  // console.log('stateis:', state);
  // const [amount, setAmount] = useState();
  // const [currentDate, setCurrentDate] = useState();

  useEffect(() => {
    setExpense([...expense, ...state]);
  }, [state]);

  let timing = moment().format("DD.MM.YYYY");

  console.log("Expenses", expense);

  const categorySelectHandler = (e) => {
    setCategorySelected(e);
  };

  const setTestHandler = (e) => {
    setTest([e]);
  };

  const setDateHandler = (e) => {
    setDate(e);
  };

  const setStateHandler = (e) => {
    const oldData = [...state];
    setState([...oldData, e]);
  };

  console.log("State Now is ", state);
  console.log("Date is", date);

  return (
    <div>
      <section className="header">
        <Button variant="primary" size="lg" active className="mt-5">
          Expenses
        </Button>
        <h1 className="display-1">Dashboard</h1>
      </section>
      <section className="d-flex justify-content-center  mt-5">
        <Dropdown className="">
          <DropdownButton
            title={option}
            variant="primary"
            id="dropdown-basic"
            onSelect={(e) => {
              setIsSelected(true);
              setOption(e);
              // option === 'Expenses' ? console.log(option) : 0
              if (e === "Expenses") setIsExpenses(true);
              else if (e === "Income") setIsExpenses(false);
            }}
          >
            <Dropdown.Item eventKey="Expenses">Expenses</Dropdown.Item>
            <Dropdown.Item eventKey="Income">Income</Dropdown.Item>
          </DropdownButton>
        </Dropdown>
        <Dropdown className="mx-3" onSelect={categorySelectHandler}>
          <DropdownButton
            title={categorySelected}
            variant="success"
            disabled={!isSelected}
          >
            {option === "Expenses"
              ? expensesArray.map((expense, idx) => {
                  return (
                    <DropDown
                      key={idx}
                      eventKey={expense}
                      onClick={() => {
                        setTestHandler(expense);
                      }}
                      option={expense}
                    />
                  );
                })
              : incomeArray.map((option, idx) => {
                  return (
                    <DropDown
                      key={idx}
                      eventKey={option}
                      onClick={() => {
                        setTestHandler(option);
                      }}
                      option={option}
                    />
                  );
                })}
          </DropdownButton>
        </Dropdown>

        <div className="mx-3">
          <MDBInputGroup className="mb-3">
            <MDBInputGroupElement
              type="text"
              // placeholder="Recipient's username"
              // label={!test ? "Date" : test?.timing}
              label={"Date"}
              placeholder={date ? date : "DD.MM.YY"}
              id="formControlDisabled"
              type="text"
              onChange={(e) => setDate(e.target.value)}
              // disabled
            />
            <MDBBtn outline onClick={() => setDate(timing)}>
              Today
            </MDBBtn>
          </MDBInputGroup>
        </div>
        <div className="mx-3">
          <MDBInput
            label={"Amount"}
            id="formControlDisabled"
            type="text"
            onChange={(e) => setAmount(Number(e.target.value))}
            // disabled={option !== "Income"}
          />
        </div>
        <MDBBtn
          onClick={() => {
            setStateHandler({
              id: uuidv4(),
              timing: date,
              amount: amount,
              category: categorySelected,
              expenses: isExpenses,
            });
          }}
          disabled={!(amount !== 0)}
        >
          Add
        </MDBBtn>
      </section>
      <section className="container">
        {state.map((item, idx) => {
          return (
            <section
              key={idx}
              className="row my-5 "
              style={{ border: "2px solid" }}
            >
              <div className="col">{item.category}</div>
              <div className="col text-center">{item.timing}</div>
              <div className="col text-center">{item.amount}</div>
            </section>
          );
        })}
      </section>
    </div>
  );
}
