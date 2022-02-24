import { Ingredient } from '../../models/models';
import * as fs from 'fs';

export type Submission = {
  name: string;
  total_ingredients: number;
  ingredients: Ingredient[];
};

export async function writeSubmission(filePath: string, submission: Submission) {
  try {
    fs.mkdirSync(filePath, { recursive: true });
  } catch {
    // Submission directory already exists
  }
  const fileName = `${submission.name}-${getCurrentTime()}.out`;
  const lines = [
    `${submission.total_ingredients}`,
    ...submission.ingredients.map((ingredient) => ingredient.name),
  ];
  fs.writeFileSync(`${filePath}/${fileName}`, lines.join(' '));
}

function getCurrentTime(): string {
  const today = new Date();
  return today.toTimeString().slice(0, 8);
}
