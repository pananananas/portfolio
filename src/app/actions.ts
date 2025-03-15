import { z } from "zod"

// Define the form schema with Zod
export const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  subject: z.string().min(5, { message: "Subject must be at least 5 characters." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
})

export type FormValues = z.infer<typeof formSchema>

export async function submitContactForm(data: FormValues) {
  // "use server"
  
  // Simulate server processing time
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // In a real app, you would send an email or store in a database
  // console.log("Form submitted:", data)

  return { success: true }
}

