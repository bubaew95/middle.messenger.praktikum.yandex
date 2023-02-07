import Handlebars from 'handlebars/dist/handlebars.runtime';

Handlebars.registerHelper("Substr", function(text, options) {

    const {start = 0, end = 20} = options.hash;

    let string = text.substring(start, end);

    if(text.length > end) {
        string = string.trim() + '...';
    }

    return new Handlebars.SafeString(string)

});