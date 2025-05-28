module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      ['module:react-native-dotenv', {
        moduleName: '@env',
        path: '.env',
        safe: false,           // set to true to require a .env.example
        allowUndefined: true,  // set to false to error on undefined keys
      }],
    ],
  };
};
