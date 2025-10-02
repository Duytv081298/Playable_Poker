import { _decorator, Animation, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('TargetAnim')
export class TargetAnim extends Component {
    anim: Animation = null;

    protected onLoad(): void {
        this.anim = this.getComponent(Animation);
    }

    protected onEnable(): void {
        this.anim.play('targetAnim');
        this.anim.on(Animation.EventType.FINISHED, () => {
            this.anim.play('targetLoopAnim');
        }, this);
    }
}


