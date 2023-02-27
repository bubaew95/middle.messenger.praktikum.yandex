import EmailValidator from "../Validators/EmailValidator";
import Block from "../utils/Block";
import ValidatorService from "./ValidatorService";

export default class EmailValidatorService extends ValidatorService
{ 
    static check(value: string, component: Block): boolean { 
        return ValidatorService.validate(
            new EmailValidator(value),
            value, component
        ); 
    }
}
