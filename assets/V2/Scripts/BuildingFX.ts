import { _decorator, Component, Node, ParticleSystem } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('BuildingFX')
export class BuildingFX extends Component {
    @property(Node)
    anims: Node[] = [];

    @property(ParticleSystem)
    part: ParticleSystem = null;

    playAnim(): void {
        console.log('this.anims :', this.anims);
        this.part.play();

        this.anims[0].active = true;
        this.anims[1].active = true;

        this.scheduleOnce(() => {
            this.anims[0].active = false;
            this.anims[1].active = false;

            this.anims[2].active = true;
            this.anims[3].active = true;
        }, 0.6)

    }
}


