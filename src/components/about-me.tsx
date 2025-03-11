"use client"

import { motion } from "framer-motion"

export default function AboutMe() {
  return (
    <motion.section
      id="about"
      className="py-16"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <div className="max-w-3xl mx-auto">
        <motion.h2
          className="text-3xl font-bold mb-8 border-b border-gray-800 pb-2"
          initial={{ x: -20 }}
          whileInView={{ x: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          About Me
        </motion.h2>
        <motion.p
          className="text-gray-300 mb-4 leading-relaxed"
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true }}
        >
          I&apos;m a software developer from Wrocław, Poland, currently completing my Master&apos;s degree in Artificial
          Intelligence at Wrocław University of Science and Technology (WUST). My passion lies at the intersection of AI
          and web development, where I enjoy building innovative solutions that leverage cutting-edge technologies.
        </motion.p>
        <motion.p
          className="text-gray-300 leading-relaxed"
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
        >
          With experience in both AI research and practical software development, I focus on creating applications that
          are not only technically sound but also user-friendly and visually appealing.
        </motion.p>
      </div>
    </motion.section>
  )
}

