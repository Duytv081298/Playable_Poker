import { _decorator, Component, Node, ParticleSystem } from 'cc';
import { Card } from '../Object/Card';
import { Chip } from '../Object/Chip';
import { Tutorial } from '../Object/Tutorial';
import { ButtonController } from './ButtonController';
import { RoyalFlush } from './RoyalFlush';
import { Constant } from '../Config/Constant';
import { GameConfig } from '../Config/GameConfig';
import { SoundManager } from '../PlayableAads/SoundManager';
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
        SoundManager.instance().playBackgroundMusic();
        this.chipGame.downChip(10);
        this.chipBet.updateChip(10);
        this.showAllCardPlayer();
        this.tutorial.clearTutorial();
        this.buttonController.clearAllButton(true);
        this.scheduleOnce(() => {
            this.buttonController.showButtonPreFlop();
        }, 1)

        SoundManager.instance().playEffect(Constant.SFX_BET);
    }
    onHandleCheckPreFlop() {
        this.buttonController.showButtonFlop();

        for (let i = 0; i < 3; i++) {
            this.scheduleOnce(() => {
                let card: Card = this.listCommunityCard[i];
                card.showCard();
            }, GameConfig.DELAY_SHOW_CARD * i);
        }
        SoundManager.instance().playEffect(Constant.SFX_CHECK);
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
                }, GameConfig.DELAY_SHOW_CARD * i)
            }
        }, 0.5)

        SoundManager.instance().playEffect(Constant.SFX_BET);
    }

    onHandleCheckFlop() {
        this.buttonController.showButtonTurn();

        let card: Card = this.listCommunityCard[3];
        if (card) card.showCard();

        SoundManager.instance().playEffect(Constant.SFX_CHECK);
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

        SoundManager.instance().playEffect(Constant.SFX_BET);
    }


    onHandleCheckTurn() {
        this.buttonController.showButtonRiver();

        let card: Card = this.listCommunityCard[4];
        if (card) card.showCard();

        SoundManager.instance().playEffect(Constant.SFX_CHECK);
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

        SoundManager.instance().playEffect(Constant.SFX_CHECK);
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

        SoundManager.instance().playEffect(Constant.SFX_ALL_IN);
    }

    showAllCardPlayer() {
        this.listCardPlayer.forEach((card, i) => {
            this.scheduleOnce(() => {
                card.showCard();
            }, GameConfig.DELAY_SHOW_CARD * i);
        });
    }

    openCardDealer() {
        this.listCardDealer.forEach((card, i) => {
            this.scheduleOnce(() => {
                card.showCard();
            }, GameConfig.DELAY_SHOW_CARD * i);
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


        this.scheduleOnce(() => {
            this.showParticleCoin();
        }, 0.5)
        this.scheduleOnce(() => {
            SoundManager.instance().playEffect(Constant.SFX_WIN);
            SoundManager.instance().playEffect(Constant.SFX_MONEY);
            this.royalFlush.show();
            this.showAllOutLineCard()
        }, 1)
    }
    showParticleCoin() {
        this.coinUI.active = true;
        let particles: ParticleSystem[] = this.coinUI.getComponentsInChildren(ParticleSystem);
        console.log(particles);
        particles.forEach(particle => {
            particle.play();
        });

    }

}


