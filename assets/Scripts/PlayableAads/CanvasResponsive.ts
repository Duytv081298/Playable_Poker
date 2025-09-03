import { _decorator, Component, macro, Node } from 'cc';
import { GlobalEvent } from './event/GlobalEvent';


const { ccclass, property } = _decorator;

@ccclass('CanvasResponsive')
export class CanvasResponsive extends Component {
    @property(Node)
    contentLandscape: Node = null;
    @property(Node)
    contentPortrait: Node = null;
    orientation: number = macro.ORIENTATION_PORTRAIT;
    protected onLoad(): void {
        GlobalEvent.instance().addEventListener(GlobalEvent.ORIENTATION_CHANGE, this.onOrientationChange, this)
    }
    protected onDestroy(): void {
        GlobalEvent.instance().removeEventListener(GlobalEvent.ORIENTATION_CHANGE, this.onOrientationChange, this)

    }

    onOrientationChange(orientation: number) {
        this.orientation = orientation;
        let status: boolean = orientation == macro.ORIENTATION_LANDSCAPE;

        this.contentLandscape.active = status;
        this.contentPortrait.active = !status;

    }

}
