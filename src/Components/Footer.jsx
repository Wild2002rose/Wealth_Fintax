import React from "react";
import {
  FaEnvelope,
  FaPhoneAlt,
  FaLinkedin,
  FaFacebook,
  FaSkype,
} from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-neutral-white border-t border-neutral-border mt-14">
      <div className="max-w-7xl mx-auto px-4 py-4">

        <div className="flex md:flex-row justify-between ">
          <div>
            <h4 className="text-sm font-semibold text-primary mb-2">
              Contact Information
            </h4>

            <ul className=" text-sm text-neutral-textSecondary flex gap-6">
              <li className="flex items-center gap-3">
                <FaEnvelope className="text-primary" />
                <a
                  href="mailto:wealthgrowfintaxservices@gmail.com"
                  className="hover:text-primary-default transition"
                >
                  wealthgrowfintaxservices@gmail.com
                </a>
              </li>

              <li className="flex items-center gap-3">
                <FaPhoneAlt className="text-primary" />
                <a
                  href="tel:+919435564566"
                  className="hover:text-primary-default transition"
                >
                  +91 94355 64566
                </a>
              </li>
            </ul>
          </div>

          <div className="mr-20">
            <h4 className="text-sm font-semibold text-primary mb-2 ">
              Connect With Us
            </h4>

            <div className="flex gap-4 text-lg">
              <a
                href="https://www.linkedin.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-textSecondary hover:text-primary-default transition"
                aria-label="LinkedIn"
              >
                <FaLinkedin />
              </a>

              <a
                href="https://www.facebook.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-textSecondary hover:text-primary-default transition"
                aria-label="Facebook"
              >
                <FaFacebook />
              </a>

              <a
                href="skype:live:.cid.your_skype_id?chat"
                className="text-neutral-textSecondary hover:text-primary-default transition"
                aria-label="Skype"
              >
                <FaSkype />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-neutral-border mt-2 pt-2 text-center">
          <p className="text-xs text-neutral-textSecondary">
            © {new Date().getFullYear()} WealthGrow Fintax Services. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
