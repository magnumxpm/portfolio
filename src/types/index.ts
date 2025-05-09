// Common interfaces for the portfolio

export interface HeroData {
  tags: string[];
  desc: string;
  specialties: string[];
}

export interface ExperienceItem {
  company: string;
  tenure: string;
  description: string;
}

export interface ProjectItem {
  title: string;
  description: string;
  imageSrc: string;
  role: string;
  technologies: string[];
  url: string;
}

export interface TagProps {
  tag: string;
  className?: string;
}

export interface LinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

export interface SocialLinkProps {
  icon: string;
  href: string;
  className?: string;
}