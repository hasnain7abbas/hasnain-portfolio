export const siteConfig = {
  name: "Hasnain Abbas",
  tagline: "Physicist by Training, Developer by Obsession",
  shortBio:
    "Experimental Physicist · Full Stack Developer · Skardu, Pakistan",
  email: "hsnanrzee1160@gmail.com",
  github: "https://github.com/hasnain7abbas",
  linkedin: "#",
  reddit: "https://www.reddit.com/user/hasnain7abbas/",
  instagram: "https://instagram.com/hasnain7abbas",
  location: "Skardu, Gilgit Baltistan, Pakistan",
};

export const aboutText = [
  "I'm currently pursuing my MPhil in Physics at Quaid-e-Azam University, Islamabad, where I work as an experimental physicist focused on memristor synthesis and neuromorphic device research. My work involves polymers and ceramic materials, and I independently fabricate thin films using the sol-gel method.",
  "Beyond the lab, I'm a self-taught full stack developer with a passion for building desktop applications using Rust and Tauri, and web apps with Next.js. I find deep satisfaction in bridging the gap between physics and software — whether it's simulating spin dynamics in Rust or creating interactive STEM education tools.",
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

export interface Education {
  degree: string;
  institution: string;
  date: string;
  note?: string;
}

export const education: Education[] = [
  {
    degree: "MPhil Physics",
    institution: "Quaid-e-Azam University, Islamabad",
    date: "2024 – 2026",
  },
  {
    degree: "BS Physics",
    institution: "COMSATS University, Islamabad",
    date: "2019 – 2023",
    note: "CGPA 3.2/4.0",
  },
  {
    degree: "HSSC",
    institution: "FG Boys Inter College, Karachi Cantt",
    date: "2016 – 2018",
  },
];
