import { _decorator, Component, Node, tween, Tween, UIOpacity, Vec3 } from 'cc';
import { AudioManager } from '../Controller/AudioManager';
import { Constant } from '../Config/Constant';
const { ccclass, property } = _decorator;

@ccclass('Card')
export class Card extends Component {

    @property(Node)
    card_back: Node = null;
    @property(Node)
    card_front: Node = null;

    @property(UIOpacity)
    outLine: UIOpacity = null;
    isActive: boolean = false;

    defaultScale: Vec3 = Vec3.ONE;

    protected onLoad(): void {
        this.reset();
        this.defaultScale = this.node.scale.clone();
    }

    reset() {
        this.showBack();
        if (this.outLine) {
            this.outLine.node.active = false;
            this.outLine.opacity = 0;
        };
    }
    showBack() {
        this.card_back.active = true;
        this.card_front.active = false;
        this.isActive = false;
    }
    showCard() {
        if (this.isActive) return;
        this.isActive = true;


        Tween.stopAllByTarget(this.node);
        Tween.stopAllByTarget(this.card_back);
        Tween.stopAllByTarget(this.card_front);
        let newScale = this.defaultScale.clone();
        newScale.x = 0;

        tween(this.node)
            .to(0.15, { scale: newScale })
            .call(() => {
                this.card_back.active = false;
                this.card_front.active = true;
            })
            .to(0.15, { scale: this.defaultScale })
            .start();

        AudioManager.instance.playSoundFX(Constant.SFX_CARD_FLIP);
    }

    showOutLine() {
        if (this.outLine === null) return;
        if (this.outLine.node.active) return;
        Tween.stopAllByTarget(this.outLine);
        this.outLine.node.active = true;
        tween(this.outLine)
            .repeatForever(
                tween()
                    .to(0.35, { opacity: 255 })
                    .to(0.35, { opacity: 180 })
            )
            .start()
    }
}


