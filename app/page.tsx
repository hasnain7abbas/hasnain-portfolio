import TopBar from "@/components/TopBar";
import TitlePage from "@/components/TitlePage";
import { Closing, Contents, Curriculum, Notes, Research, Software, Teaching } from "@/components/Sections";

/* Everything here renders to static HTML; client/main.ts (public/site.js) adds the motion. */
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
    </>
  );
}
