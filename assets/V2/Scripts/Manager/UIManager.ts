import { _decorator, Component, Label, Node, tween } from 'cc';
import { CloudTransition } from '../CloudTransition';
import { AudioManager } from '../../../Scripts/Controller/AudioManager';
const { ccclass, property } = _decorator;

@ccclass('UIManager')
export class UIManager extends Component {
    @property(Label)
    chipLabel: Label = null;

    @property(CloudTransition)
    cloudTransition: CloudTransition = null;

    @property(Node)
    attackCard: Node = null;

    @property(Node)
    attackReward: Node = null;

    @property(Node)
    chipUI: Node = null;

    @property(Node)
    moneyUI: Node = null;

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

    addChips(amount: number, duration: number = 0) {
        console.log(`Adding ${amount} chips over ${duration} seconds.`);

        if (this.chipLabel) {
            let currentChips = parseInt(this.chipLabel.string) || 0;
            let targetChips = currentChips + amount;
            // Implement tweening for smooth update if duration > 0
            if (duration > 0) {
                let obj = { value: currentChips };
                tween(obj)
                    .to(duration, { value: targetChips }, {
                        onUpdate: () => {
                            this.chipLabel.string = Math.floor(obj.value).toString();
                        }
                    })
                    .start();
            } else {
                this.chipLabel.string = targetChips.toString();
            }
        }
    }

    showAttackReward() {
        this.attackReward.active = true;

        // AudioManager.instance.playSoundFX(Constant.SFX_Attack_Popup)
    }

    hideAttackReward() {
        this.attackReward.active = false;
        this.attackUI.active = false;

    }

    showBuildSceneUI() {
        this.chipUI.active = true;
        this.moneyUI.active = true;
        this.VegasUI.active = true;

        this.moneyUI.children[0].getComponent(Label).string = "100,000,000";
    }

    showEndSceneUI() {
        this.chipUI.active = false;
        this.moneyUI.active = false;
        this.VegasUI.active = false;

        this.completeUI.active = true;
    }

    currentMoney: number = 100000000;
    updateMoney(amount: number) {
        console.log('amount :', amount);
        this.currentMoney -= amount;
        console.log('  this.currentMoney :', this.currentMoney);
        this.moneyUI.children[0].getComponent(Label).string = (this.currentMoney).toLocaleString();
    }
}


