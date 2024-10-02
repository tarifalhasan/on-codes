import React, { useEffect, useState } from "react";
import { Button } from "./button";

interface HeaderProps {}

const Header: React.FC<HeaderProps> = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState<string>("/");

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  // Function to set the active link based on URL
  const updateActiveLink = () => {
    const currentHash = window.location.hash; // Get the hash part of the URL (e.g., #about)
    if (currentHash) {
      setActiveLink(currentHash);
    } else {
      setActiveLink(window.location.pathname); // Fallback to the pathname if there's no hash
    }
  };

  // Set the active link on initial load and hash changes
  useEffect(() => {
    updateActiveLink(); // Set active link on initial load

    window.addEventListener("hashchange", updateActiveLink); // Listen for hash changes
    return () => {
      window.removeEventListener("hashchange", updateActiveLink); // Cleanup listener on unmount
    };
  }, []);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash) {
        const element = document.querySelector(hash);
        if (element) {
          const yOffset = -100; // Offset to prevent the header from covering the title
          const y =
            element.getBoundingClientRect().top + window.pageYOffset + yOffset;
          window.scrollTo({ top: y, behavior: "smooth" });
        }
      }
    };

    window.addEventListener("hashchange", handleHashChange);

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  return (
    <header className="sticky hidden lg:block bg-[#080F1D] top-0 left-0 right-0 z-50">
      <div className="container mx-auto flex items-center justify-between p-4">
        {/* Logo */}
        <div>
          <img
            src={`/logo.png`}
            alt="logo"
            className="h-16 w-[148px] object-cover"
          />
        </div>

        {/* Hamburger Icon for mobile */}
        <div className="lg:hidden">
          <button
            id="menu-button"
            type="button"
            className="text-white focus:outline-none"
            onClick={toggleMenu}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>

        {/* Navigation Menu */}
        <ul
          //   id="menu"
          className={`lg:flex py-10 lg:py-1 flex-col lg:flex-row items-center gap-6 lg:gap-x-12 absolute lg:static top-20 left-0 w-full lg:w-auto bg-white lg:bg-transparent z-40 lg:z-auto shadow-lg lg:shadow-none`}
        >
          <li>
            <a
              href="/"
              className={`text-lg   transition-all duration-500 hover:text-[#D92B2C] px-4 py-2 lg:p-0 block  ${
                activeLink == "/"
                  ? "text-[#D92B2C] font-bold"
                  : "text-white font-normal"
              }`}
            >
              Home
            </a>
          </li>
          <li>
            <a
              href="#about"
              className={`text-lg   transition-all duration-500 hover:text-[#D92B2C] px-4 py-2 lg:p-0 block lg:inline ${
                activeLink == "#about"
                  ? "text-[#D92B2C] font-bold"
                  : "text-white font-normal"
              }`}
            >
              About
            </a>
          </li>
          <li>
            <a
              href="#services"
              className={`text-lg   transition-all duration-500 hover:text-[#D92B2C] px-4 py-2 lg:p-0 block lg:inline ${
                activeLink === "#services"
                  ? "text-[#D92B2C] font-bold"
                  : "text-white font-normal"
              }`}
            >
              Services
            </a>
          </li>
          <li>
            <a
              href="#technologies"
              className={`text-lg   transition-all duration-500 hover:text-[#D92B2C] px-4 py-2 lg:p-0 block lg:inline ${
                activeLink === "#technologies"
                  ? "text-[#D92B2C] font-bold"
                  : "text-white font-normal"
              }`}
            >
              Technologies
            </a>
          </li>
          <li>
            <a
              href="#contact"
              className={`text-lg   transition-all duration-500 hover:text-[#D92B2C] px-4 py-2 lg:p-0 block lg:inline ${
                activeLink === "#contact"
                  ? "text-[#D92B2C] font-bold"
                  : "text-white font-normal"
              }`}
            >
              Contact
            </a>
          </li>
        </ul>

        {/* Contact Button (Hidden on mobile) */}
        <div className="hidden lg:block">
          <Button
            variant="secondary"
            size="lg"
            className="px-6 py-2 rounded-full"
          >
            Contact Us
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
