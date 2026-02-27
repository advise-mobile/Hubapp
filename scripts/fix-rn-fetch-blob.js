/**
 * Corrige build.gradle do rn-fetch-blob: remove jcenter() (descontinuado no Gradle)
 * para o build Android funcionar. Roda no postinstall.
 */
const path = require('path');
const fs = require('fs');

const buildGradlePath = path.join(
  __dirname,
  '..',
  'node_modules',
  'rn-fetch-blob',
  'android',
  'build.gradle'
);

if (!fs.existsSync(buildGradlePath)) {
  process.exit(0);
}

let content = fs.readFileSync(buildGradlePath, 'utf8');

// Remove "    jcenter()" do bloco repositories (4 espaços)
content = content.replace(/\n    jcenter\(\)\n/g, '\n');
// Substitui "        jcenter()" por "        mavenCentral()" no buildscript (8 espaços)
content = content.replace(/\n        jcenter\(\)\n/g, '\n        mavenCentral()\n');

fs.writeFileSync(buildGradlePath, content);
console.log('scripts/fix-rn-fetch-blob.js: rn-fetch-blob android/build.gradle atualizado (jcenter removido).');
