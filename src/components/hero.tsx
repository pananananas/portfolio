"use client";
import { useState, useEffect } from "react";
import { Github, FileText, Calendar } from "lucide-react";
import { Button } from "~/components/ui/button";

const roles = [
  "AI Engineer",
  "Web Developer",
  "UI/UX Designer",
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
            variant="outline"
            // onClick={() => window.open("https://drive.google.com/file/d/1-_0000000000000000000000000000000000000000/view?usp=sharing", "_blank")}
            className="group border-gray-700 bg-[#151515] hover:bg-[#202020] hover:text-teal-300"
          >
            <FileText className="mr-2 h-4 w-4 group-hover:text-teal-300" />
            CV
          </Button>
          <Button
            variant="outline"
            onClick={() =>
              window.open("https://github.com/pananananas", "_blank")
            }
            className="group border-gray-700 bg-[#151515] hover:bg-[#202020] hover:text-teal-300"
          >
            <Github className="mr-2 h-4 w-4 group-hover:text-teal-300" />
            GitHub
          </Button>
          <Button
            variant="outline"
            onClick={() =>
              window.open("https://cal.com/ewojdev/30min", "_blank")
            }
            className="group border-gray-700 bg-[#151515] hover:bg-[#202020] hover:text-teal-300"
          >
            <Calendar className="mr-2 h-4 w-4 group-hover:text-teal-300" />
            Schedule a Call
          </Button>
        </div>
      </div>
    </section>
  );
}
