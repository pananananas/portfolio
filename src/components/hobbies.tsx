"use client"

import { useState } from "react"
import { motion } from "framer-motion"

// Placeholder for analog photography images
const photos = [
  {
    src: "/placeholder.svg?height=600&width=400",
    alt: "Analog photograph 1",
    caption: "Street scene, 35mm film",
  },
  {
    src: "/placeholder.svg?height=600&width=400",
    alt: "Analog photograph 2",
    caption: "Portrait, medium format",
  },
  {
    src: "/placeholder.svg?height=600&width=400",
    alt: "Analog photograph 3",
    caption: "Landscape, black & white",
  },
]

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
        className="text-3xl font-bold mb-8 border-b border-gray-800 pb-2"
        initial={{ x: -20 }}
        whileInView={{ x: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        Hobbies
      </motion.h2>

      <div className="max-w-3xl mx-auto">
        <motion.h3
          className="text-xl font-semibold mb-4 text-teal-300"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          viewport={{ once: true }}
        >
          Analog Photography
        </motion.h3>

        <motion.p
          className="text-gray-300 mb-8"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          viewport={{ once: true }}
        >
          When I&apos;m not coding, I enjoy capturing moments with my film cameras. There&apos;s something special about
          the process of analog photography - from choosing the right film to the anticipation of developing the
          negatives.
        </motion.p>

        {/* Photo gallery */}

      </div>
    </motion.section>
  )
}

