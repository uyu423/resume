/* eslint-disable @typescript-eslint/no-var-requires */
const { homepage } = require('./package.json');

const { NODE_ENV } = process.env;

module.exports = {
  output: 'export',
  distDir: 'docs',
  images: {
    unoptimized: true,
  },
  assetPrefix: (() => {
    if (NODE_ENV === 'production' && homepage) {
      try {
        console.log('> Detected homepage url in package.json');
        const { pathname } = new URL(homepage);
        if (pathname !== '/') {
          console.log(`> Apply '${pathname}' to assetPrefix(subPath)`);
          return pathname;
        }
        return '';
      } catch {
        console.log('> Can not parse homepage URL not apply assetPrefix(subPath)');
        return '';
      }
    }
    return '';
  })(),
};
