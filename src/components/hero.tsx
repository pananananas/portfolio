"use client";
import { useState, useEffect } from "react";
import { Github, FileText } from "lucide-react";
import { ArrowRightIcon } from "~/components/ui/arrow-right";
import { Button } from "~/components/ui/button";
const roles = [
  "AI Engineer",
  "Web Developer",
  "Data Scientist",
  "Photographer",
];

export default function HeroV2() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const role = roles[roleIndex] ?? "";
    const updateText = () => {
      if (!isDeleting) {
        setDisplayText(role.substring(0, displayText.length + 1));

        if (displayText === role) {
          // Start deleting after a delay
          setTimeout(() => setIsDeleting(true), 1200);
        }
      } else {
        setDisplayText(role.substring(0, displayText.length - 1));

        if (displayText === "") {
          setIsDeleting(false);
          setRoleIndex((roleIndex + 1) % roles.length);
        }
      }
    };

    const timer = setTimeout(updateText, isDeleting ? 100 : 150);
    return () => clearTimeout(timer);
  }, [displayText, isDeleting, roleIndex]);

  const scrollToSection = (elementId: string) => {
    const element = document.getElementById(elementId);
    if (!element) return;
    const offsetTop = element.getBoundingClientRect().top;
    const scrollOffset = 60;
    const offsetPosition = offsetTop + window.pageYOffset - scrollOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });
  };

  const handleNavClick = (href: string) => {
    setTimeout(() => {
      const targetId = href.substring(1);
      scrollToSection(targetId);
    }, 100);
  };

  return (
    <section className="relative pt-[40vh] text-center">
      <div className="relative z-10">
        <h1 className="mb-6 text-2xl font-bold md:text-7xl">
          <span className="text-white">Eryk Wójcik</span>
        </h1>
        <div className="mb-8 h-12 text-xl md:text-3xl">
          <p>
            <span className="text-teal-300">{displayText}</span>
            <span className="animate-pulse text-teal-300">|</span>
          </p>
        </div>
        {/* <div className="mb-8 text-lg text-gray-400">
          <p>Building AI models and web applications</p>
        </div> */}

        <div className="flex flex-wrap justify-center gap-4">
          <Button
            variant="secondary"
            onClick={() =>
              window.open(
                "https://utfs.io/f/aslkQcPvYvFBcvEd85Ojgd0FnaW4ieXphRm7woxGT8t3EJkf",
                "_blank",
              )
            }
            className="group border-gray-700 bg-[#080808] text-gray-300 hover:bg-[#151515] hover:text-teal-100"
          >
            <FileText className="mr-2 h-4 w-4 group-hover:text-teal-100" />
            CV
          </Button>
          <Button
            variant="secondary"
            onClick={() =>
              window.open("https://github.com/pananananas", "_blank")
            }
            className="group border-gray-700 bg-[#080808] text-gray-300 hover:bg-[#151515] hover:text-teal-100"
          >
            <Github className="mr-2 h-4 w-4 group-hover:text-teal-100" />
            GitHub
          </Button>
          <Button
            variant="holographicDark"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick("#contact");
            }}
          >
            <div className="flex items-center gap-2">
              Contact
              <ArrowRightIcon className="-rotate-45" />
            </div>
          </Button>
        </div>
      </div>
    </section>
  );
}
