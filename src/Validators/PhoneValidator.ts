
const Messages = {
    NotBlank: 'Поле телефон не может быть пустым',
    NotCorrect: 'Поле телефон должен иметь формат 7XXXXXXXXXX'
};

export default class PhoneValidator {
    private static readonly REGEX = /^[\d\+][\d\(\)\ -+]{9,18}\d$/;

    private static emptyField(phone: string): boolean {
        if(phone.length === 0) {
            return true;
        }

        return false;
    }

    private static regexPhone(phone: string): boolean  {
        if(new RegExp(this.REGEX).test(phone)) {
            return true;
        }

        return false;
    }

    static validate (phone: string): string | null {
        
        if(this.emptyField(phone)) {
            return Messages.NotBlank;
        }

        if(this.regexPhone(phone)) {
            return Messages.NotCorrect;
        }

        return null;
    }

}
