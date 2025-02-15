/* eslint-env node */
module.exports = {
  content: [
    './index.html',
    './js/**/*.js',
    './sitemap.html'
  ],
  css: [
    './css/styles.css',
    './css/components/components.css',
    './css/base/base.css',
    './css/layout/layout.css',
    './css/utilities/utilities.css',
    './css/variables/variables.css',
    'https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css'
  ],
  output: 'css',
  safelist: [
    /^carousel/,
    /^modal/,
    /^btn/,
    /^nav/,
    /^collapse/,
    /^show/,
    /^fade/,
    'active',
    'show',
    'fade',
    'open'
  ]
}; 