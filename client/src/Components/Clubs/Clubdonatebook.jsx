import React, { useEffect, useState } from 'react';
import "../Readers/Readerdonatebook.css";
import axiosInstance from '../../BaseUrl';
import img from '../../Assets/donateimg.png';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import { useFormik } from 'formik';
import { bookSchema } from '../../Schema';

function Clubdonatebook() {
  const navigate = useNavigate();
  const { id } = useParams(); // Book ID (for edit mode)
  const libraryId = localStorage.getItem("libraryid");

  const [loading, setLoading] = useState(true);

  const formik = useFormik({
    initialValues: {
      bookname: '',
      authername: '',
      publisher: '',
      publisheryear: '',
      count: 1,
      libraryid: libraryId,
      image: null,
      bookpdf: null,
    },
    validationSchema: bookSchema,
    onSubmit: async (values) => {
      const dataToSend = new FormData();
      Object.entries(values).forEach(([key, value]) => {
        if (value !== null) {
          dataToSend.append(key, value);
        }
      });

      const endpoint = id ? `/library/edit/${id}` : '/addBook';

      try {
        await axiosInstance.post(endpoint, dataToSend, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        const message = id ? "Book updated successfully" : "Book added successfully";
        toast.success(message);
        navigate("/library_view_books");
      } catch (error) {
        console.error("Error:", error);
        toast.error("Operation failed");
      }
    },
  });

  // If in edit mode, fetch book data
  useEffect(() => {
    if (id) {
      axiosInstance.get(`/viewBookById/${id}`)
        .then((res) => {
          const book = res.data.data;
          formik.setValues({
            bookname: book.bookname || '',
            authername: book.authername || '',
            publisher: book.publisher || '',
            publisheryear: book.publisheryear || '',
            count: book.count || 1,
            libraryid: libraryId,
            image: null, // Image usually not pre-filled in edit for file inputs
            bookpdf: null,
          });
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [id, libraryId]);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="reader_donatebook">
      <div className="container">
        <div className='row'>
          <div className="col-sm-12 col-md-6 col-lg-6">
            <img src={img} alt='images' className='img_fluid' />
          </div>
          <div className='col-sm-12 col-md-6 col-lg-6 reader_donatebook_col2'>
            <p className='reader_donatebooke_heading'>
              {id ? "Edit Book" : "Add Book"}
            </p>
            <form onSubmit={formik.handleSubmit}>
              <div className='row'>
                <div className='row align-items-center '>
                  <label className='col-sm-4 donatebook_label'>Book Name</label>
                  <div className='col-sm-8 reader_donatebook_inputs'>
                    <input 
                      type="text" 
                      name='bookname' 
                      value={formik.values.bookname} 
                      onChange={formik.handleChange} 
                      onBlur={formik.handleBlur}
                    />
                    {formik.errors.bookname && formik.touched.bookname && (
                      <p className="error text-danger">{formik.errors.bookname}</p>
                    )}
                  </div>

                  <label className='col-sm-4 donatebook_label'>Author Name</label>
                  <div className='col-sm-8 reader_donatebook_inputs'>
                    <input 
                      type="text" 
                      name='authername' 
                      value={formik.values.authername} 
                      onChange={formik.handleChange} 
                      onBlur={formik.handleBlur}
                    />
                    {formik.errors.authername && formik.touched.authername && (
                      <p className="error text-danger">{formik.errors.authername}</p>
                    )}
                  </div>

                  <label className='col-sm-4 donatebook_label'>Publisher</label>
                  <div className='col-sm-8 reader_donatebook_inputs'>
                    <input 
                      type="text" 
                      name='publisher' 
                      value={formik.values.publisher} 
                      onChange={formik.handleChange} 
                      onBlur={formik.handleBlur}
                    />
                    {formik.errors.publisher && formik.touched.publisher && (
                      <p className="error text-danger">{formik.errors.publisher}</p>
                    )}
                  </div>

                  <label className='col-sm-4 donatebook_label'>Publishing Year</label>
                  <div className='col-sm-8 reader_donatebook_inputs'>
                    <input 
                      type="number" 
                      name='publisheryear' 
                      value={formik.values.publisheryear} 
                      onChange={formik.handleChange} 
                      onBlur={formik.handleBlur}
                    />
                    {formik.errors.publisheryear && formik.touched.publisheryear && (
                      <p className="error text-danger">{formik.errors.publisheryear}</p>
                    )}
                  </div>

                  <label className='col-sm-4 donatebook_label'>Count</label>
                  <div className='col-sm-8 reader_donatebook_inputs'>
                    <input type="number" name='count' value={formik.values.count} disabled />
                  </div>

                  <label className='col-sm-4 donatebook_label'>Select Image</label>
                  <div className='col-sm-8 reader_donatebook_inputs'>
                    <input 
                      type="file" 
                      name='image' 
                      onChange={(e) => formik.setFieldValue("image", e.currentTarget.files[0])} 
                      onBlur={formik.handleBlur}
                      accept="image/*" 
                    />
                    {formik.errors.image && formik.touched.image && (
                      <p className="error text-danger">{formik.errors.image}</p>
                    )}
                  </div>
                  
                  <label className='col-sm-4 donatebook_label'>Upload Book PDF</label>
                  <div className='col-sm-8 reader_donatebook_inputs'>
                    <input
                      type="file"
                      name="bookpdf"
                      onChange={(e) => formik.setFieldValue("bookpdf", e.currentTarget.files[0])} 
                      onBlur={formik.handleBlur}
                      accept="application/pdf"
                    />
                  </div>

                  <div className='col-sm-8 reader_donatebook_inputs'>
                    <button type="submit" className="btn btn-primary" id='readerdonatebook_button'>
                      {id ? "Update" : "Add"}
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

export default Clubdonatebook;

