import React, { useState } from "react";
import "../Readers/Readerdonatebook.css";
import axiosInstance from "../../BaseUrl";
import img from "../../Assets/donateimg.png";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import { bookSchema } from "../../Schema";

function Readerdonatebook() {
  const id = localStorage.getItem("userid");

  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    setFieldValue,
  } = useFormik({
    initialValues: {
      bookname: "",
      authername: "",
      publisher: "",
      publisheryear: "",
      count: 1,
      userid: id,
      image: null,
    },
    validationSchema: bookSchema,
    onSubmit: async (values) => {
      try {
        const formData = new FormData();
        for (let key in values) {
          formData.append(key, values[key]);
        }

        const res = await axiosInstance.post(`/donatebook`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        if (res.status === 200) {
          toast.success("Book Donated Successfully");
          window.location.reload();
        } else {
          toast.error("Failed to enter data");
        }
      } catch (error) {
        console.error("error", error);
        toast.error("Something went wrong");
      }
    },
  });

  const handleImageChange = (e) => {
    setFieldValue("image", e.currentTarget.files[0]);
  };

  return (
    <div className="reader_donatebook">
      <div className="container">
        <div className="row">
          <div className="col-sm-12 col-md-6 col-lg-6">
            <img src={img} alt="images" className="img_fluid" />
          </div>
          <div className="col-sm-12 col-md-6 col-lg-6 reader_donatebook_col2">
            <p className="reader_donatebooke_heading">Donate Book</p>
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="row align-items-center ">
                  <label className="col-sm-4 donatebook_label">Book Name</label>
                  <div className="col-sm-8 reader_donatebook_inputs">
                    <input
                      type="text"
                      placeholder=""
                      name="bookname"
                      value={values.bookname}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.bookname && touched.bookname && (
                      <p className="error text-danger">{errors.bookname}</p>
                    )}
                  </div>
                  
                  <label className="col-sm-4 donatebook_label">
                    Author Name
                  </label>
                  <div className="col-sm-8 reader_donatebook_inputs">
                    <input
                      type="text"
                      placeholder=""
                      name="authername"
                      value={values.authername}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.authername && touched.authername && (
                      <p className="error text-danger">{errors.authername}</p>
                    )}
                  </div>

                  <label className="col-sm-4 donatebook_label">Publisher</label>
                  <div className="col-sm-8 reader_donatebook_inputs">
                    <input
                      type="text"
                      placeholder=""
                      name="publisher"
                      value={values.publisher}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.publisher && touched.publisher && (
                      <p className="error text-danger">{errors.publisher}</p>
                    )}
                  </div>

                  <label className="col-sm-4 donatebook_label">
                    Publishing year
                  </label>
                  <div className="col-sm-8 reader_donatebook_inputs">
                    <input
                      type="number"
                      placeholder=""
                      name="publisheryear"
                      value={values.publisheryear}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.publisheryear && touched.publisheryear && (
                      <p className="error text-danger">{errors.publisheryear}</p>
                    )}
                  </div>
                  
                  <label className="col-sm-4 donatebook_label">Count</label>
                  <div className="col-sm-8 reader_donatebook_inputs">
                    <input
                      type="number"
                      placeholder=""
                      name="count"
                      value={values.count}
                      disabled
                    />
                  </div>
                  <label className="col-sm-4 donatebook_label">
                    Select a Image
                  </label>
                  <div className="col-sm-8 reader_donatebook_inputs">
                    <input
                      type="file"
                      name="image"
                      onChange={handleImageChange}
                      onBlur={handleBlur}
                    />
                    {errors.image && touched.image && (
                      <p className="error text-danger">{errors.image}</p>
                    )}
                  </div>
                  <div className="col-sm-8 reader_donatebook_inputs ">
                    <button
                      type="submit"
                      className="btn btn-primary "
                      id="readerdonatebook_button"
                    >
                      Donate
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Readerdonatebook;

