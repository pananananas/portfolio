"use client";
import { useState, useEffect } from "react";
import { Github, FileText } from "lucide-react";
import { Button } from "~/components/ui/button";
import { ContactButton } from "~/components/ui/contact-button";

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
          <span className="text-foreground">Eryk Wójcik</span>
        </h1>
        <div className="mb-8 h-12 text-xl md:text-3xl">
          <p>
            <span className="text-primary">{displayText}</span>
            <span className="animate-pulse text-primary">|</span>
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4">
          <Button
            variant="outline"
            onClick={() =>
              window.open(
                "https://utfs.io/f/aslkQcPvYvFBgLw3t6Z6lRc49btIBhT7mrKoCdHaxWPEqzvQ",
                "_blank",
              )
            }
            className="group border-border bg-card text-card-foreground hover:bg-accent hover:text-accent-foreground"
          >
            <FileText className="mr-2 h-4 w-4" />
            CV
          </Button>
          <Button
            variant="outline"
            onClick={() =>
              window.open("https://github.com/pananananas", "_blank")
            }
            className="group border-border bg-card text-card-foreground hover:bg-accent hover:text-accent-foreground"
          >
            <Github className="mr-2 h-4 w-4" />
            GitHub
          </Button>
          <ContactButton
            onClick={(e) => {
              e.preventDefault();
              handleNavClick("#contact");
            }}
          />
        </div>
      </div>
    </section>
  );
}
