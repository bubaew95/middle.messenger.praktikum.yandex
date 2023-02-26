import ValidatorInterface from "../Validators/Interface/ValidatorInterface";
import PasswordValidator from "../Validators/PasswordValidator";
import Block from "../utils/Block";
import ValidatorService from "./ValidatorService";

export default class PasswordValidatorService extends ValidatorService
{
    private static validatorName: string = 'RePasswordValidator';
    private static minLength: number = 8;
    private static maxLength: number = 40;

    static check(password: string, component: Block): boolean { 
        const passwordValidator: ValidatorInterface = new PasswordValidator(password);

        if(this.isDisableRender(password, component)) {
            return false;
        }

        if(this.isEmplty(passwordValidator, component)) {
            this.validates[this.validatorName] = false;
            return true;
        }

        if(password.length <= this.minLength) {
            this.validates[this.validatorName] = false;
            component.setProps({
                error: passwordValidator.Message.MinLength
            });

            return true;
        }

        if(password.length > this.maxLength) {
            this.validates[this.validatorName] = false;
            component.setProps({
                error: passwordValidator.Message.MaxLength
            });

            return true;
        } 

        if( this.isValidate(passwordValidator, component) ) {
            this.validates[this.validatorName] = false;
            return true;
        }

        this.validates[this.validatorNamePasswordValidator] = true;

        return this.isNullProps(component);
    }

    static isValid()
    {
        return super.isValid('PasswordValidator');
    }
}
