import { _decorator, Button, Color, Component, easing, instantiate, Node, Prefab, Sprite, tween, Vec3 } from 'cc';
import { StateBase } from './StateBase';
import { UIManager } from '../Manager/UIManager';
import { GameManager } from '../Manager/GameManager';
import { PlayFX } from '../PlayFX';
import { AudioManager } from 'db://assets/Scripts/Controller/AudioManager';
const { ccclass, property } = _decorator;

@ccclass('AttackScene')
export class AttackScene extends StateBase {
    @property(Prefab)
    moneyPrefab: Prefab = null;

    @property(Prefab)
    lightningPrefab: Prefab = null;

    @property(Prefab)
    bankNotePrefab: Prefab = null;

    @property(Node)
    hammerNode: Node = null;

    @property(Node)
    handNode: Node = null;

    @property(Sprite)
    redSky: Sprite = null;

    @property(Node)
    lightningNode: Node = null;

    attackButton: Button[] = [];

    protected onLoad(): void {
        this.attackButton = this.node.getComponentsInChildren(Button);
    }

    protected start(): void {
        this.attackButton.forEach(button => {
            button.node.on(Button.EventType.CLICK, this.onHandleAttackButton, this);
        })
    }

    onStartState() {
        this.attackButton.forEach(button => {
            button.node.active = true;
        })

        let pos = this.hammerNode.position.clone();
        this.hammerNode.setPosition(new Vec3(pos.x, pos.y - 1000, pos.z));
        this.hammerNode.active = true;
        tween(this.hammerNode)
            .to(0.5, { position: pos }, { easing: easing.backOut })
            .start();

        this.handNode.active = true;
    }

    onHandleAttackButton(event: Event) {
        console.log("AttackScene: Attack Button Pressed");

        const clickedNode = ((event.target as unknown) as Node);
        console.log(' event.target :', clickedNode);

        this.handNode.active = false;

        this.attackButton.forEach(button => {
            button.node.off(Button.EventType.CLICK, this.onHandleAttackButton, this);

            if (button.node !== clickedNode) {
                button.node.active = false;
            }
        });

        // AudioManager.instance.playSoundFX(Constant.SFX_UI_Click)

        this.onHandleAttack(clickedNode.parent)
    }

    onHandleAttack(target: Node) {
        console.log("Attacking target:", target.name);

        this.hammerNode.getChildByName('aura').active = true;

        tween(this.hammerNode)
            .to(0.5, { scale: new Vec3(0.92, 0.92, 0.92) }, { easing: easing.backInOut })
            .call(() => {

                // AudioManager.instance.playSoundFX(Constant.SFX_Attack_Lightning);
                // let lightning = instantiate(this.lightningPrefab);
                // lightning.setParent(this.hammerNode)
                // lightning.setWorldPosition(this.hammerNode.getWorldPosition().clone().add3f(0, 1270, 0));
                // lightning.scale = new Vec3(3, 3, 3)
                // lightning.eulerAngles = new Vec3(0, 0, 180);

                this.lightningNode.active = true;


                this.redSky.node.active = true;
                tween(this.redSky)
                    .set({ color: new Color(255, 255, 255, 0) })
                    .to(0.4, { color: new Color(255, 255, 255, 255) })
                    .to(0.2, { color: new Color(255, 255, 255, 0) })
                    .start();


            })
            .start()


        this.scheduleOnce(() => {
            // AudioManager.instance.playSoundFX(Constant.SFX_Attack_Lightning)
            target.getComponent(Sprite).color = new Color(151, 0, 0, 255);

            let lightning = instantiate(this.lightningPrefab);
            lightning.setParent(this.node)
            lightning.setWorldPosition(target.getWorldPosition().clone());

            this.redSky.node.active = true;
            tween(this.redSky)
                .set({ color: new Color(255, 255, 255, 0) })
                .to(0.4, { color: new Color(255, 255, 255, 255) })
                .to(0.2, { color: new Color(255, 255, 255, 0) })
                .start();

            let bankNote = instantiate(this.bankNotePrefab);
            bankNote.setParent(this.node)
            bankNote.setWorldPosition(target.getWorldPosition().clone());

            this.scheduleOnce(() => {
                let bankNote = instantiate(this.bankNotePrefab);
                bankNote.setParent(this.node)
                bankNote.setWorldPosition(target.getWorldPosition().clone());
                bankNote.getComponent(PlayFX).playFX();
            }, 0.1)

            this.scheduleOnce(() => {


                let busted = target.getChildByName('busted');
                busted.setScale(new Vec3(0, 0, 1));
                busted.active = true;
                tween(busted)
                    .to(0.3, { scale: new Vec3(1, 1, 1) }, { easing: 'backOut' })
                    .start();

                let money = instantiate(this.moneyPrefab);
                money.setParent(this.node)
                let x = 0;
                if (target.name.includes('object_2')) {
                    x = 150;
                }
                money.setWorldPosition(target.getWorldPosition().clone().add3f(x, 160, 0));
                tween(money)
                    .set({ scale: new Vec3(0, 0, 0) })
                    .to(0.4, { scale: new Vec3(1, 1, 1) }, { easing: 'backIn' })
                    .start();



                let targeted = target.children.find(child => child.name.includes('target'));
                if (targeted) {
                    targeted.active = false;
                }

                this.scheduleOnce(() => {
                    UIManager.instance.showAttackReward();
                }, 1.5)
            }, 0.4)
        }, 1.5)
    }

    isPressed: boolean = false;
    onEndState() {
        if (this.isPressed) return;
        this.isPressed = true;

        GameManager.instance.goToNextState();
        // AudioManager.instance.playSoundFX(Constant.SFX_UI_Click)
    }
}


