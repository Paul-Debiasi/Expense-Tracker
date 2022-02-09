import React, { useState, useEffect, useContext, createContext } from "react";
import "./EntryList.css";
import { ExpenseContext } from "./Context";
// import fakeData from './FakeData';
import { VscEdit } from "react-icons/vsc";
import { FiDelete } from "react-icons/fi";

// importing modal
import Modal from "./UI/modal"
function EntryList() {
  // const [expense, setExpense] = useState(initialExpenses);
  const { setExpense, expense } = useContext(ExpenseContext);
  const [edit, setEdit] = useState(false)
  const handleEdit = () => {
    alert("Edit Item here..."); // for testing purpose
  };

  const handleDelete = (idx) => {
    // alert("[x] - Item deleted."); // for testing purpose
    const oldData = [...expense];
    oldData.splice(idx, 1);
    setExpense([...oldData]);
  };

  console.log("EntryList before rendering");
  return (
    <table>
      {expense.map(({ id, timing, category, amount, expenses }, idx) => (
        <tr key={id}>
          <td>{timing}</td>
          <td className="left">{category}</td>
          <td className={expenses ? "right expense" : "right income"}>
            {expenses ? "- " : "+ "}
            {new Intl.NumberFormat("de-DE", {
              style: "currency",
              currency: "EUR",
            }).format(amount)}
          </td>
          <td>
            <Modal 
            onClick={
              () => {
              setEdit(true)
              // handleEdit()
            }
          } 
          className="btn-entry btn-edit"
          title={!expenses ? "Income" : "Expenses" }
          category={ category}
          date={timing}
          amount={amount}
          onClick={handleEdit}
            >
              <VscEdit />
            </Modal>
            <button
              onClick={() => handleDelete(idx)}
              className="btn-entry btn-delete"
            >
              <FiDelete />
            </button>
          </td>
        </tr>
      ))}
    </table>
  );
}

export default EntryList;
