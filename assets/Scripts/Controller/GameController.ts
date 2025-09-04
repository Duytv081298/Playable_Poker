import { _decorator, Component, Node } from 'cc';
import { Card } from '../Object/Card';
import { Chip } from '../Object/Chip';
import { Tutorial } from '../Object/Tutorial';
import { ButtonController } from './ButtonController';
import { RoyalFlush } from './RoyalFlush';
import { AudioManager } from './AudioManager';
import { Constant } from '../Config/Constant';
const { ccclass, property } = _decorator;

@ccclass('GameController')
export class GameController extends Component {
    @property(Tutorial)
    tutorial: Tutorial = null;
    @property(ButtonController)
    buttonController: ButtonController = null;

    @property(RoyalFlush)
    royalFlush: RoyalFlush = null;

    @property(Node)
    @property(Card)
    listCardDealer: Card[] = [];
    @property(Card)
    listCardPlayer: Card[] = [];
    @property(Card)
    listCommunityCard: Card[] = [];

    @property(Chip)
    chipGame: Chip = null;

    @property(Chip)
    chipBet: Chip = null;

    @property(Node)
    coinUI: Node = null;


    indexStep: number = 0; // 0: dealer, 1: player, 2: flop, 3: turn, 4: river


    protected start(): void {
        this.showLobby();
    }

    showLobby() {
        this.buttonController.showButtonLobby();
        this.tutorial.showTutorial();
        console.log("showLobby");
    }


    onHandlePlay() {
        this.chipGame.downChip(10);
        this.chipBet.updateChip(10);
        this.showAllCardPlayer();
        this.tutorial.clearTutorial();
        this.buttonController.clearAllButton(true);
        this.scheduleOnce(() => {
            this.buttonController.showButtonPreFlop();
        }, 1)

        AudioManager.instance.playSoundFX(Constant.SFX_BET);
    }
    onHandleCheckPreFlop() {
        this.buttonController.showButtonFlop();

        for (let i = 0; i < 3; i++) {
            this.scheduleOnce(() => {
                let card: Card = this.listCommunityCard[i];
                card.showCard();
            }, 0.2 * i);
        }
        AudioManager.instance.playSoundFX(Constant.SFX_CHECK);
    }

    onHandleX3PreFlop() {
        this.chipGame.downChip(30);
        this.chipBet.updateChip(30);
        this.buttonController.clearAllButton(true);

        this.scheduleOnce(() => {
            this.buttonController.showButtonFlop();
            for (let i = 0; i < 3; i++) {
                this.scheduleOnce(() => {
                    let card: Card = this.listCommunityCard[i];
                    card.showCard();
                }, 0.2 * i)
            }
        }, 0.5)

        AudioManager.instance.playSoundFX(Constant.SFX_BET);
    }

    onHandleCheckFlop() {
        this.buttonController.showButtonTurn();

        let card: Card = this.listCommunityCard[3];
        if (card) card.showCard();

        AudioManager.instance.playSoundFX(Constant.SFX_CHECK);
    }
    onHandleX3Flop() {
        this.chipGame.downChip(120);
        this.chipBet.updateChip(120);
        this.buttonController.clearAllButton(true);

        let card: Card = this.listCommunityCard[3];
        if (card) card.showCard();

        this.scheduleOnce(() => {
            this.buttonController.showButtonTurn();
        }, 1)

        AudioManager.instance.playSoundFX(Constant.SFX_BET);
    }


    onHandleCheckTurn() {
        this.buttonController.showButtonRiver();

        let card: Card = this.listCommunityCard[4];
        if (card) card.showCard();

        AudioManager.instance.playSoundFX(Constant.SFX_CHECK);
    }
    onHandleX3Turn() {
        this.chipGame.downChip(480);
        this.chipBet.updateChip(480);
        this.buttonController.clearAllButton(true);
        let card: Card = this.listCommunityCard[4];
        if (card) card.showCard();

        this.scheduleOnce(() => {
            this.buttonController.showButtonRiver();
        }, 1)

        AudioManager.instance.playSoundFX(Constant.SFX_CHECK);
    }




    onHandleCheckRiver() {
        this.buttonController.clearAllButton(true);
        this.openCardDealer();
        this.showRoyalFlush();

    }
    onHandleRiver() {
        let totalChip = this.chipGame.amountChip;
        this.chipGame.downChip(totalChip);
        this.chipBet.updateChip(totalChip);
        this.buttonController.clearAllButton(true);
        this.openCardDealer();
        this.showRoyalFlush();

        AudioManager.instance.playSoundFX(Constant.SFX_ALL_IN);
    }

    showAllCardPlayer() {
        this.listCardPlayer.forEach(card => {
            card.showCard();
        });
    }

    openCardDealer() {
        this.listCardDealer.forEach(card => {
            card.showCard();
        });
    }
    showAllOutLineCard() {
        this.listCardPlayer.forEach(card => {
            card.showOutLine();
        });
        this.listCommunityCard.forEach(card => {
            card.showOutLine();
        });
    }

    showRoyalFlush() {
        AudioManager.instance.stopBGM();
        AudioManager.instance.playSoundFX(Constant.SFX_WIN);
        AudioManager.instance.playSoundFX(Constant.SFX_MONEY);

        this.coinUI.active = true;
        this.royalFlush.show();
        this.showAllOutLineCard()
    }

}


