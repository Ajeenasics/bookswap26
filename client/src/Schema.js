import * as yup from "yup";


const passwordRule = /^(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z!@#$%^&*0-9]{6,16}$/;
// min 6 char, must include letters (a-z, A-Z) and special characters
const pincodeErrorMessage = "Pincode must be a 6 digit number";

export const readerRegSchema  = yup.object().shape({
        firstname: yup.string().min(2,"Enter minimum 2 characters").matches(/^[a-zA-Z\s]+$/, "Only letters are allowed").required("Enter First Name"),
        lastname:yup.string().min(1,"Enter minimum 1 characters").matches(/^[a-zA-Z\s]+$/, "Only letters are allowed").required("Enter Last Name"),
        email:yup.string().email("Please enter a valid email").required("Enter Email"),
        password:  yup.string().min(6).max(16).matches(passwordRule, "Must include letters and special characters").required("Enter Password"),
        confirmpassword: yup.string().oneOf([yup.ref("password"), null], "Password mismatch").required("Enter Confirm Passsword"),
        dob: yup.date().max(new Date(), "Birthday cannot be in the future").required("Enter Date Of Birth"),
        gender:  yup.string().required("Enter Gender"),
        street: yup.string().min(2,"Enter minimum 2 characters").required("Enter Street"),
        city: yup.string().min(2,"Enter minimum 2 characters").required("Enter City"),
        state: yup.string().min(2,"Enter minimum 2 characters").required("Enter State"),
        pincode:  yup.number().min(111111,pincodeErrorMessage).max(999999,"Pincode must be a 6 digit number").positive().integer().required("Enter Pincode"),
        mobile:  yup.number().min(1000000000,"Contact must be a 10 digit number").max(9999999999,"Contact must be a 10 digit number").positive().integer().required("Enter Contact Number"),
        district: yup.string().min(2,"Enter minimum 2 characters").required("Enter District"),
        nationality: yup.string().min(2,"Enter minimum 2 characters").required("Enter Nationality"),
        // image: yup.object().required("Image Required"),  
        image: yup
  .mixed()
  .required("Image Required")
  .test("fileExists", "Please select an image", (value) => {
    return value instanceof File;
  }),
   
})

export const bookSchema = yup.object().shape({
    bookname: yup.string()
        .min(4, "Book name must be greater than 3 letters")
        .matches(/^[^0-9]*$/, "Book name must not contain numbers")
        .required("Book name is required"),
    authername: yup.string().required("Author name is required"),
    publisher: yup.string().required("Publisher is required"),
    publisheryear: yup.number()
        .max(new Date().getFullYear(), "Published year cannot be in the future")
        .required("Published year is required"),
    image: yup.mixed().required("Image is required")
})

export const clubRegSchema  = yup.object().shape({
        clubname: yup.string().min(2,"Enter minimum 2 characters").required("Enter Library Name"),
        email:yup.string().email("Please enter a valid email").required("Enter Email"),
        password:  yup.string().min(6).max(16).matches(passwordRule, "Must include letters and special characters").required("Enter Password"),
        confirmpassword: yup.string().oneOf([yup.ref("password"), null], "Password mismatch").required("Enter Confirm Password"),
        street: yup.string().min(2,"Enter minimum 2 characters").required("Enter Street"),
        city: yup.string().min(2,"Enter minimum 2 characters").required("Enter City"),
        state: yup.string().min(2,"Enter minimum 2 characters").required("Enter State"),
        pincode:  yup.number().min(111111,pincodeErrorMessage).max(999999,"Pincode must be a 6 digit number").positive().integer().required("Enter Pincode"),
        contact:  yup.number().min(1000000000,"Contact must be a 10 digit number").max(9999999999,"Contact must be a 10 digit number").positive().integer().required("Enter Contact"),
        regno:  yup.number().positive().integer().required("Enter Reg no:"),
        district: yup.string().min(2,"Enter minimum 2 characters").required("Enter District"),
        image: yup.object().required("Enter Image"),     
})


