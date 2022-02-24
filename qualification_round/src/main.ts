import path from 'path';
import { Dataset, Submission } from '../models/models';
import { readDataset } from './utils/dataset-reader.js';

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

const timelineDays = 99999999;

const submission: Submission = { projectsExecuted: 0, projects: [] };

readDataset(path.resolve(process.cwd(), `${datasetsPath}${datasets[datasetArg]}`)).then(
  (dataset: Dataset) => {
    for (let i = 0; i < timelineDays; i++) {
      dataset.projects.forEach((project) => {});
    }

    // Escribimos output en fichero
    // writeSubmission(path.resolve(process.cwd(), outputFilesPath), submission);
  },
);
