import React from "react";
import Dropdown from "react-bootstrap/Dropdown";


export default function DropDown(props) {
  return (
    <Dropdown.Item
    // key={props.test}
      eventKey={props.eventKey}
    //   onClick={() => {
    //     // setCurrentDate(option.timing);
    //     // setAmount(option.amount);
    //     setTest(option);
    //   }}
    onClick={props.onClick}
    >
      {props.option}
    </Dropdown.Item>
  );
}
