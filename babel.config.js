module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        cwd: 'babelrc',
        root: ['./src'],
        extensions: ['.tsx', '.ts', '.js'],
        alias: {
          "@services": "./src/services",
          "@pages": "./src/pages",
          "@helpers": "./src/helpers",
          "@components": "./src/components",

        }
      },
    ],
  ],
};
