"use client";

import { useState, useEffect, useRef } from "react";
import { cn } from "~/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import BurgerIcon from "./ui/burger-icon";

const navItems = [
  { name: "About", href: "#about" },
  { name: "Projects", href: "#projects" },
  { name: "Tech", href: "#tech" },
  { name: "Experience", href: "#experience" },
  { name: "Contact", href: "#contact" },
];

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

      const halfViewport = window.innerHeight / 2;
      const shouldShowGradient = window.scrollY > halfViewport;

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
              <BurgerIcon isActive={isOpen} />
            </button>
          </div>

          {/* Mobile Navigation Menu */}
          <AnimatePresence mode="sync">
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
                    "relative z-50 mt-2 overflow-hidden rounded-md md:hidden",
                    showGradient
                      ? "border border-zinc-800"
                      : "border border-transparent",
                  )}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{
                    duration: 0.2,
                    ease: "easeInOut",
                  }}
                >
                  {/* Background with opacity transition */}
                  <div className="pointer-events-none absolute inset-0 rounded-md bg-[#101010]/95 backdrop-blur-sm" />

                  <div className="relative z-10 flex flex-col px-4 py-4">
                    {navItems.map((item, i) => (
                      <motion.a
                        key={item.name}
                        href={item.href}
                        onClick={(e) => {
                          e.preventDefault();
                          handleNavClick(item.href);
                        }}
                        className={cn(
                          "rounded-md px-3 py-3 text-sm hover:bg-zinc-800/50",
                          activeSection === item.href.substring(1)
                            ? "text-teal-300"
                            : "text-gray-300",
                        )}
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          duration: 0.15,
                          delay: 0.05 * i,
                        }}
                      >
                        {item.name}
                      </motion.a>
                    ))}
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>
      </div>
    </nav>
  );
}
