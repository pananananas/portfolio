"use server";

import { Resend } from "resend";
import { formSchema } from "~/lib/schema";
import { ContactFormEmail } from "~/components/emails/contact-form-email";

const resend = new Resend(process.env.RESEND_API_KEY);

type FormState = {
  message: string;
  errors?: {
    name?: string[];
    email?: string[];
    message?: string[];
  };
  success: boolean;
};

export async function submitContactForm(
  prevState: FormState,
  formData: FormData,
): Promise<FormState> {
  const validatedFields = formSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    message: formData.get("message"),
  });

  if (!validatedFields.success) {
    return {
      message: "Please fix the errors below.",
      errors: validatedFields.error.flatten().fieldErrors,
      success: false,
    };
  }

  const { name, email, message } = validatedFields.data;

  try {
    const data = await resend.emails.send({
      from: "Portfolio Contact Form <onboarding@resend.dev>",
      to: "drumpixtv@gmail.com",
      subject: "New message from your portfolio",
      react: ContactFormEmail({ name, email, message }),
    });

    if (data.error) {
      console.error("Resend error:", data.error);
      return {
        message: "Error sending message.",
        success: false,
        errors: {},
      };
    }

    return { message: "Message sent successfully!", success: true, errors: {} };
  } catch (error) {
    console.error("Failed to send email:", error);
    return {
      message: "An unexpected error occurred.",
      success: false,
      errors: {},
    };
  }
}
