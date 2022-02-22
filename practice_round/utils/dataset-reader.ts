import * as readline from 'readline';
import { Dataset, Ingredient } from '../models/models';
import * as fs from 'fs';
import { once } from 'events';

export function readDataset(inputFilePath: string): Promise<Dataset> {
  const dataset: Dataset = {
    name: inputFilePath.split('/').pop() || '',
    totalClients: 0,
    clients: [],
  };
  let lineNumber = 0;
  const rl = readline.createInterface({
    input: fs.createReadStream(inputFilePath),
    crlfDelay: Infinity,
  });

  rl.on('line', (line) => {
    if (lineNumber === 0) {
      dataset.totalClients = parseInt(line, 10);
    } else if (lineNumber % 2 === 0) {
      dataset.clients[dataset.clients.length - 1].dislikedIngredients = parseIngredientsLint(line);
    } else if (lineNumber % 2 === 1) {
      dataset.clients.push({
        likedIngredients: parseIngredientsLint(line),
        dislikedIngredients: [],
      });
    }
    console.log(`Line from file: ${line}`);
    lineNumber++;
  });

  return once(rl, 'close').then(() => dataset);

  //return parseDataset(name, fileContent);
}

const parseIngredientsLint = (line: string): Ingredient[] =>
  line
    .split(' ')
    .slice(1)
    .map((ingredient) => ({ name: ingredient }));

// export function parseDataset(name: string, fileContent: string): Dataset {
//   const [teamsLine, ...pizzaLines] = trimLines(fileContent.split('\n'));
//   ingredientMap.clear();
//   return {
//     name,
//     teams: parseTeams(teamsLine),
//     pizzas: pizzaLines.map(parsePizza),
//   };
//}
