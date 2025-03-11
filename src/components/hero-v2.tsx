"use client"
import { useState, useEffect } from "react"
import { Github, FileText, Calendar } from "lucide-react"
import { Button } from "~/components/ui/button"

const roles = ["AI Engineer", "Web Developer", "UI/UX Designer", "ML Researcher", "Photographer"]

export default function HeroV2() {
  const [roleIndex, setRoleIndex] = useState(0)
  const [displayText, setDisplayText] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const role = roles[roleIndex] ?? ""
    const updateText = () => {
      if (!isDeleting) {
        setDisplayText(role.substring(0, displayText.length + 1))

        if (displayText === role) {
          // Start deleting after a delay
          setTimeout(() => setIsDeleting(true), 1500)
        }
      } else {
        setDisplayText(role.substring(0, displayText.length - 1))

        if (displayText === "") {
          setIsDeleting(false)
          setRoleIndex((roleIndex + 1) % roles.length)
        }
      }
    }

    const timer = setTimeout(updateText, isDeleting ? 100 : 150)
    return () => clearTimeout(timer)
  }, [displayText, isDeleting, roleIndex])

  return (
    <section className="py-16 text-center relative">
      <div className="relative z-10">
        <h1 className="text-2xl md:text-7xl font-bold mb-6">
          <span className="text-white">Eryk Wójcik</span>
        </h1>
        <div className="text-xl md:text-3xl mb-8 h-12">
          <p>
            <span className="text-teal-300">{displayText}</span>
            <span className="text-teal-300 animate-pulse">|</span>
          </p>
        </div>
        <div className="text-gray-400 text-lg mb-8">
          <p>Creating innovative solutions at the intersection of AI and web development</p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap justify-center gap-4">
          <Button
            variant="outline"
            // onClick={() => window.open("https://drive.google.com/file/d/1-_0000000000000000000000000000000000000000/view?usp=sharing", "_blank")}
            className="bg-[#151515] border-gray-700 hover:bg-[#202020] hover:text-teal-300 group"
          >
            <FileText className="mr-2 h-4 w-4 group-hover:text-teal-300" />
            Download CV
          </Button>
          <Button
            variant="outline"
            onClick={() => window.open("https://github.com/pananananas", "_blank")}
            className="bg-[#151515] border-gray-700 hover:bg-[#202020] hover:text-teal-300 group"
          >
            <Github className="mr-2 h-4 w-4 group-hover:text-teal-300" />
            GitHub
          </Button>
          <Button
            variant="outline"
            onClick={() => window.open("https://cal.com/ewojdev/30min", "_blank")}
            className="bg-[#151515] border-gray-700 hover:bg-[#202020] hover:text-teal-300 group"
          >
            <Calendar className="mr-2 h-4 w-4 group-hover:text-teal-300" />
            Schedule a Call
          </Button>
        </div>
      </div>
    </section>
  )
}

