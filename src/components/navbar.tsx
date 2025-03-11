"use client"

import { useState, useEffect } from "react"
import { Menu, X } from "lucide-react"
import { cn } from "~/lib/utils"

const navItems = [
  { name: "About", href: "#about" },
  { name: "Projects", href: "#projects" },
  { name: "Tech", href: "#tech" },
  { name: "Experience", href: "#experience" },
  { name: "Contact", href: "#contact" },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("")
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      // Set navbar background when scrolled
      setIsScrolled(window.scrollY > 20)

      // Determine active section
      const sections = navItems.map((item) => item.href.substring(1))

      for (const section of sections.reverse()) {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top <= 100) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleNavClick = (href: string) => {
    setIsOpen(false)

    // Smooth scroll to section
    const element = document.getElementById(href.substring(1))
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled ? "bg-[#101010]/90 backdrop-blur-sm py-3" : "py-7",
      )}
    >
      <div className="container mx-auto px-4 md:px-24 xl:px-48 flex justify-between items-center">
        <a href="#" className="text-xl font-bold text-teal-300">
          ewoj.dev
        </a>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-8">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              onClick={(e) => {
                e.preventDefault()
                handleNavClick(item.href)
              }}
              className={cn(
                "text-sm transition-colors hover:text-teal-300",
                activeSection === item.href.substring(1) ? "text-teal-300" : "text-gray-300",
              )}
            >
              {item.name}
            </a>
          ))}
        </div>

        {/* Mobile Navigation Toggle */}
        <button className="md:hidden text-gray-300 hover:text-teal-300" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      {isOpen && (
        <div className="md:hidden bg-[#101010]/95 backdrop-blur-sm">
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault()
                  handleNavClick(item.href)
                }}
                className={cn(
                  "text-sm py-2 transition-colors hover:text-teal-300",
                  activeSection === item.href.substring(1) ? "text-teal-300" : "text-gray-300",
                )}
              >
                {item.name}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  )
}

