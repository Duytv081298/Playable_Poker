import { _decorator, Component, Node } from 'cc';
import { CloudTransition } from '../CloudTransition';
import { SoundManager } from 'db://assets/Scripts/PlayableAads/SoundManager';
import { Constant } from 'db://assets/Scripts/Config/Constant';
import { AttackReward } from 'db://assets/Scripts/Controller/AttackReward';
const { ccclass, property } = _decorator;

@ccclass('UIManager')
export class UIManager extends Component {

    @property(CloudTransition)
    cloudTransition: CloudTransition = null;

    @property(Node)
    attackCard: Node = null;

    @property(AttackReward)
    attackReward: AttackReward = null;


    @property(Node)
    attackUI: Node = null;



    // Singleton
    private static _ins: UIManager;
    public static get instance(): UIManager {
        return UIManager._ins;
    }

    protected onLoad(): void {
        UIManager._ins = this;
    }



    showAttackReward() {
        this.attackReward.show();
        SoundManager.instance().playEffect(Constant.SFX_Attack_Popup);
    }

    hideAttackReward() {
        this.attackReward.node.active = false;
        this.attackUI.active = false;

    }

    currentMoney: number = 100000000;
    updateMoney(amount: number) {
        this.currentMoney -= amount;
    }
}


