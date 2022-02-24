export interface Skill {
  name: string;
  level: number;
  fullfiled?: boolean;
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
  name?: string;
  contributors?: Contributor[];
}

export interface Submission {
  projectsExecuted: number;
  projects: ExecutedProject[];
}
