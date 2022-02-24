import path from 'path';
import { Dataset, Submission, Contributor, ExecutedProject } from '../models/models';
import { readDataset } from './utils/dataset-reader.js';
import { writeSubmission } from './utils/subsmission_writer.js';

export const datasetsPath = './qualification_round/datasets/';
export const outputFilesPath = './qualification_round/output/';

const datasets = {
  a: 'a_an_example.in.txt',
  b: 'b_better_start_small.in.txt',
  c: 'c_collaboration.in.txt',
  d: 'd_dense_schedule.in.txt',
  e: 'e_exceptional_skills.in.txt',
  f: 'f_find_great_mentors.in.txt',
};

const datasetArg = process.argv[2];

const timelineDays = 1000;

const testSubmission: any = {
  name: 'test',
  projectsExecuted: 3,
  projects: [
    {
      name: 'WebServer',
      contributors: [{ name: 'Bob' }, { name: 'Anna' }],
    },
    {
      name: 'Logging',
      contributors: [{ name: 'Anna' }],
    },
    {
      name: 'WebChat',
      contributors: [{ name: 'Maria' }, { name: 'Bob' }],
    },
  ],
};

//
const submission: Submission = { projectsExecuted: 0, projects: [], name: '' };

readDataset(path.resolve(process.cwd(), `${datasetsPath}${datasets[datasetArg]}`)).then(
  (dataset: Dataset) => {
    for (let i = 0; i < timelineDays; i++) {
      dataset.projects.forEach((project) => {
        let possibleExecutedProject: ExecutedProject = {};
        possibleExecutedProject.contributors = [];
        project.requiredSkills.map((requiredSkill) => {
          requiredSkill.fullfiled = false;
        });

        project.requiredSkills.forEach((skill) => {
          dataset.contributors.forEach((contributor) => {
            if (
              contributor.skills.find((s) => {
                return s.name === skill.name && s.level >= skill.level && !contributor.bussy;
              })
            ) {
              possibleExecutedProject.contributors.push(contributor);

              if (project.numberOfSkills === possibleExecutedProject.contributors.length) {
                submission.projects.push(possibleExecutedProject);
                possibleExecutedProject.contributors.forEach((c) => {
                  if (dataset.contributors.find((contributor) => contributor.name === c.name)) {
                    c.bussy = true;
                  }
                });
              }
            }
          });
        });
      });
    }

    console.log(submission);

    // Escribimos output en fichero
    writeSubmission(path.resolve(process.cwd(), outputFilesPath), testSubmission);
    // writeSubmission(path.resolve(process.cwd(), outputFilesPath), submission);
  },
);
