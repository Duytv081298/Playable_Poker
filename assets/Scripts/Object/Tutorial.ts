import { _decorator, Component, Node, Animation } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Tutorial')
export class Tutorial extends Component {

    @property(Animation)
    animHand: Animation = null;

    showTutorial() {
        this.node.active = true;
        if (this.animHand) {
            this.animHand.play();
        }
    }
    clearTutorial() {
        this.node.active = false;
        if (this.animHand) {
            this.animHand.stop();
        }
    }

}


