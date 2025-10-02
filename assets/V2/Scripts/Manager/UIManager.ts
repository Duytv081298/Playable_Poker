import { _decorator, Component, Label, Node, tween } from 'cc';
import { CloudTransition } from '../CloudTransition';
import { SoundManager } from 'db://assets/Scripts/PlayableAads/SoundManager';
import { Constant } from 'db://assets/Scripts/Config/Constant';
const { ccclass, property } = _decorator;

@ccclass('UIManager')
export class UIManager extends Component {

    @property(CloudTransition)
    cloudTransition: CloudTransition = null;

    @property(Node)
    attackCard: Node = null;

    @property(Node)
    attackReward: Node = null;

    @property(Node)
    VegasUI: Node = null;

    @property(Node)
    attackUI: Node = null;

    @property(Node)
    completeUI: Node = null;


    // Singleton
    private static _ins: UIManager;
    public static get instance(): UIManager {
        return UIManager._ins;
    }

    protected onLoad(): void {
        UIManager._ins = this;
    }



    showAttackReward() {
        this.attackReward.active = true;
        SoundManager.instance().playEffect(Constant.SFX_Attack_Popup);
    }

    hideAttackReward() {
        this.attackReward.active = false;
        this.attackUI.active = false;

    }

    showBuildSceneUI() {
        this.VegasUI.active = true;

    }

    showEndSceneUI() {
        this.VegasUI.active = false;

        this.completeUI.active = true;
    }

    currentMoney: number = 100000000;
    updateMoney(amount: number) {
        this.currentMoney -= amount;
    }
}


