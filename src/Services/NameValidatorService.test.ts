import { Field } from "../Components";
import NameValidatorService from "./NameValidatorService";
import {expect} from 'chai';

describe('NameValidatorService', () => {
    const nameField = new Field({
        name: 'name',
        label: 'Name'
    });

    it('isValidator', () => {
        const validator = NameValidatorService.check('КорректноеИмя', nameField);
        expect(validator).to.false;
    });

    it('Not isValidator', () => {
        const validator = NameValidatorService.check('Корректн оеИмяe2 5', nameField);
        expect(validator).to.true;
    });

    it('Is empty', () => {
        const validator = NameValidatorService.check('', nameField);
        expect(validator).to.true;
    });
})
