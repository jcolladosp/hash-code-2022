export interface Skill {
  name: string;
  level: number;
}

export interface Contributor {
  name: string;
  skills: Skill[];
  bussy: boolean;
  assignedProjects: number;
}

export interface Project {
  name: string;
  days: number;
  score: number;
  bestBefore: number;
  numberOfSkills: number;
  requiredSkills: Skill[];
}

export interface Dataset {
  name: string;
  totalContributors: number;
  totalProjects: number;
  contributors: Contributor[];
  projects: Project[];
}
