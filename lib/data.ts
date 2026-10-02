export const siteConfig = {
  name: "Hasnain Abbas",
  role: "Experimental physicist",
  focus: "Memristive and synaptic devices for neuromorphic computing",
  affiliation: "Quaid-i-Azam University, Islamabad",
  location: "Skardu, Gilgit-Baltistan, Pakistan",
  email: "hsnanrzee1160@gmail.com",
  resume: "/hasnain-portfolio/Hasnain-Abbas-Resume.pdf",
  github: "https://github.com/hasnain7abbas",
  linkedin: "https://www.linkedin.com/in/hasnain-abbas-659943273/",
  reddit: "https://www.reddit.com/user/hasnain7abbas/",
  instagram: "https://www.instagram.com/user/hasnain7abbas/",
  facebook: "https://www.facebook.com/user/hasnain7abbas/",
  whatsapp: "https://wa.me/923438833262",
};

export const researchProfile = [
  "I am an MPhil physics researcher at Quaid-i-Azam University, working across the full memristive stack: from sol-gel synthesis of Co-substituted BiFeO₃ thin films, through ferroelectric and resistive-switching characterization, to device-aware neural-network simulation that uses measured device conductance as synaptic weights.",
  "I grew up in Skardu, where the nearest well-equipped physics lab was hundreds of kilometres away. That distance is why I teach, and why I build free simulation tools alongside the lab work.",
];

export const researchInterests = [
  "Memristive and synaptic devices",
  "Neuromorphic and in-memory computing hardware",
  "Resistive switching in oxide thin films",
  "Ferroelectric and multiferroic thin films",
  "Device-aware neural-network simulation",
  "Sol-gel processing of functional ceramics",
];

export interface Stage {
  name: string;
  summary: string;
  detail: string;
  tools: string[];
}

/* The four stages of the thesis work, in the order a sample travels. */
export const pipeline: Stage[] = [
  {
    name: "Material",
    summary: "Co-substituted BiFeO₃ via sol-gel",
    detail:
      "Synthesize Co-substituted BiFeO₃ ceramic and polymer-blended precursors, tuning the chemistry until the films switch reliably.",
    tools: ["Sol-gel synthesis", "Precursor chemistry"],
  },
  {
    name: "Thin film",
    summary: "Spin coating, annealing, XRD / FTIR",
    detail:
      "Spin-coat and anneal the films, then verify phase purity and microstructure by XRD, FTIR, thickness profilometry and impedance spectroscopy.",
    tools: ["Spin coating", "XRD", "FTIR", "Profilometry"],
  },
  {
    name: "Device",
    summary: "Resistive switching, P–E loops, pulsed I–V",
    detail:
      "Extract remanent polarization and coercive field on a Sawyer-Tower tester, and drive a Keithley 2602 SourceMeter with custom Lua (TSP) scripts for reproducible DC sweep and pulse protocols.",
    tools: ["Keithley 2602", "Lua (TSP)", "Sawyer-Tower"],
  },
  {
    name: "Network",
    summary: "Measured conductance as synaptic weights",
    detail:
      "Map the extracted device conductance into the CrossSim neuromorphic simulator and train MLP networks in PyTorch on MNIST, benchmarking inference accuracy with the measured devices as weights.",
    tools: ["CrossSim", "PyTorch", "MNIST"],
  },
];

export interface LabMedia {
  kind: "photo" | "video";
  src: string;
  poster?: string;
  alt: string;
  caption: string;
  date: string;
  width: number;
  height: number;
}

/* Fall 2026 teaching-assistant work at Quaid-i-Azam University. */
export const teachingAssistant = {
  role: "Teaching assistant, physics laboratory",
  place: "Quaid-i-Azam University, Islamabad",
  term: "Fall 2026",
  status: "Ongoing",
  summary:
    "This semester I assist in the physics teaching laboratory. The benches below are from the first weeks of term: the Hall effect, nuclear magnetic resonance and the spectra of gas-discharge lamps.",
  benches: [
    {
      kind: "photo",
      src: "/hasnain-portfolio/lab/hall-effect.webp",
      alt: "A lab bench with three power supplies, three multimeters and a Hall effect apparatus wired together with red and blue leads.",
      caption: "Hall effect bench: supplies, meters and the sample between the pole pieces.",
      date: "18 Aug 2026",
      width: 1600,
      height: 901,
    },
    {
      kind: "photo",
      src: "/hasnain-portfolio/lab/nmr.webp",
      alt: "A nuclear magnetic resonance setup: a DC supply, an electromagnet with two coils, an NMR oscillator and an oscilloscope showing a trace.",
      caption: "Nuclear magnetic resonance: magnet, oscillator and the resonance trace on the scope.",
      date: "3 Sep 2026",
      width: 1600,
      height: 901,
    },
  ] as LabMedia[],
  spectra: [
    {
      kind: "video",
      src: "/hasnain-portfolio/lab/spectra.mp4",
      poster: "/hasnain-portfolio/lab/spectra-poster.webp",
      alt: "A glowing magenta gas-discharge tube in a dark room, the camera moving across to the spectrometer beside it.",
      caption: "Discharge tube and spectrometer, lights off.",
      date: "16 Sep 2026",
      width: 720,
      height: 1280,
    },
    {
      kind: "photo",
      src: "/hasnain-portfolio/lab/discharge-1.webp",
      alt: "A narrow gas-discharge tube glowing magenta in the dark.",
      caption: "Magenta discharge.",
      date: "16 Sep 2026",
      width: 900,
      height: 1599,
    },
    {
      kind: "photo",
      src: "/hasnain-portfolio/lab/discharge-2.webp",
      alt: "A discharge lamp glowing pink-white between two dark housings.",
      caption: "Lamp in its housing.",
      date: "17 Sep 2026",
      width: 900,
      height: 1599,
    },
    {
      kind: "photo",
      src: "/hasnain-portfolio/lab/discharge-3.webp",
      alt: "A discharge lamp glowing bright yellow-orange, seen through a round opening.",
      caption: "Yellow discharge.",
      date: "17 Sep 2026",
      width: 900,
      height: 1599,
    },
    {
      kind: "photo",
      src: "/hasnain-portfolio/lab/discharge-4.webp",
      alt: "A tall gas-discharge tube glowing blue-green.",
      caption: "Blue-green discharge.",
      date: "17 Sep 2026",
      width: 900,
      height: 1600,
    },
    {
      kind: "video",
      src: "/hasnain-portfolio/lab/probe-station.mp4",
      poster: "/hasnain-portfolio/lab/probe-station-poster.webp",
      alt: "A probe tip under a microscope, shown on a monitor above a probe station and a DC supply.",
      caption: "Probe tip under the microscope.",
      date: "24 Sep 2026",
      width: 720,
      height: 1280,
    },
  ] as LabMedia[],
};

export interface Entry {
  title: string;
  place: string;
  date: string;
  note?: string;
  points?: string[];
  logo?: string;
}

export const teachingRecord: Entry[] = [
  {
    title: "Lecturer in Physics",
    place: "FG Boys Degree College, Skardu",
    date: "Mar 2023 – Aug 2024",
    points: [
      "Taught BS Physics coursework and mentored students through problem sessions across three academic terms.",
      "Supervised higher-secondary laboratory sessions and demonstrated core experiments.",
    ],
  },
  {
    title: "Visiting Lecturer",
    place: "Gilgit Baltistan Institute of Science and Technology, Skardu",
    date: "Oct 2023 – Dec 2023",
    points: [
      "Lectured and supervised laboratory work for undergraduate medical students, linking physics principles to medical applications.",
    ],
  },
];

export const education: Entry[] = [
  {
    title: "Master of Philosophy (MPhil) in Physics",
    place: "Quaid-i-Azam University, Islamabad",
    date: "Sep 2024 – Present",
    note: "Expected Sep 2026",
    points: [
      "Thesis: Co-substituted BiFeO₃ Thin Films for Neuromorphic Computing and Memristor Applications.",
      "Supervisor: Dr. Ghulam Hassnain Jaffari.",
    ],
    logo: "/hasnain-portfolio/qau-logo.png",
  },
  {
    title: "Bachelor of Science (BS) in Physics",
    place: "COMSATS University Islamabad",
    date: "Feb 2019 – Feb 2023",
    note: "CGPA 3.2 / 4.0 (79.9%)",
    points: [
      "Thesis: Fast Forward Stimulated Raman Adiabatic Transfer of Atomic Population in a Delta-Type Atomic Medium (analytical modeling).",
      "Coursework: Solid State Physics, Statistical Physics, Quantum Optics, High Energy Physics, Biophysics.",
    ],
    logo: "/hasnain-portfolio/comsats-logo.png",
  },
  {
    title: "Higher Secondary School Certificate (HSSC)",
    place: "FG Boys Inter College, Karachi Cantt",
    date: "Apr 2016 – Aug 2018",
  },
];

export const researchExperience: Entry[] = [
  {
    title: "Graduate Researcher, Thin-Film and Memristor Lab",
    place: "Quaid-i-Azam University, Islamabad",
    date: "Sep 2024 – Present",
    points: [
      "Fabrication: Co-substituted BiFeO₃ ceramic and polymer-blended thin films by sol-gel spin coating, tuning precursor chemistry, annealing profile and film thickness for stable resistive switching.",
      "Structural characterization: phase purity and microstructure by XRD, FTIR, thickness profilometry and impedance spectroscopy, correlated with the measured switching response.",
      "Ferroelectric characterization: remanent polarization and coercive field across compositions from P–E hysteresis loops on a Sawyer-Tower tester.",
      "Memristive and synaptic testing: a Keithley 2602 SourceMeter automated with custom Lua (TSP) scripts for reproducible DC sweep and pulse protocols.",
      "Device-to-system benchmarking: measured conductance mapped into CrossSim, with MLP networks trained in PyTorch on MNIST.",
    ],
  },
  {
    title: "Research Intern, Optics and LINAC Labs",
    place: "Pakistan Institute of Nuclear Science and Technology (PINSTECH), Islamabad",
    date: "2023",
    points: [
      "Synthesized colloidal silver and gold nanoparticles by pulsed laser ablation.",
      "Generated and analyzed shock waves driven by a high-power laser system.",
      "Rotated through the Optics Lab, the LINAC facility and specialized high-energy physics labs.",
    ],
  },
];

export const conferences = [
  {
    title: "48th International Nathiagali Summer College on Physics and Contemporary Needs",
    place: "Nathiagali, Pakistan",
    date: "Jul 2023",
  },
  {
    title: "Capacity Building Sessions for Lecturers",
    place: "FG Boys Degree College Skardu, HEC Pakistan",
    date: "Apr 2023",
  },
  {
    title: "Workshop on Fundamentals of Quantum Mechanics",
    place: "PIEAS, Islamabad",
    date: "Jan 2023",
  },
];

export const awards = [
  {
    title: "Best Lecturer Award",
    place: "Al-Zehra Girls College, Skardu",
    date: "Dec 2023",
  },
  {
    title: "Best Organizer Award, Seminar on Modern Physics",
    place: "COMSATS University Islamabad",
    date: "Aug 2020",
  },
];

export const methods = [
  {
    area: "Thin-film and device fabrication",
    items:
      "Sol-gel synthesis of ceramic and polymer-blended films, spin coating, thermal annealing, pulsed laser ablation (Ag and Au nanoparticles)",
  },
  {
    area: "Electrical and memristive testing",
    items:
      "Keithley 2602 SourceMeter (TSP scripting), DC sweep and pulse protocols, I–V and resistive-switching measurements, impedance analysis",
  },
  {
    area: "Materials characterization",
    items: "XRD, FTIR, Sawyer-Tower ferroelectric tester (P–E loops), thickness profilometry",
  },
  {
    area: "Neuromorphic simulation and ML",
    items: "CrossSim crossbar simulator, device-aware MLP training and evaluation on MNIST in PyTorch",
  },
  {
    area: "Programming",
    items: "Python (PyTorch, NumPy, Matplotlib), Lua (Keithley TSP), C++, Rust, TypeScript, Mathematica",
  },
  {
    area: "Other software",
    items: "LaTeX, Adobe Creative Suite (scientific figures, image and video editing)",
  },
  {
    area: "Languages",
    items: "English (fluent), Urdu (fluent), Balti (native)",
  },
];

export interface Project {
  title: string;
  description: string;
  tech: string[];
  link: string;
}

export const projects: Project[] = [
  {
    title: "Visualize Physics",
    description:
      "A visual introduction to quantum and statistical physics: a Tauri desktop app with 18 simulations, 200+ statistical tools and KaTeX math rendering.",
    tech: ["TypeScript", "Tauri", "Rust"],
    link: "https://github.com/hasnain7abbas/visualize-physics",
  },
  {
    title: "Madar",
    description:
      "An offline STEM simulation browser with 247 physics, chemistry, biology, math and engineering simulations, for desktop and web.",
    tech: ["TypeScript", "Tauri", "React"],
    link: "https://github.com/hasnain7abbas/Madar",
  },
  {
    title: "Seeing Theory Desktop",
    description:
      "A visual, interactive introduction to probability and statistics, rebuilt as a fast offline Tauri v2 app with Rust-powered computation.",
    tech: ["TypeScript", "Tauri v2", "Rust"],
    link: "https://github.com/hasnain7abbas/seeing-theory-desktop",
  },
  {
    title: "Spintronics",
    description:
      "A pure Rust library for simulating spin dynamics, spin current generation and conversion phenomena in magnetic and topological materials.",
    tech: ["Rust"],
    link: "https://github.com/hasnain7abbas/spintronics",
  },
  {
    title: "DigitalShelf",
    description:
      "A temporary clipboard dropzone: drag files, text, images and links onto a floating shelf panel.",
    tech: ["TypeScript"],
    link: "https://github.com/hasnain7abbas/DigitalShelf",
  },
  {
    title: "Matrix Calculator",
    description:
      "A matrix determinant calculator with recursive cofactor expansion and step-by-step breakdowns, in a single HTML file.",
    tech: ["HTML", "CSS", "JavaScript"],
    link: "https://github.com/hasnain7abbas/matix-calculator",
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
