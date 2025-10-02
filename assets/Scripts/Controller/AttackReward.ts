import { _decorator, Component, Node, tween, Tween, UIOpacity } from 'cc';
import { GlobalEvent } from '../PlayableAads/event/GlobalEvent';
const { ccclass, property } = _decorator;

@ccclass('AttackReward')
export class AttackReward extends Component {
    @property(UIOpacity)
    content: UIOpacity = null;
    @property(Node)
    bankNoteDrop: Node = null;
    @property(Node)
    handNode: Node = null;
    @property(Node)
    fireworkFX: Node = null;
    onLoad() {
        this.content.node.active = false;
        this.content.opacity = 0;
        this.handNode.active = false;
        this.fireworkFX.active = false;

    }
    show() {
        GlobalEvent.instance().dispatchEvent(GlobalEvent.ACTIVE_AUTO_OPEN_STORE);
        if (this.content.node.active) return;
        this.content.node.active = true;
        this.content.opacity = 0;
        Tween.stopAllByTarget(this.content);
        tween(this.content)
            .to(0.5, { opacity: 255 })
            .call(() => {
                this.handNode.active = true;
            })
            .start();
        this.scheduleOnce(() => {
            this.bankNoteDrop.active = true;
            this.fireworkFX.active = true;
        }, 0.25)
    }
}


