"use client";

// import { useState } from "react";
import { motion } from "framer-motion";

// Placeholder for analog photography images
// const photos = [
//   {
//     src: "/placeholder.svg?height=600&width=400",
//     alt: "Analog photograph 1",
//     caption: "Street scene, 35mm film",
//   },
//   {
//     src: "/placeholder.svg?height=600&width=400",
//     alt: "Analog photograph 2",
//     caption: "Portrait, medium format",
//   },
//   {
//     src: "/placeholder.svg?height=600&width=400",
//     alt: "Analog photograph 3",
//     caption: "Landscape, black & white",
//   },
// ];

export default function Hobbies() {
  // Commented out for future use
  // const [currentPhoto, setCurrentPhoto] = useState(0)

  // const nextPhoto = () => {
  //   setCurrentPhoto((prev) => (prev + 1) % photos.length)
  // }

  // const prevPhoto = () => {
  //   setCurrentPhoto((prev) => (prev - 1 + photos.length) % photos.length)
  // }

  return (
    <motion.section
      id="hobbies"
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
        Hobbies
      </motion.h2>

      <div className="mx-auto max-w-3xl">
        <motion.h3
          className="mb-4 text-xl font-semibold text-primary"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          viewport={{ once: true }}
        >
          Analog Photography
        </motion.h3>
        <motion.p
          className="mb-8 text-muted-foreground"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          viewport={{ once: true }}
        >
          When I&apos;m not coding, I enjoy capturing moments with one of my
          analog cameras. I&apos;m a huge retro gear nerd and I appreciate the
          intentionality that is enforced by taking pictures on film.
        </motion.p>
        Gallery comming soon
        {/* Photo gallery */}
      </div>
    </motion.section>
  );
}
