import fs from 'fs';
import path from 'path';
import os from 'os';
export const getColor = () => {
  let color = process.env.DEFAULT_COLOR;
  const filePath = process.env.COLOR_PATH;
  if (filePath) {
    try {
      const colorFromFile = fs.readFileSync(path.resolve(filePath), 'utf8');
      color = colorFromFile.trim();
    } catch (error) {
      console.error(`Failed to read content of ${filePath}`);
      console.error(error);
    }
  }
  return color || 'blue';
};
export const getHostName = () => os.hostname();
