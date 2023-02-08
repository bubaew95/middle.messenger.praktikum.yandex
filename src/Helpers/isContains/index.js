import Handlebars from 'handlebars/dist/handlebars.runtime';

Handlebars.registerHelper("isContains", function(x, y) {
  if(x === y) {
    return true;
  }
  return false;
});
