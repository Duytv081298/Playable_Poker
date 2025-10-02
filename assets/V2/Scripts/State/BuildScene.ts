import { _decorator, Button, color, Color, Component, Game, instantiate, Node, Prefab, Sprite, tween, Vec3 } from 'cc';
import { StateBase } from './StateBase';
import { GameManager } from '../Manager/GameManager';
import { UIManager } from '../Manager/UIManager';
import { BuildingFX } from '../BuildingFX';
import { Constant } from 'db://assets/Scripts/Config/Constant';
import { SoundManager } from 'db://assets/Scripts/PlayableAads/SoundManager';
const { ccclass, property } = _decorator;

@ccclass('BuildScene')
export class BuildScene extends StateBase {
    @property(Button)
    buildButton: Button[] = [];

    @property(Node)
    objects: Node[] = [];

    @property(Prefab)
    buildPrefab: Prefab = null;

    @property(Node)
    fireworkNode: Node = null;

    @property(Node)
    handNode: Node = null;

    @property(Node)
    bankNoteDrop: Node = null;

    @property(Sprite)
    Bg: Sprite = null;

    protected onLoad(): void {
        for (let i = 0; i < this.buildButton.length; i++) {
            this.buildButton[i].node.on(Button.EventType.CLICK, () => {
                console.log(`BuildScene: Build Button ${i + 1} Pressed`);
                this.onHandleBuild(i);
            }, this);
        }
    }

    onHandleBuild(index: number) {
        console.log(`Building object at index: ${index}`);
        let buildFX = instantiate(this.buildPrefab);
        buildFX.setParent(this.objects[index].parent);
        buildFX.setWorldPosition(this.objects[index].getWorldPosition());
        buildFX.getComponent(BuildingFX).playAnim();

        this.scheduleOnce(() => {
            buildFX.destroy();
        }, 1.2)

        SoundManager.instance().playEffect(Constant.SFX_UI_Click);
        SoundManager.instance().playEffect(Constant.SFX_Build);

        let sp = this.objects[index].getComponent(Sprite);
        sp.color = new Color(255, 255, 255, 0);
        this.objects[index].active = true;
        tween(sp)
            .to(1, { color: new Color(255, 255, 255, 255) })
            .start();


        this.buildButton[index].interactable = false;
        this.buildButton[index].node.off(Button.EventType.CLICK, this.onHandleBuild, this);
        this.buildButton[index].node.getChildByName('price').active = false;
        let mark = this.buildButton[index].node.getChildByName('mark');
        mark.scale = new Vec3(0, 0, 1);
        mark.active = true;
        tween(mark)
            .to(0.3, { scale: new Vec3(1, 1, 1) }, { easing: 'backOut' })
            .start();

        let star = this.buildButton[index].node.getChildByName('Star');
        for (let i = 0; i < star.children.length; i++) {
            let starNode = star.children[i].children[0];
            starNode.scale = new Vec3(0, 0, 1);
            starNode.active = true;
            tween(starNode)
                .delay(i * 0.07)
                .to(0.3, { scale: new Vec3(1, 1, 1) }, { easing: 'backOut' })
                .start();
        }

        UIManager.instance.updateMoney(12500000);

        this.checkAllBuilt();
    }

    checkAllBuilt() {
        // Check if all objects are built
        const allBuilt = this.objects.every(obj => obj.active);
        if (allBuilt) {
            console.log('All objects are built.');
            this.bankNoteDrop.active = true;

            this.scheduleOnce(() => {
                SoundManager.instance().playEffect(Constant.SFX_Win);
            }, 0.75)

            tween(this.Bg)
                .to(2, { color: new Color(255, 255, 255, 180) })
                .to(1, { color: new Color(255, 255, 255, 255) })
                .start()

            this.scheduleOnce(() => {
                this.buildButton[0].node.parent.active = false;
                GameManager.instance.goToNextState();

                this.fireworkNode.active = true;
            }, 2)


            this.handNode.active = false;
        }
        else {
            const notBuiltIndex = this.objects.findIndex(obj => !obj.active);
            console.log(`Object at index ${notBuiltIndex} is not built yet.`);
            const nextButton = this.buildButton[notBuiltIndex].node;
            const pos = nextButton.getWorldPosition().clone();
            pos.y += 100;
            this.handNode.setWorldPosition(pos);

        }
    }
}


