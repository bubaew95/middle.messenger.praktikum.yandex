import Sinon from "sinon";
import Button from ".";
import { expect } from "chai";

describe('Button', () => {

    const callback = Sinon.stub();

    const button = new Button({
        title: 'Кнопка',
        type: 'password',
        events: {
            click: callback
        }
    });

    describe('Element', () => {
        it('Shoud have be button element', () => {
            expect(button.element).to.be.instanceof(window.HTMLButtonElement);
        });

        it('Shoud dont have input element', () => {
            expect(button.element).to.not.instanceof(window.HTMLInputElement);
        });
    })



    it('Shoud have be click', () => {
        button.element?.click();
        expect(callback.called).to.be.true;
    });
})
