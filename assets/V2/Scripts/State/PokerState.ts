import { _decorator, Animation, Button, Component, easing, Game, Label, Node, tween, Vec3 } from 'cc';
import { StateBase } from './StateBase';
import { UIManager } from '../Manager/UIManager';
import { GameManager } from '../Manager/GameManager';
import { Chip } from 'db://assets/Scripts/Object/Chip';
import { Tutorial } from 'db://assets/Scripts/Object/Tutorial';
import { Card } from 'db://assets/Scripts/Object/Card';
import { GameConfig } from 'db://assets/Scripts/Config/GameConfig';
import { ButtonController } from 'db://assets/Scripts/Controller/ButtonController';
import { Constant } from 'db://assets/Scripts/Config/Constant';
import { SoundManager } from 'db://assets/Scripts/PlayableAads/SoundManager';
const { ccclass, property } = _decorator;

@ccclass('PokerState')
export class PokerState extends StateBase {
    // @property(Button)
    // playButton: Button = null;

    // @property(Node)
    // handNode: Node = null;

    @property(Tutorial)
    tutorial: Tutorial = null;
    @property(ButtonController)
    buttonController: ButtonController = null;
    @property(Card)
    listCardDealer: Card[] = [];
    @property(Card)
    listCardPlayerV1: Card[] = [];
    @property(Card)
    listCardPlayer: Card[] = [];
    @property(Card)
    listCommunityCard: Card[] = [];
    @property(Chip)
    chipGame: Chip = null;

    @property(Chip)
    chipBet: Chip = null;

    protected start(): void {
        this.listCardPlayer.forEach((card, i) => {
            card.node.active = false;
            card.reset();
        });
    }
    show() {
        this.resetCard();
        this.buttonController.showButtonLobby_V2();
        this.tutorial.showTutorial();
    }

    resetCard() {
        this.listCardDealer.forEach((card, i) => {
            card.reset();
        });
        this.listCommunityCard.forEach((card, i) => {
            card.reset();
        });
        this.listCardPlayerV1.forEach((card, i) => {
            card.node.destroy();
        });

        this.listCardPlayer.forEach((card, i) => {
            card.node.active = true;
        });
    }

    onHandlePlayButton() {
        console.log("PokerState: Play Button Pressed");

        SoundManager.instance().playEffect(Constant.SFX_UI_Tab);
        this.chipGame.downChip(10);
        this.chipBet.updateChip(10);
        this.showAllCardPlayer();
        this.tutorial.clearTutorial();
        this.buttonController.clearAllButton(true);
        this.scheduleOnce(() => {
            GameManager.instance.goToNextState()
        }, 1)

        SoundManager.instance().playEffect(Constant.SFX_BET);

    }

    showAllCardPlayer() {
        this.listCardPlayer.forEach((card, i) => {
            this.scheduleOnce(() => {
                card.showCard();
            }, GameConfig.DELAY_SHOW_CARD * i);
        });
    }


    // onBetting() {
    //     console.log("PokerState: Betting...");
    //     // this.playButton.node.off(Button.EventType.CLICK, this.onBetting, this);

    //     // AudioManager.instance.playSoundFX(Constant.SFX_UI_Tab);
    //     // AudioManager.instance.playSoundFX(Constant.SFX_Chip_Bet);

    //     // Ensure chipLabel.string is a valid number
    //     // let currentChips: number = parseInt(this.chipLabel.string) || 0;
    //     // let targetChips: number = currentChips + 10;

    //     // UIManager.instance.addChips(-10, 0.5);

    //     // let obj = { value: currentChips };
    //     // tween(this.chipLabel.node)
    //     //     .to(0.3, { scale: new Vec3(1.5, 1.5, 1) })
    //     //     .to(0.1, { scale: new Vec3(1.2, 1.2, 1) })
    //     //     .call(() => {
    //     //         this.playButton.interactable = false;
    //     //         this.onPlayButtonDisappear();
    //     //     })
    //     //     .to(0.1, { scale: new Vec3(1, 1, 1) })
    //     //     .delay(1)
    //     //     .call(() => {
    //     //         GameManager.instance.goToNextState()
    //     //     })
    //     //     .start();

    //     // tween(obj)
    //     //     .to(0.5, { value: targetChips }, {
    //     //         onUpdate: () => {
    //     //             this.chipLabel.string = Math.floor(obj.value).toString();
    //     //         },
    //     //     })
    //     //     .start();



    // }

    // onPlayButtonDisappear() {
    //     tween(this.playButton.node)
    //         .to(0.3, { scale: new Vec3(0, 0, 0) }, { easing: easing.backIn })
    //         .start();
    // }
}


