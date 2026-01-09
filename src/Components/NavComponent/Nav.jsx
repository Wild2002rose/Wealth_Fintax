import React, { useState, useRef, useLayoutEffect, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { registerUser, loginUser } from "../../Services/AuthService";
import {
  faRefresh,
  faSignIn,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import logo from "../../Assets/Logos/WFSLogo.png";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function Nav() {
  const navItems = ["Home", "Services", "Industries", "Careers", "About Us"];
  const navRef = useRef(null);
  const [activeItem, setActiveItem] = useState("Home");
  const [underlineStyle, setUnderlineStyle] = useState({
    left: 0,
    width: 0,
    opacity: 0,
  });

  const moveUnderline = (target) => {
    if (!target || !navRef.current) return;
    const linkRect = target.getBoundingClientRect();
    const navRect = navRef.current.getBoundingClientRect();
    const x = linkRect.left - navRect.left;

    setUnderlineStyle({
      left: linkRect.left - navRect.left,
      width: linkRect.width,
      opacity: 1,
    });
  };

  const handleHover = (e) => moveUnderline(e.currentTarget);

  const handleMouseLeave = () => {
    const activeLink = [...navRef.current.querySelectorAll("a")].find(
      (a) => a.textContent === activeItem
    );
    moveUnderline(activeLink);
  };

  const handleClick = (e, item) => {
    e.preventDefault();
    setActiveItem(item);
    moveUnderline(e.currentTarget);
  };

  useLayoutEffect(() => {
    requestAnimationFrame(() => {
      const activeLink = [...navRef.current.querySelectorAll("a")].find(
        (a) => a.textContent === activeItem
      );
      if (activeLink) moveUnderline(activeLink);
    });
  }, [activeItem]);

  useEffect(() => {
    const handleResize = () => {
      const activeLink = [...navRef.current.querySelectorAll("a")].find(
        (a) => a.textContent === activeItem
      );
      if (activeLink) moveUnderline(activeLink);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [activeItem]);

  const navigate = useNavigate();

  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phoneNumber: "",
    address: "",
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [loginData, setLoginData] = useState({
    userId: "",
    password: "",
  });
  const [loginError, setLoginError] = useState({});
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevFormData) => {
      const updatedData = {
        ...prevFormData,
        [name]: value,
      };
      localStorage.setItem('registrationFormData', JSON.stringify(updatedData));
      return updatedData;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setSuccessMessage("");
    try {
      const response = await registerUser(formData);
      
      await Swal.fire({
      icon: "success",
      title: "Registration Successful",
      text: `Your User ID is ${response.data.userId}`,
      confirmButtonColor: "#facc15",
    });
      setSuccessMessage(
        "Registration successful! Your User ID is: " + response.data.userId
      );
      setShowRegister(false);
      setShowLogin(true);
      clearAuthStorage();
      localStorage.removeItem('registrationFormData');
      setFormData({
        name: "",
        email: "",
        password: "",
        phoneNumber: "",
        address: "",
      });
    } catch (error) {
      Swal.fire({
      icon: "error",
      title: "Registration Failed",
      text:
        error.response?.data?.message ||
        "Something went wrong. Please try again.",
      confirmButtonColor: "#ef4444",
    });
      setErrors({
        error:
          error.response?.data?.message ||
          "Registration failed. Please try again.",
      });
    }
  };

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setSuccessMessage("");
    try {
      const response = await loginUser(loginData);
      
      await Swal.fire({
      icon: "success",
      title: "Login Successful",
      text: "Welcome back!",
      timer: 1500,
      showConfirmButton: false,
    });
      setSuccessMessage(
        "Login successful! Your User ID is: " + response.data.userId
      );
      setShowLogin(false);
      clearAuthStorage();
    } catch (error) {
      Swal.fire({
      icon: "error",
      title: "Login Failed",
      text:
        error.response?.data?.message ||
        "Invalid User ID or Password",
      confirmButtonColor: "#ef4444",
    });
      setErrors({
        error:
          error.response?.data?.message || "Login failed. Please try again.",
      });
    }
  };

  const clearAuthStorage = () => {
  localStorage.removeItem("token");
  // localStorage.removeItem("user");
  sessionStorage.removeItem("token");
};


  return (
    <>
      <nav className="h-[80px] flex items-center bg-primary-default text-white shadow-xl px-12 relative z-10 animate-nav transition-all duration-500">
        <div className="flex items-center space-x-4 flex-shrink-0">
          <img
            src={logo}
            alt="WFS Logo"
            className="h-12 w-auto transform transition duration-300 hover:scale-110"
          />
          <div className="text-left leading-snug">
            <p className="font-extrabold text-xl tracking-wider text-yellow-400">
              WealthGrow
            </p>
            <p className="text-sm font-light text-blue-300">FinTax Services</p>
          </div>
          <FontAwesomeIcon
            icon={faRefresh}
            className="h-4 w-4 ml-10 text-blue-300 cursor-pointer hover:text-yellow-400 transition duration-300"
            title="Refresh"
          />
        </div>

        <div
          ref={navRef}
          className="flex-1 flex justify-center space-x-12 font-medium text-sm relative"
          onMouseLeave={handleMouseLeave}
        >
          <span
            className="absolute bottom-[10px] h-[3px] bg-yellow-400 transition-all duration-300 ease-in-out shadow-[0_0_12px_rgba(255,221,0,0.7)] rounded-sm "
            style={underlineStyle}
          />

          {navItems.map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase().replace(/\s+/g, "-")}`}
              onClick={(e) => handleClick(e, item)}
              onMouseEnter={handleHover}
              className={`uppercase tracking-wider py-6 transition duration-300 relative hover:scale-120 hover:trcking-widest ${
                activeItem === item
                  ? "text-yellow-400 "
                  : "text-white hover:text-yellow-400"
              }`}
            >
              {item}
            </a>
          ))}
        </div>

        <div className="flex items-center flex-shrink-0">
          <button
            className="flex items-center space-x-2 px-5 py-2 bg-accent-gold text-primary-dark hover:bg-accent-goldLight rounded-full text-blue-900 font-bold 
        text-sm shadow-lg transition duration-300 ease-in-out transform hover:scale-105"
            onClick={() => setShowLogin(true)}
          >
            <FontAwesomeIcon icon={faSignIn} className="h-4 w-4" />
            <span>Client Login</span>
          </button>
        </div>
      </nav>

      {showLogin && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white w-full max-w-md p-8 rounded-2xl shadow-2xl border border-neutral-border relative">
            <button
              onClick={() => setShowLogin(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-primary-dark"
            >
              <FontAwesomeIcon icon={faTimes} size="lg" />
            </button>

            <h2 className="text-2xl font-bold text-primary-dark text-center mb-6">
              Client Login
            </h2>

            <form className="space-y-4" onSubmit={handleLoginSubmit}>
              {loginError.error && (
                <p className="text-red-500 text-sm">{loginError.error}</p>
              )}
              <div>
                <label className="font-medium text-primary-dark">User ID</label>
                <input
                  type="text"
                  name="userId"
                  value={loginData.userId}
                  onChange={handleLoginChange}
                  className="w-full px-4 py-2 mt-1 border border-neutral-border rounded-lg focus:ring-primary-light focus:ring-2 outline-none"
                  placeholder="Enter your User ID"
                />
              </div>

              <div>
                <label className="font-medium text-primary-dark">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={loginData.password}
                  onChange={handleLoginChange}
                  className="w-full px-4 py-2 mt-1 border border-neutral-border rounded-lg focus:ring-primary-light focus:ring-2 outline-none"
                  placeholder="Enter your Password"
                />
              </div>
              <div className="text-center">
                <button className="text-primary-dark font-medium hover:underline">
                  Forgot Password?
                </button>
              </div>
              <button
                type="submit"
                className="w-full py-2 bg-accent-gold text-primary-dark font-bold rounded-lg 
             shadow-md hover:bg-accent-goldLight
             transform transition-all duration-300 
             hover:scale-[1.03] hover:shadow-xl active:scale-[0.97]"
              >
                Login
              </button>
            </form>
            <div className="text-center mt-2">
              <p className="text-neutral-textSecondary">
                Don’t have User ID?
                <button
                  className="ml-1 text-primary-dark font-semibold hover:underline"
                  onClick={() => {
                    setShowLogin(false);
                    setShowRegister(true);
                  }}
                >
                  Register Here
                </button>
              </p>
            </div>
          </div>
        </div>
      )}

      {showRegister && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white w-full max-w-md p-8 rounded-2xl shadow-2xl border border-neutral-border relative animate-fadeIn">
            <button
              onClick={() => setShowRegister(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-primary-dark"
            >
              <FontAwesomeIcon icon={faTimes} size="lg" />
            </button>

            <h2 className="text-2xl font-bold text-primary-dark text-center mb-6">
              Create an Account
            </h2>
            {/* {errors && <p className="error">{errors.message}</p>}
            {successMessage && (
              <p className="text-green-600 text-sm">{successMessage}</p>
            )} */}
            <form className="space-y-2" onSubmit={handleSubmit}>
              <div>
                <label className="font-medium text-primary-dark">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  className="w-full px-4 py-2 mt-1 border border-neutral-border rounded-lg 
                       focus:ring-primary-light focus:ring-2 outline-none"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Enter your name"
                />
              </div>
              <div>
                <label className="font-medium text-primary-dark">Email</label>
                <input
                  type="email"
                  name="email"
                  className="w-full px-4 py-2 border border-neutral-border rounded-lg 
                       focus:ring-primary-light focus:ring-2 outline-none"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="Enter your Email"
                />
              </div>
              <div>
                <label className="font-medium text-primary-dark">Address</label>
                <input
                  type="text"
                  name="address"
                  className="w-full px-4 py-2 border border-neutral-border rounded-lg 
                       focus:ring-primary-light focus:ring-2 outline-none"
                  value={formData.address}
                  onChange={handleChange}
                  required
                  placeholder="Enter your Address"
                />
              </div>
              <div>
                <label className="font-medium text-primary-dark">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phoneNumber"
                  className="w-full px-4 py-2 border border-neutral-border rounded-lg 
                       focus:ring-primary-light focus:ring-2 outline-none"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  required
                  placeholder="Enter your Phone Number"
                />
              </div>
              <div>
                <label className="font-medium text-primary-dark">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  className="w-full px-4 py-2 border border-neutral-border rounded-lg 
                       focus:ring-primary-light focus:ring-2 outline-none"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  placeholder="Create Password"
                />
              </div>

              <div>
                <label className="font-medium text-primary-dark">
                  Confirm Password
                </label>
                <input
                  type="password"
                  className="w-full px-4 py-2 border border-neutral-border rounded-lg 
                       focus:ring-primary-light focus:ring-2 outline-none"
                  required
                  placeholder="Confirm Password"
                />
              </div>
              <button
                type="submit"
                className="w-full py-2 bg-accent-gold text-primary-dark font-bold rounded-lg 
                     shadow-md hover:bg-accent-goldLight transform transition-all duration-300 
                     hover:scale-[1.03] hover:shadow-xl active:scale-[0.97]"
              >
                Register
              </button>
            </form>
            <div className="text-center mt-2">
              <p className="text-neutral-textSecondary">
                Already have an account?
                <button
                  onClick={() => {
                    setShowRegister(false);
                    setShowLogin(true);
                  }}
                  className="ml-1 text-primary-dark font-semibold hover:underline"
                >
                  Login
                </button>
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Nav;
