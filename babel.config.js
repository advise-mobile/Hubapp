module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src', './legacy'],
        alias: {
          '@': './src',
          // Aliases COM 'l' para legacy
          '@lstore': './legacy/store',
          '@lservices': './legacy/services',
          '@lcomponents': './legacy/components',
          '@lpages': './legacy/pages',
          '@lnavigation': './legacy/navigation',
          '@lhelpers': './legacy/helpers',
          '@lassets': './legacy/assets',
          '@lassets/styles/global': './legacy/assets/styles/global',
          // Aliases SEM 'l' para src (código novo)
          '@store': './src/store', // Será criado quando migrar
          '@services': './src/services',
          // Aliases ESPECÍFICOS para páginas TypeScript (em src/) - DEVEM VIR ANTES do alias genérico @pages
          '@pages/MovementsTrash': './src/pages/MovementsTrash',
          '@pages/Finance': './src/pages/Finance',
          '@pages/Finance/Details': './src/pages/Finance/Details',
          '@pages/Finance/CashFlow': './src/pages/Finance/CashFlow',
          '@pages/Finance/Category': './src/pages/Finance/Category',
          '@pages/Promotion': './src/pages/Promotion',
          // ScrollableTabView está em src/components (TypeScript) - ANTES do alias genérico @components
          '@components/ScrollableTabView': './src/components/ScrollableTabView',
          '@components': './src/components',
          '@pages': './src/pages',
          '@navigation': './src/navigation', // Será criado quando migrar
          '@helpers': './src/helpers',
          '@assets': './src/assets',
          '@theme': './src/theme',
          // Aliases para legacy (para compatibilidade)
          '@legacy': './legacy',
          '@legacy/store': './legacy/store',
          '@legacy/services': './legacy/services',
          '@legacy/components': './legacy/components',
          '@legacy/pages': './legacy/pages',
          '@legacy/navigation': './legacy/navigation',
          '@legacy/helpers': './legacy/helpers',
          // Aliases para imports sem @ (compatibilidade com código legado)
          components: './legacy/components',
          helpers: './legacy/helpers',
          'assets/styles': './legacy/assets/styles',
          pages: './legacy/pages',
          'components/ScrollableTabView': './src/components/ScrollableTabView',
        },
      },
    ],
  ],
};
