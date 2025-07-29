"use client";
import { motion } from "framer-motion";

const techCategories = [
  {
    name: "AI Development",
    tech: [
      "PyTorch",
      "Diffusers",
      "Transformers",
      "ScikitLearn",
      "Weights&Biases",
      "CUDA",
      "HuggingFace",
      "OpenCV",
      "MediaPipe",
      "NumPy",
    ],
  },
  {
    name: "Web Development",
    tech: [
      "NextJS",
      "React",
      "Vue",
      "React Native",
      "TailwindCSS",
      "TypeScript",
      "JavaScript",
      "HTML/CSS",
      "ThreeJS",
      "PostHog",
    ],
  },
  {
    name: "Backend & DevOps",
    tech: [
      "Python",
      "Django",
      "Node.js",
      "SQL",
      "Spark",
      "Docker",
      "Git",
      "CI/CD",
      "Drizzle",
      "Prisma",
    ],
  },
  {
    name: "Other",
    tech: ["Photoshop", "Lightroom", "Blender", "Figma"],
  },
];

export default function TechStackV4() {
  return (
    <motion.section
      id="tech"
      className="py-16"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <motion.h2
        className="mb-8 border-b border-border pb-2 text-3xl font-bold"
        initial={{ x: -20 }}
        whileInView={{ x: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        Tech I worked with
      </motion.h2>

      {/* Terminal-inspired Layout with Poimandres-like theme */}
      <motion.div
        className="overflow-hidden rounded-lg border border-border bg-card"
        initial={{ y: 20 }}
        whileInView={{ y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        {/* Terminal Header */}
        <div className="flex items-center border-b border-border bg-muted px-4 py-3">
          <div className="mr-4 flex space-x-2">
            <div className="h-3 w-3 rounded-full bg-red-500"></div>
            <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
            <div className="h-3 w-3 rounded-full bg-green-500"></div>
          </div>
          <div className="flex-1 text-center font-mono text-sm text-muted-foreground">
            ewoj@dev ~/tech-stack
          </div>
        </div>

        {/* Terminal Content */}
        <div className="p-6 font-mono text-sm">
          {techCategories.map((category, index) => (
            <motion.div
              key={index}
              className="mb-6"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="mb-2 flex items-center">
                <span className="text-primary">ewoj@dev</span>
                <span className="mx-1 text-muted-foreground">:</span>
                <span className="text-blue-300">~</span>
                <span className="mx-1 text-muted-foreground">$</span>
                <span className="ml-1 text-foreground">
                  echo &ldquo;${category.name}&rdquo;
                </span>
              </div>

              <div className="mb-2 font-bold text-primary">
                {category.name}
              </div>

              <div className="ml-4 grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
                {category.tech.map((tech, techIndex) => (
                  <motion.div
                    key={techIndex}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2, delay: techIndex * 0.03 }}
                    className="flex items-center"
                    viewport={{ once: true }}
                  >
                    <span className="mr-2 text-primary">•</span>
                    <span className="text-foreground">{tech}</span>
                  </motion.div>
                ))}
              </div>

              {index < techCategories.length - 1 && (
                <div className="my-4 border-b border-border"></div>
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.section>
  );
}
