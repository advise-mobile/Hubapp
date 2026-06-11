const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');
const fs = require('fs');
const path = require('path');
const { resolve } = require('metro-resolver');

/**
 * Metro não aplica `resolver.alias` na resolução de dependências; especificadores como
 * `@constants/API` ou `@models/foo` acabam tratados como pacotes npm. Isto replica os
 * aliases do babel.config.js (prefixos mais longos primeiro).
 */
const INTERNAL_ALIAS_PREFIXES = [
	['@legacy/store', path.resolve(__dirname, 'legacy/store')],
	['@legacy/services', path.resolve(__dirname, 'legacy/services')],
	['@legacy/components', path.resolve(__dirname, 'legacy/components')],
	['@legacy/pages', path.resolve(__dirname, 'legacy/pages')],
	['@legacy/navigation', path.resolve(__dirname, 'legacy/navigation')],
	['@legacy/helpers', path.resolve(__dirname, 'legacy/helpers')],
	['@legacy', path.resolve(__dirname, 'legacy')],
	['@pages/Finance/Details', path.resolve(__dirname, 'src/pages/Finance/Details')],
	['@pages/Finance/CashFlow', path.resolve(__dirname, 'src/pages/Finance/CashFlow')],
	['@pages/Finance/Category', path.resolve(__dirname, 'src/pages/Finance/Category')],
	['@pages/Finance', path.resolve(__dirname, 'src/pages/Finance')],
	['@pages/MovementsTrash', path.resolve(__dirname, 'src/pages/MovementsTrash')],
	['@pages/Promotion', path.resolve(__dirname, 'src/pages/Promotion')],
	['@pages/Summons/detail', path.resolve(__dirname, 'src/pages/Summons/detail')],
	['@pages/Summons', path.resolve(__dirname, 'src/pages/Summons')],
	['@pages/Courts', path.resolve(__dirname, 'src/pages/Courts')],
	['@components/ScrollableTabView', path.resolve(__dirname, 'src/components/ScrollableTabView')],
	['@lassets/styles/global', path.resolve(__dirname, 'legacy/assets/styles/global.js')],
	['@lassets/styles', path.resolve(__dirname, 'legacy/assets/styles')],
	['@pages', path.resolve(__dirname, 'src/pages')],
	['@lstore', path.resolve(__dirname, 'legacy/store')],
	['@lservices', path.resolve(__dirname, 'legacy/services')],
	['@lcomponents', path.resolve(__dirname, 'legacy/components')],
	['@lpages', path.resolve(__dirname, 'legacy/pages')],
	['@lnavigation', path.resolve(__dirname, 'legacy/navigation')],
	['@lhelpers', path.resolve(__dirname, 'legacy/helpers')],
	['@lassets', path.resolve(__dirname, 'legacy/assets')],
	['@constants', path.resolve(__dirname, 'src/constants')],
	['@models', path.resolve(__dirname, 'src/models')],
	['@services', path.resolve(__dirname, 'src/services')],
	['@components', path.resolve(__dirname, 'src/components')],
	['@helpers', path.resolve(__dirname, 'src/helpers')],
	['@assets', path.resolve(__dirname, 'src/assets')],
	['@theme', path.resolve(__dirname, 'src/theme')],
	['@navigation', path.resolve(__dirname, 'src/navigation')],
	['@store', path.resolve(__dirname, 'src/store')],
].sort((a, b) => b[0].length - a[0].length);

const SOURCE_EXTENSIONS = ['.tsx', '.ts', '.jsx', '.js', '.json'];

function resolveInternalAliasModule(baseDir, subPath) {
	const rel = subPath || '';
	try {
		if (!rel && fs.existsSync(baseDir) && fs.statSync(baseDir).isFile()) {
			return path.normalize(baseDir);
		}
	} catch {
		// ignore
	}
	const base = rel ? path.join(baseDir, rel) : baseDir;
	const candidates = [];
	if (rel) {
		candidates.push(base);
		for (const ext of SOURCE_EXTENSIONS) {
			candidates.push(base + ext);
		}
		for (const ext of SOURCE_EXTENSIONS) {
			if (ext === '.json') {
				continue;
			}
			candidates.push(path.join(baseDir, rel, 'index' + ext));
		}
	} else {
		for (const ext of SOURCE_EXTENSIONS) {
			if (ext === '.json') {
				continue;
			}
			candidates.push(path.join(baseDir, 'index' + ext));
		}
	}
	for (const filePath of candidates) {
		try {
			if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
				return path.normalize(filePath);
			}
		} catch {
			// ignore
		}
	}
	return null;
}

function resolveRequestInternalAlias(moduleName) {
	for (const [prefix, baseDir] of INTERNAL_ALIAS_PREFIXES) {
		if (moduleName === prefix || moduleName.startsWith(`${prefix}/`)) {
			const sub =
				moduleName === prefix ? '' : moduleName.slice(prefix.length + 1);
			return resolveInternalAliasModule(baseDir, sub);
		}
	}
	return null;
}

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('@react-native/metro-config').MetroConfig}
 */
const config = {
	resolver: {
		alias: {
			'@': path.resolve(__dirname, 'src'),
			// Aliases COM 'l' para legacy
			'@lstore': path.resolve(__dirname, 'legacy/store'),
			'@lservices': path.resolve(__dirname, 'legacy/services'),
			'@lcomponents': path.resolve(__dirname, 'legacy/components'),
			'@lpages': path.resolve(__dirname, 'legacy/pages'),
			'@lnavigation': path.resolve(__dirname, 'legacy/navigation'),
			'@lhelpers': path.resolve(__dirname, 'legacy/helpers'),
			'@lassets': path.resolve(__dirname, 'legacy/assets'),
			'@lassets/styles/global': path.resolve(
				__dirname,
				'legacy/assets/styles/global.js',
			),
			// Aliases SEM 'l' para src (código novo)
			'@store': path.resolve(__dirname, 'src/store'), // Será criado quando migrar
			'@services': path.resolve(__dirname, 'src/services'),
			'@constants': path.resolve(__dirname, 'src/constants'),
			'@models': path.resolve(__dirname, 'src/models'),
			'@components': path.resolve(__dirname, 'src/components'),
			'@pages': path.resolve(__dirname, 'src/pages'),
			'@navigation': path.resolve(__dirname, 'src/navigation'), // Será criado quando migrar
			'@helpers': path.resolve(__dirname, 'src/helpers'),
			'@assets': path.resolve(__dirname, 'src/assets'),
			'@theme': path.resolve(__dirname, 'src/theme'),
			// Aliases ESPECÍFICOS para páginas TypeScript (em src/) - DEVEM VIR ANTES do alias genérico @pages
			'@pages/MovementsTrash': path.resolve(
				__dirname,
				'src/pages/MovementsTrash',
			),
			'@pages/Finance': path.resolve(__dirname, 'src/pages/Finance'),
			'@pages/Finance/Details': path.resolve(
				__dirname,
				'src/pages/Finance/Details',
			),
			'@pages/Finance/CashFlow': path.resolve(
				__dirname,
				'src/pages/Finance/CashFlow',
			),
			'@pages/Finance/Category': path.resolve(
				__dirname,
				'src/pages/Finance/Category',
			),
			'@pages/Promotion': path.resolve(__dirname, 'src/pages/Promotion'),
			'@pages/Summons/detail': path.resolve(
				__dirname,
				'src/pages/Summons/detail',
			),
			'@pages/Summons': path.resolve(__dirname, 'src/pages/Summons'),
			'@pages/Courts': path.resolve(__dirname, 'src/pages/Courts'),
			// Aliases para imports sem @ (compatibilidade com código legado)
			'assets/styles': path.resolve(__dirname, 'legacy/assets/styles'),
			components: path.resolve(__dirname, 'legacy/components'),
			helpers: path.resolve(__dirname, 'legacy/helpers'),
			pages: path.resolve(__dirname, 'legacy/pages'),
			// ScrollableTabView está em src/components (TypeScript)
			'@components/ScrollableTabView': path.resolve(
				__dirname,
				'src/components/ScrollableTabView',
			),
			'components/ScrollableTabView': path.resolve(
				__dirname,
				'src/components/ScrollableTabView',
			),
		},
		resolveRequest: (context, moduleName, platform) => {
			const internal = resolveRequestInternalAlias(moduleName);
			if (internal != null) {
				return { type: 'sourceFile', filePath: internal };
			}
			// Interceptar @lassets/styles/global
			if (moduleName === '@lassets/styles/global') {
				const fs = require('fs');
				const filePath = path.resolve(
					__dirname,
					'legacy/assets/styles/global.js',
				);
				if (fs.existsSync(filePath)) {
					return { type: 'sourceFile', filePath };
				}
			}
			// Interceptar caminhos relativos que o Babel transformou para global.js
			if (
				moduleName.includes('assets/styles/global') ||
				moduleName.endsWith('assets/styles/global') ||
				moduleName.includes('styles/global')
			) {
				const fs = require('fs');
				const filePath = path.resolve(
					__dirname,
					'legacy/assets/styles/global.js',
				);
				if (fs.existsSync(filePath)) {
					return { type: 'sourceFile', filePath };
				}
			}
			// Interceptar assets/styles que o Babel transformou em caminho relativo
			if (
				moduleName.includes('assets/styles') ||
				moduleName === 'assets/styles'
			) {
				const fs = require('fs');
				const filePath = path.resolve(
					__dirname,
					'legacy/assets/styles/index.js',
				);
				if (fs.existsSync(filePath)) {
					return { type: 'sourceFile', filePath };
				}
			}
			// Interceptar caminhos relativos que o Babel transformou (fallback)
			if (
				moduleName.includes('pages/MovementsTrash') ||
				moduleName.includes('pages/Finance') ||
				moduleName.includes('pages/Promotion') ||
				moduleName.includes('pages/Summons')
			) {
				const fs = require('fs');
				if (moduleName.includes('MovementsTrash')) {
					const filePath = path.resolve(
						__dirname,
						'src/pages/MovementsTrash/index.tsx',
					);
					if (fs.existsSync(filePath)) {
						return { type: 'sourceFile', filePath };
					}
				}
				if (
					moduleName.includes('Finance') &&
					!moduleName.includes('MovementsTrash') &&
					!moduleName.includes('Promotion')
				) {
					if (
						moduleName.endsWith('Finance') ||
						moduleName.endsWith('Finance/')
					) {
						const filePath = path.resolve(
							__dirname,
							'src/pages/Finance/index.tsx',
						);
						if (fs.existsSync(filePath)) {
							return { type: 'sourceFile', filePath };
						}
					}
				}
				if (moduleName.includes('Promotion')) {
					const filePath = path.resolve(
						__dirname,
						'src/pages/Promotion/index.tsx',
					);
					if (fs.existsSync(filePath)) {
						return { type: 'sourceFile', filePath };
					}
				}
				// Summons: NÃO redirecionar subpastas (detail, modals, etc.)
				if (
					moduleName.includes('pages/Summons') &&
					!moduleName.includes('Summons/detail') &&
					!moduleName.includes('Summons\\detail') &&
					(moduleName.endsWith('pages/Summons') ||
						moduleName.endsWith('pages/Summons/') ||
						moduleName.endsWith('pages\\Summons') ||
						moduleName.endsWith('pages\\Summons\\'))
				) {
					const filePath = path.resolve(
						__dirname,
						'src/pages/Summons/index.tsx',
					);
					if (fs.existsSync(filePath)) {
						return { type: 'sourceFile', filePath };
					}
				}
			}
			// Delega para a resolução padrão do Metro
			return resolve(context, moduleName, platform);
		},
	},
	watchFolders: [
		path.resolve(__dirname, 'src'),
		path.resolve(__dirname, 'legacy'),
	],
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
