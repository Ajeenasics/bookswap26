import React, { useState } from "react";

function AdminExchangeDetails() {
  const[requestdata,setRequestData]=useState([])



  return (
    <div>
      <div className="admin_exchange">
        <div className="container">
          <div className="admin_exchange_head">
            <div className="row">
              <div className="col">Sl.No</div>
              <div className="col">Book Name</div>
              <div className="col">Requested User</div>
              <div className="col">Reciever User</div>
              <div className="col">Date</div>
            </div>
          </div>
          {
          <div className="admin_exchange_body">
            <div className="container-fluid">
              <div className="row">
                <div className="col">01</div>
                <div className="col">Book Name</div>
                <div className="col">Roja</div>
                <div className="col">Vijay</div>
                <div className="col">Date</div>
                
              </div>
            </div>
          </div>
          }
        </div>
      </div>
    </div>
  );
}

export default AdminExchangeDetails;
