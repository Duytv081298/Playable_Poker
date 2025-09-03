import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Card')
export class Card extends Component {

    @property(Node)
    card_back: Node = null;
    @property(Node)
    card_front: Node = null;
    isActive: boolean = false;

    protected onLoad(): void {
        this.reset();
    }

    reset() {
        this.showBack();
    }
    showBack() {
        this.card_back.active = true;
        this.card_front.active = false;
        this.isActive = false;
    }
    showCard() {
        this.card_back.active = false;
        this.card_front.active = true;
        this.isActive = true;
    }
}


