import NameValidator from "../Validators/NameValidator";
import Block from "../utils/Block";
import ValidatorService from "./ValidatorService";


export default class NameValidatorService extends ValidatorService 
{
    static check(name: string, component: Block): boolean
    {
        return ValidatorService.validate(
            new NameValidator(name),
            name, component
        );
    }

    static isValid()
    {
        return super.isValid('NameValidator');
    }
}
