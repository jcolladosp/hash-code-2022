import path from 'path';
import { readDataset } from '../utils/dataset-reader.js';
import { writeSubmission } from '../utils/subsmission_writer.js';
import { Submission } from '../utils/subsmission_writer';
import { Dataset, Ingredient } from '../models/models';

export const datasetsPath = './practice_round/datasets/';
export const outputFilesPath = './practice_round/output/';

const datasets = {
  a: 'a_an_example.in.txt',
  b: 'b_basic.in.txt',
  c: 'c_coarse.in.txt',
  d: 'd_difficult.in.txt',
  e: 'e_elaborate.in.txt',
};

readDataset(path.resolve(process.cwd(), `${datasetsPath}${datasets.a}`)).then(
  (dataset: Dataset) => {
    const submission: Submission = {
      name: dataset.name,
      total_ingredients: dataset.clients[0].likedIngredients.length,
      ingredients: dataset.clients[0].likedIngredients,
    };
    // Escribimos output en fichero
    writeSubmission(path.resolve(process.cwd(), outputFilesPath), submission);
  },
);
