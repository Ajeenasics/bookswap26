import React, { useState } from "react";
import "../Readers/ReaderSignin.css";
import img from "../../Assets/Signin.png";
import { Link, useNavigate } from "react-router-dom";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import axiosInstance from "../../BaseUrl";
import { readerRegSchema } from "../../Schema";
import { useFormik } from "formik";
import { toast } from "react-toastify";

function ReaderSignin() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    setFieldValue,
    setFieldTouched,
    validateForm,
  } = useFormik({
    initialValues: {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      confirmpassword: "",
      dob: "",
      gender: "",
      street: "",
      city: "",
      state: "",
      pincode: "",
      mobile: "",
      district: "",
      nationality: "",
      image: null,
    },
    validationSchema: readerRegSchema,
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: async (values) => {
      try {
        const formData = new FormData();
        for (let key in values) {
          formData.append(key, values[key]);
        }

        const res = await axiosInstance.post(`/adduser`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        if (res.data.status === 200) {
          const loginRes = await axiosInstance.post(`/userlogin`, {
            email: values.email,
            password: values.password,
          });

          if (loginRes.status === 200) {
            toast.success("Registered Successfully");
            localStorage.setItem("token", loginRes.data.token);
            localStorage.setItem("userid", loginRes.data.id);
            navigate("/reader_loginpage");
          }
        } else if (res.data.status === 409) {
          toast.warning(res.data.msg);
        }
      } catch (err) {
        console.error(err);
        toast.error("Something went wrong");
      }
    },
  });

  const handleImageChange = (e) => {
    setFieldValue("image", e.currentTarget.files[0]);
  };

  const handleValidationBeforeSubmit = async (e) => {
    e.preventDefault();

    // Validate Form
    const validationErrors = await validateForm();

    // Set all fields as touched to show errors
    Object.keys(values).forEach((field) => setFieldTouched(field, true));

    // Check if there are validation errors
    if (Object.keys(validationErrors).length === 0) {
      handleSubmit();
    } else {
      toast.error("Please fix the errors in the form before submitting.");
    }
  };

  return (
    <div className="reader_signin">
      <div className="container">
        <div className="row">
          <div className="col-sm-12 col-md-6 col-lg-6 reader_signin_img">
            <img src={img} alt="signin" className="img-fluid" />
          </div>
          <div className="col-sm-12 col-md-6 col-lg-6">
            <p className="reader_signin_title">User Registration</p>
            <form onSubmit={handleValidationBeforeSubmit}>
              <div className="row">
                {/* First Name */}
                <div className="col-6 pb-3 reader_signin_inputs">
                  <div className="form-floating">
                    <input
                      type="text"
                      className="form-control"
                      id="firstname"
                      placeholder="First Name"
                      name="firstname"
                      value={values.firstname}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      style={{ height: "58px", borderRadius: "7px" }}
                    />
                    <label htmlFor="firstname">First Name</label>
                  </div>
                  {errors.firstname && touched.firstname && (
                    <p className="error">{errors.firstname}</p>
                  )}
                </div>

                {/* Last Name */}
                <div className="col-6 pb-3 reader_signin_inputs">
                  <div className="form-floating">
                    <input
                      type="text"
                      className="form-control"
                      id="lastname"
                      placeholder="Last Name"
                      name="lastname"
                      value={values.lastname}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      style={{ height: "58px", borderRadius: "7px" }}
                    />
                    <label htmlFor="lastname">Last Name</label>
                  </div>
                  {errors.lastname && touched.lastname && (
                    <p className="error">{errors.lastname}</p>
                  )}
                </div>

                {/* Email */}
                <div className="col-12 pb-3 reader_signin_inputs">
                  <div className="form-floating">
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      placeholder="Email"
                      name="email"
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      style={{ height: "58px", borderRadius: "7px" }}
                    />
                    <label htmlFor="email">Email</label>
                  </div>
                  {errors.email && touched.email && (
                    <p className="error">{errors.email}</p>
                  )}
                </div>

                {/* Password */}
                <div className="col-12 pb-3 reader_signin_inputs position-relative">
                  <div className="form-floating">
                    <input
                      type={showPassword ? "text" : "password"}
                      className="form-control"
                      id="password"
                      placeholder="Password"
                      name="password"
                      value={values.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      style={{ paddingRight: "40px", height: "58px", borderRadius: "7px" }}
                    />
                    <label htmlFor="password">Password</label>
                  </div>
                  <span 
                    onClick={() => setShowPassword(!showPassword)}
                    style={{ position: "absolute", right: "25px", top: "20px", cursor: "pointer", zIndex: 10 }}
                  >
                    {showPassword ? <BsEye /> : <BsEyeSlash />}
                  </span>
                  {errors.password && touched.password && (
                    <p className="error">{errors.password}</p>
                  )}
                </div>

                {/* Confirm Password */}
                <div className="col-12 pb-3 reader_signin_inputs position-relative">
                  <div className="form-floating">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      className="form-control"
                      id="confirmpassword"
                      placeholder="Confirm Password"
                      name="confirmpassword"
                      value={values.confirmpassword}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      style={{ paddingRight: "40px", height: "58px", borderRadius: "7px" }}
                    />
                    <label htmlFor="confirmpassword">Confirm Password</label>
                  </div>
                  <span 
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    style={{ position: "absolute", right: "25px", top: "20px", cursor: "pointer", zIndex: 10 }}
                  >
                    {showConfirmPassword ? <BsEye /> : <BsEyeSlash />}
                  </span>
                  {errors.confirmpassword && touched.confirmpassword && (
                    <p className="error">{errors.confirmpassword}</p>
                  )}
                </div>

                {/* DOB */}
                <div className="col-12 pb-3 reader_signin_inputs w-50">
                  <div className="form-floating">
                    <input
                      type="date"
                      className="form-control"
                      id="dob"
                      name="dob"
                      value={values.dob}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      style={{ height: "58px", borderRadius: "7px" }}
                    />
                    <label htmlFor="dob">Date of Birth</label>
                  </div>
                  {errors.dob && touched.dob && (
                    <p className="error">{errors.dob}</p>
                  )}
                </div>

                {/* Gender */}
                <div className="col-12 pb-3">
                  <label className="pb-3">Gender:</label>
                  <label htmlhtmlFor="male">&nbsp; Male &nbsp;</label>
                  <input
                    type="radio"
                    id="male"
                    name="gender"
                    value="Male"
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <label htmlhtmlFor="female">&nbsp; Female &nbsp;</label>
                  <input
                    type="radio"
                    id="female"
                    name="gender"
                    value="Female"
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.gender && touched.gender && (
                    <p className="error">{errors.gender}</p>
                  )}
                </div>

                {/* Address */}
                <div className="col-12 pb-3 reader_signin_inputs">
                  <div className="form-floating">
                    <input
                      type="text"
                      className="form-control"
                      id="street"
                      placeholder="Street"
                      name="street"
                      value={values.street}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      style={{ height: "58px", borderRadius: "7px" }}
                    />
                    <label htmlFor="street">Street</label>
                  </div>
                  {errors.street && touched.street && (
                    <p className="error">{errors.street}</p>
                  )}
                </div>

                <div className="col-12 pb-3 reader_signin_inputs">
                  <div className="form-floating">
                    <input
                      type="text"
                      className="form-control"
                      id="city"
                      placeholder="City"
                      name="city"
                      value={values.city}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      style={{ height: "58px", borderRadius: "7px" }}
                    />
                    <label htmlFor="city">City</label>
                  </div>
                  {errors.city && touched.city && (
                    <p className="error">{errors.city}</p>
                  )}
                </div>

                <div className="col-12 pb-3 reader_signin_inputs">
                  <div className="form-floating">
                    <input
                      type="text"
                      className="form-control"
                      id="state"
                      placeholder="State"
                      name="state"
                      value={values.state}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      style={{ height: "58px", borderRadius: "7px" }}
                    />
                    <label htmlFor="state">State</label>
                  </div>
                  {errors.state && touched.state && (
                    <p className="error">{errors.state}</p>
                  )}
                </div>

                <div className="col-6 pb-3 reader_signin_inputs">
                  <div className="form-floating">
                    <input
                      type="text"
                      className="form-control"
                      id="district"
                      placeholder="District"
                      name="district"
                      value={values.district}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      style={{ height: "58px", borderRadius: "7px" }}
                    />
                    <label htmlFor="district">District</label>
                  </div>
                  {errors.district && touched.district && (
                    <p className="error">{errors.district}</p>
                  )}
                </div>

                <div className="col-6 pb-3 reader_signin_inputs">
                  <div className="form-floating">
                    <input
                      type="number"
                      className="form-control"
                      id="pincode"
                      placeholder="Pincode"
                      name="pincode"
                      value={values.pincode}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      style={{ height: "58px", borderRadius: "7px" }}
                    />
                    <label htmlFor="pincode">Pincode</label>
                  </div>
                  {errors.pincode && touched.pincode && (
                    <p className="error">{errors.pincode}</p>
                  )}
                </div>

                {/* Nationality */}
                <div className="col-12 pb-3 reader_signin_inputs w-50">
                  <div className="form-floating">
                    <select
                      className="form-select"
                      id="nationality"
                      name="nationality"
                      value={values.nationality}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      style={{ height: "58px", borderRadius: "7px" }}
                    >
                      <option value="">Select Nationality</option>
                      {[
                        "Canada", "United Kingdom", "Australia", "India",
                        "France", "Germany", "Japan", "China", "Brazil",
                        "Mexico", "Spain", "Italy", "Russia", "Saudi Arabia",
                        "South Africa"
                      ].map((country) => (
                        <option value={country} key={country}>
                          {country}
                        </option>
                      ))}
                    </select>
                    <label htmlFor="nationality">Nationality</label>
                  </div>
                  {errors.nationality && touched.nationality && (
                    <p className="error">{errors.nationality}</p>
                  )}
                </div>

                {/* Mobile */}
                <div className="col-12 pb-3 reader_signin_inputs w-50">
                  <div className="form-floating">
                    <input
                      type="number"
                      className="form-control"
                      id="mobile"
                      placeholder="Contact"
                      name="mobile"
                      value={values.mobile}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      style={{ height: "58px", borderRadius: "7px" }}
                    />
                    <label htmlFor="mobile">Contact</label>
                  </div>
                  {errors.mobile && touched.mobile && (
                    <p className="error">{errors.mobile}</p>
                  )}
                </div>

                {/* Image */}
                <div className="col-12 pb-3 reader_signin_inputfile">
                  <label className="pb-3">Select an Image</label>
                  <input
                    type="file"
                    name="image"
                    className="w-100"
                    onChange={handleImageChange}
                    onBlur={handleBlur}
                  />
                </div>

                {/* Submit/Reset */}
                <div className="col-12 pb-3 reader_signin_inputbutton text-center">
                  <button type="submit" className="btn btn-primary">
                    SignUP
                  </button>
                  <button type="reset" className="btn btn-secondary">
                    Cancel
                  </button>
                </div>

                <div className="col-12 reader_signin_link">
                  <p>
                    Already have an account?{" "}
                    <Link to="/reader_loginpage">Login</Link>
                  </p>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReaderSignin;
