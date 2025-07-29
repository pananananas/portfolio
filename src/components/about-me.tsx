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
          className="mb-8 border-b border-border pb-2 text-3xl font-bold"
          initial={{ x: -20 }}
          whileInView={{ x: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          About Me
        </motion.h2>
        <motion.p
          className="mb-4 leading-relaxed text-muted-foreground"
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true }}
        >
          I&apos;m a software developer from Wrocław, Poland. Recently completed
          Master&apos;s degree in Artificial Intelligence at Wrocław University
          of Science and Technology (WUST).
        </motion.p>
        <motion.p
          className="mb-4 leading-relaxed text-muted-foreground"
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
        >
          With a strong foundation in Computer Vision and experience in both
          research and product development, I am focused on integrating ML
          models into intuitive, user-friendly interfaces.
        </motion.p>
        <motion.p
          className="leading-relaxed text-muted-foreground"
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
        >
          I believe the best AI blends seamlessly into users&apos; workflows, is
          invisible, helpful, and enjoyable to use.
        </motion.p>
      </div>
    </motion.section>
  );
}
