"use client"
import { motion } from "framer-motion"

const techCategories = [
  {
    name: "AI Development",
    tech: [
      "PyTorch",
      "Diffusers",
      "Transformers",
      "scikit-learn",
      "Weights & Biases",
      "CUDA",
      "TensorFlow",
      "Hugging Face",
      "OpenCV",
      "NumPy",
    ],
  },
  {
    name: "Web Development",
    tech: [
      "NextJS",
      "React",
      "Vue",
      "TailwindCSS",
      "TypeScript",
      "JavaScript",
      "HTML/CSS",
      "Drizzle",
      "Prisma",
      "tRPC",
    ],
  },
  {
    name: "Backend & DevOps",
    tech: ["Python", "Django", "Node.js", "Express", "Docker", "Git", "CI/CD", "PostgreSQL", "MongoDB", "AWS"],
  },
  {
    name: "Mobile & Other",
    tech: ["Ionic", "React Native", "MediaPipe", "ThreeJS", "WebGL", "Figma", "Blender", "Unity"],
  },
]

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
        className="text-3xl font-bold mb-8 border-b border-gray-800 pb-2"
        initial={{ x: -20 }}
        whileInView={{ x: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        Tech I Use
      </motion.h2>

      {/* Terminal-inspired Layout with Poimandres-like theme */}
      <motion.div
        className="bg-[#151515] rounded-lg border border-gray-700 overflow-hidden"
        initial={{ y: 20 }}
        whileInView={{ y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        {/* Terminal Header */}
        <div className="bg-[#1a1a1a] px-4 py-3 border-b border-gray-700 flex items-center">
          <div className="flex space-x-2 mr-4">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <div className="text-gray-400 text-sm font-mono flex-1 text-center">ewoj@dev ~ tech-stack</div>
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
              <div className="flex items-center mb-2">
                <span className="text-teal-300">ewoj@dev</span>
                <span className="text-gray-500 mx-1">:</span>
                <span className="text-blue-300">~</span>
                <span className="text-gray-500 mx-1">$</span>
                <span className="text-gray-300 ml-1">echo &ldquo;${category.name}&rdquo;</span>
              </div>

              <div className="mb-2 text-teal-300 font-bold">{category.name}</div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 ml-4">
                {category.tech.map((tech, techIndex) => (
                  <motion.div
                    key={techIndex}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2, delay: techIndex * 0.03 }}
                    className="flex items-center"
                    viewport={{ once: true }}
                  >
                    <span className="text-teal-300 mr-2">•</span>
                    <span className="text-gray-300">{tech}</span>
                  </motion.div>
                ))}
              </div>

              {index < techCategories.length - 1 && <div className="border-b border-gray-800 my-4"></div>}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.section>
  )
}

