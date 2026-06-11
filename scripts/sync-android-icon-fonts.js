const fs = require('fs');
const path = require('path');

const sourceDir = path.join(
  __dirname,
  '..',
  'node_modules',
  'react-native-vector-icons',
  'Fonts',
);
const targetDir = path.join(
  __dirname,
  '..',
  'android',
  'app',
  'src',
  'main',
  'assets',
  'fonts',
);

if (!fs.existsSync(sourceDir)) {
  console.warn(
    'scripts/sync-android-icon-fonts.js: react-native-vector-icons não encontrado; pulando.',
  );
  process.exit(0);
}

if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

const fontFiles = fs
  .readdirSync(sourceDir)
  .filter(file => file.endsWith('.ttf'));

if (fontFiles.length === 0) {
  console.warn('scripts/sync-android-icon-fonts.js: nenhuma fonte .ttf encontrada.');
  process.exit(0);
}

fontFiles.forEach(file => {
  fs.copyFileSync(path.join(sourceDir, file), path.join(targetDir, file));
});

console.log(
  `scripts/sync-android-icon-fonts.js: ${fontFiles.length} fonte(s) copiada(s) para android/app/src/main/assets/fonts.`,
);
