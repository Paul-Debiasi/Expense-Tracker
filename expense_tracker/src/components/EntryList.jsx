import React, { useState, useEffect, useContext, createContext } from 'react';
import './EntryList.css';
import { ExpenseContext } from "./Context";
// import fakeData from './FakeData';
import { VscEdit } from 'react-icons/vsc';
import { FiDelete } from 'react-icons/fi';

function EntryList() {
  // const [expense, setExpense] = useState(initialExpenses);
  const { setExpense, expense } = useContext(ExpenseContext);

  const handleEdit = () => {
    alert("Edit Item here..."); // for testing purpose
  }

  const handleDelete = (idx) => {
    // alert("[x] - Item deleted."); // for testing purpose
    //setExpense();
    const oldData = [...expense]
    oldData.splice(idx, 1)
    setExpense([...oldData])
  }

  console.log('EntryList before rendering');
  return (
    <table>
      {expense.map(({ id, timing, category, amount, expenses }, idx) => (
        <tr key={id}>
          <td>{timing}</td>
          <td className='left'>{category}</td>
          <td className={expenses ? 'right expense' : 'right income'}>
            {expenses ? '- ' : '+ '}{new Intl.NumberFormat('de-DE', {style: 'currency', currency: 'EUR'}).format(amount)}
          </td>
          <td>
            <button onClick={handleEdit} className='btn-edit'><VscEdit /></button>
            <button onClick={() => handleDelete(idx)} className='btn-delete'><FiDelete /></button>
          </td>
        </tr>
      ))}
    </table>
  );
}

export default EntryList;
