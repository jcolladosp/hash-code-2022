import path from 'path';
import { readDataset } from '../utils/dataset-reader.js';

readDataset(path.resolve(process.cwd(), './practice_round/datasets/a_an_example.in.txt')).then(
  (dataset) => console.log(dataset),
);
