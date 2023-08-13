import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

export default function MyOrder() {
  const [orderData, setOrderData] = useState("");
  const fetchMyOrder = async () => {
    console.log(localStorage.getItem("userEmail"));
    await fetch("http://localhost:3000/api/myOrderData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: localStorage.getItem("userEmail"),
      }),
    }).then(async (res) => {
      let response = await res.json();
      await setOrderData(response);
    });
  };
  useEffect(() => {
    fetchMyOrder();
  }, []);
  return (
    <>
      <div>
        <Navbar />
      </div>
      <div className="container">
        <div className="row">
          {orderData !== {} ? (
            Array(orderData).map((data) => {
              return data.orderData ? (
                data.orderData.order_data
                  .slice(0)
                  .reverse()
                  .map((item) => {
                    return item.map((arrayData) => {
                      return (
                        <div>
                          {arrayData.Order_date ? (
                            <div className="m-auto mt-5">
                              {(data = arrayData.Order_date)}
                              <hr />
                            </div>
                          ) : (
                            <div className="container">
                              <div className="row">
                                <div className="col-12 col-md-6 col-lg-3">
                                  <div
                                    className="card mt-3"
                                    style={{
                                      width: "16rem",
                                      maxHeight: "360px",
                                    }}
                                  >
                                    <div className="card-body">
                                      <h5 className="card-title">
                                        {arrayData.name}
                                      </h5>
                                      <div
                                        className="container w-100 p-0"
                                        style={{ height: "38px" }}
                                      >
                                        <span className="m-1">
                                          {arrayData.qty}
                                        </span>
                                        <span className="m-1">
                                          {arrayData.size}
                                        </span>
                                        {/* <span className="m-1">{data}</span> */}
                                        <div className="d-inline ms-2 h-100 w-20 fs-5">
                                          ₹{arrayData.price}/-
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    });
                  })
              ) : (
                <div>
                  <h2 className="m-5 p-5" style={{ textAlign: "center" }}>
                    Oops! You haven't ordered anything so far.
                    <br />
                    <Link to="/">
                      <button className="btn bg-success mt-4 fs-5">
                        Order Now
                      </button>
                    </Link>
                  </h2>
                </div>
              );
            })
          ) : (
            <h2>Oops! You haven't ordered anything so far.</h2>
          )}
        </div>
      </div>

      <div>
        <Footer />
      </div>
    </>
  );
}
