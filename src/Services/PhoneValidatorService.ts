import PhoneValidator from "../Validators/PhoneValidator";
import Block from "../utils/Block";
import ValidatorService from "./ValidatorService";

export default class PhoneValidatorService extends ValidatorService
{
    static check(phone: string, component: Block): boolean
    { 
        return ValidatorService.validate(
            new PhoneValidator(phone),
            phone,
            component
        );
    }

    static isValid()
    {
        return super.isValid('PhoneValidator');
    }
}
