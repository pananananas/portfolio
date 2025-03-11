"use client";

import { useState, useEffect } from "react";
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

  useEffect(() => {
    const handleScroll = () => {
      // Set navbar background when scrolled
      setIsScrolled(window.scrollY > 20);

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

  const handleNavClick = (href: string) => {
    setIsOpen(false);

    // Smooth scroll to section
    const element = document.getElementById(href.substring(1));
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="mb-16 tracking-tight">
      <div className="fixed left-0 right-0 top-0 flex flex-col justify-center items-center bg-gradient-to-b from-[#101010] from-20 via-[#101010]/85 z-50">
        <div className="p-4 w-full container mx-auto px-3 md:px-24 xl:px-48">
          <div className="flex justify-between items-center rounded-md border border-zinc-800 bg-[#101010]/85 py-3 px-4">
            <a href="#" className="text-xl font-bold text-teal-300">
              ewoj.dev
            </a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-2">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(item.href);
                  }}
                  className={cn(
                    "transition-all px-3 py-1.5 rounded-md hover:bg-zinc-800/50 cursor-pointer",
                    activeSection === item.href.substring(1) ? "text-teal-300" : "text-gray-300",
                  )}
                >
                  {item.name}
                </a>
              ))}
            </div>

            {/* Mobile Navigation Toggle */}
            <button className="md:hidden group" onClick={() => setIsOpen(!isOpen)}>
              <HamIcon isActive={isOpen} />
            </button>
          </div>

          {/* Mobile Navigation Menu */}
          <AnimatePresence>
            {isOpen && (
              <motion.div 
                className="md:hidden bg-[#101010]/95 backdrop-blur-sm mt-2 rounded-md border border-zinc-800 overflow-hidden"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ 
                  duration: 0.3, 
                  ease: [0.4, 0, 0.2, 1]
                }}
              >
                <motion.div 
                  className="py-4 flex flex-col space-y-4 px-4"
                  initial={{ y: -10 }}
                  animate={{ y: 0 }}
                  transition={{ 
                    duration: 0.2,
                    delay: 0.1
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
                        "text-sm py-2 px-3 rounded-md transition-colors hover:bg-zinc-800/50",
                        activeSection === item.href.substring(1) ? "text-teal-300" : "text-gray-300",
                      )}
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ 
                        duration: 0.2,
                        delay: 0.1 + (i * 0.05)
                      }}
                    >
                      {item.name}
                    </motion.a>
                  ))}
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </nav>
  );
}
