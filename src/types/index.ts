export interface NavItem {
  label: string;
  href: string;
}

export interface SocialLink {
  platform: string;
  url: string;
}

export interface Experience {
  id: number;
  role: string;
  company: string;
  companyUrl?: string;
  type: string;
  startDate: string;
  endDate: string;
  location: string;
  description: string[];
  tech: string[];
}

export interface Project {
  id: number;
  title: string;
  description: string;
  tech: string[];
  github: string;
  demo: string | null;
  featured: boolean;
}

export interface SkillCategory {
  category: string;
  items: string[];
}

export interface Achievement {
  label: string;
  value: string;
  year: string;
}
