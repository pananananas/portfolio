"use client";

import { Badge } from "~/components/ui/badge";
import { motion } from "framer-motion";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";

const mainProjects = [
  {
    title: "MV Diffusion",
    description:
      "In my Masters Thesis I am working on a custom adapter for diffusion model to fine tune model for consistent 3D-aware image generation, enhancing the generative Image-to-3D pipeline.",
    tech: ["Python", "PyTorch", "Diffusers", "Blender", "CUDA", "wandb"],
    highlight: true,
    inProgress: true,
    link: "https://github.com/pananananas/MVD",
  },
  {
    title: "TattooAI",
    description:
      "I’m working on a tattoo visualization app that helps users preview designs on their body using various AI methods in realms of Computer Vision including Depth Estimation, Image-to-3D, Inpainting and VLMs",
    tech: ["React-Native", "TailwindCSS", "Expo", "Convex", "Clerk"],
    highlight: true,
    inProgress: true,
  },
  {
    title: "BikeFit",
    description:
      "I co-created award winning mobile app that utilizes CV and ML to analyze users body and propose adjustments to their bike.",
    tech: ["Ionic", "Vue", "MediaPipe", "TypeScript", "ThreeJS"],
    highlight: false,
    inProgress: false,
    link: "https://www.youtube.com/watch?v=lK-Szmm9FS4",
  },
  {
    title: "RAG System",
    description:
      "I built a Retrieval-Augmented Generation system that enhances LLM responses with relevant context from a knowledge base.",
    tech: ["Python", "PyTorch", "Transformers"],
    highlight: false,
    inProgress: false,
    link: "https://github.com/pananananas/NLP",
  },
  {
    title: "Upscaler",
    description:
      "I developed a web application for upscaling images using AI models ESRGAN and DWSR on the backend.",
    tech: ["Vue", "TailwindCSS", "Django", "PyTorch"],
    highlight: false,
    inProgress: false,
    link: "https://github.com/pananananas/Upscaler",
  },
  {
    title: "Structure from Motion",
    description:
      "I built a fundamental 3D reconstruction pipeline from scratch, converting image sequences into camera poses and 3D point clouds.",
    tech: ["Python", "OpenCV", "NumPy"],
    highlight: false,
    inProgress: false,
    link: "https://github.com/pananananas/StructFromMotion",
  },
];

const smallProjects = [
  {
    title: "Fantasy Map Generator",
    description: "I fine-tuned a diffusion model for fantasy map generation.",
    tech: ["Python", "PyTorch", "Diffusers"],
    link: "https://github.com/pananananas/FantasyMapGen",
  },
  {
    title: "Art Portfolio",
    description: "I built a personal website to showcase art portfolio.",
    tech: ["NextJS", "TailwindCSS", "Drizzle"],
    link: "https://haczmarek.vercel.app/",
  },
  {
    title: "Animations in JS",
    description:
      "I took a course on animations in p5.js and made some sketches like the one on the footer :>",
    tech: ["JavaScript", "p5.js"],
    link: "https://github.com/pananananas/SplinesSim",
  },
  {
    title: "Drone Simulator",
    description:
      "I built a drone flight simulator using c++ with no external libraries 💀",
    tech: ["C++"],
  },
];

// Replace the RingLoader component with the provided HTML/CSS
const RingLoader = () => (
  <span className="relative ml-1.5 inline-block h-4 w-4">
    <span className="animate-spin-right absolute left-0 top-0 h-4 w-4 rounded-full border-2 border-orange-400 opacity-40"></span>
    <span className="animate-spin-left absolute left-0 top-0 h-4 w-4 rounded-full border-2 border-orange-400 opacity-40"></span>
  </span>
);

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
        className="mb-8 border-b border-zinc-800 pb-2 text-3xl font-bold"
        initial={{ x: -20 }}
        whileInView={{ x: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        My Projects
      </motion.h2>

      {/* Main Projects */}
      <div className="mb-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {mainProjects.map((project, index) => (
          <motion.div
            key={index}
            className={project.link ? "cursor-pointer" : ""}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            viewport={{ once: true }}
            onClick={() => {
              if (project.link) window.open(project.link, "_blank");
            }}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
          >
            <Card
              className={`h-full border-zinc-800 bg-[#101010] transition-all hover:border-gray-700 ${project.highlight ? "ring-1 ring-teal-300/20" : ""}`}
            >
              <CardHeader className="relative">
                {project.inProgress && (
                  <div className="absolute right-4 top-4 flex items-center">
                    <Badge className="border-none bg-orange-500/20 py-1 pr-1 text-orange-400 hover:bg-orange-500/30">
                      In Progress <RingLoader />
                    </Badge>
                  </div>
                )}
                <CardTitle
                  className={project.highlight ? "text-teal-300" : "text-white"}
                >
                  {project.title}
                </CardTitle>
                <CardDescription className="pt-2 text-gray-400">
                  {project.description}
                </CardDescription>
              </CardHeader>
              <CardFooter>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech, techIndex) => (
                    <motion.div
                      key={techIndex}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{
                        duration: 0.2,
                        delay: 0.3 + techIndex * 0.05,
                      }}
                      viewport={{ once: true }}
                    >
                      <Badge
                        variant="outline"
                        className="bg-[#202020] text-gray-300 hover:bg-[#252525]"
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

      {/* Small Projects */}
      <motion.h3
        className="mb-4 text-xl font-semibold text-teal-300"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        viewport={{ once: true }}
      >
        Other Projects
      </motion.h3>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {smallProjects.map((project, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
            viewport={{ once: true }}
            onClick={() => {
              if (project.link) window.open(project.link, "_blank");
            }}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
          >
            <Card className="h-full border-zinc-800 bg-[#101010] transition-all hover:border-gray-700">
              <CardHeader className="p-4">
                <CardTitle className="text-base text-white">
                  {project.title}
                </CardTitle>
                <CardDescription className="text-xs text-gray-400">
                  {project.description}
                </CardDescription>
              </CardHeader>
              <CardFooter className="p-4 pt-0">
                <div className="flex flex-wrap gap-1">
                  {project.tech.map((tech, techIndex) => (
                    <motion.div
                      key={techIndex}
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{
                        duration: 0.2,
                        delay: 0.4 + techIndex * 0.05,
                      }}
                      viewport={{ once: true }}
                    >
                      <Badge
                        variant="outline"
                        className="bg-[#202020] px-2 py-0 text-xs text-gray-300 hover:bg-[#252525]"
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
  );
}
