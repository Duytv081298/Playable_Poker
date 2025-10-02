import { _decorator, Component, easing, Node, tween, Vec3 } from 'cc';
import { AudioManager } from '../../Scripts/Controller/AudioManager';
const { ccclass, property } = _decorator;

@ccclass('CloudTransition')
export class CloudTransition extends Component {
    private originalPositions: Map<Node, Vec3> = new Map();

    protected onLoad(): void {
        this.node.children.forEach(cloud => {
            this.originalPositions.set(cloud, cloud.position.clone());
        });
    }

    onCoverAnimationFinish(callback?: Function) {
        this.node.children.forEach((cloud, i) => {
            const pos = this.originalPositions.get(cloud) || cloud.position.clone();
            tween(cloud)
                .set({ position: pos.clone().add3f(1700 * (i % 2 === 0 ? 1 : -1), 0, 0) })
                .to(0.6, { position: pos }, { easing: easing.sineOut })
                .call(() => {
                    if (i === this.node.children.length - 1) {
                        callback && callback();
                    }
                })
                .start();
        });

        AudioManager.instance.playSoundFX('Loading_Cloud');
    }

    onUncoverAnimationFinish() {
        this.node.children.forEach((cloud, i) => {
            const pos = this.originalPositions.get(cloud) || cloud.position.clone();
            tween(cloud)
                .to(0.6, { position: pos.clone().add3f(1700 * (i % 2 === 0 ? -1 : 1), 0, 0) }, { easing: easing.sineIn })
                .start();
        });

        this.scheduleOnce(() => {
            this.node.active = false;
        }, 0.6);
    }
}


