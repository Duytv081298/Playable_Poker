import { _decorator, Node, Prefab, instantiate, Vec3, Tween, SpriteRenderer, SpriteFrame, Size, log } from 'cc';
import { Pool } from './Pool';
const { ccclass, property } = _decorator;
import { Singleton } from "../Base/Singleton";

@ccclass('CreateItemBase')

export class CreateItemBase extends Singleton<CreateItemBase> {
    protected pool: Node[] = [];
    protected itemPrefab: Node = null;
    protected parent: Node = null;

    setPrefab(itemPrefab: Node) {
        this.itemPrefab = itemPrefab;
    }
    setParent(parent: Node) {
        this.parent = parent;
    }

    createItem(): Node {
        // log("this.pool: ", this.pool.length);

        const itemNode: Node = this.pool.pop() ?? instantiate(this.itemPrefab);
        itemNode.active = true;
        itemNode.setPosition(Vec3.ZERO);
        itemNode.angle = 0;
        Tween.stopAllByTarget(itemNode);
        if (parent) {
            itemNode.setParent(this.parent);
        }
        return itemNode;
    }

    removeItem(itemNode: Node) {
        itemNode.active = false;
        Tween.stopAllByTarget(itemNode);
        this.pool.push(itemNode);
        // log("removeItem this.pool: ", this.pool.length);
    }

    public static instance(): CreateItemBase {
        return Singleton.getInstance.call(this);
    }
}
