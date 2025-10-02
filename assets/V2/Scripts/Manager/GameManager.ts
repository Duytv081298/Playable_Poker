import { _decorator, Camera, Component, easing, Game, game, Node, tween, Vec3 } from 'cc';
import { UIManager } from './UIManager';
import { StateBase } from '../State/StateBase';
import { AttackScene } from '../State/AttackScene';
import { Constant } from 'db://assets/Scripts/Config/Constant';
import { SoundManager } from 'db://assets/Scripts/PlayableAads/SoundManager';
const { ccclass, property } = _decorator;

enum GameState {
    PokerScene = 0,
    AttackScene = 1,
    BuildScene = 2,
    End = 3,
}
@ccclass('GameManager')
export class GameManager extends Component {
    @property(AttackScene)
    attackScene: AttackScene = null;


    private static _ins: GameManager;
    public static get instance(): GameManager {
        return GameManager._ins;
    }

    protected onLoad(): void {
        GameManager._ins = this;

        game.on(Game.EVENT_HIDE, this.hideGame, this);
        game.on(Game.EVENT_SHOW, this.showGame, this);

        console.log = () => { };
    }

    hideGame() {
        game.pause();
    }
    showGame() {
        game.resume();
    }


    onAttackScene() {
        UIManager.instance.cloudTransition.node.active = true;
        UIManager.instance.cloudTransition.onCoverAnimationFinish(() => {
            this.attackScene.node.active = true;

            UIManager.instance.attackUI.active = true;
        });
        UIManager.instance.attackCard.active = true;

        tween(UIManager.instance.attackCard)
            .delay(2.6)
            .to(0.35, { scale: new Vec3(0, 0, 0) }, { easing: easing.quadIn })
            .call(() => {
                UIManager.instance.cloudTransition.onUncoverAnimationFinish();
                this.scheduleOnce(() => {
                    this.attackScene.onStartState();
                }, 0.7)
            })
            .start();
    }

    showAttackScene() {
        this.onAttackScene();
        SoundManager.instance().stopEffectLoop(Constant.SFX_BG1);
        SoundManager.instance().playEffectLoop(Constant.SFX_BG2);
    }


}
