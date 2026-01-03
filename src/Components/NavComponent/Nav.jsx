import React, { useState, useRef, useLayoutEffect, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faRefresh,
  faSignIn,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import logo from "../../Assets/Logos/WFSLogo.png";
import { useNavigate } from "react-router-dom";

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

            <form className="space-y-4">
              <div>
                <label className="font-medium text-primary-dark">User ID</label>
                <input
                  type="text"
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

            <form className="space-y-4">
              <div>
                <label className="font-medium text-primary-dark">
                  Full Name
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 mt-1 border border-neutral-border rounded-lg 
                       focus:ring-primary-light focus:ring-2 outline-none"
                  placeholder="Enter your name"
                />
              </div>
              <div>
                <label className="font-medium text-primary-dark">User ID</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 mt-1 border border-neutral-border rounded-lg 
                       focus:ring-primary-light focus:ring-2 outline-none"
                  placeholder="Choose a User ID"
                />
              </div>
              <div>
                <label className="font-medium text-primary-dark">Email</label>
                <input
                  type="email"
                  className="w-full px-4 py-2 mt-1 border border-neutral-border rounded-lg 
                       focus:ring-primary-light focus:ring-2 outline-none"
                  placeholder="Enter your Email"
                />
              </div>
              <div>
                <label className="font-medium text-primary-dark">
                  Password
                </label>
                <input
                  type="password"
                  className="w-full px-4 py-2 mt-1 border border-neutral-border rounded-lg 
                       focus:ring-primary-light focus:ring-2 outline-none"
                  placeholder="Create Password"
                />
              </div>

              <div>
                <label className="font-medium text-primary-dark">
                  Password
                </label>
                <input
                  type="password"
                  className="w-full px-4 py-2 mt-1 border border-neutral-border rounded-lg 
                       focus:ring-primary-light focus:ring-2 outline-none"
                  placeholder="Confirm Password"
                />
              </div>
              <button
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
