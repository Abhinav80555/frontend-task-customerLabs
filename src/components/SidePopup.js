import React from "react";
import "./SidePopup.css";
import { useState } from "react";
import axios from "axios";
import RemoveIcon from "@mui/icons-material/Remove";
import IconButton from "@mui/joy/IconButton";
import { ToastContainer, toast } from "react-toastify";
import { AddingData, DropDownData } from "./Data";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

function SidePopup(props) {
  const [dropDown, setDropDown] = useState([]);
  const [input, setInput] = useState("");
  const [defaultDropdown, setDefaultDropdown] = useState(DropDownData);
  const [select, setSelect] = useState();

  function AddSchema() {
    if (select === "add") {
      return;
    } else if (select === "") {
      toast("please select the field ");
      return;
    }
    let Data1 = defaultDropdown.filter((e) => {
      return Object.keys(e) == select;
    });
    setDropDown([...dropDown, Data1[0]]);

    let Data2 = defaultDropdown.filter((e) => {
      return Object.keys(e) != select;
    });
    setDefaultDropdown(Data2);

    setSelect("add");
  }
  function handleClick_Back() {
    props.pop(false);
  }

  function innerList(key) {
    return AddingData.filter((e) => {
      return key[0] == Object.keys(e)[0];
    });
  }

  function SaveSegment(e) {
    e.preventDefault();
    console.log(input);
    if (input === "") {
      toast("fill the name of the segment");
      return;
    } else if (dropDown[0] === "") {
      toast("please select the field");
    }

    let obj = {
      segment_name: input,
      schema: dropDown
    };
    axios
      .post(
        "https://webhook.site/66c544d6-a11d-4509-a1d3-2122769da1ca",
        JSON.stringify(obj)
      )
      .then((e) => console.log(e))
      .catch((err) => console.log(err));

    setDropDown([]);
    setDefaultDropdown(DropDownData);
    props.pop(false);
    toast("data posted successfull");
  }

  function listFn(e) {
    let id = e.target.id;
    let value = e.target.value;

    let data = dropDown.map((e) => {
      return Object.keys(e) == id ? { [id]: value } : e;
    });

    setDropDown(data);
  }

  function cancelFn() {
    setDropDown([]);
    setDefaultDropdown(DropDownData);
    props.pop(false);
  }

  function removefn(e, i) {
    dropDown.splice(i, 1);
    const arr = [...dropDown];
    setDropDown(arr);
    const option = [...defaultDropdown];

    option.push(e);

    setDefaultDropdown(option);
  }

  return (
    <div className="popUp-container">
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <div className="header">
        <ArrowBackIosIcon onClick={handleClick_Back} />
        Saving segment
      </div>
      <div className="body">
        <label htmlFor="name">Enter the name of the segment</label>
        <input
          type="text"
          id="name"
          placeholder="Name of the segment"
          onChange={(e) => setInput(e.target.value)}
        />
        <br />
        <label>
          To Save your segment, you need to add the schemas
          <br />
          to build query
        </label>
        {dropDown[0] && (
          <div className="border">
            {dropDown.map((e, i) => {
              let List = innerList(Object.keys(e));
              return (
                <span
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    gap: 2,
                    flexWrap: "wrap",
                    alignItems: "center"
                  }}
                >
                  <select key={i} id={Object.keys(e)[0]} onChange={listFn}>
                    {Object.values(List[0])[0].map((e, i) => (
                      <option key={"arr" + i}>{e}</option>
                    ))}
                  </select>
                  <IconButton variant="soft" onClick={() => removefn(e, i)}>
                    <RemoveIcon key={"arr" + i} id={Object.keys(e)[0]} />
                  </IconButton>
                </span>
              );
            })}
          </div>
        )}

        <select value={select} onChange={(e) => setSelect(e.target.value)}>
          {defaultDropdown.map((e, i) => (
            <option key={"List" + i} value={Object.keys(e)}>
              {Object.values(e)}
            </option>
          ))}
        </select>

        {select && (
          <button className="link" onClick={AddSchema}>
            +<u style={{ gap: "10px" }}>Add new schema</u>
          </button>
        )}
      </div>
      <div className="bottom">
        <button className="btnsave" type="submit" onClick={SaveSegment}>
          Save the Segment
        </button>
        <button className="btncancel" onClick={cancelFn}>
          Cancel
        </button>
      </div>
    </div>
  );
}

export default SidePopup;