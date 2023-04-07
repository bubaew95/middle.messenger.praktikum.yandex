
import EmailValidatorService from "./EmailValidatorService";
import{expect} from 'chai';
import { Field } from "../Components";

describe('EmailValidatorService', () => {
    const emailField = new Field({
        name: 'email',
        label: 'Почта'
    });

    it('element should return input', () => {
        const element = emailField.children.Input.element;
        expect(element).to.be.instanceof(window.HTMLInputElement);
    })

    it('isEmplty', () => {
        const validator = EmailValidatorService.check('', emailField);
        expect(validator).to.true;
    });

    it('isValidate', () => {
        const validator = EmailValidatorService.check('test@mail.ru', emailField);
        expect(validator).to.false;
    });

    it('not isValidate', () => {
        const validator = EmailValidatorService.check('testmail.ru', emailField);
        expect(validator).to.true;
    });

    it('isDisableRender', () => {
        EmailValidatorService.check('test@mail.ru', emailField);
        const validator = EmailValidatorService.check('test@mail.ru', emailField);
        expect(validator).to.false;
    });

});
