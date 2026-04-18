export const siteConfig = {
  name: "Hasnain Abbas",
  tagline: "Physicist by Training, Developer by Obsession",
  shortBio:
    "Experimental Physicist · Full Stack Developer · Skardu, Pakistan",
  email: "hsnanrzee1160@gmail.com",
  github: "https://github.com/hasnain7abbas",
  linkedin: "https://www.linkedin.com/in/hasnain-abbas-659943273/",
  reddit: "https://www.reddit.com/user/hasnain7abbas/",
  instagram: "https://www.instagram.com/user/hasnain7abbas/",
  facebook: "https://www.facebook.com/user/hasnain7abbas/",
  whatsapp: "https://wa.me/923438833262",
  location: "Skardu, Gilgit Baltistan, Pakistan",
};

export const aboutText = [
  "I'm currently pursuing my MPhil in Physics at Quaid-e-Azam University, Islamabad, where I work as an experimental physicist focused on memristor synthesis and neuromorphic device research. My work involves polymers and ceramic materials, and I independently fabricate thin films using the sol-gel method.",
  "On the software side, I'm entirely self-taught — no CS degree, no bootcamp, no classroom. Whenever I hit a wall, I turn to my younger brother Saqlain Abbas, an AI graduate and professional developer, who has been my go-to teacher since day one. He proved that the best education happens outside lecture halls. From Rust and Tauri desktop apps to Next.js web applications, I taught myself to code driven by curiosity and stubbornness — and with a brother patient enough to answer my questions at 2 AM.",
  "I completed my BS in Physics from COMSATS University Islamabad with a CGPA of 3.2/4.0, served as a visiting lecturer, and trained at PINSTECH in optics and LINAC laboratories. I'm from Skardu, a place where mountains meet the sky — and where my curiosity about how things work began.",
];

export const physicsSkills = [
  "Memristor Synthesis",
  "Neuromorphic Devices",
  "Thin Film Fabrication (Sol-Gel)",
  "XRD Analysis",
  "FTIR Spectroscopy",
  "Sputter Coating",
  "Sawyer-Tower Ferroelectric Measurement",
  "Keithley IV Analysis",
  "Dielectric Characterization",
  "Impedance Spectroscopy",
  "Quantum Optics",
  "Solid State Physics",
  "Statistical Physics",
  "LASER Ablation",
  "Nanoparticle Synthesis",
];

export const devSkills = [
  "Python",
  "C++",
  "Lua",
  "TypeScript",
  "Rust",
  "Next.js",
  "React",
  "Tailwind CSS",
  "Tauri (v2)",
  "Git/GitHub",
  "Framer Motion",
  "Machine Learning",
  "Deep Learning",
  "Mathematica",
  "Docker",
  "Linux",
];

export interface Project {
  title: string;
  description: string;
  tech: string[];
  link: string;
  featured?: boolean;
}

export const projects: Project[] = [
  {
    title: "Visualize Physics",
    description:
      "A Visual Introduction to Quantum & Statistical Physics — Interactive Tauri desktop app with 18 simulations, 200+ statistical tools, and KaTeX math rendering.",
    tech: ["TypeScript", "Tauri", "Rust"],
    link: "https://github.com/hasnain7abbas/visualize-physics",
    featured: true,
  },
  {
    title: "Madar",
    description:
      "Interactive STEM Simulation Browser — 247 physics, chemistry, biology, math & engineering simulations. Desktop app (Tauri) + web.",
    tech: ["TypeScript", "Tauri", "React"],
    link: "https://github.com/hasnain7abbas/Madar",
    featured: true,
  },
  {
    title: "Seeing Theory Desktop",
    description:
      "A visual, interactive introduction to probability & statistics — reimagined as a fast, offline Tauri v2 desktop app with Rust-powered computation.",
    tech: ["TypeScript", "Tauri v2", "Rust"],
    link: "https://github.com/hasnain7abbas/seeing-theory-desktop",
  },
  {
    title: "Spintronics",
    description:
      "A pure Rust library for simulating spin dynamics, spin current generation, and conversion phenomena in magnetic and topological materials.",
    tech: ["Rust"],
    link: "https://github.com/hasnain7abbas/spintronics",
  },
  {
    title: "DigitalShelf",
    description:
      "A visual temporary clipboard dropzone — drag files, text, images, and links onto a floating shelf panel.",
    tech: ["TypeScript"],
    link: "https://github.com/hasnain7abbas/DigitalShelf",
  },
  {
    title: "Matrix Calculator",
    description:
      "Premium dark-themed matrix determinant calculator with recursive cofactor expansion & step-by-step breakdowns. Zero dependencies, single HTML file.",
    tech: ["HTML", "CSS", "JavaScript"],
    link: "https://github.com/hasnain7abbas/matix-calculator",
  },
];

export interface Experience {
  role: string;
  place: string;
  date: string;
  detail: string;
}

export const experiences: Experience[] = [
  {
    role: "MPhil Researcher",
    place: "Quaid-e-Azam University, Islamabad",
    date: "Sep 2024 – Present",
    detail:
      "Memristor synthesis and neuromorphic device research. Working with polymers and ceramic materials, thin film fabrication via sol-gel.",
  },
  {
    role: "Research Intern",
    place: "PINSTECH, Islamabad",
    date: "2023",
    detail:
      "Trained in Optics & LINAC labs. LASER ablation of Ag/Au nanoparticles. Shock wave generation and analysis.",
  },
  {
    role: "Visiting Lecturer",
    place: "GB Institute of Science & Technology, Skardu",
    date: "Oct 2023 – Dec 2023",
    detail: "Lecturer and lab instructor for medical students.",
  },
  {
    role: "Visiting Lecturer",
    place: "FG Boys Degree College, Skardu",
    date: "Mar 2023",
    detail: "Taught BS Physics students. Supervised laboratory work.",
  },
];

export interface BlogPost {
  id: string;
  title: string;
  date: string;
  excerpt: string;
  content: string;
  tags: string[];
}

export const blogPosts: BlogPost[] = [
  {
    id: "memristor-journey",
    title: "My Journey into Memristor Synthesis",
    date: "Mar 2026",
    excerpt:
      "How I went from reading about neuromorphic computing to fabricating memristive devices in the lab — the failures, breakthroughs, and everything in between.",
    content:
      "When I first encountered the concept of memristors during my BS, I was fascinated by the idea of a device that could remember its own resistance history. Fast forward to my MPhil research at QAU, and I'm now synthesizing these devices using sol-gel thin film fabrication. The path wasn't straightforward — early attempts with polymer-based substrates failed spectacularly, and it took months of iterating on ceramic material compositions before I got reproducible switching behavior. Working with Keithley IV analysis and impedance spectroscopy has taught me patience and precision. The intersection of material science and computing architecture is where I believe the next revolution in AI hardware will come from.",
    tags: ["Physics", "Research", "Memristors"],
  },
  {
    id: "tauri-vs-electron",
    title: "Why I Chose Tauri Over Electron",
    date: "Jan 2026",
    excerpt:
      "A physicist's perspective on building desktop apps — why Rust-powered Tauri won me over and what I learned shipping Madar with it.",
    content:
      "As someone who came from physics, not computer science, I needed a desktop framework that wouldn't fight me at every turn. Electron was the obvious choice, but the 200MB+ bundle size for a simple app felt wrong. Then I discovered Tauri — a Rust-based alternative that produces binaries under 10MB. Building Madar (my STEM simulation browser with 247 simulations) with Tauri v2 taught me that constraints breed creativity. The Rust backend forced me to think about memory safety and performance in ways JavaScript never did. Yes, the learning curve was steeper, but the result is an app that starts instantly, uses minimal RAM, and feels native on every platform.",
    tags: ["Rust", "Tauri", "Development"],
  },
  {
    id: "physics-to-code",
    title: "From Lab Notebooks to Git Commits",
    date: "Nov 2025",
    excerpt:
      "How my physics training shaped the way I write software — and why experimental methodology makes you a better developer.",
    content:
      "People often ask how I bridge physics and software development. The truth is, they're not as different as they seem. In the lab, I form hypotheses, design experiments, control variables, and analyze results. In code, I write tests, isolate bugs, profile performance, and ship features. The systematic thinking I developed doing XRD analysis and FTIR spectroscopy directly translates to debugging complex software systems. My brother Saqlain and Alina Tahir, the best AI student I know, showed me that the gap between science and engineering is smaller than academia makes it seem. The key insight: both disciplines reward curiosity and punish assumptions.",
    tags: ["Physics", "Software", "Career"],
  },
  {
    id: "skardu-stem",
    title: "STEM Education in Skardu — What I Wish Existed",
    date: "Sep 2025",
    excerpt:
      "Growing up in Gilgit-Baltistan, access to quality STEM resources was limited. That's why I build tools like Madar.",
    content:
      "Skardu is one of the most beautiful places on Earth — surrounded by Karakoram peaks and crystal-clear lakes. But when I was growing up, the nearest well-equipped physics lab was hundreds of kilometers away. I learned optics from textbook diagrams, not from actual experiments. This is exactly why I built Madar — a free, offline simulation browser that puts 247 interactive STEM simulations on any computer. No internet required, no expensive lab equipment needed. When I was a visiting lecturer at GB Institute of Science & Technology, I saw students' eyes light up when they could finally interact with the phenomena they'd only read about. Technology should democratize education, not gatekeep it.",
    tags: ["Education", "Skardu", "STEM"],
  },
];

export interface Education {
  degree: string;
  institution: string;
  date: string;
  note?: string;
  logo?: string;
}

export const education: Education[] = [
  {
    degree: "MPhil Physics",
    institution: "Quaid-e-Azam University, Islamabad",
    date: "2024 – 2026",
    logo: "./qau-logo.png",
  },
  {
    degree: "BS Physics",
    institution: "COMSATS University, Islamabad",
    date: "2019 – 2023",
    note: "CGPA 3.2/4.0",
    logo: "./comsats-logo.png",
  },
  {
    degree: "HSSC",
    institution: "FG Boys Inter College, Karachi Cantt",
    date: "2016 – 2018",
  },
];
