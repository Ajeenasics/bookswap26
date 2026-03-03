import React, { useEffect, useState } from "react";
import "./adminexchange.css";
// import AdminHomeNavbar from "./AdminHomeNavbar";
import axiosInstance from "../../BaseUrl";

function AdminExchange() {
  const [exchangerequest, setExchangeRequest] = useState([]);

  const displayExchangeRequest = () => {
    axiosInstance
      .post(`/displayexchangerequests`)
      .then((res) => {
        console.log(res.data);
        setExchangeRequest(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString();
  };

  useEffect(() => {
    displayExchangeRequest();
  }, []);
  return (
    <div className="admin_exchange">
      <div className="container">
        <div className="admin_exchange_head">
          <div className="row">
            <div className="col">Sl.No</div>
            <div className="col">Book Name</div>
            <div className="col">Requested User</div>
            <div className="col">Accepted User</div>
            <div className="col">Date</div>
          </div>
        </div>
        {exchangerequest.map((items, index) => (
          <div className="admin_exchange_body">
            <div className="container-fluid">
              <div className="row" key={index}>
                <div className="col">{index + 1}</div>
                <div className="col">{items.bookname}</div>
                <div className="col">{items.userid.firstname}</div>
                <div className="col">{items.statusChangedBy.firstname}</div>
                <div className="col">{formatDate(items.acceptedDate)}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminExchange;
