import { _decorator, CCInteger, Component, Label, Node, tween, Tween } from 'cc';
import { GlobalEvent } from '../PlayableAads/event/GlobalEvent';
import { Utils } from '../Config/Utils';
const { ccclass, property } = _decorator;

@ccclass('Chip')
export class Chip extends Component {
    @property(Label)
    labelChip: Label = null;

    @property(CCInteger)
    startChip: number = 800;

    amountChip: number = 0;
    temp_amountChip: number = 0;
    private objectTween = { data: 0 };
    protected start(): void {
        this.amountChip = this.startChip;
        this.temp_amountChip = this.amountChip;
        this.labelChip.string = `${this.temp_amountChip}`;
    }

    updateChip(amount: number = 10) {
        const prev = this.temp_amountChip;
        this.amountChip += amount;
        this.playChipAnimation(prev, this.amountChip);
    }

    downChip(amount: number = 10) {
        const prev = this.temp_amountChip;
        this.amountChip -= amount;
        if (this.amountChip < 0) this.amountChip = 0;
        this.playChipAnimation(prev, this.amountChip);
    }

    private playChipAnimation(from: number, to: number) {
        if (from === to) {
            this.temp_amountChip = to;
            this.labelChip.string = `${to}`;
            return;
        }

        const delta = to - from;

        Tween.stopAllByTarget(this.objectTween);

        // reset progress
        this.objectTween.data = 0;

        tween(this.objectTween)
            .to(0.3, { data: 1 }, {
                easing: 'quadOut',
                onUpdate: (target: { data: number }, ratio: number) => {
                    const t = ratio;
                    const value = from + Math.round(delta * t);
                    this.labelChip.string = `${value}`;
                }
            })
            .call(() => {
                this.temp_amountChip = to;
                this.labelChip.string = `${this.temp_amountChip}`;
            })
            .start();
    }
}
