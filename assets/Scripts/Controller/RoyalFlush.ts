import { _decorator, Component, easing, Node, tween, Tween, UI, UIOpacity, Vec3 } from 'cc';
import { RewardPopup } from './RewardPopup';
import { PokerState } from '../../V2/Scripts/State/PokerState';
import { Chip } from '../Object/Chip';
const { ccclass, property } = _decorator;

@ccclass('RoyalFlush')
export class RoyalFlush extends Component {
    @property(Node)
    title: Node = null;
    @property(UIOpacity)
    bg: UIOpacity = null;

    @property(UIOpacity)
    uiOpacity: UIOpacity = null;
    @property(PokerState)
    pokerStateV2: PokerState = null;
    @property(Chip)
    chipGame: Chip = null;

    @property(Chip)
    chipBet: Chip = null;

    protected onLoad(): void {
        this.bg.node.active = false;
        this.uiOpacity.opacity = 0;
        this.title.active = false;
    }
    show() {
        this.node.active = true;

        Tween.stopAllByTarget(this.title);
        Tween.stopAllByTarget(this.bg);
        Tween.stopAllByTarget(this.node);
        tween(this.uiOpacity)
            .call(() => {
                this.showBg();
                this.showTitle();

            })
            .to(0.25, { opacity: 255 })
            .delay(3)
            .call(() => {
                this.chipGame.updateChip(1600);
                this.chipBet.downChip(800, false);
                this.hideBg();
                this.pokerStateV2.show();
            })
            .to(0.25, { opacity: 0 })
            .call(() => {
                this.node.destroy();
            })
            .start()

    }
    hideBg() {
        tween(this.bg)
            .to(0.35, { opacity: 0 })
            .start();
    }
    showBg() {
        this.bg.node.active = true;
        this.bg.opacity = 0;
        tween(this.bg)
            .to(0.35, { opacity: 200 })
            .start();
    }
    showTitle() {
        this.title.active = true;

        let positionStart = this.title.position.clone();
        let position = positionStart.clone();
        position.y += 500;
        this.title.setPosition(position);
        tween(this.title)
            .to(0.35, { position: positionStart }, { easing: easing.backOut })
            .start();
    }
    hide() {
        Tween.stopAllByTarget(this.node);
        Tween.stopAllByTarget(this.uiOpacity);
        tween(this.uiOpacity)
            .to(0.5, { opacity: 0 })
            .call(() => {
                this.uiOpacity.opacity = 0;
                this.node.active = false;
            })
            .start();


        tween(this.bg)
            .to(0.5, { opacity: 0 })
            .call(() => {
                this.bg.node.active = false;
            })
            .start();
    }
}


