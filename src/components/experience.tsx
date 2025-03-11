"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { cn } from "~/lib/utils"

const experiences = [
  {
    role: "Software Developer",
    company: "2REN",
    period: "January 2023 - Present",
    description: "Working on software development projects with a focus on web applications and AI integration.",
    skills: ["Web Development", "AI Integration", "Software Architecture"],
  },
  {
    role: "AI Research Assistant",
    company: "WUST Research Lab",
    period: "September 2022 - December 2022",
    description: "Assisted in research on diffusion models and their applications in computer vision tasks.",
    skills: ["PyTorch", "Diffusion Models", "Research"],
  },
  {
    role: "Web Development Intern",
    company: "Tech Startup",
    period: "June 2022 - August 2022",
    description: "Developed frontend components and integrated APIs for a web application.",
    skills: ["React", "API Integration", "UI/UX"],
  },
]

export default function Experience() {
  const [activeExperience, setActiveExperience] = useState(0)

  return (
    <motion.section
      id="experience"
      className="py-16"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <motion.h2
        className="text-3xl font-bold mb-8 border-b border-gray-800 pb-2"
        initial={{ x: -20 }}
        whileInView={{ x: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        Experience
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Timeline navigation */}
        <div className="md:col-span-1">
          <div className="flex flex-col space-y-1">
            {experiences.map((exp, index) => (
              <motion.button
                key={index}
                onClick={() => setActiveExperience(index)}
                className={cn(
                  "text-left p-4 rounded-lg transition-all",
                  activeExperience === index
                    ? "bg-[#202020] text-teal-300 border-l-2 border-teal-300"
                    : "text-gray-400 hover:bg-[#151515] hover:text-gray-300",
                )}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="font-medium">{exp.company}</div>
                <div className="text-sm opacity-70">{exp.period}</div>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Experience details */}
        <motion.div
          className="md:col-span-2 bg-[#151515] p-6 rounded-lg border border-gray-800"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <motion.div
            key={activeExperience}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.h3
              className="text-xl font-semibold text-white"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              {experiences[activeExperience]?.role}
            </motion.h3>
            <motion.p
              className="text-teal-300 mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              {experiences[activeExperience]?.company}
            </motion.p>
            <motion.p
              className="text-gray-300 mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              {experiences[activeExperience]?.description}
            </motion.p>
            <div className="flex flex-wrap gap-2">
              {experiences[activeExperience]?.skills.map((skill, index) => (
                <motion.span
                  key={index}
                  className="px-3 py-1 bg-[#202020] text-gray-300 text-sm rounded-full"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.2, delay: 0.3 + index * 0.1 }}
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  )
}

