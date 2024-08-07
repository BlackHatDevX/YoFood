import React from "react";
import trash from "../trash.svg";
import { useCart, useDispatchCart } from "../components/ContextReducer";
export default function Cart() {
  let data = useCart();
  let dispatch = useDispatchCart();
  if (data.length === 0) {
    return (
      <div>
        <div className="m-5 w-100 text-center fs-3">The Cart is Empty!</div>
      </div>
    );
  }
  const handleCheckout = async () => {
    let userEmail = localStorage.getItem("userEmail");
    console.log(userEmail);
    let response = await fetch(window.backendUrl + "/api/orderData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        order_data: data,
        email: userEmail,
        order_date: new Date().toDateString(),
      }),
    });
    console.log("ORDER RESPONSE", response);
    if (response.status === 200) {
      dispatch({ type: "DROP" });
    }
  };
  let totalPrice = data.reduce((total, food) => total + food.price, 0);
  return (
    <div>
      <div
        className="container m-auto mt-5 table-responsive table-responsive-sm table-responsive-md"
        style={{
          height: "400px",
          overflow: "scroll",
          overflowX: "hidden",
        }}
      >
        <table className="table table-hover">
          <thead className="text-success fs-4">
            <tr>
              <th className="col">#</th>
              <th className="col">Name</th>
              <th className="col">Quantity</th>
              <th className="col">Option</th>
              <th className="col">Amount</th>
              <th className="col"></th>
            </tr>
          </thead>
          <tbody>
            {data.map((food, index) => (
              <tr key={index}>
                <th scope="row" key={index}>
                  {index + 1}
                </th>
                <td>{food.name}</td>
                <td>{food.qty}</td>
                <td>{food.size}</td>
                <td>{food.price}</td>
                <td>
                  <button type="button" className="btn p-0">
                    <img
                      src={trash}
                      style={{ height: "40px", width: "auto" }}
                      alt="trash"
                      onClick={() => {
                        dispatch({ type: "REMOVE", index: index });
                      }}
                    />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div>
          <h1 className="fs-2">Total Price: {totalPrice}/-</h1>
        </div>
        <div>
          <button className="btn bg-success mt-5" onClick={handleCheckout}>
            {" "}
            Check Out{" "}
          </button>
        </div>
      </div>
    </div>
  );
}

// export modules=Cart()
