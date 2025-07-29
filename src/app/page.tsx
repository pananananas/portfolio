import Navbar from "~/components/navbar";
import AboutMe from "~/components/about-me";
import Projects from "~/components/projects";
import TechStackV4 from "~/components/tech-stack";
import Experience from "~/components/experience";
import ContactForm from "~/components/contact-form";
import Hobbies from "~/components/hobbies";
import Footer from "~/components/footer";
import HeroV2 from "~/components/hero";
import AuroraBackground from "~/components/aurora-background";

export default function Home() {
  return (
    <main className="min-h-screen font-geist-mono text-foreground">
      <AuroraBackground />
      <div className="relative z-20">
        <Navbar />
        <div className="container mx-auto px-4 pt-20 md:px-24 xl:px-48">
          <HeroV2 />
          <AboutMe />
          <Projects />
          <TechStackV4 />
          <Experience />
          <ContactForm />
          <Hobbies />
          <Footer />
        </div>
      </div>
    </main>
  );
}
