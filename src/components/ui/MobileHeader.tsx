import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import React, { useEffect, useState } from "react";

interface HeaderProps {}

const MobileHeader: React.FC<HeaderProps> = () => {
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

  return (
    <header className="sticky bg-[#080F1D] lg:hidden top-0 left-0 right-0 z-50">
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
          <Sheet>
            <SheetTrigger asChild>
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
            </SheetTrigger>
            <SheetContent>
              <ul className={`flex flex-col gap-y-2 pt-7`}>
                <li>
                  <a
                    href="/"
                    className={`text-lg   transition-all duration-500 hover:text-[#D92B2C] px-4 py-2 lg:p-0 block  ${
                      activeLink == "/"
                        ? "text-[#D92B2C] font-bold"
                        : "text-black font-normal"
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
                        : "text-black font-normal"
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
                        : "text-black font-normal"
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
                        : "text-black font-normal"
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
                        : "text-black font-normal"
                    }`}
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </SheetContent>
          </Sheet>
        </div>

        {/* Navigation Menu */}

        {/* Contact Button (Hidden on mobile) */}
      </div>
    </header>
  );
};

export default MobileHeader;
