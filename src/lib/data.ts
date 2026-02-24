import type {
  NavItem,
  Experience,
  Project,
  SkillCategory,
  Achievement,
} from "@/types";

export const navItems: NavItem[] = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

export const personalInfo = {
  name: "Aman Sharma",
  title: "Full Stack Developer",
  tagline: "Building scalable systems from frontend to cloud",
  email: "aman4code@gmail.com",
  location: "Delhi, India",
  bio: "Full Stack Developer with hands-on experience building scalable web applications, data pipelines, and backend systems. Currently at Inside The Box, crafting full-stack solutions with React.js, Node.js, and modern cloud infrastructure. Strong foundation in Data Science & Analytics, competitive programming, and problem solving.",
  resumeUrl: "/resume.pdf",
  social: {
    github: "https://github.com/Trezarex",
    linkedin: "https://linkedin.com/in/trezarex",
    twitter: "https://twitter.com/Trezarex",
    email: "mailto:aman4code@gmail.com",
  },
};

export const experiences: Experience[] = [
  {
    id: 1,
    role: "Full-Stack Developer",
    company: "Inside The Box",
    type: "Full-time",
    startDate: "Mar 2025",
    endDate: "Present",
    location: "Delhi, India",
    description: [
      "Building and maintaining full-stack web applications for the F&B industry",
      "Promoted from Frontend Developer — now owning end-to-end product development",
      "Working with GraphQL APIs, database design, and server-side architecture",
    ],
    tech: ["React.js", "Node.js", "Apollo GraphQL", "PostgreSQL", "Flask"],
  },
  {
    id: 2,
    role: "Frontend Developer",
    company: "Inside The Box",
    type: "Full-time",
    startDate: "Dec 2024",
    endDate: "Mar 2025",
    location: "Delhi, India",
    description: [
      "Developed and integrated responsive websites with front-end and back-end functionality",
      "Built user-facing features and interactive dashboards",
    ],
    tech: ["React.js", "Flask", "REST APIs"],
  },
  {
    id: 3,
    role: "Data Engineer Intern",
    company: "ResearchScrypt",
    type: "Internship",
    startDate: "May 2024",
    endDate: "Aug 2024",
    location: "Gurugram, India · Remote",
    description: [
      "Managed and uploaded large datasets in AWS S3, ensuring data accuracy and integrity",
      "Automated data pipelines — scripts for extraction, loading, and validation",
      "Integrated PayPal API to fetch and update user information with S3 data storage",
    ],
    tech: ["Python", "AWS S3", "PayPal API", "Git"],
  },
  {
    id: 4,
    role: "Backend Developer Intern",
    company: "Bhramaand",
    type: "Internship",
    startDate: "Jun 2023",
    endDate: "Nov 2023",
    location: "Delhi, India · Remote",
    description: [
      "Built AWS cloud infrastructure and integrated third-party APIs",
      "Developed web scraping automation pipelines and Streamlit applications",
      "Handled data manipulation and processing for analytics dashboards",
    ],
    tech: ["Python", "AWS", "Docker", "Kubernetes", "Streamlit"],
  },
];

export const projects: Project[] = [
  {
    id: 1,
    title: "RealTimeRides",
    description:
      "Real-time ride tracking and management system built with Python. Features live location updates, WebSocket connections, and efficient data streaming.",
    tech: ["Python", "WebSockets", "FastAPI", "Real-time Data"],
    github: "https://github.com/Trezarex/RealTimeRides",
    demo: null,
    featured: true,
  },
  {
    id: 2,
    title: "SpotyScrape MP3 Downloader",
    description:
      "Web scraper using BeautifulSoup to extract Spotify playlist metadata. Converts playlists into downloadable MP3 files automatically.",
    tech: ["Python", "BeautifulSoup", "Web Scraping", "Spotify API"],
    github: "https://github.com/Trezarex/SpotyScrape-MP3-Downloader",
    demo: null,
    featured: true,
  },
  {
    id: 3,
    title: "Twitter Analyzer",
    description:
      "Twitter data analysis tool for sentiment analysis, trend detection, and user behavior insights using Python and NLP techniques.",
    tech: ["Python", "NLP", "Data Analysis", "Twitter API"],
    github: "https://github.com/Trezarex/Twitter-Analyzer",
    demo: null,
    featured: false,
  },
  {
    id: 4,
    title: "SamarKand Project",
    description:
      "Full-stack JavaScript application with interactive features and modern UI components.",
    tech: ["JavaScript", "HTML/CSS", "Node.js"],
    github: "https://github.com/Trezarex/SamarKandProject",
    demo: null,
    featured: false,
  },
];

export const skills: SkillCategory[] = [
  { category: "Languages", items: ["Python", "JavaScript", "C++", "SQL"] },
  { category: "Frontend", items: ["React.js", "Next.js", "Tailwind CSS"] },
  {
    category: "Backend",
    items: ["FastAPI", "Flask", "Node.js", "REST APIs", "GraphQL"],
  },
  { category: "Databases", items: ["PostgreSQL", "MongoDB"] },
  {
    category: "Cloud & DevOps",
    items: ["AWS", "Docker", "Kubernetes", "Git"],
  },
  { category: "Big Data", items: ["Kafka", "PySpark", "Hadoop"] },
  { category: "AI / ML", items: ["Scikit-learn", "Pandas", "NumPy"] },
  {
    category: "Scraping",
    items: ["Selenium", "BeautifulSoup", "Appium"],
  },
];

export const achievements: Achievement[] = [
  { label: "Google Kickstart B", value: "#2699", year: "2022" },
  { label: "Google Kickstart A", value: "#5456", year: "2022" },
  { label: "Google Hash Code", value: "#8344", year: "2021" },
  { label: "GitHub Contributions", value: "366+", year: "Last Year" },
];

export const testimonial = {
  name: "Gunpreet Singh Walia",
  role: "Data Scientist",
  text: "Aman is an exceptional Python backend engineer renowned for their expertise in developing robust systems. Proficient in crafting efficient data pipelines using Python, AWS services like S3, AWS Glue, and Redshift. Their mastery of DevOps with Docker and Kubernetes ensures seamless deployment.",
};
