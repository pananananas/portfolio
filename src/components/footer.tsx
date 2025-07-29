"use client";

import { Github, Linkedin, Mail, Twitter } from "lucide-react";
import { motion } from "framer-motion";
import PixelGrid from "./pixel-grid";
import { ThemeToggle } from "./ui/theme-toggle";

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
      className="mt-16 border-t border-border pt-12"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <div className="mx-auto max-w-3xl pb-4 text-center">
        <div className="mb-6 flex items-center justify-center gap-6">
          <div className="flex space-x-6">
            {socialIcons.map((social, index) => (
              <motion.a
                key={index}
                href={social.href}
                className="text-muted-foreground transition-colors hover:text-primary"
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
          
          {/* Theme Toggle */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <ThemeToggle />
          </motion.div>
        </div>

        <motion.p
          className="text-sm text-muted-foreground"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          viewport={{ once: true }}
        >
          &copy; {new Date().getFullYear()} Eryk Wójcik {":>"}
        </motion.p>
      </div>
      <PixelGrid />
    </motion.footer>
  );
}
