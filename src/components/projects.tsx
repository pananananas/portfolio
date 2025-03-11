"use client"

import { Badge } from "~/components/ui/badge"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "~/components/ui/card"
import { motion } from "framer-motion"

const mainProjects = [
  {
    title: "InkMe",
    description: "Tattoo visualization app that helps users preview tattoo designs on their body using AI.",
    tech: ["Diffusion Models", "NextJS", "TailwindCSS", "TypeScript"],
    highlight: true,
    inProgress: true,
  },
  {
    title: "MV Diffusion",
    description: "Development and research on multi-view diffusion models for consistent 3D-aware image generation.",
    tech: ["PyTorch", "Diffusers", "Python", "CUDA"],
    highlight: true,
    inProgress: true,
  },
  {
    title: "Upscaler",
    description: "A web application for upscaling images using AI models with a modern interface.",
    tech: ["Vue", "TailwindCSS", "Django", "PyTorch"],
    highlight: false,
    inProgress: false,
  },
  {
    title: "BikeFit",
    description: "A mobile application for bike fitting using computer vision to analyze rider posture.",
    tech: ["Ionic", "Vue", "MediaPipe", "TypeScript"],
    highlight: false,
    inProgress: false,
  },
  {
    title: "3D Platform",
    description: "A web application for sharing and editing 3D models with collaborative features.",
    tech: ["NextJS", "Drizzle", "Clerk", "ThreeJS"],
    highlight: false,
    inProgress: false,
  },
  {
    title: "RAG System",
    description:
      "A Retrieval-Augmented Generation system that enhances LLM responses with relevant context from a knowledge base.",
    tech: ["PyTorch", "Transformers", "Vector DB", "Python"],
    highlight: false,
    inProgress: false,
  },
]

const smallProjects = [
  {
    title: "Weather Dashboard",
    description: "Interactive weather dashboard with forecast visualization.",
    tech: ["React", "Chart.js", "Weather API"],
  },
  {
    title: "Markdown Editor",
    description: "Real-time markdown editor with preview and export options.",
    tech: ["Vue", "Marked.js", "LocalStorage"],
  },
  {
    title: "Recipe Finder",
    description: "Search and filter recipes by ingredients and dietary restrictions.",
    tech: ["JavaScript", "Spoonacular API", "CSS Grid"],
  },
  {
    title: "Budget Tracker",
    description: "Personal finance tracker with visualization and categories.",
    tech: ["React", "Firebase", "D3.js"],
  },
]

// Replace the RingLoader component with the provided HTML/CSS
const RingLoader = () => (
  <span className="inline-block w-4 h-4 relative ml-1.5">
    <span className="absolute top-0 left-0 w-4 h-4 border-2 border-orange-400 opacity-40 rounded-full animate-spin-right"></span>
    <span className="absolute top-0 left-0 w-4 h-4 border-2 border-orange-400 opacity-40 rounded-full animate-spin-left"></span>
  </span>
)

export default function Projects() {
  return (
    <motion.section
      id="projects"
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
        My Projects
      </motion.h2>

      {/* Main Projects */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {mainProjects.map((project, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            <Card
              className={`bg-[#151515] border-gray-800 hover:border-gray-700 transition-all h-full ${project.highlight ? "ring-1 ring-teal-300/20" : ""}`}
            >
              <CardHeader className="relative">
                {project.inProgress && (
                  <div className="absolute top-4 right-4 flex items-center">
                    <Badge className="bg-orange-500/20 text-orange-400 hover:bg-orange-500/30 border-none py-1 pr-1">
                      In Progress <RingLoader />
                    </Badge>
                  </div>
                )}
                <CardTitle className={project.highlight ? "text-teal-300" : "text-white"}>{project.title}</CardTitle>
                <CardDescription className="text-gray-400">{project.description}</CardDescription>
              </CardHeader>
              <CardFooter>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech, techIndex) => (
                    <motion.div
                      key={techIndex}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.2, delay: 0.3 + techIndex * 0.05 }}
                      viewport={{ once: true }}
                    >
                      <Badge variant="outline" className="bg-[#202020] text-gray-300 hover:bg-[#252525]">
                        {tech}
                      </Badge>
                    </motion.div>
                  ))}
                </div>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Small Projects */}
      <motion.h3
        className="text-xl font-semibold mb-4 text-teal-300"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        viewport={{ once: true }}
      >
        Other Projects
      </motion.h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {smallProjects.map((project, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
            viewport={{ once: true }}
          >
            <Card className="bg-[#151515] border-gray-800 hover:border-gray-700 transition-all h-full">
              <CardHeader className="p-4">
                <CardTitle className="text-base text-white">{project.title}</CardTitle>
                <CardDescription className="text-xs text-gray-400">{project.description}</CardDescription>
              </CardHeader>
              <CardFooter className="p-4 pt-0">
                <div className="flex flex-wrap gap-1">
                  {project.tech.map((tech, techIndex) => (
                    <motion.div
                      key={techIndex}
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ duration: 0.2, delay: 0.4 + techIndex * 0.05 }}
                      viewport={{ once: true }}
                    >
                      <Badge
                        variant="outline"
                        className="bg-[#202020] text-gray-300 hover:bg-[#252525] text-xs px-2 py-0"
                      >
                        {tech}
                      </Badge>
                    </motion.div>
                  ))}
                </div>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.section>
  )
}

