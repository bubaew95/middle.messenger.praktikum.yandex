import AbsctractValidator from "./Interface/AbstractValidator";


export default class RePasswordValidator extends AbsctractValidator {
    REGEX: RegExp = /^/i;

    Message = {
        NotBlank: `Поле должно быть заполнено`,
        NotCorrect: 'Пароли не совпадают',
    };
}
