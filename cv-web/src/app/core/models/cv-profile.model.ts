export interface ContactInfo {
  readonly email: string;
  readonly phone: string;
  readonly phoneFormatted: string;
  readonly location: string;
  readonly timezone: string;
  readonly githubUrl: string;
  readonly linkedinUrl: string;
  readonly pdfUrl: string;
}

export interface WorkExperience {
  readonly id: string;
  readonly company: string;
  readonly project?: string;
  readonly role: string;
  readonly period: string;
  readonly isCurrent: boolean;
  readonly employmentType: string;
  readonly location: string;
  readonly summary?: string;
  readonly responsibilities: readonly string[];
  readonly technologies: readonly string[];
}

export type SkillCategory = 
  | 'all'
  | 'backend' 
  | 'frontend' 
  | 'cloud-devops' 
  | 'database' 
  | 'languages' 
  | 'tools';

export interface SkillItem {
  readonly name: string;
  readonly category: SkillCategory;
  readonly isHighlighted?: boolean;
}

export interface SkillGroup {
  readonly id: SkillCategory;
  readonly title: string;
  readonly items: readonly SkillItem[];
}

export interface Certification {
  readonly id: string;
  readonly title: string;
  readonly issuer: string;
  readonly issueDate: string;
  readonly badgeText?: string;
  readonly credentialType: 'cloud' | 'devops' | 'frontend' | 'security' | 'design';
}

export interface Education {
  readonly degree: string;
  readonly institution: string;
  readonly period: string;
  readonly status: string;
  readonly summary?: string;
  readonly highlights?: readonly string[];
}

export interface LanguageItem {
  readonly language: string;
  readonly level: string;
  readonly note?: string;
}

export interface CvProfile {
  readonly fullName: string;
  readonly title: string;
  readonly statusBadge: string;
  readonly isAvailableForWork: boolean;
  readonly summary: string;
  readonly photoUrl: string;
  readonly contact: ContactInfo;
  readonly experiences: readonly WorkExperience[];
  readonly skillGroups: readonly SkillGroup[];
  readonly certifications: readonly Certification[];
  readonly education: readonly Education[];
  readonly languages: readonly LanguageItem[];
}
