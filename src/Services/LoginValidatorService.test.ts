import { Field } from "../Components";
import LoginValidatorService from "./LoginValidatorService";
import {expect} from 'chai';

describe('LoginValidatorService', () => {
    const loginField = new Field({
        name: 'login',
        label: 'Login'
    });

    it('isValidate', () => {
        const validator = LoginValidatorService.check('testLogin', loginField);
        expect(validator).to.false;
    });

    it('not isValidate', () => {
        const validator = LoginValidatorService.check('testLogin!!234', loginField);
        expect(validator).to.true;
    });

})
