export interface Skill {
  name: string;
  level: number;
}

export interface Contributor {
  name: string;
  skills: Skill[];
  bussy: boolean;
  assignedProjects: Project[];
}

export interface Project {
  name: string;
  days: number;
  score: number;
  bestBefore: number;
  numberOfSkills: number;
  requiredSkills: Skill[];
  dayScore?: number;
  personScore?: number;
  personDayScore?: number;
  bestBeforeScore?: number;
}

export interface Dataset {
  name: string;
  totalContributors: number;
  totalProjects: number;
  contributors: Contributor[];
  projects: Project[];
}
export interface ExecutedProject {
  name: string;
  contributors: string[];
}

export interface Submission {
  name: string;
  projectsExecuted: number;
  projects: ExecutedProject[];
}
