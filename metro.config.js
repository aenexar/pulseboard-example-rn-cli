const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');
const path = require('path');

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('@react-native/metro-config').MetroConfig}
 */

const defaultConfig = getDefaultConfig(__dirname);
const config = {
  resolver: {
    assetExts: defaultConfig.resolver.assetExts,
  },
  watchFolders: [path.resolve(__dirname, 'node_modules')],
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
