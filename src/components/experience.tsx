"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "~/lib/utils";

const experiences = [
  {
    role: "Software Developer",
    company: "2REN Sp. z o.o.",
    period: "January 2023 - April 2025",
    description:
      "In a non-technical environment, I served as the sole technical resource, overseeing all IT responsibilities. I’m working on a full-stack inventory management system enabling remote stock monitoring and reducing communication overhead with multilingual clients.",
    skills: ["Web Development", "Data Science", "System Integration"],
  },
  {
    role: "Power Tool Technician",
    company: "Hilti Sp. z o.o.",
    period: "May 2019 - June 2019",
    description:
      "I was on an internship and worked on the repair line of power tools.",
    skills: ["Power Tools", "Production Line", "Quality Control"],
  },
  {
    role: "PLC Programmer",
    company: "ThyssenKrupp AG",
    period: "March 2019 - April 2019",
    description:
      "I was on a student exchange program and worked on a projects with the automation department.",
    skills: ["Siemens", "PLC Programming", "Automation"],
  },
];

export default function Experience() {
  const [activeExperience, setActiveExperience] = useState(0);

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
        className="mb-8 border-b border-zinc-800 pb-2 text-3xl font-bold"
        initial={{ x: -20 }}
        whileInView={{ x: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        Experience
      </motion.h2>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {/* Timeline navigation */}
        <div className="md:col-span-1">
          <div className="flex flex-col space-y-1">
            {experiences.map((exp, index) => (
              <motion.button
                key={index}
                onClick={() => setActiveExperience(index)}
                className={cn(
                  "relative flex items-center rounded-lg p-4 text-left transition-all",
                  activeExperience === index
                    ? "bg-[#202020] text-teal-300"
                    : "text-gray-400 hover:bg-[#101010] hover:text-gray-300",
                )}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                {activeExperience === index && (
                  <span className="absolute bottom-2 left-2 top-2 w-1 rounded-full bg-teal-300"></span>
                )}
                <div className="ml-3">
                  <div className="font-medium">{exp.company}</div>
                  <div className="text-sm opacity-70">{exp.period}</div>
                </div>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Experience details */}
        <motion.div
          className="rounded-lg border border-zinc-800 bg-[#101010] p-6 md:col-span-2"
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
              className="mb-4 text-teal-300"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              {experiences[activeExperience]?.company}
            </motion.p>
            <motion.p
              className="mb-6 text-gray-300"
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
                  className="rounded-full bg-[#202020] px-3 py-1 text-sm text-gray-300"
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
  );
}
