import TopBar from "@/components/TopBar";
import TitlePage from "@/components/TitlePage";
import { Closing, Contents, Curriculum, Notes, Research, Software, Teaching } from "@/components/Sections";
import Motion from "@/components/Motion";

export default function Home() {
  return (
    <>
      <a href="#research" className="skip">
        Skip to the research
      </a>
      <TopBar />
      <main className="paper">
        <TitlePage />
        <Contents />
        <Research />
        <Teaching />
        <Software />
        <Curriculum />
        <Notes />
        <Closing />
      </main>
      {/* Chalk: a slight roughness on every stroke and on the handwriting. */}
      <svg width="0" height="0" aria-hidden="true" style={{ position: "absolute" }}>
        <filter id="chalk" x="-5%" y="-5%" width="110%" height="110%">
          <feTurbulence type="fractalNoise" baseFrequency="1.6" numOctaves="2" seed="7" result="n" />
          <feDisplacementMap in="SourceGraphic" in2="n" scale="1.6" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </svg>
      <Motion />
    </>
  );
}
