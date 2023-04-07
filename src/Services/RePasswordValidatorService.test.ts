import { Field } from "../Components";
import RePasswordValidatorService from "./RePasswordValidatorService";
import {expect} from 'chai';

describe('RePasswordValidatorService', () => {

    const repasswordField = new Field({
        name: 'repassword',
        label: 'RePassword'
    });

    beforeEach(() => {
        RePasswordValidatorService.check('', '', repasswordField)
    });

    it('IsValidator', () => {
        const validator = RePasswordValidatorService.check('Password111##', 'Password111##', repasswordField);
        expect(validator).to.eq(false);
    });

    it('Not IsValidator', () => {
        const validator = RePasswordValidatorService.check('Password111##', 'Password##', repasswordField);
        expect(validator).to.eq(true);
    });
});
