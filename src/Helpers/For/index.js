import Handlebars from 'handlebars/dist/handlebars.runtime';

Handlebars.registerHelper("For", function(length, options) {
  let ret = ""; 

  for (let i = 0, j = length; i < j; i++) {
    ret += options.fn(i);
  }

  return ret;
});
