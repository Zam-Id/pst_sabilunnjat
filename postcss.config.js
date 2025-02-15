module.exports = {
  plugins: [
    require('postcss-combine-duplicated-selectors')({
      removeDuplicatedProperties: true
    }),
    require('postcss-combine-media-query'),
    require('postcss-merge-rules'),
    require('autoprefixer'),
    require('cssnano')({
      preset: ['default', {
        discardComments: {
          removeAll: true,
        },
        mergeLonghand: true,
        mergeRules: true,
        minifySelectors: true,
        minifyParams: true,
        normalizeWhitespace: true
      }]
    })
  ]
} 