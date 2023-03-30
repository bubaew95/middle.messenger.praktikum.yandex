import { Field } from "../Components";
import PasswordValidatorService from "./PasswordValidatorService";
import {expect} from 'chai';


describe('PasswordValidatorService', () => {
    const passwordField = new Field({
        name: 'password',
        label: 'Password'
    });

    it('IsValidate', () => {
        const validator = PasswordValidatorService.check('Password112##', passwordField);
        expect(validator).to.false;
    });

    it('Not IsValidate', () => {
        const validator = PasswordValidatorService.check('password', passwordField);
        expect(validator).to.true;
    });

    it('IsValidate MaxLength', () => {
        const validator = PasswordValidatorService.check('password1sjjdjdjdjdjdjjdjdjahsfasfqwrqrwasfasfasfasfasskgskdgkskdguwuetqw12124@12##', passwordField);
        expect(validator).to.true;
    });

    it('IsValidate MinLength', () => {
        const validator = PasswordValidatorService.check('pass', passwordField);
        expect(validator).to.true;
    });
});
