import * as fs from 'fs';
import { Submission } from '../../models/models';

export async function writeSubmission(filePath: string, submission: Submission) {
  try {
    fs.mkdirSync(filePath, { recursive: true });
  } catch {
    // Submission directory already exists
  }
  const fileName = `${submission.name}-${getCurrentTime()}.out`;
  const lines = [`${submission.projectsExecuted}`];

  submission.projects.forEach((project) => {
    lines.push(project.name);
    lines.push(project.contributors.join(' '));
  });

  fs.writeFileSync(`${filePath}/${fileName}`, lines.join('\n'));
}

function getCurrentTime(): string {
  const today = new Date();
  return today.toTimeString().slice(0, 8);
}
