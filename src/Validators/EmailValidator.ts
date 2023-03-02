import AbsctractValidator from "./Interface/AbstractValidator";


export default class EmailValidator extends AbsctractValidator 
{
    REGEX: RegExp = /^[\w-\.]+@[\w-]+\.[a-z]{2,4}$/i;

    Message = {
        NotBlank: 'Поле должно быть заполнено',
        NotCorrect: 'Email имеет некорректный формат'
    };
}
