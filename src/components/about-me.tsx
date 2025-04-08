"use client";

import { motion } from "framer-motion";

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
      <div className="mx-auto max-w-3xl">
        <motion.h2
          className="mb-8 border-b border-zinc-800 pb-2 text-3xl font-bold"
          initial={{ x: -20 }}
          whileInView={{ x: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          About Me
        </motion.h2>
        <motion.p
          className="mb-4 leading-relaxed text-gray-300"
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true }}
        >
          I&apos;m a software developer from Wrocław, Poland, currently
          completing my Master&apos;s degree in Artificial Intelligence at
          Wrocław University of Science and Technology (WUST). 
        </motion.p>
        <motion.p
          className="mb-4 leading-relaxed text-gray-300"
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
        >
          My passion lies
          in developing advanced image editing and generation tools. I have
          hands-on experience with Computer Vision solutions and generative
          pipelines, creating AI-driven tools that are both powerful and
          user-friendly.
        </motion.p>
        <motion.p
          className="leading-relaxed text-gray-300"
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
        >
          My background in both AI development and web technologies allows me to
          understand the complete pipeline from model architecture to final
          deployment, making me adept at turning research concepts into working
          solutions.
        </motion.p>
      </div>
    </motion.section>
  );
}
