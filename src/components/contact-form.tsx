"use client";

import { useEffect, useRef, useActionState } from "react";
import { useFormStatus } from "react-dom";
import { Calendar, Send } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";
import { toast } from "sonner";
import { submitContactForm } from "~/app/actions";
import { motion } from "framer-motion";
import posthog from "posthog-js";

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button
      effect="expandIcon"
      icon={Send}
      iconPlacement="right"
      type="submit"
      disabled={pending}
      className="bg-primary text-primary-foreground hover:bg-primary/90"
    >
      {pending ? "Sending..." : "Send Message"}
    </Button>
  );
}

export default function ContactForm() {
  const initialState = { message: "", errors: {}, success: false };
  const [state, formAction] = useActionState(submitContactForm, initialState);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.success) {
      toast.success("Message sent!", {
        description: "Thanks for reaching out. I'll get back to you soon.",
      });
      posthog.capture("contact_form_submitted");
      formRef.current?.reset();
    } else if (state.message && state.errors) {
      if (state.message && !state.success && Object.keys(state.errors).length > 0) {
         toast.error("Something went wrong", {
           description: state.message,
         });
      }
    }
  }, [state]);

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
        className="mb-8 border-b border-border pb-2 text-3xl font-bold"
        initial={{ x: -20 }}
        whileInView={{ x: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        Get In Touch
      </motion.h2>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {/* Contact Form */}
        <motion.div
          className="rounded-lg border border-border bg-card p-6"
          initial={{ x: -30, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true }}
        >
          <form ref={formRef} action={formAction} className="space-y-6">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <label htmlFor="name" className="text-foreground">
                  Name
                </label>
                <Input
                  id="name"
                  name="name"
                  placeholder="Your name"
                  className="border-border bg-background text-foreground focus:border-primary/50"
                  required
                />
                {state.errors?.name?.map((error: string) => (
                  <p className="text-sm font-medium text-red-500" key={error}>
                    {error}
                  </p>
                ))}
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="text-foreground">
                  Email
                </label>
                <Input
                  id="email"
                  name="email"
                  placeholder="your.email@example.com"
                  type="email"
                  className="border-border bg-background text-foreground focus:border-primary/50"
                  required
                />
                {state.errors?.email?.map((error: string) => (
                  <p className="text-sm font-medium text-red-500" key={error}>
                    {error}
                  </p>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="message" className="text-foreground">
                Message
              </label>
              <Textarea
                id="message"
                name="message"
                placeholder="Your message here..."
                className="min-h-[120px] border-border bg-background text-foreground focus:border-primary/50"
                required
              />
              {state.errors?.message?.map((error: string) => (
                <p className="text-sm font-medium text-red-500" key={error}>
                  {error}
                </p>
              ))}
            </div>

            <motion.div
              className="flex justify-end"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <SubmitButton />
            </motion.div>
          </form>
        </motion.div>

        {/* Contact Info */}
        <motion.div
          className="flex flex-col justify-between rounded-lg border border-border bg-card p-6"
          initial={{ x: 0, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div>
            <motion.h3
              className="mb-4 text-xl font-semibold text-primary"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.3 }}
              viewport={{ once: true }}
            >
              Contact Information
            </motion.h3>
            <motion.p
              className="mb-6 text-foreground"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.4 }}
              viewport={{ once: true }}
            >
              Feel free to reach out! :{">"} <br />
            </motion.p>

            <div className="space-y-4 text-foreground">
              <motion.div
                className="flex items-center"
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.5 }}
                viewport={{ once: true }}
              >
                <div className="mr-3 flex h-8 w-8 items-center justify-center rounded-full bg-muted">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-primary"
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
                <div className="mr-3 flex h-8 w-8 items-center justify-center rounded-full bg-muted">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-primary"
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
            <h4 className="mb-4 text-lg font-medium text-foreground">
              Prefer to schedule a call?
            </h4>
            <Button
              variant="outline"
              className="group w-full border-border bg-muted text-muted-foreground hover:bg-muted/80 hover:text-primary"
              effect="expandIcon"
              icon={Calendar}
              iconPlacement="right"
              onClick={() => window.open("https://cal.com/ewojdev", "_blank")}
            >
              Schedule a call!
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
}
