"use client";

import { useState, useEffect, useRef } from "react";
import { cn } from "~/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  { name: "About", href: "#about" },
  { name: "Projects", href: "#projects" },
  { name: "Tech", href: "#tech" },
  { name: "Experience", href: "#experience" },
  { name: "Contact", href: "#contact" },
];

type HamIconProps = {
  isActive: boolean;
};

const HamIcon: React.FC<HamIconProps> = ({ isActive }) => {
  return (
    <svg
      className={`h-10 w-10 cursor-pointer ${isActive ? "rotate-45" : ""}`}
      style={{
        transition: "transform 400ms",
      }}
      viewBox="0 0 100 100"
    >
      <path
        className="stroke-current text-gray-300 transition-colors"
        d="m 70,33 h -40 c 0,0 -6,1.368796 -6,8.5 0,7.131204 6,8.5013 6,8.5013 l 20,-0.0013"
        strokeWidth={5.5}
        fill="none"
        strokeLinecap="round"
        style={{
          transition: "stroke-dasharray 400ms, stroke-dashoffset 400ms",
          strokeDasharray: isActive ? "17 82" : "40 82",
          strokeDashoffset: isActive ? "-62px" : "0",
        }}
      />
      <path
        className="stroke-current text-gray-300 transition-colors"
        d="m 70,50 h -40"
        strokeWidth={5.5}
        fill="none"
        strokeLinecap="round"
        style={{
          transition: "stroke-dasharray 400ms, stroke-dashoffset 400ms",
          strokeDasharray: isActive ? "40 111" : "40 111",
          strokeDashoffset: isActive ? "23px" : "0",
        }}
      />
      <path
        className="stroke-current text-gray-300 transition-colors"
        d="m 69.575405,67.073826 h -40 c -5.592752,0 -6.873604,-9.348582 1.371031,-9.348582 8.244634,0 19.053564,21.797129 19.053564,12.274756 l 0,-40"
        strokeWidth={5.5}
        fill="none"
        strokeLinecap="round"
        style={{
          transition: "stroke-dasharray 400ms, stroke-dashoffset 400ms",
          strokeDasharray: isActive ? "40 161" : "40 161",
          strokeDashoffset: isActive ? "-83px" : "0",
        }}
      />
    </svg>
  );
};

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);
  const [showGradient, setShowGradient] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      // Set navbar background when scrolled
      setIsScrolled(window.scrollY > 20);

      // Show gradient when scrolled halfway down the viewport
      const halfViewport = window.innerHeight / 2;
      const shouldShowGradient = window.scrollY > halfViewport;

      // Only log when state changes to reduce console spam
      if (shouldShowGradient !== showGradient) {
        console.log(
          `Gradient State Change: ${showGradient} → ${shouldShowGradient}`,
        );
        console.log(
          `Scroll position: ${window.scrollY}, Half viewport: ${halfViewport}`,
        );
        console.log(
          `Using opacity transition instead of class toggle for gradient`,
        );
      }

      setShowGradient(shouldShowGradient);

      // Determine active section
      const sections = navItems.map((item) => item.href.substring(1));

      for (const section of sections.reverse()) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle clicks outside the menu
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Close the menu if it's open and the click is outside the menu and toggle button
      if (
        isOpen &&
        menuRef.current &&
        buttonRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    // Add the event listener when the menu is open
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    // Clean up
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  // Custom scroll function with offset
  const scrollToSection = (elementId: string) => {
    const element = document.getElementById(elementId);
    if (!element) {
      console.error(`Element with ID ${elementId} not found`);
      return;
    }

    // Calculate scroll position with offset
    const offsetTop = element.getBoundingClientRect().top;
    const scrollOffset = 60; // Add offset in pixels (adjust as needed)
    const offsetPosition = offsetTop + window.pageYOffset - scrollOffset;

    // Perform smooth scroll
    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });
  };

  const handleNavClick = (href: string) => {
    // Close the menu first
    setIsOpen(false);

    // Wait for animation to complete before scrolling
    setTimeout(() => {
      // Smooth scroll to section with offset
      const targetId = href.substring(1);
      scrollToSection(targetId);
    }, 100); // Matches the duration of the menu closing animation
  };

  return (
    <nav className="mb-16 tracking-tight">
      <div className="fixed left-0 right-0 top-0 z-50 flex flex-col items-center justify-center">
        <div
          className="from-20 pointer-events-none absolute inset-0 bg-gradient-to-b from-[#101010] via-[#101010]/85 transition-opacity duration-700 ease-in-out"
          style={{ opacity: showGradient ? 1 : 0 }}
        />

        <div className="container relative z-10 mx-auto w-full p-4 px-3 md:px-20 xl:px-44">
          <div
            className={cn(
              "flex items-center justify-between rounded-md border px-4 py-3 transition-all duration-700 ease-in-out",
              showGradient
                ? "border-zinc-800 bg-[#060606]/70"
                : "border-transparent bg-[#060606]/85",
            )}
          >
            <a href="#" className="text-xl font-bold text-teal-300">
              ewoj.dev
            </a>

            {/* Desktop Navigation */}
            <div className="hidden space-x-2 md:flex">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(item.href);
                  }}
                  className={cn(
                    "cursor-pointer rounded-md px-3 py-1.5 transition-all hover:bg-zinc-800/50",
                    activeSection === item.href.substring(1)
                      ? "text-teal-300"
                      : "text-gray-300",
                  )}
                >
                  {item.name}
                </a>
              ))}
            </div>

            {/* Mobile Navigation Toggle */}
            <button
              ref={buttonRef}
              className="group md:hidden"
              onClick={() => setIsOpen(!isOpen)}
            >
              <HamIcon isActive={isOpen} />
            </button>
          </div>

          {/* Mobile Navigation Menu */}
          <AnimatePresence>
            {isOpen && (
              <>
                {/* Optional click overlay - can be uncommented if needed for better touch targets */}
                {/* <div 
                  className="fixed inset-0 z-40 md:hidden" 
                  onClick={() => setIsOpen(false)}
                /> */}

                <motion.div
                  ref={menuRef}
                  className={cn(
                    "relative z-50 mt-2 overflow-hidden rounded-md transition-all duration-700 ease-in-out md:hidden",
                    showGradient
                      ? "border border-zinc-800"
                      : "border border-transparent",
                  )}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{
                    duration: 0.3,
                    ease: [0.4, 0, 0.2, 1],
                  }}
                >
                  {/* Background with opacity transition */}
                  <div
                    className="pointer-events-none absolute inset-0 rounded-md bg-[#101010]/95 backdrop-blur-sm transition-opacity duration-700 ease-in-out"
                  />

                  <motion.div
                    className="relative z-10 flex flex-col space-y-4 px-4 py-4"
                    initial={{ y: -10 }}
                    animate={{ y: 0 }}
                    transition={{
                      duration: 0.2,
                      delay: 0.1,
                    }}
                  >
                    {navItems.map((item, i) => (
                      <motion.a
                        key={item.name}
                        href={item.href}
                        onClick={(e) => {
                          e.preventDefault();
                          handleNavClick(item.href);
                        }}
                        className={cn(
                          "rounded-md px-3 py-2 text-sm transition-colors hover:bg-zinc-800/50",
                          activeSection === item.href.substring(1)
                            ? "text-teal-300"
                            : "text-gray-300",
                        )}
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          duration: 0.2,
                          delay: 0.1 + i * 0.05,
                        }}
                      >
                        {item.name}
                      </motion.a>
                    ))}
                  </motion.div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>
      </div>
    </nav>
  );
}
