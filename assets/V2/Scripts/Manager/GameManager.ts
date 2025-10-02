import { _decorator, Camera, Component, easing, Game, game, Node, tween, Vec3 } from 'cc';
import { UIManager } from './UIManager';
import { StateBase } from '../State/StateBase';
import { AttackScene } from '../State/AttackScene';
import { AudioManager } from 'db://assets/Scripts/Controller/AudioManager';
const { ccclass, property } = _decorator;

enum GameState {
    PokerScene = 0,
    AttackScene = 1,
    BuildScene = 2,
    End = 3,
}

const androidUrl = "https://play.google.com/store/apps/details?id=com.bagelcode.upg&gl=ph";
const iosUrl = "https://play.google.com/store/apps/details?id=com.bagelcode.upg&gl=ph";
@ccclass('GameManager')
export class GameManager extends Component {
    @property(StateBase)
    states: StateBase[] = [];

    isCanControl: boolean = true;
    isLose: boolean = false;
    isWin: boolean = false;

    channel: string = ''

    // Singleton
    private static _ins: GameManager;
    public static get instance(): GameManager {
        return GameManager._ins;
    }

    protected onLoad(): void {
        GameManager._ins = this;

        game.on(Game.EVENT_HIDE, this.hideGame, this);
        game.on(Game.EVENT_SHOW, this.showGame, this);
        this.channel = this.getChannel();
        (window as any).gameReady && (window as any).gameReady();

        console.log = () => { };
    }

    hideGame() {
        game.pause();
    }
    showGame() {
        game.resume();
    }

    getChannel(): string {
        (window as any).advChannels = '{{__adv_channels_adapter__}}'
        return (window as any).advChannels;
    }

    private _state: GameState = GameState.End;

    public get state(): GameState {
        return this._state;
    }

    public set state(newState: GameState) {
        if (this._state !== newState) {
            this._state = newState;
            this.runStateFunction(newState);
        }
    }

    protected start(): void {
        this.state = GameState.PokerScene;
    }

    private runStateFunction(state: GameState) {
        switch (state) {
            case GameState.PokerScene:
                console.log("Entering Poker Scene");

                // AudioManager.instance.playLoopingSound(Constant.SFX_BG1);

                break;
            case GameState.AttackScene:
                this.onAttacckScene();
                // AudioManager.instance.stopLoopingSound(Constant.SFX_BG1);
                // AudioManager.instance.playLoopingSound(Constant.SFX_BG2);
                break;
            case GameState.BuildScene:
                this.onBuildScene();
                // AudioManager.instance.stopLoopingSound(Constant.SFX_BG2);
                // AudioManager.instance.playLoopingSound(Constant.SFX_BG1);
                break;
            case GameState.End:
                this.onEndGame();
                break;
            default:
                console.warn("Unknown State");
                break;
        }
    }

    onAttacckScene() {
        UIManager.instance.cloudTransition.node.active = true;
        UIManager.instance.cloudTransition.onCoverAnimationFinish(() => {
            this.states[this._state - 1].node.active = false;
            this.states[this._state].node.active = true;

            UIManager.instance.chipUI.active = false;
            UIManager.instance.moneyUI.active = false;

            UIManager.instance.attackUI.active = true;
        });
        UIManager.instance.attackCard.active = true;

        tween(UIManager.instance.attackCard)
            .delay(2.6)
            .to(0.35, { scale: new Vec3(0, 0, 0) }, { easing: easing.quadIn })
            .call(() => {
                UIManager.instance.cloudTransition.onUncoverAnimationFinish();
                this.scheduleOnce(() => {
                    this.states[this._state].node.getComponent(AttackScene).onStartState();
                }, 0.7)
            })
            .start();
    }

    onBuildScene() {
        UIManager.instance.cloudTransition.node.active = true;
        UIManager.instance.hideAttackReward();
        UIManager.instance.cloudTransition.onCoverAnimationFinish(() => {
            this.states[this._state - 1].node.active = false;
            this.states[this._state].node.active = true;
        });

        this.scheduleOnce(() => {
            UIManager.instance.cloudTransition.onUncoverAnimationFinish();
            UIManager.instance.showBuildSceneUI();
        }, 1.2)
    }

    onEndGame() {
        UIManager.instance.showEndSceneUI()
    }

    public goToNextState() {
        if (this._state < GameState.End) {
            this.state = this._state + 1;
        }
    }


}
