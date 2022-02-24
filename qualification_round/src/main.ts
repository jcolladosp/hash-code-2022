import path from 'path';
import { Dataset } from '../models/models';
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

readDataset(path.resolve(process.cwd(), `${datasetsPath}${datasets[datasetArg]}`)).then(
  (dataset: Dataset) => {
    console.log(dataset);
    // Escribimos output en fichero
    // writeSubmission(path.resolve(process.cwd(), outputFilesPath), submission);
  },
);
