"use client";

import { useState, useEffect, useRef } from "react";
import { cn } from "~/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import BurgerIcon from "./ui/burger-icon";

const navItems = [
  { name: "about", href: "#about" },
  { name: "projects", href: "#projects" },
  { name: "tech", href: "#tech" },
  { name: "experience", href: "#experience" },
  { name: "contact", href: "#contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [showGradient, setShowGradient] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const halfViewport = window.innerHeight / 2;
      const shouldShowGradient = window.scrollY > halfViewport;

      setShowGradient(shouldShowGradient);

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

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
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

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const scrollToSection = (elementId: string) => {
    const element = document.getElementById(elementId);
    if (!element) {
      console.error(`Element with ID ${elementId} not found`);
      return;
    }

    const offsetTop = element.getBoundingClientRect().top;
    const scrollOffset = 60;
    const offsetPosition = offsetTop + window.pageYOffset - scrollOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });
  };

  const handleNavClick = (href: string) => {
    setIsOpen(false);

    setTimeout(() => {
      const targetId = href.substring(1);
      scrollToSection(targetId);
    }, 100);
  };

  return (
    <nav className="mb-16 tracking-tight">
      <div className="fixed left-0 right-0 top-0 z-50 flex flex-col items-center justify-center">
        <div
          className="from-20 pointer-events-none absolute inset-0 bg-gradient-to-b from-[#070707] via-[#070707]/85 transition-opacity duration-700 ease-in-out"
          style={{ opacity: showGradient ? 1 : 0 }}
        />

        <div className="container relative z-10 mx-auto w-full p-4 px-3 md:px-20 xl:px-44">
          <div
            className={cn(
              "flex items-center justify-between rounded-md border px-4 py-3 transition-all duration-700 ease-in-out",
              showGradient
                ? "border-zinc-900 bg-[#060606]/70"
                : "border-transparent bg-[#060606]/85",
            )}
          >
            <a href="#" className="text-xl font-bold text-teal-300">
              ewoj.dev
            </a>

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
                      ? "text-teal-200"
                      : "text-gray-400",
                  )}
                >
                  {item.name}
                </a>
              ))}
            </div>

            <button
              ref={buttonRef}
              className="group md:hidden"
              onClick={() => setIsOpen(!isOpen)}
            >
              <BurgerIcon isActive={isOpen} />
            </button>
          </div>

          <AnimatePresence mode="sync">
            {isOpen && (
              <>
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
                  <div className="pointer-events-none absolute inset-0 rounded-md bg-[#070707]/95 backdrop-blur-sm" />

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
