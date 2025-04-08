import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Orders = () => {
  const [allOrders, setAllOrders] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:3002/allOrders").then((res) => {
      setAllOrders(res.data);
    });
  }, []);
  const handleClick = (index) => {
    console.log(index);
  };
  return (
    <div className="orders">
      {allOrders.length < 1 && (
        <div className="no-orders">
          <p>You haven't placed any orders today</p>
          <Link to={"/"} className="btn">
            Get started
          </Link>
        </div>
      )}
      <div className="order-table">
        <table>
          <tr>
            <th>Stock-Name</th>
            <th>Qty.</th>
            <th>Price</th>
            <th>Total amount</th>
          </tr>

          {allOrders.map((orders, index) => {
            let totalAmount = orders.qty * orders.price;
            return (
              <tr key={index}>
                <td>{orders.name}</td>
                <td>{orders.qty}</td>
                <td>{ orders.price.toFixed(2)}</td>
                <td>{totalAmount.toFixed(2)}</td>
                
              </tr>
            );
          })}
        </table>
      </div>
    </div>
  );
};

export default Orders;
