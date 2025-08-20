const fs = require('fs')
const path = require('path')
const webpack = require('webpack')

const appDirectory = fs.realpathSync(process.cwd())
const resolveApp = relativePath => path.resolve(appDirectory, relativePath)

// our packages that will now be included in the CRA build step
const appIncludes = [
  resolveApp("src"),
];

module.exports = function override(config, env) {
  // allow importing from outside of src folder
  config.resolve.plugins = config.resolve.plugins.filter(
    plugin => plugin.constructor.name !== 'ModuleScopePlugin'
  )
  config.module.rules[0].include = appIncludes
  config.module.rules[1] = null
  config.module.rules[2].oneOf[1].include = appIncludes
  config.module.rules[2].oneOf[1].options.plugins = [
    require.resolve('@babel/plugin-transform-arrow-functions'),
    [require('babel-plugin-transform-imports'), {
      "lodash": {
        transform: function(importName, matches) {
          return "lodash/" + importName;
        },
        preventFullImport: true
      }
    }]
  ].concat(config.module.rules[2].oneOf[1].options.plugins);
  config.module.rules = config.module.rules.filter(Boolean)
  config.plugins.push(
    new webpack.DefinePlugin({ __DEV__: env !== 'production' })
  )

  if (env === 'production') {
    // ignore "why-did-you-render" package in the production bundle
    config.plugins.push(
      new webpack.IgnorePlugin(/^@welldone-software\/why-did-you-render$/),
    );

    // remove unused code
    config.optimization.usedExports = true;
  }

  for (let _rule of config.module.rules) {
    if (_rule.oneOf) {
      _rule.oneOf.unshift({
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        include: [
          resolveApp('src/resources/icons')
        ],
        use: [
          {
            loader: '@svgr/webpack',
            options: {
              icon: true,
            },
          },
        ],
      });
      break;
    }
  }

  return config
}
