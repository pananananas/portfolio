"use client";

import { Github, Linkedin, Mail, Twitter } from "lucide-react";
import { motion } from "framer-motion";
import PixelGridBackground from "./pixel-grid-background";

export default function Footer() {
  const socialIcons = [
    {
      icon: <Github size={20} />,
      label: "GitHub",
      href: "https://github.com/pananananas",
    },
    {
      icon: <Linkedin size={20} />,
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/erykwojcik/",
    },
    {
      icon: <Twitter size={20} />,
      label: "Twitter",
      href: "https://x.com/ewojdev",
    },
    {
      icon: <Mail size={20} />,
      label: "Email",
      href: "mailto:ewojdev@gmail.com",
    },
  ];

  return (
    <motion.footer
      className="mt-16 border-t border-zinc-800 pt-12"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <div className="mx-auto max-w-3xl pb-4 text-center">
        <div className="mb-6 flex justify-center space-x-6">
          {socialIcons.map((social, index) => (
            <motion.a
              key={index}
              href={social.href}
              className="text-gray-400 transition-colors hover:text-teal-300"
              aria-label={social.label}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              whileTap={{ scale: 0.9 }}
              viewport={{ once: true }}
            >
              {social.icon}
            </motion.a>
          ))}
        </div>

        <motion.p
          className="text-sm text-gray-500"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
        >
          &copy; {new Date().getFullYear()} Eryk Wójcik. All rights reserved.
        </motion.p>
        <motion.p
          className="mt-2 text-xs text-gray-600"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          viewport={{ once: true }}
        >
          Built with love using Next.js and TailwindCSS
        </motion.p>
      </div>
      <PixelGridBackground />
    </motion.footer>
  );
}
