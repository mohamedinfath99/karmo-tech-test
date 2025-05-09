import fs from "fs";
import readline from "readline";

export async function calculateDistanceFromFile(filePath: string) {
  const list1: number[] = [];
  const list2: number[] = [];

  const fileStream = fs.createReadStream(filePath);
  const rl = readline.createInterface({ input: fileStream });

  for await (const line of rl) {
    const [left, right] = line.trim().split(/\s+/).map(Number);
    if (!isNaN(left)) list1.push(left);
    if (!isNaN(right)) list2.push(right);
  }

  list1.sort((a, b) => a - b);
  list2.sort((a, b) => a - b);

  const pairedDistances = list1.map((val, i) => Math.abs(val - list2[i]));
  const totalDistance = pairedDistances.reduce((sum, d) => sum + d, 0);

  return { totalDistance, list1, list2, pairedDistances };
}
