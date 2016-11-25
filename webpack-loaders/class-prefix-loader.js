const postcss   = require('postcss');
const classPrfx = require('postcss-class-prefix');

module.exports = (source) => {
  return postcss()
    .use(classPrfx('bs-'))
    .process(source);
};
