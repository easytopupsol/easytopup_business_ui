// Ensure the locally installed dependency matches the stylesheet imports.
// Run `npm install` after extracting a ZIP or pulling updates.
import { existsSync } from 'node:fs';
import { resolve } from 'node:path';

const cssFiles = ['400.css', '500.css', '600.css', '700.css', '800.css', '900.css'];
const missing = cssFiles.filter((file) => !existsSync(resolve('node_modules', '@fontsource', 'poppins', file)));
if (missing.length) {
  console.error(`Poppins is not installed or is incomplete: ${missing.join(', ')}`);
  console.error('Fix: npm install');
  console.error('Alternatively: npm run repair:fonts');
  process.exitCode = 1;
} else {
  console.log('Poppins CSS imports verified (400–900).');
}
