import React, { useEffect, useState } from "react";

export default function Userdata({ data, setData }) {
  const [flag, setFlag] = useState(false);
  const [dataState, setDataState] = useState([]);

  const [item, setItem] = useState([]);
  const [indexValue, setIndexValue] = useState();

  const [count, setCount] = useState(0);
  const [data1, setData1] = useState({
    Name: "",
    Email: "",
    Phone: "",
    Address: ""
  });
  useEffect(() => {
    const tempData = data.map((el) => {
      return { ...el, like: 0, unlike: 0 };
    });
    setDataState([...tempData]);
    setData([...tempData]);
  }, []);
  const event = (indx) => {
    setData((prev) => {
      return prev.filter((elem, index) => {
        return index !== indx;
      });
    });
  };
  const eventer = (el, indr) => {
    setFlag(true);
    setItem([...item, indr]);
    setIndexValue(indr);
  };
  const input = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData1((prev) => {
      return { ...prev, [name]: value };
    });
  };
  const finalResult = (ind) => {
    var temp = [...data];
    temp.forEach((elem, index) => {
      if (ind === index) {
        elem.username = data1.Name;
        elem.email = data1.Email;
        elem.address.city = data1.Address;
        elem.phone = data1.Phone;
        return { ...elem };
      } else {
        return { ...elem };
      }
    });
    console.log(data);
    setData((prev) => {
      return [...temp];
    });
    setFlag(false);
  };
  const clickedData = (indre) => {
    setCount(count + 1);
    var temp2 = [...dataState];
    temp2.forEach((el, index) => {
      if (indre === index) {
        el.like = el.like + 1;
      }
    });
    setDataState([...temp2]);
    console.log(data);
  };

  return (
    <>
      <h1 className="heading_style">Fetching User's Data</h1>
      <div>
        <div className="cards">
          {data.map((elem, index) => {
            return (
              <div className="card" key={elem.id}>
                <img
                  src={`https://avatars.dicebear.com/v2/avataaars/${elem.username}.svg?options[mood][]=happy`}
                  alt=""
                  className="card_img"
                />
                <div className="card_info">
                  <h3 className="card_title">{elem.name}</h3>
                  <ul>
                    <li>
                      <strong>Username : </strong>
                      {elem.username}
                    </li>
                    <li>
                      <strong>Email: </strong>
                      {elem.email}
                    </li>
                    <li>
                      <strong>Address: </strong>
                      {elem.address.city}
                    </li>
                    <li>
                      <strong>Mobile No. : </strong>
                      {elem.phone}
                    </li>
                  </ul>
                </div>
                <div className="button">
                  <button
                    type="edit"
                    className="f"
                    onClick={() => {
                      eventer(elem, index);
                    }}
                  >
                    Edit
                  </button>
                  <button
                    type="delete"
                    className="f"
                    onClick={() => {
                      event(index);
                    }}
                  >
                    X
                  </button>
                  <button
                    onClick={() => {
                      clickedData(index);
                    }}
                    style={{
                      backgroundColor:
                        dataState[index]?.like % 2 === 0 ? "green" : "red"
                    }} className="f"
                  >
                    {dataState[index]?.like % 2 === 0 ? <>like</> : <>Unlike</>}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
        {flag && (
          <div className="main_div">
            <div className="center_div">
              <h3>
                Basic Modal{" "}
                <button
                  onClick={() => {
                    setFlag(false);
                  }}
                >
                  X
                </button>
              </h3>
              <label>Name:</label>
              <input
                type="text"
                // value={item.username}
                onChange={input}
                name="Name"
              />
              <br />
              <label>Email:</label>
              <input
                type="text"
                // value={item.email}
                onChange={input}
                name="Email"
              />
              <br />
              <label>Address:</label>
              <input
                type="text"
                // value={item.address.street}
                onChange={input}
                name="Address"
              />
              <br />
              <label>Phone:</label>
              <input
                type="text"
                // value={item.phone}
                onChange={input}
                name="Phone"
              />
              <br />
              <div>
                <button
                  onClick={() => {
                    setFlag(false);
                  }}
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    finalResult(indexValue);
                  }}
                >
                  OK
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
