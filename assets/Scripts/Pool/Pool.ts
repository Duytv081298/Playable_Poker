import { _decorator, Component, Node, Prefab } from 'cc';
import CreateItemGold from './CreateItemGold';

const { ccclass, property, executeInEditMode, executionOrder } = _decorator;

@ccclass('Pool')
@executeInEditMode(true)
@executionOrder(0)
export class Pool extends Component {

    @property(Node)
    itemGold: Node | null = null;
    @property(Node)
    parentClone: Node | null = null;

    @property(Node)
    parentParticle3D: Node | null = null;

    protected onLoad(): void {
        CreateItemGold.instance().setPrefab(this.itemGold);

    }
}


