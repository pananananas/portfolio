import Navbar from "~/components/navbar";
import AboutMe from "~/components/about-me";
import Projects from "~/components/projects";
import TechStackV4 from "~/components/tech-stack-v4";
import Experience from "~/components/experience";
import ContactForm from "~/components/contact-form";
import Hobbies from "~/components/hobbies";
import Footer from "~/components/footer";
import PixelArt from "~/components/pixel-art";
import HeroV2 from "~/components/hero-v2";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#101010] font-geist-mono text-white">
      <Navbar />
      <div className="container mx-auto px-4 pt-20 md:px-24 xl:px-48">
        <PixelArt />
        <HeroV2 />
        <AboutMe />
        <Projects />
        <TechStackV4 />
        <Experience />
        <ContactForm />
        <Hobbies />
        <Footer />
      </div>
    </main>
  );
}
