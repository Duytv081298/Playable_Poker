import { _decorator, Component, Node, tween, Tween, Vec3 } from 'cc';
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
        this.isActive = true;


        Tween.stopAllByTarget(this.node);
        Tween.stopAllByTarget(this.card_back);
        Tween.stopAllByTarget(this.card_front);
        this.card_front.setScale(Vec3.ZERO);

        tween(this.node)
            .to(0.5, { scale: new Vec3(0, 1, 1) })
            .call(() => {
                this.card_back.active = false;
                this.card_front.active = true;
            })
            .to(0.5, { scale: Vec3.ONE })
            .start();

    }
}


