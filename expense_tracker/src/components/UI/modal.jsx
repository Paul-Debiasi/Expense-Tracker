import React, { useState } from "react";
import {
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
  MDBInput,
} from "mdb-react-ui-kit";
import { VscEdit } from "react-icons/vsc";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import DropDown from "./dropDown"

export default function Modal(props) {
  const [basicModal, setBasicModal] = useState(false);

  const toggleShow = () => setBasicModal(!basicModal);

  const [iseExpenses, setIsExpenses] = useState();
  const expensesArray = ["House", "Car", "Leisure Time", "Groceries", "Other"];
  const incomeArray = ["Salary", "Other"];
  return (
    <>
      <MDBBtn onClick={toggleShow} className="btn-entry btn-edit">
        <VscEdit />
      </MDBBtn>
      <MDBModal show={basicModal} setShow={setBasicModal} tabIndex="-1">
        <MDBModalDialog>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle><b>{props.title}</b></MDBModalTitle>
              <MDBBtn
                className="btn-close"
                color="none"
                onClick={toggleShow}
              ></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>

              {/* ============================================================ */}

              <Dropdown className="mx-3"
            //    onSelect={categorySelectHandler}
              >
                <DropdownButton
                style={{marginBottom: 10, marignLeft: -5}}
                  title={'Select a Category'}
                  variant="success"
                //   disabled={!isSelected}
                >
                  {/* <Dropdown.Toggle variant="success" id="dropdown-basic">
          </Dropdown.Toggle> */}
                  {
                //   option === "Expenses"
                     expensesArray.map((expense, idx) => {
                        return (
                          <DropDown
                            key={idx}
                            eventKey={expense}
                            onClick={() => {
                            //   setTestHandler(expense);
                            }}
                            option={expense}
                            >
                            <hr />
                            </DropDown>
                        );
                      })
                    }
                     {
                     incomeArray.map((option, idx) => {
                        return (
                          <DropDown
                            key={idx}
                            eventKey={option}
                            onClick={() => {
                            //   setTestHandler(option);
                            }}
                            option={option}
                          />
                        );
                      })}
                </DropdownButton>
              </Dropdown>
              {/* ------------------------------------------------------------------------------------------------ */}
              {/* <input type='text' className='' placeholder={props?.category} /> */}
              <MDBInput
              style={{marginTop: 15, padding: 15}}

                label="Category"
                value={props?.category}
                id=""
                type="text"
                // onChange={(e) => setAmount(Number(e.target.value))
                // }
              />
              <MDBInput
              style={{marginTop: 15, padding: 15}}

                label="Date"
                value={props?.date}
                id=""
                type="text"
                // onChange={(e) => setAmount(Number(e.target.value))
                // }
              />
              <MDBInput
              style={{marginTop: 15, padding: 15 }}
                label="Amount"
                value={props?.amount}
                id=""
                type="number"
                // onChange={(e) => setAmount(Number(e.target.value))
                // }
              />

              {/* <input type='text' className='' placeholder={props?.date}/> */}
              {/* <input type='text' className='' placeholder={props?.amount}/> */}
            </MDBModalBody>

            <MDBModalFooter>
              <MDBBtn color="secondary" onClick={toggleShow}>
                Cancel
              </MDBBtn>
              <MDBBtn onClick={props?.onClick}>Save changes</MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </>
  );
}
