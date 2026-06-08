import About from "@/components/About";
import Approach from "@/components/Approach";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import Services from "@/components/Services";
import Works from "@/components/Works";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Works />
      <Approach />
      <Services />
      <About />
      <Contact />
      <Footer />
    </main>
  );
}
