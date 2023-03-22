import Handlebars from 'handlebars/dist/handlebars.runtime';

Handlebars.registerHelper("DateFormat", function(date: string, options: any) {
    if(!date) {
        return;
    }
    
    const nDate = new Date(date);

    return `${nDate.getHours()}:${nDate.getMinutes()}`;
});
