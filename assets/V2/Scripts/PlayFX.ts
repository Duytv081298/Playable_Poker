import { _decorator, Component, Node, ParticleSystem } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('PlayFX')
export class PlayFX extends Component {
    partical: ParticleSystem;

    protected onLoad(): void {
        this.partical = this.node.getComponent(ParticleSystem);
    }

    playFX() {
        this.partical.play();
    }
}


