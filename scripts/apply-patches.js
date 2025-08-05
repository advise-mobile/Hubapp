#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🔧 Applying patches...');

// Patch 1: Fix native_modules.gradle null pointer issue
const nativeModulesPath = path.join(
	__dirname,
	'../node_modules/@react-native-community/cli-platform-android/native_modules.gradle',
);

if (fs.existsSync(nativeModulesPath)) {
	let content = fs.readFileSync(nativeModulesPath, 'utf8');

	const oldPattern = `      packageImports = packages.collect {
        "// \${it.name}\\n\${interpolateDynamicValues(it.packageImportPath)}"
      }.join('\\n')
      packageClassInstances = ",\\n      " + packages.collect {
        interpolateDynamicValues(it.packageInstance)
      }.join(",\\n      ")`;

	const newPattern = `      packageImports = packages.collect {
        def importPath = it.packageImportPath
        "// \${it.name}\\n\${importPath ? interpolateDynamicValues(importPath) : ''}"
      }.join('\\n')
      packageClassInstances = ",\\n      " + packages.collect {
        def instance = it.packageInstance
        instance ? interpolateDynamicValues(instance) : null
      }.findAll { it != null }.join(",\\n      ")`;

	if (content.includes('def importPath = it.packageImportPath')) {
		console.log('✅ native_modules.gradle patch already applied');
	} else if (content.includes('interpolateDynamicValues(it.packageImportPath)')) {
		content = content.replace(
			/packageImports = packages\.collect \{\s*"\/\/ \$\{it\.name\}\\n\$\{interpolateDynamicValues\(it\.packageImportPath\)\}"\s*\}\.join\('\\n'\)\s*packageClassInstances = ",\\n      " \+ packages\.collect \{\s*interpolateDynamicValues\(it\.packageInstance\)\s*\}\.join\(",\\n      "\)/s,
			`packageImports = packages.collect {
        def importPath = it.packageImportPath
        "// \${it.name}\\n\${importPath ? interpolateDynamicValues(importPath) : ''}"
      }.join('\\n')
      packageClassInstances = ",\\n      " + packages.collect {
        def instance = it.packageInstance
        instance ? interpolateDynamicValues(instance) : null
      }.findAll { it != null }.join(",\\n      ")`,
		);
		fs.writeFileSync(nativeModulesPath, content);
		console.log('✅ Applied native_modules.gradle null safety patch');
	} else {
		console.log('⚠️  native_modules.gradle pattern not found - may need manual update');
	}
} else {
	console.log('❌ native_modules.gradle not found');
}

console.log('🎉 Patches applied successfully!');
