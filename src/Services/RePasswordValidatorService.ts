import ValidatorInterface from "../Validators/Interface/ValidatorInterface";
import RePasswordValidator from "../Validators/RePasswordValidator";
import Block from "../utils/Block";
import ValidatorService from "./ValidatorService";

export default class RePasswordValidatorService extends ValidatorService
{
    private static validatorName: string = 'RePasswordValidator';

    static check(password: string, rePassword: string, component: Block): boolean { 
        const passwordValidator: ValidatorInterface = new RePasswordValidator(password);

        if(this.isDisableRender(password, component)) {
            return this.isValid(this.validatorName) ? false : true;
        }

        if(this.isEmplty(passwordValidator, component)) {
            this.validates[this.validatorName] = false;
            return true;
        }

        if(password !== rePassword) {
            this.validates[this.validatorName] = false;

            component.setProps({
                error: passwordValidator.Message.NotCorrect
            });

            return true;
        }

        this.validates[this.validatorName] = true;

        return this.isNullProps(component);
    }
}
