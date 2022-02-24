import * as readline from 'readline';
import { Dataset, Ingredient } from '../../models/models';
import * as fs from 'fs';
import { once } from 'events';

export function readDataset(inputFilePath: string): Promise<Dataset> {
  const dataset: Dataset = {
    name: inputFilePath.split('/').pop().split('.')[0] || '',
    totalContributors: 0,
    totalProjects: 0,
    contributors: [],
    projects: [],
  };
  let lineNumber = 0;

  const rl = readline.createInterface({
    input: fs.createReadStream(inputFilePath),
    crlfDelay: Infinity,
  });
  let pendingContributors = 0;
  let pendingProjects = 0;
  let pendingCurrentContributorSkill = -1;
  let pendingProjectSkills = -1;

  let isContributorLine = true;
  let isSkillLine = false;
  let isProjectLine = false;
  let isSkillProjectLine = false;

  rl.on('line', (line) => {
    if (lineNumber === 0) {
      const [totalContributors, totalProjects] = line.split(' ');
      dataset.totalContributors = parseInt(totalContributors, 10);
      dataset.totalProjects = parseInt(totalProjects, 10);

      pendingContributors = dataset.totalContributors;
      pendingProjects = dataset.totalProjects;
    } else if (pendingContributors > 0) {
      if (isContributorLine) {
        isContributorLine = false;
        const [contributorName, skillAmount] = line.split(' ');
        dataset.contributors.push({
          name: contributorName,
          skills: [],
          assignedProjects: [],
          bussy: false,
        });
        pendingCurrentContributorSkill = parseInt(skillAmount, 10);
        isSkillLine = true;
      } else if (isSkillLine) {
        const [skillName, skillAmount] = line.split(' ');
        isSkillLine = false;
        dataset.contributors[dataset.contributors.length - 1].skills.push({
          name: skillName,
          level: parseInt(skillAmount, 10),
        });
        pendingCurrentContributorSkill--;
        if (pendingCurrentContributorSkill === 0) {
          pendingContributors--;
          if (pendingContributors === 0) {
            isProjectLine = true;
            isContributorLine = false;
            isSkillLine = false;
          }
          isContributorLine = true;
        } else {
          isSkillLine = true;
        }
      }
    } else {
      if (isProjectLine) {
        const [projectName, daysToComplete, score, bestBefore, numberOfSkills] = line.split(' ');
        dataset.projects.push({
          name: projectName,
          bestBefore: parseInt(bestBefore, 10),
          days: parseInt(daysToComplete, 10),
          numberOfSkills: parseInt(numberOfSkills, 10),
          requiredSkills: [],
          score: parseInt(score, 10),
        });
        pendingProjectSkills = parseInt(numberOfSkills, 10);
        isSkillProjectLine = true;
        isProjectLine = false;
      } else if (isSkillProjectLine) {
        const [skillName, skillAmount] = line.split(' ');
        isSkillProjectLine = false;
        dataset.projects[dataset.projects.length - 1].requiredSkills.push({
          name: skillName,
          level: parseInt(skillAmount, 10),
        });
        pendingProjectSkills--;
        if (pendingProjectSkills === 0) {
          isProjectLine = true;
        } else {
          isSkillProjectLine = true;
        }
      }
    }
    console.log(`Line from file: ${line}`);
    lineNumber++;
  });

  return once(rl, 'close').then(() => dataset);
}

const parseIngredientsLint = (line: string): Ingredient[] =>
  line
    .split(' ')
    .slice(1)
    .map((ingredient) => ({ name: ingredient }));
