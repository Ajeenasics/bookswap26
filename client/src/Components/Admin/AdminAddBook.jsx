import React, { useState } from "react";
import addbook from "../../Assets/addbook.png";
import "./adminaddbook.css";
import axiosInstance from "../../BaseUrl";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import { bookSchema } from "../../Schema";

function AdminAddBook() {
  const formik = useFormik({
    initialValues: {
      bookname: "",
      authername: "",
      publisher: "",
      publisheryear: "",
      count: 0,
      image: null,
    },
    validationSchema: bookSchema,
    onSubmit: async (values) => {
      try {
        const dataToSend = new FormData();
        for (let key in values) {
          dataToSend.append(key, values[key]);
        }
        const result = await axiosInstance.post(`/adminaddbook`, dataToSend, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        if (result.status === 200) {
          toast.success("Book added Successfully");
          window.location.reload();
        } else {
          toast.error("Failed to add book");
        }
      } catch (error) {
        console.error("error", error);
        toast.error("Something went wrong");
      }
    },
  });

  return (
    <div>
      <div className="admin_addbook">
        <div className="container">
          <div className="row">
            <div className="col-sm-12 col-md-6 col-lg-6">
              <img
                src={addbook}
                alt="images"
                className="img_fluid"
                id="addbook_img"
              />
            </div>
            <div className="col-sm-12 col-md-6 col-lg-6 admin_addbook_col2">
              <p className="admin_addbooke_heading">Book Upload</p>
              <form onSubmit={formik.handleSubmit}>
                <div className="row">
                  <div className="row align-items-center ">
                    <label className="col-sm-4 addbook_label">Book Name</label>
                    <div className="col-sm-8 admin_addbook_inputs">
                      <input
                        type="text"
                        name="bookname"
                        value={formik.values.bookname}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.errors.bookname && formik.touched.bookname && (
                        <p className="error text-danger">{formik.errors.bookname}</p>
                      )}
                    </div>

                    <label className="col-sm-4 addbook_label">
                      Author Name
                    </label>
                    <div className="col-sm-8 admin_addbook_inputs">
                      <input
                        type="text"
                        name="authername"
                        value={formik.values.authername}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.errors.authername && formik.touched.authername && (
                        <p className="error text-danger">{formik.errors.authername}</p>
                      )}
                    </div>

                    <label className="col-sm-4 addbook_label">Publisher</label>
                    <div className="col-sm-8 admin_addbook_inputs">
                      <input
                        type="text"
                        name="publisher"
                        value={formik.values.publisher}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.errors.publisher && formik.touched.publisher && (
                        <p className="error text-danger">{formik.errors.publisher}</p>
                      )}
                    </div>

                    <label className="col-sm-4 addbook_label">
                      Publishing year
                    </label>
                    <div className="col-sm-8 admin_addbook_inputs">
                      <input
                        type="number"
                        name="publisheryear"
                        value={formik.values.publisheryear}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.errors.publisheryear && formik.touched.publisheryear && (
                        <p className="error text-danger">{formik.errors.publisheryear}</p>
                      )}
                    </div>

                    <label className="col-sm-4 addbook_label">
                      Count
                    </label>
                    <div className="col-sm-8 admin_addbook_inputs">
                      <input
                        type="number"
                        name="count"
                        value={formik.values.count}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.errors.count && formik.touched.count && (
                        <p className="error text-danger">{formik.errors.count}</p>
                      )}
                    </div>

                    <label className="col-sm-4 addbook_label">
                      Select a Image
                    </label>
                    <div className="col-sm-8 admin_addbook_inputs">
                      <input
                        type="file"
                        name="image"
                        onChange={(e) => formik.setFieldValue("image", e.currentTarget.files[0])}
                        onBlur={formik.handleBlur}
                      />
                      {formik.errors.image && formik.touched.image && (
                        <p className="error text-danger">{formik.errors.image}</p>
                      )}
                    </div>

                    <div className="col-sm-8 admin_addbook_inputs ">
                      <button
                        type="submit"
                        className="btn btn-primary "
                        id="adminaddbook_button"
                      >
                        Upload a file
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminAddBook;

