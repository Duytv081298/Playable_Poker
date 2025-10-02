import { _decorator, Component, Node, tween, Tween, UIOpacity } from 'cc';
import { GlobalEvent } from '../PlayableAads/event/GlobalEvent';
const { ccclass, property } = _decorator;

@ccclass('AttackReward')
export class AttackReward extends Component {
    @property(UIOpacity)
    content: UIOpacity = null;
    onLoad() {
        this.content.node.active = false;
        this.content.opacity = 0;
    }
    show() {
        GlobalEvent.instance().dispatchEvent(GlobalEvent.ACTIVE_AUTO_OPEN_STORE);
        if (this.content.node.active) return;
        this.content.node.active = true;
        this.content.opacity = 0;
        Tween.stopAllByTarget(this.content);
        tween(this.content)
            .to(0.5, { opacity: 255 })
            .start();
    }
}


