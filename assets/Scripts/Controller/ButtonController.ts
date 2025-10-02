import { _decorator, Component, Node, Tween, tween, UIOpacity } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('ButtonController')
export class ButtonController extends Component {
    @property(Node)
    buttonLobby: Node = null;
    @property(Node)
    buttonLobby_V2: Node = null;

    @property(Node)
    buttonPreFlop: Node = null;

    @property(Node)
    buttonFlop: Node = null;

    @property(Node)
    buttonTurn: Node = null;
    @property(Node)
    buttonRiver: Node = null;

    @property(UIOpacity)
    uiOpacity: UIOpacity = null;
    @property(Node)
    disableButton: Node = null;

    isShowing: boolean = true;

    clearAllButton(isAnimation: boolean = false) {
        if (!this.isShowing) return;
        Tween.stopAllByTarget(this.uiOpacity);
        this.isShowing = false;
        this.disableButton.active = true;

        this.buttonLobby.active = false;
        this.buttonLobby_V2.active = false;
        this.buttonPreFlop.active = false;
        this.buttonFlop.active = false;
        this.buttonTurn.active = false;
        this.buttonRiver.active = false;
        if (isAnimation) {
            Tween.stopAllByTarget(this.uiOpacity);
            tween(this.uiOpacity)
                .to(0.5, { opacity: 0 })
                .call(() => {
                    this.uiOpacity.opacity = 0;
                })
                .start();
        } else {
            this.uiOpacity.opacity = 0;
        }
    }
    protected onLoad(): void {
        this.clearAllButton();
    }
    showButtonLobby() {
        this.clearAllButton();
        this.buttonLobby.active = true;
        this.animationShow();
    }
    showButtonLobby_V2() {
        this.disableButton.active = false;
        this.clearAllButton();
        this.buttonLobby_V2.active = true;
        this.animationShow();
    }
    showButtonPreFlop() {
        // return;
        this.clearAllButton();
        this.buttonPreFlop.active = true;
        this.animationShow();
    }
    showButtonFlop() {
        // return;
        this.clearAllButton();
        this.buttonFlop.active = true;
        this.animationShow();
    }
    showButtonTurn() {
        // return;
        this.clearAllButton();
        this.buttonTurn.active = true;
        this.animationShow();
    }
    showButtonRiver() {
        // return;
        this.clearAllButton();
        this.buttonRiver.active = true;
        this.animationShow();
    }

    animationShow() {
        this.isShowing = true;
        this.uiOpacity.opacity = 0;
        Tween.stopAllByTarget(this.uiOpacity);
        tween(this.uiOpacity)
            .to(0.5, { opacity: 255 })
            .call(() => {
                this.uiOpacity.opacity = 255;
                this.disableButton.active = false;
            })
            .start();
    }
}


