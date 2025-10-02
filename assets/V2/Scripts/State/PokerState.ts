import { _decorator, Animation, Button, Component, easing, Game, Label, Node, tween, Vec3 } from 'cc';
import { StateBase } from './StateBase';
import { UIManager } from '../Manager/UIManager';
import { GameManager } from '../Manager/GameManager';
const { ccclass, property } = _decorator;

@ccclass('PokerState')
export class PokerState extends StateBase {
    @property(Node)
    playerCard: Node[] = [];

    @property(Button)
    playButton: Button = null;

    @property(Label)
    chipLabel: Label = null;

    @property(Node)
    handNode: Node = null;

    protected start(): void {
        this.playButton.node.on(Button.EventType.CLICK, this.onHandlePlayButton, this);
    }

    onHandlePlayButton() {
        console.log("PokerState: Play Button Pressed");
        this.playButton.node.off(Button.EventType.CLICK, this.onHandlePlayButton, this);
        this.onFlipPlayerCards();

        // AudioManager.instance.playSoundFX(Constant.SFX_UI_Tab);

        this.onBetting()

        this.handNode.active = false;
    }

    onFlipPlayerCards() {
        for (let i = 0; i < this.playerCard.length; i++) {
            this.scheduleOnce(() => {
                const anim = this.playerCard[i].getComponent(Animation);
                anim.play();
                // AudioManager.instance.playSoundFX(Constant.SFX_Card_Flip);
            }, i * 0.25);
        }

        // this.playerCard.forEach(card => {
        //     const anim = card.getComponent(Animation);
        //     anim.play();
        // })
    }

    onBetting() {
        console.log("PokerState: Betting...");
        this.playButton.node.off(Button.EventType.CLICK, this.onBetting, this);

        // AudioManager.instance.playSoundFX(Constant.SFX_UI_Tab);
        // AudioManager.instance.playSoundFX(Constant.SFX_Chip_Bet);

        // Ensure chipLabel.string is a valid number
        let currentChips: number = parseInt(this.chipLabel.string) || 0;
        let targetChips: number = currentChips + 10;

        UIManager.instance.addChips(-10, 0.5);

        let obj = { value: currentChips };
        tween(this.chipLabel.node)
            .to(0.3, { scale: new Vec3(1.5, 1.5, 1) })
            .to(0.1, { scale: new Vec3(1.2, 1.2, 1) })
            .call(() => {
                this.playButton.interactable = false;
                this.onPlayButtonDisappear();
            })
            .to(0.1, { scale: new Vec3(1, 1, 1) })
            .delay(1)
            .call(() => {
                GameManager.instance.goToNextState()
            })
            .start();

        tween(obj)
            .to(0.5, { value: targetChips }, {
                onUpdate: () => {
                    this.chipLabel.string = Math.floor(obj.value).toString();
                },
            })
            .start();
    }

    onPlayButtonDisappear() {
        tween(this.playButton.node)
            .to(0.3, { scale: new Vec3(0, 0, 0) }, { easing: easing.backIn })
            .start();
    }
}


