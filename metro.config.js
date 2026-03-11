const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');
const path = require('path');
const { resolve } = require('metro-resolver');

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
			'@pages/Summons': path.resolve(__dirname, 'src/pages/Summons'),
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
				if (moduleName.includes('Summons')) {
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
