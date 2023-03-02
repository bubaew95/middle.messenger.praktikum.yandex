import AbsctractValidator from "./Interface/AbstractValidator";


export default class PasswordValidator extends AbsctractValidator {
    REGEX: RegExp = /(?=.*[0-9])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{8,40}/g;

    Message = {
        NotBlank: `Поле должно быть заполнено`,
        NotCorrect: `Пароль должен содержать хотя бы одна заглавная буква и цифра`,
        MinLength: 'Поле должно иметь больше 8 символов',
        MaxLength: 'Поле не должно содержать больше 40 символов'
    };
}
