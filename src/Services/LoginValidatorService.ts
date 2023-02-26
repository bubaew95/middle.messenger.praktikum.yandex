import ValidatorInterface from "../Validators/Interface/ValidatorInterface";
import LoginValidator from "../Validators/LoginValidator";
import Block from "../utils/Block";
import ValidatorService from "./ValidatorService";

export default class LoginValidatorService extends ValidatorService 
{
    private static validatorName: string = 'LoginValidator';

    private static minLength: number = 3;
    private static maxLength: number = 20;

    static check(login: string, component: Block): boolean
    {
        const loginValidator: ValidatorInterface = new LoginValidator(login);

        if(this.isDisableRender(login, component)) {
            return false;
        }

        if(this.isEmplty(loginValidator, component)) {
            this.validates[this.validatorName] = false;
            return true;
        }

        if(login.length <= this.minLength) {
            this.validates[this.validatorName] = false;
            component.setProps({
                error: loginValidator.Message.MinLength
            });

            return true;
        }

        if(login.length > this.maxLength) {
            this.validates[this.validatorName] = false;
            component.setProps({
                error: loginValidator.Message.MaxLength
            });

            return true;
        } 

        if( this.isValidate(loginValidator, component) ) {
            this.validates[this.validatorName] = false;
            return true;
        }

        this.validates[this.validatorName] = true;

        return this.isNullProps(component);
    }

    static isValid()
    {
        return super.isValid(this.validatorName);
    }
}
