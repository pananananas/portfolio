"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Calendar, Send, Loader2 } from "lucide-react"
import { Button } from "~/components/ui/button"
import { Input } from "~/components/ui/input"
import { Textarea } from "~/components/ui/textarea"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "~/components/ui/form"
import { toast } from "sonner"
import { formSchema, submitContactForm, type FormValues } from "~/app/actions"
import { motion } from "framer-motion"

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Initialize the form
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  })

  // Handle form submission
  async function onSubmit(data: FormValues) {
    setIsSubmitting(true)

    try {
      // Call the server action
      await submitContactForm(data)

      toast.success("Message sent!", {
        description: "Thanks for reaching out. I'll get back to you soon.",
      })

      form.reset()
    } catch (_) {
      toast.error("Something went wrong.", {
        description: "Your message couldn't be sent. Please try again.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <motion.section
      id="contact"
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
        Get In Touch
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Contact Form */}
        <motion.div
          className="bg-[#151515] p-6 rounded-lg border border-gray-800"
          initial={{ x: -30, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true }}
        >
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-300">Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Your name"
                          className="bg-[#202020] border-gray-700 focus:border-teal-300/50 text-gray-200"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-300">Email</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="your.email@example.com"
                          type="email"
                          className="bg-[#202020] border-gray-700 focus:border-teal-300/50 text-gray-200"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="subject"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-300">Subject</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="What is this regarding?"
                        className="bg-[#202020] border-gray-700 focus:border-teal-300/50 text-gray-200"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-300">Message</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Your message here..."
                        className="bg-[#202020] border-gray-700 focus:border-teal-300/50 text-gray-200 min-h-[120px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <motion.div
                className="flex justify-end"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.3 }}
                viewport={{ once: true }}
              >
                <Button type="submit" disabled={isSubmitting} className="bg-teal-300 text-[#101010] hover:bg-teal-400">
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 h-4 w-4" />
                      Send Message
                    </>
                  )}
                </Button>
              </motion.div>
            </form>
          </Form>
        </motion.div>

        {/* Contact Info */}
        <motion.div
          className="bg-[#151515] p-6 rounded-lg border border-gray-800 flex flex-col justify-between"
          initial={{ x: 30, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div>
            <motion.h3
              className="text-xl font-semibold mb-4 text-teal-300"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.3 }}
              viewport={{ once: true }}
            >
              Contact Information
            </motion.h3>
            <motion.p
              className="text-gray-300 mb-6"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.4 }}
              viewport={{ once: true }}
            >
              Feel free to reach out if you have any questions. I&apos;m
              always open to new opportunities and interesting projects.
            </motion.p>

            <div className="space-y-4 text-gray-300">
              <motion.div
                className="flex items-center"
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.5 }}
                viewport={{ once: true }}
              >
                <div className="w-8 h-8 rounded-full bg-[#202020] flex items-center justify-center mr-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-teal-300"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <span>ewojdev@gmail.com</span>
              </motion.div>
              <motion.div
                className="flex items-center"
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.6 }}
                viewport={{ once: true }}
              >
                <div className="w-8 h-8 rounded-full bg-[#202020] flex items-center justify-center mr-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-teal-300"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
                <span>Wrocław, Poland</span>
              </motion.div>
            </div>
          </div>

          <motion.div
            className="mt-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.7 }}
            viewport={{ once: true }}
          >
            <h4 className="text-lg font-medium mb-4 text-gray-300">Prefer to schedule a call?</h4>
            <Button
              variant="outline"
              className="w-full bg-[#202020] border-gray-700 hover:bg-[#252525] hover:text-teal-300 group"
              onClick={() => window.open("https://cal.com/ewojdev", "_blank")}
            >
              <Calendar className="mr-2 h-4 w-4 group-hover:text-teal-300" />
              Schedule on Cal.com
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  )
}

