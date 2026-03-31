import React, { useEffect, useState } from "react";
import logo from "../../Assets/logo.png";
import { Link } from "react-router-dom";
import { BsFillHeartFill } from "react-icons/bs";
import "./reader.css";
// import girl from "../../Assets/girl.png";
import ReaderViewWishlist from "./ReaderViewWishlist";
import axiosInstance from "../../BaseUrl";

function ReaderHomeNavbar() {

  //local
  const url = import.meta.env.VITE_API_URL

  const [showWishlistModal, setShowWishlistModal] = useState(false);
  const [data, setData] = useState({ dob: '', image: { filename: '' } })
  const id = localStorage.getItem('userid')

  useEffect(() => {
    axiosInstance.post(`/viewUserById/${id}`)
      .then((res) => {
        // console.log(res);
        setData(res.data.data)
      })
      .catch((err) => {
        console.log(err);
      })
  }, [id])

  const openWishlistModal = () => {
    setShowWishlistModal(true);
  };

  const closeWishlistModal = () => {
    setShowWishlistModal(false);
  };

  // console.log(data);

  return (
    <div>
      <nav className="navbar text-white">
        <div className="container">
          <img src={logo} alt="img" width="120" height="90"></img>
          <span className="navbar-text">
            <nav className="navbar navbar-expand-lg">
              <div className="container-fluid">
                <button
                  className="navbar-toggler"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#navbarSupportedContent"
                  aria-controls="navbarSupportedContent"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
                >
                  <span className="navbar-toggler-icon"></span>
                </button>
                <div
                  className="collapse navbar-collapse"
                  id="navbarSupportedContent"
                >
                  <ul className="navbar-nav  me-auto mb-2 mb-lg-0" id="homenavlist">
                    <li className="nav-item">
                      <Link
                        to="/reader_home"
                        className="nav-link active"
                        id="navheaders"
                        aria-current="page"
                      >
                        HOME
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link
                        to="/reader_about"
                        className="nav-link"
                        href="#!"
                        id="navheaders"
                      >
                        ABOUT
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link
                        to="/reader_view_books"
                        className="nav-link active"
                        aria-current="page"
                        id="navheaders"
                      >
                        BOOKS
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link to="/reader_view_clubs" className="nav-link" href="#!" id="navheaders">
                        LIBRARY
                      </Link>
                      {/* <Link to="#" className="nav-link" href="#!" id="navheaders">
                        LIBRARY
                      </Link> */}
                    </li>
                    <li className="nav-item dropdown">
                      <Link
                        className="nav-link dropdown-toggle"
                        to="#"
                        id="donateDropdown"
                        role="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        <b>DONATE</b>
                      </Link>
                      <ul className="dropdown-menu" aria-labelledby="donateDropdown">
                        <li>
                          <Link className="dropdown-item" to="/reader_donatebook">
                            Add Book
                          </Link>
                        </li>
                        <li>
                          <Link className="dropdown-item" to="/reader-view-all-other-user-book">
                            View  Books
                          </Link>
                        </li>


                        {/* Add more dropdown items if needed */}
                        {/* <li><Link className="dropdown-item" to="/another_link">Another Option</Link></li> */}
                      </ul>
                    </li>

                    <li className="nav-item">
                      <Link
                        to="/reader-view-events"
                        className="nav-link active"
                        aria-current="page"
                        id="navheaders"
                      >
                        EVENTS
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link to="/reader_exchange" className="nav-link" href="#!" id="navheaders">
                        EXCHANGES
                      </Link>
                      {/* <Link to="#" className="nav-link" href="#!" id="navheaders">
                        EXCHANGES
                      </Link> */}
                    </li>
                    {/* <li className="nav-item">
                      <Link
                        to="/reader-view-all-other-user-book"
                        className="nav-link active"
                        aria-current="page"
                        id="navheaders"
                      >
                        ALL BOOKS
                      </Link>
                    </li> */}
                    <li className="nav-item">
                      <Link to="/reader_view_lended_books" className="nav-link" href="#!" id="navheaders">
                       LENDED BOOKS
                      </Link>
                    </li>
                    {/* <li className="nav-item">
                      <Link to="/chat" className="nav-link" href="#!" id="navheaders">
                        CHAT
                      </Link>
                    </li> */}
                    <li className="nav-item">
                      <Link onClick={openWishlistModal} className="nav-link">
                        <BsFillHeartFill />
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link
                        to="/reader_profile_account_info"
                        className="nav-link"
                        href="#!"
                      >
                        <img
                          src={data?.image?.filename ? `${url}/${data.image.filename}` : logo}
                          alt="img"
                          className="readerimg"
                          onError={(e) => { e.target.src = logo }}
                        />
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </nav>
            {showWishlistModal && (
              <ReaderViewWishlist
                show={showWishlistModal}
                setShow={closeWishlistModal}
                url={url}
              />
            )}
          </span>
        </div>
      </nav>
    </div>
  );
}
// deletelater

export default ReaderHomeNavbar;
