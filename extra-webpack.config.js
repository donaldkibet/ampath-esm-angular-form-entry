const singleSpaAngularWebpack = require('single-spa-angular/lib/webpack').default

const ReplaceInFileWebpackPlugin = require('replace-in-file-webpack-plugin');

module.exports = (angularWebpackConfig, options) => {
  const singleSpaWebpackConfig = singleSpaAngularWebpack(angularWebpackConfig, options)
  //console.log('externals', singleSpaWebpackConfig.externals)

  singleSpaWebpackConfig.externals['@openmrs/esm-api'] = '@openmrs/esm-api';
  // console.log('webpack', singleSpaWebpackConfig.output);

  const path = singleSpaWebpackConfig.output.path;
  const publicPath = singleSpaWebpackConfig.output.publicPath;
  // HACK to fix the deployment of fonts for bootstrap
  singleSpaWebpackConfig.plugins.push(
    new ReplaceInFileWebpackPlugin([{
      dir: path,
      files: ['main-es2015.js'],
      rules: [
        {
          search: 'glyphicons-halflings-regular.eot',
          replace: publicPath + 'glyphicons-halflings-regular.eot'
        },
        {
          search: 'glyphicons-halflings-regular.woff',
          replace: publicPath + 'glyphicons-halflings-regular.woff'
        },
        // {
        //   search: 'glyphicons-halflings-regular.woff2',
        //   replace: publicPath + 'glyphicons-halflings-regular.woff2'
        // },
        {
          search: 'glyphicons-halflings-regular.ttf',
          replace: publicPath + 'glyphicons-halflings-regular.ttf'
        },
        {
          search: 'glyphicons-halflings-regular.svg',
          replace: publicPath + 'glyphicons-halflings-regular.svg'
        }
      ]
    }]
    ));

  // singleSpaWebpackConfig.module.rules.push({parser: {system: false}})

  // Feel free to modify this webpack config however you'd like to
  return singleSpaWebpackConfig
}