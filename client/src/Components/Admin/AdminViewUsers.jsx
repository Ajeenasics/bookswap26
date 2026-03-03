import React from "react";
import { useEffect, useState } from "react";
import axiosInstance from "../../BaseUrl";
import './AdminViewUsers.css';
import { toast } from "react-toastify";

function AdminViewUsers({ url }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    axiosInstance
      .post(`/viewAllUsers`)
      .then((res) => {
        console.log(res);
        setData(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleRemove = (id) => {
    axiosInstance.post(`/deleteUser/${id}`)
      .then((res) => {
        console.log(res);
        if(res.data.status===200){
            toast.success('Removed')
            setData(prevArray => prevArray.filter(item => item._id !== id));
            // window.location.reload()
        }else{
            // alert.warning('Employee Already Exist')
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const date = new Date();
  let year = date.getFullYear();

  return (
    <div>
      <div className="admin-view-book">
        <div className="container ">
          <div className="row">
            {data.length ? (
              data.map((a) => {
                return (
                  <div className="card admin-books col-3" id="carddesign">
                    <div className="admin-user-top-section">
                      <img
                        src={`${url}/${a.image.filename}`}
                        className="card-img-top"
                        id="adminclub"
                        alt="..."
                      />
                    </div>
                    <div className="admin-book-bottom-section container">
                      <h4 className="card-title mt-2 text-center">
                        {a.firstname} {a.lastname}
                      </h4>
                      <p className="card-title text-center">
                        Age: {year - a.dob.slice(0, 4)}
                      </p>
                      <h6 className="card-text"><i className="ri-phone-fill"></i> {a.mobile}</h6>
                      <h6 className="card-text"><i className="ri-mail-line"></i> {a.email}</h6>
                      <h6 className="card-text"><i className="ri-map-pin-fill"></i> {a.street} {a.city}</h6>
                      <h6 className="card-text"><i className="ri-map-pin-fill"></i> {a.district}</h6>
                      <h6 className="card-text"><i className="ri-map-pin-fill"></i> {a.state}</h6>
                      <div className="col text-center pt-3">
                        
                        <button className="btn btn-primary text-center" onClick={() => handleRemove(a._id)}>
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="no_data">
                <h1>No Users found</h1>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminViewUsers;
