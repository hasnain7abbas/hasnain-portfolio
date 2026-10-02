import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import { Research, Pipeline } from "@/components/Research";
import Teaching from "@/components/Teaching";
import Curriculum from "@/components/Curriculum";
import Software from "@/components/Software";
import Writing from "@/components/Writing";
import Footer from "@/components/Footer";
import FlyingWren from "@/components/Wren";
import Motion from "@/components/Motion";

export default function Home() {
  return (
    <>
      <a href="#research" className="skip">
        Skip to content
      </a>
      <Nav />
      <main>
        <Hero />
        <Research />
        <Pipeline />
        <Teaching />
        <Curriculum />
        <Software />
        <Writing />
      </main>
      <Footer />
      <FlyingWren />
      <Motion />
    </>
  );
}
