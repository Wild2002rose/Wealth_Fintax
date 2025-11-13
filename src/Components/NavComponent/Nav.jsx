import React, { useState, useRef, useLayoutEffect, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRefresh, faSignIn } from "@fortawesome/free-solid-svg-icons";
import logo from "../../Assets/Logos/WFSLogo.png";

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
  

  return (
    <nav className="h-[80px] flex items-center bg-blue-900 text-white shadow-xl px-12 relative z-10 animate-nav transition-all duration-500">
      
      <div className="flex items-center space-x-4 flex-shrink-0">
        <img src={logo} alt="WFS Logo" className="h-12 w-auto transform transition duration-300 hover:scale-110" />
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
        <button className="flex items-center space-x-2 px-5 py-2 bg-yellow-500 rounded-full text-blue-900 font-bold 
        text-sm shadow-lg hover:bg-yellow-400 transition duration-300 ease-in-out transform hover:scale-105">
          <FontAwesomeIcon icon={faSignIn} className="h-4 w-4" />
          <span>Client Login</span>
        </button>
      </div>
    </nav>
  );
}

export default Nav;
